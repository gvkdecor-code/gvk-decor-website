import { useEffect, useRef, useState } from "react";

export default function Media({
  item,
  className = "",
  label = "Abstract textile study · original photography to follow",
  priority = false,
  cinematic = false,
}) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    setFailed(false);
    setPlaying(false);
  }, [item.image, item.video]);
  useEffect(() => {
    const video = videoRef.current;
    if (!cinematic || !video) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (reduced.matches) video.pause();
    };
    reduced.addEventListener("change", stop);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
    return () => {
      reduced.removeEventListener("change", stop);
      observer.disconnect();
    };
  }, [cinematic, item.video, failed]);
  return (
    <div
      className={`media ${failed ? "media-failed" : ""} ${item.tone || "weave"} ${className}`}
    >
      {!failed && item.video ? (
        <>
          <video
            ref={videoRef}
            controls={!cinematic}
            playsInline
            muted={cinematic}
            loop={cinematic}
            preload="none"
            poster={item.poster || undefined}
            aria-label={item.alt || "GVK Decor film"}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
          >
            <source src={item.video} />
            {item.captions && (
              <track
                kind="captions"
                src={item.captions}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
          {cinematic && (
            <button
              className="film-control"
              onClick={() => {
                const v = videoRef.current;
                if (v.paused) v.play().catch(() => setFailed(true));
                else v.pause();
              }}
            >
              {playing ? "Pause film" : "Play film"}
            </button>
          )}
        </>
      ) : !failed && item.image ? (
        <img
          src={item.image}
          srcSet={item.srcSet || undefined}
          sizes={item.sizes || "100vw"}
          alt={item.alt || ""}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          width={item.width || 1600}
          height={item.height || 1100}
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <div className="textile" aria-hidden="true" />
          <span className="media-label">
            {failed ? "Media unavailable · original imagery to follow" : label}
          </span>
        </>
      )}
    </div>
  );
}
