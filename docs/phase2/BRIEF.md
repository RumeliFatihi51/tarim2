# AGROMAX | PHASE 2
## CINEMATIC RECONSTRUCTION, INTERACTIVE EXPERIENCE & PRODUCTION PLATFORM

### GÖREV TANIMI

Sen, AgroMax projesinin ikinci geliştirme aşamasını uçtan uca gerçekleştirmekle sorumlu kıdemli bir **Creative Developer, Creative Director, Frontend Architect, Motion Designer, UI/UX Designer ve Full-Stack Engineer** olarak çalışacaksın.

Bu görev bir danışmanlık, yalnızca analiz veya öneri hazırlama görevi değildir.

**Görevin mevcut AgroMax web sitesini ve kaynak kodunu incelemek, eksikliklerini belirlemek, planı oluşturmak, gerekli geliştirmeleri gerçekleştirmek, test etmek, hataları düzeltmek ve mümkün olan tüm koşullarda üretim ortamına yayınlamaktır.**

Projenin ikinci aşamasında hedefimiz sıradan bir modern web sitesi oluşturmak değil; özgün sanat yönetimine, üst düzey sinematik anlatıma, etkileşimli sahnelere ve profesyonel ürün altyapısına sahip bir dijital deneyim ortaya çıkarmaktır.

### PROJE KAYNAKLARI

- GitHub repository: https://github.com/RumeliFatihi51/tarim2
- Mevcut site: https://agromax-alpha.vercel.app/
- Proje: AgroMax
- İkinci aşama: Cinematic Reconstruction & Interactive Experience

Öncelikle GitHub deposunu, mevcut canlı siteyi, bütün sayfaları, medya dosyalarını, mevcut teknolojileri ve önceki geliştirme kararlarını incele.

**Mevcut sitenin görsel kimliği korunmalıdır.** AgroMax'ın halihazırda başarılı olan renkleri, tipografisi, videoları, sahneleri, kompozisyonları ve anlatım yaklaşımı projenin temelini oluşturuyor.

Bu görev, mevcut siteyi sıfırdan değiştirmek için verilmemiştir.

**Amaç, başarılı bölümleri koruyarak zayıf olan bütün bölümleri aynı üst düzey kalite standardına çıkarmaktır.**

---

# 1. PROJENİN ANA VİZYONU

AgroMax; uydu tabanlı tarımsal gözlem, parsel odaklı analiz, zamansal değerlendirme, tarımsal bağlam ve karar destek yaklaşımını anlatan bir tarım teknolojisi girişimidir.

Web sitesi yalnızca şirketi tanıtan metinlerden ve görsellerden oluşmamalıdır.

Kullanıcı siteye girdiğinde:

- Güçlü bir sinematik açılışla karşılaşmalı.
- Gerçekten tasarlanmış bir dijital dünyanın içinde olduğunu hissetmeli.
- Uydu gözleminden tarımsal araziye uzanan anlatımı deneyimlemeli.
- Sayfaları kaydırırken görseller, kamera hareketleri ve metinler bütünlük içerisinde ilerlemeli.
- Etkileşimli deneyimler aracılığıyla AgroMax'ın yaklaşımını anlamalı.
- Her sayfada farklı fakat ortak kimliğe sahip bir görsel karakter hissetmeli.
- Sitedeki hiçbir bölüm aceleyle hazırlanmış, sıradan veya yapay zekâ şablonuyla oluşturulmuş gibi görünmemeli.

Referans kalite seviyesi Lusion ve üst düzey yaratıcı dijital stüdyoların hazırladığı deneyimlerdir.

**Ancak mevcut siteleri taklit etme. AgroMax'a ait özgün bir tasarım dili geliştir.**

Lusion referansı yalnızca hareket kalitesi, sanat yönetimi, sahne bütünlüğü ve teknik işçilik için kullanılmalıdır.

---

# 2. ÇALIŞMAYA BAŞLAMADAN ÖNCE ZORUNLU DENETİM

Kod yazmaya başlamadan önce mevcut sitenin tamamını incele.

İncelenecek sayfalar:

1. Ana Sayfa
2. Platform
3. Teknoloji
4. Filiz AI
5. Çözümler
6. Hakkımızda
7. İletişim

Her sayfayı gerçek tarayıcıda aç.

Masaüstü ve mobil görünümlerini değerlendir.

Her sayfanın bütün bölümlerini, mümkünse ekran görüntüleri ve ilgili kaynak kodları üzerinden incele.

Şu kriterlerle değerlendirme yap:

- Sinematik kalite
- Görsel kompozisyon
- Sahne derinliği
- Özgünlük
- Tipografi
- Görsel-metinsel bütünlük
- Animasyon kalitesi
- Scroll davranışı
- Sayfalar arası geçişler
- Etkileşim zenginliği
- Görsel süreklilik
- Mobil kullanım
- Performans
- Erişilebilirlik
- Genel profesyonellik

Her bölümü üç kategoriden birine yerleştir:

**PRESERVE:** Başarılı. Korunmalı.

**ENHANCE:** Temeli iyi, ancak geliştirilmeli.

**RECONSTRUCT:** Yetersiz. Yeniden tasarlanmalı.

Bölümlere gerekçeli öncelik ver.

Bu denetim, uygulama planının temelini oluşturmalıdır.

Analiz tamamlandığında çalışmayı durdurup onay bekleme. Kritik belirsizlik veya kullanıcı izni gerektiren işlem bulunmadıkça uygulamaya devam et.

---

# 3. KESİNLİKLE KORUNMASI GEREKENLER

## 3.1. Yeryüzüne Yolculuk

Ana Sayfa'daki mevcut **Yeryüzüne Yolculuk** deneyimi başarılı bulunmuştur.

Bu bölümün:

- Temel tasarımını
- Sinematik akışını
- Görsel kompozisyonunu
- Kamera davranışlarını
- Mevcut başarılı hareketlerini
- Genel anlatımını

koru.

İkinci aşamanın amacı bu bölümü yeniden oluşturmak değildir.

Yalnızca çevresindeki yeni bölümlerle teknik entegrasyon için zorunlu, görsel davranışı değiştirmeyen düzeltmeler yapılabilir.

## 3.2. Eski tarım arazisi sahnesi

Önceki AgroMax sürümünde bulunan ve kullanıcı tarafından özellikle beğenilen bir sinematik tarım arazisi sahnesi vardır.

Referans commit:

`674893d8c`

İlgili kaynaklar:

`src/components/Cinematic.tsx`

`src/pages/Filiz.tsx`

`public/media/field.mp4`

`public/media/field.webm`

Sahnede hareketli tarım arazisinin üzerinde şu etiketler bulunur:

- Parsel
- Gözlem
- Geçmiş
- Dayanak

Etiketlerin konumsal yerleşimi, bağlantı çizgileri ve sahnenin hareketli karakteri korunmalıdır.

**Bu sahne hem Ana Sayfa'da hem de Filiz AI sayfasında bulunmalıdır.**

Eğer birinci aşamada zaten geri getirilmişse çalışır durumda olduğunu doğrula ve ikinci aşamanın sinematik standardına uyumlu biçimde geliştir.

İki sayfada ortak, yeniden kullanılabilir bir bileşen kullanılabilir.

Sahnenin özgün video kaynağını sebepsiz yere değiştirme.

## 3.3. Diğer başarılı tasarım varlıkları

Mevcut başarılı videoları, 3D sahneleri, görselleri, yazı karakterlerini ve tasarım kararlarını koru.

Medya dosyalarını silmeden veya değiştirmeden önce kullanım yerlerini araştır.

Bir bölümü yeniden tasarlarken içindeki başarılı görsel unsurları kaybetme.

---

# 4. AŞAMA 2A: CINEMATIC VISUAL RECONSTRUCTION

Bu aşama projenin en önemli parçalarından biridir.

Mevcut sitede bazı görseller yalnızca düz biçimde yerleştirilmiş, bazı bölümler sıradan görünüyor ve bazı geçişler yeterince sinematik hissettirmiyor.

Bunları sistematik olarak düzelt.

## 4.1. Düz görsel kullanımını yeniden değerlendir

Bir görselin yalnızca dikdörtgen bir alana yerleştirilmesi her zaman yeterli değildir.

Uygun bölümlerde şunları değerlendir:

- Tam genişlikte sinematik kompozisyonlar
- Katmanlı görsel sahneler
- Kontrollü kamera yakınlaşmaları
- Derinlik etkileri
- Video ile metin birlikteliği
- Sahneye gömülü tipografik düzen
- Görseller arasında anlamlı geçişler
- Kaydırmaya bağlı görsel dönüşümler
- İnce ışık ve atmosfer efektleri
- Etkileşimli bilgi katmanları

Ancak bütün görselleri tam ekran yapma.

Her bölüm için en uygun kompozisyonu sanat yönetimi açısından belirle.

## 4.2. Basit bölümleri yeniden tasarla

Özellikle şu problemleri araştır:

- Tekrarlanan kart dizileri
- Görsel ve metnin birbirinden kopuk olması
- Zayıf içerik hiyerarşisi
- Amaçsız boş alanlar
- Sıradan grid yapıları
- Aynı animasyonun tekrar kullanılması
- Aniden başlayan veya biten sahneler
- Fazla durağan ve görsel açıdan yetersiz bölümler

Bu bölümleri premium, özgün ve etkileyici kompozisyonlarla değiştir.

Yalnızca mevcut karta gölge, blur veya hareket eklemek yeniden tasarım sayılmaz.

Gerekirse bölümün kompozisyonunu, mekânsal düzenini ve görsel anlatımını kökten yeniden kur.

## 4.3. Sanat yönetimi

AgroMax'ın kimliğini şu ilkelerle sürdür:

- Koyu ve doğal renk atmosferi
- Tarımsal dokular
- Uydu ve yeryüzü ilişkisi
- Bilimsel fakat estetik görselleştirme
- Güçlü editoryal tipografi
- Özenle düzenlenmiş boşluk kullanımı
- Doğal ışık ve derinlik
- Minimal ama etkileyici arayüz

Rastgele neon parlamalar, aşırı cam efektleri, gereksiz parçacıklar ve genel AI sitesi görünümü oluşturma.

---

# 5. AŞAMA 2B: ADVANCED CINEMATIC MOTION SYSTEM

Tekil animasyonlar yerine merkezi bir hareket tasarım altyapısı geliştir.

Bu sistem, bütün AgroMax sitesinde kontrollü, tutarlı ve yüksek kaliteli hareket davranışları sağlayacak.

## 5.1. Scroll-Driven Cinematography

Uygun sahnelerde kaydırma ilerlemesini doğrudan görsel anlatıma bağla.

Desteklenebilecek davranışlar:

- Kamera konumu değişimi
- Kamera ölçeği ve yakınlaşması
- Katmanlar arasında derinlik
- Kontrollü odak değişimleri
- Görsel maskelerin açılması
- Sahne ilerlemesine bağlı metin görünürlüğü
- Video zamanıyla senkronize hareket
- Bölümler arası görsel süreklilik
- Kaydırmaya bağlı bilgi katmanları
- Gerekli yerlerde sabitlenmiş sinematik sahneler

Kullanıcı kaydırmayı bıraktığında animasyon davranışı tutarlı olmalı.

Ters yönde kaydırma, hızlı kaydırma, sayfa yenileme ve geri navigasyon senaryolarını kontrol et.

## 5.2. Kamera ve sahne kalitesi

Kamera hareketleri fiziksel olarak tutarlı ve estetik açıdan dengeli olmalıdır.

Geliştirilecek sistemlerde:

- Sarsıntısız geçişler
- Doğal hızlanma ve yavaşlama
- Kontrollü perspektif
- Katmanlar arası uyum
- Etkili kompozisyon
- Doğru odak noktaları
- Tutarlı hareket yönleri

öncelikli olmalıdır.

Kamera hareketlerinin yalnızca gösterişli olması yetmez; kullanıcıya anlatılmak istenen fikri desteklemesi gerekir.

## 5.3. Animasyon mimarisi

Mevcut teknolojileri incele.

Gerekliyse GSAP, ScrollTrigger, Three.js, React Three Fiber veya uygun diğer çözümleri değerlendir.

Her kütüphaneyi yalnızca gerçek ihtiyaç varsa kullan.

Projenin mevcut altyapısını gereksiz yere yeniden yazma.

Şu konuları merkezi bir yapı altında düzenle:

- Animation lifecycle
- Scroll orchestration
- Easing ve motion tokens
- Scene state management
- Media synchronization
- Navigation transitions
- Reduced-motion desteği
- Resource cleanup
- Responsive motion behavior

React bileşenleri yeniden render edildiğinde animasyonların çoğalmasını veya bellek sızıntısı oluşmasını önle.

---

# 6. AŞAMA 2C: PAGE-SPECIFIC SIGNATURE EXPERIENCES

Yedi sayfanın tamamını geliştir.

Her sayfanın aynı kalitede fakat farklı karakterde olması gerekiyor.

## 6.1. ANA SAYFA

Ana Sayfa, AgroMax'ın en güçlü sinematik vitrini olmalıdır.

Mevcut başarılı açılışı ve Yeryüzüne Yolculuk bölümünü koru.

Diğer bölümlerde:

- Sinematik geçişler oluştur.
- Düz görselleri yeniden değerlendir.
- Eski tarım arazisi sahnesini koru veya geri getir.
- Parsel, Gözlem, Geçmiş ve Dayanak aşamalarını görsel anlatımla ilişkilendir.
- Tarımsal gözlemden anlamlandırmaya uzanan akışı güçlendir.
- Bölümler arasındaki kopuklukları gider.
- Ana Sayfa'nın sonundaki yönlendirmeleri daha etkileyici hâle getir.

Amaç, birbirine eklenmiş farklı tasarım blokları değil, bütüncül bir sinematik yolculuk oluşturmak.

## 6.2. PLATFORM

Platform sayfası yalnızca özellikleri sıralamamalı.

AgroMax'ın işleyiş yaklaşımını görsel olarak deneyimletmeli.

Mevcut altı aşamalı iş akışını incele.

Bunu uygun biçimde:

- Kaydırmaya bağlı bir süreç anlatısına
- Etkileşimli aşama geçişlerine
- Tarımsal gözlem görsellerine
- Gerekçeli ve anlaşılır bilgi katmanlarına

dönüştür.

Gerçekte çalışmayan bir analiz motorunu çalışıyormuş gibi sunma.

## 6.3. TEKNOLOJİ

Teknoloji sayfasının görsel standardını özellikle yükselt.

Uydu gözlemi, uzaktan algılama, spektral bantlar, bitki örtüsü göstergeleri ve zamansal analiz kavramlarını etkileşimli biçimde anlat.

Uygun yerlerde:

- Katman seçimi
- Bant karşılaştırması
- Görsel açıklama
- Uydu gözlem sahneleri
- İnteraktif teknik diyagramlar
- Önce/sonra karşılaştırmaları

geliştir.

Teknik açıklamaları doğru, anlaşılır ve görsel olarak güçlü tut.

Demo görselleri gerçek ölçüm gibi sunma.

## 6.4. FİLİZ AI

Filiz AI sayfası özgün bir görsel kimliğe sahip olmalıdır.

Eski tarım arazisi videosu burada önemli bir imza sahne olarak kullanılacak.

Parsel, Gözlem, Geçmiş ve Dayanak unsurlarının ilişkisini sinematik olarak göster.

Bilgi noktaları ve bağlantılar gerektiğinde etkileşimli olabilir.

Ancak Filiz AI henüz çalışır durumda değilse çalışan bir yapay zekâ sistemi varmış gibi yanıltıcı bir arayüz oluşturma.

Planlanan kabiliyetlerle uygulanan özellikleri açıkça ayır.

## 6.5. ÇÖZÜMLER

Çözümler sayfasındaki sıradan açıklama ve kart yapılarının tamamını değerlendir.

Her kullanım alanı için farklı görsel anlatım geliştir.

Uygun yerlerde kullanıcı farklı bir kullanım alanı seçtiğinde:

- Sahne
- Görsel kompozisyon
- Açıklama
- Destekleyici veri katmanı

birlikte değişebilir.

Geçişler tutarlı ve akıcı olmalıdır.

## 6.6. HAKKIMIZDA

Bu sayfanın genel bir kurumsal şablon gibi görünmesini engelle.

AgroMax'ın vizyonunu, yaklaşımını ve geliştirme sürecini özgün editoryal tasarımla anlat.

Büyük ölçekli tipografi, sinematik kompozisyon, anlamlı görseller ve kontrollü animasyonlar kullanılabilir.

Ekip, başarı, ürün kabiliyeti veya şirket statüsü hakkında gerçek olmayan bilgi ekleme.

## 6.7. İLETİŞİM

İletişim sayfası sade fakat yüksek kaliteli olmalı.

Form, hata mesajları, doğrulama durumları ve başarılı işlem geri bildirimleri tasarımın ayrılmaz parçası olarak ele alınmalı.

Gerçek mesaj gönderimi altyapısı yoksa sahte başarı mesajı gösterme.

İletişim akışını çalışır hâle getir veya gerekli dış servis yapılandırmasını açıkça belirt.

---

# 7. AŞAMA 2D: GLOBAL INTERACTION SYSTEM

Site genelinde uygulanacak etkileşimleri oluştur.

## 7.1. Navigasyon

- Kusursuz menü animasyonları
- Aktif sayfa durumları
- Hızlı ve anlaşılır geçişler
- Mobil navigasyon
- Klavye erişilebilirliği
- Doğru odak yönetimi

## 7.2. Akıllı etkileşimler

Uygun bileşenlerde:

- Magnetic button effects
- Hover motion
- Subtle parallax
- Interactive hotspots
- Context-aware cursors
- Animated navigation indicators
- Smooth reveal sequences

kullanılabilir.

Ancak bunları her yerde zorunlu hâle getirme.

Özellikle imleç efektleri kullanıcının normal etkileşimini zorlaştırmamalıdır.

## 7.3. Sayfa geçişleri

Sayfalar arasında anlamlı, hızlı ve sinematik geçişler oluştur.

Yeni sayfa açıldığında tüm içeriklerin bir anda görünmesi yerine gerektiği yerde kontrollü sahne başlangıçları kullanılabilir.

Geçişlerin hızı, kullanıcı deneyimini olumsuz etkilememelidir.

---

# 8. AŞAMA 2E: ÖZGÜN GİRİŞ YAP / KAYIT OL SİSTEMİ

Bu aşamada AgroMax'a gerçek bir kullanıcı sistemi eklenecek.

Giriş ve kayıt ekranları, standart hazır form şablonları gibi görünmemelidir.

## 8.1. Tasarım konsepti: Observation Portal

AgroMax'a özel, sinematik bir kullanıcı giriş deneyimi oluştur.

Tasarım yaklaşımı:

**The Observation Portal**

Masaüstünde:

- Sinematik tarım arazisi veya uydu gözlem sahnesi
- Katmanlı ve derinlikli görsel atmosfer
- Zarif koordinat ve parsel sınırı detayları
- Yavaş ve kontrollü kamera hareketi
- Koyu zümrüt tonlarında profesyonel form alanı
- Güçlü tipografi
- Minimal, özenli ve özgün kompozisyon

Giriş ve kayıt arasında geçiş yapıldığında arka plan sahnesi kesilmemeli.

Formlar doğal biçimde dönüşmeli.

Mobilde görsel deneyim korunmalı, ancak formun kullanılabilirliği her şeyin önünde olmalıdır.

## 8.2. Oluşturulacak ekranlar

- Giriş Yap
- Kayıt Ol
- E-posta doğrulama
- Şifremi Unuttum
- Şifre sıfırlama
- Oturum açma hata ve başarı durumları
- Temel hesap ve profil alanı
- Çıkış yapma

## 8.3. Kimlik doğrulama

Gerçek ve güvenli kimlik doğrulama altyapısı kur.

Mevcut projede bir sistem varsa önce onu incele ve uygun olduğu sürece koru.

Yeni sağlayıcı gerekiyorsa Supabase Auth gibi uygun çözümleri değerlendir.

Şunlara dikkat et:

- Güvenli oturum yönetimi
- E-posta doğrulaması
- Şifre sıfırlama
- Uygun yetkilendirme
- Açık yönlendirme güvenliği
- Kötüye kullanım sınırlamaları
- İstemciye gizli anahtar sızdırmama
- Hata durumlarında hassas bilgi ifşa etmeme
- Korunan sayfa ve API'larda gerçek yetki kontrolü

Tarayıcı tarafında sahte giriş mantığı oluşturma.

Kullanıcı şifrelerini kendi geliştirdiğin basit bir veritabanı mekanizmasıyla yönetme.

Gerçek kimlik doğrulama servisinin kullanılması gerekiyorsa gerekli proje, anahtar ve yönlendirme yapılandırmalarını doğru şekilde gerçekleştir.

Gizli anahtarları GitHub deposuna koyma.

Harici serviste kullanıcı müdahalesi gerektiren bir işlem varsa yapılabilen diğer geliştirmelere devam et ve yalnızca zorunlu noktada gerekli bilgileri iste.

## 8.4. Kayıt sonrası deneyim

Kullanıcı kayıt olduktan sonra sade ve kaliteli bir hesap alanına ulaşabilmeli.

Gelecekte üretici, araştırmacı, ziraat uzmanı ve kurum kullanıcıları için genişleyebilecek veri modeli düşün.

Ancak henüz geliştirilmemiş ürün özellikleri için sahte dashboard verileri veya çalışmayan fonksiyonlar üretme.

---

# 9. AŞAMA 2F: PERFORMANCE ENGINEERING

Sinematik kaliteyi yükseltirken performansı göz ardı etmek kabul edilemez.

Şu alanlarda optimizasyon yap:

- Video sıkıştırma ve uygun format seçimi
- WebM/MP4 fallback
- Poster görselleri
- Lazy loading
- Asset preloading stratejileri
- Route-based code splitting
- 3D kaynak yönetimi
- Render performansı
- GPU kullanımının kontrolü
- Gereksiz animasyon döngülerinin temizlenmesi
- Layout shift azaltılması
- Mobil cihazlar için uyarlanmış efektler

Gerektiğinde masaüstü ve mobil için farklı medya varlıkları kullan.

Üst düzey cihazlarda güçlü görsel deneyim sağlarken daha zayıf cihazlarda da kullanılabilirliği koru.

Azaltılmış hareket tercihine saygı göster.

Animasyonların hedefi akıcı bir deneyimdir; sırf 60 FPS etiketi için görsel bütünlüğü bozan kestirme çözümler üretme.

Core Web Vitals değerlerini ölç ve önemli sorunları düzelt.

---

# 10. AŞAMA 2G: RESPONSIVE & ACCESSIBILITY

Sitenin bütün deneyimlerini aşağıdaki ekranlarda incele:

- Büyük masaüstü
- Standart dizüstü
- Tablet
- Büyük telefon
- Küçük telefon

Mobil deneyimi masaüstü tasarımını küçülterek oluşturma.

Sinematik sahneler için mobil kompozisyonları ayrıca düşün.

Kontrol et:

- Yatay taşma
- Metin okunabilirliği
- Görsellerin yanlış kırpılması
- Buton ve dokunma alanları
- Animasyon uyumsuzlukları
- Mobil menü davranışı
- Form kullanılabilirliği
- Video oynatma sorunları
- Ekran yönü değişimi
- Erişilebilir renk kontrastı
- Klavye ve ekran okuyucu deneyimi

---

# 11. AŞAMA 2H: DEPLOYMENT MIGRATION

**Yeni yayın ortamı Vercel olmamalıdır.**

Yayın önceliği:

1. GitHub Pages
2. GitHub Pages teknik açıdan uygun değilse Cloudflare Pages

## 11.1. GitHub Pages değerlendirmesi

Öncelikle mevcut proje yapısının GitHub Pages ile uyumlu olup olmadığını araştır.

Kontrol et:

- Statik build desteği
- React Router davranışı
- SPA deep-link ve refresh desteği
- Vite base path
- Asset URL'leri
- Özel alan adı yapılandırması
- HTTPS
- GitHub Actions deployment
- Ortam değişkenleri
- Kimlik doğrulama callback URL'leri

Gerekli düzeltmelerle güvenilir ve sürdürülebilir bir çözüm oluşturulabiliyorsa GitHub Pages kullan.

## 11.2. Cloudflare Pages alternatifi

GitHub Pages üzerinde önemli sınırlamalar ortaya çıkarsa Cloudflare Pages'e geç.

Özellikle:

- Routing
- Kimlik doğrulama entegrasyonu
- API ihtiyacı
- Gelecekte backend genişlemesi
- Güvenli yapılandırma

konularını değerlendir.

Gerekli olduğunda Cloudflare Pages Functions gibi çözümleri kullan.

## 11.3. Dağıtım gereksinimleri

- Tekrarlanabilir üretim build'i
- Otomatik deployment
- HTTPS
- Sağlıklı yönlendirmeler
- Çalışan doğrudan sayfa URL'leri
- Çalışan medya dosyaları
- Gerçek giriş/kayıt callback'leri
- Hatasız console
- Production smoke test

Mevcut Vercel dağıtımını yeni platform doğrulanmadan devre dışı bırakma.

Yeni yayın adresini teslim raporunda açıkça belirt.

Yayın için gerekli erişim veya yetki mevcut değilse bunları uydurma; kod ve yapılandırmayı hazırla, engeli net biçimde raporla.

---

# 12. TASARIMDA KAÇINILACAK HATALAR

Kesinlikle istemediğimiz sonuçlar:

- Sıradan SaaS landing page görünümü
- Her yerde aynı kart yapısı
- Rastgele animasyon ekleme
- Kontrolsüz parallax kullanımı
- Aşırı neon ve glow
- Her nesnenin sürekli hareket etmesi
- Ucuz glassmorphism efektleri
- Birbirinden kopuk sinematik bölümler
- Gereksiz loading ekranları
- Başarılı mevcut sahnelerin kaybolması
- Mobilde kırılan animasyonlar
- Sahte çalışan giriş/kayıt
- Gerçekte olmayan ürün kabiliyetlerinin gösterilmesi
- Yetersiz test edilmiş deployment
- Kullanılmayan ağır bağımlılıkların eklenmesi
- Mevcut siteyi hiçbir gerekçe olmadan tamamen yeniden yazma

**Kalite, efekt sayısıyla ölçülmez.**

Kalite; kompozisyon, hareket kontrolü, süreklilik, teknik doğruluk ve kullanıcı deneyiminin birleşimidir.

---

# 13. UYGULAMA İŞ AKIŞI

Görevi aşağıdaki sırayla yürüt.

### ADIM 1: REPOSITORY & WEBSITE AUDIT

GitHub deposunu ve canlı siteyi incele.

Mevcut mimariyi, sayfaları, asset'leri ve deploy sistemini tespit et.

Başarılı ve zayıf bölümleri sınıflandır.

### ADIM 2: DESIGN DIRECTION

Güncel görsel kimliği temel alarak ikinci aşamanın sinematik sanat yönetimini belirle.

Her sayfanın ayrı görsel hedefini çıkar.

Hareket kurallarını ve sahne geçişlerini tasarla.

### ADIM 3: MOTION FOUNDATION

Ortak animasyon ve etkileşim altyapısını oluştur.

Test edilebilir ve yeniden kullanılabilir bileşenler geliştir.

### ADIM 4: SIGNATURE SCENES

Ana Sayfa, Platform, Teknoloji ve Filiz AI'nın önemli sinematik bölümlerini geliştir.

Eski tarım arazisi sahnesinin iki sayfada bulunduğunu doğrula.

Yeryüzüne Yolculuk bölümünü koru.

### ADIM 5: FULL WEBSITE REFINEMENT

Çözümler, Hakkımızda, İletişim ve diğer bütün zayıf bölümleri iyileştir.

Navigasyon, tipografi, arayüz durumları ve mikro etkileşimleri tamamla.

### ADIM 6: AUTHENTICATION SYSTEM

Observation Portal tasarımını oluştur.

Gerçek giriş, kayıt, doğrulama, şifre sıfırlama ve oturum yönetimini geliştir.

### ADIM 7: OPTIMIZATION

Performans, responsive tasarım, erişilebilirlik ve güvenlik kontrollerini gerçekleştir.

### ADIM 8: DEPLOYMENT

GitHub Pages veya gerektiğinde Cloudflare Pages üzerinde yayına al.

Production build'i ve canlı siteyi doğrula.

### ADIM 9: FINAL VALIDATION

Her sayfayı tekrar gerçek tarayıcıda incele.

Geliştirme öncesi ve sonrası ekran görüntülerini karşılaştır.

Görsel regresyonları, teknik hataları ve kullanılabilirlik problemlerini düzelt.

---

# 14. ZORUNLU TEST SENARYOLARI

En azından şunları test et:

**Görsel testler**

- Yedi sayfanın tümü
- Masaüstü ve mobil
- Sinematik sahnelerin başlangıç/bitiş durumları
- Scroll animasyonları
- Metin okunabilirliği
- Video yükleme ve poster fallback
- Sahne geçişleri
- Eski başarılı sahnelerin korunması

**Fonksiyonel testler**

- Bütün menüler ve bağlantılar
- Giriş yapma
- Kayıt olma
- E-posta doğrulama
- Şifre sıfırlama
- Çıkış yapma
- Oturum kalıcılığı
- Korunan sayfalara yetkisiz erişim
- Form doğrulama
- Hata durumları

**Teknik testler**

- Build
- Lint
- Typecheck
- Uygun test otomasyonu
- Mobil görünüm
- Tarayıcı konsolu
- Network hataları
- Doğrudan URL üzerinden sayfa açma
- Sayfa yenileme
- Deployment ve auth callback'leri
- Asset yükleme
- Animasyon temizliği
- Azaltılmış hareket modu

Başarısız testleri saklama. Düzelt ve yeniden test et.

Test edilmemiş bir davranışı test edilmiş gibi raporlama.

---

# 15. BAŞARI KRİTERLERİ

İkinci aşama ancak aşağıdaki şartlar karşılandığında başarılı kabul edilir:

1. AgroMax'ın bütün sayfaları profesyonel ve bütünlüklü bir tasarım standardına sahiptir.
2. Düz ve basit görünen bölümler gerekli yerlerde yeniden tasarlanmıştır.
3. Site belirgin şekilde daha sinematiktir.
4. Kamera, scroll, video ve metin animasyonları birbiriyle uyumludur.
5. Sayfa geçişleri kaliteli ve kontrollüdür.
6. Her sayfanın kendine özgü bir görsel kimliği vardır.
7. Mevcut başarılı sahneler korunmuştur.
8. Yeryüzüne Yolculuk deneyimi bozulmamıştır.
9. Tarım arazisi üzerindeki dört aşamalı sahne hem Ana Sayfa'da hem Filiz AI'da bulunmaktadır.
10. Giriş/kayıt ekranları AgroMax'a özel sinematik tasarıma sahiptir.
11. Kullanıcı sistemi gerçek, güvenli ve çalışır durumdadır.
12. Mobil deneyim sorunsuzdur.
13. Önemli performans ve erişilebilirlik sorunları giderilmiştir.
14. GitHub Pages veya Cloudflare Pages üzerinde doğrulanmış bir production dağıtımı vardır.
15. Geliştirme öncesine göre ölçülebilir bir görsel ve teknik kalite artışı sağlanmıştır.

---

# 16. TESLİM RAPORU

Görev tamamlandığında kapsamlı fakat düzenli bir rapor hazırla.

Raporda şu başlıklar bulunmalı:

1. Başlangıçta tespit edilen sorunlar
2. Korunan başarılı bölümler
3. Yeniden tasarlanan bölümler
4. Her sayfada yapılan değişiklikler
5. Yeni sinematik deneyimler
6. Hareket tasarım altyapısı
7. Giriş/kayıt sisteminin durumu
8. Kullanılan kimlik doğrulama altyapısı
9. Performans ve erişilebilirlik sonuçları
10. Gerçekleştirilen testler
11. Başarısız kalan veya doğrulanamayan testler
12. Yayın platformu ve canlı URL
13. GitHub commit bilgileri
14. Kalan teknik riskler ve sınırlamalar
15. Önce/sonra görsel karşılaştırmaları

Mümkünse kritik ekranlar ve sinematik sahneler için gerçek tarayıcı ekran görüntüleri sun.

Değişiklikleri mantıklı, izlenebilir commit'lerle kaydet.

---

# 17. ÇALIŞMA DİSİPLİNİ

Bu görevde şu ilkeler zorunludur:

**Birincisi: Yalnızca plan üretme, uygula.**

Analizden sonra uygulamaya geç. Gerçek dosyalar ve çalışan kod üzerinde değişiklik yap.

**İkincisi: Tasarım kalitesinden ödün verme.**

En hızlı uygulanabilecek çözümü değil, uzun vadede sürdürülebilir ve görsel açıdan en güçlü çözümü seç.

**Üçüncüsü: Mevcut başarıları bozma.**

Her büyük değişiklikten sonra önceki başarılı davranışları yeniden kontrol et.

**Dördüncüsü: Tamamlanmamış işi tamamlanmış gösterme.**

Kimlik doğrulama, deployment veya harici servis entegrasyonunda bir engel varsa net biçimde belirt.

**Beşincisi: Gereksiz onay döngüleri oluşturma.**

Mimari inceleme, tasarım değerlendirmesi, kodlama, test ve düzeltme süreçlerini mümkün olduğunca otonom yürüt.

Yalnızca erişim izinleri, gizli bilgiler, kritik ürün kararları veya geri alınması zor işlemler için kullanıcı müdahalesi iste.

**Altıncısı: Siteyi yapay zekâ ile üretilmiş genel bir şablona dönüştürme.**

AgroMax özgün bir tarım teknolojisi girişimidir ve tasarım da bunu hissettirmelidir.

---

# NİHAİ TALİMAT

AgroMax'ın ikinci aşamasını, üst düzey yaratıcı bir dijital stüdyonun üretim kalitesini hedefleyerek gerçekleştir.

Bu çalışma yalnızca animasyon ekleme, görsel değiştirme veya giriş ekranı oluşturma görevi değildir.

**Bu çalışma AgroMax'ın bütün dijital deneyimini sinematik kalite, özgünlük, etkileşim, teknik güvenilirlik ve ürün altyapısı açısından ileri seviyeye taşıma görevidir.**

Önceliğimiz:

1. Kusursuza yakın sinematik deneyim
2. Mevcut güçlü tasarım kimliğinin korunması
3. Zayıf bölümlerin ciddi biçimde yeniden tasarlanması
4. Özgün etkileşimli sahneler
5. Gerçek ve güvenli kullanıcı sistemi
6. Yüksek performans
7. Mobil uyumluluk
8. GitHub Pages veya Cloudflare Pages üzerinde başarılı yayın

**Vercel'i yeni dağıtım hedefi olarak kullanma.**

**Yeryüzüne Yolculuk bölümünü bozma.**

**Başarılı mevcut videoları ve sahneleri kaybetme.**

**Ana Sayfa ve Filiz AI'daki tarım arazisi sahnesini koru.**

**Sıradan şablon çözümleri kabul etme.**

Çalışmaya mevcut repository ve canlı sitenin kapsamlı değerlendirmesiyle başla. Ardından planı gerçek kod üzerinde uygula ve sonuçları doğrula.

Amaç yalnızca AgroMax'ı daha güzel yapmak değil.

**Amaç, AgroMax'ı ziyaret eden birinin görsel kalitesini, sinematik anlatımını ve mühendislik işçiliğini hemen fark edeceği özgün bir dijital deneyime dönüştürmek.**