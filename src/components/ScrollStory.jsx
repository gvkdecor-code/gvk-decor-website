import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { craftSequence, sequenceFilm } from "../data/site";
import Media from "./Media";
import useReducedMotion from "../hooks/useReducedMotion";

// Scroll position is the source of truth. No wheel/touch interception or autoplay.
export default function ScrollStory() {
  const root = useRef(null);
  const film = useRef(null);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const [filmReady, setFilmReady] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      root.current?.style.removeProperty("--sequence-progress");
      return;
    }
    let frame = 0;
    const paint = () => {
      frame = 0;
      const element = root.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)),
      );
      element.style.setProperty("--sequence-progress", progress);
      element.dataset.progress = progress.toFixed(3);
      setActive(
        Math.min(
          craftSequence.length - 1,
          Math.floor(progress * craftSequence.length),
        ),
      );
      const video = film.current;
      if (
        video &&
        !video.seeking &&
        video.readyState >= 2 &&
        Number.isFinite(video.duration)
      ) {
        const next = progress * Math.max(0, video.duration - 0.08);
        if (Math.abs(video.currentTime - next) > 0.08) video.currentTime = next;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduce]);
  const jump = (index) => {
    const el = root.current;
    const total = el.offsetHeight - innerHeight;
    const top = el.getBoundingClientRect().top + scrollY;
    window.scrollTo({
      top: top + total * ((index + 0.35) / craftSequence.length),
      behavior: "instant",
    });
  };
  return (
    <section
      ref={root}
      className={`scroll-story ${reduce ? "is-reduced" : ""}`}
      id="craft-sequence"
      aria-label="From light to the finishing detail"
      data-active={active}
    >
      <div className="story-sticky">
        {sequenceFilm.video && !reduce && !failed && (
          <video
            className={`scroll-film ${filmReady ? "is-ready" : ""}`}
            ref={film}
            src={sequenceFilm.video}
            poster={sequenceFilm.poster || undefined}
            aria-label={sequenceFilm.alt || "GVK Decor craft sequence"}
            playsInline
            muted
            preload="metadata"
            onSeeked={() => window.dispatchEvent(new Event("scroll"))}
            onLoadedData={() => {
              setFilmReady(true);
              window.dispatchEvent(new Event("scroll"));
            }}
            onError={() => setFailed(true)}
          >
            {sequenceFilm.captions && (
              <track
                kind="captions"
                src={sequenceFilm.captions}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
        )}
        <div className="story-shade" />
        <div className="story-top">
          <p className="eyebrow">02 / A MATERIAL CONVERSATION</p>
          <Link to="/behind-the-craft">
            Behind the craft <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
        <div className="story-frames">
          {craftSequence.map((scene, i) => (
            <article
              className={`story-frame ${i === active ? "is-active" : ""}`}
              key={scene.id}
              aria-hidden={!reduce && active !== i}
            >
              <div className="story-material">
                <Media
                  item={scene}
                  label="Abstract material study · original media pending"
                />
              </div>
              <div className="story-caption">
                <span className="story-scene-index">0{i + 1} / 03</span>
                <h2>{scene.title}</h2>
                <p>{scene.detail}</p>
              </div>
            </article>
          ))}
        </div>
        {!reduce && (
          <div className="story-bottom">
            <div
              className="story-chapters"
              aria-label="Choose a material chapter"
            >
              {craftSequence.map((scene, i) => (
                <button
                  key={scene.id}
                  onClick={() => jump(i)}
                  aria-pressed={i === active}
                >
                  <span>0{i + 1}</span>
                  {scene.title}
                </button>
              ))}
            </div>
            <a className="story-skip" href="#collections">
              Continue to collections <ArrowDown aria-hidden="true" size={14} />
            </a>
          </div>
        )}
        {(!sequenceFilm.video || failed) && (
          <p className="sequence-disclosure">
            Pitch-deck photography · scroll-film footage pending
          </p>
        )}
      </div>
    </section>
  );
}
