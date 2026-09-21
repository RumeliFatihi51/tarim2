import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ParcelMap } from './components/map/ParcelMap';
import { SelectedParcelCard } from './components/map/SelectedParcelCard';
import { LiveAnalysisPipeline } from './components/pipeline/LiveAnalysisPipeline';
import { AnalysisResultView } from './components/pipeline/AnalysisResultView';
import { ReportsArchiveView } from './components/reports/ReportsArchiveView';
import { MethodologyView } from './components/methodology/MethodologyView';
import { AICopilotView } from './components/ai/AICopilotView';
import { PracticesView } from './components/practices/PracticesView';
import { MRVReportModal } from './components/reports/MRVReportModal';
import { INITIAL_PARCELS } from './data/parcels';
import { Parcel, ActiveTab, FullAnalysisPayload } from './types';
import { Activity, Play, Sparkles, Sprout, Layers, ArrowRight } from 'lucide-react';
import { getDemoAnalysisPayload } from './demo/sampleData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('monitor');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(INITIAL_PARCELS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pipelineFinished, setPipelineFinished] = useState(false);
  const [analysisPayload, setAnalysisPayload] = useState<FullAnalysisPayload | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<FullAnalysisPayload[]>([]);

  // Custom polygon drawing on map
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  // Demo mode toggle
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Mobile sidebar drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // MRV modal
  const [mrvModalOpen, setMrvModalOpen] = useState(false);

  const refreshSavedAnalyses = useCallback(async () => {
    try {
      const response = await fetch('/api/analyses');
      if (response.ok) setSavedAnalyses(await response.json());
    } catch {
      // The active analysis remains usable while an offline archive is unavailable.
    }
  }, []);

  useEffect(() => {
    void refreshSavedAnalyses();
  }, [refreshSavedAnalyses]);

  const availableParcels = useMemo(() => {
    const latestById = new Map(INITIAL_PARCELS.map((parcel) => [parcel.id, parcel]));
    [...savedAnalyses].reverse().forEach((analysis) => latestById.set(analysis.parcel.id, analysis.parcel));
    if (selectedParcel) latestById.set(selectedParcel.id, selectedParcel);
    return [...latestById.values()];
  }, [savedAnalyses, selectedParcel]);

  // Start analysis pipeline
  const handleStartAnalysis = useCallback(() => {
    const parcelToAnalyze = selectedParcel || INITIAL_PARCELS[0];
    setSelectedParcel(parcelToAnalyze);
    setIsAnalyzing(true);
    setPipelineFinished(false);
    setAnalysisError(null);
    setActiveTab('analysis');
  }, [selectedParcel]);

  const handlePipelineCompleted = useCallback((payload?: FullAnalysisPayload) => {
    if (payload) {
      setAnalysisPayload(payload);
      setSelectedParcel(payload.parcel);
      void refreshSavedAnalyses();
    } else if (isDemoMode) {
      setAnalysisPayload(getDemoAnalysisPayload(selectedParcel?.id));
    }
    setIsAnalyzing(false);
    setPipelineFinished(true);
  }, [isDemoMode, refreshSavedAnalyses, selectedParcel?.id]);

  const handlePipelineFailure = useCallback((message: string) => {
    setIsAnalyzing(false);
    setPipelineFinished(false);
    setAnalysisError(message);
  }, []);

  const handleOpenReportModal = () => {
    setMrvModalOpen(true);
  };

  // Quick Preset Selection
  const handleSelectQuickPreset = (presetId: string) => {
    const found = INITIAL_PARCELS.find((p) => p.id === presetId);
    if (found) {
      setSelectedParcel(found);
      setIsDrawingMode(false);
    }
  };

  // Custom polygon drawing finish
  const handleFinishCustomDrawing = (coords: [number, number][]) => {
    setIsDrawingMode(false);

    let areaHa = 4.0;
    if (coords.length >= 3) {
      let area = 0;
      const n = coords.length;
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        const xi = coords[i][1] * 111320 * Math.cos((coords[i][0] * Math.PI) / 180);
        const yi = coords[i][0] * 110540;
        const xj = coords[j][1] * 111320 * Math.cos((coords[j][0] * Math.PI) / 180);
        const yj = coords[j][0] * 110540;
        area += xi * yj - xj * yi;
      }
      areaHa = Math.max(0.2, parseFloat((Math.abs(area) / 2 / 10000).toFixed(2)));
    }

    const customParcel: Parcel = {
      id: `poly-${Date.now().toString().slice(-4)}`,
      number: `#USR-${coords.length}K`,
      name: 'Özel Çizilen Parsel Alanı',
      location: 'Menemen / Gediz Havzası',
      crop: 'Karma Tarım (Özel Sınır)',
      areaHa,
      status: 'moderate',
      sustainabilityScore: Number.NaN,
      scoreBreakdown: { vegetation: Number.NaN, water: Number.NaN, soil: Number.NaN, carbon: Number.NaN, management: Number.NaN },
      ndvi: Number.NaN,
      ndwi: Number.NaN,
      soilMoisture: Number.NaN,
      waterStress: 'Medium',
      plantHealth: 'Good',
      carbonIndicator: 'Stable',
      lastObservation: 'Analiz Bekleniyor',
      polygon: coords,
      historicalData: [],
    };
    setSelectedParcel(customParcel);
  };

  const handleSearchLocation = (query: string) => {
    const q = query.toLowerCase();
    const match = INITIAL_PARCELS.find(
      (p) => p.name.toLowerCase().includes(q) || p.crop.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
    );
    if (match) {
      setSelectedParcel(match);
    }
  };

  return (
    <div id="terrasat-app-root" className="flex h-screen w-full bg-[#080c14] text-slate-100 overflow-hidden font-sans">
      {/* Clean Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isDemoMode={isDemoMode}
      />

      {/* Main App Layout Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Modern Top Header */}
        <Header
          activeTab={activeTab}
          selectedParcel={selectedParcel}
          onSearchLocation={handleSearchLocation}
          onSelectQuickDemo={() => handleSelectQuickPreset('emiralem-01')}
          onStartAnalysis={handleStartAnalysis}
          isAnalyzing={isAnalyzing}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          isDemoMode={isDemoMode}
          onToggleDemoMode={(val) => setIsDemoMode(val)}
        />

        {/* Tab Content Viewport */}
        <main className="flex-1 h-full overflow-hidden relative flex flex-col bg-[#070b16]">
          {/* TAB 1: MONITOR (GIS Map with Floating Parcel Inspector) */}
          {activeTab === 'monitor' && (
            <div className="relative w-full h-full flex flex-col">
              {/* Interactive Leaflet Satellite GIS Canvas */}
              <div className="flex-1 h-full relative">
                <ParcelMap
                  parcels={availableParcels}
                  selectedParcel={selectedParcel}
                  onSelectParcel={(p) => setSelectedParcel(p)}
                  isDrawingMode={isDrawingMode}
                  onFinishDrawing={handleFinishCustomDrawing}
                  onCancelDrawing={() => setIsDrawingMode(false)}
                  analysisPayload={analysisPayload}
                />
              </div>

              {/* Bottom Floating Selected Parcel Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-20 pointer-events-auto">
                <SelectedParcelCard
                  parcel={selectedParcel}
                  parcels={availableParcels}
                  onStartAnalysis={handleStartAnalysis}
                  isAnalyzing={isAnalyzing}
                  isDrawing={isDrawingMode}
                  onToggleDrawing={() => setIsDrawingMode(!isDrawingMode)}
                  isDemoMode={isDemoMode}
                  onSelectParcel={(parcel) => setSelectedParcel(parcel)}
                />
              </div>
            </div>
          )}

          {/* TAB 2: ANALYSIS (Live 14-Stage Sentinel-2 Pipeline OR Results) */}
          {activeTab === 'analysis' && (
            <div className="w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070b16]">
              {isAnalyzing ? (
                <LiveAnalysisPipeline
                  parcel={selectedParcel || INITIAL_PARCELS[0]}
                  onComplete={handlePipelineCompleted}
                  onFailure={handlePipelineFailure}
                  isDemoMode={isDemoMode}
                />
              ) : analysisPayload ? (
                <AnalysisResultView
                  analysisData={analysisPayload}
                  onOpenReport={handleOpenReportModal}
                  onBackToMap={() => setActiveTab('monitor')}
                />
              ) : (
                /* Clean Empty State prompting user to launch analysis */
                <div className="max-w-3xl mx-auto my-8 p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl backdrop-blur-md text-center">
                  {analysisError && (
                    <div role="alert" className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-left text-sm text-rose-200">
                      Canlı analiz başlatılamadı: {analysisError}. Örnek veri gösterilmedi; bağlantı ve parsel sınırını kontrol edip yeniden deneyin.
                    </div>
                  )}
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-5 shadow-lg shadow-emerald-500/15">
                    <Activity className="w-8 h-8 animate-pulse" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Copernicus Sentinel-2 Spektral Analiz Konsolu
                  </h2>
                  <p className="text-sm text-slate-400 max-w-lg mx-auto mt-2 mb-8 leading-relaxed">
                    <strong className="text-emerald-400 font-semibold">{selectedParcel ? selectedParcel.name : 'Emiralem Zeytinliği'}</strong> parseli için 10m L2A yüzey yansımaları, 14 aşamalı spektral boru hattı, su stresi (NDWI/NDMI) ve yapay zekâ değerlendirmesini başlatın.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleStartAnalysis}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>14 Aşamalı Spektral Analizi Başlat</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('monitor')}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-700/60 transition flex items-center justify-center gap-2"
                    >
                      <Layers className="w-4 h-4 text-slate-400" />
                      <span>Haritaya Geri Dön</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AI COPILOT & AGRONOMIC ASSISTANT (Gemini 3.8 Flash) */}
          {activeTab === 'assistant' && (
            <div className="w-full h-full overflow-hidden bg-[#070b16]">
              <AICopilotView
                parcels={availableParcels}
                selectedParcel={selectedParcel}
                onSelectParcel={(p) => setSelectedParcel(p)}
                onOpenReport={(p) => {
                  setSelectedParcel(p);
                  handleOpenReportModal();
                }}
                onStartAnalysis={handleStartAnalysis}
              />
            </div>
          )}

          {/* TAB 4: PRACTICES & FIELD VERIFICATION */}
          {activeTab === 'practices' && (
            <div className="w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070b16]">
              <PracticesView
                parcels={availableParcels}
                selectedParcel={selectedParcel}
                onSelectParcel={(p) => setSelectedParcel(p)}
                onOpenReport={(p) => {
                  setSelectedParcel(p);
                  handleOpenReportModal();
                }}
              />
            </div>
          )}

          {/* TAB 5: REPORTS (Corporate MRV Archive) */}
          {activeTab === 'reports' && (
            <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#070b16]">
              <ReportsArchiveView
                analyses={savedAnalyses}
                onOpenReport={(analysis) => {
                  setSelectedParcel(analysis.parcel);
                  setAnalysisPayload(analysis);
                  handleOpenReportModal();
                }}
              />
            </div>
          )}

          {/* TAB 6: METHODOLOGY & SCIENTIFIC FORMULAS */}
          {activeTab === 'methodology' && (
            <div className="w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070b16]">
              <MethodologyView />
            </div>
          )}
        </main>
      </div>

      {/* 19-Section Corporate MRV Report Modal */}
      {mrvModalOpen && (
        <MRVReportModal
          parcel={selectedParcel || INITIAL_PARCELS[0]}
          analysis={analysisPayload ? analysisPayload.aiAssessment : null}
          fullPayload={analysisPayload}
          onClose={() => setMrvModalOpen(false)}
        />
      )}
    </div>
  );
}
