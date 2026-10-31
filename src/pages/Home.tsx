import {uiLists,uiLabels} from '../content/section-copy';
import {uiTexts} from '../content/interface';
import {copy,principles} from '../content/site';
import {Eyebrow,Link} from '../components/ui';
import {Observation,Strata,FilizScene,Evidence} from '../sections/Cinematics';
export function Home({base}:{base:string}){const c=copy.home;return <>
<section className="home-hero wrap"><div className="hero-kicker"><Eyebrow>{c.eyebrow}</Eyebrow><span>{uiTexts.home_001}</span></div><div className="home-hero-grid"><h1>{c.title[0]}<br/><em>{c.title[1]}</em></h1><div className="hero-intro"><p>{c.intro}</p><Link solid href={base+'platform/'}>{uiTexts.home_002}</Link></div></div><Observation base={base}/></section>
<section className="thesis wrap"><Eyebrow num="01">{uiTexts.home_003}</Eyebrow><div><h2>{c.thesis.split('\n').map((s,i)=><span key={s}>{i===1?<em>{s}</em>:s}<br/></span>)}</h2><div className="thesis-bottom"><p>{c.thesisBody}</p><Link href={base+'platform/'}>{uiTexts.home_004}</Link></div></div></section>
<div className="wrap"><Strata base={base}/></div>
<section className="filiz-feature wrap"><div className="filiz-feature-art"><FilizScene base={base}/></div><div className="filiz-feature-copy"><Eyebrow num="04">{uiTexts.home_005}</Eyebrow><h2>{uiTexts.home_006}<br/><em>{uiTexts.home_007}</em></h2><p>{uiTexts.home_008}</p><Link href={base+'filiz/'}>{uiTexts.home_009}</Link><span className="subtle-note">{uiTexts.home_010}</span></div></section>
<div className="wrap"><Evidence base={base}/></div>
<section className="principles wrap"><Eyebrow>{uiTexts.home_011}</Eyebrow><div>{principles.map((p,i)=><article key={p.title}><span>{uiTexts.home_012}{i+1}</span><h3>{p.title}</h3><p>{p.text}</p></article>)}</div><Link href={base+'hakkimizda/'}>{uiTexts.home_013}</Link></section>
<Next base={base} label={uiLabels.home_001} title={<>{uiTexts.home_014}<br/><em>{uiTexts.home_015}</em></>} href="cozumler/" cta={uiLabels.home_002}/>
</>}
import type {ReactNode} from 'react';
export function Next({base,label,title,href,cta}:{base:string;label:string;title:ReactNode;href:string;cta:string}){return <section className="next-section wrap"><Eyebrow>{label}</Eyebrow><div><h2>{title}</h2><Link href={base+href} solid>{cta}</Link></div></section>}
