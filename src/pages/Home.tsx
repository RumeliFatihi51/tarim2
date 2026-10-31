import { experience as e } from "../content/experience";
import { principles } from "../content/site";
import { Eyebrow, Link, Media } from "../components/ui";
import { Film } from "../components/Film";
import type { ReactNode } from "react";
export function Home({ base }: { base: string }) {
  return (
    <>
      <section className="hero-v2">
        <Media base={base} name="terrain" alt={e.hero.caption} eager />
        <div className="hero-v2-shade" />
        <div className="hero-v2-top">
          <Eyebrow>{e.hero.tag}</Eyebrow>
          <span>AGROMAX — DİJİTAL TARIM</span>
        </div>
        <div className="hero-v2-title">
          <h1>
            {e.hero.lines.map((s, i) => (
              <span key={s} className={`hero-line line-${i}`}>
                {s}
              </span>
            ))}
          </h1>
          <div className="hero-v2-aside">
            <div className="hero-preview">
              <Film base={base} name="loom" />
            </div>
            <p>{e.hero.body}</p>
            <Link href={base + "platform/"} solid>
              {e.hero.cta}
            </Link>
            <Link href={base + "teknoloji/"}>{e.hero.secondary}</Link>
          </div>
        </div>
        <div className="hero-v2-bottom">
          <a href="#perspektif">
            ↓ <span>{e.hero.scroll}</span>
          </a>
          <span>{e.hero.caption}</span>
        </div>
      </section>
      <section id="perspektif" className="intro-v2 wrap">
        <Eyebrow num="01">{e.intro.tag}</Eyebrow>
        <h2>
          {e.intro.title.split("\n").map((s) => (
            <span key={s}>{s}</span>
          ))}
        </h2>
        <div>
          <p>{e.intro.body}</p>
          <Link href={base + "hakkimizda/"}>{e.intro.link}</Link>
        </div>
      </section>
      <section className="signature-v2">
        <div className="signature-stage">
          <div className="signature-visual strata-art" data-v2-loom>
            <Film base={base} name="loom" />
            <span className="art-caption">{e.loom.caption}</span>
          </div>
          <div className="signature-copy">
            <Eyebrow num="02">{e.loom.tag}</Eyebrow>
            <h2>
              {e.loom.title.split("\n").map((s) => (
                <span key={s}>{s}</span>
              ))}
            </h2>
            <p>{e.loom.body}</p>
            <Link href={base + "teknoloji/"}>{e.loom.link}</Link>
            <div className="signature-progress" aria-hidden="true">
              <i />
              <span>GÖZLEM → BAĞLAM</span>
            </div>
          </div>
        </div>
      </section>
      <section className="filiz-v2 wrap">
        <div className="filiz-v2-copy">
          <Eyebrow num="03">{e.filiz.tag}</Eyebrow>
          <h2>
            {e.filiz.title.split("\n").map((s) => (
              <span key={s}>{s}</span>
            ))}
          </h2>
          <p>{e.filiz.body}</p>
          <Link href={base + "filiz/"}>{e.filiz.link}</Link>
        </div>
        <Film base={base} name="filiz-motion" />
      </section>
      <section className="home-principles-v2 wrap">
        <Eyebrow num="04">GÖZLEMDEN KARARA</Eyebrow>
        {principles.map((p, i) => (
          <article key={p.title}>
            <span>0{i + 1}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </section>
      <section className="closing-v2">
        <Media
          base={base}
          name="archive"
          alt="Özgün mineral ve bilgi katmanları konsept çalışması."
        />
        <div>
          <Eyebrow>{e.closing.tag}</Eyebrow>
          <h2>
            {e.closing.title.split("\n").map((s) => (
              <span key={s}>{s}</span>
            ))}
          </h2>
          <Link href={base + "cozumler/"} solid>
            {e.closing.link}
          </Link>
        </div>
      </section>
    </>
  );
}
export function Next({
  base,
  label,
  title,
  href,
  cta,
}: {
  base: string;
  label: string;
  title: ReactNode;
  href: string;
  cta: string;
}) {
  return (
    <section className="next-section wrap">
      <Eyebrow>{label}</Eyebrow>
      <div>
        <h2>{title}</h2>
        <Link href={base + href} solid>
          {cta}
        </Link>
      </div>
    </section>
  );
}
