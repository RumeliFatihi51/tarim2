# Varlıklar ve sürüm kaydı

Doğrulama tarihi: 31 Ekim 2026. Önceki görsel tasarımlar Git geçmişi ve backup/site-v2-before-orbital-v3 dalında korunur; aşağıdaki ilk tablo Orbital v3 kaynaklarını, son bölüm Aşama 01 güncellemesini kaydeder. Korunan arşiv kaynakları aktif sayfa medyası olarak sunulmaz.

| Kullanılan dosya | Üretici / kaynak | Haklar ve kullanım |
|---|---|---|
| observation-satellite.glb | Bu proje için özgün Blender modellemesi; scripts/render_orbital_v3.py | Hazır üçüncü taraf model yok. Optik EO uydusu kavramı; gerçek bir görev aracı veya sahip olunan AgroMax uydusu olduğu ileri sürülmez. Meshopt optimize edilmiş dağıtım modeli. |
| orbit.mp4, orbit.webm ve -mobile sürümleri; orbit-poster*.webp | Özgün Blender Cycles render dizisi; gerçek kamera ve ışık hareketi | Projeye özel model/malzeme/kamera üretimi. Dünya rengi aşağıdaki NASA kaynağını kullanır. |
| field.mp4, field.webm ve -mobile sürümleri; field-poster*.webp | Özgün Blender arazi yüzeyi, ışık ve kamera; kaynak agriculture-v3-original.png | Gerçek arazi geometrisinin kamera animasyonu. Gerçek konum, tarih veya analiz çıktısı değildir. |
| agriculture.webp, agriculture-mobile.webp; agriculture-v3-original.png | OpenAI image generation; bu görev için üretilen özgün kavramsal tarımsal peyzaj | Üçüncü taraf fotoğrafçının eseri olarak sunulmaz. Kullanıcıya konsept görsel olduğu açıklanır. Belirli bir parsel veya doğrulanmış gözlem iddiası yok. |
| canopy.webp, canopy-mobile.webp; canopy-v3-original.png | OpenAI image generation; özgün tarla seviyesinde buğday kompozisyonu | Kavramsal tarım görseli; gerçek konum, ekip veya müşteri gösterimi değildir. |
| nasa-blue-marble.jpg → earth-color.webp | NASA Earth Observatory, Blue Marble: Next Generation, December 2004, Topography and Bathymetry; Reto Stöckli / NASA GSFC | NASA görsel kullanım ilkeleri kapsamında yeryüzü betimlemesi. İnsan, NASA logosu, arma veya ticari destek ifadesi yok. Kaynak kamuya açık ve aşağıda bağlı; sahiplik/onay iddiası yok. |
| instrument-sans.woff2 | The Instrument Sans Project Authors | SIL Open Font License 1.1; public/fonts/InstrumentSans-OFL.txt. Türkçe Latin alt kümesi, değişken ağırlık; kendimiz barındırıyoruz. |
| favicon.svg, Mark, Icon ve gezinme simgeleri | Projede çizilen SVG | Üçüncü taraf simge paketi kullanılmadı. |

## Doğrudan kaynaklar

- [NASA Blue Marble, topography and bathymetry, aylık küresel dokular](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-topography-bathymetry/)
- [İndirilen 5400×2700 Aralık dosyası](https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg)
- [NASA Blue Marble arşivi ve üretici bilgisi](https://svs.gsfc.nasa.gov/12564/)
- [NASA görsel/medya kullanım ilkeleri](https://www.nasa.gov/nasa-brand-center/images-and-media/), bilhassa ticari kullanım ve onay izlenimi yasağı.
- [Instrument Sans kaynak ve OFL](https://github.com/google/fonts/tree/main/ofl/instrumentsans)

NASA dokusu bir LLM çıktısı olarak NASA'ya atfedilmez. Doğrudan alınan tarihsel görüntü yalnız Blender/WebGL malzeme dokusuna uygulanmıştır. CGI render ve site metni AgroMax projesinin üretimidir; NASA tarafından denetlenmiş veya desteklenmiş değildir.

Kullanılmayan Poly Haven, ambientCG, Sketchfab, BlenderKit veya Mixamo varlıkları kullanılmış gibi listelenmez. Önceki sürümlerin Unsplash görseli ve Manrope/Cormorant fontları güncel sayfalarda kullanılmaz.

## Yeryüzüne Yolculuk / 1 Kasım 2026
`crop.glb`, `journey.blend`, `journey-refined.blend`, `render_journey.py`, `refine_journey.py`: proje için özgün gövde, yaprak, başak, arazi, toprak, kamera ve ışık üretimi. `journey*.mp4/webm` gerçek Cycles karelerinden kodlanır. Gezegen önceki NASA Blue Marble tarihsel dokusunu; arazi önceki özgün kavramsal peyzajı kullanır. Gerçek uydu ölçümü değildir. Lusion'a ait geometri, karakter, fotoğraf, video veya kod bu siteye aktarılmadı. Araştırma ekran görüntüleri yalnız yerel QA arşivindedir, siteye dağıtılmaz.

## Aşama 01 görsel prodüksiyon / 1 Kasım 2026

`public/media/stage1/` ve `src/assets/production/stage1/`:

- `home-dawn`, `home-dawn-portrait`, `perspective-detail`, `temporal-earth`, `parcel-context`, `spectrum-optics`, `filiz-context`, `solution-advisor`, `solution-cooperative`, `solution-enterprise`, `solution-research`, `about-material`, `contact-earth`, `journey-geography`, `journey-reveal`, `journey-reveal-portrait`, `botanical-reference`: OpenAI image generation ile bu görevde üretilen özgün kavramsal sanat. [OpenAI kullanım koşulları](https://openai.com/policies/terms-of-use/) çerçevesinde çıktı kullanımı; üçüncü taraf stok lisansı veya CC0 lisansı ileri sürülmez. Üretilmiş görüntülere mutlak benzersizlik/telif garantisi verilmez. Gerçek konum, ölçüm, insan veya çalışma fotoğrafı olarak kullanılmaz. `botanical-reference` yalnız üretim referansıdır; sitede gösterilmez.
- Aynı isimli PNG'ler orijinal raster kaynak, SVG'ler gömülü raster + ayrı anotasyon grubudur. Düzenlenebilir vektör arazi veya tam modellenmiş ortam oldukları iddia edilmez. SHA-256: `src/assets/production/stage1/source-register.json`.
- `home-dawn`, `parcel-context`, `spectrum-optics` filmleri/posterleri: bu rasterların Blender emisyon düzlemi ve kamera mikro hareketiyle işlenmiş **2.5D kompozit renderları**. Fiziksel drone çekimi veya tam 3D arazi prodüksiyonu değildir. Her formatta ayrı geniş/portre kamera kaynağı saklanır.
- `wheat.glb`, `leaf-color.jpg`, `leaf-normal.png`, `leaf-roughness.jpg`, `grain-color.jpg`, `grain-height.png`, `journey-botany.blend`, `journey-wide.blend`, `journey-portrait.blend`: projede özgün geometri ve prosedürel doku üretimi; hazır model paketi kullanılmadı. Yeryüzü tarihsel NASA kaynağı önceki tabloda kayıtlıdır. Journey'nin hacimsel bulutları ve kamera hareketleri Blender'da üretilir. Kapanışta özgün peyzaj ile hibrit kompozisyon kullanılır. Sayısal analiz değildir.
- Blender: [GNU GPL](https://www.blender.org/about/license/); bu lisans renderların GPL olmasını şart koşmaz. FFmpeg/Intel OIDN yalnız üretim araçlarıdır. Web dağıtımına araç ikilisi eklenmez.

Yeni ticari stok, Poly Haven, Sketchfab, ambientCG, BlenderKit veya Mixamo varlığı kullanılmadı. Lusion araştırma görüntüleri web'e veya kaynak prodüksiyon varlığı olarak aktarılmadı. Üretim ayrıntıları `docs/stage1/PRODUCTION.md`.

`wheat-lamina-original.png`: bu aşamada ayrıca OpenAI image generation ile üretilmiş buğday yaprak yüzeyi, gerçek taranmış numune değildir. `leaf-color.jpg` bu orijinal doku kaynağını kullanır. Normal/roughness haritaları kodla türetilmiş temsili materyal parametreleridir, ölçülmüş fiziksel özellikler veya bitki analizi değildir.

## Observation edit / 2 November 2026

- **Harvest:** [Drone Footage Of Iowa Combine Harvesting Beans](https://commons.wikimedia.org/wiki/File:Drone_Footage_Of_Iowa_Combine_Harvesting_Beans.webm), **MrAyrit**, Iowa harvest 2016, **[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)**. Real 4K drone footage. AgroMax edit selects three six-second passages (110s, 70s, 5s), removes audio, crops/resizes and applies restrained colour correction. Delivered as `public/media/observation/harvest*`. Attribution is visible beside the film.
- **Wheat and wind:** [ASMR field of wheat – nature](https://commons.wikimedia.org/wiki/File:ASMR_field_of_wheat_-_nature.webm), **Coup 53**, **[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)**. Real 1080p footage, selected 2–14s, silent crop/resize/colour correction. Delivered as `public/media/observation/wind*`. Attribution is visible beside the section.
- Neither footage is an AgroMax field capture, satellite observation, customer site or analysis output. Overlay shadow and sampling grid in the quality explanation are illustrative annotations, not measured products or a scientific simulation.
- Licensing metadata snapshots, source hashes and edit decisions: `src/assets/production/field-observation/`. Reproduction: `scripts/produce_observation.py` and `scripts/produce_wind.py`. Original large source files can be downloaded from the exact URLs in those records; the 320 MB harvest source is not shipped to visitors or committed to Git.

## Additive studio / signature film — 2 November 2026
The 20-second signature edit combines five seconds of the previously licensed Coup 53 wheat footage, authored optical and archive WebGL sequences, and five seconds of the previously licensed MrAyrit harvest footage (CC BY 3.0; source links above and alongside the film). No footage is represented as an AgroMax customer or satellite analysis. The two new CGI plates are original procedural geometry, materials and canvas artwork in `src/studio/scene.ts`. They are explanatory sculptures, not reflectance simulations or actual source records. `scripts/render_studio.cjs` captures 32 source frames per plate and device; `scripts/encode_signature.py` interpolates the 6fps source to a 24fps delivery and edits four five-second shots. Desktop and portrait are separately rendered. The original media files are retained unchanged.

The signature film ends with an embedded AgroMax wordmark card; Instrument Sans is used under its existing OFL license in public/fonts/InstrumentSans-OFL.txt.
