export type PageId='hesap'|'home'|'platform'|'teknoloji'|'filiz'|'cozumler'|'hakkimizda'|'iletisim'|'gizlilik'|'kullanim'|'gorsel-kredileri'|'404';
export const navigation: {id:PageId; label:string; path:string}[]=[
{id:'home',label:'Ana Sayfa',path:''},{id:'platform',label:'Platform',path:'platform/'},{id:'teknoloji',label:'Teknoloji',path:'teknoloji/'},{id:'filiz',label:'Filiz AI',path:'filiz/'},{id:'cozumler',label:'Çözümler',path:'cozumler/'},{id:'hakkimizda',label:'Hakkımızda',path:'hakkimizda/'},{id:'iletisim',label:'İletişim',path:'iletisim/'}];
export const metadata: Record<PageId,{title:string;description:string}>= {
hesap:{title:"Gözlem kapısı — AgroMax hesabı",description:"AgroMax hesabı, giriş, kayıt ve güvenli oturum işlemleri."},
home:{title:'AgroMax — Uydu gözleminden tarımsal içgörüye',description:'AgroMax’ın uydu gözlemi, parsel geçmişi ve bağlamsal karar desteği yaklaşımını keşfedin. Dijital tarım yazılımı ve Filiz AI ürün tanıtımı.'},
platform:{title:'Platform — Parselin bütün hikâyesi | AgroMax',description:'Parsel, uydu gözlemi, spektral göstergeler ve zamansal bağlam. AgroMax ürün yaklaşımı ve hedeflenen iş akışları.'},
teknoloji:{title:'Teknoloji — Gözlemin arkasındaki bilim | AgroMax',description:'Sentinel-1, Sentinel-2 ve Landsat; görüntü kalitesi, spektral göstergeler, kaynak bantlar ve bilimsel sınırlar.'},
filiz:{title:'Filiz AI — Bağlamdan anlam üretmek | AgroMax',description:'AgroMax için planlanan bağlamsal tarımsal AI asistanı Filiz. Parsel, gözlem, geçmiş ve kanıtı birlikte değerlendirme hedefi.'},
cozumler:{title:'Çözümler — Sahadaki farklı sorular için | AgroMax',description:'Tarımsal danışmanlar, kooperatifler, çok parsel yöneten işletmeler ve kurumlar için hedeflenen AgroMax kullanım alanları.'},
hakkimizda:{title:'Hakkımızda — Toprağa yakın, veriye bağlı | AgroMax',description:'AgroMax’ın dijital tarıma yaklaşımı: gözlem, bağlam, uzman değerlendirmesi ve izlenebilir bilgi.'},
iletisim:{title:'İletişim — AgroMax hakkında konuşalım',description:'AgroMax hakkında iletişim kanalları ve görüşmeye hazırlık bilgileri.'},
gizlilik:{title:'Gizlilik — AgroMax',description:'AgroMax hesap, oturum, iletişim verileri ve barındırma bilgileri.'},
kullanim:{title:'Kullanım bilgileri — AgroMax',description:'AgroMax tanıtım içeriğinin amacı, ürün durumu ve bilimsel sınırlamalar.'},
'gorsel-kredileri':{title:'Görsel kredileri — AgroMax',description:'AgroMax sitesindeki fotoğraf, özgün Blender sahneleri ve tipografi için kaynak ve lisans bilgileri.'},
'404':{title:'Sayfa bulunamadı — AgroMax',description:'Aradığınız AgroMax sayfası bulunamadı. Ana sayfa veya platform tanıtımına dönebilirsiniz.'}}
export const copy = {
 home:{eyebrow:'DİJİTAL TARIM, DAHA GENİŞ BİR BAKIŞ.',title:['Toprağı anlamanın','yeni perspektifi.'],intro:'Uydu gözlemlerini, parselin geçmişini ve tarımsal bağlamı bir araya getiren yazılım yaklaşımı.',thesis:'Bir görüntüden fazlası.\nBir parselin bütün hikâyesi.',thesisBody:'Tarlada değişim bir anda başlamaz. AgroMax; uydu gözlemlerini zaman, yer ve uzman bilgisiyle birlikte ele almayı hedefler. Amaç daha çok veri göstermekten önce, doğru soruyu görünür kılmak.',thesisNote:'Gözlemden bağlama, bağlamdan gerekçeli değerlendirmeye.'},
 platform:{eyebrow:'AGROMAX PLATFORMU',title:['Her parselin','bir hikâyesi var.'],intro:'Bir alanı yalnızca bugünkü görüntüsüyle değil; konumu, geçmişi ve gözlem koşullarıyla birlikte ele alan ürün yaklaşımı.',note:'Bu sayfa ürün yaklaşımını anlatır. Yeteneklerin üretim ortamındaki kullanılabilirliği ayrıca doğrulanmalıdır.'},
 teknoloji:{eyebrow:'GÖZLEMİN ARKASINDAKİ BİLİM',title:['Yeryüzünü okumak.','Dikkatle.'],intro:'Farklı dalga boyları farklı izler taşır. Anlamlı bir değerlendirme, kaynağın neyi gösterdiği kadar neyi gösteremediğini de bilmeyi gerektirir.'},
 filiz:{eyebrow:'AGROMAX İÇİN PLANLANAN AI ASİSTANI',title:'Filiz',subtitle:'Bağlam bir araya geldiğinde.',intro:'Parseli, gözlemi ve geçmişi aynı çerçevede düşünmek için tasarlanıyor. Bir cevabın ötesinde, cevabın dayanağını da görünür kılma hedefiyle.'},
 cozumler:{eyebrow:'KULLANIM ALANLARI',title:['Farklı sorular.','Ortak bir zemin.'],intro:'AgroMax; sahadaki bilgiyi uydu gözlemleriyle birlikte değerlendirmek isteyen profesyoneller için tasarlanıyor.'},
 hakkimizda:{eyebrow:'AGROMAX HAKKINDA',title:['Toprağa yakın.','Veriye bağlı.'],intro:'AgroMax’ın çıkış noktası basit bir soru: Bir uydu görüntüsünü, sahadaki insan için nasıl daha anlamlı hâle getirebiliriz?',statement:'Daha iyi sorular.\nDaha sağlam dayanaklar.',body:'Uydu tabanlı tarımsal gözlem ve karar desteği üzerine bir yazılım yaklaşımı geliştiriyoruz. Parsel geçmişini, gözlem kalitesini ve uzman değerlendirmesini bir arada düşünmek, bu yaklaşımın merkezinde.'},
 iletisim:{eyebrow:'İLETİŞİM',title:['Sahadaki sorunuz,','başlangıç noktamız.'],intro:'Tarımsal gözlem, parsel takibi veya olası bir çalışma alanı. AgroMax hakkında bir görüşmeye, ihtiyacınızı anlayarak başlamak isteriz.'}
};
export const workflow=[
 {n:'01',title:'Parsel',text:'Her alanı kendi mekânsal ve tarımsal bağlamında düşünmek.'},
 {n:'02',title:'Gözlem',text:'Görüntünün kaynağını, tarihini ve kullanılabilirliğini birlikte ele almak.'},
 {n:'03',title:'Gösterge',text:'Spektral bilgiyi bir teşhis değil, inceleme için bir ipucu olarak okumak.'},
 {n:'04',title:'Zaman',text:'Tek bir görüntünün ötesine geçerek değişimin bağlamını araştırmak.'},
 {n:'05',title:'Değerlendirme',text:'Uzman bilgisini ve saha gözlemini yorumun merkezinde tutmak.'},
 {n:'06',title:'Dayanak',text:'Sonucun hangi kaynağa ve varsayıma dayandığını izlenebilir kılmak.'}
];
export const sources=[
 {title:'Sentinel-1',type:'RADAR GÖZLEMİ',text:'Mikrodalga radar gözlemleri; bulut koşullarından bağımsız veri sağlayabilir. Yüzey pürüzlülüğü, nem ve gözlem geometrisi birlikte değerlendirilir.',status:'Ürün için değerlendirme alanı',url:'https://sentiwiki.copernicus.eu/web/s1-mission'},
 {title:'Sentinel-2',type:'MULTİSPEKTRAL GÖZLEM',text:'Görünür, yakın kızılötesi ve kısa dalga kızılötesi bantlar. Bitki örtüsü ve yüzey değişimini incelemek için farklı spektral pencereler.',status:'Kaynak kodda işleme bileşenleri mevcut; canlı erişim teyit edilmedi',url:'https://documentation.dataspace.copernicus.eu/Data/SentinelMissions/Sentinel2.html'},
 {title:'Landsat',type:'TARİHSEL GÖZLEM',text:'Uzun dönemli yeryüzü gözlem arşivi. Sensör, çözünürlük ve yöntem farkları gözetilerek dönemsel incelemelere kaynak olabilir.',status:'Ürün için değerlendirme alanı',url:'https://www.usgs.gov/landsat-missions'}
];
export const indexGroups=[
 {title:'Bitki örtüsü',description:'Vejetasyonun spektral davranışına dair göstergeler; tür, fenoloji, zemin ve atmosfer koşullarıyla birlikte yorumlanır.',items:['NDVI','GNDVI','EVI','EVI2','SAVI','MSAVI2','OSAVI','GCI','ARVI','VARI']},
 {title:'Kırmızı kenar & pigment',description:'Klorofil ve pigment değişimlerine duyarlılık araştırmalarında kullanılır. Bant seçimi ve kalibrasyon sonucu etkiler.',items:['NDRE','NDRE2','NDRE3','RECI','PSRI','SIPI']},
 {title:'Su, nem & yüzey',description:'NDMI bitki örtüsünün nem koşullarına; McFeeters NDWI açık su ayrımına yöneliktir. Kök bölgesi neminin doğrudan ölçümü değildir.',items:['NDMI','NDWI','MNDWI','NBR','NBR2','NDSI','BSI']}
];
export const indexNotes=[
 {name:'NDVI',text:'Kırmızı ve yakın kızılötesi yansıma farkıyla bitki örtüsünün spektral tepkisini özetler. Tek başına bitki sağlığı tanısı değildir.'},
 {name:'NDRE',text:'Kırmızı kenar ve yakın kızılötesi bantları kullanır. Klorofil duyarlılığı; bitki, gelişim evresi ve kullanılan formüle bağlıdır.'},
 {name:'NDMI',text:'Yakın ve kısa dalga kızılötesi yansıma ilişkisine dayanır. Kanopi nem koşullarına duyarlı bir göstergedir.'},
 {name:'NDWI',text:'Bu sitede McFeeters yaklaşımını ifade eder: yeşil ve yakın kızılötesi bantlarla açık su ayrımına yöneliktir. Gao’nun aynı adlı indeksiyle karıştırılmamalıdır.'}
];
export const audiences=[
 {n:'01',title:'Tarımsal danışmanlar',question:'Saha ziyaretinden önce nereye bakmalı?',text:'Parsel geçmişini ve gözlem koşullarını birlikte inceleyerek saha ziyaretine hazırlanma. Uydu göstergesini uzman değerlendirmesiyle tamamlama.',use:'Hedeflenen kullanım: inceleme önceliklerini belirlemeye destek.'},
 {n:'02',title:'Kooperatifler',question:'Farklı parselleri ortak bir çerçevede nasıl ele almalı?',text:'Üretici ve parsel bilgilerini ortak gözlem yaklaşımıyla ilişkilendirme. Farklı alanlardaki soruları bağlamlarını kaybetmeden takip etme.',use:'Hedeflenen kullanım: gözlem ve iletişim süreçlerini düzenleme.'},
 {n:'03',title:'Tarımsal işletmeler',question:'Birden fazla alanın geçmişini nasıl korumalı?',text:'Parsel bazındaki gözlem ve değerlendirmeleri dönemler arasında izleme. Tarımsal uygulamalar ile görülen değişimler arasında temkinli bir okuma kurma.',use:'Hedeflenen kullanım: çok parsel için süreklilik taşıyan inceleme.'},
 {n:'04',title:'Araştırma & kurumlar',question:'Bir değerlendirmenin dayanağı nerede?',text:'Kaynak, yöntem, veri kalitesi ve belirsizliği açık tutan bir çalışma biçimi. Uydu gözlemi ile saha kanıtı arasındaki farkı koruma.',use:'Hedeflenen kullanım: izlenebilir gözlem ve yöntem değerlendirmesi.'}
];
export const principles=[
 {title:'Önce kaynak.',text:'Tarih, ürün kimliği ve görüntü kalitesi; değerlendirmeye eklenen dipnotlar değil, değerlendirmenin başlangıcı.'},
 {title:'Bağlamı koru.',text:'Aynı gösterge farklı toprak, bitki ve dönemlerde farklı anlamlar taşıyabilir. Tek değerle kesin hüküm vermeyiz.'},
 {title:'Sahaya geri dön.',text:'Uzaktan algılama inceleme alanını daraltabilir. Saha gözlemi ve uzman değerlendirmesinin yerini almaz.'}
];
export const filizContexts=[{title:'Parsel',text:'Konum, yetiştirilen ürün ve izin verilen parsel bilgileri.'},{title:'Gözlem',text:'Kaynağı ve kalite koşulları bilinen uydu gözlemleri.'},{title:'Geçmiş',text:'Zaman içinde kaydedilen değişimler ve önceki değerlendirmeler.'},{title:'Dayanak',text:'Raporlar, yöntemler, belirsizlik ve saha doğrulaması.'}];
export const future=[{title:'Dijital ikiz',text:'Parseli farklı bilgi katmanlarıyla ele alma araştırması.'},{title:'Senaryo karşılaştırması',text:'Olası uygulamaları karşılaştırmaya yönelik uzun vadeli araştırma.'},{title:'Ekipman çıktıları',text:'Uyumlu ekipmanlara dosya aktarımı ve entegrasyon hedefi.'}];
export const legal={
 privacy:[['Hesap ve iletişim verileri','Hesap açarken e-posta ve isteğe bağlı profil adı Supabase Auth üzerinde işlenir. Şifreleri siteye ait bir tabloya kaydetmeyiz; kimlik doğrulama sağlayıcısı yönetir. İletişim talebinin konusu, mesajı, kullanıcı kimliği ve oluşturulma zamanı kullanıcıya özel erişim kurallarıyla saklanır.'],['Tarayıcıdaki oturum','Oturumun devam etmesi için Supabase istemcisi tarayıcı depolamasında oturum belirteçleri tutar. Paylaşılan cihazda çıkış yapın. Çıkış yapmak hesabı silmez. Site reklam veya analitik izleme kodu eklemez.'],['Hizmetler ve günlükler','Kimlik doğrulama ve talep kayıtları AgroMax Supabase projesinde işlenir. Siteyi sunan barındırma hizmeti ve Supabase güvenlik ve işleyiş için IP adresi ve teknik günlükler işleyebilir. Dış bağlantılarda ilgili hizmetin koşulları geçerlidir.'],['Erişim ve kaldırma talepleri','Profil adını hesap alanından güncelleyebilirsiniz. Hesap veya iletişim kaydıyla ilgili erişim ve kaldırma isteğinizi doğrulanmış hesabınızla görüşme talebi olarak iletebilirsiniz. Otomatik hesap silme özelliği sunulmaz. Doğrulanmış doğrudan iletişim adresi henüz paylaşılmadı.']],
 terms:[['İçeriğin amacı','Bu sitedeki içerikler AgroMax ürün yaklaşımını ve hedeflenen kullanım alanlarını tanıtır. Site içinde ürün kullanılamaz ve kişiye veya parsele özel analiz sunulmaz.'],['Ürün durumu','Kaynak kodun bulunması bir yeteneğin üretim ortamında doğrulandığı anlamına gelmez. Filiz planlanan ürün özelliğidir. İleri entegrasyonlar ve senaryolar araştırma veya vizyon kapsamında ele alınır.'],['Bilimsel sınırlar','Uydu göstergeleri tek başına hastalık teşhisi, sulama reçetesi, kök bölgesi nem ölçümü veya karbon sertifikasyonu değildir. Saha doğrulaması ve uzman değerlendirmesi gerekir.'],['Görseller ve haklar','Arazi fotoğrafları genel görsel anlatım içindir; AgroMax tarafından analiz edilmiş parselleri göstermez. Blender çalışmaları özgün temsili sanat üretimleridir. Üçüncü taraf fotoğraf ve fontların koşulları Görsel Kredileri sayfasında belirtilir.']]
};
export const navLabels={open:'Menüyü aç',close:'Menüyü kapat',menu:'Menü',closeShort:'Kapat',external:'Platforma git'};
