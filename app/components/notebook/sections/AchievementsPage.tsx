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

export default function AchievementsPage({ achievements }: { achievements: string[] }) {
  return (
    <>
      <SectionTitle note="fresh off the sticky pad">Things I&apos;m proud of</SectionTitle>

      <div className="columns-1 gap-5 sm:columns-2">
        {achievements.map((achievement, i) => {
          const { head, body } = splitAchievement(achievement);
          return (
            <div
              key={i}
              className="nb-entry mb-5 break-inside-avoid"
              style={{ "--en-i": i } as React.CSSProperties}
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
    </>
  );
}
