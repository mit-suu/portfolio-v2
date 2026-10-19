/** One branch of a festival laurel, drawn as a stem with paired leaves. Mirror it for the other side. */
function Branch({ mirrored = false }: { mirrored?: boolean }) {
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    // Walk along an arc from the bottom of the wreath up to the top.
    const angle = Math.PI * (0.62 + t * 0.72);
    const cx = 60 + Math.cos(angle) * 46;
    const cy = 64 - Math.sin(angle) * 50;
    const tilt = (angle * 180) / Math.PI - 90;
    const size = 1 - t * 0.35;
    // Round so server and client serialise identical attribute strings.
    const r = (n: number) => Math.round(n * 100) / 100;
    return { cx: r(cx), cy: r(cy), tilt: r(tilt), size: r(size), i };
  });

  return (
    <g transform={mirrored ? "translate(120 0) scale(-1 1)" : undefined}>
      <path
        className="laurel__stem"
        d="M 46 112 Q 6 70 32 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {leaves.map(({ cx, cy, tilt, size, i }) => (
        <g key={i} transform={`translate(${cx} ${cy}) rotate(${tilt}) scale(${size})`}>
          <ellipse className="laurel__leaf" cx="-6" cy="0" rx="7" ry="2.8" transform="rotate(-35)" fill="currentColor" />
          <ellipse className="laurel__leaf" cx="6" cy="0" rx="7" ry="2.8" transform="rotate(35)" fill="currentColor" />
        </g>
      ))}
    </g>
  );
}

export function Laurel({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <Branch />
      <Branch mirrored />
    </svg>
  );
}
