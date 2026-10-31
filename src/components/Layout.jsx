import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { brand, contact, navigation } from "../data/site";
import { useExperience, usePageTransitions } from "../hooks/useExperience";
import Cursor from "./Cursor";
import PreviewBadge from "./PreviewBadge";
import Locations from "./Locations";
export function Wordmark() {
  const [failed, setFailed] = useState(false);
  if (brand.goldLogo && !failed)
    return (
      <img
        className="official-logo"
        src={brand.goldLogo}
        alt="GVK Decor"
        onError={() => setFailed(true)}
      />
    );
  return (
    <span
      className="wordmark"
      aria-label="GVK Decor — temporary text mark, official gold logo pending"
    >
      GVK<span>DECOR</span>
    </span>
  );
}
export function Enquire({ children = "Begin a conversation", className = "" }) {
  return (
    <Link className={`text-link ${className}`} to="/contact">
      {children}
      <ArrowUpRight aria-hidden="true" size={17} />
    </Link>
  );
}
export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const dialog = useRef(null);
  const trigger = useRef(null);
  useExperience();
  usePageTransitions();
  useEffect(() => {
    setOpen(false);
    if (hash)
      requestAnimationFrame(() =>
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" }),
      );
    else window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 70);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header
        className={`${pathname === "/" && !scrolled ? "over-hero" : ""} ${scrolled ? "is-scrolled" : ""}`}
      >
        <Link to="/" aria-label="GVK Decor home">
          <Wordmark />
        </Link>
        <span className="header-location">JUBILEE HILLS · SECUNDERABAD</span>
        <div className="header-actions">
          <Link className="header-appointment" to="/contact">
            Book a visit <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
          <button
            ref={trigger}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="navigation"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <span>Menu</span>
            <Menu aria-hidden="true" size={19} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="menu-dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onCancel={() => setOpen(false)}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <div className="menu-head">
          <Link to="/" onClick={() => setOpen(false)} aria-label="Home">
            <Wordmark />
          </Link>
          <button
            className="menu-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            Close <X aria-hidden="true" size={22} />
          </button>
        </div>
        <div className="menu-layout">
          <div>
            <p className="eyebrow">THE WORLD OF GVK DECOR</p>
            <nav id="navigation">
              {[["Home", "/"], ...navigation, ["Contact", "/contact"]].map(
                ([title, path], i) => (
                  <NavLink key={path} to={path} onClick={() => setOpen(false)}>
                    <span className="index" aria-hidden="true">
                      0{i + 1}
                    </span>
                    {title}
                    <ArrowUpRight aria-hidden="true" size={23} />
                  </NavLink>
                ),
              )}
            </nav>
          </div>
          <div className="menu-aside">
            <p className="eyebrow">COME CLOSER</p>
            <h2>
              A world of
              <br />
              <em>possibility.</em>
            </h2>
            <Locations />
            <Enquire>Plan your visit</Enquire>
            <span className="menu-year">1959 — 2026</span>
          </div>
        </div>
      </dialog>
      <main id="main" tabIndex={-1}>
        <div key={pathname} className="route-scene">
          <Outlet />
        </div>
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <p className="eyebrow">YOUR HOME. OUR NEXT CONVERSATION.</p>
            <h2>
              Let’s make
              <br />
              <em>it personal.</em>
            </h2>
            <Enquire>Visit the Experience Centre</Enquire>
          </div>
          <div className="footer-address">
            <Wordmark />
            <Locations />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GVK Decor</span>
          <span>{brand.tagline}</span>
          <Link to="/contact">
            Begin a conversation <ArrowUpRight aria-hidden="true" size={13} />
          </Link>
        </div>
      </footer>
      <a
        className="whatsapp"
        href={
          contact.whatsapp
            ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello GVK Decor, I would like to enquire about bespoke furnishings.")}`
            : "/contact#appointment"
        }
        target={contact.whatsapp ? "_blank" : undefined}
        rel={contact.whatsapp ? "noopener noreferrer" : undefined}
        aria-label={
          contact.whatsapp ? "Enquire on WhatsApp" : "Enquire with GVK Decor"
        }
      >
        <MessageCircle aria-hidden="true" size={20} />
        <span>{contact.whatsapp ? "WhatsApp" : "Enquire"}</span>
      </a>
      <Cursor />
      <PreviewBadge />
    </>
  );
}
