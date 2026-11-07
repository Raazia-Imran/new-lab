# Selected Sanity project

The client created organization o6odkcj36 and project 4isekt9n. This repository uses that project with its production dataset. No separate lab Sanity project was created by the developer, so there is no earlier developer-created Sanity project to delete. NC4SCM project dxinqb51 is separate and must not be changed or deleted.

## Local Studio

Run npm ci in the repository root, then npm run studio. The public project ID is the default in the Studio configuration; override it through the documented environment variables only for an intentional alternative setup. The import script remains locked to 4isekt9n.

Use npx sanity login inside cms-backend if your CLI session is not authenticated. No passwords or tokens should be placed in chat or committed to Git.

## Import

Run these from cms-backend:

```
npx sanity exec seed/import.mjs --with-user-token
npx sanity exec seed/import.mjs --with-user-token -- --apply
```

The preview reports missing and existing records. Apply uploads images and creates missing records only. The current migration baseline contains 22 content records, including page headings. It does not overwrite existing edits. All supplied claims remain marked as needing client review.

## CORS

Allow exact frontend origins without credentials. Allow Studio origins with credentials for Sanity authentication. Do not use wildcard credentialed origins. Add the final client domain after it is chosen and remove obsolete temporary origins at handover.

## Studio deployment

```
npx sanity deploy --url multiscale-ned-lab --yes
```

The live URL may be reported only after a successful deployment. The Content Lake backend remains hosted by Sanity; this command publishes the editing interface and schemas.

## Editing check

Publish a controlled change, reload the frontend and confirm it appears. Restore the field after verification if the change was only a test. Delete the last item in a test collection only when it is disposable; the frontend preserves intentional empty collections instead of repopulating them from the migration fallback.

GitHub/Vercel handover does not transfer Sanity organization ownership. Use Sanity’s normal membership/ownership controls and confirm billing/contact details separately.
