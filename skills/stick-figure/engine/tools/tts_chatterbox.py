"""Default narrator: Chatterbox Turbo (Resemble AI, MIT licence), free and local, in the voice of kit/voices/narrator_ref.wav.

Run from a reel folder with kit/.venv-chatterbox/bin/python:  tts_chatterbox.py [out.wav]
Reads script.json (one entry per line; if script_tts.json exists, that is read instead: the same lines respelled for
pronunciation, e.g. "Yoo-DHISH-thi-ra", while captions keep script.json's spelling), writes audio/vo_chatterbox.wav (default), one line at a time so long scripts
stay stable. About 2 to 3 s of compute per second of speech on a 4-core CPU.
Options (environment): NARRATOR_REF (a 7-15 s clean speech clip to copy the voice from), TARGET_WPS (e.g. 3.7: closes
long pauses, then speeds up gently, at most 1.2x, if the read is still slower), GAP (seconds between lines, default 0.12),
SEED (default 0; each line uses SEED + its index, so a take is repeatable; try another seed if a name comes out wrong).
BEST_OF (default 1): record each line this many times, transcribe each take with the local word-timing model,
and keep the take closest to script.json's text; catches mangled or spelled-out names.
Pronunciation: respell names as plain lowercase words ("Yoodhishthira"), never with capitals or hyphens, which get
spelled out letter by letter. Check a take with speech-to-text before using it.
Output is watermarked by Chatterbox (inaudible); that is expected.
"""
import json, os, subprocess, sys, tempfile
import numpy as np, soundfile as sf, torch
ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
KIT = os.path.realpath(os.path.join(ROOT, "..", "..", "..", "kit"))
REF = os.environ.get("NARRATOR_REF", os.path.join(KIT, "voices", "narrator_ref.wav"))
OUT = sys.argv[1] if len(sys.argv) > 1 else "audio/vo_chatterbox.wav"
GAP = float(os.environ.get("GAP", 0.12))
torch.set_num_threads(os.cpu_count() or 4)
from chatterbox.tts_turbo import ChatterboxTurboTTS
m = ChatterboxTurboTTS.from_pretrained(device="cuda" if torch.cuda.is_available() else "cpu")
lines = json.load(open("script_tts.json" if os.path.exists("script_tts.json") else "script.json"))
words = sum(len(l.split()) for l in json.load(open("script.json")))  # pace is measured on the script as written
import difflib, glob, re
BEST = int(os.environ.get("BEST_OF", 1))
written = json.load(open("script.json"))
asr = None
if BEST > 1:
    import sherpa_onnx
    d = glob.glob(os.path.join(KIT, "models", "sherpa-onnx-nemo-parakeet*"))[0]
    asr = sherpa_onnx.OfflineRecognizer.from_transducer(encoder=f"{d}/encoder.int8.onnx", decoder=f"{d}/decoder.int8.onnx", joiner=f"{d}/joiner.int8.onnx", tokens=f"{d}/tokens.txt", model_type="nemo_transducer")
norm = lambda x: re.sub(r"[^a-z0-9 ]", "", x.lower().replace("&", " and "))
def heard(w):
    a = np.interp(np.linspace(0, len(w) - 1, int(len(w) * 16000 / m.sr)), np.arange(len(w)), w).astype(np.float32)
    st = asr.create_stream(); st.accept_waveform(16000, a); asr.decode_stream(st); return st.result.text
parts = []
for i, line in enumerate(lines):
    best = None
    for k in range(BEST):
        torch.manual_seed(int(os.environ.get('SEED', 0)) + i + 1000 * k)
        cand = m.generate(line, audio_prompt_path=REF).squeeze().cpu().numpy()
        if BEST == 1: best = (1, cand, ""); break
        h = heard(cand); score = difflib.SequenceMatcher(None, norm(h), norm(written[i])).ratio()
        if not best or score > best[0]: best = (score, cand, h)
    w = best[1]
    if BEST > 1: print(f"  best of {BEST}: {best[0]:.2f} heard: {best[2]}", flush=True)
    idx = np.where(np.abs(w) > .01)[0]
    if len(idx): w = w[max(0, idx[0] - int(.02 * m.sr)): idx[-1] + int(.06 * m.sr)]
    parts += [w, np.zeros(int(GAP * m.sr), dtype=w.dtype)]
    print(f"line {i + 1}/{len(lines)}: {len(w) / m.sr:.1f}s", flush=True)
vo = np.concatenate(parts)
os.makedirs(os.path.dirname(OUT) or ".", exist_ok=True)
tmp = os.path.join(tempfile.mkdtemp(), "raw.wav"); sf.write(tmp, vo, m.sr)
# close long pauses inside lines (keeps 0.12 s), then match the target pace if one is set
filt = "silenceremove=stop_periods=-1:stop_duration=0.16:stop_threshold=-40dB:stop_silence=0.12"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", filt, "-ar", "44100", "-ac", "1", OUT], check=True)
dur = sf.info(OUT).duration
target = float(os.environ.get("TARGET_WPS", 0) or 0)
if target and words / dur < target:
    tempo = min(1.2, target * dur / words)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", OUT, "-af", f"atempo={tempo:.4f}", tmp], check=True)
    os.replace(tmp, OUT); dur = sf.info(OUT).duration
    print(f"tempo x{tempo:.3f}")
print(f"wrote {OUT}: {dur:.1f}s, {words / dur:.2f} words a second")
