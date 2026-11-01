import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { brand, heroMedia, deckSelections } from "../../data/site";
import { gsap } from "../../hooks/motion";
import useReducedMotion from "../../hooks/useReducedMotion";
import Media from "../Media";

export default function FilmOpening() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const frames = [
    heroMedia,
    deckSelections[1].media[0],
    deckSelections[2].media[0],
  ];
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".film-signature",
        { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".film-title > span",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.13,
          delay: 0.2,
          ease: "power3.out",
        },
      );
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            onUpdate: (self) => {
              root.current.dataset.progress = self.progress.toFixed(3);
              setIntroVisible(self.progress < 0.45);
              setActive(Math.min(2, Math.floor(self.progress * 3)));
            },
          },
        })
        .to(
          ".film-copy",
          { y: -65, opacity: 0, duration: 0.4, ease: "none" },
          0.05,
        )
        .to(".film-signature", { opacity: 0, y: -20, duration: 0.3 }, 0.1)
        .fromTo(
          ".film-images img",
          { scale: 1 },
          { scale: 1.08, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".film-images",
          { clipPath: "inset(0%)" },
          { clipPath: "inset(0% 3% 4% 3%)", duration: 0.22, ease: "none" },
          0.78,
        );
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  const select = (i) => {
    setActive(i);
    if (!reduced) {
      const el = root.current;
      window.scrollTo({
        top: el.offsetTop + (el.offsetHeight - innerHeight) * ((i + 0.2) / 3),
        behavior: "instant",
      });
    }
  };
  return (
    <section
      className={`film-opening ${reduced ? "is-static" : ""}`}
      ref={root}
      aria-labelledby="hero-title"
    >
      <div className="film-sticky">
        <div className="film-images" data-cursor="Explore">
          {heroMedia.video ? (
            <div className="film-frame is-active">
              <Media item={heroMedia} priority cinematic />
            </div>
          ) : (
            frames.map((item, i) => (
              <div
                key={item.image || i}
                className={`film-frame ${i === active ? "is-active" : ""}`}
                aria-hidden={i !== active}
              >
                <Media item={item} priority={i === 0} />
              </div>
            ))
          )}
        </div>
        <div className="film-tone" aria-hidden="true" />
        <div className="film-signature">
          <img src={brand.goldLogo} alt="GVK Decor" width="883" height="346" />
          <p>BESPOKE FURNISHINGS · HYDERABAD</p>
        </div>
        <div className="film-copy" inert={!reduced && !introVisible}>
          <p className="eyebrow">A HERITAGE OF PERSONAL SPACES</p>
          <h1 className="film-title" id="hero-title" aria-label={brand.tagline}>
            <span>Crafting</span>
            <span>Timeless Spaces</span>
            <span className="film-year">Since 1959</span>
          </h1>
          <Link to="/projects" className="text-link light-link">
            Discover GVK Decor <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="film-bottom">
          <a href="#heritage" className="film-scroll">
            Scroll to discover <ArrowDown size={15} aria-hidden="true" />
          </a>
          {!heroMedia.video && (
            <div className="film-select" aria-label="Opening photographs">
              {frames.map((_, i) => (
                <button
                  aria-label={`Opening photograph ${i + 1}`}
                  aria-pressed={active === i}
                  key={i}
                  onClick={() => select(i)}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="film-credit">
          {heroMedia.video
            ? "GVK Decor film"
            : "GVK Decor pitch-deck photography · original film awaiting footage"}
        </p>
      </div>
    </section>
  );
}
