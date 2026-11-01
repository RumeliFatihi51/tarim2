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
- `docs/QA_REPORT.md`, `qa/journey`: önceki Journey sürümünün testleri; güncel Aşama 01 kayıtları `docs/stage1/QA_REPORT.md` ve `qa/stage1` altındadır.
- `ASSET_CREDITS.md`, `THIRD_PARTY_NOTICES.md`: kaynak ve lisanslar.

“Lusion ile aynı kaliteye ulaşıldı” ölçülmüş bir sonuç olarak sunulmaz. Referansın astronot hareketleri bu ortamda doğrulanamadı; bu sınır araştırma belgesinde açıkça kayıtlıdır. Fiziksel mobil cihaz/Safari sertifikasyonu yoktur; gerçek Chromium'da viewport, medya ve GPU testleri yapılır.

## Aşama 01 — görsel prodüksiyon
Mevcut tasarım korunarak her ana sayfaya ayrı sanat yönetimi eklendi. Ana sayfa şafak peyzajı, Platform parseli, Teknoloji optik malzemeleri, Filiz bağlam kompozisyonu, Çözümler'in dört ayrı hedef kitle sahnesi, Hakkımızda doğal çalışma malzemeleri ve İletişim toprak rölyefi kullanır. Üç kısa film 2.5D Blender kompozitidir; tam 3D arazi veya gerçek çekim olarak sunulmaz.

Yeni kaynaklar `src/assets/production/stage1`, web exportları `public/media/stage1`, tekrar üretim betikleri `scripts/stage1_*`. Journey'nin özgün buğday/PBR modeli, hacimsel bulutları, gün ışığı ve ayrı 576×1024 mobil kamera renderı vardır. Masaüstünde bitki yakın planı aynı scroll-seek yolundaki renderla desteklenir. Önceki kaynaklar arşiv olarak durur.

- [Üretim ve tam dosya yolları](docs/stage1/PRODUCTION.md)
- [Yedi ayrı sahne kartı](docs/stage1/SCENE_CARDS.md)
- [Tasarım koruma kaydı](docs/stage1/PRESERVATION.md)
- [Gerçek önce/sonra panoları](docs/stage1/review/README.md)
- [Kontrol sonuçları ve sınırlamalar](docs/stage1/QA_REPORT.md)
