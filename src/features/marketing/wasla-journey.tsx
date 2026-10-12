"use client";
import { ArrowLeft, Check, FileText, Fingerprint, Search, ShieldCheck } from "lucide-react";
import { WordHeading } from "./word-heading";
import { WaslaMark } from "@/components/common/wasla-mark";
import { useJourneyScroll } from "./use-journey-scroll";

const phases = ["افهم نفسك", "اكتشف وقرّر", "جهّز ونفّذ", "تابع"];
const steps = [
  { id: "profile", phase: 0, title: "ملفك، بصوتك أنت.", text: "راجع خبرتك. الناقص يبقى سؤالًا." },
  { id: "discover", phase: 1, title: "افتح البحث.", text: "حدّد هدفك. راجع المصدر الرسمي." },
  { id: "understand", phase: 1, title: "افهم الفرصة.", text: "راجع الدور والموقع والشروط." },
  { id: "match", phase: 1, title: "أين الدليل؟", text: "اربط المتطلب بخبرتك. المجهول ليس توافقًا." },
  { id: "requirements", phase: 1, title: "راجع المتطلبات.", text: "ميّز الشروط الأساسية. تحقّق من غير الموضّح." },
  { id: "evidence", phase: 1, title: "دليل بمصدر.", text: "الدليل الجزئي يبقى جزئيًا. الفجوة ظاهرة." },
  { id: "pack", phase: 2, title: "جهّز طلبك.", text: "السيرة والرسالة والإجابات والوثائق معًا. راجعها قبل الموافقة." },
  { id: "apply", phase: 2, title: "أنت توافق.", text: "التنفيذ حسب القناة. التحقق والموافقة القانونية والإرسال النهائي بيدك." },
  { id: "track", phase: 3, title: "النتيجة ومصدرها.", text: "ميّز سجلك عن التأكيد الرسمي. التجهيز لا يعني الإرسال." },
  { id: "next", phase: 3, title: "خطوتك التالية.", text: "استكمل المعلومة أو الوثيقة، ثم تابع طلبك." },
];
const phaseStarts = [0, 1, 6, 8];
export function WaslaJourney() {
  const { ref, marker, active, ready } = useJourneyScroll();
  const phase = steps[active].phase;
  return <section ref={ref} className="wa-journey wa-stage3" data-enhanced={ready} id="how-it-works" aria-labelledby="wa-journey-title">
    <div className="wa-stage3-container">
      <header className="wa-journey-heading"><WordHeading id="wa-journey-title" text="خطوتك التالية."/><p>من ملفك إلى قرارك.</p></header>
      <div className="wa-journey-layout">
        <aside className="wa-journey-pin" aria-label="تقدّم الرحلة">
          <nav className="wa-journey-spy" aria-label="مراحل الرحلة">{phases.map((name, index) => <a href={`#journey-${steps[phaseStarts[index]].id}`} key={name} aria-current={phase === index ? "step" : undefined}>{name}</a>)}</nav>
          <div className="wa-journey-console">
            <div className="wa-console-heading"><WaslaMark size={30} /><span>مثال · لا يُرسل طلبًا</span></div>
            <div className="wa-journey-now"><span>الخطوة المعروضة</span><h3>{steps[active].title}</h3></div>
            <div className="wa-journey-scenes">
              <div className="wa-journey-scene" data-current={phase === 0} aria-hidden={phase !== 0}><div className="wa-story-profile"><Fingerprint size={26} aria-hidden="true"/><span>مثال</span><h4>خبرتك وسؤالك.</h4><p><Check size={16} aria-hidden="true"/>خبرة في مراجعة الحسابات</p><p><span>ما مدى إتقانك لبرنامج <span className="wa-latin-question"><bdi>Excel</bdi>؟</span></span></p><span className="wa-paper-fold" aria-hidden="true"/></div></div>
              <div className="wa-journey-scene" data-current={phase === 1} aria-hidden={phase !== 1}><div className="wa-story-match"><span className="wa-story-label"><Search size={18} aria-hidden="true"/>مثال</span><div className="wa-story-requirement"><span>الإعلان يطلب</span><strong>إعداد التقارير المالية</strong></div><div className="wa-story-link"><span/><WaslaMark size={30}/><span/></div><div className="wa-story-evidence"><span>الملف يذكر</span><strong>خبرة في مراجعة الحسابات</strong><small>دليل جزئي. أكّد التقارير.</small></div></div></div>
              <div className="wa-journey-scene" data-current={phase === 2} aria-hidden={phase !== 2}><div className="wa-story-pack"><div><FileText size={26} aria-hidden="true"/><span>حزمة هذه الفرصة</span><h4>راجع ثم وافق.</h4></div><p><ShieldCheck size={20} aria-hidden="true"/>بانتظار موافقتك</p><small>القنوات المدعومة فقط. الخطوات البشرية بيدك.</small></div></div>
              <div className="wa-journey-scene" data-current={phase === 3} aria-hidden={phase !== 3}><div className="wa-story-journal"><span>مثال</span><h4>النتيجة؟</h4><div><span className="wa-journal-dot"/><strong>لا نتيجة تقديم.</strong></div><div><span className="wa-journal-dot"/><p>وضّح خبرتك بالتقارير.</p></div><small>التجهيز لا يؤكد الإرسال.</small></div></div>
            </div>
            <svg className="wa-journey-wire" viewBox="0 0 400 64" aria-hidden="true"><path d="M376 32H24"/><path className="wa-journey-wire-progress" d="M376 32H24" pathLength="1"/>{steps.map((step, index) => <circle key={step.id} cx={376 - 352 * index / 9} cy="32" r="3" data-lit={index <= active}/>)}<g ref={marker} transform="translate(376 32)"><circle r="19" className="wa-journey-agent-halo"/><g transform="translate(-16 -16)"><WaslaMark size={32}/></g></g></svg>
            <div className="wa-journey-direction"><span>ملفك</span><span>قرارك التالي <ArrowLeft size={15} aria-hidden="true"/></span></div>
          </div>
          <p className="wa-journey-hint">مثال مرتبط بالتمرير.</p>
        </aside>
        <ol className="wa-journey-steps">{steps.map((step, index) => <li key={step.id} id={`journey-${step.id}`} data-journey-step data-active={active === index}><span className="wa-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div>{phaseStarts.includes(index) ? <span className="wa-step-phase">{phases[step.phase]}</span> : null}<h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
      </div>
    </div>
  </section>;
}
