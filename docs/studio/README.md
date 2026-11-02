# AgroMax / additive studio production

This release adds four experiences and removes none of the existing sections or assets. Starting point `a5f90f2`; backup branch `backup/additive-studio-20261102`.

- Home: a 20-second signature edit. Real wheat movement → authored light/surface/sensor sculpture → authored contextual archive → real harvest context. No new footage shoot is claimed. Separate desktop and portrait CGI plates, MP4/WebM, posters, complete textual narrative, silent non-looping playback with replay, visibility-controlled lazy loading and reduced-motion poster. Film captions form a four-act narrative. The final two seconds carry an embedded AgroMax end card using the existing Instrument Sans font.
- Technology: three stages of a conceptual light journey. Authored curved leaf geometry, vein network, stylised optical assembly, light paths, materials, shadow lighting and camera movement. Controls and desktop native scroll relate the sculpture to a complete readable explanation. The diagram is not a physics or reflectance simulation. Official Sentinel-2 source linked.
- Filiz: four authored source documents with distinct conceptual artwork and a spatial relation. Selection changes their depth, scale and emphasis. Four complete text passages explain context, observation, history and evidence. Filiz remains planned; there is no chatbot or generated analysis.
- Solutions: four separate editorial reading paths, each with an existing role-specific image, different question, three different steps and a contextual onward link. Original four audience sections and their images remain below.

The user explicitly deferred the real product tour because the application is not yet live. No synthetic dashboard or substitute product screen is included.

## Production and performance

Sources: `src/studio/scene.ts`, `content.ts`, React components, `src/styles/studio.css`; capture harness `studio-render.html`, scripts `render_studio.cjs` and `encode_signature.py`. Run Vite on port 5173, run render script, then encoder. It uses existing CC BY 3.0 derivatives with provenance preserved in ASSET_CREDITS.md. Source rendering is 6fps, interpolated to 24fps; the original CGI source frames are not individually rendered at 24fps. Raw frames are transient production output in `/tmp`; scripts and editable scene sources reproduce them.

WebGL imports only near visibility. DPR capped at 1.5. Rendering stops after interpolation settles and while offscreen; resize/selection resumes it. All geometry, materials, textures, observers and listeners are disposed. Reduced motion skips WebGL; context/import failure retains existing art and all text. No new dependency or analytical backend was added. Existing lazy Three.js chunk warning remains.

## Verification

`studio-qa.cjs` checks both live 3D scenes, source selection, reduced-motion cleanup, all four solution paths, preservation of the original audience articles, four film acts, desktop/mobile source selection, pause and scoped axe checks. `phase2-browser.cjs` checks all routes at six widths. Preservation checks verify every pre-existing public media file, the protected original Journey and source files. Physical phones and Safari are not tested; browser results describe Chromium viewports.

Preservation evidence: `preservation.json` records 124 pre-existing media files unchanged. The only edits to existing source are added imports, components and the new CSS import; no pre-existing source line was deleted. The earlier protection check also passes 111 protected scene/source files and 95 original media files.
