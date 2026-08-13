"use client";

import { generateResumePDF, generateResumePDFForPrint } from "../../utils/pdfGenerator";
import { generateResumeDOCX } from "../../utils/docxGenerator";
import resumeData from "../../../data/resumeData.json";
import { BinderClipDoodle } from "./doodles";

/**
 * A torn scrap of paper held by a binder clip, offering the
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
      <BinderClipDoodle className="absolute -top-4 left-7" />
      <p className="nb-hand mb-1.5 text-[17px] leading-[20px] text-[var(--nb-ink-soft)]">
        need the boring version?
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="nb-scrapbtn" onClick={handlePDF}>
          PDF
        </button>
        <button type="button" className="nb-scrapbtn" onClick={handleDOCX}>
          DOCX
        </button>
        <button type="button" className="nb-scrapbtn" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
}
