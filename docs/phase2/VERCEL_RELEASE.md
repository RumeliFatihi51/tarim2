# Vercel publication / user-authorized change of target

The user explicitly authorized publishing the existing Phase 2 changes to Vercel so the current public site is updated. This supersedes the earlier restriction against using Vercel for this release. Project: agromax (`prj_iiyAcD13Kq0nRErj4BfPehihIsnO`), team eymen3. Intended public URL: https://agromax-alpha.vercel.app/.

This publication does not imply that all original Phase 2 criteria are complete. Email verification and password-reset delivery/callbacks remain unverified. The account screen explicitly labels the area as a prerelease and says those email flows are not ready for general use. Real-provider login/profile/session/contact/logout were previously tested with a disposable preconfirmed account; those tests are not email-flow tests.

The earlier delivery and CI reports remain historical records of the original GitHub Pages/Cloudflare migration attempt. Existing Journey, original field video and media preservation checks remain applicable.

## Verified publication

Application commit `92de39a99a81f9654793b0df381c8c1aa736044a`, deployment `dpl_CLdm2K1pVc6jopJVpzHmpSSHaH7Y`: READY and aliased to https://agromax-alpha.vercel.app/.

Public Chromium verification passed 48 page/viewport views (eight pages at six widths), seven interaction groups, zero axe violations and zero JavaScript errors. Raw results: `vercel-live-tests.json`. The first test attempt asserted a signup field before async session initialization finished; the harness was corrected to wait for the field, then the full suite passed. No application fix was needed for that timing issue.

Pages publishing now requires explicit workflow dispatch and `PAGES_ENABLED=true`; ordinary pushes build/check the artifact without attempting the unavailable Pages service. The current requested production target is Vercel.

Still incomplete: actual email signup/verification/recovery round trips, physical Safari/iPhone/Android checks and production field Core Web Vitals/INP. The earlier original GH/Cloudflare target was not completed and is superseded for this publication by the user's explicit Vercel instruction.
