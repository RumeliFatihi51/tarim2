import React from 'react';
import { 
  FileText, 
  Layers, 
  MapPin, 
  Activity, 
  Droplets, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  ArrowLeft,
  Calendar,
  Satellite,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { FullAnalysisPayload } from '../../types';
import { TrendChart } from '../charts/TrendChart';

interface AnalysisResultViewProps {
  analysisData: FullAnalysisPayload;
  onOpenReport: () => void;
  onBackToMap: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  analysisData,
  onOpenReport,
  onBackToMap,
}) => {
  const { parcel, satelliteMetadata, calculatedIndices, aiAssessment, historicalObservations } = analysisData;

  const handleDownloadGeoJson = () => {
    window.location.href = `/api/export/geojson/${parcel.id}`;
  };

  const handleDownloadCsv = () => {
    window.location.href = `/api/export/csv/${parcel.id}`;
  };

  const handleDownloadPdf = () => {
    window.location.href = `/api/reports/${parcel.id}/pdf`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <button
          onClick={onBackToMap}
          className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Haritaya Geri Dön</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenReport}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>19 Bölümlük MRV Raporu</span>
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>PDF İndir</span>
          </button>
          <button
            onClick={handleDownloadGeoJson}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>GeoJSON</span>
          </button>
          <button
            onClick={handleDownloadCsv}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Header card with parcel & satellite meta */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {parcel.number}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {parcel.name}
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{parcel.location} • <strong>{parcel.crop}</strong> • {parcel.areaHa} ha</span>
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap text-xs font-mono bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Satellite className="w-4 h-4 text-emerald-400" />
              <span>{String(satelliteMetadata?.sensor || 'Sentinel-2 MSI')}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{String(satelliteMetadata?.acquisitionDate || '08 Eyl 2026')}</span>
            </div>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400">10m BOA Çözünürlük</span>
          </div>
        </div>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* NDVI */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>NDVI (Vejetasyon)</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {calculatedIndices.ndvi.toFixed(2)}
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">
            Sağlık: {calculatedIndices.plantHealth}
          </span>
        </div>

        {/* NDWI */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>NDWI (Kanopi Su İndeksi)</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {calculatedIndices.ndwi.toFixed(2)}
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block">
            Stres: {calculatedIndices.waterStress}
          </span>
        </div>

        {/* NDMI / Nem */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>NDMI (Türetilmiş Nem)</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            %{calculatedIndices.soilMoisture}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            NDMI Katsayısı: {calculatedIndices.ndmi.toFixed(2)}
          </span>
        </div>

        {/* Sürdürülebilirlik Skoru */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>MRV Sürdürülebilirlik</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">
            {parcel.sustainabilityScore || 79}
            <span className="text-xs text-slate-400">/100</span>
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">
            CSRD / Scope 3 Uyumlu
          </span>
        </div>
      </div>

      {/* AI Assessment & Findings */}
      {aiAssessment && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white tracking-tight">
              Yapay Zekâ Spektral Değerlendirmesi
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
              {aiAssessment.modelUsed || 'Gemini 3.8'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {aiAssessment.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Key Findings */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <h4 className="font-bold text-slate-200 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Temel Bulgular</span>
              </h4>
              <ul className="space-y-2 text-slate-300">
                {(aiAssessment.keyFindings || []).map((f: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks & Recommendations */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <h4 className="font-bold text-slate-200 mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Önerilen Önlemler & Riskler</span>
              </h4>
              <ul className="space-y-2 text-slate-300">
                {(aiAssessment.recommendedActions || []).map((action: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Historical Trend Chart */}
      {historicalObservations && historicalObservations.length > 0 && (
        <TrendChart data={historicalObservations} cropName={parcel.crop} />
      )}
    </div>
  );
};
