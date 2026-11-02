# AgroMax — controlled scene refinement, 2 November 2026

The requested scope is the weak floating terrain maquette shown in the user's mobile screenshot, plus a small number of useful interactions and purposeful film improvements. The established identity and successful cinematic work remain in place.

## What changed

| Area | Before | Delivered |
| --- | --- | --- |
| Platform / evidence | Rotating rectangular landscape maquette, disconnected studio background | Real agricultural process: an 18-second, three-shot harvest edit. A working harvester changes the surface; the cut moves from operation to trace to wider context. Captions follow the edit. Three chapter controls let visitors return to each shot. |
| Platform / process | Same maquette repeated in the six-stage reading | Previously authored natural parcel-context film. Existing six stages and scroll logic retained. |
| Platform / interpretation | Explanatory prose only at this point | Three editorial passages: observation, context, verification. Desktop index follows forward/reverse native scroll; buttons navigate directly. Mobile keeps a compact single-column reading, without a long pinned experience. All three passages remain in the document. |
| Technology / quality | Existing scientific quality list | Existing list retained; a new real wheat/wind film and three controlled explanations introduce cloud/shadow, period and sampling scale. Visual annotations are explicitly illustrative. |

The film changes are **licensed real footage edits**, not new CGI productions. A trial botanical render was rejected after visual inspection and is not integrated or delivered as finished work. No claim of Lusion-level perfection or new product capabilities is made.

## Media production

- Harvest source: MrAyrit, Iowa harvest 2016, real 3840×2160 source, CC BY 3.0. Three selected six-second passages begin at 110s, 70s and 5s. These are editorial cuts from one shoot, not a claimed continuous camera path or time series.
- Wheat source: Coup 53, real 1920×1080 source, CC BY 3.0. Selected 2–14s; real crop movement in wind, no synthetic camera rotation.
- Restrained colour correction, silent output, desktop 1280×720 and separately cropped mobile 576×800. Native source motion, delivered 24fps; no generated optical-flow motion or invented observations.
- MP4/H.264 and WebM/VP9, desktop/mobile WebP posters. New harvest duration 18s / 432 frames; wind 12s / 288 frames. Each is non-looping and can be replayed.
- Browser selects one device variant on first visibility. No hidden preloading; offscreen/menu/hidden-tab playback pauses. Reduced-motion uses a poster and readable content. A complete textual film narrative is available in a disclosure.
- Attribution is visible beside both films; source links and licensing remain available. Details: [asset credits](../../ASSET_CREDITS.md), [source and edit records](../../src/assets/production/field-observation/), [harvest production script](../../scripts/produce_observation.py), [wind production script](../../scripts/produce_wind.py).
- The original large source is retrieved for production only; visitors receive the small encoded derivative. Typical selected WebM payload is about 3.4 MB desktop / 2.0 MB mobile for harvest and 3.9 MB / 1.9 MB for wind, loaded only when visible.

## Preservation

Backup branch: `backup/before-botanical-production-20261102`, starting at `d328bcc`.

`python scripts/revision1_preserve.py` confirms **111 protected source/scene files and 95 original media files byte-identical**. Yeryüzüne Yolculuk, the original field video and its Parsel / Gözlem / Geçmiş / Dayanak treatment, Home's accepted scroll-driven 3D, original page transitions, typography, palette, navigation and product caveats are retained. No original media file was deleted.

## Evidence

- [Desktop before / after](comparison-1440.jpg)
- [Mobile before / after](comparison-390.jpg)
- [Focused browser checks](tests.json): reduced-motion poster, both films playing on desktop/mobile, three timed captions, chapter selection, ending/replay, pause, offscreen pause, reversible desktop reading, interactive explanations, MP4 fallback and total-media-failure poster.
- [Full video decode and frame counts](video-integrity.json).
- [Page regression evidence](pages/browser-tests.json): status, overflow, accessibility and previous interactions at six viewport widths.
- `npm run lint`, `npm run build`, `npm run check`; static build generates all 12 routes and checks media budgets/local references.

Screenshots are actual Chromium captures. Before images were taken from the public release before this update. After comparison images use reduced motion, so show the same real poster rather than a randomly timed video frame; normal playback is tested separately. Physical Android/iOS hardware and Safari were not tested. The existing lazy Three.js chunk size warning remains; no new runtime dependency was added. Scientific validity and agricultural analysis performance are not established by site tests.
