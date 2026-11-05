# Lychee Landing

Public marketing site for Lychee (`lycheeapp.org` / `www.lycheeapp.org`).

Standalone Angular 18 app with SSR prerender. Routes:

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/security` | Security |
| `/careers` | Careers |
| `/faq` | FAQ |
| `/cookies` | Cookie policy |
| `/privacy` | Privacy policy (AR/EN) |
| `/terms` | Terms & conditions (AR/EN) |
| `/hello/delete-account` | Delete a Lychee Hello account (AR/EN) — the Google Play account-deletion link |
| `/404` | Not found |

Locale: `?lang=ar` / `?lang=en`, else `lychee_lang` in `localStorage`, else Arabic.

## Environment

Configured in `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod):

| Key | Purpose |
|-----|---------|
| `apiBaseUrl` | Lychee API base (`…/rest/lychee-v2`) for contact form |
| `appStoreUrl` / `playStoreUrl` | Store badges |
| `merchantPortalUrl` | Reserved (merchant CTAs open WhatsApp lead modal instead) |
| `docsUrl` | Developer docs link (**set final URL before go-live**) |
| `siteUrl` | Canonical / OG URLs |
| `contactEmail` | Public contact email |

## Development

```bash
npm install
ng serve
```

Open http://localhost:4200/

## Build (prerendered)

```bash
npm run build
```

Output:

- Browser: `dist/lychee-landing/browser/`
- Server (optional Node SSR): `dist/lychee-landing/server/`

Prerender routes are listed in `prerender-routes.txt`.

Optional Node SSR serve:

```bash
npm run serve:ssr:lychee-landing
```

## Contact form API

The form posts to `POST {apiBaseUrl}/public/contact` (lychee-api).

Requires the API to be running with SendGrid configured (`default.sender.email.address` / `default.receiver.email.address`).

## Deploy (S3 + CloudFront SPA)

Always deploy with the script, from one fresh build:

```bash
LANDING_BUCKET=<bucket> CLOUDFRONT_DISTRIBUTION_ID=<id> npm run deploy
```

It builds, checks that every bundle the HTML references exists, uploads hashed
bundles and assets first and the HTML last, sets cache headers, and invalidates
CloudFront.

**Never upload individual pages by hand.** Each page's HTML names the hashed
bundles of its own build (`main-XXXX.js`, `chunk-XXXX.js`). New HTML without its
bundles gets `index.html` back for the script ("Expected a JavaScript-or-Wasm
module script but the server responded with a MIME type of text/html") and the
page never starts — no language switch, no menu.

The script also stores every prerendered route under its extensionless key
(`privacy`, `hello/delete-account`, …) as `text/html`. Without that, the S3
website endpoint redirects `/privacy?lang=en` to `/privacy/` and drops `?lang`.

Bucket / CloudFront setup:

- **Index document:** `index.html`
- **Error document:** `index.html` (unknown paths render the in-app 404)
- Point `lycheeapp.org` and `www.lycheeapp.org` at this distribution — **not** at CRM.

### Recommended CloudFront / edge headers

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Content-Security-Policy appropriate for fonts/API (`fonts.googleapis.com`, `fonts.gstatic.com`, API host)

Cache static hashed assets aggressively; keep HTML short-TTL or invalidated on each deploy.

CRM remains on `crm.*` / `store.*` hosts only.

## Go-live checklist

1. Confirm `docsUrl` in `environment.prod.ts`
2. Confirm `apiBaseUrl` and CORS/connectivity from the landing origin
3. Replace placeholder phone / WhatsApp numbers in content defaults if still stubs
4. Verify App Store / Play Store links open correctly
5. Submit a test contact form message to `info@lycheeapp.org`
6. Spot-check OG preview (WhatsApp / Facebook debugger) using `/assets/landing/og-image.png`

## Out of scope

- Backend CMS for marketing copy (content defaults live in-app; localStorage merge is **dev-only**)
- Analytics (add after cookie consent if needed)
