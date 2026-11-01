import { useEffect, useState, type ComponentType } from "react";
import { Film } from "../components/Film";
export function ObservationPortal({base}:{base:string}){
 const [failed,setFailed]=useState(false);
 const [Forms,setForms]=useState<ComponentType<{base:string}>|null>(null);
 useEffect(()=>{let alive=true;import('./AuthForms').then(m=>{if(alive)setForms(()=>m.default)}).catch(()=>{if(alive)setFailed(true)});return()=>{alive=false}},[]);
 return <section className="observation-portal"><div className="portal-scene"><Film base={base} name="field" eager alt="Kavramsal tarımsal peyzaj. Gerçek parsel veya hesap verisi değildir."/><div className="portal-inscription"><span className="eyebrow">AGROMAX / OBSERVATION PORTAL</span><h1>Gözlem.<br/>Bağlam.<br/>Yeni bir başlangıç.</h1><p>Toprağa yakın, veriye bağlı bir bakış.</p></div></div><div className="portal-panel">{Forms?<Forms base={base}/>:failed?<div role="alert"><p>Hesap arayüzü yüklenemedi.</p><button type="button" onClick={()=>location.reload()}>Yeniden dene</button></div>:<p role="status">Hesap alanı hazırlanıyor…</p>}<noscript>Hesap işlemleri için JavaScript gereklidir. Tanıtım sayfaları JavaScript olmadan okunabilir.</noscript></div></section>
}
