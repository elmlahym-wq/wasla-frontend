"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FileCheck2, FileText, Fingerprint, FolderOpen, MessageSquareText } from "lucide-react";
import { useSectionActivation } from "./use-section-activation";
import { WordHeading } from "./word-heading";
import { WaslaMark } from "@/components/common/wasla-mark";

const documents = [
  { label: "السيرة", title: "السيرة الذاتية", icon: FileText, eyebrow: "خبرتك", headline: "محاسب", lines: ["خبرة في مراجعة الحسابات", "بكالوريوس محاسبة", "Excel يحتاج توضيحًا"] },
  { label: "الرسالة", title: "رسالة التقديم", icon: MessageSquareText, eyebrow: "مسودة", headline: "إلى فريق التوظيف،", lines: ["خبرتي في مراجعة الحسابات.", "المتطلبات ودليلها من خبرتي.", "أضيف التفاصيل قبل الموافقة."] },
  { label: "الإجابات", title: "إجابات الطلب", icon: Fingerprint, eyebrow: "دليل الإجابة", headline: "خبرتك المرتبطة؟", lines: ["مراجعة الحسابات.", "التقارير تحتاج توضيحًا.", "لا إجابة بلا دليل."] },
  { label: "الوثائق", title: "الوثائق المطلوبة", icon: FolderOpen, eyebrow: "من الإعلان", headline: "راجع المطلوب.", lines: ["السيرة مرفقة.", "المؤهل إن طُلب.", "رفع المرفقات بيدك."] },
  { label: "الجاهزية", title: "مراجعة الجاهزية", icon: FileCheck2, eyebrow: "قبل الموافقة", headline: "هل تعني هذا؟", lines: ["راجع المصادر.", "وضّح الفجوات.", "وافق على النسخة."] },
];
export function ApplicationPackShowcase() {
  const ref = useRef<HTMLElement>(null);
  const ready = useSectionActivation(ref);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const node = ref.current; if (!node || !ready) return;
    const stage = node.querySelector<HTMLElement>(".wa-pack-fan"); if (!stage) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let opened = false;
    const open = () => {
      opened = true;
      stage.style.setProperty("--wa-pack-open", "1");
      stage.dataset.open = "true";
    };
    const reduce = () => { if (motion.matches) open(); };
    stage.style.setProperty("--wa-pack-open", motion.matches ? "1" : "0");
    // Enter once, without requiring another scroll to finish spreading the cards.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !opened) open();
    }, { threshold: .15 });
    observer.observe(stage);
    node.addEventListener("focusin", open);
    node.addEventListener("click", open);
    motion.addEventListener("change", reduce);
    reduce();
    return () => { observer.disconnect(); node.removeEventListener("focusin", open); node.removeEventListener("click", open); motion.removeEventListener("change", reduce); stage.style.removeProperty("--wa-pack-open"); delete stage.dataset.open; };
  }, [ready]);
  return <section ref={ref} data-enhanced={ready} className="wa-pack-showcase wa-stage3" id="application-pack" aria-labelledby="wa-pack-title"><div className="wa-stage3-container">
    <header className="wa-pack-heading"><div><WordHeading id="wa-pack-title" text="طلبك، معًا."/></div><span className="wa-example-label">مثال · لا يُرسل طلبًا</span></header>
    <div className="wa-pack-fan" aria-label="ملفات حزمة التقديم في المثال">{documents.map((document, index) => { const rank = index < selected ? index : index - 1; const slot = selected === index ? 0 : rank < 2 ? 2 - rank : 1 - rank; return <article className="wa-pack-document" data-selected={selected === index} key={document.label} id={`wa-pack-document-${index}`} aria-label={document.title} tabIndex={selected === index ? 0 : -1} style={{ "--wa-fan-x": `${slot * 180}px`, "--wa-fan-mobile-x": `${slot * 25}px`, "--wa-fan-angle": `${slot * 5}deg`, "--wa-fan-y": `${Math.abs(slot) * 18}px`, "--wa-fan-order": index, "--wa-fan-slot": slot } as CSSProperties}><header><document.icon size={21} aria-hidden="true"/><span>{document.title}</span><WaslaMark size={22}/></header><div className="wa-pack-copy"><span className="wa-document-eyebrow">{document.eyebrow}</span><h3>{document.headline}</h3><ul>{document.lines.map(line => <li key={line}>{line}</li>)}</ul></div><footer>مثال</footer></article>; })}</div>
    <noscript><style>{`.wa-pack-fan{height:auto;display:grid;gap:16px}.wa-pack-document{position:relative;inset:auto;left:auto;transform:none!important;width:100%;max-width:420px;margin:auto}.wa-pack-selectors{display:none}`}</style></noscript>
    <div className="wa-pack-selectors" aria-label="اختر ملفًا لمعاينته">{documents.map((document, index) => <button type="button" aria-pressed={selected === index} aria-controls={`wa-pack-document-${index}`} key={document.label} onClick={() => setSelected(index)}><document.icon size={17} aria-hidden="true"/>{document.label}</button>)}</div>
  </div></section>;
}
