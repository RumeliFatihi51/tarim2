# Cinematic 2.0 / reproducible production

## Tools actually used
Blender 4.3.2 (Cycles CPU, 16 samples/frame); Intel Open Image Denoise 2.5.1 (high-quality RT filter, LDR/sRGB); FFmpeg (x264 and VP9); Python 3 / Pillow / NumPy; OpenAI image generation for the two new conceptual still artworks.

The renderer's denoising build is unavailable. Instead, the offline production pipeline uses the official Intel OIDN CPU executable. This is a real post-production step, not a claim that Blender's denoiser worked.

## Render and encode

1. Install Blender, FFmpeg, Python dependencies (`Pillow`, `numpy`).
2. Download OIDN from https://github.com/RenderKit/oidn/releases/tag/v2.5.1 and make `oidnDenoise` available on PATH, or set `OIDN_BIN` to its absolute path.
3. `blender -b --threads 8 --python scripts/render_v2.py`
4. `python scripts/finish_films.py` (can run alongside rendering; waits for complete source frames).

The render script saves `context-loom-v2.blend` and `filiz-motion-v2.blend`. Each sequence has 48 actual rendered frames at 8 fps. Encoding interpolates motion to 24 fps, denoises temporally and emits desktop and portrait mobile MP4/WebM. The web composition applies a 6% editorial crop to keep the finite studio set boundary out of frame. Repeating these renders is CPU-intensive; normal site builds do not rerender them.

Raw frame directories and OIDN intermediate files are ignored by Git; `.blend`, generation scripts, final videos and posters are delivered. Full original generated art PNGs are retained in `src/assets/production`.

## Asset intent

The landscape and material-archive stills are conceptual brand artworks. They do not depict an identified real parcel or verified observation. The videos show original physical CGI sculptures; they are not AgroMax app screens. Filiz's real product status remains planned, as recorded in `docs/CLAIM_REGISTER.md`.

## Device strategy

Desktop: terrain image at first paint, real CGI film preview, lazy-loaded GLB signature scene, live reversible camera/layer/light progression; film as the WebGL failure fallback.
Mobile: independently cropped terrain, no WebGL, portrait encoded films. Native scrolling and menu access remain available.
Reduced motion: immediate poster images, no animation or GLB download. Missing video: poster stays rendered. Offscreen/hidden document: playback pauses. Desktop GLB successfully rendered: its obscured video pauses.
