# Aşama 01 — doğrulama kaydı

Amaç: Yedi mevcut ürün tanıtım sayfası → özgün yerel medya → poster/video/WebGL görüntüsü → serbest gezinme. API, kullanıcı girişi, gerçek analiz veya çalışan Filiz servisi eklenmedi. Testler ürünün bilimsel performansını doğrulamaz.

## Geçen kontroller

| Sınır | Sonuç | Kanıt |
|---|---|---|
| Tasarım sözleşmesi | 15 dosya byte-identical | `qa/stage1/preservation.json`, `scripts/stage1_preservation.py` |
| Önceki medya | 30 dosya silinmedi/değiştirilmedi | aynı preservation kaydı |
| Altı faz metni | Başlangıç sürümüyle aynı | aynı preservation kaydı |
| Statik içerik / responsive | 11 rota × 4 viewport = 44 kontrol; yatay taşma yok | `qa/stage1/routes.json` |
| Erişilebilirlik | 21 axe taraması; 0 A/AA ihlali | aynı routes kaydı |
| JavaScript kapalı | 7 ana sayfa, metinler ve footer gezinmesi mevcut | aynı routes kaydı |
| Mobil menü | Odak döngüsü, Escape, odağı geri verme; deep link/reload/back geçti | aynı routes kaydı |
| Normal hareketli medya | 7 sayfa × desktop/mobile = 14; img decode ve taşma kontrolü geçti | `qa/stage1/media.json` |
| Üç kısa film | 6 desktop/mobile oynatma, durdur/devam ve offscreen pause kontrolü geçti | aynı media kaydı |
| İlk görsel kayıt | 14 gerçek canlı before + 14 yerel after ekranı | `qa/stage1/before`, `after`; inceleme panoları `review/` |
| Önceki Journey | 18 nokta × 2 cihazda gerçek canlı tarayıcı kaydı | `qa/stage1/journey-before` |

Bu tablo yalnız gerçekten yürütülen kontrolleri sayar. Son kamera/render revizyonunun motion ve canlı dağıtım kayıtları aşağıdadır.

## Yakalanan ve düzeltilen sorunlar

- Açılıştaki geniş alt caption durdur düğmesinin hit-test'ini engelliyordu. Caption'ın boş alanı pointer geçişine açıldı, keşif bağlantısı çalışır kaldı. Yeniden 6 medya kontrolü geçti.
- Yeni sahnelere farklı ana medya atanmasına rağmen eski genel film alt metni kullanılıyordu. Sahneye özel doğru alternatif metin desteği eklendi.
- Teknoloji hero'sunun eski caption'ı gizlemesi kavramsal açıklamayı görünmez bırakıyordu. Yeni optik kompozisyonun gerçek spektral ölçüm olmadığı küçük, yerleşimi bozmayan medya notuyla açıklandı.
- WebGL hata fallback'i masaüstüne de portre filmi seçiyordu. Geniş/portre kaynak seçimi mevcut seek kontrolcüsünde ayrıldı.
- İlk bitki pilotundaki kalın kılçık, fazla geniş/uzun yaprak, seyrek tarla ve düz tane yüzeyi düzeltildi. Model 1.2 m kavramsal buğday oranlarına, yaklaşık 16–32 mm yaprak genişliğine ve daha ince gövdeye getirildi; bunlar gerçek parsel ölçümleri değildir.
- Makro geçişte görüntü büyütme hissini uzatan doğrusal mesafe yerine aynı altı uç pozu bağlayan ölçeğe uygun kamera mesafesi kullanıldı. Kamera alanını doldurmak için düzenlenebilir koleksiyon instancing ile tarla devamı eklendi.
- İnce, açık yaprak yüzeyinde katı hacim varsayan SSS yerine Cycles'ta diffuse transmission kullanıldı. Kaynaklar tam 3D'dir; üç kısa sayfa filmi ise ayrı olarak 2.5D diye kayıtlıdır.

## Test sınırları

Gerçek Chromium / Linux, 1440/768/390/320 px; otomatik axe A/AA taraması ve görsel inceleme. Fiziksel telefon, gerçek Safari/iOS, her ekran/grafik kartı veya bütün yardımcı teknoloji kombinasyonları test edilmedi. Otomatik sıfır ihlal tam erişilebilirlik sertifikası değildir. Lusion astronot sekansının bütün hareketleri bu ortamda doğrulanamadı; araştırma kapsamı `../lusion-reference-audit.md` içinde açık. “Lusion ile aynı kalite” ilan edilmiyor.

## İlk ekran laboratuvar ölçümü

Render işi geçici olarak durdurularak, yerel production build üzerinde gerçek Lighthouse/Chromium ölçüldü. Son poster exportuyla **mobil 100/100/100/100, desktop 100/100/100/100** (performance/accessibility/best-practices/SEO). Mobil LCP 1.7 s, desktop 0.7 s, CLS her ikisinde 0; kaydedilen ağ isteklerinde hata yok. İlk mobil ölçüm 94 ve LCP 3.0 s idi; Home mobil poster 279,080 → 194,258 byte (720×960 çözünürlük korunarak) export edildi. Bunlar tekil laboratuvar ölçümleridir; gerçek kullanıcı Core Web Vitals alan verisi veya bütün cihazlarda aynı skor garantisi değildir. Raporlar `qa/stage1/lighthouse-{mobile,desktop}.json`.

## Son entegrasyon kapısı — geçti

- `npm run build`: TypeScript ve Vite başarılı; 11 statik HTML. Three.js'e ait ertelenmiş parça için 500 kB uyarısı var; yeni bağımlılık eklenmedi.
- `npm run check`: **11 sayfa, 397 yerel referans**, benzersiz metadata, bütün medya bütçeleri ve ürün tanıtımı kapsamı geçti. Mobil srcset ve dört Journey video kaynağı da denetlenir.
- Son rota turu: **44 kontrol, 21 axe taraması / 0 ihlal, 7 JavaScript'siz sayfa**.
- `experience.json`: altı masaüstü fazı, gerçek piksel ileri/geri karşılaştırması (**ileri fark 62.082, dönüş farkı 0**), runtime reduced-motion WebGL kapatma, mobil hızlı ileri/geri seek ve eksik GLB'de geniş film fallback'i geçti; **JS hatası yok**.
- `fallbacks.json`: mobil WebM engellendiğinde MP4; iki codec engellendiğinde poster/metin; gerçek `WEBGL_lose_context` sonrası canvas kaldırılıp geniş rendera geçiş geçti.
- `initial-seek.json`: ilk yükleme faz 5'e geciktirilerek sınandı; yanlış ilk video karesi **0**.
- Son `journey-capture`: her iki cihazda 6 faz × başlangıç/orta/bitiş = **36 gerçek tarayıcı görüntüsü**; ayrıca 36 ham render örneği ve iki 18'li pano.
- Web dosyalarının gerçek byte/hash, boyut ve ffprobe codec kayıtları: `qa/stage1/media-manifest.json`. Kaynak kareler ile 24 fps dağıtım kareleri ayrıdır.

Bu kapı yerel production build içindir. Canlı doğrulama `LIVE_VERIFICATION.md` ve `qa/stage1/live*.json` içinde tamamlandı.

Son görsel inceleme, makro çıkışında erken ufuk pan'ının netliği bozduğunu yakaladı; kamera hedefi düzeltildi ve etkilenen kaynak kareler tekrar üretildi. Anlatı duraklarının da 1/15/29/44/58/72 karelerine tam eşlenmesi sağlandı. Bu son medya sürümüyle motion/seek ve canlı kontroller tekrar geçti; ilk teknik geçişin görsel tamamlanma anlamına geldiği varsayılmadı.

Son kamera ve medya sürümüyle bütün motion/fallback/ilk-seek kontrolleri tekrar geçti; JS hatası 0, dönüş piksel farkı 0. İki nihai MP4 tamamen çözümlendi: 288 + 288 kare, siyah kare 0. `video-integrity.json` yalnız bütünlük kontrolüdür; estetik/flicker sertifikası değildir.

Canlı son kapı: 20 sayfa görünümü, 65 medya / doğru byte, HTTP 206 range, özel 404 ve canlı motion/fallback geçti. JS hatası 0. [Canlı kayıt](LIVE_VERIFICATION.md).
