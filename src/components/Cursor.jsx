import { useEffect, useRef } from "react";
export default function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const eligible = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let dispose = () => {};
    const bind = () => {
      dispose();
      if (!eligible.matches) {
        ref.current.style.opacity = 0;
        return;
      }
      let frame = 0;
      const move = (e) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const el = ref.current;
          el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
          el.style.opacity = e.target.closest("input, textarea, select, dialog")
            ? 0
            : 1;
          el.classList.toggle("is-link", Boolean(e.target.closest("a,button")));
        });
      };
      const leave = () => {
        ref.current.style.opacity = 0;
      };
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerleave", leave);
      dispose = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
      };
    };
    bind();
    eligible.addEventListener("change", bind);
    return () => {
      dispose();
      eligible.removeEventListener("change", bind);
    };
  }, []);
  return (
    <div className="cursor-aura" ref={ref} aria-hidden="true">
      <span />
    </div>
  );
}
