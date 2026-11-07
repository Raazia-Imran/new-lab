# Verification record

The frontend and Studio source are ready for a dedicated lab Sanity project. This record distinguishes local checks from account-dependent work.

## Completed checks

- React production build: eight statically rendered routes plus a 404 page.
- Built HTML: headings and content exist before JavaScript executes.
- Local page and image links: checked against build files.
- Content tests: CMS empty collections, fallback behaviour, unsafe URL rejection, original titles and unique imported IDs.
- Asset parity: all eight original PNGs match the supplied archive byte-for-byte.
- CMS migration preview: 21 source documents, no API requests in preview mode, existing documents preserved by apply mode.
- Desktop browser: homepage layout, navigation, publication search, empty search and year filter.
- Narrow browser frames: 390 px mobile and 768 px tablet; mobile menu expansion and navigation to papers.
- Sanity Studio compilation: checked with an explicit build-only placeholder project ID, not a live backend.

## Still requires live access

- New Sanity organization/project/dataset creation.
- API import and content publishing in the new project.
- Studio deployment, authenticated editing and signed-out access checks.
- Production domain/DNS and platform-enforced redirects/security headers.
- Search Console submission after approved launch.

The build-only project ID is not committed as a default, and no existing client Sanity account/project is used by the new code.

## Reference architecture review

NC4SCM uses a separated frontend and Sanity Studio with environment-based project configuration. The GCGC conference reference uses React/Vite and static page generation. This lab follows that split, with a dedicated lab dataset and static React frontend. Reference repositories were read for architecture only; neither was modified.

## Final dependency check

A clean install with React 19.3.1, Sanity Studio 6.22.0 and the committed lockfile passed both builds. The final full `npm audit --json` returned **0 known findings** on 7 November 2026. Narrow package overrides pin patched js-yaml, smol-toml, undici and minimatch versions used by Studio/CLI dependencies. The audit is a point-in-time registry check, not a guarantee of complete security. The complete result is retained in `docs/dependency-audit.json`.
