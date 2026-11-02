import { useEffect, useRef, useState } from 'react';

const views = [
  {title:'Gözlem',question:'Görüntü neyi gösteriyor?',text:'Bir görünüm veya gösterge, inceleme gerektiren bir farklılığa işaret edebilir. Bu ilk iz, henüz nedenin açıklaması değildir.',need:'Kaynak, tarih ve görüntü kalitesi'},
  {title:'Bağlam',question:'Başka neyi bilmeliyiz?',text:'Ürün, gelişim dönemi, arazi yapısı ve yakın geçmiş; aynı görünümün farklı nedenlerini düşünmeye yardımcı olur.',need:'Parsel geçmişi ve yerel koşullar'},
  {title:'Doğrulama',question:'Dayanağı nasıl güçlendiririz?',text:'Saha gözlemi ve uzman değerlendirmesi, uzaktan gözlemin işaret ettiği soruyu sınar. Tek bir görüntü uygulama reçetesi değildir.',need:'Saha bilgisi ve uzman değerlendirmesi'},
];

export function EvidenceReader() {
  const host = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const media = matchMedia('(min-width:900px) and (prefers-reduced-motion:no-preference)');
    let observer: IntersectionObserver | undefined;
    const sync = () => {
      observer?.disconnect();
      if (!media.matches) return;
      observer = new IntersectionObserver(entries => {
        const hit = entries.find(e => e.isIntersecting);
        if (hit) setActive(Number((hit.target as HTMLElement).dataset.evidence));
      }, {rootMargin:'-25% 0px -45% 0px'});
      node.querySelectorAll('[data-evidence]').forEach(el => observer!.observe(el));
    };
    sync(); media.addEventListener('change',sync);
    return () => { observer?.disconnect(); media.removeEventListener('change',sync); };
  }, []);
  return <section ref={host} className="evidence-reader" aria-label="Gözlemden gerekçeye">
    <div className="evidence-reader-heading">
      <span className="eyebrow">BİR GÖZLEMİ OKUMAK</span>
      <h2>İlk izden,<br/>sağlam dayanağa.</h2>
      <p>Bir aşamayı seç veya okumaya devam et. Bu anlatım gerçek bir parsel analizi yapmaz.</p>
      <div className="evidence-controls" role="group" aria-label="İnceleme aşamasını seç">
        {views.map((v,i)=><button type="button" key={v.title} aria-pressed={i===active} onClick={()=>{
          setActive(i);
          host.current?.querySelector<HTMLElement>(`[data-evidence="${i}"]`)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'center'});
        }}><span>0{i+1}</span>{v.title}</button>)}
      </div>
      <div className="evidence-progress" aria-hidden="true"><i style={{transform:`scaleX(${(active+1)/3})`}}/></div>
    </div>
    <div className="evidence-passages">{views.map((v,i)=><article key={v.title} data-evidence={i} className={`evidence-reading ${active===i?'is-current':''}`}>
      <span className="evidence-word" aria-hidden="true">0{i+1}</span>
      <div><h3>{v.question}</h3><p>{v.text}</p><small>Bir sonraki dayanak</small><strong>{v.need}</strong></div>
    </article>)}</div>
  </section>;
}
