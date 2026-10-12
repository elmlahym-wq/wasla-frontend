"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { WordHeading } from "./word-heading";
import { WaslaMark } from "@/components/common/wasla-mark";
import { useSectionActivation } from "./use-section-activation";

export function SearchContrast() {
  const ref = useRef<HTMLElement>(null);
  const ready = useSectionActivation(ref);
  const [reveal, setReveal] = useState(100), [manual,setManual]=useState(false);
  const change=(value:number)=>{setManual(true);setReveal(value);};
  useEffect(()=>{
    const node=ref.current;if(!node||!ready||manual)return;
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    let frame=0,visible=false,elapsed=0,last=0,finished=false;
    const tick=(now:number)=>{frame=0;if(!visible||document.hidden||finished)return;if(reduced.matches){setReveal(100);finished=true;return;}elapsed+=last?Math.min(now-last,50):0;last=now;const t=Math.min(1,elapsed/1000);setReveal(100*(1-Math.pow(1-t,3)));if(t<1)frame=requestAnimationFrame(tick);else finished=true;};
    const schedule=()=>{last=0;if(reduced.matches){cancelAnimationFrame(frame);setReveal(100);finished=true;}else if(visible&&!document.hidden&&!finished&&!frame)frame=requestAnimationFrame(tick);else if(document.hidden){cancelAnimationFrame(frame);frame=0;}};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;last=0;}},{threshold:.3});observer.observe(node);
    document.addEventListener("visibilitychange",schedule);reduced.addEventListener("change",schedule);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener("visibilitychange",schedule);reduced.removeEventListener("change",schedule);};
  },[ready,manual]);
  return <section ref={ref} className="wa-contrast wa-transform" data-enhanced={ready} aria-labelledby="wasla-contrast-title"><div className="ws-marketing-container">
    <header><WordHeading id="wasla-contrast-title" text="اقرأها بوضوح."/></header>
    <div className="wa-transform-paper" style={{ "--wa-wipe": `${reveal}%`, "--wa-wipe-progress": reveal / 100 } as CSSProperties}>
      <div className="wa-posting-identity"><FileText size={24} aria-hidden="true"/><div><span>مثال</span><h3>محاسب</h3></div><span className="wa-posting-source">المصدر الرسمي</span></div>
      <div className="wa-transform-readings"><article className="wa-posting-original" aria-label="نص الإعلان في المثال"><span className="wa-document-eyebrow">نص الفرصة</span><p>نبحث عن محاسب لإعداد التقارير المالية ومراجعة الحسابات.</p><p>يشترط بكالوريوس محاسبة، وإتقان برنامج <bdi>Excel</bdi>.</p><p>الموقع والقيود غير محدّدين.</p></article>
      <article className="wa-posting-analysis" aria-label="تحليل وصلة للإعلان في المثال"><div className="wa-analysis-brand"><WaslaMark size={30}/><span>الإعلان وملفك</span></div><div className="wa-analysis-record"><span>المتطلب</span><strong>إعداد التقارير المالية</strong><ArrowLeft size={18} aria-hidden="true"/><span>الدليل من الملف</span><strong>خبرة في مراجعة الحسابات</strong><p>دليل جزئي. التقارير تحتاج تأكيدًا.</p></div><div className="wa-analysis-question"><span>يحتاج توضيحًا</span><strong>ما مدى إتقانك لبرنامج <span className="wa-latin-question"><bdi>Excel</bdi>؟</span></strong></div></article>
      <span className="wa-wipe-edge" aria-hidden="true"/><span className="wa-wipe-handle" aria-hidden="true"><WaslaMark size={22}/></span></div>
    </div>
    <div className="wa-wipe-control"><label htmlFor="wa-wipe-range">نص الإعلان <ArrowLeft size={17} aria-hidden="true"/> تحليل وصلة</label><input id="wa-wipe-range" type="range" min="0" max="100" value={reveal} onChange={e=>change(Number(e.target.value))} aria-label="إظهار تحليل وصلة فوق الإعلان" aria-valuetext={reveal === 0 ? "نص الإعلان كاملًا" : reveal === 100 ? "تحليل وصلة كاملًا" : "الإعلان والتحليل معًا"}/><div><button type="button" onClick={()=>change(0)}>اقرأ الإعلان</button><button type="button" onClick={()=>change(100)}>اكشف التحليل</button></div></div>
    <details className="wa-transform-transcript"><summary>النص الكامل</summary><p>مثال: محاسب. تقارير مالية، مراجعة حسابات، بكالوريوس محاسبة، وإتقان <bdi>Excel</bdi>. الموقع والقيود غير محدّدين.</p><p>المراجعة دليل جزئي. ما مدى إتقانك لبرنامج <span className="wa-latin-question"><bdi>Excel</bdi>؟</span> تحقّق من الأهلية.</p></details>
    <noscript><style>{`.wa-posting-analysis{position:relative!important;clip-path:none!important}.wa-wipe-control,.wa-wipe-edge,.wa-wipe-handle{display:none!important}.wa-transform-paper{height:auto!important}`}</style></noscript>
  </div></section>;
}
