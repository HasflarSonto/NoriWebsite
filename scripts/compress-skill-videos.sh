#!/usr/bin/env bash
# One-shot script: compresses the 5 flip-card clips from ~/Desktop
# into public/video/ + extracts poster frames into public/images/.
# Safe to re-run; overwrites outputs.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/video public/images

names=(clean-floor organize-shelves make-coffee sort-laundry fold-laundry)

for name in "${names[@]}"; do
  src="$HOME/Desktop/$name.mp4"
  if [ ! -f "$src" ]; then
    echo "MISSING: $src" >&2
    continue
  fi
  echo "--- $name ---"
  ffmpeg -y -i "$src" \
    -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p \
    -vf "scale=720:-2" -an -movflags +faststart \
    "public/video/skill-$name.mp4" 2>&1 | tail -1
  ffmpeg -y -ss 0.3 -i "$src" -frames:v 1 -q:v 3 \
    "public/images/skill-$name.jpg" 2>&1 | tail -1
done

echo
echo "=== output ==="
ls -la public/video/skill-*.mp4 public/images/skill-*.jpg
