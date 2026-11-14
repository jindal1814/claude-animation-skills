#!/usr/bin/env bash
# Rebuild the pet-rock short from the current voice: sound -> picture -> pet-rock.mp4
set -euo pipefail
cd "$(dirname "$0")"; ROOT=../..; ENGINE=$ROOT/skills/stick-figure/engine; PY=$ROOT/kit/.venv/bin/python
export NODE_PATH="$(cd $ROOT/kit && pwd)/node_modules"
"$PY" audio.py
mkdir -p seg; N=$(grep -c "SHOTS.push" web/shots.js); W=${WORKERS:-4}; pids=()
for ((w = 0; w < W; w++)); do ids=""; for ((i = w; i < N; i += W)); do ids="${ids:+$ids,}$i"; done
  [ -n "$ids" ] && { node $ENGINE/tools/render.js segments "$ids" > "seg/log$w.txt" 2>&1 & pids+=($!); }; done
for p in "${pids[@]}"; do wait "$p"; done
for i in $(seq 0 $((N - 1))); do f=$(printf 'seg/shot_%02d.mp4' $i); [ -f "$f" ] || { echo "shot $i failed"; exit 1; }; echo "file '$PWD/$f'"; done > seg/list.txt
ffmpeg -v error -y -f concat -safe 0 -i seg/list.txt -c copy silent.mp4
ffmpeg -v error -y -i silent.mp4 -i audio/mix.wav -map 0:v -map 1:a -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p \
  -af "loudnorm=I=-14:TP=-2:LRA=9" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart pet-rock.mp4
echo "done: $PWD/pet-rock.mp4"
