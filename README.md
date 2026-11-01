# AgroMax / Yüzeyin ötesini gör

Canlı site: **https://agromax-alpha.vercel.app/**

Türkçe, bağımsız ürün tanıtımı. Çalışan tarımsal analiz paneli, giriş sistemi veya Filiz sohbeti içermez. Filiz planlanan özelliktir; ürün iddiaları `docs/CLAIM_REGISTER.md` ile izlenir.

## Çalıştırma
```sh
npm ci
npm run dev
npm run build
npm run check
npm run preview
```
React + TypeScript + Vite; 11 statik HTML. Yedi ana sayfa, üç yardımcı sayfa ve özel 404. Vercel'deki mevcut `agromax` projesi bu deponun main dalını yayımlar; statik alt sayfa erişimi korunur.

## Güncel deneyim
Tam ekran tarımsal film açılışı; gözlem, spektral bağlam, zaman, Filiz ve kullanım alanlarını izleyen anlatı; altı aşamalı **Yeryüzüne Yolculuk** finali. Kamera gezegen ölçeğinden bitkiye iner, açık peyzajla çözülür. Masaüstünde gerçek Three.js sahnesi, mobil/WebGL hatasında scroll kontrollü render filmi, hareket azaltmada statik görsel ve metin dökümü. Scroll ele geçirilmez; aşama düğmeleri ve anlatımı geç bağlantısı vardır.

## Kaynaklar
- `src/components/Journey.tsx`, `src/scenes/world.ts`: anlatı, kamera ve gerçek 3D dünya.
- `src/styles/orbital.css`: temel; `story.css`: güncel sanat yönetimi.
- `src/content`: bilimsel içerik ve ürün doğruluğu; `src/config/site.ts`: gerçek adresler sağlanana kadar boş iletişim ve ayrı uygulama URL'si.
- `src/assets/production/journey.blend`, `journey-refined.blend`: paketli dokular, düzenlenebilir bitki/terrain/gezegen, ışık ve kamera anahtarları.
- `public/media/crop.glb`, `journey*.mp4/webm`, `journey-*.webp`: model, gerçek render filmleri ve posterler.

```sh
blender -b -t 2 --python scripts/render_journey.py
blender -b -t 2 --python scripts/refine_journey.py
OIDN_BIN=/path/to/oidnDenoise python scripts/finish_journey.py
```
72 gerçek Cycles karesi/sürüm. 24 fps dağıtım için optik akış; her çıktı karesinin ayrı render olduğu iddia edilmez. İlk prototip reddedilip beş zayıflık düzeltildi. Açılış ve kapanış görüntüleri kasıtlı hibrit kompozisyondur; her görünen piksel yeni gerçek zamanlı render değildir.

## Belgeler ve kanıt
- `docs/lusion-reference-audit.md`: gerçek referans incelemesi ve doğrulanamayan hareketler.
- `docs/agromax-creative-direction.md`: sanat yönetimi, beş zayıf nokta ve düzeltmeler.
- `docs/journey-production.md`: üretim süreci.
- `docs/QA_REPORT.md`, `qa/journey`: güncel gerçek testler; `qa/v3` tarihsel kayıt.
- `ASSET_CREDITS.md`, `THIRD_PARTY_NOTICES.md`: kaynak ve lisanslar.

“Lusion ile aynı kaliteye ulaşıldı” ölçülmüş bir sonuç olarak sunulmaz. Referansın astronot hareketleri bu ortamda doğrulanamadı; bu sınır araştırma belgesinde açıkça kayıtlıdır. Fiziksel mobil cihaz/Safari sertifikasyonu yoktur; gerçek Chromium'da viewport, medya ve GPU testleri yapılır.
