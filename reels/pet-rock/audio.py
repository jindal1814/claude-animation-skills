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
# ---- score: bright 1970s funk groove in D. A whole number of bars fills the video, so the beat loops with the picture. ----
BARS = 26; BEAT = DUR / (BARS * 4); S16 = BEAT / 4
WAIT, YOUSEE, JOKE, FEB, MILL = 33.68, 36.0, 38.2, 44.8, 48.48
def kick(f=55, dur=.35): n = int(dur * SR); t = T(n); fr = f * (1 + 2.2 * np.exp(-t * 45)); return np.tanh(1.4 * np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 9))
def snare(): n = int(.22 * SR); t = T(n); return (bp(rng.standard_normal(n), 1500, 7000) * np.exp(-t * 22) * .6 + np.sin(2 * np.pi * 190 * t) * np.exp(-t * 30) * .4)
def hat(open_=False): n = int((.16 if open_ else .045) * SR); t = T(n); return hp(rng.standard_normal(n), 7000) * np.exp(-t * (16 if open_ else 95)) * .32
def fbass(m, dur): n = int(dur * SR); t = T(n); ph = np.cumsum(midi(m) * np.ones(n)) / SR; x = np.tanh(1.8 * (np.sin(2 * np.pi * ph) + .3 * np.sin(4 * np.pi * ph))); return lp(x, 900) * np.minimum(1, t / .005) * np.exp(-t * 4) * .7
def clav(ms, dur=.18): o = np.zeros(int(dur * SR)); [place(o, pluck(midi(m), dur), 0, .35, raw=True) for m in ms]; return hp(o, 300)
PROG = [(38, (62, 66, 69)), (43, (62, 67, 71)), (45, (61, 64, 69)), (43, (62, 67, 71))]      # D  G  A  G
BASSLINE = [(0, 0), (3, 0), (6, 12), (8, 7), (11, 10), (14, 12)]                            # 16th, semitone offset
HOOK = [(0, 74), (.5, 76), (1, 78), (2, 81), (3, 78)]
for bar in range(BARS):
    t0 = bar * 4 * BEAT; root, ch = PROG[bar % 4]
    drop = WAIT - .1 <= t0 < YOUSEE + 1.5
    big = JOKE - 4 * BEAT <= t0 < JOKE + 8 * BEAT
    if not drop:
        for b16 in (0, 7, 10) if bar % 2 else (0, 6, 10): place(music, kick(), t0 + b16 * S16, 1.0, raw=True)
        for b in (1, 3): place(music, snare(), t0 + b * BEAT, 1.0, raw=True)
        for k in range(8): place(music, hat(k % 4 == 3), t0 + k * 2 * S16, 1.0, raw=True)
        for (s16, off) in BASSLINE: place(music, fbass(root + off - 12, S16 * 2.2), t0 + s16 * S16, 1.0, raw=True)
        for s16 in (2, 5, 9, 13): place(music, clav(ch), t0 + s16 * S16, .8, raw=True)
    else:
        place(music, strings(ch, 4 * BEAT * .95, .3), t0, 1.0, raw=True)
    if bar % 2 == 0 or big:
        for (bt, m) in HOOK: place(music, glock(m + (12 if big else 0), .9), t0 + bt * BEAT, .45 if not drop else .3, raw=True)
n = int(1.6 * SR); tt = T(n); place(music, bp(rng.standard_normal(n), 800, 7000) * (tt / 1.6) ** 2 * .4, YOUSEE + 1.5 - 1.6, 1.0, raw=True)   # riser back into the beat

# ---- effects (voiceover seconds): light and friendly, nothing harsh ----
def flutter(dur=.8): o = np.zeros(int(dur * SR)); [place(o, paper(.08) * .8, i * .06, raw=True) for i in range(int(dur / .06))]; return o
def kaching(): o = np.zeros(int(.9 * SR)); place(o, coin(2600), 0, .8, raw=True); place(o, coin(3300), .05, .7, raw=True); place(o, bell(1760, .8), .08, .4, raw=True); return o
def waves(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 700) * (.5 + .5 * np.sin(2 * np.pi * t / 3) ** 2) * .5 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)
def cheer(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 400, 3000) * (.5 + .5 * np.abs(np.sin(2 * np.pi * 5 * t))) * np.sin(np.pi * t / dur) * .45
def lid(): return thud(110, .2, .5)
place(sfx, whoosh(.9), .1, .25); place(sfx, flutter(.9), 2.8, .5)
place(sfx, whoosh(.4), 3.72, .4); place(sfx, chime(2093, 1.0), 3.92, .3); place(sfx, paper(.4), 5.15, .6)
place(sfx, murmur(3.0), 5.8, .35); place(sfx, thud(90, .25, .6), 10.3, .6); place(sfx, cheer(1.4), 10.9, .35)
place(sfx, waves(3.0), 13.1, .5); place(sfx, sparkle(), 14.96, .3)
place(sfx, paper(.3), 16.3, .4); place(sfx, lid(), 18.95, .6)
for at in (20.24, 20.56, 21.04, 22.4): place(sfx, paper(.25), at - .1, .6)
place(sfx, sparkle(), 22.6, .5)
place(sfx, whoosh(.3), 23.5, .3)
place(sfx, flip(), 25.7, .6); place(sfx, kaching(), 26.96, .6)
for k in range(6): place(sfx, whoosh(.25), 28.7 + k * .3, .25)
place(sfx, kaching(), 29.84, .6)
place(sfx, cheer(1.4), 30.9, .4); place(sfx, bell(880, 1.4), 32.3, .15)
place(sfx, chime(600, .5), 34.6, .3)
place(sfx, bell(1320, 1.5), 36.1, .2); place(sfx, paper(.5), 38.0, .6); place(sfx, cheer(1.2), 38.8, .4)
for k in range(6): place(sfx, coin(2600 + k * 150), 41.0 + k * .45, .5)
place(sfx, kaching(), 42.64, .6)
place(sfx, flip(), 44.8, .5); place(sfx, thud(70, .4, .7), 47.6, .55)
place(sfx, flutter(1.2), 48.5, .5)
place(sfx, chime(1046, .8), 50.4, .35); place(sfx, chime(784, .8), 51.7, .35)
place(sfx, waves(2.4), 52.9, .5)
VO = np.zeros(N); VO[:min(N, len(vo))] = vo[:N]
venv = lp(np.abs(VO), 6); duck = 1 - .6 * np.clip(venv / .05, 0, 1)
mix = VO + lp(music, 9000) * .052 * duck + sfx * .5   # music measured at about 16 dB under the voice
mix = mix / np.max(np.abs(mix)) * .89
sf.write('audio/mix.wav', np.stack([mix, mix], 1), SR); print('mix', round(DUR, 2))
