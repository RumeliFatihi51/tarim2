# AgroMax / Yüzeyin ötesini gör

Önceki sürüm `d192ad0`, `backup/before-lusion-journey` dalında korunur. İddia kaydı ve bilimsel içerik korunur.

## Dünya ve anlatı
Açılış: tipografiyi sinematik tarımsal çevrenin içine yerleştiren tam ekran film. Önceki sol metin/sağ uydu vitrini kaldırıldı. Gözlem → görünür olmayan spektral ilişkiler → zaman → Filiz/bağlam → kullanım alanları → Yeryüzüne Yolculuk.

İmza: kamera özne. Başlangıçtaki gezegen, atmosferik yaklaşım, arazi, kavramsal gözlem, yaprak ölçeği ve açık peyzaj çözülmesi aynı koordinat sistemi ve altı tasarlanmış kamera pozuyla bağlanır. Masaüstünde 6.5 viewport; mobilde 4.2 viewport. Native scroll, aşama düğmeleri ve anlatımı geç bağlantısı bulunur. Reverse scroll aynı pozları geri izler.

## Sanat sistemi
Ivory #f2f1e8; orman #243a2c; botanik #d6dfbc. Instrument Sans ortak tipografi; büyük ana başlıklar 500 ağırlıkta, kısa bilgi etiketleri kontrollü. Tam genişlik medya, editoryal sıralar, koyu Filiz bölümü ve açık bilimsel içerik birbirini dengeler. Tekrarlanan kart ızgaraları yerine konuya göre bölümler; yedi ana sayfanın kadraj, başlık ve medya oranları yeniden ele alındı.

## Gerçek üretim
Yeni özgün bitki modeli: gövde, kıvrımlı yapraklar, başak; GLB ve düzenlenebilir Blender sahnesi. Sürekli arazi geometrisi, makro toprak malzemesi, gerçek kamera anahtarları, ışık, DOF. 72 gerçek Cycles karesi; 24 fps dağıtım için optik akışla ara kare üretilir; 72 ayrı kaynak renderı olduğu açık tutulur. WebGL arazi shader'ı gözlem aşamasında nicel olmayan renk ve sınır metaforunu açar.

## Hareket ve erişim
Anlık scroll pozundan deterministik kamera. Sadece görünürken çizim, bounded DPR, sabitken gereksiz render yapmama, GPU kaynaklarını temizleme. Mobilde video currentTime scroll ile seçilir; otomatik oynatma yok. Reduced motion sabit görsel ve tam metinli altı aşama içerir. Diğer video kontrolleri korunur. Zorunlu intro, scroll hijacking veya çalışan ürün simülasyonu yok.

## İlk prototip eleştirisi / beş düzeltme
1. Gezegen üstünde küçük dikdörtgen arazi parçası görünüyordu: uzay evresinde arazi/crop gizlendi, yakın evrede açılıyor.
2. Bitkiler kare bir ada gibi görünüyordu: uzak bakışta gereksiz crop kümesi kaldırıldı; botanik detay yakın aşamaya ayrıldı.
3. Makro yüzeyler kaba ve tekdüzeydi: smooth normals, iki taraflı yaprak, toprak mikro dokusu ve Blender DOF eklendi.
4. Gözlem rengi/çizgileri fazla baskındı: shader karışım şiddeti azaltıldı; gözlem kamerası araziyi okuyacak yükseklikte tutuldu.
5. Metin giriş animasyonu bazı yakalamalarda içeriği saklıyordu: opacity giriş bağımlılığı kaldırıldı. Aşama seçimi kamera pozlarına round(p×5) ile eşlendi.

Kalite brifi öznel stüdyo standardı içerir. Derleme veya dosya varlığı tek başına sanat kalitesinin kanıtı sayılmaz; prototip/final kareleri ve gerçek test sonuçları ayrı kaydedilir. Lusion'un doğrulanamayan final hareketleri taklit edildi gibi raporlanmaz.

## İkinci kalite turu
Makrodan açılan son 3D arazi bakışının dokusu yakın perspektifte yeterince ayrıntılı değildi. Son yüzde 14'te, gerçek zamanlı/render edilmiş sahneden yüksek çözünürlüklü tarımsal peyzaja kontrollü hibrit geçiş seçildi. Bu son görüntü tamamen yeni fotogerçekçi Blender renderı gibi tanıtılmaz. Ham render ile final web kompozisyonu farklı üretim katmanlarıdır. Açılışta da önceden üretilmiş gerçek arazi filmi, kaba botanik örneklemenin önüne tercih edildi. Böylece sırf her yere WebGL eklemek için düşük kaliteli bir ilk ekran korunmadı.
