import { NotebookText } from "../NotebookText";
import { SectionTitle } from "../primitives";
import { SketchEllipse } from "../doodles";

const STATS: Array<{ value: string; label: string }> = [
  { value: "~7", label: "years shipping code" },
  { value: "2M+", label: "data points daily" },
  { value: "40%", label: "faster dashboards" },
];

export default function SummaryPage({ summary }: { summary: string }) {
  return (
    <>
      <SectionTitle note="the elevator pitch ↓">About me</SectionTitle>

      <p className="nb-entry text-[18px]" style={{ "--en-i": 0 } as React.CSSProperties}>
        <NotebookText>{summary}</NotebookText>
      </p>

      <div className="mt-[calc(var(--nb-line)*1.2)] flex flex-wrap gap-x-10 gap-y-[var(--nb-line)]">
        {STATS.map((stat, i) => (
          <div
            key={stat.value}
            className="nb-entry relative pt-2"
            style={{ "--en-i": i + 1 } as React.CSSProperties}
          >
            <span className="relative inline-block px-4 py-1">
              <SketchEllipse className="absolute -left-2 -top-1.5 h-[calc(100%_+_12px)] w-[calc(100%_+_16px)] text-[var(--nb-accent)]" />
              <span className="nb-hand relative text-[34px] font-bold leading-none">{stat.value}</span>
            </span>
            <p className="nb-marginnote mt-1 block text-[16px]" style={{ "--rot": "-1deg" } as React.CSSProperties}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="nb-entry mt-[calc(var(--nb-line)*1.2)]" style={{ "--en-i": 4 } as React.CSSProperties}>
        These days I spend most of my time on <strong className="nb-strong">real-time energy platforms</strong> —
        sensors talking over MQTT, time-series databases under pressure, and dashboards that have to feel instant.
        The rest of this notebook is the long version.
      </p>
    </>
  );
}
