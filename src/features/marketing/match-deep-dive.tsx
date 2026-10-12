"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, FileText, HelpCircle, MapPin, ShieldCheck } from "lucide-react";
import { useSectionActivation } from "./use-section-activation";
import { WordHeading } from "./word-heading";
import { WaslaMark } from "@/components/common/wasla-mark";

const requirements = [
  { title: "إعداد التقارير المالية", status: "دليل جزئي", quote: "خبرة في مراجعة الحسابات", source: "الخبرة", reading: "المراجعة لا تثبت إعداد التقارير.", gap: "هل أعددت تقارير مالية بنفسك؟", next: "أضف مثالًا حقيقيًا." },
  { title: "استخدام Excel", status: "غير موضّح", quote: "المستوى غير موضّح.", source: "المهارات", reading: "ذكر الأداة وحده لا يكفي.", gap: "ما مدى إتقانك لبرنامج Excel؟", next: "وضّح استخدامك الفعلي." },
  { title: "بكالوريوس محاسبة", status: "دليل موجود", quote: "بكالوريوس محاسبة", source: "التعليم", reading: "المؤهل يدعم المتطلب. الأهلية مستقلة.", gap: "هل الوثيقة المطلوبة متوفرة؟", next: "راجع الوثائق المطلوبة." },
];
export function MatchDeepDive() {
  const section = useRef<HTMLElement>(null);
  const ready = useSectionActivation(section);
  const [selected, setSelected] = useState(0), [phase,setPhase] = useState(2), [run,setRun] = useState(1);
  const manual = (index: number) => { setRun(0); setSelected(index); setPhase(2); };
  useEffect(() => {
    const node = section.current; if (!node || !ready || !run) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible=false, hovered=false, focused=false, started=false, finished=false, index=0, stage=0;
    let timer: number | undefined, remaining=400, began=0;
    const durations=[400,400,600];
    const cancel=()=>{ if(timer!==undefined){ clearTimeout(timer); remaining=Math.max(0,remaining-(performance.now()-began)); timer=undefined; } };
    const schedule=()=>{
      if(reduced.matches){cancel();finished=true;setSelected(requirements.length-1);setPhase(2);return;}
      if(timer!==undefined || !visible || hovered || focused || document.hidden || finished)return;
      if(!started){started=true;setSelected(0);setPhase(0);}
      began=performance.now();
      timer=window.setTimeout(()=>{timer=undefined;
        if(stage<2){stage++;setPhase(stage);}else if(index<requirements.length-1){index++;stage=0;setSelected(index);setPhase(0);}else{finished=true;return;}
        remaining=durations[stage];schedule();
      },remaining);
    };
    const refresh=()=>{cancel();schedule();};
    const enter=()=>{hovered=true;refresh();},leave=()=>{hovered=false;refresh();};
    const focus=()=>{focused=true;refresh();},blur=(event:FocusEvent)=>{focused=node.contains(event.relatedTarget as Node|null);refresh();};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;refresh();},{threshold:.25});observer.observe(node);
    node.addEventListener("mouseenter",enter);node.addEventListener("mouseleave",leave);node.addEventListener("focusin",focus);node.addEventListener("focusout",blur);
    document.addEventListener("visibilitychange",refresh);reduced.addEventListener("change",refresh);
    return()=>{cancel();observer.disconnect();node.removeEventListener("mouseenter",enter);node.removeEventListener("mouseleave",leave);node.removeEventListener("focusin",focus);node.removeEventListener("focusout",blur);document.removeEventListener("visibilitychange",refresh);reduced.removeEventListener("change",refresh);};
  },[ready,run]);
  const grid = useRef<HTMLDivElement>(null), wire = useRef<SVGPathElement>(null);
  const item = requirements[selected];
  useEffect(() => {
    const node = grid.current; if (!node || !ready) return;
    const measure = () => {
      const start = node.querySelector<HTMLElement>('[aria-pressed="true"]');
      const end = node.querySelector<HTMLElement>(".wa-evidence-port");
      if (!start || !end) return;
      const box = node.getBoundingClientRect(), a = start.getBoundingClientRect(), b = end.getBoundingClientRect();
      const x1 = a.left + a.width / 2 - box.left, y1 = a.bottom - box.top;
      const x2 = b.left + b.width / 2 - box.left, y2 = b.top + b.height / 2 - box.top;
      wire.current?.setAttribute("d", `M${x1} ${y1} C${x1} ${y1 + 32},${x2} ${y2 - 32},${x2} ${y2}`);
    };
    const observer = new ResizeObserver(measure); observer.observe(node); measure();
    return () => observer.disconnect();
  }, [selected, ready]);
  return <section ref={section} data-enhanced={ready} className="wa-match-deep wa-stage3" data-match-phase={phase} id="match-deep-dive" aria-labelledby="wa-match-deep-title"><div className="wa-stage3-container">
    <header className="wa-match-deep-heading"><WordHeading id="wa-match-deep-title" text="أين الدليل؟"/><span className="wa-example-label">مثال</span><button type="button" className="wa-match-replay" onClick={()=>{setSelected(0);setPhase(0);setRun(value=>value+1);}}>أعد العرض</button></header>
    <div className="wa-match-bento" ref={grid}>
      <svg className="wa-evidence-wire" aria-hidden="true"><path ref={wire} pathLength="1"/></svg>
      <article className="wa-bento-requirements" aria-labelledby="wa-requirements-title"><header><span>من إعلان الفرصة</span><h3 id="wa-requirements-title">المتطلبات</h3><FileText size={24} aria-hidden="true"/></header><div className="wa-requirements-list">{requirements.map((requirement, index) => <button type="button" className="wa-requirement" aria-pressed={selected === index} aria-controls="wa-evidence-reading wa-gap-reading" key={requirement.title} onClick={() => manual(index)} onKeyDown={event=>{let next=index;if(event.key==="ArrowDown"||event.key==="ArrowLeft")next=(index+1)%requirements.length;else if(event.key==="ArrowUp"||event.key==="ArrowRight")next=(index+requirements.length-1)%requirements.length;else if(event.key==="Home")next=0;else if(event.key==="End")next=requirements.length-1;else return;event.preventDefault();manual(next);grid.current?.querySelectorAll<HTMLButtonElement>(".wa-requirement")[next]?.focus();}}><span className="wa-requirement-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span><strong>{requirement.title}</strong><small>{requirement.status}</small></span><span className="wa-requirement-port" aria-hidden="true"><ArrowLeft size={17}/></span></button>)}</div><p className="wa-requirement-note"><WaslaMark size={23}/>المجهول ليس دليلًا.</p></article>
      <article className="wa-bento-evidence" id="wa-evidence-reading" data-reading={selected} aria-labelledby="wa-evidence-title"><span className="wa-evidence-port" aria-hidden="true"/><header><span>من ملفك</span><h3 id="wa-evidence-title">الدليل</h3><Check size={24} aria-hidden="true"/></header><div className="wa-source-strip"><FileText size={16} aria-hidden="true"/><span>مثال • {item.source}</span></div><blockquote><span className="wa-quote-mark" aria-hidden="true">«</span><p><mark>{item.quote}</mark></p></blockquote><p className="wa-evidence-reading" aria-live="polite">{item.reading}</p></article>
      <article className="wa-bento-gap" id="wa-gap-reading" data-reading={selected} aria-labelledby="wa-gap-title"><header><span>سؤالك</span><h3 id="wa-gap-title">الفجوة</h3><HelpCircle size={24} aria-hidden="true"/></header><p className="wa-gap-question">{selected === 1 ? <>ما مدى إتقانك لبرنامج <span className="wa-latin-question"><bdi>Excel</bdi>؟</span></> : item.gap}</p><p>{item.next}</p><span className="wa-gap-pencil" aria-hidden="true"/></article>
      <article className="wa-bento-eligibility" aria-labelledby="wa-eligibility-title"><div><ShieldCheck size={25} aria-hidden="true"/><h3 id="wa-eligibility-title">الأهلية مستقلة.</h3></div><p><MapPin size={18} aria-hidden="true"/>الموقع والقيود غير محدّدين.</p><span>تحتاج تحققًا <ArrowLeft size={16} aria-hidden="true"/></span><small>المهارة لا تثبت الأهلية.</small></article>
    </div>
  </div></section>;
}
