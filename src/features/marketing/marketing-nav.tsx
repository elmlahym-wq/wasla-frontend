"use client";
import Link from "@/components/common/site-link";
import { CircleHelp, Home, Menu, Route, ShieldCheck, Sparkles, WalletCards, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/common/brand";
export const marketingLinks = [
 { href: "/journey", label: "الرحلة" }, { href: "/pricing", label: "الباقات" },
 { href: "/faq", label: "الأسئلة الشائعة" }, { href: "/trust", label: "الثقة" },
 { href: "/autopilot", label: "Autopilot · قريبًا" },
];
const shortcuts = [{ href: "/", label: "الرئيسية", icon: Home }, { href: "/journey", label: "الرحلة", icon: Route }, { href: "/pricing", label: "الباقات", icon: WalletCards }];
const moreLinks = [{ href: "/faq", label: "الأسئلة الشائعة", icon: CircleHelp }, { href: "/trust", label: "الثقة", icon: ShieldCheck }, { href: "/autopilot", label: "Autopilot · قريبًا", icon: Sparkles }];
export function MarketingNav({ active = "/" }: { active?: string }) {
 const [open,setOpen]=useState(false);
 const button=useRef<HTMLButtonElement>(null), menu=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!open)return;
  menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);button.current?.focus();}};
  const outside=(event:PointerEvent)=>{if(!menu.current?.contains(event.target as Node)&&!button.current?.contains(event.target as Node))setOpen(false);};
  window.addEventListener("keydown",close);window.addEventListener("pointerdown",outside);
  return()=>{window.removeEventListener("keydown",close);window.removeEventListener("pointerdown",outside);};
 },[open]);
 const moreActive = moreLinks.some(link => link.href === active);
 return <header className="wa-nav-shell"><nav className="ws-marketing-nav wa-stage2-nav wa-compact-nav" aria-label="التنقل الرئيسي"><a className="wa-skip-link" href="#main-content">تجاوز التنقل</a><div className="ws-marketing-container"><Brand language="ar"/>
  <div className="wa-nav-shortcuts">{shortcuts.map(({href,label,icon:Icon})=><Link key={href} href={href} aria-label={label} title={label} aria-current={active===href?"page":undefined}><Icon size={20} aria-hidden="true"/><span>{label}</span></Link>)}</div>
  <div className="ws-marketing-nav-action"><Link href="/app/profile" className="ws-landing-primary">ابدأ مجانًا</Link><button ref={button} type="button" className="ws-marketing-menu wa-more-button" data-active={moreActive} aria-label={open?"إغلاق القائمة":"فتح القائمة"} aria-expanded={open} aria-controls="wasla-main-links" onClick={()=>setOpen(value=>!value)}>{open?<X size={21} aria-hidden="true"/>:<Menu size={21} aria-hidden="true"/>}<span>المزيد</span></button></div>
  <div ref={menu} id="wasla-main-links" className="wa-more-links" hidden={!open}>{moreLinks.map(({href,label,icon:Icon})=><Link key={href} href={href} aria-current={active===href?"page":undefined} onClick={()=>setOpen(false)}><Icon size={20} aria-hidden="true"/><span>{label}</span></Link>)}<Link className="ws-landing-primary wa-more-cta" href="/app/profile">ابدأ مجانًا</Link></div>
 </div></nav></header>;
}
export function MarketingFooter(){return <footer className="ws-marketing-footer"><div className="ws-marketing-container"><Brand language="ar"/><span>بدأت في فلسطين</span><div><Link href="/">الرئيسية</Link>{marketingLinks.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}<Link href="/app/help">المساعدة</Link><Link href="/app">مساحة العمل</Link></div></div></footer>;}
