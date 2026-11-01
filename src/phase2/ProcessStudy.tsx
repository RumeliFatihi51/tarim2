import { useEffect, useRef, useState } from "react";
import { workflow } from "../content/site";
import { Film } from "../components/Film";
import { useSceneMotion } from "./useSceneMotion";
export function ProcessStudy({ base }: { base: string }) {
  const [active, setActive] = useState(0);
  const manual = useRef(false);
  const host = useRef<HTMLElement>(null);
  useSceneMotion(host);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const markers = node.querySelectorAll<HTMLElement>("[data-process-step]");
    const observer = new IntersectionObserver(entries => {
      if (manual.current) return;
      const hit = entries.find(e => e.isIntersecting);
      if (hit) setActive(Number((hit.target as HTMLElement).dataset.processStep));
    }, { rootMargin: "-30% 0px -45% 0px" });
    markers.forEach(m => observer.observe(m));
    const resume = () => { manual.current=false; };
    const key = (e: KeyboardEvent) => { if (["ArrowDown","ArrowUp","PageDown","PageUp","Home","End"," "].includes(e.key)) resume(); };
    addEventListener("wheel",resume,{passive:true});addEventListener("touchstart",resume,{passive:true});addEventListener("keydown",key);
    return () => { observer.disconnect();removeEventListener("wheel",resume);removeEventListener("touchstart",resume);removeEventListener("keydown",key); };
  }, []);
  return <section className="process-study" ref={host} aria-label="Altı aşamalı ürün yaklaşımı">
    <div className="process-visual">
      <Film base={base} name="revision1/parcel" alt="Kavramsal arazi rölyefi. Çalışan analiz veya gerçek parsel verisi değildir." />
      <div className="process-reading" data-depth aria-live="polite"><span>{workflow[active].n} / 06</span><h3>{workflow[active].title}</h3><p>{workflow[active].text}</p></div>
      <p className="process-caveat">Ürün yaklaşımı · Kavramsal anlatım · Gerçek analiz değildir.</p>
    </div>
    <div className="process-chapters">{workflow.map((w,i)=><article key={w.n} data-process-step={i} className={active===i?"is-active":""}>
      <button type="button" aria-pressed={active===i} onClick={()=>{manual.current=true;setActive(i)}}><span>{w.n}</span><span>{w.title}</span><span aria-hidden="true">↗</span></button><p>{w.text}</p>
    </article>)}</div>
  </section>;
}
