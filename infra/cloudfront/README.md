# CloudFront setup for the prerendered site

Distribution `E39RMER8LDSMTX` (adambanham.io) uses the S3 REST origin `adambanham.io.s3.amazonaws.com`.
Since the move to vite-ssg, `npm run build` produces:

- `dist/index.html`, `dist/contact/index.html`, `dist/pubs/index.html`, `dist/blog/index.html`: prerendered pages
- `dist/spa.html`: an empty app shell for every other route (editors, blog articles, process mining)

## One-time changes (in this order)

1. **Deploy a build that contains `spa.html`** (the usual release flow). Nothing changes for visitors yet.
2. **Create the function:** CloudFront → Functions → Create function, name `index-rewrite`,
   runtime `cloudfront-js-2.0`. Paste [`index-rewrite.js`](index-rewrite.js), **Save**, then **Publish**.
   The **Test** tab can check URIs such as `/contact` → `/contact/index.html`.
3. **Associate it:** Distribution → Behaviors → default behavior → Edit → Function associations →
   *Viewer request* → CloudFront Functions → `index-rewrite`.
4. **Point the fallback at the shell:** Distribution → Error pages → edit both the 403 and 404 responses:
   response page path `/spa.html`, HTTP response code `200`.
5. Invalidate `/*` once the distribution has deployed.

## Checking it

- View source on `https://adambanham.io/contact` shows the contact cards (prerendered).
- `https://adambanham.io/editor/orm` loads the editor directly, with no home page flash.
- `https://adambanham.io/docs/...pdf` and `/assets/*` files still load.

## Rolling back

Remove the function association and set the error pages back to `/index.html`. The site then behaves as it did
before the SSG change: everything works, but the prerendered HTML isn't served for `/contact`, `/pubs` and `/blog`.
