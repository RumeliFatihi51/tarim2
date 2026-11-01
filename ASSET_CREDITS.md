# Güncel varlıklar / Orbital v3

Doğrulama tarihi: 31 Ekim 2026. Önceki görsel tasarımlar Git geçmişi ve backup/site-v2-before-orbital-v3 dalında korunur; aşağıdaki tablo güncel sitede kullanılanları listeler.

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
