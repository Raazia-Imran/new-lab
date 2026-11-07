# Multiscale Modelling and Simulation Lab

React and Sanity website for the Multiscale Modelling and Simulation Lab at NED University of Engineering and Technology. The lab’s original orange, blue and white branding is retained. The redesign adds original scientific artwork, an interactive scale explorer, project panels, publication details, resource categories, a compact floating navigation bar and accessible motion.

## Structure

| Location | Responsibility |
| --- | --- |
| `frontend-ui/src/components` | Reusable interface components and research sections |
| `frontend-ui/src/pages` | Page composition and contact workflow |
| `frontend-ui/src/hooks` | Navigation and progressive reveal behaviour |
| `frontend-ui/src/lib` | Frontend configuration |
| `frontend-ui/src/content.js` | Published CMS query, content normalization and safe URLs |
| `frontend-ui/src/content.json` | Migration baseline and offline fallback |
| `frontend-ui/public` | Self-hosted assets, branding, platform headers and redirects |
| `cms-backend/schemaTypes` | Sanity content models |
| `cms-backend/seed/import.mjs` | Authenticated CLI migration restricted to the selected lab project |
| `scripts` | Prerendering, asset generation, build checks and token-based import alternative |
| `tests` | Content preservation, empty CMS collections and URL checks |
| `source-reference` | Original PHP/CSS reference; not part of the deployed frontend |
| `docs` | Setup, ownership, content review and asset provenance |

## Run locally

Node.js 22.12 or newer is required; CI uses Node.js 24.

```cmd
git clone https://github.com/Raazia-Imran/new-lab.git
cd new-lab
npm ci
npm run dev
```

The selected public Sanity project is `4isekt9n`, organization `o6odkcj36`, dataset `production`. Public identifiers are configuration, not credentials. No authentication token belongs in browser variables.

```cmd
npm test
npm run build
node scripts/check-build.mjs
npm run studio
npm run studio:build
```

The frontend produces nine HTML routes plus a 404 page. Each route has content before JavaScript loads; same-origin navigation progressively uses brief native page transitions. Reduced-motion preferences disable decorative motion. There is no artificial loading screen.

## CMS

The Studio has editable identity/contact information, homepage copy, page introductions, projects, publications, milestones, partners and resources. Publications support a complete ordered author list, DOI, abstract, publisher URL and a permitted PDF upload. No missing publication data is invented.

To import using your existing CLI login:

```cmd
cd cms-backend
npx sanity exec seed/import.mjs --with-user-token
npx sanity exec seed/import.mjs --with-user-token -- --apply
```

The first command previews missing records. The second creates only missing records, uploads their images and preserves existing client edits. It refuses to target any project other than `4isekt9n`. Never delete the client-selected project.

To deploy the Studio:

```cmd
npx sanity deploy --url multiscale-ned-lab --yes
```

A deployed Studio is an editor interface; the Content Lake backend is hosted by Sanity. No separate Vercel database/backend server is needed for this architecture.

## Frontend deployment

Vercel repository root: `/`; install: `npm ci`; build: `npm run build`; output: `dist`. `vercel.json` includes required headers and redirects from the original PHP routes. Cloudflare equivalents are retained in public assets for portability.

- `VITE_SANITY_PROJECT_ID=4isekt9n`
- `VITE_SANITY_DATASET=production`
- `VITE_SITE_URL` is the actual deployed origin, later replaced by the client’s HTTPS domain.
- `VITE_PUBLIC_INDEXING=false` during review. Enable it only after approved production content/domain; rebuilding then generates sitemap.xml and indexable metadata.
- `VITE_WEB3FORMS_ACCESS_KEY` remains unset until the client verifies the recipient email. The form is disabled without it and makes no submission requests.

Browser queries show published CMS edits after refresh. Rebuild after editorial changes so static HTML and social/search metadata also reflect them; a hosting rebuild webhook can be added after the final hosting arrangement is confirmed.

## Client handover

Prefer client-owned Vercel and domain ownership before launch. Copy Git history to the client GitHub repository while retaining the original; reconnect the same Vercel project at handover. If the project is already live in the developer’s account, use Vercel’s project transfer flow. See `docs/OWNERSHIP-AND-HANDOVER.md` for permissions, domain continuity, repository copying and separate Sanity/Web3Forms ownership.

See `docs/CONTENT-REVIEW.md` for missing source data and `docs/ASSETS-AND-MOTION.md` for asset provenance. The original supplied contact email/phone are no longer treated as confirmed public contact details. The client content questionnaire is provided as a separate editable Word document and printable PDF.
