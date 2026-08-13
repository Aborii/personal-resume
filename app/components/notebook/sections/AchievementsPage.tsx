import { NotebookText } from "../NotebookText";
import { SectionTitle, StickyNote, type StickyColor } from "../primitives";

const COLORS: StickyColor[] = ["yellow", "mint", "blue", "pink", "orange"];
const ROTATIONS = [-2.2, 1.6, -1.2, 2.4, -1.8, 1.2, -2.6, 2];

function splitAchievement(text: string): { head: string | null; body: string } {
  const idx = text.indexOf(": ");
  if (idx > 8 && idx < 64) {
    return { head: text.slice(0, idx), body: text.slice(idx + 2) };
  }
  return { head: null, body: text };
}

function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  return rows;
}

export default function AchievementsPage({ achievements }: { achievements: string[] }) {
  const rows = chunkPairs(achievements.map((text, i) => ({ text, i })));

  return (
    <>
      <SectionTitle note="fresh off the sticky pad">Things I&apos;m proud of</SectionTitle>

      {rows.map((row, r) => (
        <div key={r} className="nb-nosplit-sm mb-5 pt-3 leading-none">
          {row.map(({ text, i }, cell) => {
            const { head, body } = splitAchievement(text);
            return (
              <div
                key={i}
                className={`inline-block align-top ${
                  row.length === 1 ? "w-full" : `w-full sm:w-[calc(50%_-_10px)] ${cell === 0 ? "sm:mr-5" : ""} ${cell === 1 ? "max-sm:mt-5" : ""}`
                }`}
              >
                <StickyNote
                  color={COLORS[i % COLORS.length] ?? "yellow"}
                  rotate={ROTATIONS[i % ROTATIONS.length] ?? -2}
                  attach={i % 2 === 0 ? "pin" : "tape"}
                >
                  {head && (
                    <p className="nb-hand mb-1 text-[19px] font-bold leading-[22px]">
                      <NotebookText>{head}</NotebookText>
                    </p>
                  )}
                  <p className="text-[14.5px] leading-[21px]">
                    <NotebookText>{body}</NotebookText>
                  </p>
                </StickyNote>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
