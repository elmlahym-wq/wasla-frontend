"use client";
import { useEffect, useRef, useState } from "react";
type AgentPhase = "Scanning" | "Filtering" | "Tailoring" | "Preparing" | "Applying" | "Submitting" | "Tracking" | null;

export type AgentVisualState = "ready" | "understanding" | "scanning" | "evaluating" | "preparing" | "submitting" | "needs-input" | "paused" | "confirmed-completion";
const phaseAppearance: Record<Exclude<AgentPhase, null>, AgentVisualState> = {
  Scanning: "scanning", Filtering: "evaluating", Tailoring: "preparing", Preparing: "preparing",
  Applying: "submitting", Submitting: "submitting", Tracking: "ready",
};
export function agentAppearance(phase: AgentPhase, running: boolean, needsInput = false): AgentVisualState {
  return phase ? phaseAppearance[phase] : needsInput ? "needs-input" : running ? "ready" : "paused";
}

export const agentMedia = {
  master: "/media/wasla-agent/agent-core-satin.webp",
  avatar: "/media/wasla-agent/agent-core.svg",
};
const focusRing = "M 103 68 H 153 Q 188 68 188 103 V 153 Q 188 188 153 188 H 103 Q 68 188 68 153 V 103 Q 68 68 103 68 Z M 117 99 H 139 Q 157 99 157 117 V 139 Q 157 157 139 157 H 117 Q 99 157 99 139 V 117 Q 99 99 117 99 Z";
const focusSignals = ["M 128 20 V 119", "M 236 128 H 137", "M 128 236 V 137", "M 20 128 H 119"];
export function WaslaAgent({ state = "ready", size = "avatar", label = "وكيل وصلة", className = "" }: {
  state?: AgentVisualState; size?: "avatar" | "hero" | "panel"; label?: string; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);
  const [documentVisible,setDocumentVisible]=useState(true);
  const [failed, setFailed] = useState(false);
  const useSatin = size === "hero" && state === "ready" && !failed;
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(node); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const update = () => setDocumentVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return <span ref={ref} className={`ws-wasla-agent ws-wasla-agent--${size} ${className}`} data-state={state} data-visible={visible&&documentVisible} role="img" aria-label={label}>
    {useSatin ? <><img className="ws-agent-satin" src={agentMedia.master} width={512} height={512} alt="" decoding="async" fetchPriority="high" onError={() => setFailed(true)} /><span className="ws-agent-satin-focus" aria-hidden="true" /></> :
      <svg className="ws-agent-mark" viewBox="0 0 256 256" width="256" height="256" aria-hidden="true" focusable="false">
        <path className="ws-agent-body" d={focusRing} fill="currentColor" fillRule="evenodd" transform="rotate(45 128 128)" />
        <circle className="ws-agent-core" cx="128" cy="128" r="11" />
        <g className="ws-agent-signals" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 112">
          {focusSignals.map((d, index) => <path key={index} d={d} pathLength="100" style={{ animationDelay: `${-index * .53}s` }} />)}
        </g>
        <circle className="ws-agent-focus" cx="128" cy="128" r="9" />
      </svg>}
  </span>;
}
