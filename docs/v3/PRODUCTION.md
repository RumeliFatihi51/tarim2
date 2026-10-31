# Gerçek prodüksiyon / Orbital

## Dosyalar
- `src/assets/production/orbit-v3.blend`: özgün optik gözlem uydusu, NASA yeryüzü dokusu, ince atmosfer yüzeyi, üç tasarlanmış area ışığı, gerçek sinematik kamera.
- `src/assets/production/field-v3.blend`: 144×144 alt bölümlü sürekli arazi yüzeyi, rölyef, özgün tarla dokusu, bump malzemesi, güneş ışığı, kamera yaklaşımı.
- Her iki Blender dosyasında dokular paketlidir. Kamera ve uydu pozları 24 fps zaman çizelgesine işlenmiştir; sahneler Blender içinde scrub edilebilir.
- Uydu: yalıtımlı gövde, makine kenarları, deck vidaları, radyatör kanatları, çok halkalı optik sensör, iki star-tracker, kıvrımlı parabolik anten, iletişim çubukları, altı panelde ayrı güneş hücreleri ve ince kontak çizgileri. Basit bir dönen küre ya da birkaç dekoratif plaka değil.

## Üretim zinciri
1. `scripts/render_orbital_v3.py`, gerçek Blender geometri/malzeme/ışık/kamera kurulumunu üretir. Cycles CPU, 40 özgün kaynak kare/sahne; uydu 1024×920, 12 örnek; arazi 1024×760, 8 örnek.
2. `scripts/finish_v3.py`: gerçek görüntüleri Intel Open Image Denoise 2.5.1 ile temizler, FFmpeg motion-compensated interpolation ile 24 fps kodlar. Kaynak kamera yolu 6 fps örneklenir; bu nedenle her çıktı karesinin ayrı Cycles renderı olduğu iddia edilmez.
3. Ayrı masaüstü ve mobil H.264 MP4 / VP9 WebM; mobil 576×720. Sessiz, kontrollü döngü. Poster ve WebGL olmadan da kullanılabilir görüntü.
4. `scripts/bake_v3_sources.py`: aynı yolları 24 fps Blender timeline'a işler, bütün görüntüleri paketler. Tekrar render gerekmez.
5. GLB, `@gltf-transform/cli@4.2.1 optimize --compress meshopt --texture-compress false` ile yaklaşık 2.15 MB'dan 130 KB'a iner. Tarayıcıda Three.js'in Meshopt decoder'ı kullanılır. Runtime için yeni paket gerekmez.

## Sahne davranışı
- Ana sayfa: ilk ekranda büyük uydu kadrajı. Masaüstü gerçek WebGL; film ilk kareyi ve fallback'i sağlar. Kamera, scroll ile geniş bir perspektiften yatay geçişe ilerler; yukarı scroll başlangıca döndürür. Sakin idle yayı derinliği ilk ekranda görünür kılar.
- Teknoloji: aynı özgün modelin daha yakın optik sensör kadrajı. Yeryüzü dönmez; kamera ve uydu açısı hareket eder.
- Platform: sürekli tarımsal yüzey üzerinde ayrı bir Blender kamera filmi.
- Filiz: arazi üzerinde parsel/gözlem/geçmiş/dayanak etiketleriyle bağlam kompozisyonu. Etiketler gerçek veriler, analiz sonucu veya sohbet değildir.

## Çalışma zamanı bütçesi
WebGL yalnız büyük ekran ve hareket izni olduğunda lazy import edilir. DPR ≤1.4; hedef ≤30 fps. Görünürlük dışı, sekme gizli, menü açık ve kullanıcı durdurduğunda render durur. GPU geometrileri, malzemeler, dokular ve environment temizlenir; BFCache dönüşünde sahne çalışmaya devam eder. GLB/texture/context hatasında video/poster korunur. Küçük ekran ayrı mobil film alır. Reduced-motion otomatik video ve 3D çalıştırmaz.

Video preload none; görünürlükte kaynak seçimi. Her filmde oynat/durdur kontrolü, WebM ve MP4 fallback, yer tutan sabit kadraj ve poster bulunur. Ağ hatası metni veya gezinmeyi saklamaz.

## Kaynak ve sınırlar
Arazi görseli kavramsal AI üretimidir. NASA Blue Marble gerçek ama tarihsel bir yeryüzü dokusudur; AgroMax gözlem çıktısı değildir. Uydu özgün tasarımdır, ürünün bir uyduya sahip olduğu ima edilmez. Detaylar `ASSET_CREDITS.md` ve `docs/CLAIM_REGISTER.md`.
