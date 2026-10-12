/** Company mark: three channels converge. The agent uses its own focus-core mark. */
export function WaslaMark({ className = "", size = 40 }: { className?: string; size?: number }) {
  return <svg className={className} viewBox="0 0 256 256" width={size} height={size} aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 101 45 V 105 C 101 127 112 140 133 140" />
      <path d="M 216 110 H 177 C 153 110 142 122 142 146" />
      <path d="M 43 215 H 101 C 124 215 134 200 134 180 V 155" />
    </g>
    <rect x="121" y="133" width="28" height="28" rx="8" fill="currentColor" />
  </svg>;
}
