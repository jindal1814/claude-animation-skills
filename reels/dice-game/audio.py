# Sound for the Poyais short: a light 1820s underscore (pizzicato and glockenspiel, darker strings later) and effects, under the voice.
import json, numpy as np, soundfile as sf
from scipy import signal
SR = 44100
vo, vsr = sf.read('audio/vo.wav'); vo = vo.mean(1) if vo.ndim > 1 else vo
vo = signal.resample_poly(vo, SR, vsr)
W = json.load(open('audio/warp.json')) if __import__('os').path.exists('audio/warp.json') else None
DUR = (W['new_end'] if W else len(vo) / SR) + 0.1; N = int(DUR * SR)   # ends on the last word; the video loops
rng = np.random.default_rng(11); T = lambda n: np.arange(n) / SR
def toNew(x):  # effect times are written against the first take; follow the current take's word timings
    if not W: return x
    A = W['anchors']
    if x <= A[0][0]: return x - A[0][0] + A[0][1]
    for k in range(len(A) - 1):
        if x <= A[k + 1][0]: f = (x - A[k][0]) / (A[k + 1][0] - A[k][0]); return A[k][1] + f * (A[k + 1][1] - A[k][1])
    return x - A[-1][0] + A[-1][1]
def place(buf, x, at, g=1.0, raw=False):
    i = int((at if raw else toNew(at)) * SR); j = min(len(buf), i + len(x))
    if 0 <= i < len(buf): buf[i:j] += x[:j - i] * g
def bf(x, kind, f): b, a = signal.butter(2, (np.array(f) / (SR / 2)) if np.ndim(f) else f / (SR / 2), kind); return signal.lfilter(b, a, x)
lp = lambda x, f: bf(x, 'low', f); hp = lambda x, f: bf(x, 'high', f); bp = lambda x, lo, hi: bf(x, 'band', [lo, hi])
midi = lambda m: 440 * 2 ** ((m - 69) / 12)
_c = {}
def pluck(f, dur):
    k = (round(f, 1), dur)
    if k not in _c:
        n = int(dur * SR); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
        for i in range(n): out[i] = buf[i % p]; buf[i % p] = .5 * (buf[i % p] + buf[(i + 1) % p]) * .995
        _c[k] = bp(out, 150, 4000) * np.exp(-T(n) * 6)
    return _c[k]
def glock(m, dur=1.0): t = T(int(dur * SR)); f = midi(m); return (np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 6)) * np.exp(-t * 3.5) * np.minimum(1, t / .002) * .4
def strings(ms, dur, g=1.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for m in ms:
        for d in (-.004, 0, .005): ph = np.cumsum(midi(m) * (1 + d) * (1 + .003 * np.sin(2 * np.pi * 5 * t))) / SR; x += 2 * (ph % 1) - 1
    return lp(x / (len(ms) * 3), 1000) * np.minimum(1, t / .6) * np.minimum(1, (dur - t) / .6) * g
def thud(f0=60, dur=.4, g=1.0): n = int(dur * SR); t = T(n); f = f0 * (1 + 1.5 * np.exp(-t * 30)); return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 11) + lp(rng.standard_normal(n), 900) * np.exp(-t * 35) * .5) * g
def whoosh(dur=.4): n = int(dur * SR); x = rng.standard_normal(n); k = np.linspace(0, 1, n); return (bp(x, 250, 1200) * (1 - k) + bp(x, 1500, 6000) * k) * np.sin(np.pi * k) ** 1.5 * 1.4
def paper(dur=.5): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 7000) * (.5 + .5 * np.abs(np.sin(2 * np.pi * 14 * t))) * np.sin(np.pi * t / dur) * .5
def chime(f=1760, dur=.8): t = T(int(dur * SR)); return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t * 6) * .5
def sparkle(): o = np.zeros(int(.8 * SR)); [place(o, chime(f, .5) * .5, i * .05) for i, f in enumerate([2093, 2637, 3136, 4186])]; return o
def coin(f=3000): t = T(int(.3 * SR)); return (np.sin(2 * np.pi * f * t) + .6 * np.sin(2 * np.pi * f * 1.48 * t)) * np.exp(-t * 18) * .5
def flip(): o = np.zeros(int(.4 * SR)); [place(o, hp(rng.standard_normal(int(.03 * SR)), 2000) * .6, i * .06) for i in range(5)]; return o
def bell(f=440, dur=4.0): t = T(int(dur * SR)); x = sum(a * np.sin(2 * np.pi * f * r * t + k) * np.exp(-t * d) for k, (r, a, d) in enumerate([(1, 1, .9), (2.0, .5, 1.3), (2.76, .35, 1.8), (5.4, .15, 3)])); return x * .5
def sea(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 700) * (.5 + .5 * np.sin(2 * np.pi * t / 4) ** 2) * .5 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)
def rainsnd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 800, 8000) * .35 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)
def birds(dur):
    o = np.zeros(int(dur * SR))
    for i in range(int(dur * 2)):
        n = int(.12 * SR); t = T(n); f = 2600 + 800 * np.sin(2 * np.pi * 25 * t); place(o, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .12) * .15, i * .5 + rng.uniform(0, .3))
    return o
def murmur(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 250, 1200) * (.6 + .4 * np.sin(2 * np.pi * 3 * t + np.sin(2 * np.pi * .7 * t))) * .3 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)


def ks(f, dur, damp=.9985):
    n = int(dur * SR); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n): out[i] = buf[i % p]; buf[i % p] = .5 * (buf[i % p] + buf[(i + 1) % p]) * damp
    return out
_tc = {}
def tanpura_note(m):
    if m not in _tc:
        x = ks(midi(m), 2.5); t = T(len(x)); x = x + .25 * np.tanh(4 * x) * np.exp(-t * .8); _tc[m] = bp(x, 60, 5000) * .6
    return _tc[m]
def tanpura(t0, t1, g=1.0, sa=50):
    seq = [sa + 7 - 12, sa, sa, sa - 12]; t = t0; i = 0
    while t < t1: place(music, tanpura_note(seq[i % 4]), t, g, raw=True); t += .62; i += 1
def drum(f=90, g=1.0): n = int(.35 * SR); t = T(n); fr = f * (1 + .8 * np.exp(-t * 25)); return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 9) * g
def tik(): n = int(.08 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.exp(-t * 60) * .5
def pulse(t0, t1, g=1.0):
    t = t0; i = 0
    while t < t1: place(music, drum(85 if i % 4 == 0 else 120, .9 if i % 4 == 0 else .5), t, g); place(music, tik(), t + .21, g * .6); t += .42; i += 1
def clack(): n = int(.07 * SR); t = T(n); return (bp(rng.standard_normal(n), 900, 5000) * np.exp(-t * 70) + np.sin(2 * np.pi * 1300 * t) * np.exp(-t * 90) * .4) * .8
def rattle(dur=1.0):
    o = np.zeros(int(dur * SR)); k = 0; tt = 0.0
    while tt < dur * .9: place(o, clack(), tt, .9 - tt / dur * .5, raw=True); tt += .05 + .25 * (tt / dur) ** 1.5 + rng.uniform(0, .03); k += 1
    return o
def slide(dur=1.0): o = np.zeros(int(dur * SR)); [place(o, coin(2400 + (i % 5) * 300), i * dur / 12, .5, raw=True) for i in range(12)]; return o + bp(rng.standard_normal(len(o)), 800, 4000) * .06 * np.sin(np.pi * T(len(o)) / dur)
def heartbeat(): o = np.zeros(int(.8 * SR)); place(o, thud(55, .3, .8), 0, raw=True); place(o, thud(50, .3, .6), .22, raw=True); return o
def gasp(): n = int(.6 * SR); t = T(n); return bp(rng.standard_normal(n), 600, 4000) * np.minimum(1, t / .08) * np.exp(-t * 4) * .5
def wind(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 500) * (.6 + .4 * np.sin(2 * np.pi * t / 2.3)) * np.minimum(1, t / .3) * .7
def boom(dur=2.0): n = int(dur * SR); t = T(n); return (np.sin(2 * np.pi * 40 * t) * np.exp(-t * 2.2) + lp(rng.standard_normal(n), 200) * np.exp(-t * 3) * .8) * .9
def tap(): n = int(.03 * SR); return hp(rng.standard_normal(n), 3000) * np.exp(-T(n) * 200) * .6

music = np.zeros(N); sfx = np.zeros(N)
# score: a tanpura drone throughout (it starts already playing, so the loop joins), a drum pulse under the games
tanpura(-0.62, DUR, .5)
pulse(10.0, 15.6, .55); pulse(19.1, 24.6, .7)
place(music, strings((38, 45, 50, 53), 3.6, .35), 15.7); place(music, strings((38, 44, 50), 5.6, .45), 20.6)
place(music, strings((38, 45, 50, 53), 5.5, .35), 27.4); place(music, strings((38, 44, 50, 53), 5.8, .5), 35.8)

# effects (voiceover seconds)
place(sfx, rattle(1.1), 0.0, .8)
place(sfx, chime(2093, 1.0), 5.84, .35); place(sfx, slide(1.2), 5.95, .7)
place(sfx, drum(70, 1.0), 8.1, .6); place(sfx, thud(80, .3, .6), 9.4, .4)
place(sfx, rattle(1.6), 10.5, .5); place(sfx, sparkle(), 11.2, .3)
for th in (12.72, 14.08): place(sfx, rattle(.7), th, .8)
place(sfx, whoosh(.4), 13.45, .55); place(sfx, slide(.5), 13.5, .5); place(sfx, whoosh(.4), 14.95, .55); place(sfx, thud(110, .2, .5), 15.1, .4)
for k in range(4): place(sfx, tap(), 16.0 + k * .3, .6)
place(sfx, thud(150, .08, .7), 17.3, .6)
place(sfx, whoosh(.8), 19.2, .3); place(sfx, whoosh(.6), 20.05, .35)
place(sfx, rattle(.7), 24.64, .8); place(sfx, gasp(), 25.15, .7); place(sfx, boom(1.2), 25.2, .5)
place(sfx, heartbeat(), 26.1, .7); place(sfx, heartbeat(), 26.75, .6)
for k in range(10): place(sfx, tap(), 29.4 + k * .27, .5)
place(sfx, slide(1.4), 33.2, .6)
place(sfx, thud(70, .4, .9), 36.3, .7); place(sfx, rattle(.7), 37.6, .8); place(sfx, boom(1.8), 38.6, .7); place(sfx, wind(1.0), 38.6, .5)
place(sfx, chime(400, .9), 39.5, .25)
place(sfx, rattle(.5), DUR - .25, .8)          # the throw that the first frame continues
VO = np.zeros(N); VO[:min(N, len(vo))] = vo[:N]
venv = lp(np.abs(VO), 6); duck = 1 - .55 * np.clip(venv / .05, 0, 1)
mix = VO + lp(music, 7000) * .24 * duck + sfx * .5
mix = mix / np.max(np.abs(mix)) * .89
sf.write('audio/mix.wav', np.stack([mix, mix], 1), SR); print('mix', round(DUR, 2))
