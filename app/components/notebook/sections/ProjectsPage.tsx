import { NotebookText } from "../NotebookText";
import { SectionTitle, WashiTape, InkLink } from "../primitives";
import type { ResumeData } from "../../../types/resume-data";

type ProjectItem = ResumeData["projects"][number];

const TAPE_COLORS = [
  "rgba(240, 170, 185, 0.6)",
  "rgba(150, 205, 235, 0.6)",
  "rgba(250, 215, 130, 0.65)",
  "rgba(160, 220, 175, 0.6)",
  "rgba(200, 175, 240, 0.55)",
];

const ROTATIONS = [1.2, -1.5, 0.8, -1, 1.6, -0.7, 1.1];

export default function ProjectsPage({ projects }: { projects: ProjectItem[] }) {
  return (
    <>
      <SectionTitle note="taped in — don&apos;t peel">Notable projects</SectionTitle>

      <div className="grid grid-cols-1 items-start gap-x-5 gap-y-7 sm:grid-cols-2">
        {projects.map((project, i) => {
          const [stack, ...rest] = project.details;
          const stackChips = (stack ?? "")
            .split(/[,]/)
            .map((s) => s.trim())
            .filter(Boolean);

          return (
            <div key={project.name} className="nb-entry" style={{ "--en-i": Math.min(i, 8) } as React.CSSProperties}>
              <div
                className="nb-card"
                style={{ "--rot": `${ROTATIONS[i % ROTATIONS.length]}deg` } as React.CSSProperties}
              >
                <WashiTape
                  color={TAPE_COLORS[i % TAPE_COLORS.length] ?? TAPE_COLORS[0]!}
                  rotate={i % 2 === 0 ? -3 : 2.5}
                  className="-top-3 left-1/2 -translate-x-1/2"
                />

                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="nb-hand text-[21px] font-bold leading-[24px]">{project.name}</h3>
                  {project.url && (
                    <InkLink href={project.url} className="nb-hand shrink-0 text-[16px]" ariaLabel={`Visit ${project.name}`}>
                      visit
                    </InkLink>
                  )}
                </div>

                {project.description && (
                  <p className="nb-marginnote mt-0.5 text-[16px]" style={{ "--rot": "0deg" } as React.CSSProperties}>
                    {project.description}
                  </p>
                )}

                {stackChips.length > 0 && (
                  <p className="mt-2 text-[13px] leading-[19px] text-[var(--nb-ink-soft)]">
                    {stackChips.join(" · ")}
                  </p>
                )}

                {rest.map((detail, di) => (
                  <p key={di} className="mt-2 text-[14.5px] leading-[21px]">
                    <NotebookText>{detail}</NotebookText>
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
