# Yeryüzüne Yolculuk / üretim kaynakları

- `src/assets/production/journey.blend`: ilk tam düzenlenebilir kamera/bitki/gezegen/ara zi kaynağı; ilk kalite prototipi.
- `src/assets/production/journey-refined.blend`: ikinci üretim; karanlık uzay, kamera ölçeğine göre görünürlük, makro toprak karışımı, yumuşak yüzey normalleri, gerçek DOF anahtarları, 72 karelik kamera yolu. Dokular paketlidir.
- `public/media/crop.glb`: özgün, düzenlenebilir gövde, beş kıvrımlı yaprak, başak geometrisi.
- `render_journey.py` → `refine_journey.py` → `finish_journey.py`.
- 72 ayrı Cycles karesi, CPU 8 örnek; OIDN; 24 fps dağıtım için optik akış. Son kare iki kez pad edilerek 12 saniye / 288 kare tamamlanır. Her dağıtım karesinin ayrı render olduğu söylenmez.
- Desktop MP4/WebM 960×600; mobil MP4/WebM 540×720; kısa GOP, sessiz ve scroll ile currentTime kontrolü. Altı gerçek render posteri.
- Masaüstü Three.js: aynı ölçek/koordinat yaklaşımı; altı kamera pozunu native scroll belirler. Atmosferik sprite katmanları ve fresnel kenar, terrain geometry, instanced crop, kavramsal gözlem shader'ı. Gerçek sayısal gözlem yok.
- Mobil ve WebGL hatası: gerçek render filmi. Reduced motion ve JavaScript yokluğu: statik görsel, altı aşamanın metin dökümü ve normal bağlantılar.
- Final peyzajın son kompozisyonu yüksek çözünürlüklü görsel ile hibrittir. Kapanıştaki fotoğrafik katman, ham CGI'ın detaysız ufuk görüntüsünü değiştirir. Açılışta da arazi filmi kullanılır. Bitki/planet/terrain sahnelerinin gerçek dosyaları korunur; bunlar yalnız CSS ile büyütülen fotoğraf değildir.

Tasarım ve beş zayıf noktanın düzeltmeleri `agromax-creative-direction.md`. Referans incelemesinin sınırları `lusion-reference-audit.md`. Lisanslar `ASSET_CREDITS.md`; NASA tarihsel doku ve daha önce üretilmiş özgün tarım görselleri yeniden kullanılır. Lusion varlıkları üründe kullanılmaz.
