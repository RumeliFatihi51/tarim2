# Aşama 01 — gerçek üretim ve tekrar üretim kaydı

Çalışma kapsamı: `AGROMAX_Asama_1_Gorsel_Produksiyon_Master_Prompt _1_.pdf`, 15 sayfa. Başlangıç commit `579bbe9236640d820eaab9165bbf341f74e1abc2`; kurtarma dalı `backup/before-stage1-visual-production`. Kaynak PDF ve kullanıcı dosyaları web dağıtımına konulmadı.

## Üretim türlerini birbirinden ayırma

1. **Özgün kavramsal görüntüler:** `src/assets/production/stage1/*.png`. OpenAI image generation ile bu görev için üretilen raster sanat. Gerçek AgroMax arazisi, müşterisi, ekip üyesi, ölçümü veya fotoğraf çekimi değildir. Kaynaklar ve SHA-256 değerleri `source-register.json` içindedir.
2. **Kompozisyon kaynakları:** aynı isimli `.svg` dosyaları orijinal rasterı gömer ve ayrı bir düzenlenebilir anotasyon katmanı içerir. SVG kabı bir görüntüyü vektör modele veya bağımsız nesnelere dönüştürmez. Raster pikseller fotoğraf/görüntü editöründe düzenlenebilir.
3. **Üç kısa kompozit film:** `home-dawn`, `parcel-context`, `spectrum-optics`. Gerçek Blender Cycles renderı, ancak ana görüntü emisyon kaplamalı bir görüntü düzlemidir; kamera mikro hareketi olan **2.5D kompozit**. Tam modellenmiş arazi, değişen gerçek mevsim, drone çekimi veya spektral ışın izleme gösterimi değildir. Düzleme gerçek model derinliği atfedilmez.
4. **Yeryüzüne Yolculuk:** gerçek arazi mesh'i, tarihsel NASA dokulu gezegen, halo, hacimsel bulutlar, özgün buğday geometrisi, ayrıca üretilmiş botanik renk dokulu PBR yaprak, gövde/glume/kılçık, fiziksel ışık ve gerçek kamera yolu. Son bölüm, ayrıca üretilmiş kavramsal peyzajla hibrit tamamlanır. Three.js masaüstü görünümü gerçek zamanlı; mobil kaynak ayrı Blender kamera düzenidir.

## Kaynaklar ve web dosyaları

Bütün yeni aktif medya `public/media/stage1/` altında; önceki `public/media` varlıkları silinmez. Her ana görüntünün masaüstü `.webp` ve `-mobile.webp` karşılığı vardır. `home-dawn-portrait.png` ve `journey-reveal-portrait.png` aynı kavramsal mekânın ayrıca üretilmiş dikey kompozisyonlarıdır. Diğer statik sahnelerde konuya göre odaklanmış portre exportları kullanılır; bunlar yeni kamera renderı diye sunulmaz.

| Sayfa | Ana web dosyası | Gerçek üretim kaynağı | İkincil |
|---|---|---|---|
| Ana sayfa | `public/media/stage1/home-dawn.mp4` / `.webm`, mobil/poster | `src/assets/production/stage1/home-dawn-{wide,portrait}.blend`, orijinal PNG/SVG | `perspective-detail.webp`, `temporal-earth.webp`, Journey |
| Platform | `public/media/stage1/parcel-context.mp4` / `.webm`, mobil/poster | `src/assets/production/stage1/parcel-context-{wide,portrait}.blend`, PNG/SVG | Mevcut parsel bağlam etiketleri |
| Teknoloji | `public/media/stage1/spectrum-optics.mp4` / `.webm`, mobil/poster | `src/assets/production/stage1/spectrum-optics-{wide,portrait}.blend`, PNG/SVG | Mevcut bilimsel kaynak ve indeks metinleri |
| Filiz | `public/media/stage1/filiz-context.webp`, mobil | `src/assets/production/stage1/filiz-context.{png,svg}` | Kaynak/bağlam etiketleri korunur |
| Çözümler | `public/media/stage1/solution-{advisor,cooperative,enterprise,research}.webp`, mobil | Aynı isimli `src/assets/production/stage1/*.{png,svg}` | Önceki genel peyzaj banner'ı korunur |
| Hakkımızda | `public/media/stage1/about-material.webp`, mobil | `src/assets/production/stage1/about-material.{png,svg}` | Gerçek ekip/atölye fotoğrafı değildir |
| İletişim | `public/media/stage1/contact-earth.webp`, mobil | `src/assets/production/stage1/contact-earth.{png,svg}` | İletişim bilgisi hâlâ doğrulanmış değil |

Üç mikro filmin her formatı 2.667 saniye / 64 dağıtım karesidir. Her yönde 32 gerçek Cycles kaynak karesi 12 fps; döngü sınırında iki sarılı örnek; FFmpeg optik akış ile 24 fps. 64 karenin tamamı ayrı render değildir. Masaüstü 1280×720, portre 720×960. Portre için ayrı kamera kurulumu vardır; evrensel merkez kırpma yapılmaz.

## Yeniden üretim

Blender 4.3.2, Python/NumPy/Pillow, FFmpeg; Cycles CPU; harici Intel Open Image Denoise 2.5.1. Bu makinede Blender'ın gömülü OIDN'i desteklenmediğinden son işlem harici OIDN ile yapılır.

```sh
python scripts/stage1_assets.py
blender -b -t 2 --python scripts/stage1_media.py
python scripts/stage1_finish_media.py
blender -b -t 2 --python scripts/stage1_botany.py
blender -b -t 2 --python scripts/stage1_journey.py
OIDN_BIN=/path/to/oidnDenoise python scripts/stage1_finish_journey.py
SITE_ORIGIN=https://agromax-alpha.vercel.app npm run build
npm run check
```

`stage1_assets.py` orijinal dosyalar repo içinde mevcutsa bunları kullanır; yalnız eksik kaynaklar için oturumun `generated_images` klasörüne bakar. `.blend` dosyalarında kullanılan dokular packed durumdadır. Tam render dizileri yeniden üretilebilir ara çıktılardır ve Git'e alınmaz. Seçilen faz kareleri/karşılaştırma panoları QA teslim paketindedir. OIDN/Blender/FFmpeg araçları kaynak paketine gömülmez.

## Sınırlı teknik istisnalar

Yeni `stage1.css` yalnızca yeni medya çocuklarını boyutlandırır. Çözümler'de dört mevcut numaralı article'a kendi metninden sonra görsel eklendi; grid ve numaralı akış korunur. İletişim kanalının içinde 180 px materyal görseli eklendi; bölümün yüksekliği büyüdü, CTA ve durum metni aynı. Journey hata fallback'inde geniş ekran artık geniş renderı seçer; mobil kendi renderını seçer. Bu kaynak seçimi düzeltmesi mevcut native scroll/seek mekanizmasını değiştirmez.

## İlk pilotların eleştirisi

Home ve Solutions pilotları gerçek tarayıcıda desktop/mobile incelendi. Tekrarlayan tarla yerine ayrı alanlar ve insan ölçeği başarıyla ayrıştı. Journey'nin ilk bitki pilotunda kalın kılçık ve açık renkli düz glume yapısı plastik görünüyordu; geometri ve PBR mikro doku revize edildi. İlk ham finalde ufuk yüzeyi zayıf kaldığından, orijinal kaynak saklanarak yeni şafak peyzajı ile mevcut hibrit final tamamlandı. Kalite değerlendirmesi iç sanat yönetimi kararıdır, Lusion'a eşdeğerlik sertifikası değildir.

Ek tarayıcı bulgusu: Ana sayfadaki mevcut geniş alt caption alanı, durdur düğmesinin tıklamasını kesiyordu. Konum ve stil sabit tutularak boş caption alanının pointer hit-test'i kaldırıldı; keşif bağlantısı etkileşimli kaldı. Mikro film kontrolü ve offscreen pause testi bu gerçek kullanıcı sorununu yakaladı. Ayrıca bitki aşamasında mevcut scroll-seek kontrolcüsünün geniş renderı WebGL üstünde sınırlı bir aralıkta göstermesi, fiziksel DOF ve mikro dokuyu koruyan gerekçeli hibrit entegrasyondur. Altı aşama, süre, düğmeler ve native scroll değişmez.

Journey dağıtım hedefi: geniş 1040×650, bağımsız portre 576×1024; her biri 72 gerçek kaynak karesi / 6 fps, OIDN ve 24 fps optik akışla 12 saniye / 288 dağıtım karesi. Bitki yaprakları yaklaşık 18–32 mm genişliğe düzeltildi; başlangıçtaki mısır benzeri genişlik bırakılmadı.

## Son pilot revizyonları

Yakın planın oranları buğdaya uyarlandı: 1.2 m boy, yaklaşık 5.4 mm taban gövde çapı, 19–29 cm yaprak uzunluğu ve 16–32 mm genişlik; değişken boy/rotasyon. Bunlar kavramsal modelleme ölçekleridir. 1.271 özgün bitki yerleşiminden oluşan ana tile, kamera dışına devam eden koleksiyon instancing ile tekrarlanır. Aynı geometri ve PBR dokuları paylaşılır; siteye on binlerce kopya dosya indirilmez. Masaüstü GLB 7.311 vertex, 12.832 triangle, dört materyal ve beş texture içerir; eski model 1.804 triangle / texturesizdi. Dosya 1.5 MB bütçesi içinde kalır.

Bitki fazına giriş/çıkışta aynı uç kamera pozları arasında üstel mesafe ve yumuşak yön değişimi kullanılır; faz adları, metinleri ve native scroll sistemi sabittir. Yakın planın ince yaprak shader'ı diffuse transmission ile gerçek ışık geçirgenliği sağlar. Geçersiz saydam katı bitki görünümü bırakılmadı. Alan derinliği fiziksel kamera ayarıdır. Final özgün peyzajla kaydedilmiş Blender compositor geçişidir; gerçek drone çekimi diye sunulmaz.

Mikro filmlerin kamera yolları ayrılaştırıldı: Home hafif geniş kadraj drift'i, Platform yatay inceleme, Teknoloji dikey makro drift. Bunlar kontrollü 2.5D mikro hareketlerdir; kapsamlı yeni etkileşim mimarisi değildir.

Kamera eşlemesi: `scripts/stage1_camera_track.py`, paketlenmiş Blender kamerasının 72 gerçek örneğini `src/content/journey-camera.json` içine çıkarır. WebGL aynı kaynak saati ve optik kadrajı kullanır. Mevcut scroll-seek kontrolcüsü atmosfer ve bitki bölümlerinde renderı gösterir; bu sahneye özgü hibrit pencere seçimi yeni bir site çapı etkileşim sistemi değildir. En yakın yaprak yüzeyinin rüzgârla hareketi, 55–62. karelerde gerçek dünya konumundan netlik mesafesine bake edilir.

Atmosfer son işlemi: uzaktan küçük kümelerin erken görünmesi ertelendi; küresel/yerel kavramsal yüzeyler arasından kamera homojen bir stratus hacminden geçer. Opaque geçiş kareleri kasıtlı bulut içi görüntüdür, eksik video veya siyah kare değildir. Shader gökyüzü dolgusunu yaklaşıklar; fiziksel meteoroloji simülasyonu iddiası yoktur. `stage1_atmosphere.py` ana üretime dahildir; `stage1_atmosphere_finish.py` yalnız etkilenen eski kareleri yeniden üretmek için kullanılmıştır.

Son kamera düzeltmesi: makrodan çıkışta yakın hedefi uzak ufka erken taşımak, netlik hedefini kameranın arkasında bırakıyordu. Çıkış önce yaprak hedefinde geri dolly yapar; ufuk pan'ı yalnız peyzaj ölçeğinde açılır. Etkilenen 59–69. kareler iki kamera için yeniden render edildi. `stage1_exit_refinement.py` bu sınırlı düzeltmeyi uygular; ana üretim betiği aynı matematiği içerir. `journey-clock.ts`, altı anlatı durağını tam olarak kaynak kareler 1/15/29/44/58/72 ile eşler; 12 saniyeye yaklaşık doğrusal eşleme yapılmaz.
