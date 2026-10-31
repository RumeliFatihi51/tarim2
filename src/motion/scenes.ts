import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/** Native scroll remains in control. No hidden content or compulsory intro. */
export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  const base =
    document.getElementById("root")?.dataset.base || import.meta.env.BASE_URL;
  mm.add("(prefers-reduced-motion:no-preference)", () => {
    const cleanups: (() => void)[] = [];
    let alive = true;
    const wide = matchMedia("(min-width:900px)");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          import("../scenes/orbital")
            .then((m) => m.mountOrbit(entry.target as HTMLElement, base))
            .then((cleanup) => {
              if (cleanup) {
                if (alive && wide.matches) cleanups.push(cleanup);
                else cleanup();
              }
            })
            .catch(() => {});
        }),
      { rootMargin: "100px" },
    );
    // Reconsider GPU use when a tablet rotates or a desktop window is resized.
    const responsiveScene = () => {
      if (wide.matches)
        document
          .querySelectorAll<HTMLElement>("[data-orbit]")
          .forEach((el) => observer.observe(el));
      else {
        observer.disconnect();
        cleanups.splice(0).forEach((fn) => fn());
      }
    };
    wide.addEventListener("change", responsiveScene);
    responsiveScene();
    document
      .querySelectorAll<HTMLElement>(
        ".workflow-list article,.quality-list article",
      )
      .forEach((el) => {
        gsap.fromTo(
          el,
          { borderColor: "#d8dfd5" },
          {
            borderColor: "#5c7d4c",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              end: "top 30%",
              scrub: true,
            },
          },
        );
      });
    document.querySelectorAll<HTMLElement>(".context-points").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 12 },
        {
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => {
      alive = false;
      wide.removeEventListener("change", responsiveScene);
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  const onHide = (e: PageTransitionEvent) => {
    if (!e.persisted) {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("pagehide", onHide);
    }
  };
  window.addEventListener("pagehide", onHide);
  return () => mm.revert();
}
