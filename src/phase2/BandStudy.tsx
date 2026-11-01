import { useState } from "react";
const bands = [
 { name:"Görünür ışık", range:"B2 · B3 · B4", text:"Mavi, yeşil ve kırmızı bantlar görünür yansımayı kaydeder. Doğal renk kompozitleri yüzeyi anlaşılır kılar; gözle görülen renk tek başına bitki sağlığı ölçümü değildir.",tone:"visible",centers:[["B2",490],["B3",560],["B4",665]] as const },
 { name:"Kırmızı kenar", range:"B5 · B6 · B7", text:"Kırmızıdan yakın kızılötesine geçiş bölgesi. Pigment ve bitki örtüsü araştırmalarında kullanılır; fenoloji, tür ve bant seçimi yorumu etkiler.",tone:"edge",centers:[["B5",705],["B6",740],["B7",783]] as const },
 { name:"Yakın kızılötesi", range:"B8 · B8A", text:"Bitki yaprak yapısına duyarlı yansıma bilgisi taşır. Kırmızı bantla birlikte NDVI gibi ilişkilerde kullanılır. Bu panel gerçek yansıma eğrisi veya ölçüm içermez.",tone:"nir",centers:[["B8",842],["B8A",865]] as const },
 { name:"Kısa dalga kızılötesi", range:"B11 · B12", text:"Su içeriği ve yüzey koşullarıyla ilişkili bilgi taşır. NDMI kanopi nem koşullarına duyarlıdır; kök bölgesi neminin doğrudan ölçümü değildir.",tone:"swir",centers:[["B11",1610],["B12",2190]] as const },
];
export function BandStudy(){const [active,setActive]=useState(0);const b=bands[active];return <div className={`band-study band-${b.tone}`}>
 <div className="band-controls" role="group" aria-label="Spektral bölgeyi seç">{bands.map((v,i)=><button key={v.tone} type="button" aria-pressed={active===i} onClick={()=>setActive(i)}>{v.name}</button>)}</div>
 <div className="band-plate"><svg viewBox="0 0 600 300" role="img" aria-label={`${b.name}: yaklaşık bant merkezleri. ${b.centers.map(([n,w])=>n+': '+w+' nanometre').join(', ')}. Gerçek yansıma ölçümü değildir.`}>
 <path d="M40 210H560" stroke="currentColor" fill="none"/>
 {[400,800,1200,1600,2000,2400].map(w=><g key={w}><path d={`M${40+(w-400)*.26} 210v8`} stroke="currentColor"/><text x={40+(w-400)*.26} y="245" textAnchor="middle">{w}</text></g>)}
 {b.centers.map(([n,w],i)=>{const x=40+(w-400)*.26;const label=b.tone==='swir'?x:100+i*100;return <g key={n}><path d={`M${x} 210V150L${label} 90V75`} stroke="#dce8ba" fill="none"/><circle cx={x} cy="210" r="4" fill="#e3eec6"/><text x={label} y="50" textAnchor="middle">{n}</text><text x={label} y="72" textAnchor="middle" className="band-center">{w} nm</text></g>})}
 <text x="560" y="282" textAnchor="end">Dalga boyu / nm</text></svg></div>
 <div className="band-reading" aria-live="polite"><span className="eyebrow">SENTINEL-2 / {b.range}</span><h3>{b.name}</h3><p className="band-numbers">{b.centers.map(([n,w])=>`${n}: ${w} nm`).join(" · ")}</p><p>{b.text}</p></div>
 <p className="source-note">Yaklaşık Sentinel-2A bant merkezleri gösterilir; bant genişliği veya yansıma ölçümü gösterilmez. Uyduya göre merkezler değişebilir. Bantların doğal mekânsal çözünürlükleri farklıdır.</p>
 </div>}
