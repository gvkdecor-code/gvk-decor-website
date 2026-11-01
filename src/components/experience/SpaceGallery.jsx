import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Media from "../Media";
import ProjectViewer from "../ProjectViewer";
import { projects, deckSelections } from "../../data/site";
import useReducedMotion from "../../hooks/useReducedMotion";
import { gsap } from "../../hooks/motion";
export default function SpaceGallery() {
  const root = useRef(null),
    [active, setActive] = useState(0),
    [selected, setSelected] = useState(null),
    reduced = useReducedMotion();
  const verified = projects.filter((p) => p.media?.length),
    items = (verified.length ? verified : deckSelections).slice(0, 3);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray(".space-frame");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          onUpdate: (self) => {
            root.current.dataset.progress = self.progress.toFixed(3);
            setActive(
              Math.min(
                items.length - 1,
                Math.round(self.progress * (items.length - 1)),
              ),
            );
          },
        },
      });
      frames.forEach((frame, i) => {
        if (i > 0)
          timeline.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0%)", duration: 1, ease: "none" },
            i - 1,
          );
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, items.length]);
  const choose = (i) => {
    const index = (i + items.length) % items.length;
    setActive(index);
    if (!reduced) {
      const el = root.current;
      window.scrollTo({
        top:
          el.offsetTop +
          (el.offsetHeight - innerHeight) *
            (index / Math.max(1, items.length - 1)),
        behavior: "instant",
      });
    }
  };
  const item = items[active];
  return (
    <section
      className={`space-gallery ${reduced ? "is-static" : ""}`}
      id="spaces"
      ref={root}
      aria-label="GVK Decor image selections"
    >
      <div className="space-sticky">
        <div className="space-heading">
          <p className="eyebrow">03 / THE SPACES</p>
          <span>
            {verified.length
              ? "SELECTED PROJECTS"
              : "FROM THE SUPPLIED GVK DECOR DECK"}
          </span>
        </div>
        <div className="space-stage" data-cursor="View">
          {items.map((entry, i) => (
            <div
              key={entry.id}
              className="space-frame"
              aria-hidden={reduced ? false : i !== active}
            >
              <Media
                item={{
                  ...entry.media[0],
                  video: "",
                  image: entry.media[0].poster || entry.media[0].image,
                }}
              />
              {reduced && (
                <div className="space-static-caption">
                  <h2>{entry.title}</h2>
                  <p>{entry.description}</p>
                  <button
                    className="text-link light-link"
                    onClick={() => setSelected(entry)}
                  >
                    View image selection{" "}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {!reduced && (
          <div className="space-caption">
            <div>
              <p className="eyebrow">{item.location}</p>
              <h2>{item.title}</h2>
              <p className="space-provenance">
                {verified.length
                  ? item.description
                  : "Pitch-deck selection. Project names, locations and credits await confirmation."}
              </p>
            </div>
            <div className="space-actions">
              <button
                className="text-link light-link"
                onClick={() => setSelected(item)}
              >
                View image selection{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              <div className="space-index">
                <button
                  aria-label="Previous selection"
                  onClick={() => choose(active - 1)}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <span aria-live="polite">
                  0{active + 1} / 0{items.length}
                </span>
                <button
                  aria-label="Next selection"
                  onClick={() => choose(active + 1)}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {selected && (
        <ProjectViewer project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
