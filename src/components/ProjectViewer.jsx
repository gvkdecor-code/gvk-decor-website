import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Media from "./Media";
export default function ProjectViewer({ project, onClose }) {
  const ref = useRef(null);
  const returnFocus = useRef(null);
  const [index, setIndex] = useState(0);
  const slides = project.media || [];
  useEffect(() => {
    if (!returnFocus.current) returnFocus.current = document.activeElement;
    ref.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocus.current?.focus();
    };
  }, []);
  const change = (delta) =>
    setIndex((i) => (i + delta + slides.length) % slides.length);
  return (
    <dialog
      ref={ref}
      className="project-viewer"
      aria-modal="true"
      aria-labelledby="project-title"
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" && slides.length > 1) change(1);
        if (e.key === "ArrowLeft" && slides.length > 1) change(-1);
      }}
    >
      <button
        autoFocus
        className="viewer-close"
        onClick={onClose}
        aria-label="Close project"
      >
        Close <X aria-hidden="true" size={20} />
      </button>
      <div className="viewer-stage" key={index}>
        {slides[index] && <Media item={slides[index]} priority />}
      </div>
      <div className="viewer-info">
        <div>
          <p className="eyebrow">
            {project.location} · {project.category}
          </p>
          <h2 id="project-title">{project.title}</h2>
          <p>{project.description}</p>
        </div>
        <div className="viewer-controls">
          <button
            onClick={() => change(-1)}
            disabled={slides.length < 2}
            aria-label="Previous image"
          >
            <ArrowLeft aria-hidden="true" size={20} />
          </button>
          <span aria-live="polite">
            {index + 1} / {slides.length}
          </span>
          <button
            onClick={() => change(1)}
            disabled={slides.length < 2}
            aria-label="Next image"
          >
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>
    </dialog>
  );
}
