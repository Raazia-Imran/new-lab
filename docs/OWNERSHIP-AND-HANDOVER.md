# Client ownership and handover

## Recommended arrangement

Use a client-owned Vercel team and client-owned domain before production launch. The client can invite the developer to the relevant project/team. Work can continue in the developer's GitHub repository while the client-owned Vercel project deploys it, subject to the GitHub App's repository permissions and the Vercel plan's collaboration rules. Restrict GitHub App access to the intended repository.

A client who only visits a deployed site cannot see the developer's Vercel dashboard or unrelated private repositories. Do not invite the client into the developer's general workspace as a way to review one site. Dashboard access and repository access are separate permissions.

## Current temporary review setup

- GitHub source: Raazia-Imran/new-lab.
- Sanity organization: o6odkcj36; project: 4isekt9n; dataset: production.
- Temporary Vercel project: multiscale-lab in Raazia's projects.
- Public search indexing remains disabled during content review.
- Web3Forms remains inactive until a client-owned recipient/access key is configured.

## Before connecting the real domain

1. Have the client create or select their Vercel team and invite the developer through the normal access flow. Confirm billing/plan suitability; do not assume a paid client project qualifies for Hobby. Vercel's fair-use guidance treats receiving payment to build/update/host a site as commercial use.
2. Prefer transferring this Vercel project into that client team before connecting the domain. If it has no live domain and no production visitors, creating the equivalent project in the client team is also straightforward.
3. Confirm environment variables, exact CORS origins, Studio access, form delivery and the chosen domain before public launch.
4. Use the actual HTTPS domain in VITE_SITE_URL. Keep VITE_PUBLIC_INDEXING=false until content approval; then rebuild with true and submit /sitemap.xml in Search Console.

## If the site is already live on the developer's Vercel account

Use Vercel's project transfer flow instead of deleting and rebuilding the live site. Vercel documents zero-downtime project transfers between eligible teams. Domains/aliases, deployments, project configuration and dashboard environment variables transfer. Integrations and some separately managed products need their own review. Account roles, destination billing and any plan-specific features must be checked first.

Keep the same custom domain and URL paths. Changing the hosting account alone does not change public URLs, so a Search Console Change of Address is not needed solely for this account transfer. Verify the site, redirects, canonical URLs and sitemap afterward. Do not change DNS unless the actual hosting arrangement requires it. A change to the domain itself is a separate migration.

## Preserve Git history in both accounts

Copy the repository; do not transfer away the original if it must remain on the developer account. GitHub Importer or a mirror push can preserve the full Git commit graph in the client repository. Use an empty destination and inspect it before a mirror push, because --mirror replaces destination refs.

1. Finish and verify the intended source commit.
2. Import/mirror to the client's empty GitHub repository, preserving branches and tags as required.
3. Compare the main branch commit SHA in both repositories.
4. In the same client-owned Vercel project, reconnect Git integration from the developer repository to the client repository. Keep the production branch, build settings, environment variables and domains.
5. Test a controlled update and confirm automatic deployment works.
6. Keep the original repository as agreed with the client; agree in writing on portfolio/public-source permissions.

Git commits transfer with the Git graph. GitHub issue/PR discussions, repository secrets, webhooks and external service access are separate and must be reviewed explicitly.

## CMS and form ownership are separate

Moving GitHub or Vercel does not move Sanity organization membership or Web3Forms ownership. Give the client the appropriate Sanity ownership/admin access through its normal permission flow, confirm organization billing/contact details, and remove temporary developer access only after acceptance. Keep project ID 4isekt9n; do not delete it. Update CORS if hostnames change. Set up Web3Forms with the client recipient from the start, rather than moving a developer-owned mailbox later.

## References

- https://vercel.com/docs/projects/transferring-projects
- https://vercel.com/docs/domains/working-with-domains/transfer-your-domain
- https://vercel.com/docs/limits/fair-use-guidelines
- https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository
