import React from 'react';
import { 
  Layers, 
  Play, 
  MapPin, 
  Sparkles, 
  Edit3, 
  Droplets, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { Parcel } from '../../types';
import { INITIAL_PARCELS } from '../../data/parcels';

interface SelectedParcelCardProps {
  parcel: Parcel | null;
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
  isDrawing: boolean;
  onToggleDrawing: () => void;
  isDemoMode: boolean;
  onSelectQuickPreset: (id: string) => void;
}

export const SelectedParcelCard: React.FC<SelectedParcelCardProps> = ({
  parcel,
  onStartAnalysis,
  isAnalyzing,
  isDrawing,
  onToggleDrawing,
  isDemoMode,
  onSelectQuickPreset,
}) => {
  if (!parcel) return null;

  const isHealthy = parcel.status === 'healthy';
  const isHighRisk = parcel.status === 'high-risk';

  return (
    <div className="bg-[#0b1329]/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-2xl text-slate-100 flex flex-col gap-3">
      {/* Top row: Name, Location, Status */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {parcel.number}
            </span>
            <h3 className="font-bold text-base text-white tracking-tight">{parcel.name}</h3>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{parcel.location}</span>
          </p>
        </div>

        {/* Status badge */}
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border shrink-0 ${
            isHealthy
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : isHighRisk
              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          }`}
        >
          {isHealthy ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
          <span className="capitalize">{parcel.status}</span>
        </span>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-2 py-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center text-xs">
        <div>
          <span className="text-[10px] uppercase text-slate-400 block font-medium">Alan</span>
          <span className="font-bold font-mono text-white text-sm">{parcel.areaHa} ha</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-400 block font-medium">NDVI</span>
          <span className="font-bold font-mono text-emerald-400 text-sm">{Number.isNaN(parcel.ndvi) ? '-' : parcel.ndvi}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-400 block font-medium">NDWI</span>
          <span className="font-bold font-mono text-cyan-400 text-sm">{Number.isNaN(parcel.ndwi) ? '-' : parcel.ndwi}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-400 block font-medium">Skor</span>
          <span className="font-bold font-mono text-amber-400 text-sm">
            {Number.isNaN(parcel.sustainabilityScore) ? '-' : `${parcel.sustainabilityScore}/100`}
          </span>
        </div>
      </div>

      {/* Preset Selector Dropdown */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2.5">
        <label htmlFor="parcel-preset-select" className="text-[11px] font-medium text-slate-400">Örnek Parsel Seç:</label>
        <div className="relative">
          <select
            id="parcel-preset-select"
            value={parcel.id}
            onChange={(e) => onSelectQuickPreset(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs py-1 px-2.5 pr-6 rounded-lg border border-slate-700 appearance-none focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {INITIAL_PARCELS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.crop.split(' ')[0]})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onStartAnalysis}
          disabled={isAnalyzing}
          className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <Activity className="w-4 h-4 animate-spin text-slate-950" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          <span>{isAnalyzing ? 'İşleniyor...' : 'Sentinel-2 Analizini Başlat'}</span>
        </button>

        <button
          onClick={onToggleDrawing}
          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
            isDrawing
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
          title="Harita üzerinde özel poligon çiz"
        >
          <Edit3 className="w-4 h-4" />
          <span className="hidden sm:inline">{isDrawing ? 'Çizim Aktif' : 'Alan Çiz'}</span>
        </button>
      </div>
    </div>
  );
};
