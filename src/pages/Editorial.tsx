import { uiLists, uiLabels } from "../content/section-copy";
import { uiTexts } from "../content/interface";
import { useState } from "react";
import { copy, audiences, principles, legal } from "../content/site";
import { Eyebrow, Link, Media, Arrow } from "../components/ui";
import { siteConfig } from "../config/site";
import { Next } from "./Home";
export function Solutions({ base }: { base: string }) {
  const c = copy.cozumler;
  return (
    <>
      <section className="solutions-hero wrap">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1>
          {c.title[0]}
          <br />
          <em>{c.title[1]}</em>
        </h1>
        <div className="solutions-hero-bottom">
          <p>{c.intro}</p>
          <span>{uiTexts.editorial_001}</span>
        </div>
        <div className="solutions-strip">
          <Media base={base} name="archive" alt={uiTexts.editorial_002} eager />
          <span>{uiTexts.editorial_003}</span>
        </div>
      </section>
      <section className="audiences wrap">
        <Eyebrow>{uiTexts.editorial_004}</Eyebrow>
        {audiences.map((a) => (
          <article key={a.n}>
            <span className="audience-number">{a.n}</span>
            <div>
              <h2>{a.title}</h2>
              <h3>{a.question}</h3>
            </div>
            <div>
              <p>{a.text}</p>
              <small>{a.use}</small>
            </div>
          </article>
        ))}
      </section>
      <div className="audience-note wrap">
        <p>{uiTexts.editorial_005}</p>
      </div>
      <Next
        base={base}
        label={uiLabels.editorial_001}
        title={
          <>
            {uiTexts.editorial_006}
            <br />
            <em>{uiTexts.editorial_007}</em>
          </>
        }
        href="platform/"
        cta={uiLabels.editorial_002}
      />
    </>
  );
}
export function About({ base }: { base: string }) {
  const c = copy.hakkimizda;
  return (
    <>
      <section className="about-hero wrap">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1>
          {c.title[0]}
          <br />
          <em>{c.title[1]}</em>
        </h1>
        <div className="about-hero-bottom">
          <span>{uiTexts.editorial_008}</span>
          <p>{c.intro}</p>
        </div>
      </section>
      <figure className="about-image">
        <Media base={base} name="terrain" alt={uiTexts.editorial_009} eager />
        <figcaption>{uiTexts.editorial_010}</figcaption>
      </figure>
      <section className="about-story wrap">
        <Eyebrow>{uiTexts.editorial_011}</Eyebrow>
        <div>
          <h2>
            {c.statement.split("\n")[0]}
            <br />
            <em>{c.statement.split("\n")[1]}</em>
          </h2>
          <p>{c.body}</p>
          <p>{uiTexts.editorial_012}</p>
        </div>
      </section>
      <section className="about-principles wrap">
        <Eyebrow>{uiTexts.editorial_013}</Eyebrow>
        {principles.map((p, i) => (
          <article key={p.title}>
            <span>
              {uiTexts.editorial_014}
              {i + 1}
            </span>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </article>
        ))}
      </section>
      <section className="about-note wrap">
        <Eyebrow>{uiTexts.editorial_015}</Eyebrow>
        <p>{uiTexts.editorial_016}</p>
      </section>
      <Next
        base={base}
        label={uiLabels.editorial_003}
        title={
          <>
            {uiTexts.editorial_017}
            <br />
            <em>{uiTexts.editorial_018}</em>
          </>
        }
        href="teknoloji/"
        cta={uiLabels.editorial_004}
      />
    </>
  );
}
export function Contact({ base }: { base: string }) {
  const c = copy.iletisim;
  const [copied, setCopied] = useState(false);
  const email = siteConfig.contactEmail;
  return (
    <>
      <section className="contact-hero wrap">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1>
          {c.title[0]}
          <br />
          <em>{c.title[1]}</em>
        </h1>
        <div className="contact-grid">
          <p className="contact-intro">{c.intro}</p>
          <div className="contact-channel">
            <span className="eyebrow">{uiTexts.editorial_019}</span>
            {email ? (
              <>
                <a className="email-link" href={`mailto:${email}`}>
                  {email}
                  <Arrow diagonal />
                </a>
                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(email)
                      .then(() => setCopied(true))
                      .catch(() => setCopied(false))
                  }
                >
                  {copied ? "E-posta kopyalandı" : "E-postayı kopyala"}
                </button>
                <span role="status">
                  {copied ? "Adres panoya kopyalandı." : ""}
                </span>
              </>
            ) : (
              <>
                <h2>{uiTexts.editorial_020}</h2>
                <p>{uiTexts.editorial_021}</p>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="contact-preparation wrap">
        <Eyebrow>{uiTexts.editorial_022}</Eyebrow>
        <h2>
          {uiTexts.editorial_023}
          <br />
          <em>{uiTexts.editorial_024}</em>
        </h2>
        <div>
          {uiLists.editorial_005.map(([t, p], i) => (
            <article key={t}>
              <span>
                {uiTexts.editorial_025}
                {i + 1}
              </span>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="contact-bottom wrap">
        <span className="contact-symbol" aria-hidden="true">
          {uiTexts.editorial_026}
        </span>
        <div>
          <h2>{uiTexts.editorial_027}</h2>
          <p>{uiTexts.editorial_028}</p>
          <Link href={base + "platform/"}>{uiTexts.editorial_029}</Link>
        </div>
      </section>
    </>
  );
}
export function Legal({
  base,
  type,
}: {
  base: string;
  type: "privacy" | "terms";
}) {
  const sections = legal[type];
  return (
    <section className="legal-page wrap">
      <Eyebrow>{uiTexts.editorial_030}</Eyebrow>
      <h1>{type === "privacy" ? "Gizlilik." : "Kullanım bilgileri."}</h1>
      <p className="legal-date">{uiTexts.editorial_031}</p>
      <div className="legal-content">
        {sections.map(([t, p]) => (
          <article key={t}>
            <h2>{t}</h2>
            <p>{p}</p>
          </article>
        ))}
      </div>
      <Link href={base + "iletisim/"}>{uiTexts.editorial_032}</Link>
    </section>
  );
}
export function Credits({ base }: { base: string }) {
  return (
    <section className="legal-page wrap">
      <Eyebrow>{uiTexts.editorial_033}</Eyebrow>
      <h1>{uiTexts.editorial_034}</h1>
      <p className="legal-intro">{uiTexts.editorial_035}</p>
      <div className="legal-content">
        <article>
          <h2>{uiTexts.editorial_036}</h2>
          <p>{uiTexts.editorial_037}</p>
          <a
            href="https://unsplash.com/photos/aerial-view-of-green-trees-and-brown-field-during-daytime-haO04L8LoaU"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {uiTexts.editorial_038}
            <Arrow diagonal />
          </a>
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {uiTexts.editorial_039}
            <Arrow diagonal />
          </a>
        </article>
        <article>
          <h2>{uiTexts.editorial_040}</h2>
          <p>{uiTexts.editorial_041}</p>
        </article>
        <article>
          <h2>{uiTexts.editorial_042}</h2>
          <p>{uiTexts.editorial_043}</p>
        </article>
        <article>
          <h2>{uiTexts.editorial_044}</h2>
          <p>{uiTexts.editorial_045}</p>
          <a
            href="https://github.com/google/fonts/tree/main/ofl/manrope"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {uiTexts.editorial_046}
            <Arrow diagonal />
          </a>
          <a
            href="https://github.com/google/fonts/tree/main/ofl/cormorantgaramond"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {uiTexts.editorial_047}
            <Arrow diagonal />
          </a>
        </article>
        <article>
          <h2>{uiTexts.editorial_048}</h2>
          <p>{uiTexts.editorial_049}</p>
        </article>
      </div>
      <Link href={base}>{uiTexts.editorial_050}</Link>
    </section>
  );
}
export function NotFound({ base }: { base: string }) {
  return (
    <section className="not-found wrap">
      <Eyebrow>{uiTexts.editorial_051}</Eyebrow>
      <span className="not-found-number" aria-hidden="true">
        {uiTexts.editorial_052}
      </span>
      <h1>
        {uiTexts.editorial_053}
        <br />
        <em>{uiTexts.editorial_054}</em>
      </h1>
      <p>{uiTexts.editorial_055}</p>
      <Link href={base} solid>
        {uiTexts.editorial_056}
      </Link>
    </section>
  );
}
