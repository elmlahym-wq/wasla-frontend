import type { Metadata } from "next";
import { MarketingShell } from "@/features/marketing/marketing-shell";
import { WaslaFaq } from "@/features/marketing/stage-four";
export const metadata: Metadata = { title: "الأسئلة الشائعة | وصلة", description: "إجابات واضحة عن الموافقة والأرصدة وحدود التنفيذ.", openGraph: { title: "الأسئلة الشائعة | وصلة", description: "إجابات واضحة عن الموافقة والأرصدة وحدود التنفيذ.", locale: "ar" }, twitter: { title: "الأسئلة الشائعة | وصلة", description: "إجابات واضحة عن الموافقة والأرصدة وحدود التنفيذ." } };
export default function Page() { return <MarketingShell pathname="/faq"><WaslaFaq/></MarketingShell>; }
