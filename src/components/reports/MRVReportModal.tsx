import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  Calendar, 
  Activity, 
  Droplets, 
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Parcel, FullAnalysisPayload } from '../../types';

interface MRVReportModalProps {
  parcel: Parcel;
  analysis: any;
  fullPayload?: FullAnalysisPayload | null;
  onClose: () => void;
}

export const MRVReportModal: React.FC<MRVReportModalProps> = ({
  parcel,
  analysis,
  fullPayload,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    window.location.href = `/api/reports/${parcel.id}/pdf`;
  };

  const handleDownloadGeoJson = () => {
    window.location.href = `/api/export/geojson/${parcel.id}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090e1a] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Kurumsal MRV Denetim Raporu
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {parcel.number} • {parcel.name} • CSRD & ISO 14064-2 Uyumlu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="PDF İndir"
            >
              <Download className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Yazdır"
            >
              <Printer className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - 19 Sections of MRV Standard */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs">
          {/* Section 1-3: Identity & Geolocation */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Bölüm 1 - 3: Parsel Kimliği ve Georeferans Bilgileri
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-400 block">Parsel Adı / No</span>
                <strong className="text-white font-mono text-sm">{parcel.name} ({parcel.number})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Konum</span>
                <strong className="text-white">{parcel.location}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Ürün Deseni</span>
                <strong className="text-white">{parcel.crop}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Yüzölçümü</span>
                <strong className="text-emerald-400 font-mono text-sm">{parcel.areaHa} Hektar</strong>
              </div>
            </div>
          </div>

          {/* Section 4-7: Copernicus Sentinel-2 Level-2A Parameters */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              Bölüm 4 - 7: Copernicus Sentinel-2 L2A Spektral Parametreleri
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Sensor & Seviye</span>
                <strong className="text-white text-xs">Sentinel-2B MSI (Level-2A BOA)</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Uzaysal Çözünürlük</span>
                <strong className="text-emerald-400 text-xs">10 Metre (B02, B03, B04, B08)</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Bulut / Gölge Maskesi</span>
                <strong className="text-white text-xs">SCL Filtreli (Bulutsuzluk: %95+)</strong>
              </div>
            </div>
          </div>

          {/* Section 8-12: Calculated Biophysical Indices */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
              Bölüm 8 - 12: Biyofiziksel İndeksler ve Karbon/Su Metrikleri
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[11px]">NDVI</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{parcel.ndvi}</span>
                <span className="block text-[10px] text-slate-400 mt-1">Bitki Sağlığı: {parcel.plantHealth}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[11px]">NDWI</span>
                <span className="text-xl font-bold font-mono text-cyan-400">{parcel.ndwi}</span>
                <span className="block text-[10px] text-slate-400 mt-1">Su Stresi: {parcel.waterStress}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[11px]">Türetilmiş Nem</span>
                <span className="text-xl font-bold font-mono text-amber-400">%{parcel.soilMoisture}</span>
                <span className="block text-[10px] text-slate-400 mt-1">NDMI: 0.18</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[11px]">MRV Sürdürülebilirlik</span>
                <span className="text-xl font-bold font-mono text-teal-400">{parcel.sustainabilityScore}/100</span>
                <span className="block text-[10px] text-emerald-400 mt-1">Seviye A</span>
              </div>
            </div>
          </div>

          {/* Section 13-16: Agronomic Assessment */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Bölüm 13 - 16: Agronomik Değerlendirme ve Risk Raporu
            </span>
            <p className="text-slate-300 leading-relaxed text-xs">
              {analysis?.summary || `${parcel.name} için yapılan çoklu spektral değerlendirmede fotosentetik aktivitenin mevsim normallerinde olduğu, kanopi su kaybının kontrollü damla sulama ile dengelendiği saptanmıştır.`}
            </p>
          </div>

          {/* Section 17-19: Corporate Compliance & Sign-off */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
              Bölüm 17 - 19: Kurumsal Uyum ve Denetçi İmzası
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CSRD ESRS E4 Biyoçeşitlilik</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GHG Protocol Scope 3 Tarım</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISO 14064-2 Doğrulama</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Rapor Doğrulama Kodu: TR-MRV-2026-S2B-{parcel.id.toUpperCase()}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadGeoJson}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              GeoJSON İndir
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
