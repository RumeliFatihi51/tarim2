import { useEffect, useRef, useState } from "react";
import { experience } from "../content/experience";
/** Real encoded Blender footage, poster-first, paused offscreen and on reduced motion. */
export function Film({
  base,
  name,
  className = "",
  eager = false,
}: {
  base: string;
  name: string;
  className?: string;
  eager?: boolean;
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
      obs.disconnect();
      document.removeEventListener("agromax-menu", menuChange);
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      v.pause();
    };
  }, [paused]);
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
          alt={experience.filmLabels.note}
          width="1024"
          height="640"
          loading={eager ? "eager" : "lazy"}
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
        aria-label={
          paused ? experience.filmLabels.play : experience.filmLabels.pause
        }
      >
        {paused ? "▶" : "Ⅱ"}
      </button>
    </div>
  );
}
