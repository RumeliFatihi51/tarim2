import type { ReactNode } from "react";
import { orbitalCopy as c } from "../content/orbital";
import { audiences } from "../content/site";
import { Eyebrow, Link, Icon, Arrow, Media } from "../components/ui";
import { Orbit, Landscape } from "../components/Cinematic";
export function Next({
  base,
  label,
  title,
  href,
  cta,
  body,
}: {
  base: string;
  label: string;
  title: ReactNode;
  href: string;
  cta: string;
  body?: string;
}) {
  return (
    <section className="next-section">
      <div className="wrap next-inner">
        <div>
          <Eyebrow>{label}</Eyebrow>
          <h2>{title}</h2>
          {body ? <p>{body}</p> : null}
        </div>
        <Link href={base + href} solid diagonal>
          {cta}
        </Link>
      </div>
    </section>
  );
}
export function Home({ base }: { base: string }) {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <Eyebrow>
            <span className="label-dot" />
            {c.hero.label}
          </Eyebrow>
          <h1>
            {c.hero.title[0]}
            <br />
            <span>{c.hero.title[1]}</span>
          </h1>
          <p>{c.hero.description}</p>
          <div className="hero-actions">
            <Link href={base + "platform/"} solid>
              {c.hero.primary}
            </Link>
            <Link href={base + "teknoloji/"}>{c.hero.secondary}</Link>
          </div>
          <a className="scroll-cue" href="#perspektif">
            <span className="scroll-icon" aria-hidden="true">
              ↓
            </span>
            {c.labels.scroll}
          </a>
        </div>
        <Orbit base={base} eager />
      </section>
      <div className="pillar-strip">
        <div className="wrap">
          {c.pillars.map((s, i) => (
            <span key={s}>
              <small>0{i + 1}</small>
              {s}
              <span className="pillar-plus" aria-hidden="true">
                +
              </span>
            </span>
          ))}
        </div>
      </div>
      <section
        id="perspektif"
        className="perspective-section wrap section-space"
      >
        <div className="perspective-heading">
          <Eyebrow>{c.value.label}</Eyebrow>
          <h2>{c.value.title}</h2>
          <p>{c.value.body}</p>
        </div>
        <div className="perspective-grid">
          <figure className="land-figure">
            <Media
              base={base}
              name="agriculture"
              alt="Yeşil ve hasat edilmiş tarlalar, zeytinlikler ve bir akarsu: kavramsal tarımsal arazi görseli."
            />
            <figcaption>
              <span>YERYÜZÜ / TARIMSAL PEYZAJ</span>
              <span>Kavramsal görsel</span>
            </figcaption>
          </figure>
          <div className="feature-list">
            {c.features.map((f, i) => (
              <article key={f.title}>
                <div className="feature-icon">
                  <Icon name={f.icon} />
                </div>
                <div>
                  <span className="item-index">0{i + 1}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
            <Link href={base + "platform/"}>Ürün yaklaşımını incele</Link>
          </div>
        </div>
      </section>
      <section className="filiz-preview">
        <div className="wrap filiz-preview-grid">
          <div className="filiz-preview-copy">
            <Eyebrow>{c.filiz.label}</Eyebrow>
            <div className="filiz-wordmark">
              <Icon name="leaf" />
              filiz<span>AI</span>
            </div>
            <h2>{c.filiz.title}</h2>
            <p>{c.filiz.body}</p>
            <Link href={base + "filiz/"} solid>
              {c.filiz.cta}
            </Link>
          </div>
          <Landscape base={base} filiz />
        </div>
      </section>
      <section className="audience-preview wrap section-space">
        <div className="split-heading">
          <div>
            <Eyebrow>KİMİN İÇİN?</Eyebrow>
            <h2>
              Sahada farklı sorular.
              <br />
              Ortak bir bakış.
            </h2>
          </div>
          <p>
            Danışmanlıktan çok parsel yönetimine; uydu gözlemini sahadaki
            bilgiyle birlikte ele almak isteyen profesyoneller için.
          </p>
        </div>
        <div className="audience-links">
          {audiences.map((a) => (
            <a key={a.n} href={base + "cozumler/#alan-" + a.n}>
              <span>{a.n}</span>
              <h3>{a.title}</h3>
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </section>
      <Next
        base={base}
        label={c.closing.label}
        title={
          <>
            Daha geniş bir bakışla
            <br />
            başlayalım.
          </>
        }
        body={c.closing.body}
        href="platform/"
        cta="Platformu keşfet"
      />
    </>
  );
}
