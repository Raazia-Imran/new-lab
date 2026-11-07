# Redesign verification

The application separates layouts, reusable components, route navigation, content access, hooks and page composition. Source content and Sanity project configuration are separate from UI code. The selected lab project is 4isekt9n in organization o6odkcj36; no replacement Sanity project was created.

The frontend contains nine static routes plus a 404 page. It renders HTML before JavaScript and progressively enables in-page navigation, filtering, dialogs, contact form interaction and motion. Publications support complete author lists, DOI, abstracts and PDF files; missing source data is left pending rather than fabricated.

Source review items are in CONTENT-REVIEW.md. Client questions are supplied separately as an editable Word form and printable PDF. The source email and phone are no longer presented as confirmed contact details.

Security headers permit only the required self-hosted assets, Sanity public API/image domains and the optional Web3Forms submit endpoint. Tokens remain out of the frontend. Contact form delivery requires client-owned configuration. Sanity and Vercel deployment verification is recorded at delivery; production DNS and public search indexing remain dependent on the chosen client domain and content approval.
