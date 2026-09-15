import React from 'react';
import { 
  BookOpen, 
  Satellite, 
  Layers, 
  Cpu, 
  Droplets, 
  Activity, 
  ShieldCheck, 
  FileCode,
  AlertCircle
} from 'lucide-react';

export const MethodologyView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Spektral Metodoloji ve Bilimsel Formülasyon
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Copernicus Sentinel-2 Level-2A (BOA), bulut maskeleme ve MRV hesaplama standartları
            </p>
          </div>
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NDVI */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 font-mono uppercase">NDVI</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">
              Normalize Edilmiş Fark Bitki İndeksi
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Klorofil fotosentezi ve vejetasyon biyokütlesini ölçer. Kırmızı dalga boyu (B04) emilim, Yakın Kızılötesi (B08) yansıma seviyesini değerlendirir.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 text-center font-bold">
            NDVI = (B08 - B04) / (B08 + B04)
          </div>
        </div>

        {/* NDWI */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400 font-mono uppercase">NDWI (Gao)</span>
              <Droplets className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">
              Normalize Edilmiş Fark Su İndeksi
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Yeşil bant (B03) ile Yakın Kızılötesi (B08) oranından kanopi su içeriğini ve yüzey nem dinamiklerini belirler.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 text-center font-bold">
            NDWI = (B03 - B08) / (B03 + B08)
          </div>
        </div>

        {/* NDMI */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 font-mono uppercase">NDMI</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">
              Normalize Edilmiş Fark Nem İndeksi
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              B08 NIR ile B11 Kısa Dalga Kızılötesi (SWIR) arasındaki farkı kullanarak kanopi içi yaprak su gerilimini ve su stresini doğrudan izler.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 text-center font-bold">
            NDMI = (B08 - B11) / (B08 + B11)
          </div>
        </div>

        {/* NBR */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-400 font-mono uppercase">NBR</span>
              <FileCode className="w-4 h-4 text-rose-400" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">
              Normalize Yanma Oranı (Anız & Hasat)
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              B08 ve B12 bantları ile anız yakma veya hasat sonrası çıplak toprak değişimlerini tespit eder.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 text-center font-bold">
            NBR = (B08 - B12) / (B08 + B12)
          </div>
        </div>
      </div>

      {/* SCL Cloud Masking & Scientific Integrity */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>SCL (Scene Classification Layer) Bulut ve Gölge Filtreleme</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Copernicus Sentinel-2 Level-2A ürünleri, atmosferik düzeltme (Sen2Cor) ile BOA (Bottom of Atmosphere) yansıma değerleri sağlar. SCL katmanı her 10m/20m piksel için sınıflandırma sunar:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-emerald-400 font-bold block">Sınıf 4</span> Bitki Örtüsü (Geçerli)
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-amber-400 font-bold block">Sınıf 5</span> Çıplak Toprak (Geçerli)
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-rose-400 font-bold block">Sınıf 8,9,10</span> Bulut (Maskelenir)
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-purple-400 font-bold block">Sınıf 3</span> Bulut Gölgesi (Maskelenir)
          </div>
        </div>
      </div>

      {/* Scientific Limitation Warning */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-amber-300 block">Optik Uydu Ölçümlerinin Bilimsel Sınırları:</strong>
          <p className="text-slate-300 leading-relaxed">
            Optik uydular (Sentinel-2 MSI) kanopi ve yüzey spektral yansımasını ölçer. Türetilen toprak nemi göstergeleri yüzey ve kanopi su içeriğine dayalı proxy hesaplamalardır. Kök bölgesi (0-30 cm) derin toprak nemi ölçümleri için sahada kalibre edilmiş TDR veya FDR nem sensörleriyle hibrit doğrulama yapılması tavsiye edilir.
          </p>
        </div>
      </div>
    </div>
  );
};
