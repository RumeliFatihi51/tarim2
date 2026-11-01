# AgroMax Aşama 2

**Üretim yayını engelli; tüm hedefler tamamlandı olarak işaretlenmedi.**

[Detaylı teslim raporu](DELIVERY.md) · [Denetim](AUDIT.md) · [Yayın ve callback durumu](HOSTING.md)

Gerçek Supabase Auth ve kullanıcıya özel talep kaydı bağlandı; geçici doğrulanmış test hesabıyla giriş, profil, oturum kalıcılığı, kayıt ve çıkış geçti. Gerçek e-posta doğrulama ve kurtarma döngüsü henüz doğrulanamadı. GitHub Pages API'si 403 veriyor; Cloudflare bağlantısı yok. Çalışan Vercel sürümüne dokunulmadı.

| Sayfa | Masaüstü önce/sonra | Mobil önce/sonra |
|---|---|---|
| Ana Sayfa | [1440](comparison/home-1440.jpg) | [390](comparison/home-390.jpg) |
| Platform | [1440](comparison/platform-1440.jpg) | [390](comparison/platform-390.jpg) |
| Teknoloji | [1440](comparison/teknoloji-1440.jpg) | [390](comparison/teknoloji-390.jpg) |
| Filiz | [1440](comparison/filiz-1440.jpg) | [390](comparison/filiz-390.jpg) |
| Çözümler | [1440](comparison/cozumler-1440.jpg) | [390](comparison/cozumler-390.jpg) |
| Hakkımızda | [1440](comparison/hakkimizda-1440.jpg) | [390](comparison/hakkimizda-390.jpg) |
| İletişim | [1440](comparison/iletisim-1440.jpg) | [390](comparison/iletisim-390.jpg) |

Observation Portal: [giriş masaüstü](portal-giris-1440.jpg), [kayıt mobil](portal-kayit-390.jpg), [şifre yenileme](portal-unuttum-390.jpg). Korunan özel alanlar görüntülerde yetkisiz erişim durumunu gösterir; sahte profil çizilmedi.

Test kanıtları: [48 görünüm](browser-tests.json), [gerçek sağlayıcıyla oturum](auth-positive-tests.json), [veritabanı](backend-verification.json), [sağlayıcı ret kontrolleri](provider-tests.json), [JS kapalı](nojs-tests.json), [callback arayüzleri](callback-ui-tests.json), [poster fallback](avif-tests.json), [Yeryüzüne Yolculuk](journey-tests.json), [yerel performans](performance-lab.json).

Fiziksel cihaz/Safari ve yeni barındırmada üretim testleri yapılmadı. Sonraki gerekli işlem, Pages yönetim yetkisi veya Cloudflare hesabı bağlantısı ve Supabase Auth URL/SMTP yönetim erişimidir. Kullanıcıdan özel anahtarların sohbet içinde paylaşılması istenmez.
