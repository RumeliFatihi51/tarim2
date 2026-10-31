import { uiLists, uiLabels } from "../content/section-copy";
import { uiTexts } from "../content/interface";
import { copy, workflow, future } from "../content/site";
import { Eyebrow, Link, Media, SectionHeading } from "../components/ui";
import { Temporal, Evidence } from "../sections/Cinematics";
import { Next } from "./Home";
export function Platform({ base }: { base: string }) {
  const c = copy.platform;
  return (
    <>
      <section className="platform-hero wrap">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <div className="platform-hero-heading">
          <h1>
            {c.title[0]}
            <br />
            <em>{c.title[1]}</em>
          </h1>
          <p>{c.intro}</p>
        </div>
        <div className="platform-photo">
          <Media base={base} name="terrain" alt={uiTexts.platform_001} eager />
          <span className="platform-photo-text">{uiTexts.platform_002}</span>
          <span className="photo-label">{uiTexts.platform_003}</span>
        </div>
        <p className="source-note">{c.note}</p>
      </section>
      <section className="workflow wrap">
        <SectionHeading
          eyebrow={uiLabels.platform_001}
          title={
            <>
              {uiTexts.platform_004}
              <br />
              <em>{uiTexts.platform_005}</em>
            </>
          }
          body={uiLabels.platform_002}
        />
        <div className="workflow-list">
          {workflow.map((w) => (
            <article key={w.n}>
              <span>{w.n}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="wrap">
        <Temporal base={base} />
      </div>
      <div className="wrap">
        <Evidence base={base} />
      </div>
      <section className="future wrap">
        <Eyebrow>{uiTexts.platform_006}</Eyebrow>
        <h2>
          {uiTexts.platform_007}
          <br />
          <em>{uiTexts.platform_008}</em>
        </h2>
        <div>
          {future.map((f) => (
            <article key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <span>{uiTexts.platform_009}</span>
            </article>
          ))}
        </div>
        <p className="source-note">{uiTexts.platform_010}</p>
      </section>
      <Next
        base={base}
        label={uiLabels.platform_003}
        title={
          <>
            {uiTexts.platform_011}
            <br />
            <em>{uiTexts.platform_012}</em>
          </>
        }
        href="filiz/"
        cta={uiLabels.platform_004}
      />
    </>
  );
}
