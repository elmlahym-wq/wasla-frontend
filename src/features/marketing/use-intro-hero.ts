"use client";
import { useEffect, useRef } from "react";

/** Content remains visible without JS, on repeat visits and under reduced motion. */
export function useIntroHero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    let played = false;
    let visible = true;
    const sync = () => { animations.forEach(animation => { if (document.hidden || !visible) { if (animation.playState === "running") animation.pause(); } else if (animation.playState === "paused") animation.play(); }); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(hero);
    document.addEventListener("visibilitychange", sync);
    const prepare = () => {
      if (!motion.matches) hero.dataset.introWaiting = "true";
    };
    const play = () => {
      delete hero.dataset.introWaiting;
      if (played || motion.matches || !hero.animate) return;
      played = true;
      const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
      const diamond = hero.querySelector<HTMLElement>(".ws-agent-portrait > .ws-wasla-agent");
      if (diamond) animations.push(diamond.animate([
        { transform: "scale(.84) rotate(-6deg)", opacity: 0 },
        { transform: "scale(1.035) rotate(1deg)", opacity: 1, offset: .7 },
        { transform: "scale(1) rotate(0deg)", opacity: 1 },
      ], { duration: 760, easing: ease, fill: "backwards" }));
      const enter = getComputedStyle(hero).direction === "rtl" ? 16 : -16;
      hero.querySelectorAll<HTMLElement>(".wa-hero-word").forEach((word, index) => {
        animations.push(word.animate([
          { opacity: 0, transform: `translateX(${enter}px) translateY(10px)` },
          { opacity: 1, transform: "translateX(0) translateY(0)" },
        ], { duration: 520, delay: index * 65, easing: ease, fill: "backwards" }));
      });
      hero.querySelectorAll<HTMLElement>(".ws-agent-portrait-heading, .wa-match-heading, .ws-agent-portrait-caption, .wa-hero-pipeline").forEach((text, index) => {
        animations.push(text.animate([
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 520, delay: 90 + index * 90, easing: ease, fill: "backwards" }));
      });
      hero.querySelectorAll<HTMLElement>(".wa-match-row").forEach((row, index) => {
        animations.push(row.animate([
          { opacity: 0, transform: `translateX(${enter}px) translateY(8px)` },
          { opacity: 1, transform: "translateX(0) translateY(0)" },
        ], { duration: 520, delay: 150 + index * 110, easing: ease, fill: "backwards" }));
      });
    };
    const onMotionChange = () => {
      if (motion.matches) { delete hero.dataset.introWaiting; animations.forEach(animation => animation.cancel()); }
    };
    window.addEventListener("wasla-intro-start", prepare);
    window.addEventListener("wasla-intro-hero", play);
    window.addEventListener("wasla-intro-complete", play);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      delete hero.dataset.introWaiting;
      animations.forEach(animation => animation.cancel());
      window.removeEventListener("wasla-intro-start", prepare);
      window.removeEventListener("wasla-intro-hero", play);
      window.removeEventListener("wasla-intro-complete", play);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);
  return ref;
}
