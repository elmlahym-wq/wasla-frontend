"use client";
import { useEffect, useRef, useState } from "react";
import { useSectionActivation } from "./use-section-activation";

/** Native scrolling owns the playhead. React updates only at a step boundary. */
export function useJourneyScroll() {
  const ref = useRef<HTMLElement>(null);
  const marker = useRef<SVGGElement>(null);
  const [active, setActive] = useState(0);
  const ready = useSectionActivation(ref);
  useEffect(() => {
    const section = ref.current;
    if (!section || !ready) return;
    const steps = [...section.querySelectorAll<HTMLElement>("[data-journey-step]")];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let centers: number[] = [], visible = false, frame = 0, disposed = false;
    const measure = () => { centers = steps.map(node => { const box = node.getBoundingClientRect(); return scrollY + box.top + box.height / 2; }); };
    const update = () => {
      frame = 0;
      if (!centers.length || document.hidden) return;
      const focus = scrollY + innerHeight * (innerWidth <= 850 ? .8 : .52);
      const progress = Math.max(0, Math.min(1, (focus - centers[0]) / (centers.at(-1)! - centers[0])));
      let next = 0;
      for (let index = 1; index < centers.length; index++) if (focus >= (centers[index - 1] + centers[index]) / 2) next = index;
      const playhead = reduced.matches ? next / (steps.length - 1) : progress;
      marker.current?.setAttribute("transform", `translate(${376 - 352 * playhead} 32)`);
      section.style.setProperty("--wa-journey-progress", String(playhead));
      setActive(previous => previous === next ? previous : next);
    };
    const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); schedule(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { measure(); schedule(); } else { cancelAnimationFrame(frame); frame = 0; } });
    observer.observe(section);
    const sizes = new ResizeObserver(resize); sizes.observe(section); steps.forEach(node => sizes.observe(node));
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", resize);
    window.addEventListener("wasla-replay-workflow", resize);
    document.addEventListener("visibilitychange", schedule); reduced.addEventListener("change", schedule);
    void document.fonts.ready.then(() => { if (!disposed) resize(); });
    measure();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", resize); window.removeEventListener("wasla-replay-workflow", resize); document.removeEventListener("visibilitychange", schedule); reduced.removeEventListener("change", schedule); };
  }, [ready]);
  return { ref, marker, active, ready };
}
