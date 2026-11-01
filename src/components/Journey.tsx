import { stage1 } from "../content/stage1";
import { useEffect, useRef, useState } from "react";
import { Film } from "./Film";
import { Media, Link } from "./ui";
export const journeyPhases = [
  [
    "Başlangıç",
    "Bir gezegenden.",
    "Büyük resmi görmek, yeryüzündeki yaşamı anlamakla başlar.",
  ],
  [
    "Atmosfer",
    "Mesafeyi geride bırak.",
    "Aynı yeryüzüne, giderek daha yakından bakıyoruz.",
  ],
  [
    "Arazi",
    "Her parselin bir bağlamı var.",
    "Toprak, bitki ve çevre; aynı coğrafyanın farklı parçaları.",
  ],
  [
    "Gözlem",
    "Yüzeyin ötesini oku.",
    "Kavramsal gözlem katmanı. Renkler gerçek ölçüm veya analiz sonucu değildir.",
  ],
  [
    "Yaşam",
    "Bir yaprağa kadar.",
    "Uzaktan gözlemin odağında yaşayan bir tarımsal çevre var.",
  ],
  [
    "Yeryüzü",
    "Toprağın ötesini gör.",
    "AgroMax. Gözlemden bağlama, bağlamdan değerlendirmeye.",
  ],
];
export function WorldOpening({ base }: { base: string }) {
  return (
    <section className="world-opening">
      <Film base={base} name={stage1.home.name} alt={stage1.home.alt} eager />
      <div className="world-shade" />
      <div className="world-opening-top">
        <span>AGROMAX / TARIMSAL ZEKA</span>
        <span>GÖZLEMİN ÖTESİNDE</span>
      </div>
      <div className="world-title">
        <span className="eyebrow">UYDU TABANLI TARIMSAL GÖZLEM</span>
        <h1>
          Yüzeyin
          <br />
          <span>ötesini gör.</span>
        </h1>
        <div>
          <p>
            Bir görüntüden, yaşayan bir coğrafyaya.
            <br />
            Uydu gözlemi, parsel geçmişi ve bağlamı birlikte düşün.
          </p>
          <Link href={base + "platform/"} solid>
            AgroMax’ı keşfet
          </Link>
        </div>
      </div>
      <div className="world-bottom">
        <a href="#perspektif">
          YERYÜZÜNÜ KEŞFET <span>↓</span>
        </a>
        <span>Kavramsal tarımsal çevre · Ürün tanıtımı</span>
      </div>
    </section>
  );
}
export function Journey({ base }: { base: string }) {
  const host = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const h = host.current!;
    let last = -1;
    const sync = () => {
      const r = h.getBoundingClientRect(),
        p = Math.max(
          0,
          Math.min(1, -r.top / Math.max(1, r.height - innerHeight)),
        );
      h.style.setProperty("--journey-progress", String(p));
      const n = Math.min(5, Math.round(p * 5));
      if (n !== last) {
        last = n;
        setPhase(n);
      }
    };
    addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    sync();
    return () => {
      removeEventListener("scroll", sync);
      removeEventListener("resize", sync);
    };
  }, []);
  const seek = (n: number) => {
    const h = host.current!;
    scrollTo({
      top:
        scrollY +
        h.getBoundingClientRect().top +
        ((h.offsetHeight - innerHeight) * n) / 5,
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <section
      className="journey"
      id="yeryuzune-yolculuk"
      ref={host}
      aria-label="Yeryüzüne Yolculuk: gezegenden bitkiye altı aşamalı kavramsal anlatım"
    >
      <div className="journey-sticky" data-world="journey">
        <picture>
          <source
            media="(prefers-reduced-motion:reduce) and (max-width:899px)"
            srcSet={base + "media/stage1/journey-reveal-mobile.webp"}
          />
          <source
            media="(prefers-reduced-motion:reduce)"
            srcSet={base + "media/stage1/journey-reveal.webp"}
          />
          <source
            media="(max-width:899px)"
            srcSet={base + "media/stage1/journey-origin-mobile.webp"}
          />
          <img
            src={base + "media/stage1/journey-origin.webp"}
            alt="Yeryüzüne Yolculuk: kavramsal gezegen ve tarımsal çevre."
            width="960"
            height="600"
            loading="lazy"
          />
        </picture>
        <video
          className="journey-film"
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          data-webm={base + "media/stage1/journey-mobile.webm"}
          data-mp4={base + "media/stage1/journey-mobile.mp4"}
          data-wide-webm={base + "media/stage1/journey.webm"}
          data-wide-mp4={base + "media/stage1/journey.mp4"}
        />
        <Media
          base={base}
          name="stage1/journey-reveal"
          className="journey-reveal"
          alt="Yolculuğun sonunda sabah ışığına açılan geniş tarımsal peyzaj."
        />
        <div className="world-shade" />
        <div className="journey-top">
          <span>YERYÜZÜNE YOLCULUK</span>
          <a href="#yolculuk-sonu">Anlatımı geç ↘</a>
        </div>
        <div className="journey-copy" key={phase}>
          <span className="eyebrow">
            0{phase + 1} / {journeyPhases[phase][0].toLocaleUpperCase("tr")}
          </span>
          <h2>{journeyPhases[phase][1]}</h2>
          <p>{journeyPhases[phase][2]}</p>
          {phase === 5 ? (
            <Link href={base + "platform/"} solid>
              Platformu keşfet
            </Link>
          ) : null}
        </div>
        <nav className="journey-nav" aria-label="Yolculuk aşamaları">
          {journeyPhases.map((x, i) => (
            <button
              key={x[0]}
              onClick={() => seek(i)}
              aria-label={x[0] + " aşamasına git"}
              aria-current={phase === i ? "step" : undefined}
            >
              <span>0{i + 1}</span>
              <i />
              <small>{x[0]}</small>
            </button>
          ))}
        </nav>
        <span className="journey-note">
          Kavramsal prodüksiyon · Canlı uydu analizi değildir.
        </span>
      </div>
      <ol className="journey-transcript">
        {journeyPhases.map((x) => (
          <li key={x[0]}>
            <strong>{x[1]}</strong> {x[2]}
          </li>
        ))}
      </ol>
    </section>
  );
}
