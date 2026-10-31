# AgroMax / doğrulama raporu

31 Ekim 2026. Bu rapor gerçek yerel üretim ve Chromium çıktıları içindir. Bağımsız tasarım değerlendirmesi veya canlı ürün doğrulaması değildir.

## Derleme ve statik kontrol

- `npm run build`: başarılı. TypeScript, Vite üretim paketi, 11 bağımsız HTML sayfası.
- `npm run check`: başarılı. 370 yerel bağlantı / dosya başvurusu, her sayfada tek H1, benzersiz title/description, Open Graph, doğru görsel/font yolları, 1.5 MB altında her medya dosyası.
- `/dashboard`, `/app`, `/login`, `/demo`, hesap, form, chatbot ve uydu API’si bulunmuyor.
- Site dağıtımı yaklaşık 3.3 MB; tüm Three.js/GLB içeriği ilk ekranın zorunlu yükü değil. Three modülü lazy yüklenir. Vite, bu modülün sıkıştırılmamış boyutu 500 KB üzerinde olduğu için bilgilendirici chunk uyarısı verir; build başarısız değildir. Three chunk gzip yaklaşık 159 KB, ana paket gzip yaklaşık 132 KB.

## Tarayıcı kontrolleri

Kanıt: `qa/results.json`, `qa/browser.cjs` ve `qa/*.png`.

- 11 rota × 1440 / 390 / 320 genişlik = **33 başarılı rota/genişlik kontrolü**. Yatay taşma ve bozuk görsel yok.
- Ana sayfa ve yardımcı sayfalarda 1440 ile 390 genişliklerde **20 axe WCAG A/AA/2.1 AA taraması, sıfır otomatik ihlal**.
- 29 kayıtlı ana ekran ve tam sayfa görüntüsü; ayrıca sanat yönü panosu ve gerçek WebGL ekranı.
- Brifteki 1440×900, 1920×1080, 1024×768, 768×1024, 390×844 ve 360×800 boyutlarında hero görüntüleri. Ek olarak 320×800.
- Mobil menü: yedi bağlantı, odak döngüsü, Escape ile kapanma, düğmeye odak dönüşü, body scroll kilidinin temizlenmesi başarılı.
- Doğrudan URL, menüden geçiş, alt sayfayı yenileme ve tarayıcı geri davranışı başarılı.
- JavaScript kapalı Teknoloji sayfası: temel içerik ve footer gezinmesi erişilebilir.
- Reduced-motion: WebGL yüklenmiyor; sabit poster mevcut.
- GLB yüklemesi bilinçli engellendiğinde poster mevcut ve boş canvas gösterilmiyor.
- Masaüstünde gerçek Blender GLB yüklenip render edildi.
- Kaydedilen sayfa çalışma zamanı hatası: **0**.

## Mobil Lighthouse

Kanıt: `qa/lighthouse-mobile.json`. Yerel production preview, Chromium, Lighthouse mobil benzetimi. Bu saha Core Web Vitals ölçümü değildir.

| Kategori / ölçüm | Sonuç |
|---|---|
| Performans | 99 |
| Erişilebilirlik | 100 |
| İyi uygulamalar | 100 |
| SEO | 100 |
| LCP | 1.6 s |
| CLS | 0 |
| Total Blocking Time | 80 ms |

İlk ölçümde kanıt adımlarının düşük opaklığı metin kontrastını düşürüyordu. Bu davranış kaldırıldı ve ölçüm yenilendi. Puanlar ortam, CPU ve önbelleğe göre değişir. Lighthouse INP için gerçek kullanım örneklemesi sağlamaz; canlı INP doğrulanmış gibi raporlanmaz. Menü etkileşimi fonksiyonel olarak test edildi.

## Sayfa bazında iç görsel inceleme

| Sayfa | Özgün yaklaşım / ilk ekran | Mobil kırpım | Kapsam ve gerçeklik |
|---|---|---|---|
| Ana sayfa | Büyük sans/italik kompozisyon, doğal arazi kadrajı, optik gözlem grafiği; ardından farklı editoryal sahneler | Başlıklar ve CTA ayrı ritimde; ayrı dikey fotoğraf kırpımı | Ürün arayüzü, ölçüm veya sahte parsel yok. |
| Platform | Fotoğraf ağırlıklı giriş ve altı adımlı tipografik akış; optik zaman sahnesi | Liste iki satırlı düzenlenir; sahne sadeleşir | İş akışı hedef olarak anlatılır; grafik veya canlı analiz yok. |
| Teknoloji | Mineral/porselen sahne, kaynak satırları ve yöntem kataloğu | Malzeme sahnesi dikeye uyarlanır, katalog okunabilir kalır | İndeks/bant/AOT-WVP ayrımı; entegrasyonlar tamamlandı diye sunulmaz. |
| Filiz | Büyük özel italik isim, özgün cam/porselen heykel ve bağlam çizgileri | Heykel metnin ardından kare kadraja geçer | Planlanan özellik; sohbet, mesaj alanı veya çevrimiçi iddiası yok. |
| Çözümler | Farklı ihtiyaç soruları üzerine geniş editoryal satırlar | Görsel şerit ve senaryolar dikey okunur | Hedef kullanım alanları; müşteri hikâyesi veya başarı metriği yok. |
| Hakkımızda | Büyük tipografik giriş, manzara ve üç temel ilke | Ayrı satır kırılımı ve dikey fotoğraf | Ekip, yatırım, kuruluş veya ortaklık uydurulmadı. |
| İletişim | Sade tipografi, gerçek kanal durumu ve görüşmeye hazırlık | Okunaklı 16 px gövde ve tek sütun | Kullanıcı “şimdilik bunlar yok” dediği için adres ve form uydurulmadı. |

Görsel kalite için keyfî 100/100 puanı verilmedi. Bu tablo, somut ekranlara dayanan iç incelemedir; haricî jüri değerlendirmesi değildir. Tüm sayfaların aynı kart/hero şablonundan oluşmaması, açık palet ve serbest gezinme korunmuştur.

## Yayın durumu ve sınırlamalar

GitHub entegrasyonu yeni depo oluşturmayı ve Pages etkinleştirmeyi reddetti. `tarim2` ana ürün dalına değişiklik yapılmadı. Ayrı site dalı teslimi ve Pages dosyaları hazırlanmıştır; gerçek push ve CI sonucu teslimin son durum kaydında belirtilir. Hesap sahibinin Pages’i etkinleştirmesi bu token ile yapılamadı.

Blender/Cycles gerçek renderlar ve bir GLB üretildi. Video üretimi yapılmadı; sahneler fotoğraf/CGI/WebGL/SVG/GSAP hibritidir. Ticari font ve fotoğraf hakları envanterde kayıtlıdır. Ürün API’si, canlı Filiz sürümü, saha performansı ve bilimsel analiz doğruluğu bu görevde doğrulanmadı.
