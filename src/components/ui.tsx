import { uiTexts } from "../content/interface";
import type { ReactNode } from "react";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
export function Mark() {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M3 29 18 4l15 25M8 29 18 12l10 17M12 29l6-9 6 9M5 23c8 3 18 3 26 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Link({
  href,
  children,
  className = "",
  solid = false,
  diagonal = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  solid?: boolean;
  diagonal?: boolean;
}) {
  return (
    <a href={href} className={`${solid ? "button" : "text-link"} ${className}`}>
      <span>{children}</span>
      <Arrow diagonal={diagonal} />
    </a>
  );
}
export function Eyebrow({
  children,
  num,
}: {
  children: ReactNode;
  num?: string;
}) {
  return (
    <div className="eyebrow">
      {num && (
        <span className="index">
          {num} {uiTexts.ui_001}
        </span>
      )}
      {children}
    </div>
  );
}
export function Media({
  base,
  name,
  alt,
  className = "",
  eager = false,
}: {
  base: string;
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <picture className={className}>
      <source
        media="(max-width: 600px)"
        srcSet={`${base}media/${name}-mobile.webp`}
      />
      <img
        src={`${base}media/${name}.webp`}
        alt={alt}
        width={name === "earth" ? 2400 : 1500}
        height={name === "earth" ? 1600 : 1200}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding={eager ? "sync" : "async"}
      />
    </picture>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
