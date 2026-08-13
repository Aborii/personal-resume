import Image from "next/image";
import { Hl, InkLink } from "./primitives";
import {
  CheckboxDoodle,
  CoffeeRingDoodle,
  MapPinDoodle,
  MailDoodle,
  PhoneDoodle,
  GithubDoodle,
  LinkedinDoodle,
  GlobeDoodle,
} from "./doodles";
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
      {/* pulled up so the sheet-level paperclip grips it against the page edge */}
      <div className="nb-polaroid float-right ml-4 -mt-[26px]">
        <Image
          src="/Abdullah_Almofleh_image.jpg"
          alt={`Photo of ${personalInfo.name}`}
          width={132}
          height={132}
          className="h-[104px] w-[104px] object-cover sm:h-[132px] sm:w-[132px]"
          priority
        />
        <span className="nb-polaroid-caption">Dubai, UAE</span>
      </div>

      <p className="nb-hand nb-t-lg text-[var(--nb-ink-soft)]">this notebook belongs to</p>
      <h1 className="nb-hand text-[33px] font-bold leading-[var(--nb-line)]">{personalInfo.name}</h1>
      <p className="nb-t-body">
        <Hl>{titleMain}</Hl>
        {titleRest && (
          <>
            <br />
            <span className="nb-t-sm text-[var(--nb-ink-soft)]">{titleRest}</span>
          </>
        )}
      </p>

      <div className="nb-t-body clear-right mt-[var(--nb-line)]">
        <p className="flex items-center gap-2.5 leading-[var(--nb-line)]">
          <MapPinDoodle className="shrink-0 text-[var(--nb-ink-soft)]" />
          {personalInfo.location}
        </p>
        <p className="flex items-center gap-2.5 leading-[var(--nb-line)]">
          <MailDoodle className="shrink-0 text-[var(--nb-ink-soft)]" />
          <InkLink href={`mailto:${personalInfo.email}`} external={false}>
            {personalInfo.email}
          </InkLink>
        </p>
        <p className="flex items-center gap-2.5 leading-[var(--nb-line)]">
          <PhoneDoodle className="shrink-0 text-[var(--nb-ink-soft)]" />
          <InkLink href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`} external={false}>
            {personalInfo.phone}
          </InkLink>
        </p>
      </div>

      <div className="nb-t-sm flex flex-wrap gap-x-5">
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

      <div className="relative mt-[var(--nb-line)]">
        {/* the mug sat here while the list was being written */}
        <div className="pointer-events-none absolute -top-2 right-0 w-[104px] text-center" aria-hidden="true">
          <CoffeeRingDoodle size={96} />
          <span
            className="nb-marginnote block text-[13.5px] text-[var(--nb-ink-faint)]"
            style={{ "--rot": "-3deg" } as React.CSSProperties}
          >
            coffee. sorry.
          </span>
        </div>
        <p className="nb-hand text-[19px] font-bold leading-[var(--nb-line)] text-[var(--nb-ink-soft)]">
          in this notebook:
        </p>
        <ul>
          {toc.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="nb-toc-btn h-[var(--nb-line)]"
                onClick={() => onNavigate(item.index)}
                aria-current={current === item.index ? "page" : undefined}
              >
                <CheckboxDoodle checked={visited.has(item.index)} className="shrink-0" />
                <span className={`nb-t-body ${current === item.index ? "nb-strong" : ""}`}>
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

    </div>
  );
}
