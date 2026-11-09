# Sound for "राम की अंगूठी": tanpura drone, bansuri-style flute, temple bells and effects, mixed under the narration.
import json, numpy as np, soundfile as sf
from scipy import signal
SR = 44100
vo, vsr = sf.read('audio/vo.wav'); vo = vo.mean(1) if vo.ndim > 1 else vo
vo = signal.resample_poly(vo, SR, vsr)
DUR = len(vo) / SR + 1.0; N = int(DUR * SR)
rng = np.random.default_rng(5)
T = lambda n: np.arange(n) / SR
def place(buf, x, at, g=1.0):
    i = int(at * SR); j = min(len(buf), i + len(x))
    if 0 <= i < len(buf): buf[i:j] += x[:j - i] * g
def filt(x, kind, f, order=2):
    b, a = signal.butter(order, f if isinstance(f, (int, float)) and False else (np.array(f) / (SR / 2)), kind); return signal.lfilter(b, a, x)
lp = lambda x, f: filt(x, 'low', f); hp = lambda x, f: filt(x, 'high', f); bp = lambda x, lo, hi: filt(x, 'band', [lo, hi])
midi = lambda m: 440 * 2 ** ((m - 69) / 12)
def ks(f, dur, damp=.996):  # plucked string
    n = int(dur * SR); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n): out[i] = buf[i % p]; buf[i % p] = .5 * (buf[i % p] + buf[(i + 1) % p]) * damp
    return out
_tc = {}
def tanpura_note(m):
    if m not in _tc:
        x = ks(midi(m), 3.0, .9985); t = T(len(x))
        x = x + .25 * np.tanh(4 * x) * np.exp(-t * .8)        # jawari buzz
        _tc[m] = bp(x, 60, 5000) * .6
    return _tc[m]
def tanpura(t0, t1, g=1.0, sa=50):
    seq = [sa + 7 - 12, sa, sa, sa - 12]; t = t0; i = 0
    while t < t1: place(music, tanpura_note(seq[i % 4]), t, g); t += .62; i += 1
def flute(m, dur, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .006 * np.sin(2 * np.pi * 5.2 * t) * np.minimum(1, t / .3))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) + .25 * np.sin(4 * np.pi * np.cumsum(f) / SR)
    x += bp(rng.standard_normal(n), 1500, 6000) * .08
    return x * np.minimum(1, t / .08) * np.minimum(1, (dur - t) / .15) * .35 * g
def phrase(t0, notes, g=1.0):
    t = t0
    for m, d in notes: place(music, flute(m, d * 1.05), t, g); t += d
def bell(f=880, dur=3.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for k, (r, a, d) in enumerate([(1, 1, 1.2), (2.4, .5, 2), (3.9, .3, 3), (5.4, .2, 4.5), (.5, .4, .8)]): x += a * np.sin(2 * np.pi * f * r * t + k) * np.exp(-t * d)
    return x * np.minimum(1, t / .002) * .4
def chime(f=1760, dur=.8): t = T(int(dur * SR)); return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t * 6) * .5
def sparkle(): o = np.zeros(int(.8 * SR)); [place(o, chime(f, .5) * .5, i * .05) for i, f in enumerate([2093, 2637, 3136, 4186])]; return o
def clink(f=3200): t = T(int(.25 * SR)); return (np.sin(2 * np.pi * f * t) + .6 * np.sin(2 * np.pi * f * 1.7 * t)) * np.exp(-t * 25) * .5
def thud(f0=60, dur=.5, g=1.0):
    n = int(dur * SR); t = T(n); f = f0 * (1 + 1.5 * np.exp(-t * 30)); return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10) + lp(rng.standard_normal(n), 800) * np.exp(-t * 35) * .5) * g
def whoosh(dur=.4, up=True):
    n = int(dur * SR); x = rng.standard_normal(n); k = np.linspace(0, 1, n) if up else np.linspace(1, 0, n)
    return (bp(x, 250, 1200) * (1 - k) + bp(x, 1500, 6000) * k) * np.sin(np.pi * np.linspace(0, 1, n)) ** 1.5 * 1.5
def wind(dur):
    n = int(dur * SR); t = T(n); x = rng.standard_normal(n); out = np.zeros(n); seg = int(.05 * SR)
    for i in range(0, n, seg):
        fc = 300 + 1500 * (i / n); out[i:i + seg] = bp(x[max(0, i - 2000):i + seg], fc, fc * 2.5)[-len(out[i:i + seg]):]
    return out * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3) * .9
def boom(dur=2.0):
    n = int(dur * SR); t = T(n); return (np.sin(2 * np.pi * 38 * t) * np.exp(-t * 2) + lp(rng.standard_normal(n), 200) * np.exp(-t * 3) * .8) * .9
def rumble(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 120) * np.minimum(1, t / .4) * np.minimum(1, (dur - t) / .4) * 1.4
def pad(ms, dur, g=1.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for m in ms:
        for d in (-.004, 0, .005): ph = np.cumsum(midi(m) * (1 + d)) / SR; x += 2 * (ph % 1) - 1
    return lp(x / (len(ms) * 3), 900) * np.minimum(1, t / 1.0) * np.minimum(1, (dur - t) / 1.0) * g
def pop(f=500): t = T(int(.12 * SR)); return np.sin(2 * np.pi * np.cumsum(f * (1 + 20 * t)) / SR) * np.exp(-t * 40)
def step(): return thud(140, .08, .25)

music = np.zeros(N); sfx = np.zeros(N)
# ---- music ----
tanpura(0, DUR - 1.5, .55)
# Bhupali-ish flute (D pentatonic: D E F# A B)
phrase(.2, [(74, .5), (76, .5), (78, 1.0), (81, .6), (78, .6), (76, 1.6)], .8)
phrase(8.6, [(78, .4), (81, .4), (83, .8), (81, .4), (78, .4), (76, .8), (74, 1.2)], .7)
place(music, pad((38, 45, 50), 10.0, .5), 22.3); place(music, pad((38, 44, 50), 14.0, .45), 33.3)
place(music, pad((38, 45, 50, 53), 12.0, .5), 46.6); place(music, pad((38, 45, 50, 54), 10.0, .45), 58.9)
phrase(68.8, [(74, .6), (76, .6), (78, 1.2), (76, .6), (74, 1.8)], .8)
phrase(73.9, [(81, .8), (78, .8), (76, .8), (74, 2.2)], .7)
# ---- effects ----
place(sfx, sparkle(), 1.0, .4); place(sfx, sparkle(), 4.0, .5); place(sfx, bell(1320, 2.0), 6.6, .25)
place(sfx, bell(660, 3.5), 8.56, .45)                                    # court bell
place(sfx, clink(3400), 12.6, .6); place(sfx, clink(3000), 12.9, .5); place(sfx, clink(2800), 13.05, .35)
place(sfx, rumble(1.5), 13.4, .5); place(sfx, whoosh(.6, False), 13.9, .3)
place(sfx, sparkle(), 19.0, .5); place(sfx, whoosh(.5), 21.0, .5)
place(sfx, wind(2.5), 22.2, .6); place(sfx, thud(50, .6, 1.0), 24.7, .9)
for k in range(10): place(sfx, step(), 28.4 + k * .4, .8)
place(sfx, pop(300), 32.05, .5)
for at in (36.64, 37.65, 38.65): place(sfx, bell(990, 1.6), at, .18)
place(sfx, boom(2.2), 41.15, .9); place(sfx, rumble(1.2), 41.2, .6)
place(sfx, bell(880, 2.0), 45.6, .15)
for k in range(8): place(sfx, step(), 48.0 + k * .35, .6)
for k in range(12): place(sfx, clink(2600 + (k % 4) * 300), 49.3 + k * .06, .25)
place(sfx, sparkle(), 50.9, .4)
place(sfx, thud(70, .3, .6), 56.5, .5)
place(sfx, whoosh(1.2, True), 59.0, .3)
place(sfx, whoosh(.5, False), 65.8, .3); place(sfx, clink(3200), 66.4, .9); place(sfx, bell(1760, 2.5), 66.42, .35)
place(sfx, bell(660, 4.0), 68.7, .4)
place(sfx, bell(1320, 3.0), 77.0, .25)
# ---- mix ----
VO = np.zeros(N); VO[:len(vo)] = vo
venv = lp(np.abs(VO), 6); duck = 1 - .5 * np.clip(venv / .05, 0, 1)
mix = VO * 1.0 + lp(music, 7000) * .26 * duck + sfx * .55
fade = np.ones(N); fl = int(1.2 * SR); fade[-fl:] = np.linspace(1, 0, fl); mix *= fade
mix = mix / np.max(np.abs(mix)) * .89
sf.write('audio/mix.wav', np.stack([mix, mix], 1), SR)
print('mix', round(DUR, 2), 's')
