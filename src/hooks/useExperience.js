import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

// One observer and one scheduled frame for the entire page. No scroll hijacking.
export function useExperience() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      const targets = [...document.querySelectorAll("[data-reveal]")];
      if (reduced.matches) {
        targets.forEach((el) => el.classList.remove("reveal-pending"));
        document
          .querySelectorAll("[data-parallax]")
          .forEach((el) => el.style.removeProperty("--shift"));
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) {
              target.classList.remove("reveal-pending");
              observer.unobserve(target);
            }
          });
        },
        { threshold: 0.08 },
      );
      targets.forEach((el) => {
        el.classList.add("reveal-pending");
        observer.observe(el);
      });
      const layers = [...document.querySelectorAll("[data-parallax]")];
      let frame = 0;
      const paint = () => {
        frame = 0;
        if (document.hidden) return;
        layers.forEach((el) => {
          const box = el.getBoundingClientRect();
          if (box.bottom > 0 && box.top < innerHeight) {
            el.style.setProperty(
              "--shift",
              `${Math.max(-35, Math.min(35, (innerHeight / 2 - box.top - box.height / 2) * 0.065))}px`,
            );
          }
        });
        const story = document.querySelector("[data-story]");
        if (story) {
          const box = story.getBoundingClientRect();
          const progress = Math.max(
            0,
            Math.min(1, (innerHeight - box.top) / (innerHeight + box.height)),
          );
          story.style.setProperty("--story-progress", `${progress * 100}%`);
        }
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(paint);
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      paint();
      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        targets.forEach((el) => el.classList.remove("reveal-pending"));
      };
    };
    setup();
    reduced.addEventListener("change", setup);
    return () => {
      cleanup();
      reduced.removeEventListener("change", setup);
    };
  }, [pathname]);
}

export function usePageTransitions() {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = event.target.closest("a");
      if (
        !anchor ||
        anchor.target ||
        anchor.download ||
        !document.startViewTransition ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname === location.pathname)
        return;
      event.preventDefault();
      document.startViewTransition(() =>
        flushSync(() => navigate(url.pathname + url.search + url.hash)),
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);
}
