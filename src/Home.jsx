import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Media from "./components/Media";
import { Enquire } from "./components/Layout";
import { brand } from "./data/site";
import ScrollStory from "./components/ScrollStory";
import PortfolioStage from "./components/PortfolioStage";
import Locations from "./components/Locations";
import OpeningSequence from "./components/OpeningSequence";
import CollectionVoyage from "./components/CollectionVoyage";

export default function Home() {
  useEffect(() => {
    document.title = `GVK Decor — ${brand.tagline}`;
  }, []);
  return (
    <>
      <OpeningSequence />
      <section className="heritage-chapter section" id="heritage" data-story>
        <div className="chapter-head" data-reveal>
          <p className="eyebrow">01 / GUNDA VENKATESHWAR RAO</p>
          <span className="chapter-location">HYDERABAD, INDIA</span>
        </div>
        <div className="heritage-story">
          <div className="heritage-date" data-reveal>
            1959<span>THE BEGINNING OF OUR STORY.</span>
          </div>
          <div className="heritage-words" data-reveal>
            <h2>
              A family name.
              <br />
              An artistic practice.
              <br />
              <em>A legacy in fabric.</em>
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
      <CollectionVoyage />
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
