#!/usr/bin/env bash
# Deploy the Vite production build to the Dascon VPS.
# Run from a machine that has the PEM (this cloud VM does not).
#
# Usage:
#   ./scripts/deploy-vps.sh ~/Downloads/imdascon.pem
# Optional:
#   REMOTE_DIR=/var/www/dascon HOST=ubuntu@32.198.69.78 ./scripts/deploy-vps.sh ~/Downloads/imdascon.pem

set -euo pipefail

KEY="${1:-$HOME/Downloads/imdascon.pem}"
HOST="${HOST:-ubuntu@32.198.69.78}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/dascon}"

if [[ ! -f "$KEY" ]]; then
  echo "SSH key not found: $KEY" >&2
  exit 1
fi

chmod 400 "$KEY"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Building…"
npm ci
npm run build

echo "Ensuring remote directory $REMOTE_DIR…"
ssh -i "$KEY" -o StrictHostKeyChecking=accept-new "$HOST" \
  "sudo mkdir -p '$REMOTE_DIR' && sudo chown -R ubuntu:ubuntu '$REMOTE_DIR'"

echo "Uploading dist/…"
rsync -az --delete -e "ssh -i $KEY -o StrictHostKeyChecking=accept-new" \
  dist/ "$HOST:$REMOTE_DIR/"

echo "Checking robots.txt on server…"
ssh -i "$KEY" "$HOST" "test -f '$REMOTE_DIR/robots.txt' && head -n 5 '$REMOTE_DIR/robots.txt'"

echo "Done. Point nginx/caddy document root to $REMOTE_DIR (SPA fallback → index.html)."
