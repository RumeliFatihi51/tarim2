# AgroMax 2.0 / canlı yayın doğrulaması

Production: https://agromax-alpha.vercel.app/

Implementation commit: `77a28d10d917d770cfb3b7dd92da1f959825f356`.
Vercel deployment: `dpl_2UA1iFPbQcXSytgjA3LMKgR68Gc7`, READY, production, `eymen3/agromax`.

Anonymous HTTP checks: ten content routes returned 200, each of eight MP4/WebM assets was readable with an HTTP range request. Root HTML contains the new v2 hero and actual video references.

Anonymous Chromium checks through the public domain: desktop hero film played; mobile exploration menu opened; Filiz link navigated correctly; direct reload on `/filiz/` rendered content; the portrait movie played; captured runtime errors: zero.

This supplements the local browser/axe/Lighthouse and reversible WebGL checks. It does not claim field INP, physical-device coverage or scientific product validation. Later documentation-only commits do not alter the verified UI.
