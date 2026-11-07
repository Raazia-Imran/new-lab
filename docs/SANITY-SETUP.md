# Sanity organization, project and Studio

## Current state

The Studio source and migration script are complete. A new organization/project has **not** been created: the connected laptop was offline and the available Sanity browser session required sign-in. No existing NC4SCM/GCGC project has been modified.

## Create the isolated lab backend

1. Sign in to Sanity Manage with the intended account. Create an organization named **Multiscale Modelling & Simulation Lab**. Use the free option; do not activate a paid subscription.
2. Create a project named **Multiscale Lab Website** inside that organization.
3. Create a dataset named **production**. This frontend is built for a public dataset containing public website content only. A private dataset needs a separate server read layer; never expose a private read token using a `VITE_` variable.
4. Record the new project ID. Copy the two `.env.example` files to `.env` in their respective folders and enter that ID. Project IDs are public configuration; authentication tokens are secret.
5. In project API settings, add only the required origins. For local development use the actual frontend origin printed by Vite (usually `http://localhost:5173`); for the Studio use `http://localhost:3333`. Add the exact preview/production frontend and deployed Studio origins once known. Allow credentials for Studio origins only. Do not use wildcard credentialed CORS.
6. Start `npm run studio` and authenticate. The Studio has singleton panels for identity/contact and home headings, plus lists for projects, papers, achievements, partners and resources.

## Import the supplied content

Create a project-scoped write token for migration. Put it in the root `.env` as `SANITY_API_TOKEN`, and put the new project ID in `SANITY_PROJECT_ID` and `VITE_SANITY_PROJECT_ID`. Do not commit `.env`, paste tokens into issue descriptions, or add tokens to frontend environment variables.

```cmd
npm run cms:seed
npm run cms:seed:apply
```

The preview command makes no API calls. The apply command uploads original image files and creates only missing records. It never replaces existing documents. All imported records are marked `Needs client review`. Re-running imports is safe for existing documents; it does not overwrite client edits. Review the pending content before marking it approved.

After import, revoke the migration token or remove it from the local environment when it is no longer needed.

## Publish the Studio

```cmd
cd cms-backend
npx sanity login
npx sanity deploy
```

The configured preferred Studio hostname is `multiscale-modelling-lab`; availability is checked by Sanity at deployment time. If already taken, select another hostname and update `SANITY_STUDIO_HOSTNAME`. Do not claim a Studio URL until deployment succeeds.

Grant editors only the project role they need. No invitations are sent by this code.

## Verify after connection

1. Confirm all 21 initial records appear, and the original images are uploaded.
2. Edit a project title, publish it, reload the frontend and verify the change.
3. Add a temporary resource with a real URL or uploaded PDF, publish and test its link, then remove the temporary item.
4. Remove the last item in a temporary collection and confirm no fallback item reappears.
5. Rebuild the frontend and check the rendered page source reflects the published update.
6. Confirm a signed-out visitor can read the public website but cannot edit content.

Official references: https://www.sanity.io/docs/cli-reference/projects and https://www.sanity.io/docs/content-lake/cors .
