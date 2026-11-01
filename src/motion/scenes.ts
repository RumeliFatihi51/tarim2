import { journeySourceFrame, journeySourceFps } from "../content/journey-clock";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  const base =
    document.getElementById("root")?.dataset.base || import.meta.env.BASE_URL;
  mm.add("(prefers-reduced-motion:no-preference)", () => {
    let alive = true,
      epoch = 0;
    const stops = new Map<HTMLElement, () => void>();
    const wide = matchMedia("(min-width:900px)");
    const film = (el: HTMLElement) => {
      if (!alive || el.dataset.filmMounted === "true") return () => {};
      el.dataset.filmMounted = "true";
      const v = el.querySelector<HTMLVideoElement>("video");
      if (!v) return () => {};
      const source = (webm: boolean) =>
        wide.matches
          ? (webm ? v.dataset.wideWebm! : v.dataset.wideMp4!)
          : (webm ? v.dataset.webm! : v.dataset.mp4!);
      v.src = source(Boolean(v.canPlayType("video/webm")));
      v.load();
      let pending = false,
        dead = false;
      const seek = () => {
        if (pending || dead || document.hidden) return;
        pending = true;
        requestAnimationFrame(() => {
          pending = false;
          if (dead) return;
          const section = el.closest<HTMLElement>(".journey")!,
            rect = section.getBoundingClientRect(),
            p = Math.max(
              0,
              Math.min(1, -rect.top / (rect.height - innerHeight)),
            );
          if (!Number.isFinite(v.duration) || v.seeking) return;
          const t = Math.min(v.duration - 0.05, journeySourceFrame(p) / journeySourceFps);
          if (Math.abs(v.currentTime - t) > 0.05) v.currentTime = t;
          else if (v.readyState >= 2) el.classList.add("film-world-ready");
        });
      };
      const ready = () => {
        // A late initial load must seek to the current phase before being revealed.
        seek();
      };
      const error = () => {
        el.classList.remove("film-world-ready");
        if (v.src.endsWith(".webm")) {
          v.src = source(false);
          v.load();
        }
      };
      v.addEventListener("loadeddata", ready);
      v.addEventListener("seeked", seek);
      v.addEventListener("error", error);
      addEventListener("scroll", seek, { passive: true });
      addEventListener("resize", seek);
      return () => {
        dead = true;
        el.dataset.filmMounted = "false";
        removeEventListener("scroll", seek);
        removeEventListener("resize", seek);
        v.removeEventListener("seeked", seek);
        v.removeEventListener("loadeddata", ready);
        v.removeEventListener("error", error);
        v.pause();
        el.classList.remove("film-world-ready");
      };
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          observer.unobserve(e.target);
          const el = e.target as HTMLElement,
            version = epoch;
          let stopFilm: (() => void) | undefined,
            stopWorld: (() => void) | undefined;
          const fallback = () => {
            if (!stopFilm && alive) stopFilm = film(el);
          };
          el.addEventListener("world-fallback", fallback);
          const timeout = window.setTimeout(() => {
            if (!el.classList.contains("world-ready")) fallback();
          }, 8000);
          if (wide.matches)
            import("../scenes/world")
              .then((m) => m.mountWorld(el, base))
              .then((fn) => {
                if (!alive || epoch !== version) {
                  fn?.();
                  return;
                }
                stopWorld = fn;
                // Same scroll-seek controller supplies the authored macro close-up.
                // CSS reveals it only around the plant phase when WebGL is present.
                fallback();
              })
              .catch(fallback);
          else fallback();
          stops.set(el, () => {
            clearTimeout(timeout);
            el.removeEventListener("world-fallback", fallback);
            stopFilm?.();
            stopWorld?.();
          });
        }),
      { rootMargin: "200px" },
    );
    const boot = () => {
      epoch++;
      observer.disconnect();
      stops.forEach((fn) => fn());
      stops.clear();
      document
        .querySelectorAll<HTMLElement>("[data-world]")
        .forEach((el) => observer.observe(el));
    };
    wide.addEventListener("change", boot);
    boot();
    document
      .querySelectorAll<HTMLElement>(
        ".workflow-list article,.quality-list article",
      )
      .forEach((el) =>
        gsap.fromTo(
          el,
          { borderColor: "#d8dfd5" },
          {
            borderColor: "#5c7d4c",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              end: "top 30%",
              scrub: true,
            },
          },
        ),
      );
    return () => {
      alive = false;
      epoch++;
      observer.disconnect();
      wide.removeEventListener("change", boot);
      stops.forEach((fn) => fn());
    };
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  const leave = (e: PageTransitionEvent) => {
    if (!e.persisted) mm.revert();
  };
  addEventListener("pagehide", leave);
  return () => {
    mm.revert();
    removeEventListener("pagehide", leave);
  };
}
