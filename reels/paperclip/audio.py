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


def shutter(): n = int(.12 * SR); t = T(n); return hp(rng.standard_normal(n), 2500) * (np.exp(-t * 80) + .6 * np.exp(-np.maximum(0, t - .05) * 90) * (t > .05)) * .7
def jingle(): o = np.zeros(int(.6 * SR)); [place(o, coin(2600 + i * 350), i * .06, .7, raw=True) for i in range(5)]; return o
def boing(f=240, dur=.45): n = int(dur * SR); t = T(n); fr = f * (1 + .35 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 3)) * (1 + t); return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 5) * .6
def pop(f=600): t = T(int(.12 * SR)); return np.sin(2 * np.pi * np.cumsum(f * (1 + 20 * t)) / SR) * np.exp(-t * 40)
def engine(dur): n = int(dur * SR); t = T(n); f = 70 + 40 * np.sin(np.pi * t / dur); x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .4 + lp(rng.standard_normal(n), 900) * .5; return lp(x, 1800) * np.sin(np.pi * t / dur) ** 1.2
def horn(): n = int(.5 * SR); t = T(n); f = 500 + 300 * t; return bp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)), 300, 3000) * np.minimum(1, t / .02) * np.exp(-t * 3) * .4
def cheer(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 400, 3000) * (.5 + .5 * np.abs(np.sin(2 * np.pi * 5 * t))) * np.sin(np.pi * t / dur) * .45
def click(): n = int(.03 * SR); return hp(rng.standard_normal(n), 3000) * np.exp(-T(n) * 200) * .8
def musicbox(t0, notes, g=1.0):
    for k, m in enumerate(notes): place(music, glock(m, 1.2), t0 + k * .18, .5 * g)

music = np.zeros(N); sfx = np.zeros(N)
BEAT = 60 / 120
DMAJ = [(38, (62, 66, 69)), (43, (62, 67, 71)), (45, (61, 64, 69)), (38, (62, 66, 69))]
def bouncy(t0, t1, g=1.0, glock_on=True):
    t = t0; bar = 0; motif = [(0, 74), (.5, 78), (1, 81), (1.5, 78), (2, 83), (3, 81)]
    while t < t1 - .05:
        root, ch = DMAJ[bar % 4]
        place(music, pluck(midi(root), .5), t, .9 * g); place(music, pluck(midi(root + 7), .5), t + 2 * BEAT, .7 * g)
        for bt in (1, 3):
            for m in ch: place(music, pluck(midi(m - 12), .3), t + bt * BEAT, .25 * g)
        if glock_on and bar % 2 == 1:
            for (bt, m) in motif:
                if t + bt * BEAT < t1: place(music, glock(m), t + bt * BEAT, .3 * g)
        t += 4 * BEAT; bar += 1
musicbox(3.5, [74, 78, 81, 86, 81, 78, 74, 76, 78, 74])
bouncy(5.6, 27.0, .85)
place(music, strings((50, 57, 62, 66), 7.2, .35), 27.0)           # mystery and "you see": the beat drops out
bouncy(34.1, 47.7, .8)
place(music, strings((50, 57, 62, 66), 5.6, .4), 47.7); bouncy(47.7, 53.2, .45, glock_on=False)
musicbox(53.3, [86, 81, 78, 74], .8)

for k in range(3): place(sfx, whoosh(.3), .3 + k * .8, .35)
place(sfx, jingle(), 2.9, .7); place(sfx, whoosh(.4), 3.25, .4); place(sfx, chime(2093, 1.0), 3.44, .35)
for k in range(6): place(sfx, click(), 5.8 + k * .12, .5)
place(sfx, chime(1320, .5), 8.1, .4); place(sfx, chime(990, .7), 8.25, .4); place(sfx, whoosh(.5), 8.7, .4); place(sfx, pop(700), 9.3, .5)
for at in (10.72, 11.52, 12.4): place(sfx, whoosh(.25), at - .2, .5); place(sfx, pop(500 + at * 20), at, .55)
place(sfx, horn(), 13.5, .5); place(sfx, thud(70, .4, 1.0), 14.75, .8); place(sfx, paper(.4), 15.25, .6)
place(sfx, engine(1.7), 16.2, .8); place(sfx, chime(1500, .5), 17.84, .35); place(sfx, boing(240), 18.56, .5)
place(sfx, thud(90, .3, .7), 19.52, .6); place(sfx, thud(60, .3, .5), 20.32, .5); place(sfx, jingle(), 21.28, .6); place(sfx, cheer(1.2), 22.72, .6)
place(sfx, whoosh(.2), 25.7, .6); place(sfx, chime(1760, .5), 25.84, .4)
place(sfx, pop(400), 27.04, .6); place(sfx, sparkle(), 32.5, .5)
place(sfx, paper(.5), 36.88, .6); place(sfx, sparkle(), 37.0, .3)
place(sfx, cheer(1.0), 38.9, .4); place(sfx, pop(600), 40.5, .5); place(sfx, sparkle(), 40.6, .5)
for k in range(5): place(sfx, click(), 41.92 + k * .17, .7)
place(sfx, chime(1046, 1.0), 42.6, .45); place(sfx, jingle(), 42.3, .5)
place(sfx, thud(150, .08, .6), 43.9, .6); place(sfx, whoosh(1.2), 45.3, .4); place(sfx, thud(50, .6, 1.0), 46.5, .7); place(sfx, cheer(1.2), 46.6, .4)
place(sfx, flip(), 48.3, .7); place(sfx, flip(), 49.4, .7)
for k in range(8): place(sfx, shutter(), 51.7 + k * .25 + (k % 3) * .05, .6)
place(sfx, whoosh(.9), 53.3, .3); place(sfx, chime(2093, 1.2), 54.3, .3)
VO = np.zeros(N); VO[:min(N, len(vo))] = vo[:N]
venv = lp(np.abs(VO), 6); duck = 1 - .55 * np.clip(venv / .05, 0, 1)
mix = VO + lp(music, 7000) * .24 * duck + sfx * .5
fade = np.ones(N); fl = int(.5 * SR); fade[-fl:] = np.linspace(1, 0, fl); mix *= fade
mix = mix / np.max(np.abs(mix)) * .89
sf.write('audio/mix.wav', np.stack([mix, mix], 1), SR); print('mix', round(DUR, 2))
