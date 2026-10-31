# AgroMax 2.0 / yayın öncesi doğrulama

Bu rapor yeni sürümün gerçek üretim çıktıları içindir. V1 ölçümleri `docs/redesign-v2/QA_BASELINE_V1.md` içinde ayrı tutulur.

## Gerçek üretim

- İki özgün, açıkça kavramsal olduğu belirtilen görsel üretildi: arazi ve mineral arşiv. Bunlar gerçek uydu veya parsel analizi değildir.
- Yeni Context Loom geometrisi ve GLB üretildi. Filiz için kamera/yüzey/ışık koreografili ayrı `.blend` animasyonu oluşturuldu.
- İki sekans için toplam 96 gerçek Cycles karesi render edildi, OIDN ile denoise uygulandı ve 24 fps web çıktısına enterpole edildi.
- Sekiz doğrulanmış video: iki film × masaüstü/mobil × MP4/WebM. Toplam video boyutu yaklaşık 2.18 MB. Desktop 1024×640 ve 1024×768; mobil 640×800. Dosya bazında codec, süre ve boyut `qa/v2/media-inventory.json` içinde.
- Video üretimi gerçek kare sekansıdır; bir görseli CSS ile oynatmak video diye raporlanmaz. Ana sayfadaki arazi görseli ise sabit konsept sanatıdır ve arazi uçuş filmi olduğu iddia edilmez.

## Build ve tarayıcı

- `npm run build` ve `npm run check`: başarılı. 11 statik HTML, 391 yerel bağlantı/medya başvurusu, benzersiz metadata ve kapsam kontrolü.
- 33 rota/genişlik kontrolü; bozuk görsel veya yatay taşma yok.
- 20 axe WCAG taraması; otomatik ihlal yok.
- Brifteki masaüstü, laptop, tablet ve telefon ölçülerinde hero görüntüleri alındı; 320 px taşma kontrolü ayrıca yapıldı.
- Mobil menü, focus trap, Escape, odak dönüşü, geri gezinme, alt sayfa yenileme ve JavaScript kapalı içerik test edildi.
- Gerçek mobil video 640×800 kaynaktan oynadı; manuel durdurma/devam, menü açıkken durma, ekran dışındayken durma ve reduced-motion davranışı başarılı.
- Video indirmesi bilinçli engellendiğinde poster görünür kaldı. GLB engellendiğinde film/poster yedeği korundu.
- Gerçek 3D kamera, geometri, ışık ve materyal ilerlemesi kaydırmayla test edildi. İleri yönde görüntü değişti, aynı scroll konumuna dönüldüğünde karşılaştırma farkı sıfır oldu. WebGL altında gizlenen film duruyor.
- Kapsam: uygulama, login, dashboard, indeks seçici, veri API’si veya chatbot eklenmedi. Filiz planlanan özellik olarak kalır.

## Mobil Lighthouse — production preview

| Ölçüm | Sonuç |
|---|---|
| Performans | 97 |
| Erişilebilirlik | 100 |
| İyi uygulamalar | 100 |
| SEO | 100 |
| LCP | 2.6 s |
| CLS | 0 |
| TBT | 0 ms |

Bunlar Chromium yerel laboratuvar sonuçlarıdır; gerçek kullanıcı INP veya tüm fiziksel telefonlarda ölçüm yapılmış gibi sunulmaz. LCP 2.5 s iyi eşiğinin biraz üzerindedir; skor 97 olsa da mükemmel Core Web Vitals iddiası yoktur.

## Görsel inceleme ve sınırlar

Ana sayfa tam ekran arazi kompozisyonu, CGI inset ve gerçek zamanlı imza sahnesiyle değişti. Platform filmik materyal anlatısı, Teknoloji ayrı mineral/camera çalışması, Filiz ayrı film ve büyük dik tipografi, Çözümler asimetrik malzeme kompozisyonu, Hakkımızda manifesto ölçeği, İletişim sade ve dürüst kanal durumu ile değerlendirildi. Menü, marka işareti, alt gezinme ve geçişler birlikte yeniden ele alındı.

Referans sitelere hem metin hem tarayıcı erişimi denendi; tarayıcı görsel yakalama zaman aşımına uğradı. Motion kaliteleri bütünüyle incelenmiş veya kodları kopyalanmış gibi sunulmaz. Sekiz konseptin tamamı uygulanmış değildir; seçilen ve elenen prodüksiyonlar `PRODUCTION.md` son tablosunda açıkça ayrılır. Kaliteye keyfî 100/100 tasarım puanı verilmedi.
