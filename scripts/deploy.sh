#!/usr/bin/env bash
# Deploy the prerendered site to S3 (+ optional CloudFront invalidation).
#
#   make deploy        (or: npm run deploy)
#
# Defaults to the production bucket and distribution; override with
# LANDING_BUCKET=... CLOUDFRONT_DISTRIBUTION_ID=... and skip the build with SKIP_BUILD=1.
#
# Why this script exists (and why not to upload single files by hand):
#  * Every page's HTML names the hashed bundles of the build it came from
#    (main-XXXX.js, chunk-XXXX.js, styles-XXXX.css). Uploading new HTML without
#    the matching bundles makes the browser get index.html back for the script
#    ("Expected a JavaScript module script but the server responded with
#    text/html") and the page never starts: no language switch, no menu.
#    So bundles and assets go up first, HTML last, always from one build.
#  * The S3 website endpoint answers /privacy with a 302 to /privacy/ and drops
#    the query string, so /privacy?lang=en lost its language. Each prerendered
#    route is therefore also stored under its extensionless key (privacy,
#    hello/delete-account, ...) as text/html, which S3 serves directly.
set -euo pipefail

LANDING_BUCKET="${LANDING_BUCKET:-lycheeapp.org}"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-E17N6OWXRQMUNJ}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist/lychee-landing/browser"
S3="s3://$LANDING_BUCKET"

command -v aws >/dev/null || { echo "aws CLI not found" >&2; exit 1; }

if [[ "${SKIP_BUILD:-}" != "1" ]]; then
  (cd "$ROOT" && npm run build)
fi
[[ -f "$OUT/index.html" ]] || { echo "No build at $OUT" >&2; exit 1; }

# Sanity check: every script/stylesheet the HTML references must exist in this build.
missing=0
while IFS= read -r html; do
  for ref in $(grep -oE '(src|href)="[^"/:]+\.(js|css)"' "$html" | sed -E 's/.*="([^"]+)"/\1/' | sort -u); do
    if [[ ! -f "$OUT/$ref" ]]; then
      echo "MISSING $ref (referenced by ${html#$OUT/})" >&2
      missing=1
    fi
  done
done < <(find "$OUT" -name '*.html')
[[ $missing == 0 ]] || { echo "Build is inconsistent; aborting." >&2; exit 1; }

echo "→ Hashed bundles (immutable)"
aws s3 sync "$OUT" "$S3" --exclude '*' --include '*.js' --include '*.css' \
  --cache-control 'public, max-age=31536000, immutable'

echo "→ Static assets"
aws s3 sync "$OUT" "$S3" --exclude '*' --include 'assets/*' --include 'favicon.ico' \
  --cache-control 'public, max-age=86400'

echo "→ Manifest / robots / sitemap"
aws s3 cp "$OUT/manifest.json" "$S3/manifest.json" --content-type 'application/manifest+json' --cache-control 'no-cache'
aws s3 cp "$OUT/robots.txt" "$S3/robots.txt" --content-type 'text/plain; charset=utf-8' --cache-control 'no-cache'
aws s3 cp "$OUT/sitemap.xml" "$S3/sitemap.xml" --content-type 'application/xml' --cache-control 'no-cache'

echo "→ HTML (last, so it never points at bundles that are not uploaded yet)"
aws s3 sync "$OUT" "$S3" --exclude '*' --include '*.html' \
  --content-type 'text/html; charset=utf-8' --cache-control 'no-cache'

echo "→ Extensionless route keys (keep ?lang=… working without the S3 redirect)"
while IFS= read -r html; do
  rel="${html#$OUT/}"            # e.g. privacy/index.html
  route="${rel%/index.html}"     # e.g. privacy
  [[ "$rel" == "index.html" || "$route" == "$rel" ]] && continue
  aws s3 cp "$html" "$S3/$route" --content-type 'text/html; charset=utf-8' --cache-control 'no-cache'
done < <(find "$OUT" -mindepth 2 -name index.html)

if [[ -n "${CLOUDFRONT_DISTRIBUTION_ID:-}" ]]; then
  echo "→ CloudFront invalidation"
  aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths '/*' >/dev/null
fi

echo "✓ Deployed $(find "$OUT" -type f | wc -l | tr -d ' ') files to $S3"
