import { useEffect, useRef, useState } from "react";
import { Media } from "../components/ui";
const chapters=[
 {label:'01 / GÖZLEM',title:'Bir yüzeyden',tail:'çok daha fazlası.',text:'Uydu görüntüsü bir başlangıçtır. Anlam, yüzeyin arkasındaki bağlamla ortaya çıkar.'},
 {label:'02 / BAĞLAM',title:'Bakış açısı değişir.',tail:'Sorular derinleşir.',text:'Arazi yapısı, doğal sınırlar ve tarımsal çevre. Aynı görüntüyü, farklı ilişkilerle okumak.'},
 {label:'03 / ANLAM',title:'Görüntüyü gör.',tail:'Hikâyeyi araştır.',text:'Gözlem, zaman ve saha bilgisi birlikte ele alınır. Bir gösterge, tek başına kesin hüküm değildir.'},
];
export function TerrainStory({base}:{base:string}){
 const host=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null);const [ready,setReady]=useState(false),[chapter,setChapter]=useState(0);
 useEffect(()=>{const h=host.current,c=canvas.current;if(!h||!c)return;const reduced=matchMedia('(prefers-reduced-motion:reduce)');let dead=false,dispose:(()=>void)|undefined;let epoch=0;
 const track=()=>{const p=Math.max(0,Math.min(1,-h.getBoundingClientRect().top/(h.offsetHeight-innerHeight)));setChapter(Math.min(2,Math.floor(p*3)));h.style.setProperty('--terrain-progress',String(p))};addEventListener('scroll',track,{passive:true});
 const boot=()=>{const ticket=++epoch;dispose?.();dispose=undefined;setReady(false);if(reduced.matches)return;
 import('./terrain').then(async m=>{if(dead||ticket!==epoch)return;const stop=await m.mountTerrain(c,h,base,p=>{if(!dead){setReady(true);setChapter(Math.min(2,Math.floor(p*3)))}});if(dead||ticket!==epoch)stop();else dispose=stop}).catch(()=>setReady(false));};
 const obs=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){boot();obs.disconnect()}},{rootMargin:'0px'});obs.observe(h);reduced.addEventListener('change',boot);
 return()=>{removeEventListener('scroll',track);dead=true;epoch++;obs.disconnect();reduced.removeEventListener('change',boot);dispose?.()};},[base]);
 return <section id="perspektif" ref={host} className={`terrain-story ${ready?'terrain-ready':''}`} aria-label="Yüzeyden bağlama sinematik anlatım">
 <div className="terrain-stage"><Media base={base} name="stage1/temporal-earth" className="terrain-poster" alt="Kavramsal tarımsal peyzaj; gerçek zaman serisi veya analiz değildir."/><canvas ref={canvas} aria-hidden="true"/><div className="terrain-photo" aria-hidden="true"><Media base={base} name="stage1/temporal-earth" alt="Tarımsal manzara; kavramsal anlatım."/></div>
 <div className="terrain-vignette"/>
 <div className="terrain-readings">{chapters.map((x,i)=><div key={x.label} className={`terrain-chapter ${chapter===i?'is-current':''}`} aria-hidden={ready&&chapter!==i}><span>{x.label}</span><h2>{x.title}<br/><em>{x.tail}</em></h2><p>{x.text}</p></div>)}</div>
 <div className="terrain-footer"><span>Kavramsal 3D rölyef · Gerçek ölçüm değildir.</span><div className="terrain-track"><i/></div><a href="#parselin-hikayesi">Anlatımı geç ↘</a></div>
 </div></section>
}
