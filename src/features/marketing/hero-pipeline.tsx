"use client";
import { useEffect, useRef, useState } from "react";

const states = ["يبحث", "يحلّل", "يجهّز", "بانتظار موافقتك"];

/** Illustrative sequence: plays once, pauses out of view, never claims a submission. */
export function HeroPipeline() {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let ready = !document.documentElement.classList.contains("wa-intro-pending");
    let step = 0;
    let timer: number | undefined;
    const cancel = () => { window.clearTimeout(timer); timer = undefined; };
    const schedule = () => {
      if (timer !== undefined || !ready || !visible || document.hidden || motion.matches || step === states.length - 1) return;
      timer = window.setTimeout(() => { timer = undefined; setActive(++step); schedule(); }, 1100);
    };
    const start = () => { ready = true; schedule(); };
    const changed = () => { node.dataset.visible = String(visible && !document.hidden); cancel(); schedule(); };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting; node.dataset.visible = String(visible && !document.hidden); cancel(); schedule();
    }, { threshold: .25 });
    observer?.observe(node);
    if (!observer) { visible = true; node.dataset.visible = "true"; schedule(); }
    window.addEventListener("wasla-intro-hero", start);
    document.addEventListener("visibilitychange", changed);
    motion.addEventListener("change", changed);
    return () => {
      cancel(); observer?.disconnect();
      window.removeEventListener("wasla-intro-hero", start);
      document.removeEventListener("visibilitychange", changed);
      motion.removeEventListener("change", changed);
    };
  }, []);
  return <ol ref={ref} className="wa-hero-pipeline" data-visible="false" aria-label="مثال على مراحل عمل وكيل وصلة">{states.map((label, index) =>
    <li key={label} aria-current={active === index ? "step" : undefined} data-state={active === index ? "active" : index < active ? "complete" : "pending"}><span aria-hidden="true" />{label}</li>
  )}</ol>;
}
