import { uiLists, uiLabels } from "../content/section-copy";
import { uiTexts } from "../content/interface";
import { copy, sources, indexGroups, indexNotes } from "../content/site";
import { Eyebrow, Arrow, Media, SectionHeading } from "../components/ui";
import { Strata } from "../sections/Cinematics";
import { Next } from "./Home";
export function Technology({ base }: { base: string }) {
  const c = copy.teknoloji;
  return (
    <>
      <section className="technology-hero wrap">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1>
          {c.title[0]}
          <br />
          <em>{c.title[1]}</em>
        </h1>
        <div className="technology-hero-bottom">
          <p>{c.intro}</p>
          <span>{uiTexts.technology_001}</span>
        </div>
        <div className="technology-art">
          <Media base={base} name="strata" alt={uiTexts.technology_002} eager />
          <span>{uiTexts.technology_003}</span>
          <small>{uiTexts.technology_004}</small>
        </div>
      </section>
      <section className="source-section wrap">
        <SectionHeading
          eyebrow={uiLabels.technology_001}
          title={
            <>
              {uiTexts.technology_005}
              <br />
              <em>{uiTexts.technology_006}</em>
            </>
          }
          body={uiLabels.technology_002}
        />
        <div>
          {sources.map((s, i) => (
            <article className="source-row" key={s.title}>
              <span className="source-n">
                {uiTexts.technology_007}
                {i + 1}
              </span>
              <div>
                <span className="eyebrow">{s.type}</span>
                <h3>{s.title}</h3>
              </div>
              <p>
                {s.text}
                <small>{s.status}</small>
              </p>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${s.title} resmî dokümantasyonu, yeni sekmede`}
              >
                <Arrow diagonal />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="quality-section wrap">
        <div>
          <Eyebrow>{uiTexts.technology_008}</Eyebrow>
          <h2>
            {uiTexts.technology_009}
            <br />
            <em>{uiTexts.technology_010}</em>
          </h2>
        </div>
        <div className="quality-list">
          {uiLists.technology_003.map(([t, p]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="indices-section wrap">
        <SectionHeading
          eyebrow={uiLabels.technology_004}
          title={
            <>
              {uiTexts.technology_011}
              <br />
              <em>{uiTexts.technology_012}</em>
            </>
          }
          body={uiLabels.technology_005}
        />
        <div className="index-notes">
          {indexNotes.map((n) => (
            <article key={n.name}>
              <h3>{n.name}</h3>
              <p>{n.text}</p>
            </article>
          ))}
        </div>
        <div className="index-catalog">
          {indexGroups.map((g) => (
            <article key={g.title}>
              <div>
                <h3>{g.title}</h3>
                <p>{g.description}</p>
              </div>
              <p className="index-names">{g.items.join(" · ")}</p>
            </article>
          ))}
        </div>
        <p className="source-note">{uiTexts.technology_013}</p>
      </section>
      <section className="bands-section wrap">
        <Eyebrow>{uiTexts.technology_014}</Eyebrow>
        <div className="bands-grid">
          <article>
            <h2>{uiTexts.technology_015}</h2>
            <p>{uiTexts.technology_016}</p>
            <div className="band-names">{uiTexts.technology_017}</div>
          </article>
          <article>
            <h2>{uiTexts.technology_018}</h2>
            <p>{uiTexts.technology_019}</p>
            <div className="band-names">{uiTexts.technology_020}</div>
          </article>
        </div>
        <a
          className="text-link"
          href="https://documentation.dataspace.copernicus.eu/Data/SentinelMissions/Sentinel2.html"
          target="_blank"
          rel="noreferrer"
        >
          {uiTexts.technology_021}
          <Arrow diagonal />
        </a>
      </section>
      <section className="distinction wrap">
        <Eyebrow>{uiTexts.technology_022}</Eyebrow>
        <h2>
          {uiTexts.technology_023}
          <br />
          <em>{uiTexts.technology_024}</em>
        </h2>
        <p>{uiTexts.technology_025}</p>
      </section>
      <Next
        base={base}
        label={uiLabels.technology_006}
        title={
          <>
            {uiTexts.technology_026}
            <br />
            <em>{uiTexts.technology_027}</em>
          </>
        }
        href="platform/"
        cta={uiLabels.technology_007}
      />
    </>
  );
}
