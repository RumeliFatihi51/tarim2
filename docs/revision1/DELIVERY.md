# Aşama 1 premium görsel revizyonu — teslim

Canlı: https://agromax-alpha.vercel.app/

Test edilen uygulama commit'i: `6c4ef92ab6b6861158b5262e623ba81fff9b3a21`.
Vercel: `dpl_DjPbK9dmqWzsyantQfV5EUmtydHm`, READY, production, `agromax` / `eymen3`. Ana alan adı bu yayına bağlı.

## Yapılan iş

- Önceki sürüm tam Git bundle ile yedeklendi ve GitHub'da `backup/before-premium-revision-20261101` dalında korundu.
- Yedi ana sayfanın bütün bölümleri incelendi; koruma ve değiştirme kararları [denetim raporunda](AUDIT.md).
- Kimlik, font, renk, logo, navigasyon, sayfa sırası ve başarılı görüntüler korundu.
- **Yeryüzüne Yolculuk değiştirilmedi.** 111 korunan kaynak/sahne dosyası ve önceki 95 medya byte karşılaştırmasında değişmedi. Gerçek ileri/geri kaydırma testi geri dönüşte sıfır piksel farkı verdi.
- Platform: güçlü arazi fotoğrafı korundu; önemsiz kamera-pan filmi yerine sabit görsel seçildi. Karar desteği bölümüne gerçek geometri, fiziksel ışık/gölge ve bağımsız portre kamerasıyla üretilmiş kavramsal 3D rölyef filmi entegre edildi.
- Teknoloji: fiziksel ölçüm gibi algılanabilen cam panel kompozisyonu yerine paralel damarlı, eğimli buğday laminası ve doğal ışık kullanan özgün 3D film üretildi.
- Filiz ve ana sayfadaki Filiz tanıtımı: dağınık/farklı görsel diller yerine aynı fiziksel yüzeyde yaprak, kaynak eskizi ve malzemeyi ilişkilendiren botanik arşiv; bağlantısız nokta etiketleri kaldırıldı.
- Çözümler: dört başarılı kaynak korundu; her biri kendi konu ölçeğine göre kadrajlandı.
- Hakkımızda: doğal malzeme görselinin ışık/kadraj dengesi ve üzerindeki başlık kontrastı düzeltildi. İletişim: görsel kanal yüzeyiyle bütünleştirildi. Ana sayfadaki zamansal peyzajın yapay renk perdesi azaltıldı.
- Gerçek Blender dosyaları: `src/assets/production/revision1/*.blend`; kaynak rasterler aynı dizinde, tekrar üretim betikleri `scripts/revision1_*`.
- Sekiz gerçek video dosyası, dört yüksek çözünürlüklü poster ve iki Filiz web görseli üretildi. Yeni 14 web varlığı toplam 6.99 MB; en büyük dosya 2.10 MB. Filmler lazy-load, reduced-motion poster, duraklatma ve ekran dışı durma desteğini korur.

## Kanıt / test

[14 önce/sonra karşılaştırması](README.md), [üretim ve kaynak açıklamaları](PRODUCTION.md), [test raporu](QA_REPORT.md).

44 ekran/sayfa kontrolü, 21 axe taraması (0 ihlal), JavaScript kapalı yedi sayfa, menü/klavye/alt sayfa gezinmesi geçti. Normal hareketli testte 14 sayfa görünümü ve altı film/ekran kombinasyonu geçti. Sekiz yeni filmin toplam 1.152 karesi hatasız çözüldü. Son derleme 11 statik sayfa ve 395 yerel referans kontrolünden geçti. Önceden var olan deferred Three.js bundle boyut uyarısı sürüyor; yeni istemci bağımlılığı eklenmedi.

Canlı production adresinde 20 sayfa/ekran kontrolü, yeni 14 medyanın HTTP 200 ve doğru dosya boyutu, yeni mobil filmde HTTP 206 byte-range doğrulandı. Üç yeni kaynak ailesinin HTML işaretleri kontrol edildi; eski yayının önbelleği test edilmiş sayılmadı. JavaScript hatası yok. [Ham canlı sonuçlar](live.json).

## Sınırlar / kalan doğrulamalar

Fiziksel iPhone, Android ve Safari testi yapılmadı; testler Linux Chromium ve emüle genişlikler üzerinde. Gerçek kullanıcı Core Web Vitals ölçülmedi. Sanat yönetimi değerlendirmesi herhangi bir stüdyo onayı veya kullanıcı kabulü değildir.

Arazi filmi fotoğraf dokulu sentetik bir 3D rölyeftir; tam geometrili ağaçlar, gerçek DEM veya analiz değildir. Yaprak çalışması bilimsel mikrograf değildir. Bu sınırlar sayfalarda ve üretim kaydında açık tutulur. Doğrulanmış iletişim adresi/uygulama URL’si hâlâ yok; uydurulmadı. Filiz planlanan özellik olarak kalır.

Gelişmiş etkileşim ve yeni animasyon akışları ikinci aşamadır; bu revizyonda oluşturulmuş gibi raporlanmaz.
