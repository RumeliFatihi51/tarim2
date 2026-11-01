import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Landscape } from "./Cinematic";

/** Restores 674893d8c's field film, original four labels and 12→-12px scroll drift. */
export function FieldContext({ base, eager = false }: { base: string; eager?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion:no-preference)", () => {
      const points = host.current?.querySelector(".context-points");
      if (!points) return;
      gsap.fromTo(points, { y: 12 }, {
        y: -12, ease: "none",
        scrollTrigger: { trigger: points.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => media.revert();
  }, []);
  return (
    <div className="restored-field" ref={host}>
      <Landscape base={base} eager={eager} filiz />
      <p className="field-context-description">Parsel → Gözlem → Geçmiş → Dayanak. Filiz’in planlanan yaklaşımı, gözlemi parsel geçmişi ve dayanaklarıyla birlikte değerlendirmektir.</p>
    </div>
  );
}
