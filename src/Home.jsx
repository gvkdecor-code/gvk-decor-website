import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Media from "./components/Media";
import { Enquire } from "./components/Layout";
import { brand, collections, heroMedia } from "./data/site";
import ScrollStory from "./components/ScrollStory";
import PortfolioStage from "./components/PortfolioStage";
import Locations from "./components/Locations";

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
            <ArrowUpRight aria-hidden="true" size={19} />
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
            <ArrowUpRight aria-hidden="true" size={22} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  useEffect(() => {
    document.title = `GVK Decor — ${brand.tagline}`;
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
          <span>JUBILEE HILLS / SECUNDERABAD</span>
        </div>
        <div className="hero-content">
          <p className="eyebrow hero-enter">GVK DECOR / BESPOKE FURNISHINGS</p>
          <h1 id="hero-title" aria-label={brand.tagline}>
            <span className="hero-line">
              <span>Crafting Timeless</span>
            </span>
            <span className="hero-line">
              <em>Spaces Since 1959</em>
            </span>
          </h1>
          <div className="hero-description hero-enter">
            <p>
              Curtains. Blinds. Wallpapers.
              <br />
              Upholstery. Bedding. Bespoke.
            </p>
            <Link className="hero-explore" to="/collections">
              Explore the world of GVK{" "}
              <span>
                <ArrowUpRight aria-hidden="true" size={21} />
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
        {heroMedia.source && (
          <p className="hero-media-credit">
            {heroMedia.source} · opening film pending
          </p>
        )}
        <div className="hero-bottom">
          <a href="#heritage" className="scroll-cue">
            <span className="scroll-track" />
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown aria-hidden="true" size={13} />
          </a>
          <span className="hero-edition">A CONSIDERED LIFE / EST. 1959</span>
        </div>
      </section>
      {!brand.goldLogo && (
        <p className="brand-preview-note">
          Design preview · official gold logo and original film pending review
        </p>
      )}
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
              Founded in 1959 by Gunda Venkateshwar Rao. GVK Decor brings
              curtains, blinds, wallpapers, upholstery, bedding, headboards and
              custom furnishings to homes in Hyderabad. Visit the Experience
              Centre in Jubilee Hills or our store in Secunderabad.
            </p>
            <Link to="/our-legacy" className="text-link">
              Discover our legacy <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
        <p className="story-statement" data-reveal>
          Not just how a space looks.
          <br />
          <em>How it makes you feel.</em>
        </p>
      </section>
      <ScrollStory />
      <CollectionExplorer />
      <PortfolioStage />
      <section className="philosophy-chapter section">
        <p className="eyebrow" data-reveal>
          05 / THE GVK DECOR PHILOSOPHY
        </p>
        <h2 data-reveal>
          From window to wall.
          <br />
          From upholstery to bedding.
          <br />
          <em>A home, considered together.</em>
        </h2>
        <div className="philosophy-foot" data-reveal>
          <span className="philosophy-mark" aria-hidden="true">
            G.
          </span>
          <p>
            Bring your room dimensions, material references or your architect’s
            plans. Discuss curtains, blinds, upholstery and custom furnishings
            with GVK Decor at the Jubilee Hills Experience Centre.
          </p>
          <Enquire>Let’s find your expression</Enquire>
        </div>
      </section>
      <section className="home-locations section">
        <div data-reveal>
          <p className="eyebrow">TWO LOCATIONS / HYDERABAD</p>
          <h2>Meet GVK Decor.</h2>
          <p>{brand.tagline}</p>
        </div>
        <div data-reveal>
          <Locations />
          <Enquire>Enquire about a visit</Enquire>
        </div>
      </section>
    </>
  );
}
