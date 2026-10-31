import { uiLists, uiLabels } from "../content/section-copy";
import { uiTexts } from "../content/interface";
import { copy, filizContexts } from "../content/site";
import { Eyebrow, Link, SectionHeading } from "../components/ui";
import { FilizScene } from "../sections/Cinematics";
import { Next } from "./Home";
export function Filiz({ base }: { base: string }) {
  const c = copy.filiz;
  return (
    <>
      <section className="filiz-hero wrap">
        <div className="filiz-hero-text">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1>
            {c.title}
            <span aria-hidden="true">{uiTexts.filiz_001}</span>
          </h1>
          <h2>{c.subtitle}</h2>
          <p>{c.intro}</p>
          <a className="text-link" href="#filiz-yaklasimi">
            {uiTexts.filiz_002}
            <span aria-hidden="true">{uiTexts.filiz_003}</span>
          </a>
        </div>
        <FilizScene base={base} hero />
      </section>
      <section id="filiz-yaklasimi" className="filiz-statement wrap">
        <Eyebrow>{uiTexts.filiz_004}</Eyebrow>
        <h2>
          {uiTexts.filiz_005}
          <br />
          <em>{uiTexts.filiz_006}</em>
        </h2>
        <p>{uiTexts.filiz_007}</p>
      </section>
      <section className="filiz-contexts wrap">
        <Eyebrow>{uiTexts.filiz_008}</Eyebrow>
        <div>
          {filizContexts.map((c, i) => (
            <article key={c.title}>
              <span>
                {uiTexts.filiz_009}
                {i + 1}
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="filiz-reliability wrap">
        <SectionHeading
          eyebrow={uiLabels.filiz_001}
          title={
            <>
              {uiTexts.filiz_010}
              <br />
              <em>{uiTexts.filiz_011}</em>
            </>
          }
          body={uiLabels.filiz_002}
        />
        <div className="reliability-list">
          {uiLists.filiz_003.map(([t, p], i) => (
            <article key={t}>
              <span>
                {uiTexts.filiz_012}
                {i + 1}
              </span>
              <div>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="filiz-status wrap">
        <span className="status-dot" />
        <div>
          <Eyebrow>{uiTexts.filiz_013}</Eyebrow>
          <h3>{uiTexts.filiz_014}</h3>
          <p>{uiTexts.filiz_015}</p>
        </div>
        <Link href={base + "platform/"}>{uiTexts.filiz_016}</Link>
      </section>
      <Next
        base={base}
        label={uiLabels.filiz_004}
        title={
          <>
            {uiTexts.filiz_017}
            <br />
            <em>{uiTexts.filiz_018}</em>
          </>
        }
        href="teknoloji/"
        cta={uiLabels.filiz_005}
      />
    </>
  );
}
