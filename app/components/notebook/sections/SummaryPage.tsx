import { NotebookText } from "../NotebookText";
import { SectionTitle } from "../primitives";
import { SketchEllipse } from "../doodles";

type Stat = { value: string; label: string };

export default function SummaryPage({ summary, stats, now }: { summary: string; stats: Stat[]; now: string }) {
  return (
    <>
      <SectionTitle note="the elevator pitch ↓">About me</SectionTitle>

      <p className="nb-t-lg">
        <NotebookText>{summary}</NotebookText>
      </p>

      <div className="mt-[var(--nb-line)]">
        {stats.map((stat, i) => (
          <p
            key={stat.value}
            /* fixed one-line height: the big numeral's line box would otherwise
               run taller than the rule and push everything below it off-grid */
            className={`nb-nosplit flex h-[var(--nb-line)] items-baseline gap-4 leading-[var(--nb-line)] ${
              i > 0 ? "mt-[var(--nb-line)]" : ""
            }`}
          >
            <span className="nb-hand relative inline-block px-2 text-[29px] font-bold leading-[var(--nb-line)]">
              <SketchEllipse className="absolute -left-2.5 -top-2 h-[calc(100%_+_14px)] w-[calc(100%_+_20px)] text-[var(--nb-accent)]" />
              <span className="relative">{stat.value}</span>
            </span>
            <span className="nb-t-body text-[var(--nb-ink-soft)]">{stat.label}</span>
          </p>
        ))}
      </div>

      <p className="mt-[var(--nb-line)]">
        <NotebookText>{now}</NotebookText> The rest of this notebook is the long version.
      </p>
    </>
  );
}
