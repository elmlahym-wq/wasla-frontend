import type { Metadata } from "next";
import { MarketingShell } from "@/features/marketing/marketing-shell";
import { WaslaJourney } from "@/features/marketing/wasla-journey";
export const metadata: Metadata = { title: "الرحلة | وصلة", description: "من ملفك إلى طلب تراجعه. القرار لك.", openGraph: { title: "الرحلة | وصلة", description: "من ملفك إلى طلب تراجعه. القرار لك.", locale: "ar" }, twitter: { title: "الرحلة | وصلة", description: "من ملفك إلى طلب تراجعه. القرار لك." } };
export default function Page() { return <MarketingShell pathname="/journey"><WaslaJourney/></MarketingShell>; }
