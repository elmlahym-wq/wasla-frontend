import { sitePath } from "@/lib/site-path";
/** Runs in the head, before hydration or the first body paint. Landing route only. */
export const introBootstrap = `(function(){
  if(location.pathname!==${JSON.stringify(sitePath("/"))}&&location.pathname!==${JSON.stringify(sitePath("/").replace(/\/$/, ""))})return;
  var root=document.documentElement, motion=matchMedia("(prefers-reduced-motion: reduce)"), seen=false;
  try{seen=sessionStorage.getItem("wasla:arabic-intro:v1")==="seen"}catch(e){}
  if(seen||motion.matches||performance.now()>=3552)return;
  root.classList.add("wa-intro-pending");
  function release(){
    root.classList.remove("wa-intro-pending");
    root.dataset.waslaIntroExpired="true";
    try{sessionStorage.setItem("wasla:arabic-intro:v1","seen")}catch(e){}
    dispatchEvent(new Event("wasla-intro-safety"));
    motion.removeEventListener("change",onMotion);
  }
  function onMotion(){if(motion.matches)release()}
  motion.addEventListener("change",onMotion);
  setTimeout(release,Math.max(0,3552-performance.now()));
})();`;

export const introFirstPaintCSS = `
  :root{--wa-first-paint-ivory:#F5F2EB}
  html.wa-intro-pending::before{content:"";position:fixed;inset:0;z-index:999;background:var(--wa-first-paint-ivory)}
  html.wa-intro-pending .ws-landing{visibility:hidden}
  @media(prefers-reduced-motion:reduce){html.wa-intro-pending::before{display:none}html.wa-intro-pending .ws-landing{visibility:visible}}
`;
