# Başlangıç denetimi / 6f82b66

## Korunan altyapı
React 19, TypeScript, Vite; build sırasında on bir bağımsız HTML çıktısı. Kaynak içerikler ve CLAIM_REGISTER korundu. Vercel main dalı üzerinden statik yayın yapıyor. Yeni backend, hesap sistemi, analiz servisi veya paket bağımlılığı eklenmedi.

## Değiştirilen sorunlar
- Hero, arazi fotoğrafı ve soyut bir seramik/bilgi-katmanı filmi arasında bölünüyordu; ilk ekranda uydu tabanlı tarımsal analiz kimliği açık değildi.
- Manrope'un büyük, ince başlıkları ve Cormorant italikleri ürün bilgisini geri plana itiyordu. Instrument Sans 400–700; güçlü ama ölçülü başlıklar, daha belirgin satır ve gövde hiyerarşisi getirildi.
- Kâğıt/mineral katmanları ve Filiz şerit heykeli ürünün fiziksel konusunu anlatmıyordu. Bu tasarımlar güncel sayfalardan çıkarıldı.
- Önceki CSS dosyaları birbirini aşan geniş override tabakaları içeriyordu. Yeni tasarım tek orbital.css temelinde kuruldu.
- Önceki mobil menü header'daki tetikleyiciye bağlanan özel focus trap kullanıyordu. Yerel dialog, kendi kapatma kontrolü ve tarayıcı focus yönetimi getirildi.
- 3D önceki sürümde ikinci bölümdeydi; ziyaretçi sahneye hiç ulaşmadan siteyi terk edebiliyordu. Yeni uydu sahnesi ilk ekranda, kameranın scroll ve sakin idle yayı ile birlikte yer alıyor.
- Hareketli sahne cihaz uyumuna göre gerçek zamanlı WebGL / gerçek Cycles filmi / statik poster zinciriyle sunuluyor.

## Doğrulama sınırı
Bu görev tanıtım sitesini değiştirir. Ürün analiz altyapısının üretimde çalıştığı, Filiz'in tamamlandığı veya bilimsel sonuçların doğrulandığı ileri sürülmez. Fiziksel cihaz laboratuvarı bulunmadığından mobil QA gerçek Chromium'da farklı viewport ve hareket tercihleriyle yapılır.
