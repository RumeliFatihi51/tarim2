# Yeryüzüne Yolculuk / QA — 1 Kasım 2026

## Güncel ölçümler
`qa/journey/routes.json`: 1440, 768, 390, 320 px; 11 sayfa × 4 = **44** responsive kontrol. Tek H1, metadata, görünür kritik görseller, taşma yok, sahte form/uygulama rotası yok. **21 axe taramasında 0 ihlal**; yedi ana sayfa JavaScript olmadan gerçek HTML içeriğiyle erişilebilir. Menü focus döngüsü, Escape, alt sayfa navigasyonu, yenileme ve geri dönüş geçti.

`qa/journey/experience.json`: altı masaüstü gerçek kamera aşaması; başlangıç/ileri/geri canvas karşılaştırması; reduced-motion GPU temizliği; mobil filmin hızlı scroll'dan sonra ileri/geri doğru zamana seek etmesi; eksik crop GLB durumunda gerçek video/poster yedeği. **Sayfa JavaScript hatası 0**. İleri piksel farkı 71.2376; başlangıca geri fark **0**. Bunlar gerçek canvas karelerinden ölçüldü; CSS transformu veya sadece durum değişkeni testi değildir.

`qa/journey/lighthouse.json`: yerel production derlemesi, mobil Chromium simülasyonu: **97 performans / 100 erişilebilirlik / 100 best practices / 100 SEO**. Bu değerler canlı saha verisi veya fiziksel cihaz puanı değildir. Önceki `qa/v3` puanları bu sürümün sonucu olarak kullanılmaz.

`npm run build`, `npm run check`: TypeScript, 11 statik HTML, 374 yerel dosya/link referansı ve medya bütçesi geçti. Yeni 4 film gerçek dosya; H.264/VP9, 24 fps, 12 saniye; masaüstü 960×600, mobil 540×720. 72 özgün Cycles kaynak karesi, OIDN, optik akışla 288 kodlanmış kare. Son yüksek çözünürlüklü peyzaj ve açılış filmi hibrit kompozisyondur.

## Görsel inceleme ve düzeltmeler
İlk prototipte gezegen üstündeki dikdörtgen arazi parçası, uzaktan kare bitki yaması, kaba makro yüzeyler, baskın gözlem rengi ve metin giriş animasyonu reddedildi. İkinci render; ölçeğe göre görünürlük, yumuşak normaller, makro toprak, gerçek DOF ve shader ayarı kullanır. Metnin görünmesi animasyon bitişine bağlanmaz. Kapanışın yetersiz ham CGI detayı fotoğrafik hibrit çözümle değiştirildi. Başlangıç, altı aşama ve mobil geçiş kareleri `qa/journey/*.png` yerel görsel arşivinde incelendi.

## Sınırlar
Fiziksel Android/iPhone veya Safari testi yapılmadı. GPU testleri Chromium SwiftShader ile gerçek shader/geometri çalıştırır; donanım FPS garantisi değildir. Axe/Lighthouse sertifikasyon değildir. Ürünün bilimsel analiz doğruluğu veya Filiz'in üretimde çalıştığı test edilmedi. Lusion'un astronot final hareketleri bu ortamda doğrulanamadı; `docs/lusion-reference-audit.md` gerçek kanıtı ve sınırı ayırır. “Lusion ile eşdeğer sanat kalitesi” ölçülmüş veya sertifikalanmış bir sonuç gibi ileri sürülmez.

## Canlı doğrulama
`a27f601`, Vercel production `dpl_BTRTLimC69xhqKXWP5ZsZdUwoNnq`, READY. https://agromax-alpha.vercel.app/ adresinde on sayfa 200; bilinmeyen yol özel 404. Dört yeni film ve crop GLB doğru MIME ile 200. Gerçek masaüstü 3D finali ve son başlık doğrulandı. 390×844 tarayıcıda mobil film 9.602 saniyeye seek etti; menüden Filiz sayfasına geçildi. JavaScript hatası yok. `qa/journey/live.json` ham kayıt. Sonraki kayıt commit'i yalnız belgeler ve Open Graph önizleme görselini günceller.
