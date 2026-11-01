# Canlı doğrulama / 1 Kasım 2026

- URL: https://agromax-alpha.vercel.app/
- Vercel projesi: `agromax`, `prj_iiyAcD13Kq0nRErj4BfPehihIsnO`; team `eymen3`.
- Üretim dağıtımı: `dpl_3ndHUcP82HkQJUequhZGyZBpdLyG`, **READY**.
- Test edilen kod commit'i: `90e73f87774df088f96f1d941483886ead867232`, GitHub `main`.
- Altyapı: React/TypeScript/Vite, 11 statik HTML; yeni sunucu fonksiyonu veya uygulama backend'i yok.

Gerçek Chromium/proxy ile canlı URL'de 10 rota × desktop/mobile = **20 görünüm** doğrulandı. Her sayfa HTTP 200, tek H1, doğru canonical, yüklenebilir resimler ve yatay taşmasız. Sahte form yok. İki viewportta bilinmeyen URL doğru özel **404** içeriğini verdi.

**65 yeni medya dosyasının** tamamı canlıda HTTP 200 ve yerel manifest ile aynı byte uzunluğunda. MP4 byte-range isteği HTTP **206**, doğru 1024 byte cevap verdi. JS hata kaydı **0**. Ayrıntı: `qa/stage1/live.json`.

Canlı Journey: altı masaüstü fazı, ileri/geri piksel doğrulaması (ileri 62.082, dönüş **0**), runtime reduced-motion'da WebGL serbest bırakma, mobil hızlı ileri/geri seek, GLB hatasında geniş render/poster fallback'i geçti. JS hatası **0**. Ayrıntı: `qa/stage1/live-experience.json`.

Canlı ekranlar: [masaüstü](review/live-home-desktop.jpg) · [mobil](review/live-home-mobile.jpg).

Bu sonuçlar gerçek fiziki telefon/Safari sertifikası veya Lusion'a eşdeğerlik iddiası değildir. Sunucu runtime hata taraması, yeni fonksiyon/back-end olmadığı için bu statik dağıtımda uygulama akışı sağlamaz; HTTP/medya ve istemci hata kontrolleri kaydedilmiştir. Aktif gerçek kullanıcı izleme alan ölçümü eklenmedi.

Bu belge ve canlı JSON kayıtlarını ekleyen sonraki commit yalnız teslim kanıtlarını değiştirir; test edilen uygulama ve medya dosyaları aynı kalır.
