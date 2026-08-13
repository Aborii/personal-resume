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
export default function DownloadScrap({ className }: { className?: string }) {
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
    <div className={`nb-scrap ${className ?? ""}`}>
      <WashiTape color="rgba(216, 210, 198, 0.65)" rotate={-45} className="-left-8 -top-1" style={{ width: 62 }} />
      <WashiTape color="rgba(216, 210, 198, 0.65)" rotate={42} className="-right-8 -top-1" style={{ width: 62 }} />
      <p className="nb-hand mb-2.5 text-[18px] leading-[22px] text-[var(--nb-ink-soft)]">
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
  );
}
