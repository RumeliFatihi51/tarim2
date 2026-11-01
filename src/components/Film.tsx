import { useEffect, useRef, useState } from "react";
import { orbitalCopy } from "../content/orbital";
/** Encoded Blender production (3D or authored 2.5D), poster-first and paused offscreen. */
export function Film({
  base,
  name,
  className = "",
  eager = false,
  alt,
}: {
  base: string;
  name: string;
  className?: string;
  eager?: boolean;
  alt?: string;
}) {
  const host = useRef<HTMLDivElement>(null),
    video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = video.current,
      h = host.current;
    if (!v || !h) return;
    const media = matchMedia("(prefers-reduced-motion:reduce)");
    let visible = false,
      menuBlocked = false;
    let loaded = Boolean(v.querySelector("source[src]"));
    // Give the desktop WebGL scene first chance; don't fetch an invisible film.
    let waitingForScene =
      !loaded && innerWidth >= 900 && Boolean(h.closest("[data-orbit]"));
    const fallbackTimer = window.setTimeout(() => {
      waitingForScene = false;
      sync();
    }, 1500);
    const ensureSources = () => {
      if (loaded) return;
      v.querySelectorAll<HTMLSourceElement>("source").forEach((source) => {
        source.src =
          innerWidth < 768 ? source.dataset.mobile! : source.dataset.desktop!;
      });
      v.load();
      loaded = true;
    };
    const sync = () => {
      if (
        visible &&
        !menuBlocked &&
        !waitingForScene &&
        !paused &&
        !media.matches &&
        !document.hidden &&
        !h.closest(".webgl-active")
      ) {
        ensureSources();
        v.play().catch(() => setReady(false));
      } else v.pause();
    };
    const menuChange = (e: Event) => {
      menuBlocked = (e as CustomEvent<boolean>).detail;
      sync();
    };
    document.addEventListener("agromax-menu", menuChange);
    document.addEventListener("agromax-scene", sync);
    const obs = new IntersectionObserver(
      (es) => {
        visible = es[0].isIntersecting && es[0].intersectionRatio >= 0.05;
        sync();
      },
      { rootMargin: "0px", threshold: 0.05 },
    );
    obs.observe(h);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearTimeout(fallbackTimer);
      obs.disconnect();
      document.removeEventListener("agromax-menu", menuChange);
      document.removeEventListener("agromax-scene", sync);
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      v.pause();
    };
  }, [paused, name]);
  return (
    <div
      ref={host}
      className={`film ${ready ? "film-ready" : ""} ${className}`}
    >
      <picture>
        <source
          media="(max-width:767px)"
          srcSet={`${base}media/${name}-poster-mobile.webp`}
        />
        <img
          src={`${base}media/${name}-poster.webp`}
          alt={
            alt ||
            (name === "orbit"
              ? orbitalCopy.labels.orbitAlt
              : orbitalCopy.labels.fieldAlt)
          }
          width="1024"
          height="640"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
        />
      </picture>
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={() => setReady(true)}
        onError={() => setReady(false)}
      >
        <source
          type="video/webm"
          data-desktop={`${base}media/${name}.webm`}
          data-mobile={`${base}media/${name}-mobile.webm`}
        />
        <source
          type="video/mp4"
          data-desktop={`${base}media/${name}.mp4`}
          data-mobile={`${base}media/${name}-mobile.mp4`}
        />
      </video>
      <button
        className="film-toggle"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? orbitalCopy.labels.play : orbitalCopy.labels.pause}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={paused ? "m5 3 8 5-8 5z" : "M4 3h3v10H4zm5 0h3v10H9z"} />
        </svg>
      </button>
    </div>
  );
}
