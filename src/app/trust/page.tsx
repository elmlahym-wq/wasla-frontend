import type { Metadata } from "next";
import { MarketingShell } from "@/features/marketing/marketing-shell";
import { WaslaTrust } from "@/features/marketing/stage-four";
export const metadata: Metadata = { title: "الثقة | وصلة", description: "راجع طلبك ووافق قبل Auto-Apply.", openGraph: { title: "الثقة | وصلة", description: "راجع طلبك ووافق قبل Auto-Apply.", locale: "ar" }, twitter: { title: "الثقة | وصلة", description: "راجع طلبك ووافق قبل Auto-Apply." } };
export default function Page() { return <MarketingShell pathname="/trust"><WaslaTrust/></MarketingShell>; }
