import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/** Scoped marketing enhancement; neither Journey nor its opening are selected. */
export function SceneRefinement(){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion:no-preference)',()=>{const ctx=gsap.context(()=>{
 document.querySelectorAll<HTMLElement>('.land-figure,.time-land,.about-photo,.stage1-audience-media').forEach(el=>{
  const im=el.querySelector('img');if(!im)return;
  gsap.fromTo(im,{scale:1.045,yPercent:-1.5},{scale:1,yPercent:1.5,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}});
 });
 document.querySelectorAll<HTMLElement>('.about-principles article').forEach(el=>{gsap.fromTo(el,{borderColor:'#d8dfd5'},{borderColor:'#476c4e',ease:'none',scrollTrigger:{trigger:el,start:'top 75%',end:'top 30%',scrub:true}})});
 });return()=>ctx.revert()});return()=>mm.revert()},[]);return null}
