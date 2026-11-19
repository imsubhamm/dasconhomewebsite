#!/usr/bin/env bash
# Safely co-host the marketing site beside dasconsouraverp on the same VPS.
# Does NOT touch the ERP document root or dasconsouraverp.com vhost.
#
# Usage (from a machine that has the PEM):
#   ./scripts/deploy-vps.sh ~/Downloads/imdascon.pem
#
# Env overrides:
#   HOST=ubuntu@32.198.69.78
#   REMOTE_DIR=/var/www/dascon-home
#   DOMAIN=dasconsourav.in

set -euo pipefail

KEY="${1:-$HOME/Downloads/imdascon.pem}"
HOST="${HOST:-ubuntu@32.198.69.78}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/dascon-home}"
DOMAIN="${DOMAIN:-dasconsourav.in}"
SITE_NAME="dasconsourav-home"

if [[ ! -f "$KEY" ]]; then
  echo "SSH key not found: $KEY" >&2
  echo "Attach/upload imdascon.pem or pass its path as the first argument." >&2
  exit 1
fi

chmod 400 "$KEY"
SSH=(ssh -i "$KEY" -o StrictHostKeyChecking=accept-new)
RSYNC_SSH="ssh -i $KEY -o StrictHostKeyChecking=accept-new"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Building production assets"
npm ci
npm run build

if [[ ! -f dist/robots.txt ]]; then
  echo "dist/robots.txt missing — aborting" >&2
  exit 1
fi

echo "==> Ensuring isolated docroot $REMOTE_DIR (ERP untouched)"
"${SSH[@]}" "$HOST" "sudo mkdir -p '$REMOTE_DIR' && sudo chown -R ubuntu:ubuntu '$REMOTE_DIR'"

echo "==> Uploading dist/ → $REMOTE_DIR"
rsync -az --delete -e "$RSYNC_SSH" dist/ "$HOST:$REMOTE_DIR/"

echo "==> Installing nginx site (server_name $DOMAIN www.$DOMAIN)"
scp -i "$KEY" -o StrictHostKeyChecking=accept-new \
  deploy/nginx-dasconsourav-home.conf \
  "$HOST:/tmp/${SITE_NAME}.conf"

"${SSH[@]}" "$HOST" bash -s <<REMOTE
set -euo pipefail
sudo cp /tmp/${SITE_NAME}.conf /etc/nginx/sites-available/${SITE_NAME}
sudo ln -sfn /etc/nginx/sites-available/${SITE_NAME} /etc/nginx/sites-enabled/${SITE_NAME}
sudo nginx -t
sudo systemctl reload nginx
echo "nginx reloaded OK"
# Show that ERP vhost files still exist if present
ls /etc/nginx/sites-enabled/ 2>/dev/null || true
REMOTE

echo "==> Verifying marketing files on server"
"${SSH[@]}" "$HOST" "test -f '$REMOTE_DIR/index.html' && test -f '$REMOTE_DIR/robots.txt' && head -n 8 '$REMOTE_DIR/robots.txt'"

echo
echo "Deployed files to $REMOTE_DIR with nginx server_name for $DOMAIN."
echo "Next — DNS + TLS (run once DNS resolves to this VPS):"
echo "  1. A  @    → 32.198.69.78"
echo "  2. A  www  → 32.198.69.78"
echo "  3. ssh -i $KEY $HOST 'sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN'"
echo "ERP domain dasconsouraverp.com was not modified."
