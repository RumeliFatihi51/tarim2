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
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Mark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M6 28 17 9c1.4-2.4 4.6-2.4 6 0l11 19c1.3 2.2-.3 5-2.9 5H8.9C6.3 33 4.7 30.2 6 28Z"
        fill="currentColor"
      />
      <path
        d="M12 27h16M15 21h10M18 15h4"
        stroke="var(--paper,#f7f8f2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function Icon({ name = "satellite" }: { name?: string }) {
  const paths: Record<string, ReactNode> = {
    satellite: (
      <>
        <path d="m9 9 6 6m-8-5 3-3 7 7-3 3zM2 6l4-4 4 4-4 4zM14 18l4-4 4 4-4 4zM14 4a6 6 0 0 1 6 6m-6-3a3 3 0 0 1 3 3" />
      </>
    ),
    layers: (
      <>
        <path d="m3 8 9-5 9 5-9 5zM3 12l9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="7" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    time: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    leaf: (
      <>
        <path d="M19 4C7 3 2 8 6 15c5 6 14 1 13-11ZM6 20 16 9M9 16v-5m0 5h5" />
      </>
    ),
    evidence: (
      <>
        <path d="M7 3h8l4 4v14H5V3h2m8 0v5h4M8 12h8m-8 4h5" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.target}
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
      {num ? <span className="index">{num} /</span> : null}
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
        media="(max-width:600px)"
        srcSet={`${base}media/${name}-mobile.webp`}
      />
      <img
        src={`${base}media/${name}.webp`}
        alt={alt}
        width="1536"
        height="1024"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
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
      {body ? <p>{body}</p> : null}
    </div>
  );
}
