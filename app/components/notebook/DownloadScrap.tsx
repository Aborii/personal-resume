"use client";

import { openResumeForPrint, resumeFileUrl } from "../../utils/resumeFiles";
import resumeData from "../../../data/resumeData.json";
import { WashiTape } from "./primitives";
import { DownloadDoodle, PrintDoodle } from "./doodles";

const { name } = resumeData.personalInfo;

/**
 * A slip torn off a pad and taped to the page, offering the
 * "boring" downloadable versions of the resume.
 */
export default function DownloadScrap({
  className,
  compact = false,
}: {
  className?: string;
  /** single tight row — used where page height is scarce */
  compact?: boolean;
}) {
  return (
    <div className={`nb-scrapwrap ${compact ? "nb-scrapwrap--compact" : ""} ${className ?? ""}`}>
      <div className="nb-scrap">
        <p
          className={`nb-hand text-[var(--nb-ink-soft)] ${
            compact ? "mb-1 text-[16px] leading-[19px]" : "mb-2 text-[18px] leading-[22px]"
          }`}
        >
          keep a copy for later:
        </p>
        <div className="flex flex-wrap gap-2.5">
          <a className="nb-scrapbtn" href={resumeFileUrl(name, "pdf")} download>
            <DownloadDoodle />
            PDF
          </a>
          <a className="nb-scrapbtn" href={resumeFileUrl(name, "docx")} download>
            <DownloadDoodle />
            DOCX
          </a>
          <button type="button" className="nb-scrapbtn" onClick={() => openResumeForPrint(name)}>
            <PrintDoodle />
            Print
          </button>
        </div>
      </div>
      {/* the tape holding the slip to the page */}
      <WashiTape color="rgba(238, 214, 150, 0.62)" rotate={-42} className="-left-6 -top-2" style={{ width: 66 }} />
      <WashiTape color="rgba(238, 214, 150, 0.62)" rotate={38} className="-right-6 -top-2" style={{ width: 66 }} />
    </div>
  );
}
