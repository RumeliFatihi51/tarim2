import React from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { Parcel } from '../../types';

interface ReportsArchiveViewProps {
  parcels: Parcel[];
  onOpenReport: (parcel: Parcel) => void;
}

export const ReportsArchiveView: React.FC<ReportsArchiveViewProps> = ({
  parcels,
  onOpenReport,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileText className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Kurumsal MRV Rapor Arşivi
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Copernicus Sentinel-2 spektral ölçümleri, CSRD / ESRS E4 ve ISO 14064-2 standardında denetim raporları
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-bold">
              {parcels.length} Denetim Raporu Hazır
            </span>
          </div>
        </div>
      </div>

      {/* Reports Table/Grid */}
      <div className="space-y-3">
        {parcels.map((parcel) => (
          <div
            key={parcel.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Parcel details */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-mono text-xs font-bold shrink-0">
                {parcel.number}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{parcel.name}</span>
                  <span className="text-[10px] font-normal text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    Doğrulandı
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {parcel.crop} • {parcel.areaHa} ha • {parcel.location}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 font-mono">
                  <span className="text-emerald-400 font-semibold">NDVI: {parcel.ndvi}</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-semibold">NDWI: {parcel.ndwi}</span>
                  <span>•</span>
                  <span>Skor: <strong>{parcel.sustainabilityScore}/100</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{parcel.lastObservation || '08 Eyl 2026'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={() => onOpenReport(parcel)}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-emerald-500/15"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>MRV Raporunu Aç</span>
              </button>
              <a
                href={`/api/reports/${parcel.id}/pdf`}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>PDF</span>
              </a>
              <a
                href={`/api/export/geojson/${parcel.id}`}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>GeoJSON</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
