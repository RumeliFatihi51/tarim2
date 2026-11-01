# AgroMax Phase 2 — implementation and outstanding release gates

**Status: implemented and tested development branch; production migration and email loop are blocked. This is not a declaration that every success criterion is complete.**

## 1. Baseline findings

Baseline `48733e8`. All seven pages captured in actual Chromium at 1440 and 390 px. [Audit decisions](AUDIT.md) classify preserved, enhanced and reconstructed sections. The site's strongest parts were its landscape imagery, original field scene, editorial typography and Journey. Weaknesses were passive technical explanations, a long process list, missing account/contact backend and unavailable Pages hosting.

## 2. Preserved successes

Original palette, fonts, logo, layout shell and navigation freedom remain. Journey's models, cameras, controllers and films are unchanged. Hash checks cover 111 protected files and the previous 95 media assets. The original field MP4/WebM/mobile/posters remain byte-identical and the original four labels remain on Home and Filiz. No successful old media was deleted.

## 3–4. Changes by page

- **Home:** editorial question selector for NDVI/NDMI/NDWI; explicit educational scope, correct formulas and caveats. Original opening, field scene and Journey remain. Restrained scoped depth on existing landscape imagery. Same-frame AVIF opening poster with WebP fallback reduces mobile poster bytes by about 65%.
- **Platform:** six-step process becomes a sticky terrain-and-reading composition, with scroll selection and manual stage buttons. Explicit manual choice is protected from delayed observer updates until the next user scroll. Workflow is an explanation, not a running analysis engine.
- **Technology:** selectable spectral regions with approximately positioned Sentinel-2A band centres in nanometres, plain-language interpretation and readable textual values. No invented reflectance graph or computed data. Source links, catalogue and uncertainty sections remain.
- **Filiz:** original field hero preserved; context navigator connects parcel, observation, history and evidence to explanatory reading. Still a planned feature, with no chatbot or fake AI response.
- **Solutions:** coordinated audience navigation and scoped photographic depth preserve four distinct original visual stories and deep links.
- **About:** material imagery and truthful narrative remain; editorial principle numbers and scroll emphasis strengthen its research stance without invented staff, dates or achievements.
- **Contact:** accessible authenticated request intake stores a real owner-linked record, requires consent in the interface, validates lengths and reports success only after receiving an inserted ID. It does not claim to send email. Missing direct email is disclosed. No-JS form is disabled to prevent accidental GET submission of private message text.

## 5–6. Cinematic interaction and motion architecture

`src/phase2` contains process, spectral and context experiences plus scoped motion infrastructure. GSAP contexts and matchMedia own their cleanup, responsive variants and reduced-motion behaviour. Native scroll remains in control; no scroll-jacking or custom cursor is imposed. Existing scene controllers and original field animation remain intact. The Portal keeps the same film element when switching forms. New motion is purposeful and restrained; no new 3D production or video render is claimed.

## 7–8. Account and provider

A real, separate free **AgroMax** Supabase project was created with approval in the user's selected organization: `tyigiyetfxufiixbmnrk`, eu-central-1. Other projects were not modified.

Observation Portal provides login, signup, email confirmation/resend, forgot password, password update, profile-name management and logout states. Forms and Supabase SDK are loaded on demand. Supabase Auth manages passwords, PKCE, refresh and session persistence. The account API is checked with `getUser`; private contact rows are protected by owner RLS, column-level insert grants and a concurrency-safe five-per-hour trigger. Display-name metadata never grants authorization.

Only the intended publishable key is public source configuration. No service-role key, management token or database password is in the repo. The migration file was created with the CLI and aligned to actual applied server version `20261101192841` to avoid future migration drift.

A temporary, short-lived restricted test helper created a disposable preconfirmed Auth fixture without sending email. Real browser login, profile update, persistence after reload, contact insert, logout and post-logout guard passed. The fixture and its contact rows were deleted. The helper was replaced with a permanent HTTP 410 response and verified; no privileged test operation remains. This is **not** a test of email verification delivery.

## 9. Performance and accessibility

[Lab sample](performance-lab.json): mobile Lighthouse 96 performance, 100 accessibility, 100 best practices, 100 SEO; LCP approximately 2.8 s, CLS 0, TBT 0 ms. These are local lab observations, not production Core Web Vitals or an INP measurement. Production LCP should be measured and tuned after hosting is available. Existing deferred Three.js bundle-size warning remains. No new marketing-page download of the Supabase SDK is required.

Root-page tests include 48 page/viewport views at 1920, 1440, 1024, 768, 390 and 320 px. Sixteen axe scans have zero violations. A low-contrast wayfinder and a mobile-header overflow found during development were corrected and retested.

## 10. Completed tests

- Build, typecheck, ESLint, 12 prerendered pages, local references and media budgets.
- Eight pages × six widths; band, workflow, context, account-mode and Portal film-continuity checks.
- Eight JavaScript-free content views, including safely disabled contact submission.
- Real Supabase API rejects unauthenticated account access, anonymous inbox reads, invalid login and invalid signup.
- Actual database transaction verifies owner isolation, cross-owner insert rejection and rate limit; fixtures rolled back.
- Supabase security and performance advisors returned no lints.
- Actual provider fixture covers real browser login, profile update, session persistence, contact insert and logout; all fixtures removed.
- Optimized AVIF decoded and forced-AVIF-failure WebP fallback passed.
- Journey six-camera-stage, reverse-scroll, reduced-motion, missing-model fallback and mobile rapid-seek checks passed; reverse pixel difference 0.

Raw results: `browser-tests.json`, `auth-positive-tests.json`, `provider-tests.json`, `backend-verification.json`, `nojs-tests.json`, `callback-ui-tests.json`, `avif-tests.json`, `journey-tests.json`.

## 11. Unverified / blocked tests

Signup **email delivery**, email-link verification callback, recovery email and the complete password-reset loop are not verified. Public provider settings show email confirmation required and anonymous signups disabled. The available Supabase tools do not expose Auth URL or SMTP management. Do not claim default SMTP accepts every public recipient.

Physical iPhone/Android/Safari, production INP/CWV, real new-host deployment, production callbacks and production smoke tests remain unverified. All test viewport emulation is Chromium on Linux.

## 12. Hosting

**No Phase 2 production URL is claimed.** Existing https://agromax-alpha.vercel.app/ remains the old working production site. Phase 2 targets GitHub Pages first and Cloudflare Pages second. Pages enablement API returned HTTP 403; the user also could not access its settings. No Cloudflare account integration or authenticated browser is available; plugin search found no Cloudflare connector. Static workflows and both build configurations are prepared. [Hosting details](HOSTING.md).

## 13. Source control

Application/source commit: `f73b698b7936ba4a26a756b2f26cf44c147e7269`. Baseline: `48733e8`.

Development branch: `phase2-cinematic-portal`; backup branch: `backup/before-phase2`. Phase 2 is not merged into main while production migration is blocked. Build artifacts and a draft PR make the result reviewable without publishing it to Vercel.

## 14. Remaining release gates

1. Enable Pages using a connection with actual administration+Pages permission, or connect an authorized Cloudflare Pages account.
2. Assign the real new hostname and configure Supabase Site URL/redirect allowlist and production email delivery.
3. Test real signup/confirmation/recovery on that host, repeat production smoke/CWV checks, then merge/release.

These require actual service access; user authorization alone does not add missing API capabilities. No paid service, fabricated domain or fake successful deployment is substituted.

## 15. Visual evidence

Before images are in `before/`. Root page images and six Portal modes have actual browser captures. Side-by-side comparisons are in `comparison/`, for all seven pages at 1440 and 390 px. Visual quality is an art-direction assessment, not a claim of external studio endorsement or perfection.

### Additional artifact validation

Both review ZIPs have valid CRCs, 12 HTML pages and matching local references. The `/tarim2/` build passed a further 48 local page/viewport and seven interaction-group checks. The branch disables its own Vercel auto-deployment without changing the main production branch. Prepared artifacts are not described as a live new hosting service.

### GitHub CI outcome

[Run 41344893084](https://github.com/RumeliFatihi51/tarim2/actions/runs/41344893084) on `bf1b28a`: build job succeeded, including lint/typecheck/build/static checks and the 72,841,244-byte Pages artifact upload. Deployment failed at `actions/configure-pages@v5`: Pages site Not Found (not enabled). This confirms the build is deployable but does not bypass missing hosting permissions. Draft source PR: https://github.com/RumeliFatihi51/tarim2/pull/1. Raw outcome: `ci-tests.json`.
