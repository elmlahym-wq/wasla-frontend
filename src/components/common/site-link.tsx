import type { ComponentProps } from "react";

/** Same-origin navigation with a dependable full document transition. */
export default function SiteLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  const target = href === "/app" || href.startsWith("/app/") ? `https://wasla-agent-demo.mega12-kma12.chatgpt.site${href}` : href;
  return <a href={target} {...props} />;
}

export function navigateTo(href: string) {
  window.location.href = href;
}
