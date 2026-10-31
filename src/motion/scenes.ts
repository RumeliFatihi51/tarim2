import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
/** All cinematic timelines follow native scroll. No pinning, blocking intro or scroll interception. */
export function initMotion(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return ()=>{};
 gsap.registerPlugin(ScrollTrigger);
 const mm=gsap.matchMedia();
 mm.add({desktop:'(min-width: 768px)',mobile:'(max-width: 767px)',motion:'(prefers-reduced-motion: no-preference)'},ctx=>{
  if(!ctx.conditions?.motion)return;
  const mobile=ctx.conditions?.mobile;
  document.querySelectorAll<HTMLElement>('[data-scene]').forEach(el=>{
   const q=gsap.utils.selector(el);const type=el.dataset.scene;
   const timeline=gsap.timeline({scrollTrigger:{trigger:el,start:'top 85%',end:'bottom 12%',scrub:mobile?true:1.1},defaults:{ease:'none'}});
   if(type==='observation'){
    timeline.fromTo(q('.observation-frame img'),{scale:1.1,transformOrigin:'54% 55%'},{scale:1.015,yPercent:-3,duration:1},0)
    .fromTo(q('.optical-reticle'),{rotation:-28,scale:.7,opacity:.2},{rotation:28,scale:1.27,opacity:.75,duration:1},0)
    .fromTo(q('.optical-reticle span:nth-child(2)'),{scale:1.1},{scale:.55,duration:1},0)
    .fromTo(q('.observation-type span'),{x:0},{x:(i:number)=>mobile?0:i*13,duration:1},0);
   }
   if(type==='strata'){
    timeline.fromTo(q('.strata-art picture'),{scale:.9,rotation:-7,yPercent:8},{scale:1.09,rotation:5,yPercent:-4,duration:1},0)
    .fromTo(q('.strata-orbit'),{rotation:-30,scale:.8},{rotation:25,scale:1.08,duration:1},0)
    .fromTo(q('.strata-folio span'),{x:45,opacity:.2},{x:0,opacity:1,stagger:.16,duration:.5},.1);
   }
   if(type==='filiz'){
    el.querySelectorAll<SVGPathElement>('.context-path').forEach(p=>{const len=p.getTotalLength();gsap.set(p,{strokeDasharray:len,strokeDashoffset:len});timeline.to(p,{strokeDashoffset:0,duration:.85},.1)});
    timeline.fromTo(q('picture'),{scale:.96,rotation:-5},{scale:1.07,rotation:4,duration:1},0)
    .fromTo(q('.context-labels span'),{opacity:.4},{opacity:1,stagger:.1,duration:.5},.25)
    .fromTo(q('.filiz-orchestration'),{rotation:-8},{rotation:6,duration:1},0);
   }
   if(type==='temporal'){
    timeline.fromTo(q('.temporal-lens'),{clipPath:'inset(0% 76% 0% 0%)'},{clipPath:'inset(0% 0% 0% 76%)',duration:1},0)
    .fromTo(q('.temporal-lens picture'),{scale:1.35,xPercent:3},{scale:1.03,xPercent:-3,duration:1},0)
    .fromTo(q('.temporal-stage>picture'),{scale:1.03},{scale:1.12,duration:1},0)
    .fromTo(q('.time-lines i'),{scaleY:.6,transformOrigin:'bottom'},{scaleY:1,stagger:.03,duration:.7},0);
   }
   if(type==='evidence'){
    const path=el.querySelector<SVGPathElement>('.evidence-path path');
    if(path){const len=path.getTotalLength();timeline.fromTo(path,{strokeDasharray:len,strokeDashoffset:len},{strokeDashoffset:0,duration:.8},.1)}
    timeline.fromTo(q('.evidence-visual img'),{scale:1.05,transformOrigin:'50% 60%'},{scale:1.13,transformOrigin:'50% 42%',duration:1},0)
    .fromTo(q('.evidence-steps li'),{y:6},{y:0,stagger:.12,duration:.3},.05);
   }
  });
 });
 const base=document.getElementById('root')?.dataset.base||import.meta.env.BASE_URL;
 const mineral=document.querySelector<HTMLElement>('.strata-art');
 if(mineral&&matchMedia('(min-width:768px)').matches){
  const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){observer.disconnect();import('../scenes/mineral').then(m=>m.mountMineral(mineral,base)).catch(()=>{});}},{rootMargin:'250px'});observer.observe(mineral);window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
 }
 const change=()=>ScrollTrigger.refresh();document.fonts.ready.then(change);
 window.addEventListener('pagehide',()=>{mm.revert();ScrollTrigger.getAll().forEach(t=>t.kill())},{once:true});
 return ()=>mm.revert();
}
