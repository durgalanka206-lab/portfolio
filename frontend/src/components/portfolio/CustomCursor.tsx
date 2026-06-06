import { useEffect, useRef, useState } from "react";

/** Higher = ring catches the dot faster (frame-rate independent). */
const RING_SMOOTHNESS = 32;
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label[for], [data-cursor-hover]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const visible = useRef(false);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    setActive(true);
    document.documentElement.classList.add("custom-cursor-active");

    const setDotPosition = (x: number, y: number) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const setRingPosition = (x: number, y: number) => {
      if (!ringRef.current) return;
      ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = 1 - Math.exp(-RING_SMOOTHNESS * dt);

      ring.current.x += (mouse.current.x - ring.current.x) * t;
      ring.current.y += (mouse.current.y - ring.current.y) * t;
      setRingPosition(ring.current.x, ring.current.y);
      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setDotPosition(e.clientX, e.clientY);
      if (!visible.current) {
        visible.current = true;
        ring.current = { x: e.clientX, y: e.clientY };
        dotRef.current?.classList.remove("custom-cursor--hidden");
        ringRef.current?.classList.remove("custom-cursor--hidden");
      }
    };

    const onLeave = () => {
      visible.current = false;
      dotRef.current?.classList.add("custom-cursor--hidden");
      ringRef.current?.classList.add("custom-cursor--hidden");
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      setHovering(!!target.closest(INTERACTIVE_SELECTOR));
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("pointerover", onOver);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot custom-cursor--hidden"
        data-hover={hovering || undefined}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring custom-cursor--hidden"
        data-hover={hovering || undefined}
        aria-hidden
      />
    </>
  );
}
