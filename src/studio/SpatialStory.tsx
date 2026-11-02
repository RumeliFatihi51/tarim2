import {useEffect,useRef,useState} from 'react';
import {archiveChapters,lightChapters} from './content';
import type {StudioKind} from './scene';
export function SpatialStory({base,kind}:{base:string;kind:StudioKind}){
 const chapters=kind==='light'?lightChapters:archiveChapters;
 const [active,setActive]=useState(0),[ready,setReady]=useState(false);
 const manual=useRef(false);
 const host=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null),api=useRef<{select:(i:number)=>void;dispose:()=>void}|null>(null);
 useEffect(()=>{
  const node=host.current,c=canvas.current;if(!node||!c)return;
  const media=matchMedia('(prefers-reduced-motion:reduce)');let cancelled=false,generation=0,stop:(()=>void)|undefined;
  const sync=()=>{const version=++generation;stop?.();stop=undefined;api.current?.dispose();api.current=null;setReady(false);if(media.matches)return;
   const observer=new IntersectionObserver(async entries=>{if(!entries[0].isIntersecting)return;observer.disconnect();try{const {mountStudio}=await import('./scene');if(cancelled||version!==generation)return;const mounted=await mountStudio(c,kind,base);if(cancelled||version!==generation){mounted.dispose();return}api.current=mounted;setReady(true)}catch{setReady(false)}},{rootMargin:'200px'});observer.observe(node);stop=()=>observer.disconnect();
  };sync();media.addEventListener('change',sync);const lost=()=>setReady(false);c.addEventListener('studio-lost',lost);
  return()=>{cancelled=true;stop?.();media.removeEventListener('change',sync);c.removeEventListener('studio-lost',lost);api.current?.dispose();api.current=null};
 },[kind,base]);
 useEffect(()=>{api.current?.select(active)},[active,ready]);
 useEffect(()=>{const node=host.current;if(!node)return;const observer=new IntersectionObserver(entries=>{if(manual.current)return;const hit=entries.find(e=>e.isIntersecting);if(hit)setActive(Number((hit.target as HTMLElement).dataset.spatialStep))},{rootMargin:'-25% 0px -45% 0px'});node.querySelectorAll('[data-spatial-step]').forEach(e=>observer.observe(e));const resume=()=>{manual.current=false};const key=(e:KeyboardEvent)=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))resume()};addEventListener('wheel',resume,{passive:true});addEventListener('touchstart',resume,{passive:true});addEventListener('keydown',key);return()=>{observer.disconnect();removeEventListener('wheel',resume);removeEventListener('touchstart',resume);removeEventListener('keydown',key)}},[]);
 const id=kind==='light'?'isigin-yolculugu':'baglam-masasi';
 return <section ref={host} id={id} className={`spatial-story spatial-${kind} ${ready?'spatial-ready':''}`}>
  <header className="wrap studio-heading"><span className="eyebrow">{kind==='light'?'IŞIĞIN YOLCULUĞU':'FILIZ / BAĞLAM MASASI'}</span><h2>{kind==='light'?<>Bir yapraktan,<br/>gözlemin kaynağına.</>:<>Bilgi parçaları.<br/>Ortak bir bağlam.</>}</h2><p>{kind==='light'?'Aydınlanma, yüzey ve kayıt arasındaki ilişkiyi keşfet.':'Filiz’in planlanan değerlendirme yaklaşımında her kaynak, diğerleriyle birlikte anlam kazanır.'}</p></header>
  <div className="spatial-layout wrap"><div className="spatial-sticky"><div className="spatial-stage"><picture><source media="(max-width:767px)" srcSet={`${base}media/${kind==='light'?'revision1/leaf-poster-mobile':'revision1/filiz-archive-mobile'}.webp`}/><img src={`${base}media/${kind==='light'?'revision1/leaf-poster':'revision1/filiz-archive'}.webp`} alt={kind==='light'?'Kavramsal botanik ışık çalışması.':'Kavramsal botanik kaynak arşivi.'} loading="lazy" width="1024" height="760"/></picture><canvas ref={canvas} aria-hidden="true"/><span className="spatial-note">{kind==='light'?'KAVRAMSAL OPTİK ANLATIM · ÖLÇÜM DEĞİL':'PLANLANAN YAKLAŞIM · GERÇEK ÜRÜN EKRANI DEĞİL'}</span></div>
   <div className="spatial-controls" role="group" aria-label={kind==='light'?'Işık aşamasını seç':'Bağlam kaynağını seç'}>{chapters.map((c,i)=><button key={c.title} type="button" aria-pressed={active===i} onClick={()=>{manual.current=true;setActive(i);api.current?.select(i);if(innerWidth>=1000)host.current?.querySelector(`[data-spatial-step="${i}"]`)?.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})}}><span>0{i+1}</span>{c.label}</button>)}</div>
   <p className="spatial-current" aria-live="polite">{chapters[active].title}</p>
  </div><div className="spatial-chapters">{chapters.map((c,i)=><article data-spatial-step={i} key={c.title} className={active===i?'is-active':''}><span className="eyebrow">0{i+1} / {c.label}</span><h3>{c.title}</h3><p>{c.text}</p></article>)}</div></div>
  <footer className="wrap spatial-source">{kind==='light'?<p>Şematik ışık yolları fiziksel ışın izleme veya spektral simülasyon değildir. <a href="https://sentiwiki.copernicus.eu/web/s2-mission" target="_blank" rel="noreferrer">Sentinel-2 sensör ve gözlem yaklaşımı ↗</a></p>:<p>Bu masa bir anlatım modelidir. Filiz planlanan bir özelliktir; bu sitede sohbet, analiz veya oluşturulmuş bir AI cevabı bulunmaz.</p>}</footer>
 </section>;
}
