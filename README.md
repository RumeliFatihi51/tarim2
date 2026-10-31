# AgroMax — Kurumsal ürün sitesi

Uydu tabanlı dijital tarım yazılımı için özgün, Türkçe, çok sayfalı tanıtım sitesi. **Ürün uygulaması değildir:** dashboard, hesap, giriş, demo, uydu analizi, parsel kontrolü, chatbot veya ürün API’si içermez.

## Çalıştırma

Node.js 22.12+ veya 24 önerilir.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run check
npm run preview
```

Vite + React + TypeScript; build sırasında React sunucu renderı ile 11 bağımsız HTML çıktısı. Backend veya SSR sunucusu gerekmez. JavaScript kapalıyken sayfa metinleri, normal bağlantılar ve footer gezinmesi kullanılabilir.

## Sayfalar

`/`, `/platform/`, `/teknoloji/`, `/filiz/`, `/cozumler/`, `/hakkimizda/`, `/iletisim/`; ayrıca `/gizlilik/`, `/kullanim/`, `/gorsel-kredileri/`, `404.html`.

Her ana sayfanın farklı hero ve editoryal düzeni vardır. Canonical URL gerçek barındırma adresinden derleme sırasında üretilir. Gerçek origin yoksa canonical ve sitemap adresi uydurulmaz. `.nojekyll` ve `404.html` oluşturulur. Doğrudan alt sayfalar ve yenileme statik dizin/index.html çıktılarıyla çalışır.

## GitHub Pages

Depo: https://github.com/RumeliFatihi51/tarim2

`.github/workflows/pages.yml`, main dalına push veya manuel tetiklemede `npm ci`, `npm run build`, `npm run check`, Pages artifact upload ve deploy adımlarını çalıştırır. Depoda Settings → Pages → Source: GitHub Actions kullanılmalıdır. `actions/configure-pages` origin ve base path’i belirler; proje deposu ve kullanıcı alan adı senaryoları desteklenir. CNAME dosyası eklenmez; kullanıcı özel alan adı sağlamadı.

Yerel proje-alt-yol doğrulaması:

```sh
BASE_PATH=/tarim2/ SITE_ORIGIN=https://rumelifatihi51.github.io npm run build
BASE_PATH=/tarim2/ npm run check
```

Özel alan adı eklenirse Pages ayarları ve doğru CNAME birlikte güncellenmeli. Kök yayında `BASE_PATH=/` olur.

## İçerik düzenleme

- `src/content/site.ts`: sayfa başlıkları, açıklamalar, ürün metinleri, kaynaklar, indeks grupları, kullanım alanları ve yasal açıklamalar.
- `src/content/interface.ts`: bileşenlerin editoryal ve arayüz metinleri; anahtarlar bileşen adına göre gruplanır.
- `src/content/section-copy.ts`: bölüm etiketleri ve kısa paralel listeler.
- `src/config/site.ts`: gerçek iletişim e-postası ve isteğe bağlı haricî platform URL’si. Şu anda kullanıcı talimatına göre ikisi de boştur. Uygulama bağlantısı ancak gerçek URL eklendiğinde görünür olmalıdır.
- `docs/CLAIM_REGISTER.md`: tüm ürün iddiaları, kaynakları, doğruluk seviyesi ve belirsizlikleri. Yeni iddia eklemeden önce bu dosyayı güncelleyin.

İletişim bilgisi bulunmadığı için sahte form veya e-posta kullanılmaz. İngilizce içerik henüz sağlanmadığından işlevsiz dil düğmesi yoktur; içerik dosyaları ikinci dil için ayrıştırılmaya uygundur.

## Görsel üretim ve hareket

- Lisanslı gerçek Toskana fotoğrafı; özgün üç Blender/Cycles renderı, bir Blender kaynaklı GLB.
- GSAP doğal kaydırmayı izler; scroll kilitleme, pinleme veya zorunlu intro yoktur.
- S02 masaüstünde görünmeye yaklaşırken gerçek 3D yüklenir. WebGL yoksa, mobilde veya reduced-motion’da poster korunur.
- 3D yalnız görünürken ve scroll/resize değişiminde render edilir; sayfa kapanışında GPU kaynakları temizlenir. Görünmeyen video yoktur; bu sürümde video kullanılmaz.
- Görsel üretimini yeniden çalıştırmak için `docs/SCENE_CARDS.md`; dosya bazında haklar için `ASSET_CREDITS.md`.

## Dosya yapısı

`src/pages`, `src/layout`, `src/components`, `src/sections`, `src/motion`, `src/scenes`, `src/assets`, `src/styles`, `src/content`, `src/config`, `public/media`, `docs/credits`, `scripts`, `qa`.

## Doğrulama ve teslim

- `npm run build`: TypeScript kontrolü, üretim paketleme, statik render.
- `npm run check`: tüm sayfalar, yerel link/görsel/font yolları, tek h1, benzersiz metadata, yasak rota/form denetimi, asset bütçesi.
- `qa/browser.cjs`: Playwright + axe ile tarayıcı incelemesi; araç yolları bu çalışma ortamına göre seçilmiştir. Normal geliştirme bağımlılığı değildir.
- `docs/QA_REPORT.md`: gerçek sonuçlar, ekran görüntüleri, performans ölçümleri ve sınırlar.

Ürün kaynakları incelendi ancak canlı ürün doğrulanmadı. Filiz planlanan özellik olarak anlatılır. Müşteri, ekip, performans veya ortaklık iddiaları eklenmedi. İletişim, özel domain ve ayrı uygulama URL’si kullanıcı tarafından henüz sağlanmadı.

## Depo ve yayın durumu

Kullanıcının açık talimatıyla tarim2 deposunun main dalındaki eski ürün dosyaları bu bağımsız tanıtım sitesiyle değiştirildi. Eski ürün sürümü [backup/product-before-agromax-20261031](https://github.com/RumeliFatihi51/tarim2/tree/backup/product-before-agromax-20261031) dalında korunur. Önceki site dalı `agromax-website` ayrıca bulunur; güncel teslim main dalıdır.

Bağlı GitHub entegrasyonu yeni depo oluşturmayı ve Pages etkinleştirmeyi reddetti (`createRepository: Resource not accessible by integration`; Pages create HTTP 403). Pages açılıncaya kadar workflow derleme, test ve artifact üretir; yayını atlar.

Hesap sahibi [Settings → Pages](https://github.com/RumeliFatihi51/tarim2/settings/pages) ekranında Source: **GitHub Actions** seçmelidir. Ardından main dalının son workflow çalışması yeniden çalıştırılabilir. Bu ayar token yetkileriyle değiştirilemediği için çalışan bir Pages URL’si henüz doğrulanmış değildir.
