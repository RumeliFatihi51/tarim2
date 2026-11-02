import { QualityStudy } from "../cinema/QualityStudy";
import { BandStudy } from "../phase2/BandStudy";
import { stage1 } from "../content/stage1";
import { sources, indexGroups, indexNotes } from "../content/site";
import { uiLists } from "../content/section-copy";
import { Eyebrow, Arrow, Link } from "../components/ui";
import { Landscape } from "../components/Cinematic";
import { Next } from "./Home";
export function Technology({ base }: { base: string }) {
  return (
    <>
      <section className="technology-hero">
        <div className="technology-copy">
          <Eyebrow>UZAKTAN ALGILAMA TEKNOLOJİSİ</Eyebrow>
          <h1>
            Gözlemin
            <br />
            <span>arkasındaki bilim.</span>
          </h1>
          <p>
            Farklı dalga boyları, farklı izler. Bir değerlendirme; verinin ne
            gösterdiğini ve sınırlarının nerede başladığını bilmekle güçlenir.
          </p>
          <Link href="#gozlem-kaynaklari">Kaynakları keşfet</Link>
          <span className="technology-sub">
            UYDU · SPEKTRAL BİLGİ · ZAMAN · KALİTE
          </span>
        </div>
        <Landscape base={base} eager scene={stage1.technology} />
      </section>
      <section
        id="gozlem-kaynaklari"
        className="source-section wrap section-space"
      >
        <div className="split-heading">
          <div>
            <Eyebrow>DÜNYA GÖZLEM KAYNAKLARI</Eyebrow>
            <h2>
              Aynı yeryüzü.
              <br />
              Farklı pencereler.
            </h2>
          </div>
          <p>
            Bu kaynaklar yöntem çerçevesini anlatır. Listelenmeleri canlı
            entegrasyon veya hizmet ortaklığı anlamına gelmez.
          </p>
        </div>
        <div className="source-list">
          {sources.map((s, i) => (
            <article key={s.title}>
              <span className="item-index">0{i + 1}</span>
              <div>
                <Eyebrow>{s.type}</Eyebrow>
                <h3>{s.title}</h3>
              </div>
              <div>
                <p>{s.text}</p>
                <small>{s.status}</small>
              </div>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${s.title} resmî dokümantasyonu, yeni sekmede`}
              >
                <Arrow diagonal />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="spectral-section">
        <div className="wrap">
          <Eyebrow>SPEKTRAL PERSPEKTİF</Eyebrow>
          <h2>
            Gözün gördüğünden
            <br />
            daha fazlası.
          </h2>
          <BandStudy />
          <p>
            Optik sensörler farklı spektral bantlardaki yansımayı kaydeder.
            İndeksler bu bantlar arasında ilişki kurar; doğrudan hastalık
            teşhisi veya kök bölgesi nem ölçümü yapmaz.
          </p>
        </div>
      </section>
      <section className="indices-section wrap section-space">
        <div className="split-heading">
          <div>
            <Eyebrow>SPEKTRAL GÖSTERGELER</Eyebrow>
            <h2>
              Birer ipucu.
              <br />
              Kesin hüküm değil.
            </h2>
          </div>
          <p>
            Bu bölüm bir yöntem kataloğudur. Bir göstergenin anlatılması,
            AgroMax’ta tamamlandığı veya bu sitede hesaplandığı anlamına gelmez.
          </p>
        </div>
        <div className="index-notes">
          {indexNotes.map((n) => (
            <article key={n.name}>
              <h3>{n.name}</h3>
              <p>{n.text}</p>
            </article>
          ))}
        </div>
        <div className="index-catalog">
          {indexGroups.map((g) => (
            <details key={g.title}>
              <summary>
                {g.title}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{g.description}</p>
              <div className="index-names">
                {g.items.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
      <div className="wrap"><QualityStudy base={base} /></div>
      <section className="quality-section wrap section-space">
        <div className="sticky-heading">
          <Eyebrow>VERİ KALİTESİ</Eyebrow>
          <h2>
            Her piksel,
            <br />
            aynı kanıt değil.
          </h2>
          <p>Belirsizlik bir dipnot değil, analitik sürecin parçası.</p>
        </div>
        <div className="quality-list">
          {uiLists.technology_003.map(([t, p], i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bands-section wrap">
        <Eyebrow>KAYNAK BANTLAR VE KALİTE ÜRÜNLERİ</Eyebrow>
        <div className="bands-grid">
          <article>
            <h2>Spektral bantlar</h2>
            <p>
              B2, B3, B4 görünür; B5–B7 kırmızı kenar; B8/B8A yakın kızılötesi;
              B11/B12 kısa dalga kızılötesi bilgisi taşır. Bantların doğal
              çözünürlükleri farklıdır.
            </p>
          </article>
          <article>
            <h2>Kalite ve atmosfer</h2>
            <p>
              AOT, WV ve SCL; spektral bantlarla aynı tür ham gözlemler
              değildir. Atmosferik koşul ve sahne sınıflandırması gibi yardımcı
              ürünler olarak ele alınır.
            </p>
          </article>
        </div>
        <a
          href="https://documentation.dataspace.copernicus.eu/Data/SentinelMissions/Sentinel2.html"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Sentinel-2 dokümantasyonu
          <Arrow diagonal />
        </a>
      </section>
      <Next
        base={base}
        label="BİLİMDEN ÜRÜN YAKLAŞIMINA"
        title={
          <>
            Veriyi parselin
            <br />
            bağlamına taşı.
          </>
        }
        href="platform/"
        cta="Platformu incele"
      />
    </>
  );
}
