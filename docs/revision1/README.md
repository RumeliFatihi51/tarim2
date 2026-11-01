# AgroMax — Aşama 1 premium görsel revizyonu

Bu revizyon mevcut kimliği korur. Yeryüzüne Yolculuk kapsam dışındadır. Tasarım fontları, renkleri, navigasyonu ve ürün iddiaları değiştirilmemiştir.

- [Yedi sayfalık denetim ve kararlar](AUDIT.md)
- [Üretim yöntemi ve kaynaklar](PRODUCTION.md)
- [Korunan dosyalar / SHA-256](protected.json)
- [Tarayıcı görüntü ve medya kontrolü](browser-results.json)
- [Erişilebilirlik, gezinme ve JavaScript kapalı kontroller](routes.json)
- [Yeni medya listesi / boyut / SHA-256](media-manifest.json)

## Önce / sonra

Karşılaştırmalar gerçek Chromium tam sayfa görüntüleridir. Önce sürümü `105b3df`; yeni sürüm aynı çözünürlükte ve reduced-motion tercihiyle yakalanmıştır. Bu yüzden animasyon yerine poster görünür. Normal hareketli video ayrıca test edilir. Görselleri büyüterek değerlendirin.

| Sayfa / değişen önemli alanlar | Masaüstü | Mobil |
|---|---|---|
| Ana sayfa — Filiz tanıtımı, zamansal peyzaj renk düzeni | [1440 px](review/home-1440-comparison.jpg) | [390 px](review/home-390-comparison.jpg) |
| Platform — peyzaj seçimi, karar desteği arazi rölyefi | [1440 px](review/platform-1440-comparison.jpg) | [390 px](review/platform-390-comparison.jpg) |
| Teknoloji — botanik 3D açılış | [1440 px](review/teknoloji-1440-comparison.jpg) | [390 px](review/teknoloji-390-comparison.jpg) |
| Filiz — fiziksel botanik arşiv, görsele bağlı açıklamalar | [1440 px](review/filiz-1440-comparison.jpg) | [390 px](review/filiz-390-comparison.jpg) |
| Çözümler — dört ayrı kadraj | [1440 px](review/cozumler-1440-comparison.jpg) | [390 px](review/cozumler-390-comparison.jpg) |
| Hakkımızda — malzeme kadrajı ve fotoğraf üzeri ışık dengesi | [1440 px](review/hakkimizda-1440-comparison.jpg) | [390 px](review/hakkimizda-390-comparison.jpg) |
| İletişim — görselin kanal yüzeyiyle bütünleşmesi | [1440 px](review/iletisim-1440-comparison.jpg) | [390 px](review/iletisim-390-comparison.jpg) |

Başarılı içerik alanlarının hepsi sırf yeni görsel eklemek için değiştirilmedi. Alt bölümlere ilişkin koruma kararları denetim tablosundadır.
