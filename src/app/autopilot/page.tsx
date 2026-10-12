import type { Metadata } from "next";
import { MarketingShell } from "@/features/marketing/marketing-shell";
import { AutopilotPreview } from "@/features/marketing/stage-four";
export const metadata: Metadata = { title: "البحث التلقائي قريبًا | وصلة", description: "تصوّر لحملة البحث القادمة. Autopilot قريبًا.", openGraph: { title: "البحث التلقائي قريبًا | وصلة", description: "تصوّر لحملة البحث القادمة. Autopilot قريبًا.", locale: "ar" }, twitter: { title: "البحث التلقائي قريبًا | وصلة", description: "تصوّر لحملة البحث القادمة. Autopilot قريبًا." } };
export default function Page() { return <MarketingShell pathname="/autopilot"><AutopilotPreview/></MarketingShell>; }
