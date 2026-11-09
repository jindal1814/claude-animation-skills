# Expressive narration with the free Kokoro voices, in any language Kokoro speaks (en, hi, es, fr, it, pt, ja, zh).
# Run from a reel folder: reads voice.json, writes audio/vo.wav, audio/words_new.json, web/words.js and web/warp.js.
# Every phrase is its own segment, so pauses, pace, pitch and effects can change mid-sentence:
#   {"lang": "hi", "voice": "hm_omega", "speed": 1.0,
#    "segs": [{"t": "text", "line": 0, "v": "hm_psi", "sp": 1.05, "pitch": 0.5, "fx": "whisper", "gap": 0.3,
#              "breath": true, "gain": 1.0, "cap": "caption text, or \"\" to hide"}]}
# fx: "whisper" (breathy, close), "deep" (pitched down, cavernous, for a giant or a spirit), "echo", "deepwhisper", or none.
# Word times for the captions are spread over each segment by the length of its words. "cap" can be a different script
# from the speech (e.g. Hinglish captions for Hindi narration); keep about one caption word per spoken word.
#   tts_expressive.py voice.json --captions-only   re-times the captions from audio/lines.json without re-making the voice
import json, os, sys, shutil, subprocess, tempfile, numpy as np, soundfile as sf
from scipy import signal
from kokoro_onnx import Kokoro, EspeakConfig
import espeakng_loader
ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
KIT = os.path.realpath(os.path.join(ROOT, "..", "..", "..", "kit"))
data = espeakng_loader.get_data_path()
if len(data) > 100:  # espeak-ng fails on a long data path
    short = os.path.join(tempfile.gettempdir(), "kokoro-espeak-ng-data")
    if not os.path.exists(os.path.join(short, "phontab")):
        shutil.rmtree(short, ignore_errors=True); shutil.copytree(data, short)
    data = short
cfg = json.load(open(next((x for x in sys.argv[1:] if not x.startswith("--")), "voice.json")))
def cap_words(segs, lines):
    words = []
    for i, (s, l) in enumerate(zip(segs, lines)):
        ws = s.get("cap", s["t"]).split()
        if not ws: continue
        wt = np.array([len(w.strip("…,.!?।")) + 1.5 for w in ws], float); edges = np.concatenate([[0], np.cumsum(wt) / wt.sum()]) * l["dur"] * .97
        for k, w in enumerate(ws): words.append({"w": w, "s": round(l["start"] + edges[k], 3), "e": round(l["start"] + edges[k + 1], 3), "line": s.get("line", i)})
    json.dump(words, open("audio/words_new.json", "w"), indent=0, ensure_ascii=False)
    open("web/words.js", "w").write("const WORDS=" + json.dumps(words, ensure_ascii=False) + ";")
    open("web/warp.js", "w").write("window.WARP=null;")
    return words
if "--captions-only" in sys.argv:
    lines = json.load(open("audio/lines.json")); assert len(lines) == len(cfg["segs"]), "voice.json has a different number of phrases than the recorded narration"
    print(len(cap_words(cfg["segs"], lines)), "caption words re-timed"); sys.exit()
K = Kokoro(os.path.join(KIT, "models/kokoro-v1.0.onnx"), os.path.join(KIT, "models/voices-v1.0.bin"),
           espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=data))
SR = 24000
rng = np.random.default_rng(7)
TMP = tempfile.mkdtemp()

def trim(x, thr=.01):
    i = np.where(np.abs(x) > thr)[0]
    return x[max(0, i[0] - int(.02 * SR)): i[-1] + int(.06 * SR)] if len(i) else x
def rubber(x, semis):
    if abs(semis) < 1e-3: return x
    a, b = os.path.join(TMP, "a.wav"), os.path.join(TMP, "b.wav"); sf.write(a, x, SR)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a, "-af", f"rubberband=pitch={2 ** (semis / 12):.5f}:formant=preserved", b], check=True)
    y, _ = sf.read(b); return y[:len(x)] if len(y) > len(x) else np.pad(y, (0, len(x) - len(y)))
def ir(dur, decay, seed=1, pre=.0):
    n = int(dur * SR); t = np.arange(n) / SR; r = np.random.default_rng(seed)
    h = r.standard_normal(n) * np.exp(-t * decay); h[:int(pre * SR)] = 0; h[0] = 1; return h / np.sqrt(np.sum(h ** 2))
def reverb(x, dur=1.8, decay=3.5, wet=.35, seed=1):
    y = signal.fftconvolve(x, ir(dur, decay, seed, .012))[:len(x) + int(dur * SR)]
    xx = np.pad(x, (0, len(y) - len(x))); return xx * (1 - wet) + y * wet * (np.max(np.abs(xx)) / (np.max(np.abs(y)) + 1e-9))
def whisper(x):
    # keep the spectral envelope, replace the voiced buzz with breath noise
    f, t, Z = signal.stft(x, SR, nperseg=1024, noverlap=768)
    mag = np.abs(Z); env = signal.convolve(mag, np.ones((15, 1)) / 15, mode="same")
    env *= (1 + 1.6 * (f[:, None] > 1800)) * (f[:, None] > 260)          # brighter, no fundamental
    noise = rng.standard_normal(Z.shape) + 1j * rng.standard_normal(Z.shape)
    _, y = signal.istft(env * noise / np.sqrt(2), SR, nperseg=1024, noverlap=768)
    y = y[:len(x)]; y = y / (np.sqrt(np.mean(y ** 2)) + 1e-9) * np.sqrt(np.mean(x ** 2)) * .55
    return y
def echo(x, taps=((.26, .45), (.52, .25), (.78, .12))):
    n = len(x) + int(.9 * SR); y = np.zeros(n); y[:len(x)] += x
    for d, g in taps: i = int(d * SR); y[i:i + len(x)] += signal.lfilter(*signal.butter(2, 3500 / (SR / 2)), x) * g
    return y
def breath(dur=.32):
    n = int(dur * SR); t = np.arange(n) / SR; x = rng.standard_normal(n)
    b, a = signal.butter(2, [400 / (SR / 2), 2600 / (SR / 2)], "band"); x = signal.lfilter(b, a, x)
    return x * np.sin(np.pi * t / dur) ** 2 * .035
def fx(x, kind):
    if kind == "whisper": return whisper(x)
    if kind == "deep":
        lo = rubber(x, -5); sub = rubber(x, -12) * .35
        return reverb(lo + sub, 2.2, 2.6, .42, 3) * 1.15
    if kind == "deepwhisper":
        lo = rubber(x, -5); return reverb(lo * .55 + whisper(lo) * .9, 2.2, 2.6, .45, 3)
    if kind == "echo": return echo(x)
    return x

out, words, lines, t = [], [], [], 0.0
for i, s in enumerate(cfg["segs"]):
    v, sp = s.get("v", cfg.get("voice", "hm_omega")), s.get("sp", cfg.get("speed", 1.0))
    if s.get("breath"): b = breath(); out.append(b); t += len(b) / SR
    x, sr = K.create(s["t"], voice=v, speed=sp, lang=cfg.get("lang", "en-us")); assert sr == SR
    x = trim(x)
    # a little pitch drift per phrase keeps the read from sounding like one flat take
    x = rubber(x, s.get("pitch", 0) + rng.uniform(-.25, .25))
    voiced = len(x) / SR
    x = fx(x, s.get("fx")) * s.get("gain", 1.0)
    lines.append({"i": i, "text": s["t"], "start": round(t, 3), "dur": round(voiced, 3), "fx": s.get("fx", "")})
    gap = s.get("gap", .18)
    tail = max(0, len(x) - int((voiced + gap) * SR))  # reverb/echo tails overlap the next phrase
    out.append(x[:len(x) - tail] if tail else np.pad(x, (0, int((voiced + gap) * SR) - len(x))))
    if tail: out.append(np.zeros(0)); cfg.setdefault("_tails", []).append((t + voiced + gap, x[len(x) - tail:]))
    t += voiced + gap
vo = np.concatenate(out)
for at, tl in cfg.get("_tails", []):
    i = int(at * SR); j = min(len(vo), i + len(tl)); vo[i:j] += tl[:j - i]
# warm room on the whole read, so it doesn't sound like it was recorded in a vacuum
if cfg.get("room", True): vo = reverb(vo, .5, 9, .1, 5)[:len(vo)]   # "room": false for a dry read
vo = vo / (np.max(np.abs(vo)) + 1e-9) * .9
os.makedirs("audio", exist_ok=True)
sf.write("audio/vo.wav", vo, SR)
json.dump(lines, open("audio/lines.json", "w"), indent=1, ensure_ascii=False)
cap_words(cfg["segs"], lines)
shutil.rmtree(TMP, ignore_errors=True)
print(f"{len(cfg['segs'])} phrases, {len(vo) / SR:.2f}s")
for l in lines: print(f"{l['start']:6.2f} {l['dur']:5.2f} {l['fx']:11s} {l['text']}")
