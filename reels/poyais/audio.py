# Sound for the Poyais short: a light 1820s underscore (pizzicato and glockenspiel, darker strings later) and effects, under the voice.
import json, numpy as np, soundfile as sf
from scipy import signal
SR = 44100
vo, vsr = sf.read('audio/vo.wav'); vo = vo.mean(1) if vo.ndim > 1 else vo
vo = signal.resample_poly(vo, SR, vsr)
W = json.load(open('audio/warp.json')) if __import__('os').path.exists('audio/warp.json') else None
DUR = (W['new_end'] if W else len(vo) / SR) + 0.6; N = int(DUR * SR)
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

music = np.zeros(N); sfx = np.zeros(N)
BEAT = 60 / 112
DM = [(38, (62, 65, 69)), (43, (62, 67, 70)), (38, (62, 65, 69)), (45, (61, 64, 67))]
def playful(t0, t1, g=1.0, glock_on=True):
    t = t0; bar = 0; motif = [(0, 74), (.5, 77), (1, 81), (2, 79), (2.5, 77), (3, 76)]
    while t < t1 - .05:
        root, ch = DM[bar % 4]
        place(music, pluck(midi(root), .5), t, .9 * g); place(music, pluck(midi(root + 7), .5), t + 2 * BEAT, .7 * g)
        for bt in (1, 3):
            for m in ch: place(music, pluck(midi(m - 12), .3), t + bt * BEAT, .25 * g)
        if glock_on and bar % 2 == 0:
            for (bt, m) in motif:
                if t + bt * BEAT < t1: place(music, glock(m), t + bt * BEAT, .35 * g)
        t += 4 * BEAT; bar += 1
playful(0.3, 35.1, .8)
place(music, strings((50, 57, 62, 66), 5.0, .4), 35.1)            # departure: hopeful swell
place(music, strings((50, 56, 62), 5.8, .35), 37.1)                # jungle: uneasy
playful(42.9, 49.9, .55, glock_on=False)
place(music, strings((38, 45, 50, 53), 4.4, .5), 50.0)             # fever: dark
playful(54.2, 57.8, .6)
place(music, strings((50, 57, 62, 65), 6.2, .45), 57.8)
for k, m in enumerate([74, 69, 65, 62]): place(music, glock(m, 1.4), 61.8 + k * .45, .3)

# effects (times in voiceover seconds)
place(sfx, murmur(3.4), 0, .5); place(sfx, paper(1.2), .2, .5)
place(sfx, whoosh(.4), 3.25, .5); place(sfx, chime(2093, 1.0), 3.45, .4)   # flash after the hook
place(sfx, whoosh(.8), 7.4, .3); place(sfx, sparkle(), 8.5, .5)            # crown lands
for at in (11.6, 12.4, 13.0, 13.9, 14.5): place(sfx, chime(1320 + (at * 97) % 500, .6), at, .3)
place(sfx, sparkle(), 15.5, .5)
place(sfx, thud(55, .6, 1.2), 16.5, .9); place(sfx, paper(.6), 18.2, .6); place(sfx, chime(400, .9), 19.75, .3)
place(sfx, murmur(3.5), 20.8, .4); place(sfx, flip(), 23.6, .8)
for i in range(6): place(sfx, paper(.2), 24.45 + i * .15, .4)
place(sfx, thud(90, .3, .9), 26.9, .7)                                      # SOLD stamp
for i in range(6): place(sfx, hp(rng.standard_normal(int(.15 * SR)), 3000) * np.exp(-T(int(.15 * SR)) * 20) * .3, 27.8 + i * .45, .5)  # quills
place(sfx, sparkle(), 30.4, .5)
for i in range(5): place(sfx, coin(2800 + i * 120), 32.0 + i * .2, .6)
for i in range(4): place(sfx, thud(110, .2, .6), 33.6 + i * .45, .6)        # press
place(sfx, sea(5.0), 35.0, .6); place(sfx, whoosh(.5), 36.9, .4)
place(sfx, birds(5.8), 37.1, .7); place(sfx, sea(5.8), 37.1, .3)
place(sfx, chime(600, .6), 39.2, .4)
place(sfx, whoosh(.6), 41.2, .5); place(sfx, thud(70, .4, .5), 41.6, .5)
place(sfx, chime(2400, .4), 44.3, .3); 
for i in range(3): place(sfx, thud(140, .1, .4), 47.6 + i * .3, .6)
place(sfx, thud(60, .5, .7), 49.1, .5)
place(sfx, rainsnd(4.4), 50.0, .8); place(sfx, thud(45, 1.0, .8), 51.2, .6)
for i in range(30): place(sfx, thud(130, .08, .3), 51.25 + i * .033, .4)
place(sfx, bell(330, 3.0), 52.8, .35)
place(sfx, whoosh(.4), 54.6, .4); place(sfx, thud(75, .4, 1.3), 56.85, 1.0); place(sfx, chime(1760, .6), 57.3, .3)
place(sfx, bell(220, 5.0), 57.9, .55); place(sfx, paper(1.6), 61.8, .6)

VO = np.zeros(N); VO[:min(N, len(vo))] = vo[:N]
venv = lp(np.abs(VO), 6); duck = 1 - .55 * np.clip(venv / .05, 0, 1)
mix = VO + lp(music, 7000) * .24 * duck + sfx * .5
fade = np.ones(N); fl = int(.5 * SR); fade[-fl:] = np.linspace(1, 0, fl); mix *= fade
mix = mix / np.max(np.abs(mix)) * .89
sf.write('audio/mix.wav', np.stack([mix, mix], 1), SR); print('mix', round(DUR, 2))
