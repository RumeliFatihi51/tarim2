import {useEffect,useRef,useState} from 'react';
import {Film} from '../components/Film';
import {archiveChapters,lightChapters} from './content';
import type {StudioKind} from './scene';

/** Photographic essays replace the rejected leaf model and paper archive. */
export function SpatialStory({base,kind}:{base:string;kind:StudioKind}){
 const chapters=kind==='light'?lightChapters:archiveChapters;
 const [active,setActive]=useState(0);const manual=useRef(false),host=useRef<HTMLElement>(null);
 useEffect(()=>{
  if(kind!=='light')return;
  const node=host.current;if(!node)return;
  const observer=new IntersectionObserver(entries=>{if(manual.current)return;const hit=entries.find(e=>e.isIntersecting);if(hit)setActive(Number((hit.target as HTMLElement).dataset.qualityStep))},{rootMargin:'-25% 0px -45% 0px'});
  node.querySelectorAll('[data-quality-step]').forEach(e=>observer.observe(e));
  const resume=()=>{manual.current=false};const key=(e:KeyboardEvent)=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))resume()};
  addEventListener('wheel',resume,{passive:true});addEventListener('touchstart',resume,{passive:true});addEventListener('keydown',key);
  return()=>{observer.disconnect();removeEventListener('wheel',resume);removeEventListener('touchstart',resume);removeEventListener('keydown',key)};
 },[kind]);
 const controls=<div className="quality-nav" role="group" aria-label={kind==='light'?'Işık aşamasını seç':'Parsel bağlamını seç'}>{chapters.map((c,i)=><button key={c.title} type="button" aria-pressed={active===i} onClick={()=>{
  manual.current=true;setActive(i);
  if(kind==='light'&&innerWidth>=1000)host.current?.querySelector(`[data-quality-step="${i}"]`)?.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
 }}><span>0{i+1}</span>{kind==='light'?c.label:c.title}</button>)}</div>;
 if(kind==='archive')return <section ref={host} id="baglam-masasi" className="quality-context">
  <header className="wrap quality-heading"><span className="eyebrow">FİLİZ / PARSELİN BAĞLAMI</span><h2>Bir parsel.<br/>Çevresiyle bir bütün.</h2><p>Filiz’in planlanan yaklaşımını, gözlemin başladığı yerde düşün: arazide.</p></header>
  <figure className="quality-landscape"><Film base={base} name="quality/context" loop={false} alt="Gerçek havadan tarım çekimi: ekim sıraları, parsel sınırları ve çevredeki yollar. AgroMax parseli veya analiz çıktısı değildir."/>
   <div className="quality-land-label"><span>{['PARSEL / ÖLÇEK','GÖZLEM / KALİTE','GEÇMİŞ / DÖNEM','DAYANAK / BELİRSİZLİK'][active]}</span><span>Toprak / Bitki örtüsü / Çevre</span></div>
  </figure>
  <div className="wrap">{controls}<div className="quality-context-copy" aria-live="polite"><div><span className="eyebrow">0{active+1} / BAĞLAMI OKUMAK</span><h3>{['Yeri bil.','Gözlemi tanı.','Geçmişi düşün.','Dayanağı koru.'][active]}</h3></div><div>{chapters.map((c,i)=><article hidden={active!==i} key={c.title}><h4>{c.title}</h4><p>{c.text}</p></article>)}</div></div>
  <footer className="refinement-credit"><p>Gerçek çekim: Marian Croitoru / <a href="https://www.pexels.com/video/aerial-shot-of-agricultural-farms-5200865/" target="_blank" rel="noreferrer">Pexels</a>. Görüntü anlatım amaçlıdır; AgroMax müşterisi, uydu verisi veya analiz çıktısı değildir. Filiz planlanan özelliktir.</p></footer></div>
 </section>;
 return <section ref={host} id="isigin-yolculugu" className="quality-light">
  <header className="wrap quality-heading"><span className="eyebrow">IŞIĞIN YOLCULUĞU</span><h2>Işığın izi,<br/>yaprağın dokusunda.</h2><p>Gerçek bir yüzeye yakından bak. Aydınlanma, yüzey ve kayıt arasındaki ilişkiyi keşfet.</p></header>
  <div className="wrap quality-optical-layout"><div className="quality-optical-sticky"><figure className="quality-macro"><Film base={base} name="quality/light" loop={false} alt="Güneş ışığında gerçek yaprak: damarlar, yüzey dokusu, doğal hareket ve arka planda optik alan derinliği."/><figcaption>GERÇEK YAPRAK / DOĞAL IŞIK / YAKIN PLAN</figcaption></figure>{controls}<p className="quality-active" aria-live="polite">{chapters[active].title}</p></div>
  <div className="quality-chapters">{chapters.map((c,i)=><article data-quality-step={i} className={active===i?'is-current':''} key={c.title}><span className="eyebrow">0{i+1} / {c.label}</span><h3>{c.title}</h3><p>{c.text}</p></article>)}</div></div>
  <footer className="wrap refinement-credit"><p>Gerçek çekim: Gaurav Kumar / <a href="https://www.pexels.com/video/close-up-of-vibrant-green-leaf-in-sunlight-30833644/" target="_blank" rel="noreferrer">Pexels</a>. Bu yakın plan spektral ölçüm veya sensör simülasyonu değildir. <a href="https://sentiwiki.copernicus.eu/web/s2-mission" target="_blank" rel="noreferrer">Sentinel-2 gözlem yaklaşımı ↗</a></p></footer>
 </section>;
}
