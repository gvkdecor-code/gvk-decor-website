import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import Media from "./components/Media";
import { Enquire } from "./components/Layout";
import { collections, heroMedia, craftStudies, projects } from "./data/site";

function CollectionExplorer() {
  const [active, setActive] = useState(0);
  const item = collections[active];
  return (
    <section className="collection-explorer section" id="collections">
      <div className="explorer-intro" data-reveal>
        <p className="eyebrow">03 / EXPRESSIONS OF YOU</p>
        <h2>
          A world of
          <br />
          <em>possibilities.</em>
        </h2>
        <p>Different expressions. One considered home.</p>
      </div>
      <div className="collection-selector" aria-label="Explore collections">
        {collections.map((c, i) => (
          <button
            key={c.id}
            aria-pressed={active === i}
            aria-controls="collection-preview"
            onClick={() => setActive(i)}
          >
            <span className="index">0{i + 1}</span>
            <span>{c.name}</span>
            <ArrowUpRight size={19} />
          </button>
        ))}
      </div>
      <div
        className="collection-preview"
        id="collection-preview"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="collection-image" key={item.id}>
          <Media item={item} />
          <span className="preview-count">0{active + 1} / 07</span>
        </div>
        <div className="preview-caption">
          <div>
            <p className="eyebrow">{item.name}</p>
            <h3>{item.category}</h3>
          </div>
          <Link
            to={`/collections#${item.id}`}
            className="round-link"
            aria-label={`Discover ${item.name}`}
          >
            <ArrowUpRight size={22} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  const [craft, setCraft] = useState(0);
  useEffect(() => {
    document.title = "GVK Decor — 67 Years of Craft. Infinite Possibilities.";
  }, []);
  return (
    <>
      <section className="cinematic-hero" aria-labelledby="hero-title">
        <div className="hero-backdrop" data-parallax>
          <Media
            item={heroMedia}
            priority
            cinematic
            label="ABSTRACT TEXTILE STUDY — ORIGINAL GVK DECOR FILM TO FOLLOW"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-topline">
          <span>BESPOKE FURNISHINGS</span>
          <span>JUBILEE HILLS, HYDERABAD</span>
        </div>
        <div className="hero-content">
          <p className="eyebrow hero-enter">A LEGACY, STILL UNFOLDING.</p>
          <h1
            id="hero-title"
            aria-label="67 Years of Craft. Infinite Possibilities."
          >
            <span className="hero-line">
              <span>67 Years of Craft.</span>
            </span>
            <span className="hero-line">
              <em>Infinite Possibilities.</em>
            </span>
          </h1>
          <div className="hero-description hero-enter">
            <p>
              Some spaces are furnished.
              <br />
              Others are felt.
            </p>
            <Link className="hero-explore" to="/collections">
              Explore the world of GVK{" "}
              <span>
                <ArrowUpRight size={21} />
              </span>
            </Link>
          </div>
        </div>
        {!heroMedia.image && !heroMedia.video && (
          <p className="hero-disclosure">
            Abstract textile study
            <br />
            Original GVK Decor film to follow
          </p>
        )}
        <div className="hero-bottom">
          <a href="#heritage" className="scroll-cue">
            <span className="scroll-track" />
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={13} />
          </a>
          <span className="hero-edition">A CONSIDERED LIFE / EST. 1959</span>
        </div>
      </section>
      <section className="heritage-chapter section" id="heritage" data-story>
        <div className="chapter-head" data-reveal>
          <p className="eyebrow">01 / AN ENDURING SENSIBILITY</p>
          <span className="chapter-location">HYDERABAD, INDIA</span>
        </div>
        <div className="heritage-story">
          <div className="heritage-date" data-reveal>
            1959<span>THE BEGINNING OF OUR STORY.</span>
          </div>
          <div className="heritage-words" data-reveal>
            <h2>
              Trends pass.
              <br />A feeling of home
              <br />
              <em>stays with you.</em>
            </h2>
            <p>
              For 67 years, GVK Decor has been part of the conversation around
              beautiful homes. Rooted in Hyderabad. Drawn to the extraordinary
              in the everyday.
            </p>
            <Link to="/our-legacy" className="text-link">
              Discover our legacy <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <p className="story-statement" data-reveal>
          Not just how a space looks.
          <br />
          <em>How it makes you feel.</em>
        </p>
      </section>
      <section className="craft-chapter" id="craft">
        <div className="craft-chapter-heading section" data-reveal>
          <p className="eyebrow">02 / THE QUIET PURSUIT OF EXTRAORDINARY</p>
          <h2>
            Look closer.
            <br />
            <em>Feel the difference.</em>
          </h2>
          <p>
            In a thread. In a fold. In the details that bring everything
            together.
          </p>
        </div>
        <div className="craft-stage">
          <div className="craft-media" key={craft} data-parallax>
            <Media
              item={craftStudies[craft]}
              cinematic
              label="MACRO MATERIAL STUDY — ORIGINAL CRAFT PHOTOGRAPHY TO FOLLOW"
            />
          </div>
          <div className="craft-vignette" />
          <div className="craft-stage-copy">
            <p className="eyebrow">THE ANATOMY OF A FEELING</p>
            <h3 key={craft}>{craftStudies[craft].title}</h3>
            <p>{craftStudies[craft].detail}</p>
            <Link to="/behind-the-craft" className="text-link">
              Behind the craft <ArrowUpRight size={17} />
            </Link>
          </div>
          {!craftStudies[craft].image && !craftStudies[craft].video && (
            <p className="craft-disclosure">
              Macro material study · original craft photography to follow
            </p>
          )}
          <div className="craft-controls" aria-label="Explore craftsmanship">
            {craftStudies.map((s, i) => (
              <button
                key={s.title}
                aria-pressed={craft === i}
                onClick={() => setCraft(i)}
              >
                <span>0{i + 1}</span>
                {s.title}
                <Plus size={15} />
              </button>
            ))}
          </div>
        </div>
      </section>
      <CollectionExplorer />
      <section className="selected-chapter" id="selected-projects">
        <div className="selected-backdrop" data-parallax>
          <Media
            item={projects[0]?.media[0] || { tone: "architecture" }}
            label={
              projects.length
                ? undefined
                : "SPATIAL STUDY — NOT A COMPLETED GVK DECOR PROJECT"
            }
          />
        </div>
        <div className="selected-shade" />
        <div className="selected-top">
          <p className="eyebrow">04 / SPACES WITH A STORY</p>
          <span>THE PROJECT JOURNAL</span>
        </div>
        <div className="selected-copy" data-reveal>
          <h2>
            Distinctly personal.
            <br />
            <em>Beautifully lived.</em>
          </h2>
          <p>
            {projects.length
              ? "Explore original GVK Decor projects and the details that bring each space to life."
              : "Our project journal is being prepared with original GVK Decor photography. A closer look at real spaces, coming soon."}
          </p>
          <Link to="/projects" className="text-link">
            Explore the project journal <ArrowUpRight size={17} />
          </Link>
        </div>
        {!projects.length && (
          <p className="selected-disclosure">
            Spatial study · not a completed GVK Decor project
          </p>
        )}
        <span className="selected-side">
          ARCHITECTURE / TEXTURE / ATMOSPHERE
        </span>
      </section>
      <section className="philosophy-chapter section">
        <p className="eyebrow" data-reveal>
          05 / THE GVK DECOR PHILOSOPHY
        </p>
        <h2 data-reveal>
          A beautiful home
          <br />
          doesn’t follow a formula.
          <br />
          <em>It follows you.</em>
        </h2>
        <div className="philosophy-foot" data-reveal>
          <span className="philosophy-mark" aria-hidden="true">
            G.
          </span>
          <p>
            Your rituals. Your point of view. Your sense of belonging. We bring
            materials, craft and considered choices together, to create a home
            that feels entirely yours.
          </p>
          <Enquire>Let’s find your expression</Enquire>
        </div>
      </section>
    </>
  );
}
