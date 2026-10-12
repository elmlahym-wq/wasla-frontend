"use client";

import { useEffect } from "react";

/** Pause native CSS and Web Animations while their surface is out of view. */
export function MotionVisibility() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const visibility = new WeakMap<Element, boolean>();
    const targets = new Set<Element>();
    const paused = new Set<Animation>();
    const sync = (target: Element) => {
      for (const animation of target.getAnimations()) {
        if (reduced.matches) {
          animation.cancel();
          paused.delete(animation);
        } else if (document.hidden || !visibility.get(target)) {
          if (animation.playState === "running") {
            animation.pause();
            paused.add(animation);
          }
        } else if (paused.delete(animation) && animation.playState === "paused") {
          animation.play();
        }
      }
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        visibility.set(entry.target, entry.isIntersecting);
        sync(entry.target);
      }
    });
    const watch = (target: Element) => {
      if (!targets.has(target)) {
        targets.add(target);
        const box = target.getBoundingClientRect();
        visibility.set(target, box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth);
        observer.observe(target);
      }
      sync(target);
    };
    const scan = () => {
      for (const target of targets) {
        if (!target.isConnected) {
          targets.delete(target);
          observer.unobserve(target);
        } else sync(target);
      }
      for (const animation of document.getAnimations()) {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (target instanceof Element) watch(target);
      }
      for (const animation of paused) {
        if (animation.playState !== "paused") paused.delete(animation);
      }
    };
    const started = (event: Event) => {
      if (event.target instanceof Element) watch(event.target);
    };
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("animationstart", started, true);
    document.addEventListener("transitionrun", started, true);
    document.addEventListener("visibilitychange", scan);
    window.addEventListener("wasla-intro-hero", scan);
    reduced.addEventListener("change", scan);
    scan();
    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.removeEventListener("animationstart", started, true);
      document.removeEventListener("transitionrun", started, true);
      document.removeEventListener("visibilitychange", scan);
      window.removeEventListener("wasla-intro-hero", scan);
      reduced.removeEventListener("change", scan);
      for (const animation of paused) {
        if (animation.playState === "paused") animation.play();
      }
    };
  }, []);
  return null;
}
