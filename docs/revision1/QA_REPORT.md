# Revizyon doğrulaması

## Tamamlanan kontroller

- Gerçek Chromium: yedi ana sayfa, 1440×900 ve 390×900; 14 tam sayfa görüntüsü. Görseller çözüldü; yatay taşma ve JavaScript hatası görülmedi.
- 44 sayfa/ekran genişliği kontrolü: 1440, 768, 390 ve 320 px. 21 axe taraması: 0 ihlal. Yedi ana sayfa JavaScript kapalıyken içerik ve bağlantı kontrollerinden geçti.
- Masaüstü klavye odağı, mobil menü, Escape ile kapanma, tetikleyiciye odağın geri dönmesi, alt sayfaya doğrudan erişim ve geri gezinme geçti.
- Reduced-motion başlangıcında video kaynakları yüklenmedi; posterler ve yazılı içerik görünür.
- Yeryüzüne Yolculuk: altı kamera aşaması, okunabilir başlıklar, ileri/geri kamera testi, mobil hızlı kaydırma, eksik model fallback ve çalışma sırasında reduced-motion testi geçti. İleri piksel farkı 62.08198, geri farkı **0**; JavaScript hatası yok.
- 111 korunan dosya ve önceki 95 medya dosyası SHA/Git blob karşılaştırmasında değişmedi. Yolculuk kaynakları, filmleri, kameraları, modeli ve motion dosyaları korunuyor.

- Son derleme: 11 statik HTML sayfası; 395 yerel referans, meta veriler ve medya bütçesi kontrolleri geçti.
- Normal hareketli tarayıcı testi: 14 sayfa görünümü, altı video/ekran kombinasyonunda doğru masaüstü/mobil kaynak, oynatma, kullanıcı duraklatması ve ekran dışına çıkınca durma geçti; JavaScript hatası yok.
- Sekiz yeni MP4/WebM dosyası baştan sona çözüldü: her dosyada 144 kare, 6 saniye. Toplam 1.152 karede kod çözme hatası yok.
- Yeni 14 web varlığı toplam 6.99 MB (ondalık); en büyük dosya 2.10 MB. Görseller 1.5 MB, videolar 8 MB bütçesinin altında. Yeni istemci bağımlılığı eklenmedi. Kahraman görsellerinin preload adresleri kullanılan yeni kaynaklara güncellendi.
- Son posterlerle 14 önce/sonra karşılaştırması güncellendi. Gerçek kodlanmış film kareleri `review/decoded-films.jpg` içinde.

Canlı yayın: ana adreste 20 sayfa/ekran kontrolü, yeni 14 medya dosyası HTTP 200 ve doğru dosya boyutu, yeni mobil MP4 üzerinde byte-range HTTP 206 geçti. Canlı JavaScript hatası yok. Ayrıntılar `live.json` ve `DELIVERY.md` içindedir.

## Sınırlar

Testler Linux Chromium, emüle ekran genişlikleri ve yazılımsal WebGL üzerinde yürütüldü. Fiziksel iPhone/Android veya Safari testi yapılmadı. Gerçek kullanıcı Core Web Vitals ölçümü değildir. Kalite değerlendirmesi sanat yönetimi incelemesidir; herhangi bir stüdyo onayı veya kullanıcı kabulü iddia edilmez. Sahne görselleri bilimsel doğruluk testi veya üretimde çalışan AgroMax özelliği kanıtı değildir.
