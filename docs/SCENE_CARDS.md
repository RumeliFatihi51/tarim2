> V1 arşiv belgesi. Güncel Cinematic 2.0 üretimi ve final seçimleri `docs/redesign-v2/PRODUCTION.md` içinde belgelenir. Aşağıdaki eski video/üretim durumu yeni sürüm için geçerli değildir.

# Sinematik sahne kartları

Tüm sahneler ürün tanıtımı içindir. Gerçek uydu analizi veya uygulama arayüzü değildir. Yerel render aracı Blender 4.3.2; sahne üretim kodu `scripts/render_scenes.py`, düzenlenebilir kaynaklar `src/scenes/*.blend`.

| Sahne | Amaç / yöntem | Kamera, malzeme ve ışık | Hareket | Mobil / reduced-motion | Performans |
|---|---|---|---|---|---|
| S01 / Yeryüzüne bakış | Lisanslı gerçek fotoğraf + özgün optik grafik | Toskana geniş arazi kadrajı; doğal gün ışığı | Scroll ile yavaş optik yaklaşma; iç ve dış halkaların farklı odak hareketi | 780×1000 ayrı kırpım; reduced-motion’da sabit fotoğraf | Hero öncelikli; WebP masaüstü 446 KB, mobil yaklaşık 107 KB |
| S02 / Mineral katmanları | Özgün Blender mineral/porselen/cam katmanlar; Cycles poster + gerçek GLB/Three sahnesi | Perspektif kamera; celadon, cam, kireçtaşı, bronz; geniş area light | Gerçek 3D katmanların scroll ile birbirinden ayrılması; bağımsız kamera yayı. Ekran paneli veya spektral veri değil | Mobil ve reduced-motion’da yüksek kaliteli poster; WebGL hatasında poster | GLB yaklaşık 1.1 MB; görünmeye yaklaşınca yükleme; DPR ≤1.5; yalnız scroll/resize’da, görünürken render; dispose |
| S03 / Zaman metaforu | Fotoğraf + iki bağımsız optik kadraj ve taranan lens maskesi | Aynı fotoğrafın doğal ve koyu optik katmanları | Scroll ile maskenin sahneyi taraması, iki farklı optik ölçeğin hareketi, çizgilerin ritmi | Mobilde sadeleştirilmiş kadraj; reduced-motion’da sabit kompozisyon | Video veya ekstra görsel indirme yok. Gerçek dönem/mevsim karşılaştırması iddiası yok |
| S04 / Filiz | Özgün, iç içe yükselen cam ve porselen heykel; Cycles render | Ortografik 6.4 ölçek; üç yumuşak stüdyo ışığı; mikro pürüzlü doğal yüzeyler | Scroll ile kaynak çizgilerinin merkezde birleşmesi, bağlamların görünmesi ve heykel kadrajı | Kare 900×900 mobil poster, sabit reduced-motion | Masaüstü yaklaşık 75 KB; mobil yaklaşık 30 KB; görünmeyen sürekli loop yok |
| S05 / Kanıt sürekliliği | Özgün Blender hizalanmış mineral portaller + editoryal yol | Ortografik stüdyo kadrajı, porselen ve celadon, bronz devamlılık çizgisi | Gözlemden dayanağa çizginin çizilmesi ve beş basamağın sıralı vurgulanması | Sabit görsel ve okunabilir beş basamak; reduced-motion’da tamamı görünür | Lazy WebP; sürekli render yok |

## Gerçek çıktı türleri

S01: fotoğraf/WebP + CSS/GSAP/SVG. S02: `.blend`, `.glb`, PNG render, WebP poster, Three.js. S03: CSS maske + fotoğraf/GSAP. S04: `.blend`, PNG render, WebP + SVG/GSAP. S05: `.blend`, PNG render, WebP + SVG/GSAP.

Video üretilmedi ve video üretildiği iddia edilmez. Filiz ve kanıt sahneleri canlı WebGL değildir. Denoiser bu Blender derlemesinde bulunmadığından Cycles 96 örnekle render edildi; bu teknik sınır görsel incelemede dikkate alınır. Renderlar gerçek dış mekân fotoğrafı diye sunulmaz.

## Üretimi yeniden çalıştırma

1. `blender -b --threads 8 --python scripts/render_scenes.py`
2. `blender -b src/scenes/strata.blend --python scripts/export_glb.py`
3. `python scripts/optimize_media.py` (Pillow gerekir).

Haricî model, PBR dosyası veya HDRI kullanılmadı. Bu nedenle Poly Haven/ambientCG varlığı indirilmiş gibi listelenmez. Kaynak önerileri değerlendirildi; özgün üretim bu sahneler için yeterliydi.
