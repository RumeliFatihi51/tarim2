# AgroMax / asset envanteri

Kontrol tarihi: 31 Ekim 2026. Kullanılan her varlık aşağıda listelenir. Kullanılmayan deneme fotoğrafları dağıtım paketinden çıkarılmıştır.

| Dosyalar | İçerik sahibi / kaynak | Lisans ve ticari izin | Nitelik / kullanım |
|---|---|---|---|
| `public/media/earth.webp`, `earth-mobile.webp`, `og.jpg`; kaynak `src/assets/raw/earth.jpg` | Federico Di Dio photography, [fotoğraf sayfası](https://unsplash.com/photos/aerial-view-of-green-trees-and-brown-field-during-daytime-haO04L8LoaU), [asıl görsel](https://images.unsplash.com/photo-1605447302541-bd14aa1417ab) | [Unsplash License](https://unsplash.com/license), ücretsiz ticari kullanım, uyarlama ve site içinde dağıtıma izin. Atıf zorunlu değil; yine de sitede ve bu kayıtta verildi. Dosya kendi başına satılmaz. | Gerçek Toskana manzara fotoğrafı. Sayfa yayın tarihi 15 Kasım 2020; çekim tarihi teyit edilmedi. AgroMax analizi / müşteri parseli değildir. Mobil crop 780×1000; ana 2400×1600. |
| `strata.webp`, `strata-mobile.webp`, `strata.glb`; `src/scenes/strata.blend`; kaynak PNG | Bu proje için özgün Blender üretimi | Üçüncü taraf mesh, HDRI veya doku yok. Proje sahibine teslim edilen özgün çalışma. | S02 kavramsal mineral/cam/porselen katmanları. Gerçek spektral harita değil. Cycles poster ve gerçek 3D GLB. Masaüstü 1500×1200, mobil 900×900. |
| `filiz.webp`, `filiz-mobile.webp`; `src/scenes/filiz.blend`; kaynak PNG | Bu proje için özgün Blender üretimi | Üçüncü taraf varlık yok. Proje sahibine teslim edilen özgün çalışma. | S04 Filiz kavramsal sanat objesi. Porselen, yeşil cam ve bronz. Robot veya ürün ekranı değil. Masaüstü 1500×1200, mobil 900×900. |
| `evidence.webp`, `evidence-mobile.webp`; `src/scenes/evidence.blend`; kaynak PNG | Bu proje için özgün Blender üretimi | Üçüncü taraf varlık yok. Proje sahibine teslim edilen özgün çalışma. | S05 kaynak/değerlendirme sürekliliği. Gerçek ölçüm verisi değil. Masaüstü 1500×1200, mobil 900×900. |
| `public/fonts/manrope.woff2` | Mikhail Sharanda ve Manrope proje katkıcıları, [kaynak](https://github.com/google/fonts/tree/main/ofl/manrope) | SIL OFL 1.1; ticari kullanıma ve lisans metniyle dağıtıma izin. `docs/credits/Manrope-OFL.txt`. | Türkçe + Latin alt kümesi; self-hosted değişken ağırlık. |
| `public/fonts/cormorant-italic.woff2` | Christian Thalmann ve Cormorant proje katkıcıları, [kaynak](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond) | SIL OFL 1.1; ticari kullanım ve dağıtım izinli. `docs/credits/Cormorant-OFL.txt`. | Türkçe + Latin alt kümesi; self-hosted italik. |
| `favicon.svg`, logo işareti, SVG çizgiler, optik grafikler | Bu proje için özgün kodla üretilen görsel tasarım | Haricî ikon veya marka dosyası kullanılmadı. | Düzenlenebilir öneri kelime markası ve işaret; tescilli marka olduğu iddia edilmez. |

Üretim: Blender 4.3.2, Cycles 96 örnek, fiziksel materyaller ve özgün area light düzeni. WebGL için Three.js / GLTFLoader / RoomEnvironment kullanılır; kütüphane lisansları npm paketlerinde yer alır. GSAP yalnız site hareketi için kullanılır. Rakip site, NASA/ESA logosu, doğrulanmamış stock/3D varlık veya AI tarafından üretilmiş fotoğraf kullanılmadı.

Temsili sahneler açıkça sanat çalışması diye belirtilir. Kaynak sağlayıcı veya yazılım kütüphanesi bir AgroMax iş ortağı olarak sunulmaz.

## Cinematic 2.0 additions — 31 October 2026

- `terrain.webp`, `terrain-mobile.webp`: original conceptual landscape artwork generated with OpenAI image generation for this project. Original PNG: `src/assets/production/terrain-art.png`. Not a satellite photograph, verified location, or AgroMax observation. No external stock or competitor image was supplied as reference input.
- `archive.webp`, `archive-mobile.webp`: original generated mineral/porcelain/glass editorial composition, source `src/assets/production/archive-art.png`. Conceptual art, not a scientific illustration or measured data. Both outputs were visually inspected; no third-party brand asset is present. Use is governed by the OpenAI terms applicable to the user's generated output; no CC0 claim is made.
- `context-loom.glb`, `src/scenes/context-loom-v2.blend`: original 9-surface sculptural atlas, authored parametrically in Blender, with thickness, individually animated surfaces and bronze contours. No external mesh or texture used.
- `loom*.mp4/webm`, `filiz-motion*.mp4/webm` and corresponding posters: actual Cycles animation frame renders; camera and object/light motion. Desktop and portrait mobile encodings; exact outputs verified in production report after encoding.
- Intel Open Image Denoise 2.5.1: Apache 2.0 licensed production tool (https://github.com/RenderKit/oidn); downloaded official Linux binary used offline to denoise Blender renders. The library is not shipped to browsers. Generated frame sequences are reproducible from the `.blend` and Python sources and are excluded from Git to avoid hundreds of redundant large files.
