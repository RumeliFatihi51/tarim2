import { Media } from "./ui";
import { Film } from "./Film";
import { orbitalCopy as c } from "../content/orbital";
import { Icon } from "./ui";
export function Orbit({
  base,
  eager = false,
  close = false,
}: {
  base: string;
  eager?: boolean;
  close?: boolean;
}) {
  return (
    <div
      className={`orbital-stage ${close ? "orbital-close" : ""}`}
      data-orbit={close ? "close" : "wide"}
    >
      <Film base={base} name="orbit" eager={eager} />
      <div className="scene-heading">
        <span className="scene-dot" />
        {c.orbit.top}
        <span className="scene-ordinal">01 / EO</span>
      </div>
      <div className="scene-footer">
        <div>
          <Icon name="satellite" />
          <span>
            {c.orbit.bottom}
            <small>{c.orbit.note}</small>
          </span>
        </div>
        <span className="scene-motion-label" aria-hidden="true">
          {c.orbit.detail}
        </span>
      </div>
      <button
        type="button"
        className="scene-toggle"
        aria-label={c.labels.scenePause}
        aria-pressed="false"
        hidden
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M4 3h3v10H4zm5 0h3v10H9z" />
        </svg>
      </button>
    </div>
  );
}
export function Landscape({
  base,
  eager = false,
  filiz = false,
  scene,
  still = false,
}: {
  base: string;
  eager?: boolean;
  filiz?: boolean;
  scene?: { name: string; alt: string; note?: string };
  still?: boolean;
}) {
  return (
    <div
      className={`landscape-stage ${filiz ? "filiz-landscape" : ""}`}
      data-landscape
    >
      {still && scene ? (
        <Media
          base={base}
          name={scene.name}
          alt={scene.alt}
          eager={eager}
          className="stage1-media"
        />
      ) : (
        <Film
          base={base}
          name={scene?.name || "field"}
          alt={scene?.alt}
          eager={eager}
        />
      )}
      <div className="landscape-label">
        <Icon name={filiz ? "leaf" : "target"} />
        <span>{filiz ? "FİLİZ / BAĞLAM ODAKLI AI" : c.field.label}</span>
      </div>
      {filiz ? (
        <div className="context-points" aria-hidden="true">
          <span className="context-point point-1">
            <i />
            Parsel
          </span>
          <span className="context-point point-2">
            <i />
            Gözlem
          </span>
          <span className="context-point point-3">
            <i />
            Geçmiş
          </span>
          <span className="context-point point-4">
            <i />
            Dayanak
          </span>
          <svg viewBox="0 0 600 500" preserveAspectRatio="none">
            <path d="M130 120Q370 50 440 210T280 390Q80 420 130 120" />
          </svg>
        </div>
      ) : null}
      <div className="landscape-caption">{scene?.note || c.field.note}</div>
    </div>
  );
}
