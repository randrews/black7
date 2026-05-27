#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../public"

rsvg-convert -w 512 -h 512 icon.svg -o pwa-512x512.png
rsvg-convert -w 192 -h 192 icon.svg -o pwa-192x192.png
rsvg-convert -w 180 -h 180 icon.svg -o apple-touch-icon.png
rsvg-convert -w 32  -h 32  icon.svg -o favicon-32.png
magick favicon-32.png favicon.ico
rm favicon-32.png

echo "Icons generated."
