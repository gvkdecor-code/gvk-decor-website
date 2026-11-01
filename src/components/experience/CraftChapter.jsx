import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Media from "../Media";
import { craftSequence, sequenceFilm } from "../../data/site";
import useReducedMotion from "../../hooks/useReducedMotion";
import { gsap } from "../../hooks/motion";
export default function CraftChapter() {
  const root = useRef(null),
    video = useRef(null),
    [active, setActive] = useState(0),
    [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(root.current, {
        "--craft-progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          onUpdate: (self) => {
            root.current.dataset.progress = self.progress.toFixed(3);
            setActive(Math.min(2, Math.floor(self.progress * 3)));
            const film = video.current;
            if (
              film &&
              !film.seeking &&
              film.readyState >= 2 &&
              Number.isFinite(film.duration)
            )
              film.currentTime =
                self.progress * Math.max(0, film.duration - 0.08);
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  const choose = (i) => {
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
      ref={root}
      id="craft"
      className={`craft-chapter ${reduced ? "is-static" : ""}`}
      aria-labelledby="craft-title"
    >
      <div className="craft-sticky">
        <div className="craft-heading">
          <p className="eyebrow">02 / THE ATELIER</p>
          <h2 id="craft-title">
            The hand behind
            <br />
            <em>the fabric.</em>
          </h2>
        </div>
        <div className="craft-scenes">
          {craftSequence.map((scene, i) => (
            <article
              key={scene.id}
              className={`craft-scene ${i === active ? "is-active" : ""}`}
              aria-hidden={!reduced && i !== active}
            >
              <div className="craft-image">
                <Media item={scene} />
              </div>
              <div className="craft-caption">
                <span className="chapter-counter">0{i + 1} / 03</span>
                <h3>{scene.title}</h3>
                <p>{scene.detail}</p>
                <Link className="text-link light-link" to="/behind-the-craft">
                  Behind the craft <ArrowUpRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        {sequenceFilm.video && !reduced && !failed && (
          <video
            className="craft-scroll-film"
            ref={video}
            src={sequenceFilm.video}
            poster={sequenceFilm.poster || undefined}
            aria-label={sequenceFilm.alt || "GVK Decor scroll film"}
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => window.dispatchEvent(new Event("scroll"))}
            onSeeked={() => window.dispatchEvent(new Event("scroll"))}
            onError={() => setFailed(true)}
          />
        )}
        <div className="craft-navigation">
          <div aria-label="Choose a craft chapter">
            {craftSequence.map((scene, i) => (
              <button
                aria-pressed={active === i}
                key={scene.id}
                onClick={() => choose(i)}
              >
                <span aria-hidden="true">0{i + 1}</span>
                <span>{scene.title}</span>
              </button>
            ))}
          </div>
          <a href="#spaces">
            Continue to the spaces <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
        <p className="craft-credit">
          {sequenceFilm.video && !failed
            ? "GVK Decor craft film"
            : "Pitch-deck photography · original craft footage pending"}
        </p>
      </div>
    </section>
  );
}
