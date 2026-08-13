import { NotebookText } from "../NotebookText";
import { SectionTitle } from "../primitives";
import { SketchEllipse } from "../doodles";

const STATS: Array<{ value: string; label: string }> = [
  { value: "~7", label: "years shipping code" },
  { value: "2M+", label: "data points handled daily" },
  { value: "40%", label: "faster dashboards" },
];

export default function SummaryPage({ summary }: { summary: string }) {
  return (
    <>
      <SectionTitle note="the elevator pitch ↓">About me</SectionTitle>

      <p className="text-[18px]">
        <NotebookText>{summary}</NotebookText>
      </p>

      <div className="mt-[var(--nb-line)] flex flex-col gap-[var(--nb-line)]">
        {STATS.map((stat) => (
          <p key={stat.value} className="flex items-baseline gap-4 leading-[var(--nb-line)]">
            <span className="relative inline-block px-2">
              <SketchEllipse className="absolute -left-2.5 -top-2 h-[calc(100%_+_14px)] w-[calc(100%_+_20px)] text-[var(--nb-accent)]" />
              <span className="nb-hand relative text-[29px] font-bold">{stat.value}</span>
            </span>
            <span className="text-[16px] text-[var(--nb-ink-soft)]">{stat.label}</span>
          </p>
        ))}
      </div>

      <p className="mt-[var(--nb-line)]">
        These days I spend most of my time on <strong className="nb-strong">real-time energy platforms</strong> —
        sensors talking over MQTT, time-series databases under pressure, and dashboards that have to feel instant.
        The rest of this notebook is the long version.
      </p>
    </>
  );
}
