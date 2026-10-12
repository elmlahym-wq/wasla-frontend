"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Fingerprint, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "@/components/common/site-link";
import { WordHeading } from "./word-heading";
import { WaslaMark } from "@/components/common/wasla-mark";
import { useSectionActivation } from "./use-section-activation";
import { plans, creditCosts, freeAllowance, creditPolicy, planNote } from "@/data/pricing";

const campaign = ["هدف الحملة", "اكتشاف الفرص", "فحص الأهلية", "تجهيز الحزم", "موافقتك", "Auto-Apply", "المتابعة"];
export function AutopilotPreview() {
  const ref = useRef<HTMLElement>(null), ready = useSectionActivation(ref);
  return <section ref={ref} data-enhanced={ready} id="autopilot" className="wa-autopilot wa-stage4" aria-labelledby="wa-autopilot-title"><div className="wa-stage3-container"><header><WordHeading id="wa-autopilot-title" text="حملتك القادمة."/><span className="wa-coming">قريبًا • <bdi>Wasla Autopilot</bdi></span></header><div className="wa-campaign-map"><div className="wa-campaign-origin"><WaslaMark size={50}/><span>هدفك أولًا</span></div><ol>{campaign.map((name,i)=><li key={name}><span className="wa-campaign-node" aria-hidden="true"/>{i===4?<Fingerprint size={25} aria-hidden="true"/>:null}<strong>{name}</strong><span>{i===4?"قرارك":i===5?"حسب القناة":"مسار مخطّط"}</span></li>)}</ol></div><div className="wa-campaign-note"><p>مثال • قريبًا</p><p>تبحث وتجهّز. أنت توافق.</p></div></div></section>;
}
export function WaslaPricing() {
  const [selected,setSelected]=useState(plans.findIndex(plan=>plan.highlighted)), plan=plans[selected];
  const indexRef=useRef<HTMLDivElement>(null), highlight=useRef<HTMLSpanElement>(null);
  useEffect(()=>{const node=indexRef.current;if(!node)return;const update=()=>{const button=node.querySelector<HTMLElement>('[aria-pressed="true"]');if(button&&highlight.current)highlight.current.style.transform=`translateY(${button.offsetTop}px) scaleY(${button.offsetHeight})`;};const observer=new ResizeObserver(update);observer.observe(node);node.querySelectorAll("button").forEach(button=>observer.observe(button));update();return()=>observer.disconnect();},[selected]);
  return <section id="pricing" className="wa-pricing wa-stage4" aria-labelledby="wa-pricing-title"><div className="wa-stage3-container"><header><WordHeading id="wa-pricing-title" text="اختر رصيدك."/></header><div className="wa-credit-desk"><div ref={indexRef} className="wa-plan-index" aria-label="اختر باقة وصلة"><span ref={highlight} className="wa-plan-highlight" aria-hidden="true"/>{plans.map((p,i)=><button type="button" key={p.name} aria-pressed={selected===i} aria-controls="wa-credit-receipt" onClick={()=>setSelected(i)}><span>{p.name}{p.badge?<small>{p.badge}</small>:null}</span><bdi>${p.price}</bdi><ArrowLeft size={18} aria-hidden="true"/></button>)}</div><article key={plan.id} id="wa-credit-receipt" className="wa-credit-receipt" aria-live="polite"><div className="wa-receipt-top"><WaslaMark size={32}/><span>{plan.period}</span></div><h3>{plan.name}</h3><p>{plan.kind}</p><div className="wa-credit-amount"><bdi>${plan.price}</bdi><span>{plan.period}</span></div><div className="wa-credit-balance"><strong>{plan.credits}</strong><span>{plan.unit}</span></div>{plan.id === "free" || plan.id === "active" ? <p className="wa-credit-note">{planNote(plan)}</p> : null}<Link href="/app/profile" className="wa-signup">أنشئ حسابك <ArrowLeft size={18} aria-hidden="true"/></Link></article><div className="wa-credit-rules"><h3>تكلفة كل خطوة</h3><table><caption>رصيد وصلة</caption><thead><tr><th scope="col">الخطوة</th><th scope="col">الأرصدة</th></tr></thead><tbody>{creditCosts.map(cost=><tr key={cost.id}><th scope="row">{cost.name}{cost.note?<small>{cost.note}</small>:null}</th><td>{cost.credits}</td></tr>)}</tbody></table><p>{creditPolicy.oneTimeExpiry}</p><p>Copilot: الاسم والبريد والهاتف. الباقي والإرسال النهائي بيدك.</p></div></div><noscript><div className="wa-price-transcript">{plans.map(p=><p key={p.name}>{p.name}: <bdi>${p.price}</bdi>، {p.period} — {p.credits} {p.unit}. {p.id === "free" || p.id === "active" ? planNote(p) : ""}</p>)}</div><style>{`.wa-plan-index{display:none}`}</style></noscript></div></section>;
}
export function WaslaTrust() {
  return <section id="trust" className="wa-trust wa-stage4" aria-labelledby="wa-trust-title"><div className="wa-stage3-container"><div className="wa-trust-seal"><WaslaMark size={80}/><span>بدأت في فلسطين</span><span>قرارك لك</span></div><div className="wa-trust-charter"><WordHeading id="wa-trust-title" text="القرار لك."/><dl><div><dt><ShieldCheck size={24} aria-hidden="true"/>موافقتك قبل التقديم</dt><dd>راجع المواد واعتمدها. تجهيز الحزمة لا يُرسل طلبًا.</dd></div><div><dt><Fingerprint size={24} aria-hidden="true"/>أنت تتحكّم</dt><dd>الخطوات غير المدعومة والتحقق والموافقة القانونية والإرسال النهائي بيدك.</dd></div><div><dt><LockKeyhole size={24} aria-hidden="true"/>راجع بياناتك</dt><dd>تراجع بيانات الطلب وتوافق قبل التنفيذ.</dd></div></dl></div></div></section>;
}
export const marketingQuestions=[
 ["كيف تساعدني وصلة؟","تفهم المتطلبات، تربطها بأدلة ملفك، وتجهّز حزمة تراجعها."],
 ["هل تقدّم دون موافقتي؟","لا. تراجع المواد وتوافق قبل التنفيذ المدعوم. تجهيز الحزمة لا يُرسل طلبًا."],
 ["ما حدود التنفيذ؟","Copilot يملأ الاسم والبريد والهاتف فقط. المرفقات والأسئلة الأخرى والتحقق والموافقة القانونية والإرسال النهائي بيدك."],
 ["كم تستهلك الخطوات؟",`التحليل ${creditCosts[0].credits}، الحزمة ${creditCosts[1].credits}، التنفيذ المدعوم ${creditCosts[2].credits} أرصدة. أرصدة الدفعة الواحدة لا تنتهي.`],
 ["ماذا تشمل المجانية؟",`${freeAllowance.signup} أرصدة عند التسجيل، ثم ${freeAllowance.monthly} كل شهر. دون رسوم.`],
 ["هل Autopilot متاح؟","قريبًا. خطة البحث النشط تشمل وصولًا مبكرًا عند إتاحته، ولا تشغّل حملة الآن."],
 ["هل تضمن وظيفة؟","لا. قرار القبول لجهة التقديم. الفجوات والمعلومات المجهولة تبقى واضحة."],
] as const;
export function WaslaFaq(){
 const [open,setOpen]=useState<number|null>(null),[closing,setClosing]=useState<number|null>(null);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 const toggle=(index:number)=>{if(timer.current)clearTimeout(timer.current);if(open===index){if(matchMedia("(prefers-reduced-motion: reduce)").matches){setOpen(null);return;}setClosing(index);timer.current=setTimeout(()=>{setOpen(null);setClosing(null);},220);}else{setClosing(null);setOpen(index);}};
 return <section id="faq" className="wa-faq wa-stage4" aria-labelledby="wa-faq-title"><div className="wa-stage3-container"><header><WordHeading id="wa-faq-title" text="إجابات واضحة."/></header><div>{marketingQuestions.map(([q,a],i)=><div className="wa-faq-item" key={q} data-open={open===i} data-closing={closing===i}><h3><button type="button" aria-expanded={open===i} aria-controls={`wa-faq-answer-${i}`} id={`wa-faq-question-${i}`} onClick={()=>toggle(i)}><span>{String(i+1).padStart(2,"0")}</span>{q}<span className="wa-faq-toggle" aria-hidden="true">+</span></button></h3><div id={`wa-faq-answer-${i}`} role="region" aria-labelledby={`wa-faq-question-${i}`} hidden={open!==i}><p>{a}</p></div></div>)}</div></div></section>;
}
export function WaslaFinal(){return <section className="wa-final wa-stage4" aria-labelledby="wa-final-title"><div className="wa-stage3-container"><WaslaMark size={95}/><div><WordHeading id="wa-final-title" text="ابدأ من ملفك."/><Link href="/app/profile" className="wa-signup">ابدأ مجانًا <ArrowLeft size={20} aria-hidden="true"/></Link></div></div></section>;}
export function WaslaClosing(){return <><WaslaFaq/><WaslaFinal/></>;}
