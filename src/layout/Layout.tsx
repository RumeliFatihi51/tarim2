import { uiTexts } from "../content/interface";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { navigation, navLabels, type PageId } from "../content/site";
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
  const appUrl = /^https:\/\/[^ ]+$/.test(siteConfig.externalPlatformUrl)
    ? siteConfig.externalPlatformUrl
    : "";
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.dispatchEvent(new CustomEvent("agromax-menu", { detail: open }));
    if (!open) return;
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menu.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const list = [
          trigger.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const i = list.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i === 0) {
          e.preventDefault();
          list.at(-1)?.focus();
        } else if (!e.shiftKey && i === list.length - 1) {
          e.preventDefault();
          list[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = saved;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  useEffect(() => {
    const m = matchMedia("(min-width: 1100px)");
    const change = () => {
      if (m.matches) setOpen(false);
    };
    m.addEventListener("change", change);
    return () => m.removeEventListener("change", change);
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        {uiTexts.layout_001}
      </a>
      <header className={`header header-v2 ${open ? "is-open" : ""}`}>
        <a className="brand" href={base} aria-label={uiTexts.layout_002}>
          <Mark />
          <span>{uiTexts.layout_003}</span>
        </a>
        <nav className="desktop-nav" aria-label={uiTexts.layout_004}>
          {navigation
            .filter((n) => n.id !== "home" && n.id !== "iletisim")
            .map((n) => (
              <a
                key={n.id}
                aria-current={page === n.id ? "page" : undefined}
                href={base + n.path}
              >
                {n.label}
                {n.id === "filiz" && (
                  <span className="nav-spark" aria-hidden="true">
                    {uiTexts.layout_005}
                  </span>
                )}
              </a>
            ))}
        </nav>
        <a
          className="header-contact"
          href={appUrl || base + "iletisim/"}
          target={appUrl ? "_blank" : undefined}
          rel={appUrl ? "noreferrer" : undefined}
        >
          {appUrl ? navLabels.external : uiTexts.layout_006}
          <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          ref={trigger}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? navLabels.close : navLabels.open}
        >
          <span>{open ? navLabels.closeShort : navLabels.menu}</span>
          <span className="menu-lines">
            <i />
            <i />
          </span>
        </button>
        <nav
          id="mobile-menu"
          ref={menu}
          className="mobile-nav"
          aria-label={uiTexts.layout_007}
          hidden={!open}
        >
          {navigation.map((n, i) => (
            <a
              key={n.id}
              href={base + n.path}
              aria-current={page === n.id ? "page" : undefined}
            >
              <small>
                {uiTexts.layout_008}
                {i + 1}
              </small>
              {n.label}
              <Arrow />
            </a>
          ))}
          <div className="menu-art">
            <img
              src={base + "media/archive.webp"}
              loading="lazy"
              decoding="async"
              alt=""
              width="500"
              height="300"
            />
            <p>{uiTexts.layout_009}</p>
          </div>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="footer">
        <div className="footer-top">
          <p>
            {uiTexts.layout_010}
            <br />
            <span>{uiTexts.layout_011}</span>
          </p>
          <a href={base + "platform/"} className="footer-invite">
            {uiTexts.layout_012}
            <Arrow diagonal />
          </a>
        </div>
        <div className="footer-middle">
          <div>
            <span className="eyebrow">{uiTexts.layout_013}</span>
            <p>
              {uiTexts.layout_014}
              <br />
              {uiTexts.layout_015}
            </p>
          </div>
          <nav aria-label={uiTexts.layout_016}>
            {navigation.map((n) => (
              <a key={n.id} href={base + n.path}>
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          {uiTexts.layout_017}
        </div>
        <div className="footer-bottom">
          <span>
            {uiTexts.layout_018}
            {new Date().getFullYear()} {uiTexts.layout_019}
          </span>
          <div>
            <a href={base + "gizlilik/"}>{uiTexts.layout_020}</a>
            <a href={base + "kullanim/"}>{uiTexts.layout_021}</a>
            <a href={base + "gorsel-kredileri/"}>{uiTexts.layout_022}</a>
          </div>
          <span>{uiTexts.layout_023}</span>
        </div>
      </footer>
    </>
  );
}
