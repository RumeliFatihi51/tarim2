import { Film } from "../components/Film";
import { uiLists, uiLabels } from "../content/section-copy";
import { uiTexts } from "../content/interface";
import { Media, Eyebrow, Link } from "../components/ui";
export function Observation({
  base,
  compact = false,
}: {
  base: string;
  compact?: boolean;
}) {
  return (
    <figure
      className={`observation cinematic ${compact ? "compact" : ""}`}
      data-scene="observation"
    >
      <div className="observation-frame">
        <Media base={base} name="earth" alt={uiTexts.cinematics_001} eager />
        <div className="observation-shade" />
        <div className="optical-reticle" aria-hidden="true">
          <span />
          <span />
          <i />
          <b />
        </div>
        <div className="observation-type" aria-hidden="true">
          <span>{uiTexts.cinematics_002}</span>
          <span>{uiTexts.cinematics_003}</span>
          <span>{uiTexts.cinematics_004}</span>
        </div>
        <span className="image-corner">{uiTexts.cinematics_005}</span>
        <div className="image-scene-index" aria-hidden="true">
          {uiTexts.cinematics_006}
        </div>
      </div>
      <figcaption>
        <span>{uiTexts.cinematics_007}</span>
        <span>{uiTexts.cinematics_008}</span>
      </figcaption>
    </figure>
  );
}
export function Strata({
  base,
  full = false,
}: {
  base: string;
  full?: boolean;
}) {
  return (
    <section
      className={`strata-section cinematic ${full ? "full" : ""}`}
      data-scene="strata"
    >
      <div className="strata-copy">
        <Eyebrow num="02">{uiTexts.cinematics_009}</Eyebrow>
        <h2>
          {uiTexts.cinematics_010}
          <br />
          <em>{uiTexts.cinematics_011}</em>
        </h2>
        <p>{uiTexts.cinematics_012}</p>
        <Link href={base + "teknoloji/"}>{uiTexts.cinematics_013}</Link>
      </div>
      <div className="strata-art">
        <Media base={base} name="strata" alt={uiTexts.cinematics_014} />
        <div className="strata-folio" aria-hidden="true">
          <span>{uiTexts.cinematics_015}</span>
          <span>{uiTexts.cinematics_016}</span>
          <span>{uiTexts.cinematics_017}</span>
        </div>
        <svg
          className="strata-orbit"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="300"
            cy="300"
            rx="260"
            ry="210"
            stroke="currentColor"
            strokeWidth=".7"
            strokeDasharray="2 8"
          />
        </svg>
        <span className="art-caption">{uiTexts.cinematics_018}</span>
      </div>
    </section>
  );
}
export function FilizScene({
  base,
  hero = false,
}: {
  base: string;
  hero?: boolean;
}) {
  return (
    <div
      className={`filiz-art cinematic ${hero ? "hero-art" : ""}`}
      data-scene="filiz-film"
    >
      <Film base={base} name="filiz-motion" eager={hero} />
      <span className="art-caption">Filiz / Bağlam üzerine görsel anlatı</span>
    </div>
  );
}
export function Temporal({ base }: { base: string }) {
  return (
    <section className="temporal cinematic v2-temporal">
      <div className="temporal-header">
        <Eyebrow num="03">GÖZLEMİ BİR ARADA DÜŞÜNMEK</Eyebrow>
        <p>
          Kaynak, zaman ve bağlam.
          <br />
          Aynı çerçevede.
        </p>
      </div>
      <Film base={base} name="loom" />
      <div className="temporal-footer">
        <span>KAYNAK · GÖZLEM · BAĞLAM</span>
        <p>
          Bu kompozisyon verinin bağlama dönüşmesini temsil eder; gerçek parsel
          veya zamansal ölçüm göstermez.
        </p>
      </div>
    </section>
  );
}
export function Evidence({ base }: { base: string }) {
  return (
    <section className="evidence cinematic" data-scene="evidence">
      <div className="evidence-intro">
        <Eyebrow num="05">{uiTexts.cinematics_034}</Eyebrow>
        <h2>
          {uiTexts.cinematics_035}
          <br />
          <em>{uiTexts.cinematics_036}</em>
        </h2>
        <p>{uiTexts.cinematics_037}</p>
      </div>
      <div className="evidence-visual">
        <Media base={base} name="evidence" alt={uiTexts.cinematics_038} />
        <svg
          viewBox="0 0 1000 100"
          className="evidence-path"
          aria-hidden="true"
        >
          <path
            d="M0 50C150 50 160 10 300 10S450 90 550 50 700 50 1000 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <ol className="evidence-steps">
        {uiLists.cinematics_001.map((s, i) => (
          <li key={s}>
            <span>
              {uiTexts.cinematics_039}
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </section>
  );
}
