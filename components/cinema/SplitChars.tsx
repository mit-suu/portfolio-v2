import { cn } from "@/lib/utils";

type SplitCharsProps = {
  text: string;
  className?: string;
  charClassName?: string;
};

/**
 * Splits text into masked characters at render time so the server markup already
 * matches what GSAP animates — no layout jump on hydration. Screen readers get the
 * whole word via aria-label.
 */
export function SplitChars({ text, className, charClassName }: SplitCharsProps) {
  return (
    <span className={cn("split", className)} aria-label={text} role="text">
      {Array.from(text).map((char, i) => (
        <span key={i} className="split__mask" aria-hidden="true">
          <span className={cn("split__char", charClassName)}>{char === " " ? " " : char}</span>
        </span>
      ))}
    </span>
  );
}
