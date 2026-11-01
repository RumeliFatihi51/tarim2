# AgroMax / iddia ve kaynak kaydı

Tarih: 31 Ekim 2026. Ana kaynak: kullanıcı tarafından sağlanan `AGROMAX_GPT61_SOL_Gorselli_Master_Brief_v3_DUZELTILMIS.pdf` (25 sayfa). PDF çalışma alanında kaldı; dağıtım paketine veya GitHub deposuna kopyalanmadı.

İncelenen eski ürün kaynağı: https://github.com/RumeliFatihi51/tarim2 ; sabit commit `edfac51abf4f8e3bd6c6e7978ec0e03919cb8964`. README bu sürümü TerraSat AI olarak adlandırıyor. Web markası güncel kullanıcı brifine göre AgroMax. Eski kodun bulunması yeni AgroMax sürümünün üretim doğrulaması değildir.

| İddia / alan | Durum | Kanıt | Dış metindeki yaklaşım |
|---|---|---|---|
| Nihai marka AgroMax | Doğrulandı (talimat) | PDF s.13–14 | AgroMax kullanılır; TerraSat ikinci marka yapılmaz. |
| Uydu tabanlı tarımsal gözlem ve karar destek odağı | Doğrulandı (ürün tanımı) | PDF s.13; eski depo README | Ürün yaklaşımı olarak anlatılır. |
| Sentinel-2 işleme bileşenlerinin kaynak kodda bulunması | Doğrulandı (kod varlığı) | [rasterProcessor.ts](https://github.com/RumeliFatihi51/tarim2/blob/edfac51abf4f8e3bd6c6e7978ec0e03919cb8964/server/processing/rasterProcessor.ts), [satelliteProvider.ts](https://github.com/RumeliFatihi51/tarim2/blob/edfac51abf4f8e3bd6c6e7978ec0e03919cb8964/server/providers/satelliteProvider.ts) | Bileşenler mevcut; canlı erişim teyit edilmedi. |
| Canlı Sentinel-2 analizinin üretimde çalışması | Bilinmiyor | Kimlik bilgileriyle uçtan uca ürün çalıştırılmadı | Çalışıyor iddiası yok. |
| NDVI, NDWI, NDMI, NDRE, NBR hesaplama işlevlerinin bulunması | Doğrulandı (kod varlığı) | [spectralIndices.ts](https://github.com/RumeliFatihi51/tarim2/blob/edfac51abf4f8e3bd6c6e7978ec0e03919cb8964/server/processing/spectralIndices.ts) | Sitede yalnız bilimsel açıklama; ürün performansı iddiası yok. |
| Diğer listelenen spektral indekslerin AgroMax’ta tamamlanmış olması | Bilinmiyor | PDF'de yöntem başlıkları var; tamamlanmış ürün testi yok | Yöntem kataloğu olarak açıkça sunulur. |
| Zaman serisi ve rapor arşivi kodunun bulunması | Doğrulandı (kod varlığı) | [timeSeries.ts](https://github.com/RumeliFatihi51/tarim2/blob/edfac51abf4f8e3bd6c6e7978ec0e03919cb8964/server/processing/timeSeries.ts), [analysisStore.ts](https://github.com/RumeliFatihi51/tarim2/blob/edfac51abf4f8e3bd6c6e7978ec0e03919cb8964/server/persistence/analysisStore.ts) | Hedeflenen iş akışı; doğrulanmış saha sonucu iddiası yok. |
| Eski kaynakta bağlamsal asistan bileşenleri | Doğrulandı (kod varlığı) | [assistantService.ts](https://github.com/RumeliFatihi51/tarim2/blob/edfac51abf4f8e3bd6c6e7978ec0e03919cb8964/server/ai/assistantService.ts), AICopilotView.tsx | Eski bileşenlerin varlığı ile Filiz sürüm durumu ayrılır. |
| Filiz adı ve bağlamsal tarımsal AI özelliği | Plan | PDF s.17–18 ve güncel kullanıcı talimatı | “Planlanan”, “hedefleyen”, “tasarlanıyor”. |
| Filiz’in AgroMax adıyla tamamlanmış üretim sürümü | Bilinmiyor | Çalışan yeni sürüm testi ve sürüm kaydı yok | Tamamlandı veya çevrimiçi iddiası yok. |
| Sentinel-1 / Landsat entegrasyonu | Bilinmiyor / değerlendirme alanı | Brifte kaynak türü olarak geçiyor | Genel kaynak tanıtımı; canlı entegrasyon iddiası yok. |
| Dijital ikiz, senaryo karşılaştırması, ekipman çıktısı | Vizyon | PDF s.13,17 | Ayrı uzun vadeli vizyon bölümü. |
| Müşteriler, gelir, çalışan sayısı, kuruluş tarihi, yatırım, ödüller, ortaklıklar | Bilinmiyor | Doğrulanabilir belge yok | Yayımlanmadı. |
| Verim, su tasarrufu, doğruluk oranları | Bilinmiyor | Saha testi / kanıt yok | Sayısal başarı iddiası yayımlanmadı. |
| İletişim, haricî uygulama URL’si ve özel alan adı | Mevcut değil | Kullanıcı: “şimdilik bunlar yok” | Link ve adres uydurulmaz; içeride çalışan sayfalara CTA verilir. |

## Bilimsel açıklamaların kaynakları

- [Copernicus Sentinel-2 dokümantasyonu](https://documentation.dataspace.copernicus.eu/Data/SentinelMissions/Sentinel2.html): kaynak bantlar, L1C/L2A ayrımı ve AOT/WV/SCL ürünlerinin niteliği.
- [Sentinel-1 görevi](https://sentiwiki.copernicus.eu/web/s1-mission): radar gözlem yaklaşımı.
- [USGS Landsat Missions](https://www.usgs.gov/landsat-missions): Landsat gözlem programı.
- NDWI açıklaması yeşil/NIR kullanan McFeeters yaklaşımını ifade eder. Gao yaklaşımının aynı ismi taşıması açıkça ayrılmıştır. NDMI kök bölgesi nem ölçümü diye sunulmaz.

## Kullanılmayan malzeme

Eski deponun `src/demo/sampleData.ts` ve `src/data/parcels.ts` içeriği, gösterge değerleri, sahte parselleri, kontrol paneli ve ekranları bu siteye aktarılmadı. Diamond Challenge dosyaları bu oturumda sağlanmadı; incelenmiş sayılmadı. Ürün kodunun testleri bu görev kapsamında çalıştırılmadı; site testleri ürünün bilimsel performansını doğrulamaz.

## Cinematic 2.0 update
The redesign adds only conceptual brand artwork and real CGI animation. It introduces no new product capability claims. The generated landscape is not a factual satellite observation and the material sculptures are not analytic outputs. Filiz remains a planned in-product assistant. Existing scientific caveats, unknown integration status, and absent contact/app URL remain in force.

## Orbital / üçüncü tasarım güncellemesi
Yeni uzaktan algılama görsel dili özgün bir kavramsal gözlem uydusu ve tarımsal peyzaj kullanır. AgroMax'ın uydu sahibi/işleticisi olduğu, modelin Sentinel-2'nin gerçek bir kopyası olduğu veya sinematik sahnenin gerçek analiz yaptığı iddia edilmez. NASA Blue Marble dokusu yeryüzü betimlemesi içindir; güncel gözlem, AgroMax çıktısı, NASA ortaklığı veya onayı değildir. Kaynak ve kullanım ilkeleri Görsel Kredileri ve ASSET_CREDITS.md'de belirtilir. Arazi görseli yapay zekâ ile üretilmiş kavramsal anlatımdır. Filiz planlanan özellik olmaya devam eder. Yeni başarı yüzdesi, müşteri/ekip bilgisi veya gerçek olmayan iletişim kanalı eklenmedi.

## Yeryüzüne Yolculuk güncellemesi
Kamera, bitki geometrisi ve atmosferik sahneler kavramsal görsel anlatımdır. Gözlem aşamasının renkleri ve sınırları gerçek parsel, gerçek tarihte ölçülmüş spektral veri veya üretimde çalışan AgroMax analizi değildir. Zamansal bölüm tarihsiz yaklaşımı anlatır, farklı tarihlerden ölçüm gibi sunulmaz. Hava koşulları yorum bağlamına dahildir; canlı hava entegrasyonu doğrulanmış sayılmaz. Filiz hâlâ planlanan özellik; iddia kaydındaki önceki bilinmeyenler korunur.
