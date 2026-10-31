import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects, deckSelections } from "../data/site";
import Media from "./Media";
import ProjectViewer from "./ProjectViewer";
import useReducedMotion from "../hooks/useReducedMotion";
import { gsap } from "../hooks/motion";

export default function PortfolioStage() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(null);
  const confirmed = projects.filter((p) => p.media?.length).slice(0, 3);
  const featured = confirmed.length ? confirmed : deckSelections;
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".portfolio-screen").forEach((screen) => {
        const image = screen.querySelector(".portfolio-background");
        gsap.fromTo(
          image,
          { scale: 1.13, clipPath: "inset(8% 6% 8% 6%)" },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: screen,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section
      ref={root}
      id="selected-projects"
      className="portfolio-stage"
      aria-label="Selected GVK Decor projects"
    >
      {featured.length ? (
        featured.map((project, i) => (
          <article
            className="portfolio-screen"
            key={project.id}
            data-cursor="View"
          >
            <div className="portfolio-background">
              <Media
                item={{
                  ...project.media[0],
                  video: "",
                  image: project.media[0].poster || project.media[0].image,
                }}
              />
            </div>
            <div className="portfolio-shade" />
            <div className="portfolio-top">
              <p className="eyebrow">
                {confirmed.length
                  ? "04 / SELECTED PROJECTS"
                  : "04 / FROM THE GVK DECOR DECK"}
              </p>
              <span>
                0{i + 1} / 0{featured.length}
              </span>
            </div>
            <div className="portfolio-copy" data-reveal>
              <p className="eyebrow">
                {project.location} · {project.category}
              </p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <button
                className="text-link"
                onClick={() => setSelected(project)}
              >
                {confirmed.length
                  ? "Explore the project"
                  : "View the deck selection"}{" "}
                <ArrowUpRight aria-hidden="true" size={19} />
              </button>
            </div>
          </article>
        ))
      ) : (
        <article className="portfolio-screen portfolio-pending">
          <div className="portfolio-background">
            <Media item={{ tone: "architecture" }} />
          </div>
          <div className="portfolio-shade" />
          <div className="portfolio-top">
            <p className="eyebrow">04 / THE PROJECT JOURNAL</p>
            <span>ORIGINAL WORK ONLY</span>
          </div>
          <div className="portfolio-copy" data-reveal>
            <p className="eyebrow">AWAITING ORIGINAL PROJECT PHOTOGRAPHY</p>
            <h2>
              GVK Decor projects.
              <br />
              <em>Seen in full.</em>
            </h2>
            <p>
              Completed projects will appear here after their photographs, films
              and project details have been reviewed.
            </p>
            <Link to="/projects" className="text-link">
              Visit the project journal{" "}
              <ArrowUpRight aria-hidden="true" size={19} />
            </Link>
          </div>
          <p className="selected-disclosure">
            Spatial study · not a completed GVK Decor project
          </p>
        </article>
      )}
      {selected && (
        <ProjectViewer project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
