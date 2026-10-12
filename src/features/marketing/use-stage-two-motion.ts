"use client";
import { useEffect, type RefObject } from "react";

/** Desktop pointer effects stay outside React rendering and cancel under reduced motion. */
export function useStageTwoMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const card = hero.querySelector<HTMLElement>(".wa-match-preview");
    const diamond = hero.querySelector<HTMLElement>(".ws-agent-portrait .ws-wasla-agent");
    const buttons = [...hero.querySelectorAll<HTMLElement>(".ws-agent-entry-actions > a, .ws-agent-entry-actions > button")];
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      if (card) card.style.transform = "";
      buttons.forEach(button => { button.style.transform = ""; });
      if (diamond) diamond.style.transform = "";
      delete hero.dataset.pointerActive;
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = hero.getBoundingClientRect();
        hero.style.setProperty("--wa-pointer-x", `${event.clientX - box.left}px`);
        hero.style.setProperty("--wa-pointer-y", `${event.clientY - box.top}px`);
        hero.dataset.pointerActive = "true";
        if (diamond) diamond.style.transform = `translate(${((event.clientX-box.left)/box.width-.5)*8}px, ${((event.clientY-box.top)/box.height-.5)*8}px)`;
        if (card) {
          const b = card.getBoundingClientRect();
          const over = event.clientX >= b.left && event.clientX <= b.right && event.clientY >= b.top && event.clientY <= b.bottom;
          const x = (event.clientX - b.left) / b.width - .5, y = (event.clientY - b.top) / b.height - .5;
          card.style.transform = over ? `perspective(1100px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)` : "";
        }
        buttons.forEach(button => {
          const b = button.getBoundingClientRect();
          const over = event.clientX >= b.left && event.clientX <= b.right && event.clientY >= b.top && event.clientY <= b.bottom;
          button.style.transform = over ? `translate(${((event.clientX - b.left) / b.width - .5) * 12}px, ${((event.clientY - b.top) / b.height - .5) * 12}px)` : "";
        });
      });
    };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) reset(); });
    observer.observe(hero);
    const hidden = () => { if (document.hidden) reset(); };
    document.addEventListener("visibilitychange", hidden);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    fine.addEventListener("change", reset); reduced.addEventListener("change", reset);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", hidden); reset(); hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", reset); fine.removeEventListener("change", reset); reduced.removeEventListener("change", reset); };
  }, [ref]);
}
