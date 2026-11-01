import { stage1 } from "../content/stage1";
import { workflow, future } from "../content/site";
import { Eyebrow, Link, Icon } from "../components/ui";
import { Landscape } from "../components/Cinematic";
import { Next } from "./Home";
export function Platform({ base }: { base: string }) {
  return (
    <>
      <section className="page-intro wrap">
        <Eyebrow>AGROMAX PLATFORMU</Eyebrow>
        <div className="page-intro-grid">
          <h1>
            Her parseli
            <br />
            <span>kendi bağlamında.</span>
          </h1>
          <div>
            <p className="lead">
              Uydu görüntüsünden anlamlı bir değerlendirmeye giden yol, parselin
              hikâyesini bilmekle başlar.
            </p>
            <p>
              AgroMax; gözlemi, spektral göstergeleri, zamanı ve uzman bilgisini
              aynı çerçevede ele alan bir ürün yaklaşımı geliştiriyor.
            </p>
            <Link href="#urun-yaklasimi">Nasıl bir yaklaşım?</Link>
          </div>
        </div>
      </section>
      <div className="platform-landscape wrap">
        <Landscape base={base} eager scene={stage1.platform} />
        <div className="figure-subline">
          <span>GÖZLEMİN ÖTESİNDE BİR PERSPEKTİF</span>
          <span>Kaynak · Zaman · Bağlam</span>
        </div>
      </div>
      <section
        className="workflow-section wrap section-space"
        id="urun-yaklasimi"
      >
        <div className="sticky-heading">
          <Eyebrow>GÖZLEMDEN DEĞERLENDİRMEYE</Eyebrow>
          <h2>
            Altı adım.
            <br />
            Bir bütün.
          </h2>
          <p>
            Her adımda kaynağı, bağlamı ve belirsizliği görünür tutan bir
            inceleme yaklaşımı.
          </p>
        </div>
        <div className="workflow-list">
          {workflow.map((w, i) => (
            <article key={w.n}>
              <span>{w.n}</span>
              <div>
                <Icon
                  name={
                    [
                      "target",
                      "satellite",
                      "layers",
                      "time",
                      "leaf",
                      "evidence",
                    ][i]
                  }
                />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="platform-evidence">
        <div className="wrap evidence-grid">
          <div>
            <Eyebrow>KARAR DESTEĞİ</Eyebrow>
            <h2>
              Bir sonuç kadar,
              <br />
              dayanağı da önemli.
            </h2>
          </div>
          <div>
            <p className="lead">
              Göstergeler bir sorunun nerede olabileceğine işaret edebilir.
              Nedenini anlamak, daha fazlasını gerektirir.
            </p>
            <p>
              Uydu gözlemi; ürün, dönem, yerel koşullar ve saha bilgisiyle
              birlikte değerlendirilir. Tek bir indeks değeri kesin teşhis veya
              uygulama reçetesi değildir.
            </p>
            <Link href={base + "teknoloji/"}>Bilimsel temeli keşfet</Link>
          </div>
        </div>
      </section>
      <section className="vision-section wrap section-space">
        <div className="split-heading">
          <div>
            <Eyebrow>UZUN VADELİ VİZYON</Eyebrow>
            <h2>
              Bugünün ötesine
              <br />
              bakmak.
            </h2>
          </div>
          <p>
            Aşağıdaki alanlar araştırma ve vizyon kapsamındadır; tamamlanmış
            ürün yetenekleri olarak sunulmaz.
          </p>
        </div>
        <div className="vision-grid">
          {future.map((f, i) => (
            <article key={f.title}>
              <span className="item-index">0{i + 1} / ARAŞTIRMA</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
        <p className="source-note">
          Bu sayfa ürün yaklaşımını tanıtır. Üretim ortamındaki
          kullanılabilirlik ayrıca doğrulanmalıdır.
        </p>
      </section>
      <Next
        base={base}
        label="BAĞLAMI BİRLİKTE DÜŞÜNMEK"
        title={
          <>
            Filiz ile
            <br />
            bir adım daha.
          </>
        }
        href="filiz/"
        cta="Filiz’i tanı"
      />
    </>
  );
}
