import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export const motion = { duration: .65, ease: "power2.out", depth: 24 } as const;
/** Every animation is scoped to the host; protected Journey scenes are never selected. */
export function useSceneMotion(host: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!host.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion:no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach(el => {
          gsap.fromTo(el, { y: motion.depth }, { y: -motion.depth, ease: "none", scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-ink]").forEach(el => {
          gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 40%", scrub: true } });
        });
      }, host);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [host]);
}
