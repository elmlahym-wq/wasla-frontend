"use client";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/common/site-link";
import { ArrowUpRight, Check, ChevronDown, CirclePause, CirclePlay, FileCheck2, Fingerprint, History, LockKeyhole, RotateCcw, Search, ShieldCheck } from "lucide-react";
import { WaslaAgent } from "@/components/common/wasla-agent";
import { PricingSection } from "./pricing-section";
import { FaqSection } from "./faq-section";
import { useIntroHero } from "./use-intro-hero";
import { HeroPipeline } from "./hero-pipeline";
import { useStageTwoMotion } from "./use-stage-two-motion";

const stages = [
  { label:"Understand", title:"Your story becomes career context.", text:"Bring a PDF or DOCX, or start with the facts you know. Review what Wasla understood before it becomes part of an application.", detail:"Your experience · Your evidence · Your direction", items:["Editable career profile", "Missing information stays visible"], icon:Fingerprint },
  { label:"Find", title:"Bring the right opportunity into focus.", text:"Set your target roles and location. Add an official job link to put Wasla to work on a relevant opportunity.", detail:"Target roles · Location and remote scope", items:["Official opportunity source", "Your search goal retained"], icon:Search },
  { label:"Explain", title:"Know why a role fits.", text:"Review the role's requirements alongside your evidence. See what is supported, what is missing, and what needs your judgment.", detail:"Requirements → Evidence → Gaps", items:["Reasons you can inspect", "Unknown criteria stay unknown"], icon:ShieldCheck },
  { label:"Prepare", title:"One role. One Application Pack.", text:"Review your tailored CV, cover letter, answers, and requirements in one Application Pack.", detail:"Application Pack", items:["Tailored documents and answers", "Review and edit before approval"], icon:FileCheck2 },
  { label:"Apply", title:"Preparation becomes a clear next step.", text:"Approve the exact materials. Wasla prepares the supported employer step; when your action is required, the handoff stays clear.", detail:"Auto-Apply follows channel support and your authorization", items:["Approved materials kept together", "Official employer handoff available"], icon:ArrowUpRight },
  { label:"Track", title:"Every outcome has a clear source.", text:"Keep your application history and next actions together. Confirmed submissions are backed by a verified receipt.", detail:"Outcome → Evidence → Next action", items:["Your submission report is identified", "Application history stays in your account"], icon:History },
];
export function AgentFirstHero() {
  const heroRef = useIntroHero();
  useStageTwoMotion(heroRef);
  const reveal = () => {
    document.getElementById("match-deep-dive")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    window.dispatchEvent(new Event("wasla-replay-workflow"));
  };
  return <section ref={heroRef} className="ws-agent-entry wa-stage2-hero" aria-labelledby="wasla-hero-title"><div className="ws-marketing-container">
    <div className="ws-agent-entry-copy">

      <h1 id="wasla-hero-title"><span className="wa-hero-word">بحثك</span>{" "}<span className="wa-hero-word">عن</span>{" "}<span className="wa-hero-word">عمل،</span><br/><em><span className="wa-hero-word">له</span>{" "}<span className="wa-hero-word">وكيل.</span></em></h1>
      <p>تفهم ملفك، وتجهّز طلبك. والقرار لك.</p>
      <div className="ws-agent-entry-actions"><Link className="ws-landing-primary" href="/app/profile">ابدأ مجانًا<ArrowUpRight size={19} data-directional-icon aria-hidden="true" /></Link><button type="button" className="ws-landing-secondary" onClick={reveal}><CirclePlay size={19} aria-hidden="true" />شاهد المثال</button></div>

    </div>
    <div className="ws-agent-portrait wa-match-preview" aria-labelledby="wasla-match-title">
      <div className="ws-agent-portrait-heading"><span className="wa-presence" aria-hidden="true"/><span className="ws-portrait-wordmark">وصلة</span></div>
      <WaslaAgent size="hero" label="وكيل وصلة الذكي" />
      <div className="wa-match-heading"><span className="wa-preview-kicker">مثال</span><h2 id="wasla-match-title">أين الدليل؟</h2><p></p></div>
      <div className="wa-match-rows">
        <div className="wa-match-row"><span className="wa-match-icon"><FileCheck2 size={20} aria-hidden="true" /></span><div><span>متطلب الفرصة</span><strong>إعداد التقارير المالية</strong></div><span className="wa-match-chip">متطلب واضح</span></div>
        <div className="wa-match-row"><span className="wa-match-icon"><Fingerprint size={20} aria-hidden="true" /></span><div><span>من سيرتك</span><strong>خبرة في مراجعة الحسابات</strong></div><span className="wa-match-chip wa-match-chip-evidence"><Check size={13} aria-hidden="true" />دليل موجود</span></div>
        <div className="wa-match-row wa-match-gap"><span className="wa-match-icon"><Search size={20} aria-hidden="true" /></span><div><span>يحتاج توضيحًا</span><strong>مستوى استخدام <bdi>Excel</bdi></strong></div><span className="wa-match-chip">يحتاج مراجعتك</span></div>
      </div>
      <div className="ws-agent-portrait-caption"><p><LockKeyhole size={15} aria-hidden="true" />لا تقديم دون موافقتك.</p></div>
      <HeroPipeline />
    </div>
  </div></section>;
}
export function AgentExecutionVignette() {
  const [step,setStep] = useState(0);
  const [playing,setPlaying] = useState(false);
  const ref=useRef<HTMLElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});observer.observe(node);return()=>observer.disconnect();},[]);
  useEffect(()=>{const replay=()=>{setStep(0);setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);};window.addEventListener("wasla-replay-workflow",replay);return()=>window.removeEventListener("wasla-replay-workflow",replay);},[]);
  useEffect(()=>{if(!playing||!visible||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const timer=window.setTimeout(()=>{if(document.visibilityState!=="visible"){setPlaying(false);return;}setStep(value=>{if(value===stages.length-1){setPlaying(false);return value;}return value+1;});},3800);return()=>window.clearTimeout(timer);},[playing,visible,step]);
  const scene=stages[step];
  return <section className="ws-agent-workflow" id="how-it-works" ref={ref}><div className="ws-marketing-container"><header className="ws-agent-workflow-heading"><div><h2>See what Wasla handles.</h2></div><div><button aria-label={playing?"Pause workflow playback":"Replay workflow"} onClick={()=>{if(playing)setPlaying(false);else{setStep(0);setPlaying(true);}}}>{playing?<CirclePause size={18}/>:<RotateCcw size={18}/>} {playing?"Pause":"Replay"}</button><Link href="/app/autopilot">Autopilot workspace</Link></div></header><div className="ws-agent-workflow-layout"><div className="ws-agent-workflow-nav" role="tablist" aria-label="Wasla workflow">{stages.map((stage,index)=><button role="tab" tabIndex={step===index?0:-1} onKeyDown={event=>{let next=index;if(event.key==="ArrowRight")next=(index+1)%stages.length;else if(event.key==="ArrowLeft")next=(index+stages.length-1)%stages.length;else if(event.key==="Home")next=0;else if(event.key==="End")next=stages.length-1;else return;event.preventDefault();setPlaying(false);setStep(next);document.getElementById(`wasla-workflow-tab-${next}`)?.focus();}} aria-selected={step===index} aria-controls="wasla-workflow-panel" id={`wasla-workflow-tab-${index}`} key={stage.label} onClick={()=>{setPlaying(false);setStep(index);}} className={index===step?"is-active":""}><span>{String(index+1).padStart(2,"0")}</span>{stage.label}</button>)}</div><div className="ws-agent-workflow-panel" id="wasla-workflow-panel" role="tabpanel" aria-labelledby={`wasla-workflow-tab-${step}`} tabIndex={0}><div key={scene.label} className="ws-agent-workflow-text"><span>{scene.detail}</span><h3>{scene.title}</h3><p>{scene.text}</p></div><div key={`${scene.label}-card`} className="ws-agent-workflow-card"><scene.icon size={27} strokeWidth={1.5}/>{scene.items.map(item=><div key={item}><Check size={16}/>{item}</div>)}<Link href={step===5?"/app/applications":"/app/profile"}>{step===5?"Open application tracking":"Start with Wasla"}</Link></div></div></div></div></section>;
}
export function AgentReassurance() {
  return <section className="ws-agent-reassurance"><div className="ws-marketing-container"><div className="ws-agent-trust"><div><ShieldCheck size={23}/><h3>You stay in control.</h3><p>Review the materials and authorize the next step. A paused campaign stays paused.</p></div><div><Fingerprint size={23}/><h3>Your real experience.</h3><p>Your reviewed profile and evidence guide the work. Missing facts are brought back to you.</p></div><div><LockKeyhole size={23}/><h3>Your career context.</h3><p>Your saved CV, profile, and application history stay together in your account.</p></div></div><div className="ws-agent-details"><details><summary>Plans and pricing<ChevronDown size={18}/></summary><PricingSection/></details><details><summary>Questions about your agent<ChevronDown size={18}/></summary><FaqSection/></details></div><div className="ws-agent-final"><div><h2>Start with your story.</h2></div><Link className="ws-landing-primary" href="/app/profile">Start with Wasla</Link></div></div></section>;
}
