# Delivery and launch checklist

## Implemented

- [x] React frontend with the NC4SCM-style separation of frontend and CMS.
- [x] Eight routes plus an error page.
- [x] Original logo, hero image and six client images copied without changes.
- [x] Original source text migrated from the fuller homepage.
- [x] White background with original dark blue/orange and logo accents.
- [x] Sticky navigation, compact mobile menu, keyboard Escape close, skip link and reduced-motion support.
- [x] Subtle hero animation and mesh illustrations.
- [x] Publication search, year filtering and empty results.
- [x] Resource links with real URLs/files only; missing files show Coming soon.
- [x] Independent Sanity Studio schemas and safe import script.
- [x] Published-content query; empty collections remain empty.
- [x] Static rendering, page titles/descriptions, optional canonical URLs, robots/sitemap controls and 404 output.
- [x] Cloudflare/Vercel security headers and redirects from legacy PHP paths.
- [x] Private review indexing disabled by default.

## Requires account access / client details

- [ ] Sign in to Sanity and create the dedicated organization and project.
- [ ] Configure production dataset and exact CORS origins.
- [ ] Import source documents and images into that project.
- [ ] Test publishing changes against the live Content Lake.
- [ ] Deploy the authenticated Studio.
- [ ] Review all source placeholders and conflicting details listed in CONTENT-REVIEW.md.
- [ ] Confirm client names, publications, award claims, lab head and phone extension.
- [ ] Supply resource files and real social/academic URLs.
- [ ] Choose production hosting and domain, configure DNS and verify redirects/headers on that platform.
- [ ] Rebuild with approved content, actual domain and VITE_PUBLIC_INDEXING=true.
- [ ] Submit the real production sitemap in Google Search Console after launch.

Sanity live editing and production-domain behaviour cannot be claimed verified until the account setup and hosting steps above are completed.
