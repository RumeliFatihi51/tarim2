import { FullAnalysisPayload, Parcel } from '../types';
import { INITIAL_PARCELS } from '../data/parcels';

export function getDemoAnalysisPayload(parcelId?: string): FullAnalysisPayload {
  const parcel: Parcel = INITIAL_PARCELS.find((p) => p.id === parcelId) || INITIAL_PARCELS[0];
  const ndvi = parcel.ndvi || 0.68;
  const ndwi = parcel.ndwi || 0.21;
  const ndmi = parcel.ndmi || 0.18;
  const moisture = parcel.soilMoisture || 38;

  return {
    parcel,
    satelliteMetadata: {
      sensor: 'Copernicus Sentinel-2B MSI (Demo Mode)',
      sceneId: `S2B_MSIL2A_DEMO_${parcel.id.toUpperCase()}_SAMPLE`,
      tileId: 'T35SNC',
      acquisitionDate: parcel.lastObservation || '08 Eylül 2026',
      cloudCoveragePercent: 4.2,
      cloudScreeningPassed: true,
      spatialResolutionMeters: 10,
      processingLevel: 'L2A (BOA Surface Reflectance - Demo)',
      bandsUsed: ['B02 (Blue)', 'B03 (Green)', 'B04 (Red)', 'B08 (NIR)', 'B11 (SWIR)'],
      dataSource: 'TerraSat Demo Arşivi (Sentinel-2 Referans)',
    },
    spectralBands: parcel.spectralBands || {
      B02: 0.042,
      B03: 0.078,
      B04: 0.055,
      B08: 0.38,
      B11: 0.165,
    },
    calculatedIndices: {
      ndvi,
      ndviTrend: -0.01,
      ndwi,
      ndwiTrend: -0.03,
      ndmi,
      soilMoisture: moisture,
      waterStress: parcel.waterStress || 'Medium',
      plantHealth: parcel.plantHealth || 'Good',
      carbonIndicator: parcel.carbonIndicator || 'Positive',
    },
    pixelStats: {
      totalPixels: Math.round(parcel.areaHa * 100),
      validPixels: Math.round(parcel.areaHa * 96),
      cloudMaskedPixels: Math.round(parcel.areaHa * 4),
      validPixelRatio: 0.96,
      cloudMaskedRatio: 0.04,
      resolutionMeters: 10,
    },
    spectralStats: {
      ndvi: { mean: ndvi, median: ndvi + 0.01, min: Math.max(0.1, ndvi - 0.25), max: Math.min(0.95, ndvi + 0.15), stdDev: 0.07, count: 460 },
      ndwi: { mean: ndwi, median: ndwi, min: Math.max(-0.5, ndwi - 0.2), max: Math.min(0.8, ndwi + 0.15), stdDev: 0.05, count: 460 },
      ndmi: { mean: ndmi, median: ndmi + 0.01, min: Math.max(-0.4, ndmi - 0.15), max: Math.min(0.8, ndmi + 0.15), stdDev: 0.06, count: 460 },
    },
    spatialRiskGrid: {
      totalCells: 100,
      stressedCells: ndwi < 0.15 ? 32 : 12,
      watchCells: 24,
      healthyCells: ndwi < 0.15 ? 44 : 64,
      stressPercentage: ndwi < 0.15 ? 32 : 12,
    },
    visualizations: {
      bounds: [
        [parcel.polygon[0][0] - 0.005, parcel.polygon[0][1] - 0.005],
        [parcel.polygon[0][0] + 0.005, parcel.polygon[0][1] + 0.005],
      ],
    },
    historicalObservations: (parcel.historicalData || []).map((h) => ({
      date: h.date,
      sceneId: `S2B_MSIL2A_DEMO_${h.date.replace(/\s+/g, '_')}`,
      cloudCover: h.cloudCover ?? 2.0,
      validPixelRatio: 0.95,
      ndvi: h.ndvi,
      ndwi: h.ndwi,
      ndmi: (h.ndwi * 0.8),
      soilMoistureProxy: h.soilMoisture ?? 40,
    })),
    aiAssessment: {
      overallStatus: 'Demo Referans Spektral Değerlendirmesi',
      summary: `${parcel.name} için 10m Sentinel-2 Level-2A BOA yüzey yansımaları ve fenolojik eğilimler incelenmiştir. Vejetasyon vigor indeksi ve kanopi nem göstergeleri mevsim normalleri dahilindedir.`,
      keyFindings: [
        `Ortalama NDVI ${ndvi.toFixed(2)} ile ${parcel.crop} örtüsü için beklenen aralıktadır.`,
        `Kanopi su indeksi NDWI ${ndwi.toFixed(2)} ve türetilmiş nem seviyesi %${moisture} olarak ölçülmüştür.`,
        `10m uzaysal çözünürlükte poligon içi piksel homojenliği %96 geçerlilik sağlamıştır.`,
      ],
      risks: [
        {
          title: 'Yaz Kuraklığı & Buharlaşma Riski',
          severity: ndwi < 0.15 ? 'high' : 'medium',
          explanation: 'Bölgesel sıcaklık artışı ve düşük bağıl nem nedeniyle kanopi su içeriğinde gerileme gözlemlenebilir.',
          evidence: `Ölçülen NDWI: ${ndwi.toFixed(2)}`,
        },
      ],
      positiveSignals: [
        'Klorofil emilim bantlarında (B04-B08) güçlü fotosentetik aktivite.',
        'SCL bulut maskeleme filtresi poligon içinde minimum gölge ve bulut doğrulamıştır.',
      ],
      possibleDrivers: [
        'Damla sulama rejimi ve fenolojik yapraklanma evresi.',
        'Akdeniz iklim kuşağındaki evapotranspirasyon dengesi.',
      ],
      recommendedActions: [
        'Gece sulama pencerelerinin optimize edilmesi.',
        'Kanopi nem kayıplarının izlenmesi amacıyla sonraki Sentinel-2 geçişinin (5 gün) takip edilmesi.',
      ],
      verificationNeeded: [
        'TDR probu ile 0-30 cm derinlikte toprak hacimsel nem kontrolü.',
      ],
      mrvStatus: {
        measurement: ['Sentinel-2 L2A BOA B02, B03, B04, B08, B11 bantları'],
        reporting: ['CSRD / ESRS E4 ve GHG Protocol Tarımsal Rehber'],
        verification: ['Uydu spektral teyidi & saha protokolü'],
      },
      confidenceLevel: 'Medium',
      confidenceJustification: 'Demo veri seti Sentinel-2 seviye-2A referans spektral değerlerine dayalıdır.',
      limitations: ['Canlı uydu analizi için "Analizi Başlat" butonunu kullanınız.'],
      generatedAt: parcel.lastObservation || '08 Eylül 2026',
      modelUsed: 'TerraSat Spektral Değerlendirme Motoru',
    },
    isDemoMode: true,
    dataSourceLabel: 'TerraSat Referans Uydu Arşivi (Demo)',
    timestamp: new Date().toISOString(),
  };
}
