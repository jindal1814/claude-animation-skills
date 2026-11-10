# Sound for Gym Diet Files #3: a slow, low ambient drone and a soft pulse, one muted heartbeat under "Wait...", nothing else.
# The music level is set from a measurement: about 15 dB under the voice, and ducked further while he speaks.
import json, numpy as np, soundfile as sf
from scipy import signal
SR = 44100
vo, vsr = sf.read('audio/vo.wav'); vo = vo.mean(1) if vo.ndim > 1 else vo
vo = signal.resample_poly(vo, SR, vsr)
W = json.load(open('audio/words_new.json'))
DUR = W[-1]['e'] + 0.1; N = int(DUR * SR)
T = lambda n: np.arange(n) / SR
rng = np.random.default_rng(3)
def bf(x, kind, f): b, a = signal.butter(2, (np.array(f) / (SR / 2)) if np.ndim(f) else f / (SR / 2), kind); return signal.lfilter(b, a, x)
lp = lambda x, f: bf(x, 'low', f); bp = lambda x, lo, hi: bf(x, 'band', [lo, hi])
midi = lambda m: 440 * 2 ** ((m - 69) / 12)
def place(buf, x, at, g=1.0):
    i = int(at * SR); j = min(len(buf), i + len(x))
    if 0 <= i < len(buf): buf[i:j] += x[:j - i] * g
line_start = lambda li: min(w['s'] for w in W if w['line'] == li)

t = T(N); music = np.zeros(N)
# drone: detuned low D with a slow breathing filter
for m, g in ((26, 1.0), (33, .55), (38, .35)):
    for d in (-.003, 0, .004):
        ph = np.cumsum(midi(m) * (1 + d) * np.ones(N)) / SR; music += (2 * (ph % 1) - 1) * g / 3
music = lp(music, 260) * (.75 + .25 * np.sin(2 * np.pi * t / 7.5))
# a slow minor pad that shifts every few lines (Dm, Bb, Gm, A)
CH = [(50, 53, 57), (46, 50, 53), (43, 46, 50), (45, 49, 52)]
seg = DUR / 8
for k in range(8):
    n = int(seg * 1.15 * SR); tt = T(n); x = np.zeros(n)
    for m in CH[k % 4]:
        for d in (-.004, .004): ph = np.cumsum(midi(m) * (1 + d) * np.ones(n)) / SR; x += np.sin(2 * np.pi * ph) + .3 * np.sin(4 * np.pi * ph)
    place(music, lp(x, 1200) * np.minimum(1, tt / 1.5) * np.minimum(1, (seg * 1.15 - tt) / 1.5) * .12, k * seg)
# soft pulse: a muffled low thump every 1.2 s (silent under the heartbeat)
def thump(f=55, dur=.5, g=1.0): n = int(dur * SR); tt = T(n); fr = f * (1 + .6 * np.exp(-tt * 30)); return lp(np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * 8), 300) * g
WAIT0, WAIT1 = line_start(6), line_start(7)
p = 0.0
while p < DUR:
    if not (WAIT0 - .3 < p < WAIT1): place(music, thump(), p, .5)
    p += 1.2
# one muted heartbeat under "Wait. What exactly was he taking?"
for k in range(2):
    b = WAIT0 + .1 + k * .8
    place(music, thump(50, .35, 1.4), b); place(music, thump(46, .35, 1.0), b + .24)
# mix: voice on top; music measured and set ~15 dB under it, ducked further while he speaks
VO = np.zeros(N); VO[:min(N, len(vo))] = vo[:N]
speaking = lp(np.abs(VO), 6) > .01
gain = np.sqrt(np.mean(VO[speaking] ** 2)) / (np.sqrt(np.mean(music[speaking] ** 2)) + 1e-9) * 10 ** (-15 / 20)
duck = 1 - .35 * np.clip(lp(np.abs(VO), 6) / .05, 0, 1)
mix = VO + music * gain * duck
fl = int(.3 * SR); mix[-fl:] *= np.linspace(1, 0, fl)
mix = mix / np.max(np.abs(mix)) * .89
sf.write('audio/mix.wav', np.stack([mix, mix], 1), SR)
under = 20 * np.log10(np.sqrt(np.mean((music * gain * duck)[speaking] ** 2)) / np.sqrt(np.mean(VO[speaking] ** 2)))
print(f'mix {DUR:.2f}s, music {under:.1f} dB under the voice while he speaks')
