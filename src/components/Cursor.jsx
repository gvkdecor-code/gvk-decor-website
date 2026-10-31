import { useEffect, useRef } from "react";
export default function Cursor() {
  const ref = useRef(null),
    label = useRef(null);
  useEffect(() => {
    const eligible = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let dispose = () => {};
    const bind = () => {
      dispose();
      const el = ref.current;
      if (!eligible.matches) {
        el.style.opacity = 0;
        document.body.classList.remove("cursor-enabled");
        return;
      }
      document.body.classList.add("cursor-enabled");
      let frame = 0,
        tx = 0,
        ty = 0,
        x = 0,
        y = 0,
        visible = false;
      const paint = () => {
        x += (tx - x) * 0.28;
        y += (ty - y) * 0.28;
        el.style.transform = `translate3d(${x}px,${y}px,0)`;
        if (Math.abs(tx - x) + Math.abs(ty - y) > 0.2)
          frame = requestAnimationFrame(paint);
        else frame = 0;
      };
      const move = (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!visible) {
          x = tx;
          y = ty;
          visible = true;
        }
        const excluded = e.target.closest("input,textarea,select,dialog");
        const target = e.target.closest("[data-cursor]");
        const link = e.target.closest("a,button");
        el.style.opacity = excluded ? 0 : 1;
        el.classList.toggle("cursor-context", !!target && !link);
        el.classList.toggle("is-link", !!link);
        label.current.textContent = link ? "↗" : target?.dataset.cursor || "";
        if (!frame) frame = requestAnimationFrame(paint);
      };
      const leave = () => {
        el.style.opacity = 0;
        visible = false;
      };
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerleave", leave);
      dispose = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
        document.body.classList.remove("cursor-enabled");
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
      <span>
        <i />
        <b ref={label} />
      </span>
    </div>
  );
}
