# Lusion / gerçek araştırma kaydı

1 Kasım 2026. Kaynak https://lusion.co/ . Referans varlıkları ürüne kopyalanmadı.

## Fiilen incelenenler
Chromium grafik tarayıcıda 1440×900 ve 390×844 ana sayfa açıldı. İlk durumda siyah L logosu ve 100 yükleme göstergesi kaydedildi. Mobilde yükleme sonrasında açık, hafif lavanta zemin; küçük siyah marka; geniş ve yuvarlatılmış medya kadrajında siyah/beyaz/kobalt üç boyutlu mekanik kompozisyon görüldü. `qa/lusion/mobile-2.png` gerçek kanıttır. DOM'da ana menü, büyük editoryal giriş, yaklaşım, seçili işler, proje başlıkları ve devam eden kapanış çağrısı incelendi.

`/about` ve `/projects` HTTP 200; gerçek başlıkları “Lusion - About Us” ve “Lusion - Our Projects” olarak doğrulandı. HTML kayıtları araştırma klasöründe tutulur. Bunların tam grafik/motion denetimi tamamlanamadı.

## Doğrulanamayanlar
Ana sayfa özel scroll sistemi kullanıyor: window.scrollTo girişimleri scrollY=0 ve body yüksekliği viewport olarak kaldı. İkinci denemede gerçek wheel girdisi için tarayıcı açıldı; ancak masaüstü ekran görüntüsü GPU/compositor beklemesinde 30 saniye sınırını aştı. Bu nedenle astronot finalinin kamera hareketlerini, easing'ini veya bütün alt sayfa animasyonlarını gördüğümüzü iddia etmiyoruz. Sadece ekran görüntüsünden hareket analizi çıkarılmadı. Bağlı yerel tarayıcı aracı sunulmadığından bulut Chromium kullanıldı.

## Benimsenen ilkeler
Büyük, az sayıda başlık; medya için gerçek kompozisyon alanı; sahne ve tipografi arasında güçlü ölçek farkı; sessizlik/yoğunluk dengesi; sade ve serbest gezinme. Ekranın bütünü bir kadraj olarak ele alınır.

## AgroMax'a uyarlananlar
Kobalt/mekanik soyut dünya yerine tarımsal peyzaj, sıcak ivory, bitkisel renkler. Karakter yerine kamera anlatının öznesi. Uzaydan bitkiye özgün yolculuk; kaynak, bağlam ve saha yaşamına geri dönüş. Tüm nicel katmanlar yerine açıkça kavramsal renk/çizgi anlatımı.

## Reddedilenler
Lusion karakteri, özel geometrileri, tünelleri veya final eylemi kopyalanmaz. Zorunlu yükleme kapısı ve window scroll kontrolünü ele geçiren düzen aktarılmaz. Animasyon/astronot hakkında doğrulanmamış gözlem, performans veya “Lusion ile aynı kalite” sertifikası yazılmaz.
