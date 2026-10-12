"use client";
import { useEffect, useState, type RefObject } from "react";

/** Keep SSR content readable; install geometry/scroll work only after the cover and near the section. */
export function useSectionActivation(ref: RefObject<HTMLElement | null>) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let observer: IntersectionObserver | undefined, disposed = false;
    const arm = () => {
      if (disposed || observer || !ref.current) return;
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { setReady(true); observer?.disconnect(); }
      }, { rootMargin: "400px 0px" });
      observer.observe(ref.current);
    };
    window.addEventListener("wasla-intro-complete", arm);
    window.addEventListener("wasla-intro-safety", arm);
    if (!document.documentElement.classList.contains("wa-intro-pending") && !document.querySelector(".wa-intro")) arm();
    return () => { disposed = true; observer?.disconnect(); window.removeEventListener("wasla-intro-complete", arm); window.removeEventListener("wasla-intro-safety", arm); };
  }, [ref]);
  return ready;
}
