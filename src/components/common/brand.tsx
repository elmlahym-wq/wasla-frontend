import Link from "@/components/common/site-link";
import { WaslaMark } from "./wasla-mark";
export function Brand({ compact = false, href = "/", language = "ar" }: { compact?: boolean; href?: string; language?: "ar" | "en" }) {
  return <Link href={href} className={`ws-brand ${compact ? "is-compact" : ""}`} aria-label={language === "ar" ? "وصلة، الصفحة الرئيسية" : "وصلة، الصفحة الرئيسية"}>
    <WaslaMark className="ws-brand-glyph" />
    {!compact && <span className="ws-brand-name">{language === "ar" ? "وصلة" : <>wasla<span className="ws-brand-period">.</span></>}</span>}
  </Link>;
}
