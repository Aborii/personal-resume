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

      <div>
        <p className="nb-hand nb-nosplit relative max-w-[420px] text-[32px] font-bold leading-[var(--nb-line)]">
          Let&apos;s <Hl color="y">build something</Hl>.
          <PaperPlaneDoodle className="absolute -top-2 right-[-52px] h-auto w-[72px] text-[var(--nb-ink-soft)] sm:w-[96px]" size={110} />
        </p>

        <p className="nb-t-body mt-[var(--nb-line)] max-w-[430px]">
          The notebook is full, but I&apos;m just getting started. If you have a role, a project, or a hard
          problem with real-time data — write to me.
        </p>

        <div className="nb-nosplit mt-[var(--nb-line)]">
          <p className="flex items-center gap-3 leading-[var(--nb-line)]">
            <MailDoodle className="shrink-0 text-[var(--nb-ink-soft)]" size={20} />
            <InkLink href={`mailto:${personalInfo.email}`} external={false} className="nb-hand text-[22px] font-bold">
              {personalInfo.email}
            </InkLink>
          </p>
          <p className="nb-t-body flex items-center gap-3">
            <PhoneDoodle className="shrink-0 text-[var(--nb-ink-soft)]" size={20} />
            <InkLink href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`} external={false}>
              {personalInfo.phone}
            </InkLink>
          </p>
          <p className="nb-t-sm flex items-center gap-3 text-[var(--nb-ink-soft)]">
            <MapPinDoodle className="shrink-0" size={20} />
            {personalInfo.location}
          </p>
        </div>

        <div className="mt-[var(--nb-line)] flex flex-wrap gap-x-7 leading-[var(--nb-line)]">
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

        <p className="nb-mono mt-[var(--nb-line)] leading-[var(--nb-line)] text-[var(--nb-ink-soft)]">
          $ npx hire-abdullah
          <span className="nb-caret" aria-hidden="true" />
          <br />
          <span className="opacity-60"># usually replies within a day</span>
        </p>

        <div className="nb-nosplit mt-[var(--nb-line)]">
          <DownloadScrap />
        </div>

        <div className="nb-nosplit mt-[var(--nb-line)]">
          <SigFlourish className="h-[24px] w-auto text-[var(--nb-ink-soft)]" size={96} />
          <p className="nb-hand -mt-1 text-[19px] leading-[var(--nb-line)]">— Abdullah</p>
          <p className="nb-t-sm text-center text-[var(--nb-ink-faint)]">
            © {year} {personalInfo.name} — building the future, one line of code at a time.
          </p>
        </div>
      </div>
    </>
  );
}
