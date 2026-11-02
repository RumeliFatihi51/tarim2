# AgroMax — photographic quality correction

Baseline: `263a23d`. Backup: `backup/before-studio-quality-20261102`.

The user rejected the flat leaf/sensor and paper archive imagery and specifically requested a different, field-related context design. The correction changes those experiences and the signature edit. It does not claim the old render quality was adequate.

## Art direction

- The leaf polygon, floating optical rings and light tubes are no longer rendered. A natural backlit leaf fills the botanical scene, with real veins, irregular edges, shallow optical depth and native motion. The existing scientific explanations and reversible desktop reading remain.
- The paper archive composition is replaced by **Parselin Bağlamı**: a full-bleed real aerial agricultural landscape. Four editorial controls connect place, observation, history and evidence to the field, without fabricated measurements, boundaries, historical dates or customer data. Mobile uses its own portrait crop and a separate readable text area.
- The signature film is re-edited from native 4K landscape and botanical source footage. No rejected CGI sequence, paper sheet or optical-ring model is selected. Four five-second acts and an embedded closing wordmark remain. The clips are an editorial montage, not a claimed continuous journey through one actual parcel.
- A highly saturated close crop was rejected during review; it is not part of the delivered edit. Selection, subject, native motion and framing changed; the revision does not merely apply effects to the old models.

## Production

`produce_quality.py /path/to/cache` builds from the three downloaded originals referenced by the source manifest. Original source files stay outside the repository. `--resume` reuses completed scene variants while rebuilding the edit. Desktop 1920×1080; mobile 720×1000. H.264/MP4 and VP9/WebM; separate high quality WebP posters. Native motion converted to 24fps, with no optical-flow interpolation or invented camera movement. Desktop and mobile source crops come directly from the 3840px originals.

The 20-second signature fallback has a bandwidth cap; the VP9 signature encodes from the selected intermediate plates rather than recompressing its H.264 fallback. Shorter scene clips preserve more fine texture. All are lazy, silent, non-looping and pausable; reduced motion retains the poster and complete text. Existing shared video loading/visibility controls remain in use.

The source license was checked on Pexels and permits edited website use. Authors and exact pages are listed visibly and in ASSET_CREDITS.md. No footage is called an AgroMax capture or analytics product. This release is a photographic direction, not a claim of new photorealistic CGI production.

## Verification

`quality-qa.cjs`: desktop/mobile new playback, selected content, reduced motion, removal of rejected runtime models, film acts, replay/pause/offscreen pause, MP4 fallback, scoped axe and overflow checks. Page regression checks cover eight routes at six widths. Full-decode output validation and media preservation are recorded here. Browser tests use Chromium; physical devices and Safari are not claimed as tested.

## Before / after and results

- [Light, mobile](comparison-light-mobile.jpg) / [desktop](comparison-light.jpg)
- [Context, mobile](comparison-context-mobile.jpg) / [desktop](comparison-context.jpg)
- [Browser results](qa/tests.json), [page regression](pages/browser-tests.json), [full decode and budgets](video-integrity.json), [preservation](preservation.json)

Comparisons decode the actual previous and current signature files at the same act positions (6s and 11s). They are not concept art. Website captures of both acts are also included. All 130 pre-existing media files are byte-identical. Only the two targeted story components and the added CSS import change in existing application source. The previous film and rejected model sources stay available for rollback; they are not selected in the released site.
