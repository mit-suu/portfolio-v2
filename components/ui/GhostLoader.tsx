const parts = [
  "pupil",
  "pupil1",
  "eye",
  "eye1",
  "top0",
  "top1",
  "top2",
  "top3",
  "top4",
  "st0",
  "st1",
  "st2",
  "st3",
  "st4",
  "st5",
  "an1",
  "an2",
  "an3",
  "an4",
  "an5",
  "an6",
  "an7",
  "an8",
  "an9",
  "an10",
  "an11",
  "an12",
  "an13",
  "an14",
  "an15",
  "an16",
  "an17",
  "an18",
];

export function GhostLoader() {
  return (
    <div className="ghost-loader" aria-hidden="true">
      <div className="ghost-loader__ghost">
        <div className="ghost-loader__red">
          {parts.map((part) => (
            <div key={part} className={`ghost-loader__part ghost-loader__part--${part}`} />
          ))}
        </div>
        <div className="ghost-loader__shadow" />
      </div>
    </div>
  );
}
