import { useEffect } from "react";
import { brand } from "./data/site";
import { Enquire } from "./components/Layout";
import Locations from "./components/Locations";
import FilmOpening from "./components/experience/FilmOpening";
import HeritageSpread from "./components/experience/HeritageSpread";
import CraftChapter from "./components/experience/CraftChapter";
import SpaceGallery from "./components/experience/SpaceGallery";
import MaterialExhibition from "./components/experience/MaterialExhibition";
export default function Home() {
  useEffect(() => {
    document.title = `GVK Decor — ${brand.tagline}`;
  }, []);
  return (
    <>
      <FilmOpening />
      <HeritageSpread />
      <CraftChapter />
      <SpaceGallery />
      <MaterialExhibition />
      <section className="visit-spread section">
        <div>
          <p className="eyebrow">05 / VISIT GVK DECOR</p>
          <h2>
            A conversation.
            <br />
            <em>A different possibility.</em>
          </h2>
          <p>
            Bring your plans, room dimensions or material references. Discuss
            bespoke furnishings at our Hyderabad locations.
          </p>
          <Enquire>Arrange an appointment</Enquire>
        </div>
        <Locations />
      </section>
    </>
  );
}
