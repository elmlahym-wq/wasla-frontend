import type { Metadata } from "next";
import { MarketingShell } from "@/features/marketing/marketing-shell";
import { WaslaPricing } from "@/features/marketing/stage-four";
export const metadata: Metadata = { title: "الباقات | وصلة", description: "اختر رصيدك، وراجع تكلفة كل خطوة.", openGraph: { title: "الباقات | وصلة", description: "اختر رصيدك، وراجع تكلفة كل خطوة.", locale: "ar" }, twitter: { title: "الباقات | وصلة", description: "اختر رصيدك، وراجع تكلفة كل خطوة." } };
export default function Page() { return <MarketingShell pathname="/pricing"><WaslaPricing/></MarketingShell>; }
