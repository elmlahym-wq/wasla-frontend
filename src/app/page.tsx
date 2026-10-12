import type { Metadata } from "next";
import { LandingPage } from "@/features/marketing/landing-page";
export const metadata: Metadata = { title: "وصلة | بحثك له وكيل", description: "تفهم ملفك، وتجهّز طلبك. والقرار لك.", openGraph: { title: "وصلة | بحثك له وكيل", description: "تفهم ملفك، وتجهّز طلبك. والقرار لك.", locale: "ar" }, twitter: { title: "وصلة | بحثك له وكيل", description: "تفهم ملفك، وتجهّز طلبك. والقرار لك." } };
export default function Page() { return <LandingPage />; }
