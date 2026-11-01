import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Media from "../Media";
import { deckSelections } from "../../data/site";
import useReducedMotion from "../../hooks/useReducedMotion";
import { gsap } from "../../hooks/motion";
export default function HeritageSpread() {
  const root = useRef(null),
    reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".heritage-portrait",
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0%)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            end: "center center",
            scrub: 0.6,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section
      className="heritage-spread section"
      id="heritage"
      ref={root}
      aria-labelledby="heritage-title"
    >
      <div className="spread-top">
        <p className="eyebrow">01 / OUR FOUNDATION</p>
        <span>HYDERABAD · ESTABLISHED 1959</span>
      </div>
      <div className="heritage-grid">
        <figure className="heritage-origin">
          <time dateTime="1959" className="heritage-year">
            1959
          </time>
          <figcaption>
            A beginning.
            <br />
            An enduring attention to detail.
          </figcaption>
        </figure>
        <div className="heritage-narrative">
          <h2 id="heritage-title">
            A family name.
            <br />
            <em>A personal legacy.</em>
          </h2>
          <p>
            GVK honours Gunda Venkateshwar Rao, the founder whose story began in
            1959. The supplied brand deck traces a family heritage across
            generations, shaped around bespoke furnishings and collaboration
            with architects and interior designers.
          </p>
          <Link to="/our-legacy" className="text-link">
            Read our story <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="heritage-portrait">
          <Media item={deckSelections[0].media[1]} />
        </div>
        <p className="heritage-footnote">
          CURTAINS · BLINDS · WALLPAPERS · UPHOLSTERY · BEDDING · BESPOKE
          FURNISHINGS
        </p>
      </div>
    </section>
  );
}
