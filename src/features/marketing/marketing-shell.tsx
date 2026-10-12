"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { MarketingNav, MarketingFooter } from "./marketing-nav";
import { WaslaIntro } from "./wasla-intro";

/** Shared public-page effects. No route interception or account changes. */
export function MarketingShell({ children, home = false, pathname = "/" }: { children: ReactNode; home?: boolean; pathname?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement;
        node.dataset.r2Visible = String(entry.isIntersecting);
        if (entry.isIntersecting) node.dataset.r2Entered = "true";
        else node.style.removeProperty("--r2-tilt");
      }
    }, { threshold: .15 });
    const nodes = new Set<HTMLElement>();
    const observeCards = () => {
      root.querySelectorAll<HTMLElement>("[data-word-heading],.wa-pack-document,.wa-credit-receipt,.wa-trust-charter dl>div").forEach(node => {
        if (!nodes.has(node)) { nodes.add(node); observer.observe(node); }
      });
      nodes.forEach(node => { if (!node.isConnected) { observer.unobserve(node); nodes.delete(node); } });
    };
    observeCards();
    // Pricing replaces its receipt on selection; observe the new card too.
    const replacements = new MutationObserver(observeCards);
    replacements.observe(root, { childList: true, subtree: true });
    let frame = 0;
    const clear = () => { cancelAnimationFrame(frame); nodes.forEach(node => { node.style.removeProperty("--r2-tilt"); node.style.removeProperty("--r2-light"); }); };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || event.pointerType !== "mouse" || document.hidden) return;
      const node = (event.target as HTMLElement).closest<HTMLElement>(".wa-pack-document,.wa-credit-receipt,.wa-trust-charter dl>div");
      if (!node || node.dataset.r2Visible !== "true") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = node.getBoundingClientRect(), x = (event.clientX - box.left) / box.width, y = (event.clientY - box.top) / box.height;
        node.style.setProperty("--r2-tilt", `perspective(1100px) rotateX(${(0.5-y)*4}deg) rotateY(${(x-0.5)*4}deg)`);
        node.style.setProperty("--r2-light", `translate(${(x-.5)*120}px,${(y-.5)*120}px)`);
      });
    };
    const leave = (event: PointerEvent) => {
      const node = (event.target as HTMLElement).closest<HTMLElement>(".wa-pack-document,.wa-credit-receipt,.wa-trust-charter dl>div");
      if (node && !node.contains(event.relatedTarget as Node | null)) { node.style.removeProperty("--r2-tilt"); node.style.removeProperty("--r2-light"); }
    };
    root.addEventListener("pointermove", move, { passive: true }); root.addEventListener("pointerout", leave);
    document.addEventListener("visibilitychange", clear); reduced.addEventListener("change", clear); fine.addEventListener("change", clear);
    return () => { replacements.disconnect(); observer.disconnect(); clear(); root.removeEventListener("pointermove", move); root.removeEventListener("pointerout", leave); document.removeEventListener("visibilitychange", clear); reduced.removeEventListener("change", clear); fine.removeEventListener("change", clear); };
  }, []);
  return <div ref={ref} className={`ws-landing wa-round2 ${home ? "wa-home" : "wa-inner-page"}`} lang="ar" dir="rtl">{home && <WaslaIntro />}<MarketingNav active={pathname} /><main id="main-content">{children}</main><MarketingFooter /></div>;
}
