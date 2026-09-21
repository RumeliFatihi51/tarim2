import React from 'react';
import { Calendar, Download, FileText, ShieldCheck } from 'lucide-react';
import { FullAnalysisPayload } from '../../types';

interface ReportsArchiveViewProps {
  analyses: FullAnalysisPayload[];
  onOpenReport: (analysis: FullAnalysisPayload) => void;
}

export const ReportsArchiveView: React.FC<ReportsArchiveViewProps> = ({ analyses, onOpenReport }) => (
  <div className="max-w-6xl mx-auto space-y-6 pb-12">
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400"><FileText className="w-5 h-5" /></div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Kurumsal MRV Rapor Arşivi</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Tamamlanan her analiz ayrı bir kayıt ve MRV raporu olarak saklanır.</p>
        </div>
        <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-bold">{analyses.length} Kayıtlı Analiz</span>
      </div>
    </div>

    {analyses.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center text-sm text-slate-400">Henüz kaydedilmiş analiz yok. Bir Sentinel-2 analizi tamamlandığında raporu burada kalıcı olarak görünür.</div>
    ) : (
      <div className="space-y-3">
        {analyses.map((analysis) => {
          const { parcel } = analysis;
          const recordedAt = analysis.persistedAt || analysis.timestamp || parcel.lastObservation || 'Tarih yok';
          const reportId = analysis.mrvReport?.reportId || 'MRV raporu';
          return (
            <div key={analysis.analysisId || `${parcel.id}-${recordedAt}`} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-mono text-xs font-bold shrink-0">{parcel.number}</div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2"><span>{parcel.name}</span><span className="text-[10px] font-normal text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Arşivlendi</span></h3>
                  <p className="text-xs text-slate-400 mt-0.5">{parcel.crop} • {parcel.areaHa} ha • {parcel.location}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-slate-400 font-mono"><span className="text-emerald-400 font-semibold">NDVI: {analysis.calculatedIndices.ndvi}</span><span>•</span><span className="text-cyan-400 font-semibold">NDWI: {analysis.calculatedIndices.ndwi}</span><span>•</span><span>{reportId}</span><span>•</span><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(recordedAt).toLocaleString('tr-TR')}</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <button onClick={() => onOpenReport(analysis)} className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"><FileText className="w-3.5 h-3.5" />MRV Raporunu Aç</button>
                {analysis.analysisId && <a href={`/api/reports/analysis/${analysis.analysisId}/pdf`} className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition" target="_blank" rel="noreferrer"><Download className="w-3.5 h-3.5 text-emerald-400" />PDF</a>}
                <span className="text-[10px] text-slate-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />Kayıtlı</span>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);
