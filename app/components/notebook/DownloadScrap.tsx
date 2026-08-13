"use client";

import { generateResumePDF, generateResumePDFForPrint } from "../../utils/pdfGenerator";
import { generateResumeDOCX } from "../../utils/docxGenerator";
import resumeData from "../../../data/resumeData.json";
import { WashiTape } from "./primitives";
import { DownloadDoodle, PrintDoodle } from "./doodles";

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
  const handlePDF = () => {
    try {
      generateResumePDF(resumeData);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handleDOCX = async () => {
    try {
      await generateResumeDOCX(resumeData);
    } catch (error) {
      console.error("Error generating DOCX:", error);
      alert("Failed to generate DOCX. Please try again.");
    }
  };

  const handlePrint = () => {
    try {
      generateResumePDFForPrint(resumeData);
    } catch (error) {
      console.error("Error printing PDF:", error);
      alert("Failed to print PDF. Please try again.");
    }
  };

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
          <button type="button" className="nb-scrapbtn" onClick={handlePDF}>
            <DownloadDoodle />
            PDF
          </button>
          <button type="button" className="nb-scrapbtn" onClick={handleDOCX}>
            <DownloadDoodle />
            DOCX
          </button>
          <button type="button" className="nb-scrapbtn" onClick={handlePrint}>
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
