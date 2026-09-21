import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import type { AIChatMessage, AIUIAction, Parcel } from '../types';
import { aiToolRouter } from './toolRouter';
import { INITIAL_PARCELS } from '../../src/data/parcels';

export class AssistantService {
  private getClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  async processUserMessage(
    userPrompt: string,
    history: AIChatMessage[] = [],
    context: { activeParcelId?: string; companyId?: string } = {},
  ): Promise<AIChatMessage> {
    const companyId = context.companyId || 'local-dev';
    const parcelId = context.activeParcelId;

    // Locate parcel either from persistent analysis store or default parcels list
    let storedAnalysis = parcelId ? aiToolRouter.getLatestAnalysis(companyId, parcelId).data : null;
    const storedHistory = parcelId ? aiToolRouter.getAnalysisHistory(companyId, parcelId).data || [] : [];
    let parcel: Parcel | undefined = storedAnalysis?.parcel;
    if (!parcel && parcelId) {
      parcel = INITIAL_PARCELS.find((p) => p.id === parcelId);
    }

    const client = this.getClient();
    let parcelContextText = '';
    const evidenceList: string[] = [];
    const archiveContextText = storedHistory.length
      ? `\nKAYITLI ANALİZ VE MRV RAPOR GEÇMİŞİ (${storedHistory.length} kayıt):\n${storedHistory.slice(0, 8).map((analysis, index) => {
          const reportId = analysis.mrvReport?.reportId || 'MRV raporu hazırlanmadı';
          const date = analysis.persistedAt || analysis.timestamp || analysis.parcel.lastObservation || 'Tarih yok';
          return `${index + 1}. ${date} — Rapor: ${reportId}; NDVI: ${analysis.calculatedIndices.ndvi}; NDWI: ${analysis.calculatedIndices.ndwi}; NDMI: ${analysis.calculatedIndices.ndmi}`;
        }).join('\n')}`
      : '';

    if (parcel) {
      const ndviVal = !isNaN(parcel.ndvi) ? parcel.ndvi.toFixed(2) : 'Beklemede';
      const ndwiVal = !isNaN(parcel.ndwi) ? parcel.ndwi.toFixed(2) : 'Beklemede';
      const moistureVal = !isNaN(parcel.soilMoisture) ? `%${parcel.soilMoisture}` : 'Beklemede';

      parcelContextText = `
SEÇİLİ PARSEL BİLGİSİ:
- Parsel Adı: ${parcel.name} (#${parcel.number || parcel.id})
- Konum: ${parcel.location}
- Ürün / Desen: ${parcel.crop}
- Alan: ${parcel.areaHa} Hektar
- Mevcut Durum: ${parcel.status.toUpperCase()} (${parcel.plantHealth || 'Normal'} Bitki Sağlığı, ${parcel.waterStress || 'Normal'} Su Stresi)
- Sentinel-2 Ölçümleri: NDVI: ${ndviVal}, NDWI (Kanopi Su İndeksi): ${ndwiVal}, Tahmini Nem: ${moistureVal}
- Son Uydu Gözlemi: ${parcel.lastObservation || 'Yeni'}
${parcel.alerts?.length ? `- Aktif Uyarılar: ${parcel.alerts.map((a) => a.title + ' - ' + a.message).join(' | ')}` : ''}
`;
      if (!isNaN(parcel.ndvi)) evidenceList.push(`Sentinel-2 Ölçümü: NDVI ${ndviVal}, NDWI ${ndwiVal}`);
      if (parcel.crop) evidenceList.push(`Mahsul: ${parcel.crop}, Alan: ${parcel.areaHa} ha`);
      if (storedHistory.length) evidenceList.push(`Kalıcı arşivde bu parsele ait ${storedHistory.length} analiz/MRV raporu kaydı var.`);
    }

    const conversationHistory = history
      .slice(-6)
      .map((m) => `${m.role === 'user' ? 'Kullanıcı' : 'Danışman'}: ${m.content}`)
      .join('\n');

    if (client) {
      try {
        const promptText = `
Aşağıdaki kullanıcı sorusunu bir Kıdemli Ziraat Danışmanı ve Uzaktan Algılama / Tarımsal MRV Uzmanı olarak yanıtla.

${parcelContextText ? parcelContextText : 'NOT: Kullanıcı henüz belirli bir parsel seçmedi veya genel bir tarım sorusu soruyor. Genel tarım bilgisi, ziraat mühendisliği ve uydu indeksleri perspektifinden eksiksiz yanıt ver.'}
${archiveContextText}

KONUŞMA GEÇMİŞİ:
${conversationHistory || '(Yeni konuşma)'}

KULLANICI SORUSU:
${userPrompt}

YÖNERGELER:
1. Yanıtını anlaşılır, sıcak, çiftçiye ve ziraat mühendisine hitap eden profesyonel bir üslupla Türkçe yaz.
2. Eğer seçili parsel varsa (örneğin ${parcel?.name || ''}, ${parcel?.crop || ''}), tavsiyelerini doğrudan bu mahsulün fenolojisi, su ihtiyacı, bölgesi ve ölçülen NDVI/NDWI değerlerine uyarla.
3. Somut ve uygulanabilir tavsiyeler ver (sulama saatleri, gübreleme tipleri N-P-K, yaprak gübreleri, hastalık önleme, malçlama vb.).
4. Markdown biçimlendirmesi (kalın başlıklar, maddeler) kullanarak okunabilirliği yüksek tut.
`;

        let response: any;
        const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

        for (const modelName of modelsToTry) {
          let timer: NodeJS.Timeout | undefined;
          try {
            const genCall = client.models.generateContent({
              model: modelName,
              contents: promptText,
              config: {
                systemInstruction:
                  'Sen TerraSat Tarım AI Akıllı Ziraat ve Uzaktan Algılama Kıdemli Danışmanısın. Ziraat mühendisliği, agronomi, Sentinel-2 spektral indeksleri (NDVI, NDWI, NDMI), sulama yönetimi, bitki besleme ve hastalık zararlılarla mücadelede uzmansın.',
                temperature: 0.7,
              },
            });
            const timeoutPromise = new Promise<never>((_, reject) => {
              timer = setTimeout(() => reject(new Error(`Model ${modelName} timeout after 15s`)), 15000);
            });
            response = await Promise.race([genCall, timeoutPromise]);
            if (response?.text) break;
          } catch (modelErr: any) {
            console.warn(`[AI Assistant] Model ${modelName} call failed:`, modelErr?.message || modelErr);
          } finally {
            if (timer) clearTimeout(timer);
          }
        }

        if (!response?.text) {
          throw new Error('All configured Gemini models failed or timed out.');
        }

        const replyText = response.text;
        
        // Generate contextual action buttons
        const actions: AIUIAction[] = [];
        if (parcel) {
          actions.push({ type: 'TRIGGER_ANALYSIS', parcelId: parcel.id, label: `${parcel.name} Uydu Analizini Başlat` });
          actions.push({ type: 'OPEN_PARCEL', parcelId: parcel.id, label: 'Parsel Detayını İncele' });
        } else {
          actions.push({ type: 'SHOW_PARCELS', label: 'Parsel Listesini Aç' });
        }

        return {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toISOString(),
          structured: {
            answer: replyText,
            evidence: evidenceList,
            interpretation: parcel
              ? `Gemini AI & ${parcel.name} (${parcel.crop}) Sentinel-2 spektral verileri temelinde üretildi.`
              : 'Gemini AI tarımsal bilgi tabanı temelinde üretildi.',
            confidence: 'High',
            limitations: ['Saha doğrulaması (yerinde gözlem ve toprak tahlili) daima tavsiye edilir.'],
            recommendedAction: parcel ? `${parcel.crop} için fenolojik sulama ve besleme kontrolü` : 'Parsel seçerek canlı spektral analiz başlatın.',
          },
          actions,
          dataRef: parcel ? { parcelId: parcel.id } : undefined,
        };
      } catch (err: any) {
        console.warn('[AI Assistant] Gemini call failed, falling back to agronomic expert generator:', err?.message);
      }
    }

    // Fallback Domain Expert generator (ensures zero downtime if API key is missing or offline)
    return this.generateAgronomicFallback(userPrompt, parcel, evidenceList, history);
  }

  private generateAgronomicFallback(
    prompt: string,
    parcel: Parcel | undefined,
    evidenceList: string[],
    history: AIChatMessage[],
  ): AIChatMessage {
    const lower = prompt.toLowerCase();
    let answer = '';
    const actions: AIUIAction[] = [];

    if (parcel) {
      actions.push({ type: 'TRIGGER_ANALYSIS', parcelId: parcel.id, label: `${parcel.name} Uydu Analizi` });
      actions.push({ type: 'OPEN_PARCEL', parcelId: parcel.id, label: 'Parsel Bilgilerini Aç' });

      if (lower.includes('su') || lower.includes('sulama') || lower.includes('nem') || lower.includes('ndwi')) {
        answer = `**${parcel.name} (${parcel.crop}) İçin Sulama ve Su Stresi Değerlendirmesi:**\n\n` +
          `- **Ölçülen Kanopi İndeksi:** NDWI ${!isNaN(parcel.ndwi) ? parcel.ndwi.toFixed(2) : '0.21'} ve toprak nemi %${parcel.soilMoisture || 38}.\n` +
          `- **Su Stresi Durumu:** Mevcut seviye **${parcel.waterStress || 'Orta'}** olarak sınıflandırılmıştır.\n\n` +
          `**Zirai Tavsiyeler:**\n` +
          `1. **Sulama Zamanlaması:** Yüksek buharlaşmayı (ET0) önlemek amacıyla sulamayı gece 22:00 ile sabah 07:00 saatleri arasında gerçekleştirin.\n` +
          `2. **Damlama Debisi:** Hat sonlarındaki basınç kayıplarını ve filtre tıkanıklıklarını kontrol edin.\n` +
          `3. **Toprak Koruması:** Sıcak dönemde yüzey buharlaşmasını %30'a varan oranda azaltmak için taç izdüşümünde malç veya hafif çapalama önerilir.`;
      } else if (lower.includes('gübre') || lower.includes('besleme') || lower.includes('azot') || lower.includes('potas')) {
        answer = `**${parcel.name} (${parcel.crop}) İçin Bitki Besleme ve Gübreleme Rehberi:**\n\n` +
          `- **Vejetasyon Canlılığı (NDVI):** ${!isNaN(parcel.ndvi) ? parcel.ndvi.toFixed(2) : '0.68'} seviyesinde ölçülmüştür.\n` +
          `- **Gelişim Evresi:** Kanopi örtüsü aktif fotosentez yapmaktadır.\n\n` +
          `**Önerilen Besleme Programı:**\n` +
          `1. **Meyve/Dane Doldurma:** Potasyum ağırlıklı damlama gübrelemesi (Potasyum Nitrat veya Potasyum Sülfat) doku sertliğini ve kuru madde oranını artırır.\n` +
          `2. **Mikro Element Takviyesi:** Magnezyum, Çinko ve Demir noksanlığına karşı yapraktan aminoasit şelatlı gübreleme tavsiye edilir.\n` +
          `3. **Aşırı Azottan Kaçınma:** Son dönemde aşırı azot vejetatif sürgünleri artırıp mantari hastalıklara yatkınlık yaratabilir; dengeli N-P-K oranı korunmalıdır.`;
      } else if (lower.includes('hastalık') || lower.includes('zararlı') || lower.includes('leke') || lower.includes('böcek')) {
        answer = `**${parcel.name} (${parcel.crop}) İçin Zirai Mücadele ve Koruma:**\n\n` +
          `- **Mevcut Sağlık Seviyesi:** ${parcel.plantHealth || 'İyi'} durumda.\n\n` +
          `**Kritik Riskler ve Önlemler:**\n` +
          `1. **Rutubet ve Sıcaklık:** Gece-gündüz sıcaklık farkının yüksek olduğu ve nemin %65'i aştığı dönemlerde mantari fungal spor gelişimi (külleme, mildiyö) hızlanır.\n` +
          `2. **Zararlı Takibi:** Parselin sınır hatlarında sarı yapışkan tuzaklar veya feromon tuzakları kurarak ergin popülasyonunu izleyin.\n` +
          `3. **Biyolojik & Entegre Mücadele:** Faydalı böceklere zarar vermeyen ruhsatlı biyolojik preparatları tercih edin.`;
      } else {
        answer = `**${parcel.name} (${parcel.crop}, ${parcel.areaHa} ha) Genel Durum Özeti:**\n\n` +
          `- **NDVI (Vejetasyon İndeksi):** ${!isNaN(parcel.ndvi) ? parcel.ndvi.toFixed(2) : '0.68'} — Bitki klorofil aktivitesi sağlıklı seyrinde.\n` +
          `- **NDWI (Nem İndeksi):** ${!isNaN(parcel.ndwi) ? parcel.ndwi.toFixed(2) : '0.21'} — Kanopi su durumu izleme altında.\n` +
          `- **Sürdürülebilirlik Skoru:** 100 üzerinden ${parcel.sustainabilityScore || 79}.\n\n` +
          `Sorunuz veya ihtiyacınız olan özel bir tarımsal konu (sulama takvimi, gübreleme dozu, hastalık teşhisi veya Sentinel-2 analizi) varsa detaylandırabilirsiniz.`;
      }
    } else {
      actions.push({ type: 'SHOW_PARCELS', label: 'Parselleri Listele' });
      answer = `Merhaba! Ben **TerraSat Tarım AI** Ziraat Danışmanınızım.\n\n` +
        `Sentinel-2 L2A uydu verileri, vejetasyon indeksleri (NDVI, NDWI, NDMI), sulama takvimleri, bitki besleme ve hastalık-zararlı yönetimi konularında size yardımcı olabilirim.\n\n` +
        `Özel bir parseliniz için değerlendirme almak isterseniz yukarıdaki menüden bir parsel seçebilir veya sorunuzu doğrudan iletebilirsiniz (Örn: *"Zeytinde su stresi belirtileri nelerdir?"*, *"NDVI değeri 0.70 ne anlama gelir?"*).`;
    }

    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: answer,
      timestamp: new Date().toISOString(),
      structured: {
        answer,
        evidence: evidenceList,
        interpretation: 'Tarımsal kural motoru ve agronomi uzmanlığı doğrultusunda hazırlandı.',
        confidence: 'High',
        limitations: ['Saha doğrulaması ve yerel toprak analizleri esastır.'],
        recommendedAction: parcel ? `${parcel.name} üzerinde saha kontrolü gerçekleştirin.` : 'Bir parsel seçin.',
      },
      actions,
      dataRef: parcel ? { parcelId: parcel.id } : undefined,
    };
  }
}

export const defaultAssistantService = new AssistantService();

