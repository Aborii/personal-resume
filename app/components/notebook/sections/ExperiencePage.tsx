import { NotebookText } from "../NotebookText";
import { SectionTitle, StickyNote } from "../primitives";
import { ArrowBullet } from "../doodles";
import type { ResumeData } from "../../../types/resume-data";

type ExperienceItem = ResumeData["experience"][number];

function TimelineRail() {
  return (
    <svg
      className="absolute bottom-2 left-[7px] top-3 h-auto w-[10px] text-[var(--nb-ink-faint)]"
      viewBox="0 0 10 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M5 0 C 6.2 12 3.8 22 5.2 34 C 6.4 44 3.6 56 5 68 C 6.2 78 4 90 5 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TimelineNode({ current }: { current: boolean }) {
  return (
    <svg
      className="absolute -left-[24px] top-[7px] h-[17px] w-[17px]"
      viewBox="0 0 18 18"
      aria-hidden="true"
    >
      <path
        d="M9 2.2 C 13 2 16 5 15.8 9 C 15.6 13.2 12.8 15.8 9 15.8 C 5.2 15.8 2.3 13 2.3 9 C 2.3 5.2 5.5 2.4 9 2.2 Z"
        fill={current ? "var(--nb-accent)" : "var(--nb-paper)"}
        fillOpacity={current ? 0.85 : 1}
        stroke={current ? "var(--nb-accent)" : "var(--nb-ink-soft)"}
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function ExperiencePage({ experiences }: { experiences: ExperienceItem[] }) {
  return (
    <>
      <SectionTitle note="most recent on top">Where I&apos;ve worked</SectionTitle>

      <div className="relative pl-8">
        <TimelineRail />

        {experiences.map((exp) => (
          <div key={`${exp.company}-${exp.period}`} className="relative mb-[var(--nb-line)]">
            <TimelineNode current={exp.current} />

            {exp.current && (
              <StickyNote
                color="mint"
                rotate={2.5}
                attach="pin"
                className="float-right mb-2 ml-3 hidden w-[118px] px-2 pb-2 pt-6 text-center sm:block"
              >
                <span className="nb-hand text-[16px] font-bold leading-[19px]">I&apos;m here now ✓</span>
              </StickyNote>
            )}

            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="nb-hand text-[22px] font-bold leading-[var(--nb-line)]">{exp.title}</h3>
              <span className={`nb-chip ${exp.current ? "nb-chip--now" : ""}`}>{exp.period}</span>
            </div>

            <p className="text-[16px] leading-[var(--nb-line)]">
              <strong className="nb-strong">{exp.company}</strong>
              <span className="text-[14px] text-[var(--nb-ink-faint)]"> — {exp.location}</span>
            </p>

            <ul>
              {exp.responsibilities.map((responsibility, ri) => (
                <li key={ri} className="flex items-start gap-2">
                  <ArrowBullet className="mt-[10px] shrink-0 text-[var(--nb-ink-soft)]" />
                  <span className="text-[16px] leading-[var(--nb-line)]">
                    <NotebookText>{responsibility}</NotebookText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
