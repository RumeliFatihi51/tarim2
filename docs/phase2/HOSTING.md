# Production migration / actual state

Target order: GitHub Pages, then Cloudflare Pages. Vercel is not the Phase 2 target. Existing Vercel site is deliberately not removed.

## GitHub Pages

This site prerenders 12 HTML directories. Build with:

`BASE_PATH=/tarim2/ SITE_ORIGIN=https://rumelifatihi51.github.io npm run build`

Check with `BASE_PATH=/tarim2/ npm run check`. Direct /platform/, /hesap/ and callback query URLs map to real index.html files; no fragile SPA 404 redirect is needed. The workflow builds a deployable artifact before attempting Pages configuration. Pages deployment requires repository Pages to be enabled. API enablement returned 403, despite the connected repository role reporting admin: the integration lacks administration+Pages scopes. Official configure-pages enablement requires a token other than GITHUB_TOKEN. We do not bypass that restriction or claim a successful production URL.

Expected URL once enabled: https://rumelifatihi51.github.io/tarim2/ — **not verified as a Phase 2 deployment yet**.

## Cloudflare Pages alternative

No connected Cloudflare tool, credential, or authenticated local browser is available. Plugin directory search returned no Cloudflare integration. The alternative build is ready:

- Build command: `npm run build && npm run check`
- Publish directory: `dist`
- `BASE_PATH=/`
- `SITE_ORIGIN=https://<actual-project>.pages.dev` (set only after Cloudflare assigns the real hostname)
- `wrangler.toml` and Cloudflare `_headers` are provided.
- Do not add a wildcard SPA rewrite: all routes are prerendered.

No Cloudflare account, project, or deployment is claimed to exist. No made-up pages.dev address is supplied.

## Supabase callback configuration

Project: `tyigiyetfxufiixbmnrk`, AgroMax, eu-central-1; created with the user's explicit approval in RumeliFatihi51's Org.

Set Site URL to the final verified hosting origin plus base path, and allow the exact account callback URLs for `?islem=dogrula` and `?islem=sifirla`. The app computes these URLs from the actual origin and Vite base, never from an untrusted redirect parameter.

For GitHub Pages, allow `https://rumelifatihi51.github.io/tarim2/hesap/**`. For Cloudflare, substitute the real assigned host. The connected Supabase tools do not expose Auth URL configuration or SMTP management. These remain unverified, and default production email delivery must not be assumed. Public settings confirm email signups enabled, mailer_autoconfirm=false and anonymous signups disabled.

Only the project's intended publishable key is in source. It is public configuration, not a service-role credential. Do not add any management token, DB password or service-role key to the repository or VITE_ environment.

The development branch explicitly disables automatic Vercel deployments with `git.deploymentEnabled["phase2-cinematic-portal"]=false`. The existing production branch is unchanged. This prevents an accidental Vercel preview from being presented as the requested new target.

Both root Cloudflare review ZIP and `/tarim2/` Pages review ZIP were produced and checked for CRC, 12 HTML pages, correct base paths and all local references (`artifact-tests.json`). A local server with the actual Pages base passed an additional 48 page/viewport views and seven interaction groups (`pages-base-tests.json`). These are artifact/local routing checks, not a public Pages deployment.
