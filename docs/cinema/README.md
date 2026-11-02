# Cinematic reconstruction / 2 November 2026

Previous motion was largely subtle photo drift. This revision adds a genuinely rendered WebGL relief narrative immediately after the successful opening. The hero's existing perspective anchor enters this new narrative; a native skip link preserves navigation freedom.

- Real tessellated geometry, soil cut-edge, original agricultural texture, authored lighting, contact shadow, depth fog and generated elevation contours. Elevation is synthetic, not a measured DEM. No fake analysis or data values.
- Scroll directly drives top-down-to-oblique camera trajectory, the emergence of surface relief and contour opacity. A controlled blend carries the camera narrative into the original full-frame landscape.
- Three large editorial text beats follow the same progression. Forward and backward native scrolling is supported; no scroll-jacking. Rendering only occurs when visible and when progress/viewport changes. GPU objects and textures are disposed on unmount or reduced-motion changes.
- Real-time scene is deferred until near the viewport. Pixel ratio capped at 1.5. WebGL failure / missing texture keeps a photographic narrative. Reduced motion displays all narrative content without 3D.
- Solutions photography now develops into large editorial panoramas; About's material photograph is integrated into the hero rather than a separate narrow tile. Photo apertures open with scrolling and headings enter in directional masks. Existing typography and colour palette remain.
- Same-origin navigation uses a short forest-colour curtain: 190 ms exit and 650 ms entry, with a prepaint bootstrap and actual full-document navigation. Modified clicks, external links and same-page anchors keep their native behaviour. Reduced motion bypasses the curtain. Back/forward cache clears the transition state.
- Original Journey and four-label field scene remain unchanged. 111 protected files and 95 previous media files passed preservation checks.

Actual Chromium: 48 page/viewport views, seven interaction groups, zero JavaScript errors and zero axe violations. New 3D story tested at 1440 and 390 px at progress 0/.44/.9 and in reverse; chapter/progress checks pass. Runtime reduced motion releases the scene. Missing texture preserves the poster. See `scene-tests.json`, `pages/browser-tests.json`, and scene screenshots.

No new Blender video or AI footage is claimed. The new scene is real-time Three.js geometry with original existing conceptual imagery. No scientific result is implied. Physical Safari/iOS/Android tests remain unperformed.

## Production verification

Published to https://agromax-alpha.vercel.app/ with application commit `d6a6284fd7015d2e64772fe01fac324eb80371e8`, Vercel deployment `dpl_58LsxqbveAT22XChvb1dHauxHope` READY. Production GPU scene checks passed forward/reverse progress and three chapters at 1440 and 390 px, runtime reduced motion and missing-texture fallback. See `live-scene-tests.json`. GitHub CI also passed.

Landscape phone 844×390 is checked in `landscape-tests.json`. The first attempt scrolled before font/network layout settled and timed out; the explicit network-idle retry rendered successfully and verified title bounds and horizontal overflow. No successful physical Safari/iOS/Android test is claimed.
