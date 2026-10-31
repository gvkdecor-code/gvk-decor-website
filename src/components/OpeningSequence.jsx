import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { brand, heroMedia, deckSelections } from "../data/site";
import Media from "./Media";
import useReducedMotion from "../hooks/useReducedMotion";
import { gsap, ScrollTrigger } from "../hooks/motion";

export default function OpeningSequence() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState(0);
  const reduced = useReducedMotion();
  const slides = [
    heroMedia,
    deckSelections[1].media[0],
    deckSelections[2].media[0],
  ];
  useEffect(() => {
    if (reduced) {
      setPlaying(false);
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".opening-display > span",
        { yPercent: 115, rotate: 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.35,
          stagger: 0.12,
          ease: "power4.out",
        },
      );
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          onUpdate: (self) => {
            root.current.dataset.progress = self.progress.toFixed(3);
            setActive(Math.min(2, Math.floor(self.progress * 3)));
            setPhase(
              self.progress < 0.28
                ? 0
                : self.progress > 0.5 && self.progress < 0.9
                  ? 1
                  : 2,
            );
          },
        },
      });
      tl.fromTo(
        ".opening-media",
        {
          clipPath: () =>
            matchMedia("(max-width:760px)").matches
              ? "inset(20% 0% 23% 24%)"
              : "inset(15% 5% 14% 47%)",
        },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 0.6 },
        0,
      )
        .to(
          ".opening-display",
          { yPercent: -20, opacity: 0, ease: "none", duration: 0.3 },
          0.05,
        )
        .to(".opening-intro", { opacity: 0, y: -35, duration: 0.2 }, 0.12)
        .fromTo(
          ".opening-after",
          { opacity: 0, y: 65 },
          { opacity: 1, y: 0, duration: 0.28 },
          0.5,
        )
        .fromTo(
          ".opening-media img",
          { scale: 1.13 },
          { scale: 1, ease: "none", duration: 1 },
          0,
        )
        .to(".opening-after", { y: -45, opacity: 0, duration: 0.15 }, 0.85);
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  useEffect(() => {
    if (!playing || reduced || heroMedia.video) return;
    const timer = setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      4500,
    );
    return () => clearInterval(timer);
  }, [playing, reduced]);
  const choose = (index) => {
    setPlaying(false);
    setActive(index);
    if (!reduced) {
      const top = root.current.getBoundingClientRect().top + scrollY;
      window.scrollTo({
        top:
          top +
          (root.current.offsetHeight - innerHeight) * ((index + 0.15) / 3),
        behavior: "instant",
      });
    }
  };
  return (
    <section
      ref={root}
      className={`cinematic-hero opening-experience ${reduced ? "motion-static" : ""}`}
      aria-labelledby="hero-title"
    >
      <div className="opening-sticky">
        <div className="opening-media" data-cursor="Scroll">
          {heroMedia.video ? (
            <div className="hero-backdrop opening-shot is-active">
              <Media item={heroMedia} priority cinematic />
            </div>
          ) : (
            slides.map((item, index) => (
              <div
                key={item.image || index}
                className={`hero-backdrop opening-shot ${index === active ? "is-active" : ""}`}
                aria-hidden={index !== active}
              >
                <Media item={item} priority={index === 0} />
              </div>
            ))
          )}
          <div className="opening-scrim" />
        </div>
        <div className="opening-kicker">
          <span>GVK DECOR / THE BESPOKE EDIT</span>
          <span>01 — HYDERABAD</span>
        </div>
        <div className="opening-display" aria-hidden="true">
          <span>THE</span>
          <span>BESPOKE</span>
          <span>
            <em>EDIT.</em>
            <i>
              EST.
              <br />
              1959
            </i>
          </span>
        </div>
        <div className="opening-intro" inert={!reduced && phase !== 0}>
          <h1 id="hero-title">{brand.tagline}</h1>
          <Link to="/contact" className="text-link">
            Enter the Experience Centre{" "}
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="opening-after" inert={reduced || phase !== 1}>
          <p className="eyebrow">CURTAINS / UPHOLSTERY / BESPOKE FURNISHINGS</p>
          <h2>
            Architecture.
            <br />
            <em>Meet texture.</em>
          </h2>
          <Link to="/projects" className="text-link">
            Explore the deck selections{" "}
            <ArrowUpRight aria-hidden="true" size={19} />
          </Link>
        </div>
        <div className="opening-bottom">
          <a href="#heritage" className="opening-scroll">
            SCROLL TO UNFOLD <ArrowDown aria-hidden="true" size={15} />
          </a>
          <div className="opening-controls" aria-label="Opening image sequence">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Opening image ${i + 1}`}
                aria-pressed={i === active}
                onClick={() => choose(i)}
              >
                <span>0{i + 1}</span>
              </button>
            ))}
            {!heroMedia.video && !reduced && (
              <button
                className="sequence-play"
                onClick={() => setPlaying(!playing)}
                aria-label={
                  playing ? "Pause image sequence" : "Play image sequence"
                }
              >
                {playing ? (
                  <Pause aria-hidden="true" size={15} />
                ) : (
                  <Play aria-hidden="true" size={15} />
                )}
              </button>
            )}
          </div>
        </div>
        <p className="hero-media-credit">
          {heroMedia.video
            ? "GVK Decor film"
            : "Pitch-deck still-image sequence · authentic video pending"}
        </p>
      </div>
    </section>
  );
}
