import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Media from "./Media";
import { collections } from "../data/site";
import useReducedMotion from "../hooks/useReducedMotion";
import { gsap } from "../hooks/motion";

export default function CollectionVoyage() {
  const root = useRef(null),
    track = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        x: () =>
          -Math.max(0, track.current.scrollWidth - root.current.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.current.dataset.progress = self.progress.toFixed(3);
            setActive(
              Math.min(
                collections.length - 1,
                Math.round(self.progress * (collections.length - 1)),
              ),
            );
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  const choose = (i) => {
    setActive(i);
    if (!reduced) {
      const top = root.current.getBoundingClientRect().top + scrollY;
      window.scrollTo({
        top:
          top +
          ((root.current.offsetHeight - innerHeight) * i) /
            (collections.length - 1),
        behavior: "instant",
      });
    }
  };
  return (
    <section
      id="collections"
      ref={root}
      className={`collection-voyage ${reduced ? "motion-static" : ""}`}
      aria-label="The furnishing edit"
    >
      <div className="voyage-sticky">
        <div className="voyage-heading">
          <div>
            <p className="eyebrow">03 / SEVEN EXPRESSIONS. ONE HOME.</p>
            <h2>
              The furnishing <em>edit.</em>
            </h2>
          </div>
          <div
            id="collection-preview"
            className="voyage-current"
            aria-live="polite"
          >
            <span>0{active + 1} / 07</span>
            <p>{collections[active].category}</p>
          </div>
        </div>
        <div className="voyage-track" ref={track}>
          {collections.map((item, i) => (
            <article
              className={`voyage-card ${active === i ? "is-active" : ""}`}
              key={item.id}
            >
              <div className="voyage-image" data-cursor="Discover">
                <Media item={item} />
                <span className="voyage-number">0{i + 1}</span>
              </div>
              <div className="voyage-caption">
                <div>
                  <p className="eyebrow">{item.category}</p>
                  <h3>{item.name}</h3>
                </div>
                <Link
                  to={`/collections#${item.id}`}
                  className="round-link"
                  aria-label={`Discover ${item.name}`}
                  onFocus={(event) => {
                    if (event.currentTarget.matches(":focus-visible"))
                      choose(i);
                  }}
                >
                  <ArrowUpRight aria-hidden="true" size={20} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div
          className="collection-selector voyage-selector"
          aria-label="Explore collections"
        >
          {collections.map((item, i) => (
            <button
              aria-pressed={active === i}
              key={item.id}
              onClick={() => choose(i)}
            >
              <span className="index" aria-hidden="true">
                0{i + 1}
              </span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
