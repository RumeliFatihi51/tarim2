# Özgün tarım arazisi sahnesi restorasyonu

Referans: `674893d8c`, `Cinematic.tsx` Landscape / filiz varyantı.

- `FieldContext` iki sayfanın ortak bileşenidir. Orijinal `Landscape filiz` ve `Film name=field` kullanılır.
- Ana Sayfa: mevcut başarılı Filiz tanıtımı korunur; öncesine geniş, bağımsız sinematik bağlam bölümü eklendi.
- Filiz: girişteki sabit botanik görsel yerine özgün hareketli arazi geri getirildi. Sayfanın diğer içeriği korunur; botanik görsel Ana Sayfa tanıtımında ve kaynaklarda durur.
- Parsel / Gözlem / Geçmiş / Dayanak işaretleyicileri, yüzde konumları ve SVG çizgi yolu referansla aynı markup'tır. Kanıt: `overlay-comparison.json`. Eski GSAP animasyonu (12 → -12 px, top bottom → bottom top, scrub) bileşene scoped olarak taşındı; reduced-motion ve unmount temizliği desteklenir.
- Altı orijinal MP4/WebM/poster dosyası Git blob karşılaştırmasında birebir aynıdır (`original-media.json`). Yeni video veya ek medya dosyası üretilmedi. Mevcut ayrı mobil dosyalar kullanılır.
- Sessiz döngü oynatma, playsInline, görünürken otomatik başlama, kullanıcı duraklatması, ekran dışı durma ve poster fallback mevcut Film bileşeniyle korunur. Reduced-motion başlangıcında video indirilmez. Görsel etiketlere ekran okuyucu için aynı sırada metinsel açıklama eklendi.
- Yeryüzüne Yolculuk kaynakları / davranışı değiştirilmedi; korunan 111 dosya ve önceki 95 medya hash kontrolünden geçti.

## Yerel testler

`npm run build`, `npm run check`: 11 statik sayfa, 405 yerel referans geçti.

Gerçek Chromium'da iki sayfa × 4 genişlik (1440, 768, 390, 320). Her görünümde video oynatma, doğru masaüstü/mobil kaynak, sessiz/loop/inline, etiketlerin sınırlar içinde ve çakışmadan görünmesi, axe erişilebilirlik taraması, duraklat/devam ve ekran dışı durma geçti. 0 axe ihlali, 0 JavaScript hatası.

Ek senaryolar: WebM engellendiğinde MP4, her iki video engellendiğinde poster, başlangıçta reduced-motion poster geçti. [Ham sonuçlar](results.json).

Görüntüler: [Ana Sayfa masaüstü](home-1440.jpg), [Ana Sayfa mobil](home-390.jpg), [Filiz masaüstü](filiz-1440.jpg), [Filiz mobil](filiz-390.jpg). Orijinal ile karşılaştırma kaynak markup, medya blobları ve animasyon parametreleri üzerinden yapıldı; referans sürümün tamamı yeniden yayımlanmadı.

Fiziksel iPhone/Android ve Safari testi yapılmadı. Kavramsal arazi gerçek bir AgroMax analiz çıktısı değildir; Filiz planlanan özellik olarak kalır.
