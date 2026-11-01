# Production / selection record

- Preserved: all old media files, design tokens, fonts, logo and navigation. No old asset is deleted.
- Rejected: first polygonal tree / triangle crop terrain proof. `review/parcel-rejected-proof.png` records the rejection; not used on the site.
- New Filiz archive: OpenAI original image generation, botanical paper + leaf + limestone. Exported separately for desktop and mobile (authored portrait crop, not an independently generated portrait). Source `src/assets/production/revision1/filiz-archive.png`.
- New parcel surface: OpenAI original nadir agricultural texture, packed into the Blender files. Synthetic analytic terrain height function; photographic texture is projected onto a continuous tessellated surface. It is a **textured 3D relief**, not a fully modeled orchard and not a real DEM. Real relief, soil edge, physical shadow, area-light material response, looped camera parallax. No claims of photogrammetric measurement.
- New leaf study: curved wheat lamina geometry, longitudinal UVs, existing original generated wheat texture, subtle parallel vein geometry, rough waxy surface with subsurface response, soft raking daylight, finite depth of field. This is botanical illustration in 3D, not a scan or spectral instrument.
- Both scenes: Cycles. Independently staged landscape and portrait cameras. Editable packed `.blend` sources with baked camera keyframes; 24 source frames at 4 fps, motion-interpolated to a 6-second 24 fps delivery loop. Actual geometry renders, not flat image zooms. No new interactive 3D in Stage 1 revision.
- Renderer has no integrated OIDN support. Denoising uses a separate offline Intel Open Image Denoise 1.4.3 RT beauty filter via Python binding `oidn==0.2.1`, Apache-2.0. This tool is not included in the web app. The source script records the pipeline.
- Delivery: MP4/H.264 + WebM/VP9, fast-start MP4, separate mobile streams and WebP posters. Higher-resolution 32-sample Cycles posters are authored separately at 1280×800 and 640×900, with offline OIDN. Delivery films are 960×600 / 480×674, with 8-sample denoised source frames. Existing Film component preserves lazy sources, reduced motion posters, user pause and offscreen pause.

## Sources / rights
New raster masters generated for this project with the OpenAI image tool; no third-party stock photo, third-party model or license attribution is being implied. Existing wheat texture source and attribution remain in `docs/stage1`. Procedural meshes, materials and camera code authored for this project. Intel OIDN is a production tool (Apache-2.0), not a redistributed visual asset.

## Reproduction
`blender -b -t 8 --python scripts/revision1_production.py -- parcel` (or `leaf`). Install `oidn==0.2.1` into a tooling environment; run `scripts/revision1_denoise.py` on each frames folder. Then `python scripts/revision1_encode.py` and `python scripts/revision1_posters.py`. The encoded movie frame sources use the denoised `*-clean` folders. Blender sources can be opened without Python tooling because the imagery is packed.
