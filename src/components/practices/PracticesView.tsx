import React from 'react';
import { 
  CheckSquare, 
  AlertTriangle, 
  MapPin, 
  Layers, 
  Droplets, 
  FileText,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Parcel } from '../../types';

interface PracticesViewProps {
  parcels: Parcel[];
  selectedParcel: Parcel | null;
  onSelectParcel: (parcel: Parcel) => void;
  onOpenReport: (parcel: Parcel) => void;
}

export const PracticesView: React.FC<PracticesViewProps> = ({
  parcels,
  selectedParcel,
  onSelectParcel,
  onOpenReport,
}) => {
  const current = selectedParcel || parcels[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Tarımsal Uygulama Sinyalleri & Saha Doğrulama
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Copernicus Sentinel-2 spektral sinyalleri ile sulama, örtü bitkisi ve saha protokol denetimi
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={current.id}
              onChange={(e) => {
                const found = parcels.find((p) => p.id === e.target.value);
                if (found) onSelectParcel(found);
              }}
              className="bg-slate-800 text-slate-200 text-xs py-2 px-3 rounded-xl border border-slate-700 cursor-pointer"
            >
              {parcels.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.crop.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Detected Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Signal 1: Sulama Rejimi */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Sulama Sinyali</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="font-bold text-white text-sm">Damla Sulama & Kanopi Hidrasyonu</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            NDMI (0.18) ve B11 SWIR bandı yansıması kanopi su kaybını dengeleyecek düzeyde sulama yapıldığını göstermektedir.
          </p>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Güven Seviyesi:</span>
            <span className="text-emerald-400 font-semibold font-mono">Yüksek (%88)</span>
          </div>
        </div>

        {/* Signal 2: Anız & Hasat */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Anız & Yanma</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="font-bold text-white text-sm">Anız Yakma İzi Tespit Edilmedi</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            NBR (Normalize Yanma Oranı) değerlerinde ani negatif sıçrama bulunmamaktadır. Anız yakılmadığı doğrulanmıştır.
          </p>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Uyumluluk:</span>
            <span className="text-emerald-400 font-semibold font-mono">Standart (%100)</span>
          </div>
        </div>

        {/* Signal 3: Toprak Örtüsü */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Toprak Yönetimi</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="font-bold text-white text-sm">Sürekli Vejetasyon Örtüsü</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Parselde toprak erozyonunu önleyici çok yıllık ağaç yapısı ve ara bitki örtüsü stabilitesi korunmaktadır.
          </p>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">CSRD Kriteri:</span>
            <span className="text-emerald-400 font-semibold font-mono">Uyumlu</span>
          </div>
        </div>
      </div>

      {/* Field Verification Protocol Checklist */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>Saha Doğrulama Protokolü ({current.name})</span>
          </h3>
          <button
            onClick={() => onOpenReport(current)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Protokol Raporu</span>
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-slate-200 block">Saha Sınırları GPS Teyidi</span>
                <span className="text-slate-400 text-[11px]">Parsel köşe koordinatları mobil RTK GPS ile teyit edildi.</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              TAMAMLANDI
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-slate-200 block">Damla Sulama Sistemi Muayenesi</span>
                <span className="text-slate-400 text-[11px]">Boru hatları ve debimetre kayıtları incelendi.</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              TAMAMLANDI
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-slate-200 block">0-30 cm Toprak TDR Nem Ölçümü</span>
                <span className="text-slate-400 text-[11px]">Sonraki Sentinel-2 geçişiyle eş zamanlı saha sensör ölçümü planlandı.</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
              PLANLANDI (15 EYL)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
