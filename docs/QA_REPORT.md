# Orbital / Güncel QA raporu

31 Ekim 2026. Önceki tasarım veya ölçümler bu sürümün sonucu olarak kullanılmadı.

## Doğrulanan ziyaretçi akışı
Ziyaretçi ürün tanıtımına girer; uydu/arazi prodüksiyonlarını görüntüler, menü veya normal bağlantılarla yedi ana sayfayı gezer. Metinler ve yerel varlıklar statik HTML'den gelir. Analiz API'si, hesap veya sohbet bulunmaz.

## Sonuçlar

| Kontrol | Gerçek sonuç |
|---|---|
| TypeScript, Vite, prerender | Geçti. 11 bağımsız HTML, tek H1, benzersiz metadata. |
| Alt yol | `/tarim2/` derlemesi ve 371 yerel referans kontrolü geçti; ardından kök production derlemesi yeniden üretildi. |
| Yerel referanslar ve kapsam | 371 bağlantı/dosya referansı; bozuk yerel dosya, sahte form veya uygulama rotası yok. |
| Responsive sayfalar | 1440, 768, 390 ve 320 px; 44 sayfa/genişlik kontrolü. Yatay taşma yok. |
| Otomatik erişilebilirlik | 21 axe taraması; WCAG 2 A/AA ve 2.1 AA etiketlerinde 0 ihlal. |
| Menü | Tab ve Shift+Tab döngüsü, Escape, odağın tetikleyiciye dönmesi, alt sayfa geçişi, yenileme ve geri gezinme geçti. |
| JavaScript kapalı | Yedi ana sayfanın gerçek HTML içeriği ve normal alt menü bağlantıları erişilebilir. |
| Medya | 12 davranış kontrolü; gerçek mobil WebM, MP4 yedeği, bağımsız arazi filmi, durdurma, menü/görünürlük/tercih duraklatmaları, kırık medya poster yedeği, GLB hatasında gerçek film, gerçek 3D kamera ve responsive GPU temizliği geçti. |
| Video dosyaları | İki özgün film; sekiz kodlama. H.264 / VP9, 24 fps, 160 kare, yaklaşık 6.667 s. Mobil 576×720. |
| Gerçek kaynaklar | İki paketli, animasyon timeline'lı Blender dosyası; özgün GLB, kaynak PNG/JPEG ve üretim scriptleri. |

Ham kayıtlar: `qa/v3/browser-results.json`, `media-results.json`, `assets.json`.

## Mobil Lighthouse / Yerel production derlemesi

`qa/v3/lighthouse-mobile.json`: Performans **96**, erişilebilirlik **100**, best practices **100**, SEO **100**. LCP **2.8 s**, CLS **0**, TBT **0 ms**. Ölçüm Chromium/Lighthouse'un mobil ağ ve CPU simülasyonuyla, kodlama/render işleri bittikten sonra yapıldı. Bunlar gerçek kullanıcı saha verisi veya canlı Vercel gecikmesi değildir.

WebGL yalnız büyük ekranlarda yüklenir. Model yaklaşık 130 KB; Three.js sahne modülü gzip yaklaşık 168 KB. Sekiz film varyantının toplamı 10,324,899 bayttır; bir ziyaretçi bu sekiz dosyanın tamamını indirmez. Cihaz ve codec'e uygun tek sürüm, sahne görünürken yüklenir.

## Kamera kanıtı
Gerçek WebGL canvas görüntüsü durdurulduğunda piksel farkı 0. İleri scroll kamera kadrajını belirgin değiştirir; geri scroll kadrajı başlangıca yaklaştırır. Bağımsız sakin idle yayı yürüdüğü için geri dönüş ekran görüntüsünün her pikselinin aynı olduğu iddia edilmez. Sayısal görüntü farkları `media-results.json` içindedir.

## Sınırlar
Fiziksel iOS/Android cihazlar veya Safari laboratuvarı kullanılmadı. Mobil/tablet testleri gerçek Chromium'da viewport emülasyonudur. MP4 yedeği Chromium'da WebM isteği engellenerek test edildi; bu Safari sertifikasyonu değildir. WebGL testleri Chromium/SwiftShader ile gerçek geometri ve shader yürütür; fiziksel cihaz FPS garantisi verilmez. Axe ve Lighthouse puanları kapsamlı erişilebilirlik sertifikası değildir. Saha verisi veya gerçek ürünün bilimsel doğruluğu bu tanıtım sitesi görevinin konusu değildir.
