"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal, flushSync } from "react-dom";
import { WaslaMark } from "@/components/common/wasla-mark";

const SESSION_KEY = "wasla:arabic-intro:v1";
const HARD_CAP_MS = 3600;
const EXIT_SAFETY_MS = 48;
const journeyNodes = [
  [861.26, 144.23], [783.77, 111.5], [708.28, 73.84], [625.16, 62.4], [542.95, 80.72],
  [467.27, 117.8], [385.12, 137.96], [301.16, 139.4], [220.25, 116.02], [139.14, 92.57],
];

export function WaslaIntro() {
  const [visible, setVisible] = useState(false);
  const [timeScale, setTimeScale] = useState(1);
  const [pixelScale, setPixelScale] = useState(1);
  const [mobile, setMobile] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const connectionRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const heroStartedRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let alreadySeen = false;
    try { alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "seen"; } catch { /* Optional storage. */ }
    const releaseCover = () => document.documentElement.classList.remove("wa-intro-pending");
    if (alreadySeen || reducedMotion.matches || document.documentElement.dataset.waslaIntroExpired === "true") { releaseCover(); return; }
    let disposed = false;
    let finished = false;
    const previousFocus = document.activeElement;
    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      releaseCover();
      try { window.sessionStorage.setItem(SESSION_KEY, "seen"); } catch { /* Fail open. */ }
      if (!heroStartedRef.current) {
        heroStartedRef.current = true;
        window.dispatchEvent(new Event("wasla-intro-hero"));
      }
      if (overlayRef.current?.contains(document.activeElement) || skipRef.current === document.activeElement) {
        if (previousFocus instanceof HTMLElement && previousFocus !== document.body && previousFocus.isConnected) {
          previousFocus.focus({ preventScroll: true });
        } else {
          const target = document.querySelector<HTMLElement>("main");
          if (target) {
            const previousTabIndex = target.getAttribute("tabindex");
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
            if (previousTabIndex === null) target.removeAttribute("tabindex");
            else target.setAttribute("tabindex", previousTabIndex);
          }
        }
      }
      setVisible(false);
      window.dispatchEvent(new Event("wasla-intro-complete"));
    };
    finishRef.current = finish;
    const remaining = Math.max(0, HARD_CAP_MS - EXIT_SAFETY_MS - window.performance.now());
    if (remaining === 0) { finish(); return; }
    const hardCap = window.setTimeout(finish, remaining);
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Tab" && skipRef.current) { event.preventDefault(); skipRef.current.focus({ preventScroll: true }); }
      if (event.key === "Escape") { event.preventDefault(); finish(); }
    };
    const onMotionChange = () => { if (reducedMotion.matches) finish(); };
    const onHidden = () => { if (document.hidden) finish(); };
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("keydown", onEscape);
    window.addEventListener("wasla-intro-safety", finish);
    reducedMotion.addEventListener("change", onMotionChange);
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    void fontsReady.then(() => {
      if (disposed || finished || reducedMotion.matches) return;
      const available = HARD_CAP_MS - EXIT_SAFETY_MS - window.performance.now();
      if (available <= 0) { finish(); return; }
      const isMobile = window.innerWidth <= 700;
      const stageWidth = isMobile ? window.innerWidth - 48 : Math.min(window.innerWidth * .92, 1152);
      window.dispatchEvent(new Event("wasla-intro-start"));
      // Commit the cover immediately; concurrent hydration must not expose a hidden hero.
      flushSync(() => {
        setTimeScale(Math.min(1, available / 3500));
        setMobile(isMobile);
        setPixelScale((isMobile ? 890 : 1000) / stageWidth);
        setVisible(true);
      });

    }).catch(finish);
    return () => {
      disposed = true;
      window.clearTimeout(hardCap);
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("wasla-intro-safety", finish);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const connection = connectionRef.current;
    const ring = ringRef.current;
    if (!visible || !overlay || !connection || !ring) return;
    if (typeof ResizeObserver === "undefined" || !overlay.animate || !ring.animate) {
      finishRef.current();
      return;
    }
    document.documentElement.classList.remove("wa-intro-pending");
    const resize = new ResizeObserver(() => {
      const width = connection.getBoundingClientRect().width;
      if (width) setPixelScale(Number(connection.getAttribute("viewBox")?.split(" ")[2] ?? 1000) / width);
    });
    resize.observe(connection);
    const svg = connection.getBoundingClientRect();
    const bounds = overlay.getBoundingClientRect();
    // Exact center of the real header glyph, at the SVG path midpoint.
    const cx = svg.left - bounds.left + svg.width * .5;
    const cy = svg.top - bounds.top + svg.height * (100 / 220);
    const radius = Math.hypot(Math.max(cx, bounds.width - cx), Math.max(cy, bounds.height - cy)) + 4;
    const total = Math.max(0, Math.min(3500 * timeScale, HARD_CAP_MS - EXIT_SAFETY_MS - performance.now()));
    const duration = Math.min(600 * timeScale, total);
    const delay = Math.max(0, total - duration);
    const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
    ring.setAttribute("cx", String(cx));
    ring.setAttribute("cy", String(cy));
    ring.style.transformOrigin = `${cx}px ${cy}px`;
    // Reveal the actual page through a native circle clip above the intro.
    // The clip is installed only for the opening, avoiding a full-screen inverse mask.
    const page = document.querySelector<HTMLElement>(".ws-landing");
    if (!page) { resize.disconnect(); finishRef.current(); return; }
    const previous = { position: page.style.position, zIndex: page.style.zIndex, clipPath: page.style.clipPath };
    let opening: Animation | undefined;
    const openingTimer = window.setTimeout(() => {
      const pageBounds = page.getBoundingClientRect();
      const center = `${cx + bounds.left - pageBounds.left}px ${cy + bounds.top - pageBounds.top}px`;
      page.style.clipPath = `circle(0.01px at ${center})`;
      page.style.position = "relative";
      page.style.zIndex = "1001";
      opening = page.animate([
        { clipPath: `circle(0.01px at ${center})` },
        { clipPath: `circle(${radius}px at ${center})` },
      ], { duration, easing, fill: "both" });
      void opening.finished.then(() => finishRef.current()).catch(() => {});
    }, delay);
    const flash = ring.animate([
      { transform: "scale(0.01)", opacity: 0, offset: 0 },
      { opacity: .65, offset: .08 },
      { opacity: .4, offset: .65 },
      { transform: `scale(${radius})`, opacity: 0, offset: 1 },
    ], { duration, delay, easing, fill: "both" });
    const heroTimer = window.setTimeout(() => {
      if (!heroStartedRef.current) {
        heroStartedRef.current = true;
        window.dispatchEvent(new Event("wasla-intro-hero"));
      }
    }, Math.max(0, total - 200));
    return () => {
      resize.disconnect(); window.clearTimeout(heroTimer); window.clearTimeout(openingTimer);
      opening?.cancel(); flash.cancel();
      page.style.position = previous.position; page.style.zIndex = previous.zIndex; page.style.clipPath = previous.clipPath;
    };
  }, [visible, timeScale]);

  if (!visible) return null;
  return createPortal(
    <><div ref={overlayRef} className="wa-intro" dir="rtl" role="region" aria-label="مقدمة وصلة"
      style={{ "--wa-intro-time-scale": timeScale, "--wa-intro-logo-size": mobile ? "60px" : "52px" } as CSSProperties}
      onClick={() => finishRef.current()}>
      <div className="wa-intro-stage" aria-hidden="true">
        <svg ref={connectionRef} className="wa-intro-connection" viewBox={mobile ? "55 0 890 220" : "0 0 1000 220"} fill="none" style={{ "--wa-svg-scale": pixelScale } as CSSProperties}>
          <path className="wa-intro-path" pathLength="1000" strokeDasharray="1000 1000" strokeDashoffset="1000"
            d="M945 155 C760 155 745 20 560 75 C500 93 500 113 440 125 C255 180 240 85 55 85" />
          {[[945, 155, "ملفك"], [55, 85, "فرصتك"]].map(([cx, cy, label]) =>
            <g key={label} transform={`translate(${cx} ${cy})`}><g transform={`scale(${pixelScale})`}>
              <circle className={`wa-intro-endpoint${label === "فرصتك" ? " wa-intro-endpoint-final" : ""}`} r="4" />
              <text className="wa-intro-end-label" x="0" y="25" textAnchor="middle">{label}</text>
            </g></g>)}
          <g transform="translate(500 100)"><g transform={`scale(${pixelScale})`}><g className="wa-intro-mark" transform={mobile ? "translate(-30 -30)" : "translate(-26 -26)"}>
            <WaslaMark className="wa-intro-logo" size={mobile ? 60 : 52} />
          </g></g></g>
          {journeyNodes.map(([cx, cy], index) =>
            <g key={index} transform={`translate(${cx} ${cy})`}><g transform={`scale(${pixelScale})`} style={{ "--wa-node-delay": `${2100 + 620 * (1 - Math.cos(index / 9 * Math.PI)) / 2}ms` } as CSSProperties}>
              <circle className="wa-intro-node" r="3.75" />
              <circle className="wa-intro-node-pulse" r="3.75" vectorEffect="non-scaling-stroke" />
            </g></g>)}
        </svg>
        <div className="wa-intro-identity">
          <span className="wa-intro-wordmark">وصلة</span>
          <p className="wa-intro-tagline">خطوتك القادمة تبدأ بوصلة.</p>
        </div>
      </div>
    </div><button ref={skipRef} type="button" className="wa-intro-skip" onClick={() => finishRef.current()}>تخطي</button><svg className="wa-intro-opening-flash" aria-hidden="true"><circle ref={ringRef} r="1" vectorEffect="non-scaling-stroke" /></svg></>, document.body,
  );
}
