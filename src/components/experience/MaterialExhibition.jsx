import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { collections } from "../../data/site";
import Media from "../Media";
import useReducedMotion from "../../hooks/useReducedMotion";
export default function MaterialExhibition() {
  const track = useRef(null),
    reduced = useReducedMotion();
  const move = (direction) =>
    track.current.scrollBy({
      left: direction * track.current.clientWidth * 0.8,
      behavior: reduced ? "instant" : "smooth",
    });
  return (
    <section
      className="material-exhibition section"
      id="collections"
      aria-labelledby="materials-title"
    >
      <div className="exhibition-heading">
        <div>
          <p className="eyebrow">04 / THE COLLECTIONS</p>
          <h2 id="materials-title">
            Materials for a<br />
            <em>personal world.</em>
          </h2>
        </div>
        <div className="exhibition-intro">
          <p>
            Explore the seven furnishing expressions. Follow a material, a
            texture, or the light in your room.
          </p>
          <div className="exhibition-arrows">
            <button onClick={() => move(-1)} aria-label="Previous collections">
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button onClick={() => move(1)} aria-label="Next collections">
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="material-track"
        ref={track}
        aria-label="Browse collections"
      >
        {collections.map((item, i) => (
          <article className="material-card" key={item.id}>
            <Link
              to={`/collections#${item.id}`}
              aria-label={`Discover ${item.name}`}
              data-cursor="Discover"
            >
              <div className="material-image">
                <Media item={item} />
              </div>
              <div className="material-title">
                <span className="index">0{i + 1}</span>
                <h3>{item.name}</h3>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
              <p>{item.category}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
