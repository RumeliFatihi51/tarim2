# AgroMax / Orbital

**Canlı site: https://agromax-alpha.vercel.app/**

Uydu tabanlı tarımsal analiz platformunun bağımsız, Türkçe ürün tanıtım sitesi. React 19, TypeScript, Vite, GSAP ve Three.js. Yedi ana sayfa; gizlilik, kullanım, görsel kredileri ve özel 404 ile toplam 11 statik HTML. Ürün paneli, giriş, sahte analiz veya çalışan chatbot içermez.

## Çalıştırma

Node.js 22.12+.

```sh
npm ci
npm run dev
npm run build
npm run check
npm run preview
```

Build TypeScript kontrolü, Vite paketleme ve React prerender içerir. Sayfa metinleri ve normal linkler JavaScript olmadan da kullanılabilir. Menü yerel dialog ile çalışır; JavaScript kapalıysa alt menü bütün sayfalara erişim sağlar.

## Tasarım ve içerik

- `src/styles/orbital.css`: güncel tek tasarım temeli; Instrument Sans, açık zemin, orman yeşili, ölçülü lime vurgu.
- `src/content/orbital.ts`: ana anlatı metinleri; `site.ts`: kaynaklar, indeksler, kullanım alanları, metadata ve ürün durumu.
- `src/config/site.ts`: gerçek iletişim e-postası ve haricî uygulama URL'si. Kullanıcı henüz sağlamadığı için boştur.
- `src/pages`: her sayfaya özgü kompozisyon.
- `src/components/Cinematic.tsx`, `Film.tsx`: gerçek video / poster ve 3D sahne çerçeveleri.
- `src/scenes/orbital.ts`: özgün GLB ile gerçek zamanlı kamera, ışık ve Dünya sahnesi. Büyük ekranlarda görünürken çalışır; DPR sınırlı, offscreen/sekme/menü duraklatmalı. Reduced-motion poster kullanır.
- `docs/CLAIM_REGISTER.md`: ürün iddiaları ve doğruluk sınırları. Filiz planlanan özelliktir.

## Gerçek prodüksiyon kaynakları

`src/assets/production/orbit-v3.blend`, `field-v3.blend`, kaynak arazi görseli ve NASA Dünya dokusu. `public/media/` WebGL modeli, posterler ve iki ayrı filmin masaüstü/mobil MP4 ve WebM sürümlerini içerir.

```sh
blender -b -t 2 --python scripts/render_orbital_v3.py -- --scene orbit --frames 40 --samples 12 --width 1024 --height 920
blender -b -t 2 --python scripts/render_orbital_v3.py -- --scene field --frames 40 --samples 8 --width 1024 --height 760
OIDN_BIN=/path/to/oidnDenoise python scripts/finish_v3.py
blender -b -t 2 --python scripts/bake_v3_sources.py
npx --yes @gltf-transform/cli@4.2.1 optimize public/media/observation-satellite.glb /tmp/observation.glb --compress meshopt --texture-compress false
cp /tmp/observation.glb public/media/observation-satellite.glb
```

Blender CPU Cycles; OIDN 2.5.1; FFmpeg H.264/VP9, 24 fps çıktı. Üretim geçicileri ve ham kareler Git'e eklenmez. Herhangi bir film üretimi yokmuşken video üretilmiş gibi sunulmaz. Yeniden üretim ve storyboard ayrıntıları `docs/v3/PRODUCTION.md`, lisanslar `ASSET_CREDITS.md`.

## Yayın

Vercel'deki mevcut `agromax` projesi `RumeliFatihi51/tarim2` deposunun `main` dalına bağlıdır. `vercel.json` statik `dist` çıktısını yayımlar; derleme ve bağlantı/kapsam denetimi zorunludur. Alt sayfalar doğrudan dizin/index.html olarak açılır. Gerçek production URL'si derleme sırasında canonical ve sitemap'e girer. İstenirse `BASE_PATH=/alt-yol/` desteklenir.

## Doğrulama

`npm run check`: 11 sayfa, tek H1, metadata, yerel dosya bağlantıları, medya bütçesi ve ürün tanıtım kapsamı. `qa/v3` masaüstü/mobil tarayıcı senaryolarını içerir; Playwright/axe/Lighthouse yolları bu üretim ortamına özeldir, uygulama bağımlılığı değildir. Güncel ölçümler `docs/QA_REPORT.md` ve `qa/v3` JSON dosyalarında bulunur. Önceki QA sonuçları yeni sürümün testi olarak kullanılmaz.

Tasarım denetimi ve sekiz prodüksiyon konsepti: `docs/v3/AUDIT.md`, `docs/v3/CREATIVE_DIRECTION.md`. Önceki sürüm Git backup dalında korunur.
