import { useEffect } from 'react';
/** Native full-document links, with a short shared colour curtain; hashes stay native. */
export function RouteTransition(){useEffect(()=>{
 const entryTimer=window.setTimeout(()=>document.documentElement.classList.remove('cinema-arriving'),750);
 let timer=0,busy=false;const clear=()=>{busy=false;document.documentElement.classList.remove('cinema-leaving','cinema-arriving')};
 const click=(e:MouseEvent)=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 const a=(e.target as Element)?.closest<HTMLAnchorElement>('a[href]');if(!a||a.hasAttribute('download')||(a.target&&a.target!=='_self'))return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname&&u.search===location.search)return;
 e.preventDefault();if(busy)return;busy=true;try{sessionStorage.setItem('agromax-cinema-entry','1')}catch{/* Navigation still works when storage is unavailable. */}
 document.documentElement.classList.remove('cinema-arriving');document.documentElement.classList.add('cinema-leaving');timer=window.setTimeout(()=>location.assign(u.href),190);
 };
 const show=(e:PageTransitionEvent)=>{if(e.persisted)clear()};document.addEventListener('click',click);addEventListener('pageshow',show);
 return()=>{clearTimeout(entryTimer);clearTimeout(timer);document.removeEventListener('click',click);removeEventListener('pageshow',show);clear()};
 },[]);return null}
