# Lychee Landing

Public marketing site for Lychee (`lycheeapp.org` / `www.lycheeapp.org`).

Standalone Angular app (separate from `lychee-crm`). Routes:

| Path | Page |
|------|------|
| `/` | Home |
| `/privacy` | Privacy policy (AR/EN) |
| `/terms` | Terms & conditions (AR/EN) |

Locale: `lychee_lang` in `localStorage`, or `?lang=ar` / `?lang=en`.

## Development

```bash
npm install
ng serve
```

Open http://localhost:4200/

## Build

```bash
ng build
```

Output: `dist/lychee-landing/browser/` (Angular 18 application builder).

## Deploy (S3 + CloudFront SPA)

1. Upload the **contents** of `dist/lychee-landing/browser/` to the marketing S3 bucket.
2. Configure the bucket (or CloudFront) as a static website / SPA:
   - **Index document:** `index.html`
   - **Error document:** `index.html` (required so deep links like `/privacy` and `/terms` resolve to the SPA instead of 404)
3. Point `lycheeapp.org` and `www.lycheeapp.org` at this distribution — **not** at CRM.

CRM remains on `crm.*` / `store.*` hosts only.

## Out of scope

- CRM landing-page editor (removed from `lychee-crm`)
- Backend CMS API (content defaults live in-app; localStorage merge is for local preview only)
- Design handoff prototypes under any sibling `lychee-landing/project` folder
