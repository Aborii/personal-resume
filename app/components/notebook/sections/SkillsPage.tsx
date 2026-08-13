import { SectionTitle, MarginNote } from "../primitives";
import { StarDoodle, TallyMarks } from "../doodles";

type ParsedSkill = {
  name: string;
  years: number | null;
  extras: string[];
};

function parseSkill(raw: string): ParsedSkill {
  const match = raw.match(/^(.*?)\s*\((.*?)\)\s*$/);
  const name = match?.[1];
  const inner = match?.[2];
  if (!name || inner === undefined) return { name: raw, years: null, extras: [] };
  const segments = inner.split(",").map((s) => s.trim());
  let years: number | null = null;
  const extras: string[] = [];
  for (const segment of segments) {
    const yearDigits = segment.match(/(\d+)\s*\+?\s*years?/i)?.[1];
    if (yearDigits) years = parseInt(yearDigits, 10);
    else if (segment) extras.push(segment);
  }
  return { name, years, extras };
}

export default function SkillsPage({
  skills,
  topSkills,
}: {
  skills: Record<string, string[]>;
  topSkills: string[];
}) {
  const top = topSkills.map((s) => s.toLowerCase());

  return (
    <>
      <SectionTitle note="tallies = years of use">Toolbox</SectionTitle>

      <p className="leading-[var(--nb-line)]">
        <MarginNote rotate={-1}>
          <StarDoodle className="mr-1 inline-block text-[var(--nb-accent)]" size={15} /> = what I reach for first
        </MarginNote>
      </p>

      {Object.entries(skills).map(([category, list]) => (
        <div key={category} className="nb-nosplit mb-[var(--nb-line)]">
          <h3 className="nb-hand mb-1 text-[21px] font-bold leading-[var(--nb-line)]">{category}</h3>
          <div className="flex flex-wrap gap-x-2.5 gap-y-3">
            {list.map((raw) => {
              const { name, years, extras } = parseSkill(raw);
              const isTop = top.some((t) => name.toLowerCase() === t);
              return (
                <span key={raw} className="nb-skilltag" title={raw}>
                  <span className="flex items-center gap-1.5 text-[15px] leading-[19px]">
                    {name}
                    {isTop && <StarDoodle className="text-[var(--nb-accent)]" size={14} />}
                  </span>
                  {(years !== null || extras.length > 0) && (
                    <span className="flex items-center gap-2 text-[12.5px] leading-[15px] text-[var(--nb-ink-faint)]">
                      {years !== null && <TallyMarks count={years} className="text-[var(--nb-ink-soft)]" />}
                      {extras.length > 0 && <span>{extras.join(" · ")}</span>}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
