import { stage1 } from "../content/stage1";
import { filizContexts } from "../content/site";
import { uiLists } from "../content/section-copy";
import { Eyebrow, Link, Icon } from "../components/ui";
import { Landscape } from "../components/Cinematic";
import { Next } from "./Home";
export function Filiz({ base }: { base: string }) {
  return (
    <>
      <section className="filiz-hero wrap">
        <div className="filiz-intro">
          <Eyebrow>
            <span className="label-dot" />
            PLANLANAN AGROMAX ÖZELLİĞİ
          </Eyebrow>
          <h1 className="filiz-wordmark">
            <Icon name="leaf" />
            filiz<span>AI</span>
          </h1>
          <h2>
            Parseli bilen.
            <br />
            Bağlamı önemseyen.
          </h2>
          <p>
            Bir gözlemi, tek başına yorumlamamak için. Filiz; parsel bilgisini,
            geçmişi ve dayanakları bir arada değerlendirmeyi hedefleyen tarımsal
            AI asistanı.
          </p>
          <Link href="#filiz-yaklasimi" solid>
            Filiz’in yaklaşımını keşfet
          </Link>
        </div>
        <Landscape base={base} eager filiz scene={stage1.filiz} still />
      </section>
      <section
        id="filiz-yaklasimi"
        className="filiz-context-section wrap section-space"
      >
        <div className="split-heading">
          <div>
            <Eyebrow>BAĞLAM ODAKLI YAKLAŞIM</Eyebrow>
            <h2>
              Sorunun etrafındaki
              <br />
              bilgiyi bir araya getir.
            </h2>
          </div>
          <p>
            Hedef, bağımsız bir sohbet ekranı oluşturmak değil; AgroMax içindeki
            izin verilen bilgileri, anlaşılır ve gerekçeli bir açıklama için
            ilişkilendirmek.
          </p>
        </div>
        <div className="context-grid">
          {filizContexts.map((x, i) => (
            <article key={x.title}>
              <Icon name={["target", "satellite", "time", "evidence"][i]} />
              <span>0{i + 1}</span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="filiz-principles">
        <div className="wrap evidence-grid">
          <div>
            <Eyebrow>GÜVENİLİRLİK YAKLAŞIMI</Eyebrow>
            <h2>
              Açıklamak.
              <br />
              Dayanak göstermek.
              <br />
              Sınırını bilmek.
            </h2>
          </div>
          <div className="reliability-list">
            {uiLists.filiz_003.map(([t, p], i) => (
              <article key={t}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="filiz-status wrap">
        <span className="status-symbol">
          <Icon name="leaf" />
        </span>
        <div>
          <Eyebrow>GELİŞTİRME DURUMU</Eyebrow>
          <h3>Filiz, planlanan bir ürün özelliğidir.</h3>
          <p>
            Bu sitede çalışan bir sohbet veya parsel analizi bulunmaz. AI
            çıktıları uzman değerlendirmesi ve saha doğrulamasının yerine
            geçmez.
          </p>
        </div>
        <Link href={base + "platform/"}>Platformu tanı</Link>
      </section>
      <Next
        base={base}
        label="ÖNCE NİTELİKLİ GÖZLEM"
        title={
          <>
            Bağlamın temeli,
            <br />
            doğru kaynak.
          </>
        }
        href="teknoloji/"
        cta="Teknolojiyi keşfet"
      />
    </>
  );
}
