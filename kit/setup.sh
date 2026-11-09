#!/usr/bin/env bash
# One-time setup for the animation skills: checks ffmpeg and Node, installs three.js + Playwright into kit/node_modules,
# fetches GSAP and warms up HyperFrames. Safe to run again.
#   bash kit/setup.sh            # enough for /graph, /minimalistic-graphics, /map-route, /breakdown and the two engines' pictures
#   bash kit/setup.sh --voice    # also makes kit/.venv with the free voice (Kokoro) and word timings (Parakeet), ~1 GB of models
#   bash kit/setup.sh --narrator # also installs the default narrator, Chatterbox Turbo, in kit/.venv-chatterbox (~6 GB + 4 GB model)
set -euo pipefail
KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
say() { printf '\033[1m%s\033[0m\n' "$*"; }

command -v ffmpeg >/dev/null || { echo "ffmpeg is missing. Mac: brew install ffmpeg"; exit 1; }
command -v npm >/dev/null || { echo "Node.js 18+ is missing. Mac: brew install node"; exit 1; }
PY=$(command -v python3) || { echo "python3 is missing"; exit 1; }
"$PY" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 9) else 1)' || { echo "python 3.9+ is needed"; exit 1; }

say "installing three.js and Playwright into kit/node_modules"
(cd "$KIT" && npm install --silent --no-audit --no-fund)
if [ -x /opt/pw-browsers/chromium ] || [ -n "${CHROME:-}" ]; then
  say "using the Chromium already installed on this machine"
else
  say "installing Playwright's Chromium (the /zach-d-films and /stick-figure engines render with it)"
  (cd "$KIT" && npx --yes playwright install chromium >/dev/null)
fi

mkdir -p "$KIT/vendor"
if [ ! -s "$KIT/vendor/gsap.min.js" ]; then
  say "fetching GSAP"
  curl -fsSL https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js -o "$KIT/vendor/gsap.min.js" || {
    echo "cdnjs is blocked here; taking GSAP from npm instead"
    T=$(mktemp -d) && (cd "$T" && npm install --silent --no-audit --no-fund gsap@3.12.5 >/dev/null) \
      && cp "$T/node_modules/gsap/dist/gsap.min.js" "$KIT/vendor/gsap.min.js" && rm -rf "$T"
  }
fi

say "warming up HyperFrames (first run downloads it)"
npx --yes hyperframes@0.8.34 --version >/dev/null 2>&1 || echo "warning: could not run hyperframes yet; the first render will retry"

if [ "${1:-}" = "--voice" ] || [ "${1:-}" = "--stick" ]; then
  if [ ! -x "$KIT/.venv/bin/python" ]; then
    say "making kit/.venv"
    "$PY" -m venv "$KIT/.venv"
  fi
  "$KIT/.venv/bin/python" -m pip install -q --upgrade pip
  "$KIT/.venv/bin/python" -m pip install -q numpy scipy soundfile kokoro-onnx sherpa-onnx
  M="$KIT/models"
  mkdir -p "$M"
  say "downloading the voice and word-timing models (about 1 GB, once)"
  [ -s "$M/kokoro-v1.0.onnx" ] || curl -fL -o "$M/kokoro-v1.0.onnx" https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
  [ -s "$M/voices-v1.0.bin" ] || curl -fL -o "$M/voices-v1.0.bin" https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
  if ! ls -d "$M"/sherpa-onnx-nemo-parakeet* >/dev/null 2>&1; then
    curl -fL -o "$M/p.tar.bz2" https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8.tar.bz2
    (cd "$M" && tar xjf p.tar.bz2 && rm p.tar.bz2)
  fi
fi
if [ "${1:-}" = "--narrator" ] || [ "${2:-}" = "--narrator" ]; then
  if [ ! -x "$KIT/.venv-chatterbox/bin/python" ]; then
    say "installing the narrator (Chatterbox Turbo) into kit/.venv-chatterbox"
    if command -v uv >/dev/null; then uv venv -q -p 3.11 "$KIT/.venv-chatterbox" && VIRTUAL_ENV="$KIT/.venv-chatterbox" uv pip install -q chatterbox-tts==0.1.7 "setuptools<81" soundfile
    else python3.11 -m venv "$KIT/.venv-chatterbox" && "$KIT/.venv-chatterbox/bin/pip" install -q chatterbox-tts==0.1.7 "setuptools<81" soundfile; fi
  fi
  say "downloading the narrator model from Hugging Face (about 4 GB, once)"
  "$KIT/.venv-chatterbox/bin/python" -c "from chatterbox.tts_turbo import ChatterboxTurboTTS as M; M.from_pretrained(device='cpu')" >/dev/null 2>&1 || echo "warning: could not download the narrator model; is huggingface.co reachable?"
fi
say "ready"
