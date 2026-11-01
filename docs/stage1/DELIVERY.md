# AgroMax / Aşama 01 teslim kaydı

Canlı adres: https://agromax-alpha.vercel.app/

Bu iş, kullanıcının son 15 sayfalık **Aşama 1 — Görsel Prodüksiyon** PDF'sine göre yürütüldü. Önceki geniş yeniden tasarım talimatlarından farklı olarak mevcut tasarım kimliği korundu. Bu belge, teknik üretimin ve doğrulamanın kaydıdır; Lusion'a eşdeğerlik veya her cihazda kusursuzluk sertifikası değildir.

## Korunanlar

Instrument Sans, font dosyası/OFL, renk paleti, logo, temel grid, site genişlikleri, başlık hiyerarşisi, bölüm sırası, navigasyon, footer, CTA, ürün durumları, bilimsel indeks açıklamaları, gizlilik/kullanım metinleri, Vercel ayarları, React/TypeScript/Vite altyapısı ve bağımlılıklar korundu. 15 çekirdek dosya byte bazında aynı; eski 30 medya dosyası silinmedi veya değiştirilmedi. Altı Journey fazının metinleri aynı.

Başlangıç: `579bbe9236640d820eaab9165bbf341f74e1abc2`. GitHub kurtarma dalı: [backup/before-stage1-visual-production](https://github.com/RumeliFatihi51/tarim2/tree/backup/before-stage1-visual-production). Kanıt: [koruma kaydı](../../qa/stage1/preservation.json).

## Sayfalara özgü üretim

| Sayfa | Eklenen görsel anlatım | Ana dosyalar |
|---|---|---|
| Ana sayfa | Şafak/su yolu, yakın toprak-su detayı, ayrı sıcak zaman metaforu | `public/media/stage1/home-dawn*`, `perspective-detail*`, `temporal-earth*` |
| Platform | Tek parselin eğim, sınır ve toprak bağlamı | `public/media/stage1/parcel-context*` |
| Teknoloji | Yaprak/optik yüzey/ışık ilişkisi; ölçüm olmadığı görünür notla belirtilir | `public/media/stage1/spectrum-optics*` |
| Filiz | Botanik damar, topografya ve kaynak ilişkilerinin maddesel kompozisyonu | `public/media/stage1/filiz-context*` |
| Çözümler | Danışman için saha hazırlığı; kooperatif için bağlı parseller; işletme için geniş geometri; araştırma için örnek/kaynak masası | `public/media/stage1/solution-advisor*`, `solution-cooperative*`, `solution-enterprise*`, `solution-research*` |
| Hakkımızda | Doğal çalışma materyalleri; hayalî ekip veya atölye fotoğrafı iddiası yok | `public/media/stage1/about-material*` |
| İletişim | Tek, sakin toprak/rölyef/lif jesti; adres veya form uydurulmadı | `public/media/stage1/contact-earth*` |

Her görüntünün orijinal PNG'si ve düzenlenebilir kompozisyon kabı `src/assets/production/stage1/` içindedir. SVG, gömülü raster ve anotasyon grubudur; fotoğrafı vektör modele dönüştürdüğü iddia edilmez. Kaynak/sha kayıtları: `source-register.json`. Üç kısa film gerçek Blender renderından kodlanmış **2.5D kompozitlerdir**; tam 3D arazi veya drone çekimi diye sunulmaz. Altı `.blend` kamera kaynağı, MP4/WebM, ayrı portre export ve posterleri vardır.

## Yeryüzüne Yolculuk

- Altı anlatı fazı ve native scroll/ileri-geri/aşama düğmeleri korunur.
- Yeni coğrafya dokusu, kontrollü arazi rölyefi, atmosferik halo ve gerçek hacimsel bulut geçişi vardır.
- Özgün buğday: 7.311 vertex, 12.832 triangle, dört materyal, beş texture; ince gövde, daha doğru yaprak oranları, glume/kılçık, PBR ve diffuse transmission. Düzenlenebilir tile/collection instancing ile kadraj dışında da devam eden tarla.
- Rüzgârla hareket eden yaprağa göre bake edilen netlik mesafesi ve gerçek Cycles DOF'u kullanılır.
- Paketli kaynaklar: `src/assets/production/stage1/journey-botany.blend`, `journey-wide.blend`, `journey-portrait.blend`. GLB: `public/media/stage1/wheat.glb`.
- Kamera saati `src/content/journey-camera.json` ile gerçek Blender kamerasından aktarılır. WebGL ve render handoff'u ayrı, yaklaşık yollar kullanmaz.
- Geniş 1040×650 ve bağımsız portre 576×1024; her biri 72 gerçek kaynak kare / 6 fps. OIDN + 24 fps optik akışla 12 saniyelik MP4/WebM. Her dağıtım karesi ayrı render değildir.
- Atmosfer ve bitki pencerelerinde render kullanılır; diğer bölümlerde masaüstü gerçek zamanlı sahne, hatada tam film, reduced motion'da statik görsel vardır. Final ayrıca üretilmiş peyzajla hibrit çözülür.

## Görsel kanıt ve testler

[Gerçek önce/sonra karşılaştırmaları ve 18 karelik render panoları](review/README.md) · [görsel puanlama](VISUAL_REVIEW.md) · [QA ayrıntıları](QA_REPORT.md) · [üretim/tekrar üretim](PRODUCTION.md) · [sahne kartları](SCENE_CARDS.md).

Statik rota, responsive, a11y, JavaScript'siz erişim, medya çözümleme, durdurma/ekran dışı pause, kamera ileri/geri ve fallback kontrollerinin gerçek JSON kayıtları `qa/stage1/` altındadır. [Canlı dağıtım kontrolü tamamlandı](LIVE_VERIFICATION.md): 20 görünüm, 65 medya, 206 range, özel 404 ve Journey motion/fallback kontrolleri geçti; JS hatası 0. Ölçümler ürünün bilimsel performansını kanıtlamaz.

## Sınırlar

Gerçek fiziki telefon/Safari testi ve Lusion astronot sekansının bütün hareketleri bu ortamda doğrulanmadı. Arazi fotogrametri değildir; CGI bitki gerçek saha makro çekimi değildir. Üç kısa film 2.5D'dir. Daha yüksek geometri/materyal rafinmanı yapılabilecek boyutlar görsel puanlamada açıkça belirtilir. Görseller gerçek analiz, müşteri, ekip, uydu sahipliği veya bitmiş Filiz ürünü olarak sunulmaz.

Aşama 2'nin site çapı yeni etkileşim mimarisi ve Aşama 3'ün ileri optimizasyon paketi bu işte kurulmadı. Mevcut kontrolcüdeki kaynak seçimi/readiness hataları ve medya export ağırlıkları bu aşamanın gerektirdiği sınırlı düzeltmelerdir. Yeni runtime bağımlılığı eklenmedi.
