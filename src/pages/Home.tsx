import type { ReactNode } from "react";
import { orbitalCopy as c } from "../content/orbital";
import { audiences } from "../content/site";
import { Eyebrow, Link, Icon, Arrow, Media } from "../components/ui";
import { WorldOpening, Journey } from "../components/Journey";
import { stage1 } from "../content/stage1";
import { ObservationQuestions } from "../phase2/ObservationQuestions";
import { FieldContext } from "../components/FieldContext";
import { Landscape } from "../components/Cinematic";
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
      <WorldOpening base={base} />
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
              name="stage1/perspective-detail"
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
      <section className="understand wrap section-space">
        <span className="eyebrow">03 / ANLAMAK</span>
        <h2>
          Görünmeyen izler.
          <br />
          Daha dikkatli sorular.
        </h2>
        <ObservationQuestions />
        <p>
          Farklı spektral ilişkiler, farklı inceleme soruları doğurur. Tek bir
          gösterge teşhis veya uygulama reçetesi değildir.
        </p>
        <Link href={base + "teknoloji/"}>Göstergelerin sınırlarını öğren</Link>
      </section>
      <section className="time-story">
        <div className="wrap">
          <span className="eyebrow">04 / ZAMANIN İÇİNDEN</span>
          <h2>
            Bir anı görmek.
            <br />
            Değişimi anlamak.
          </h2>
          <p>
            Mevsim, ürün gelişimi ve gözlem koşulları değişir. Zamansal
            karşılaştırma, bu farkları koruyarak yapılmalı.
          </p>
          <div className="time-land">
            <Media
              base={base}
              name="stage1/temporal-earth"
              alt="Zamansal bağlamı anlatan tarihsiz, kavramsal arazi görseli."
            />
            <span>GÖZLEM → GEÇMİŞ → BAĞLAM</span>
          </div>
          <small>
            Kavramsal anlatım; farklı tarihlere ait gerçek ölçüm gösterilmez.
          </small>
        </div>
      </section>
      <section className="field-context-section wrap section-space" aria-labelledby="field-context-heading">
        <div className="split-heading">
          <div>
            <Eyebrow>GÖZLEMDEN BAĞLAMA</Eyebrow>
            <h2 id="field-context-heading">Bir parsel.<br />Birbirini tamamlayan izler.</h2>
          </div>
          <p>Bir gözlem, parselin geçmişi ve dayanaklarıyla birlikte anlam kazanır. AgroMax’ın yaklaşımı, bu bilgileri aynı bağlamda değerlendirmektir.</p>
        </div>
        <FieldContext base={base} />
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
          <Landscape base={base} filiz scene={stage1.filiz} still />
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
      <Journey base={base} />
      <div id="yolculuk-sonu" className="journey-resolution wrap">
        <span>AGROMAX</span>
        <p>
          Gözlem bir başlangıç.
          <br />
          Anlam, bağlamda.
        </p>
        <Link href={base + "platform/"} solid>
          Platformu keşfet
        </Link>
      </div>
    </>
  );
}
