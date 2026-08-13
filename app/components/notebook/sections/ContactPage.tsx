import { SectionTitle, Hl, InkLink } from "../primitives";
import {
  PaperPlaneDoodle,
  MailDoodle,
  PhoneDoodle,
  MapPinDoodle,
  GithubDoodle,
  LinkedinDoodle,
  GlobeDoodle,
  SigFlourish,
} from "../doodles";
import DownloadScrap from "../DownloadScrap";
import type { ResumeData } from "../../../types/resume-data";

export default function ContactPage({ personalInfo }: { personalInfo: ResumeData["personalInfo"] }) {
  const year = new Date().getFullYear();
  const githubHandle = personalInfo.links.github.replace(/https?:\/\/(www\.)?github\.com\//, "");
  const linkedinHandle = personalInfo.links.linkedin
    .replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "")
    .replace(/\/$/, "");
  const portfolioHost = personalInfo.links.portfolio.replace(/https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <SectionTitle>Last page</SectionTitle>

      <div className="relative">
        <PaperPlaneDoodle className="absolute -top-3 right-0 text-[var(--nb-ink-soft)]" size={110} />

        <p className="nb-hand nb-entry max-w-[420px] text-[34px] font-bold leading-[38px]" style={{ "--en-i": 0 } as React.CSSProperties}>
          Let&apos;s <Hl color="y">build something</Hl>.
        </p>

        <p className="nb-entry mt-[var(--nb-line)] max-w-[430px] text-[16.5px]" style={{ "--en-i": 1 } as React.CSSProperties}>
          The notebook is full, but I&apos;m just getting started. If you have a role, a project, or a hard
          problem with real-time data — write to me.
        </p>

        <div className="nb-entry mt-[var(--nb-line)] space-y-2" style={{ "--en-i": 2 } as React.CSSProperties}>
          <p className="flex items-center gap-3">
            <MailDoodle className="shrink-0 text-[var(--nb-ink-soft)]" size={20} />
            <InkLink href={`mailto:${personalInfo.email}`} external={false} className="nb-hand text-[22px] font-bold">
              {personalInfo.email}
            </InkLink>
          </p>
          <p className="flex items-center gap-3">
            <PhoneDoodle className="shrink-0 text-[var(--nb-ink-soft)]" size={20} />
            <InkLink href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`} external={false} className="text-[16.5px]">
              {personalInfo.phone}
            </InkLink>
          </p>
          <p className="flex items-center gap-3 text-[15.5px] text-[var(--nb-ink-soft)]">
            <MapPinDoodle className="shrink-0" size={20} />
            {personalInfo.location}
          </p>
        </div>

        <div className="nb-entry mt-[var(--nb-line)] flex flex-wrap gap-x-7 gap-y-2" style={{ "--en-i": 3 } as React.CSSProperties}>
          <span className="flex items-center gap-2">
            <GithubDoodle className="text-[var(--nb-ink-soft)]" size={20} />
            <InkLink href={personalInfo.links.github}>{githubHandle}</InkLink>
          </span>
          <span className="flex items-center gap-2">
            <LinkedinDoodle className="text-[var(--nb-ink-soft)]" size={20} />
            <InkLink href={personalInfo.links.linkedin}>{linkedinHandle}</InkLink>
          </span>
          <span className="flex items-center gap-2">
            <GlobeDoodle className="text-[var(--nb-ink-soft)]" size={20} />
            <InkLink href={personalInfo.links.portfolio}>{portfolioHost}</InkLink>
          </span>
        </div>

        <p className="nb-mono nb-entry mt-[calc(var(--nb-line)*1.2)] text-[var(--nb-ink-soft)]" style={{ "--en-i": 4 } as React.CSSProperties}>
          $ npx hire-abdullah
          <span className="nb-caret" aria-hidden="true" />
          <br />
          <span className="opacity-60"># usually replies within a day</span>
        </p>

        <div className="nb-entry mt-[var(--nb-line)]" style={{ "--en-i": 5 } as React.CSSProperties}>
          <DownloadScrap />
        </div>

        <div className="nb-entry mt-[calc(var(--nb-line)*1.2)]" style={{ "--en-i": 6 } as React.CSSProperties}>
          <SigFlourish className="text-[var(--nb-ink-soft)]" />
          <p className="nb-hand -mt-1 text-[19px]">— Abdullah</p>
        </div>

        <p className="mt-[var(--nb-line)] text-center text-[13.5px] leading-[20px] text-[var(--nb-ink-faint)]">
          © {year} {personalInfo.name} — building the future, one line of code at a time.
        </p>
      </div>
    </>
  );
}
