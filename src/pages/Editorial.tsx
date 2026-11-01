import { ContactRequest } from "../auth/ContactRequest";
import { stage1 } from "../content/stage1";
import { useState } from "react";
import { audiences, principles, legal } from "../content/site";
import { uiLists } from "../content/section-copy";
import { Eyebrow, Link, Media, Arrow, Mark, Icon } from "../components/ui";
import { siteConfig } from "../config/site";
import { Next } from "./Home";
export function Solutions({ base }: { base: string }) {
  return (
    <>
      <section className="solutions-hero">
        <div className="wrap solutions-heading">
          <Eyebrow>KULLANIM ALANLARI</Eyebrow>
          <h1>
            Sahanın sorularına
            <br />
            <span>daha geniş bir bakış.</span>
          </h1>
          <p>
            Uydu gözlemini sahadaki bilgiyle birlikte değerlendirmek isteyen
            profesyoneller için tasarlanıyor.
          </p>
        </div>
        <div className="solutions-panorama">
          <Media
            base={base}
            name="agriculture"
            eager
            alt="Tarım alanlarının, zeytinliklerin ve doğal su yolunun havadan kavramsal görünümü."
          />
          <div className="panorama-label">
            <span>TARIMSAL PEYZAJ</span>
            <span>Kavramsal görsel · Analiz çıktısı değildir.</span>
          </div>
        </div>
      </section>
      <nav className="audience-wayfinder wrap" aria-label="Kullanım alanına git">{audiences.map(a=><a href={"#alan-"+a.n} key={a.n}><span>{a.n}</span>{a.title}</a>)}</nav>
      <section className="audiences wrap section-space">
        <Eyebrow>FARKLI İHTİYAÇLAR, ORTAK BİR ÇERÇEVE</Eyebrow>
        {audiences.map((a, i) => (
          <article key={a.n} id={"alan-" + a.n}>
            <span className="audience-number">{a.n}</span>
            <div>
              <h2>{a.title}</h2>
              <h3>{a.question}</h3>
            </div>
            <div>
              <p>{a.text}</p>
              <small>{a.use}</small>
            </div>
            <figure className="stage1-audience-media">
              <Media
                base={base}
                name={stage1.audiences[i].name}
                alt={stage1.audiences[i].alt}
              />
              <figcaption>
                Kavramsal kullanım sahnesi · Gerçek müşteri veya analiz çıktısı
                değildir.
              </figcaption>
            </figure>
          </article>
        ))}
        <p className="source-note">
          Bu örnekler hedeflenen kullanım alanlarıdır. Müşteri, tamamlanmış
          proje veya doğrulanmış başarı hikâyesi değildir.
        </p>
      </section>
      <Next
        base={base}
        label="ÜRÜN YAKLAŞIMINI YAKINDAN TANI"
        title={
          <>
            Parselden başla.
            <br />
            Bütünü gör.
          </>
        }
        href="platform/"
        cta="Platformu keşfet"
      />
    </>
  );
}
export function About({ base }: { base: string }) {
  return (
    <>
      <section className="about-hero wrap">
        <div className="about-hero-copy">
          <Eyebrow>AGROMAX HAKKINDA</Eyebrow>
          <h1>
            Toprağa yakın.
            <br />
            <span>Veriye bağlı.</span>
          </h1>
          <p>
            Bir uydu görüntüsünü, sahadaki insan için nasıl daha anlamlı hâle
            getirebiliriz?
          </p>
        </div>
        <figure className="about-photo">
          <Media
            base={base}
            name={stage1.about.name}
            eager
            alt={stage1.about.alt}
          />
          <figcaption>GÖZLEMİN MERKEZİNDE YERYÜZÜ VAR.</figcaption>
        </figure>
      </section>
      <section className="about-story wrap section-space">
        <Eyebrow>ÇIKIŞ NOKTAMIZ</Eyebrow>
        <div>
          <h2>
            Daha fazla veri değil,
            <br />
            daha anlamlı bir bakış.
          </h2>
          <p className="lead">
            Uydu tabanlı tarımsal gözlem ve karar desteği üzerine bir yazılım
            yaklaşımı geliştiriyoruz.
          </p>
          <p>
            Parsel geçmişini, gözlem kalitesini ve uzman değerlendirmesini bir
            arada düşünmek bu yaklaşımın merkezinde. Gözlemden değerlendirmeye
            uzanan her adımın anlaşılır ve izlenebilir olmasını önemsiyoruz.
          </p>
        </div>
      </section>
      <section className="about-principles">
        <div className="wrap">
          <Eyebrow>YAKLAŞIMIMIZI BELİRLEYEN İLKELER</Eyebrow>
          {principles.map((p, i) => (
            <article key={p.title}>
              <span>0{i + 1}</span>
              <h2>{p.title}</h2>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-vision wrap section-space">
        <div className="about-mark" aria-hidden="true">
          <Mark />
        </div>
        <div>
          <Eyebrow>GELECEĞE BAKIŞ</Eyebrow>
          <h2>
            Teknolojiyle gözlemle.
            <br />
            Bilgiyle değerlendir.
          </h2>
          <p>
            AgroMax’ın hedefi, uzaktan algılama verilerini sahadaki sorularla
            ilişkilendiren bir değerlendirme kültürüne katkı sağlamak.
            Göstergenin sınırını bilmek, en az göstergeyi hesaplamak kadar
            değerli.
          </p>
        </div>
      </section>
      <Next
        base={base}
        label="GÖZLEMİN ARKASINDA"
        title={
          <>
            Bu yaklaşımın
            <br />
            bilimsel temeli.
          </>
        }
        href="teknoloji/"
        cta="Teknolojiyi incele"
      />
    </>
  );
}
export function Contact({ base }: { base: string }) {
  const [copied, setCopied] = useState(false);
  const email = siteConfig.contactEmail;
  return (
    <>
      <section className="contact-hero wrap">
        <div>
          <Eyebrow>İLETİŞİM</Eyebrow>
          <h1>
            Başlangıç noktası,
            <br />
            <span>sahadaki sorunuz.</span>
          </h1>
          <p>
            Tarımsal gözlem, parsel takibi veya olası bir çalışma alanı. AgroMax
            hakkında bir görüşmeye, ihtiyacınızı anlayarak başlamak isteriz.
          </p>
        </div>
        <div className="contact-channel">
          <figure className="stage1-contact-media">
            <Media
              base={base}
              name={stage1.contact.name}
              alt={stage1.contact.alt}
            />
          </figure>
          <Icon name="satellite" />
          <Eyebrow>İLETİŞİM KANALI</Eyebrow>
          {email ? (
            <>
              <a href={"mailto:" + email} className="email-link">
                {email}
                <Arrow diagonal />
              </a>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard
                    .writeText(email)
                    .then(() => setCopied(true))
                    .catch(() => setCopied(false))
                }
              >
                {copied ? "Kopyalandı" : "Adresi kopyala"}
              </button>
              <span role="status">
                {copied ? "E-posta adresi panoya kopyalandı." : ""}
              </span>
            </>
          ) : (
            <>
              <h2>
                Doğrudan iletişim
                <br />
                ve görüşme talebi.
              </h2>
              <p>
                Doğrulanmış e-posta adresi henüz paylaşılmadı. Görüşme talebini
                aşağıdaki formdan iletebilirsin.
              </p>
              <Link href={base + "platform/"}>Bu sırada platformu keşfet</Link>
            </>
          )}
        </div>
      </section>
      <section id="gorusme-talebi" className="contact-request-section wrap section-space"><ContactRequest base={base}/></section>
      <section className="contact-preparation wrap section-space">
        <Eyebrow>GÖRÜŞMEYE HAZIRLIK</Eyebrow>
        <h2>
          İhtiyacını anlamak için
          <br />
          üç başlangıç noktası.
        </h2>
        <div className="vision-grid">
          {uiLists.editorial_005.map(([t, p], i) => (
            <article key={t}>
              <span className="item-index">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
export function Legal({
  base,
  type,
}: {
  base: string;
  type: "privacy" | "terms";
}) {
  return (
    <section className="legal-page wrap">
      <Eyebrow>AGROMAX / BİLGİLENDİRME</Eyebrow>
      <h1>{type === "privacy" ? "Gizlilik." : "Kullanım bilgileri."}</h1>
      <p className="source-note">Son güncelleme: 31 Ekim 2026</p>
      <div className="legal-content">
        {legal[type].map(([t, p]) => (
          <article key={t}>
            <h2>{t}</h2>
            <p>{p}</p>
          </article>
        ))}
      </div>
      <Link href={base + "iletisim/"}>İletişim bilgileri</Link>
    </section>
  );
}
export function Credits({ base }: { base: string }) {
  return (
    <section className="legal-page wrap">
      <Eyebrow>ÜRETİM / KAYNAK / LİSANS</Eyebrow>
      <h1>Görsel kredileri.</h1>
      <p className="lead">
        Bu sitedeki sinematik sahneler ürünü anlatan kavramsal
        prodüksiyonlardır. AgroMax tarafından analiz edilmiş parselleri veya
        sahip olunan bir uyduyu göstermez.
      </p>
      <div className="legal-content">
        <article>
          <h2>Sayfalara özgü görsel çalışmalar</h2>
          <p>
            Şafak peyzajı, parsel, Filiz’in botanik arşivi, dört kullanım alanı
            ve doğal malzeme çalışmaları bu proje için OpenAI görsel üretimiyle
            oluşturuldu. Bunlar gerçek bir çiftliğin, ekibin veya analiz
            sonucunun fotoğrafları değildir. Ana sayfanın açılış filmi özgün
            görüntünün Blender’da işlenmiş 2.5D kompozitidir. Platform’daki
            arazi maketi ile Teknoloji’deki eğimli yaprak çalışması gerçek
            geometri, fiziksel malzeme, ışık ve kamera ile Blender Cycles’da
            üretildi. Bu sahneler kavramsaldır; coğrafi veya spektral ölçüm değildir.
          </p>
        </article>
        <article>
          <h2>Yeryüzüne Yolculuk</h2>
          <p>
            Altı aşamalı kavramsal yolculuğun bitki modeli, yaprak dokuları,
            atmosferi, arazi yüzeyi, ışığı ve kameraları projede üretildi.
            Masaüstündeki gerçek zamanlı sahneye, mobil için ayrı kamerayla
            alınan Blender renderı eşlik eder. Gözlem renkleri gerçek spektral
            ölçüm değildir. Gezegen aşağıdaki tarihsel NASA dokusunu kullanır.
          </p>
        </article>
        <article>
          <h2>Korunan uydu ve arazi kaynakları</h2>
          <p>
            Önceki prodüksiyonun gözlem uydusu modeli, hücreli güneş panelleri, optik sensör,
            antenler, malzemeler ve kamera yolları bu proje için Blender ile
            üretildi. İki gerçek Cycles görüntü dizisi, ayrı masaüstü ve mobil
            MP4/WebM filmlerine dönüştürüldü. Uydu belirli bir görev aracının
            kopyası değildir. Arazi görüntüsü OpenAI görsel üretimiyle
            oluşturulmuş kavramsal bir peyzajdır; gerçek bir konum veya ölçüm
            iddiası taşımaz.
          </p>
        </article>
        <article>
          <h2>Yeryüzü dokusu</h2>
          <p>
            NASA Visible Earth, Blue Marble: Next Generation, Aralık 2004
            küresel renk dokusu. NASA Earth Observatory; Reto Stöckli, NASA
            Goddard Space Flight Center. Yalnızca yeryüzünü resmetmek amacıyla
            kullanılır. NASA’nın AgroMax’ı desteklediği veya bir ortaklık
            bulunduğu ima edilmez.
          </p>
          <a
            className="text-link"
            href="https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-topography-bathymetry/"
            target="_blank"
            rel="noreferrer"
          >
            NASA kaynak kaydı
            <Arrow diagonal />
          </a>
          <a
            className="text-link"
            href="https://www.nasa.gov/nasa-brand-center/images-and-media/"
            target="_blank"
            rel="noreferrer"
          >
            NASA görsel kullanım ilkeleri
            <Arrow diagonal />
          </a>
        </article>
        <article>
          <h2>Yazı karakteri</h2>
          <p>
            Instrument Sans — The Instrument Sans Project Authors, SIL Open Font
            License 1.1. Türkçe karakterleri içeren değişken yazı tipi siteden
            sunulur.
          </p>
          <a className="text-link" href={base + "fonts/InstrumentSans-OFL.txt"}>
            Font lisansı
            <Arrow diagonal />
          </a>
        </article>
        <article>
          <h2>Bilimsel kaynaklar</h2>
          <p>
            Sentinel ve Landsat açıklamaları Copernicus ile USGS’nin resmî
            dokümantasyonuna dayanır. Kaynak adları ortaklık veya canlı
            entegrasyon iddiası değildir. Bağlantılar Teknoloji sayfasındadır.
          </p>
          <Link href={base + "teknoloji/"}>Teknoloji ve kaynaklar</Link>
        </article>
      </div>
      <Link href={base}>Ana sayfaya dön</Link>
    </section>
  );
}
export function NotFound({ base }: { base: string }) {
  return (
    <section className="not-found wrap">
      <Eyebrow>AGROMAX / 404</Eyebrow>
      <span className="not-found-number" aria-hidden="true">
        404
      </span>
      <h1>
        Bu koordinatta
        <br />
        bir sayfa yok.
      </h1>
      <p>Aradığın sayfa taşınmış veya bağlantı değişmiş olabilir.</p>
      <Link href={base} solid>
        Ana sayfaya dön
      </Link>
    </section>
  );
}
