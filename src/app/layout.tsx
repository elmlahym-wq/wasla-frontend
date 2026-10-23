import { sitePath } from "@/lib/site-path";
import { MotionVisibility } from "@/components/common/motion-visibility";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { introBootstrap, introFirstPaintCSS } from "@/features/marketing/intro-bootstrap";
export const metadata: Metadata = {
  title: "وصلة | وكيلك الذكي للبحث عن عمل",
  description: "افهم فرصك، وجهّز طلباتك، وتابع خطواتك مع وصلة. أنت تراجع وتوافق على كل خطوة.",
  openGraph: { title: "وصلة | وكيلك الذكي للبحث عن عمل", description: "افهم فرصك، وجهّز طلباتك، وتابع خطواتك مع وصلة. أنت تراجع وتوافق على كل خطوة.", locale: "ar", type: "website", siteName: "وصلة" },
  twitter: { card: "summary", title: "وصلة | وكيلك الذكي للبحث عن عمل", description: "افهم فرصك، وجهّز طلباتك، وتابع خطواتك مع وصلة. أنت تراجع وتوافق على كل خطوة." },
  icons: { icon: sitePath("/favicon.svg"), shortcut: sitePath("/favicon.svg") },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" className="light ws-arabic" suppressHydrationWarning>
    <head>
      <style dangerouslySetInnerHTML={{ __html: introFirstPaintCSS }} />
      <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      <noscript><style>{"html.wa-intro-pending::before{display:none}html.wa-intro-pending .ws-landing{visibility:visible}.wa-stage2-nav{height:auto;block-size:auto}.wa-stage2-nav>.ws-marketing-container{flex-wrap:wrap;padding-block:16px}.wa-stage2-nav .ws-marketing-links{display:flex;position:static;flex-wrap:wrap;inline-size:100%;order:3;margin:0;gap:8px;padding:0;box-shadow:none;border:0}.wa-stage2-nav .ws-marketing-menu{display:none}"}</style></noscript>
      <link rel="preload" href={sitePath("/fonts/readex-pro-variable.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={sitePath("/fonts/ibm-plex-sans-arabic-400.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={sitePath("/fonts/ibm-plex-sans-arabic-500.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={sitePath("/fonts/ibm-plex-sans-arabic-600.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={sitePath("/fonts/geist-variable.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
    </head>
    <body><MotionVisibility />{children}</body>
  </html>;
}

