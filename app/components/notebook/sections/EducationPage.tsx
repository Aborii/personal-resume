import { SectionTitle, Hl, MarginNote, WashiTape } from "../primitives";
import { ArrowCurve } from "../doodles";
import type { ResumeData } from "../../../types/resume-data";

function LevelDots({ level }: { level: string }) {
  const filled = /native/i.test(level) ? 5 : /professional|fluent/i.test(level) ? 4 : 3;
  return (
    <svg width={92} height={16} viewBox="0 0 92 16" role="img" aria-label={level}>
      {Array.from({ length: 5 }).map((_, i) => (
        <path
          key={i}
          d={`M${8 + i * 18} 2.6 C ${12 + i * 18} 2.4 ${14.5 + i * 18} 5 ${14.3 + i * 18} 8 C ${14 + i * 18} 11.4 ${11.5 + i * 18} 13.5 ${8.3 + i * 18} 13.4 C ${5 + i * 18} 13.3 ${2.8 + i * 18} 11 ${2.9 + i * 18} 8 C ${3 + i * 18} 5 ${5.4 + i * 18} 2.8 ${8 + i * 18} 2.6 Z`}
          fill={i < filled ? "var(--nb-ink)" : "none"}
          fillOpacity={i < filled ? 0.8 : 0}
          stroke="var(--nb-ink-soft)"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

export default function EducationPage({
  education,
  languages,
}: {
  education: ResumeData["education"];
  languages: Record<string, string>;
}) {
  return (
    <>
      <SectionTitle note="the official bit">School days</SectionTitle>

      <div className="nb-nosplit relative mt-[var(--nb-line)]">
        <div className="absolute -top-6 right-2 flex items-end gap-1">
          <MarginNote rotate={-3}>yes — the major was AI</MarginNote>
          <ArrowCurve className="mb-[-14px] text-[var(--nb-ink-soft)]" size={34} />
        </div>

        <div className="nb-cert">
          <WashiTape color="rgba(216, 210, 198, 0.65)" rotate={-40} className="-left-5 -top-2" style={{ width: 58 }} />
          <WashiTape color="rgba(216, 210, 198, 0.65)" rotate={38} className="-right-5 -top-2" style={{ width: 58 }} />

          <p className="nb-hand text-center text-[17px] text-[var(--nb-ink-soft)]">this certifies that Abdullah earned a</p>
          <p className="nb-hand mt-1 text-center text-[24px] font-bold leading-[30px]">{education.degree}</p>
          <p className="mt-2 text-center text-[16.5px]">
            <strong className="nb-strong">{education.school}</strong>
          </p>
          <p className="text-center text-[14px] text-[var(--nb-ink-faint)]">
            {education.location} · {education.period}
          </p>
          <p className="mt-3 text-center text-[16px]">
            GPA: <Hl>{education.gpa}</Hl>
          </p>
        </div>
      </div>

      <div className="nb-nosplit mt-[var(--nb-line)]">
        <h3 className="nb-hand text-[21px] font-bold leading-[var(--nb-line)]">Languages</h3>
        {Object.entries(languages).map(([language, level]) => (
          <div key={language} className="flex h-[var(--nb-line)] items-center gap-4">
            <span className="nb-t-body w-[86px]">{language}</span>
            <LevelDots level={level} />
            <span className="nb-marginnote text-[15px]" style={{ "--rot": "0deg" } as React.CSSProperties}>
              {level.toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
