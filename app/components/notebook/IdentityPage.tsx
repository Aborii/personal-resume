import Image from "next/image";
import { Hl, InkLink, WashiTape } from "./primitives";
import {
  CheckboxDoodle,
  CoffeeRingDoodle,
  MapPinDoodle,
  MailDoodle,
  PhoneDoodle,
  GithubDoodle,
  LinkedinDoodle,
  GlobeDoodle,
  PaperclipDoodle,
} from "./doodles";
import DownloadScrap from "./DownloadScrap";
import type { ResumeData } from "../../types/resume-data";

export type TocItem = { id: string; label: string; index: number };

/**
 * The inside of the front cover — "this notebook belongs to…".
 * Rendered twice (desktop left page + mobile "Me" tab); only one copy
 * is ever visible/focusable at a time.
 */
export default function IdentityPage({
  personalInfo,
  toc,
  current,
  visited,
  onNavigate,
}: {
  personalInfo: ResumeData["personalInfo"];
  toc: TocItem[];
  current: number;
  visited: ReadonlySet<number>;
  onNavigate: (index: number) => void;
}) {
  const [titleMain, titleRest] = personalInfo.title.split("|").map((s) => s.trim());
  const githubHandle = personalInfo.links.github.replace(/https?:\/\/(www\.)?github\.com\//, "");
  const linkedinHandle = personalInfo.links.linkedin
    .replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "")
    .replace(/\/$/, "");
  const portfolioHost = personalInfo.links.portfolio.replace(/https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="relative">
      <WashiTape className="-left-6 -top-4" color="rgba(250, 215, 130, 0.6)" rotate={-38} />

      <div className="nb-polaroid float-right ml-4 mt-1">
        <PaperclipDoodle className="absolute -top-4 left-4 rotate-[14deg]" size={34} />
        <Image
          src="/Abdullah_Almofleh_image.jpg"
          alt={`Photo of ${personalInfo.name}`}
          width={132}
          height={132}
          className="h-[132px] w-[132px] object-cover"
          priority
        />
        <span className="nb-polaroid-caption">Dubai, UAE</span>
      </div>

      <p className="nb-hand text-[18px] text-[var(--nb-ink-soft)]">this notebook belongs to</p>
      <h1 className="nb-hand mt-1 text-[37px] font-bold leading-[40px]">{personalInfo.name}</h1>
      <p className="mt-2 text-[16px] leading-[24px]">
        <Hl>{titleMain}</Hl>
        {titleRest && (
          <>
            <br />
            <span className="text-[14.5px] text-[var(--nb-ink-soft)]">{titleRest}</span>
          </>
        )}
      </p>

      <div className="clear-right mt-[calc(var(--nb-line)*0.8)] space-y-1.5 text-[15.5px]">
        <p className="flex items-center gap-2.5">
          <MapPinDoodle className="shrink-0 text-[var(--nb-ink-soft)]" />
          {personalInfo.location}
        </p>
        <p className="flex items-center gap-2.5">
          <MailDoodle className="shrink-0 text-[var(--nb-ink-soft)]" />
          <InkLink href={`mailto:${personalInfo.email}`} external={false}>
            {personalInfo.email}
          </InkLink>
        </p>
        <p className="flex items-center gap-2.5">
          <PhoneDoodle className="shrink-0 text-[var(--nb-ink-soft)]" />
          <InkLink href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`} external={false}>
            {personalInfo.phone}
          </InkLink>
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[15px]">
        <span className="flex items-center gap-1.5">
          <GithubDoodle className="text-[var(--nb-ink-soft)]" size={17} />
          <InkLink href={personalInfo.links.github}>{githubHandle}</InkLink>
        </span>
        <span className="flex items-center gap-1.5">
          <LinkedinDoodle className="text-[var(--nb-ink-soft)]" size={17} />
          <InkLink href={personalInfo.links.linkedin}>{linkedinHandle}</InkLink>
        </span>
        <span className="flex items-center gap-1.5">
          <GlobeDoodle className="text-[var(--nb-ink-soft)]" size={17} />
          <InkLink href={personalInfo.links.portfolio}>{portfolioHost}</InkLink>
        </span>
      </div>

      <div className="mt-[calc(var(--nb-line)*0.9)]">
        <p className="nb-hand mb-1 text-[19px] font-bold text-[var(--nb-ink-soft)]">in this notebook:</p>
        <ul>
          {toc.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="nb-toc-btn"
                onClick={() => onNavigate(item.index)}
                aria-current={current === item.index ? "page" : undefined}
              >
                <CheckboxDoodle checked={visited.has(item.index)} className="shrink-0" />
                <span
                  className={`text-[16px] leading-[26px] ${
                    current === item.index ? "nb-strong" : ""
                  }`}
                >
                  {item.label}
                </span>
                {current === item.index && (
                  <span className="nb-marginnote ml-1 text-[15px]" style={{ "--rot": "0deg" } as React.CSSProperties}>
                    ← you are here
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[calc(var(--nb-line)*0.8)]">
        <DownloadScrap />
      </div>

      <CoffeeRingDoodle className="pointer-events-none absolute -bottom-9 -right-2" size={110} />
    </div>
  );
}
