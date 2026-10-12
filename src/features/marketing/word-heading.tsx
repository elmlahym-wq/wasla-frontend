import type { CSSProperties, ElementType } from "react";
/** Whole words preserve Arabic shaping and RTL reading order. */
export function WordHeading({ text, id, as: Tag = "h2" }: { text: string; id?: string; as?: ElementType }) {
  return <Tag id={id} data-word-heading>{text.split(/\s+/).map((word, index) => <span key={`${word}-${index}`} className="wa-reveal-word" style={{ "--r2-word": index } as CSSProperties}>{word}{" "}</span>)}</Tag>;
}
