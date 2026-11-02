import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/** Scene choreography excludes original Journey, opening and four-label field scene. */
export function SceneRefinement(){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion:no-preference)',()=>{const ctx=gsap.context(()=>{
 const media=document.querySelectorAll<HTMLElement>('.land-figure,.about-photo,.stage1-audience-media,.platform-landscape,.solutions-panorama');
 media.forEach(el=>{el.classList.add('cinema-photo','cinema-wipe');const im=el.querySelector('img');if(im)gsap.fromTo(im,{scale:1.18,yPercent:-5},{scale:1,yPercent:4,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.5}});
 gsap.fromTo(el,{clipPath:'inset(12% 7% 12% 7%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 25%',scrub:true}});
 });
 document.querySelectorAll<HTMLElement>('.audiences article').forEach(el=>{const title=el.querySelector('h2');if(title)gsap.fromTo(title,{xPercent:-8},{xPercent:3,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}})});
 document.querySelectorAll<HTMLElement>('.split-heading h2,.perspective-heading h2,.about-story h2,.next-inner h2').forEach(el=>{gsap.fromTo(el,{y:55,clipPath:'inset(0 0 100% 0)'},{y:0,clipPath:'inset(0 0 0% 0)',duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 93%',toggleActions:'play none none reverse'}})});
 });return()=>{ctx.revert();document.querySelectorAll('.cinema-photo').forEach(el=>el.classList.remove('cinema-photo','cinema-wipe'))}});return()=>mm.revert()},[]);return null}
