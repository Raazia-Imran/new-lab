# Multiscale Modelling & Simulation Lab

React website and Sanity CMS for the Multiscale Modelling & Simulation Lab at NED University of Engineering and Technology. Migrated from the client-supplied `multiscale-lab.rar` PHP website.

The original logo, hero image, six client images, source text and blue/orange colour palette are retained. The interface uses white backgrounds, responsive layouts, scientific mesh illustrations, a subtle animated hero, accessible navigation and searchable research papers.

## Project layout

| Folder | Purpose |
| --- | --- |
| `frontend-ui/` | React frontend, styles, source content and original image assets |
| `cms-backend/` | Independent Sanity Studio, content schemas and configuration |
| `scripts/` | Static rendering, build checks and safe CMS import |
| `source-reference/` | Original PHP files and original CSS for migration review; excluded from deployment |
| `docs/` | Setup guide, source gaps, launch checklist and verification status |
| `tests/` | Content preservation, safe links and CMS deletion behaviour |

## Run locally

Install Node.js 22.12 or newer and Git. In Windows CMD:

```cmd
git clone https://github.com/Raazia-Imran/new-lab.git
cd new-lab
npm ci
npm run dev
```

Open the local URL shown by Vite. The website works immediately with the supplied source content. No Sanity login is required to view the frontend.

```cmd
npm test
npm run build
node scripts/check-build.mjs
npm run preview
```

The build produces eight HTML pages and a 404 page in `dist/`, with text already rendered for browsers and search engines. No server is required for the frontend. No form backend, analytics, cookie banner or user accounts are added.

## Connect the new Sanity project

Follow [SANITY-SETUP.md](docs/SANITY-SETUP.md). The lab needs a **dedicated** organization/project; credentials or project IDs from NC4SCM/GCGC must not be reused.

1. Create the organization and a free project, then a `production` dataset.
2. Copy `.env.example` to `.env` and enter the new project ID.
3. Copy `cms-backend/.env.example` to `cms-backend/.env` and enter the same project ID.
4. `npm run cms:seed` previews all 21 documents without writing.
5. `npm run cms:seed:apply` imports missing documents and uploads the eight original images. Existing documents remain unchanged.
6. `npm run studio` starts Sanity Studio. Editors log in to Sanity to edit/publish.

The frontend queries published content only. Empty CMS lists stay empty after an editor removes their last item. If Sanity cannot be reached, the original supplied content is used as a fallback. The fallback can be reviewed in `frontend-ui/src/content.json`.

## Deployment

- Frontend: root directory = repository root; install = `npm ci`; build = `npm run build`; output = `dist`.
- Studio: deploy separately using `cd cms-backend` then `npx sanity deploy` after login and environment setup.
- Cloudflare Pages headers/legacy PHP redirects are in `frontend-ui/public/`.
- Vercel headers/legacy PHP redirects are in `vercel.json`.
- Leave `VITE_PUBLIC_INDEXING=false` during client review. For an approved production launch, set `VITE_PUBLIC_INDEXING=true` and `VITE_SITE_URL` to the actual HTTPS domain, then rebuild. This enables canonical URLs and `sitemap.xml`.
- Browser queries update visible content on page load without requiring a frontend rebuild. Rebuild after editorial changes so prerendered HTML and metadata are also current. A deployment webhook can automate this after a hosting provider is selected.

## Content approval

Several claims in the supplied website are explicitly marked as placeholders on its separate pages. All migrated CMS records start with `Needs client review`. Missing downloads display “Coming soon”; empty social links are hidden. See [CONTENT-REVIEW.md](docs/CONTENT-REVIEW.md) before public launch.

The private review build is `noindex,nofollow`, and its robots file disallows indexing. This is separate from authentication; private hosting supplies access control.
