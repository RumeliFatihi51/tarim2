# AgroMax / Orbital — üçüncü tasarım

## Düzeltme
Önceki sürümün temel sorunu: soyut seramik nesneler tarımsal uzaktan algılamayı anlatmıyordu; büyük ve ince yazı, ürün bilgisini geriye itiyordu. Yeni tasarımın konusu açıkça uydu tabanlı tarımsal analizdir. Açık zemin, güçlü Instrument Sans, orman yeşili, kontrollü lime vurgu ve gerçekçi yeryüzü dokusu. Gerçek ürün ekranı, sahte analiz sonucu veya chatbot yok.

## Kodlamadan önce değerlendirilen sekiz prodüksiyon

| Konsept / ürün fikri | Görsel, modelleme, malzeme ve ışık | Kamera / scroll | Teknik, mobil ve maliyet | Karar |
|---|---|---|---|---|
| 1. Orbital gözlem / uzaktan algılama | Özgün optik gözlem uydusu; çok katmanlı lens, altın ısı yalıtımı, radyatör, anten, hücreli güneş kanatları. NASA yeryüzü dokulu küre, atmosfer kenarı, güneş ve dolgu ışığı. | Yavaş dolly ve yörünge yayı; scroll görüş açısını ve mesafeyi geri dönüşlü değiştirir. | GLB + Three.js, gerçek Blender video fallback; mobil optimize film. Orta GPU, sınırlı DPR. | Seçildi: ürünle ilk bakışta ilişki, ana imza. |
| 2. Yeryüzüne yaklaşım / parsel bağlamı | Özgün yüksek çözünürlüklü tarla görseli, gerçek yüzey geometrisi ve hafif arazi rölyefi. | Geniş gözlemden detaylı topografyaya eğimli kamera yaklaşımı. | Blender kamera filmi + poster, mobil dikey kodlama. Düşük çalışma zamanı maliyeti. | Seçildi: platformun odağı arazi. |
| 3. Spektral pencere / farklı bantlar | Prizma yerine gerçek optik sensörün lens açıklığı, ayrı spektral bantları anlatan dalga boyu şeritleri. Metal, optik cam, doğrudan ışık. | Makro lens yaklaşımı; metin ile bantlar eşleşir. | Uydu GLB yakın kadraj + erişilebilir HTML. Mobil statik yakın plan. Orta maliyet. | Teknoloji sayfasına uyarlandı; sahte NDVI haritası yok. |
| 4. Zaman izi / değişim | Aynı coğrafyanın mevsimsel ışık ve bitki dokusu evrimi; tarihsiz kavramsal sekans. | Sabit coğrafya, zamansal kamera rayı. | İkinci texture seti / shader / video. Orta maliyet. | Gerçek ölçüm izlenimi riski ve tekrar nedeniyle seçilmedi. |
| 5. Filiz bağlam ağı / açıklanabilirlik | Soyut AI küresi yerine parsel, gözlem, geçmiş ve dayanak etiketlerini aynı arazi üzerinde buluşturan editoryal kompozisyon. | Araziye yaklaşırken etiketlerin mekânsal ilişkisi ortaya çıkar. | Arazi filmi + HTML; mobil dikey anlatım, düşük maliyet. | Seçildi: chatbot olmadan amaç anlatır. |
| 6. Saha bakışı / kullanım | Görüş açısına göre değişen tarım alanları; profesyoneller için farklı sorular. Doğal ton ve gerçekçi ışık. | Bölüm geçişi sırasında farklı odaklar; sakin hareket. | Büyük görüntü kırpmaları + tipografi, mobil tam genişlik. Düşük. | Çözümler için seçildi. |
| 7. Kanıt zinciri / izlenebilirlik | Gösterişli kutu-ok yerine açık numaralı editoryal süreç; kaynağın gözlemden karara taşınması. | İnce çizgi üzerinde scroll ilerlemesi, içerik her zaman görünür. | HTML + GSAP, reduced-motion sabit. Çok düşük. | Destekleyici hareket; 3D yerine geçmez. |
| 8. Gece uçuşu / marka kapanışı | Şehir ışıkları ve yörüngedeki uydu silüeti; metal kenar ışığı. | Yavaş ufuk hattı hareketi. | Ek gece dokusu ve render. Orta. | Çok uzay markası hissi verdiği için seçilmedi. |

## Seçilen storyboard
1. İlk ekran: açık ve okunur ürün tanımı; ekranın sağında gerçek 3D uydu, mavi yeryüzü ve atmosfer. Gösterişli intro/scroll kilidi yok. Mobilde metnin hemen ardından aynı prodüksiyonun optimize filmi.
2. Scroll: uydu görüş açısı ve uzaklık değişir; panel parçaları serbestçe uçuşmaz, fiziksel bütünlük korunur. Alt tarafta gösterge → zaman → bağlam anlatımı.
3. Platform: uzaydan araziye yaklaşan ayrı kamera sekansı. Parsel bağlamı ve altı adımlı değerlendirme süreci.
4. Teknoloji: optik sensör kadrajı, uydu kaynakları, bantların ve indekslerin bilimsel sınırları.
5. Filiz: tarla odağı ve dört bilgi kaynağı; planlanan özellik etiketi, çalışan sohbet yok.
6. Son: platform, teknoloji ve çözümler arasında açık gezinme.

Bütün yeni görseller kavramsal anlatımdır. Uydu özgün bir gözlem uydusu modelidir; AgroMax'ın bir uydu işlettiği veya modelin Sentinel-2'nin gerçek kopyası olduğu ileri sürülmez.
