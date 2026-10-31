import { useEffect, useRef, useState, type ReactNode } from "react";
import { navigation, type PageId } from "../content/site";
import { siteConfig } from "../config/site";
import { Arrow, Mark } from "../components/ui";
export function Layout({
  page,
  base,
  children,
}: {
  page: PageId;
  base: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = menu.current;
    if (!dialog) return;
    document.dispatchEvent(new CustomEvent("agromax-menu", { detail: open }));
    if (open) {
      dialog.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
        dialog.close();
      };
    }
    dialog.close();
  }, [open]);
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  return (
    <>
      <a className="skip-link" href="#main">
        İçeriğe geç
      </a>
      <header className="header">
        <div className="header-inner">
          <a className="brand" href={base} aria-label="AgroMax ana sayfa">
            <Mark />
            <span>agromax</span>
          </a>
          <nav className="desktop-nav" aria-label="Ana menü">
            {navigation
              .filter((n) => n.id !== "home" && n.id !== "iletisim")
              .map((n) => (
                <a
                  key={n.id}
                  href={base + n.path}
                  aria-current={page === n.id ? "page" : undefined}
                >
                  {n.id === "filiz" ? "Filiz" : n.label}
                  {n.id === "filiz" ? (
                    <span className="ai-label">AI</span>
                  ) : null}
                </a>
              ))}
          </nav>
          <a
            className="header-contact"
            href={siteConfig.externalPlatformUrl || base + "iletisim/"}
          >
            İletişim
            <Arrow diagonal />
          </a>
          <button
            type="button"
            ref={trigger}
            className="menu-toggle"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menüyü aç"
          >
            <span>Menü</span>
            <span className="menu-bars">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        ref={menu}
        className="menu-dialog"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const nodes =
            menu.current?.querySelectorAll<HTMLElement>("button,a[href]");
          if (!nodes?.length) return;
          const first = nodes[0],
            last = nodes[nodes.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        aria-labelledby="menu-title"
      >
        <div className="menu-head">
          <span id="menu-title" className="brand">
            <Mark />
            agromax
          </span>
          <button type="button" onClick={close} aria-label="Menüyü kapat">
            Kapat<span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="menu-body">
          <div className="menu-intro">
            <span className="eyebrow">DAHA GENİŞ BİR PERSPEKTİF</span>
            <p>
              Yeryüzünü gözlemle.
              <br />
              Tarlayı bağlamıyla anla.
            </p>
          </div>
          <nav aria-label="Tüm sayfalar">
            {navigation.map((n, i) => (
              <a
                key={n.id}
                href={base + n.path}
                onClick={() => setOpen(false)}
                aria-current={page === n.id ? "page" : undefined}
              >
                <small>0{i + 1}</small>
                <span>{n.label}</span>
                <Arrow />
              </a>
            ))}
          </nav>
        </div>
        <div className="menu-bottom">
          <span>UYDU TABANLI TARIMSAL ANALİZ</span>
          <span>GÖZLEM → BAĞLAM → İÇGÖRÜ</span>
        </div>
      </dialog>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="footer">
        <div className="footer-main wrap">
          <div className="footer-brand">
            <a className="brand" href={base}>
              <Mark />
              <span>agromax</span>
            </a>
            <p>
              Uydu gözleminden
              <br />
              tarımsal içgörüye.
            </p>
            <span className="footer-tag">Yeryüzüne daha yakından.</span>
          </div>
          <nav aria-label="Alt menü">
            <span className="eyebrow">KEŞFET</span>
            {navigation
              .filter((n) => ["platform", "teknoloji", "filiz"].includes(n.id))
              .map((n) => (
                <a key={n.id} href={base + n.path}>
                  {n.label}
                  <Arrow />
                </a>
              ))}
          </nav>
          <nav aria-label="AgroMax hakkında">
            <span className="eyebrow">AGROMAX</span>
            {navigation
              .filter((n) =>
                ["cozumler", "hakkimizda", "iletisim"].includes(n.id),
              )
              .map((n) => (
                <a key={n.id} href={base + n.path}>
                  {n.label}
                  <Arrow />
                </a>
              ))}
          </nav>
        </div>
        <div className="footer-bottom wrap">
          <span>© {new Date().getFullYear()} AgroMax</span>
          <div>
            <a href={base + "gizlilik/"}>Gizlilik</a>
            <a href={base + "kullanim/"}>Kullanım bilgileri</a>
            <a href={base + "gorsel-kredileri/"}>Görsel kredileri</a>
          </div>
          <span>Bağımsız ürün tanıtım sitesi.</span>
        </div>
      </footer>
    </>
  );
}
