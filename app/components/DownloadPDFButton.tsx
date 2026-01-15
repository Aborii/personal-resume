"use client";

import { generateResumePDF, generateResumePDFForPrint } from "../utils/pdfGenerator";
import resumeData from "../../data/resumeData.json";
import { useEffect } from "react";

export default function DownloadPDFButton() {
  const handlePrintPDF = () => {
    try {
      generateResumePDFForPrint(resumeData);
    } catch (error) {
      console.error("Error printing PDF:", error);
      alert("Failed to print PDF. Please try again.");
    }
  };

  useEffect(() => {
    // Override the print functionality
    const handlePrint = (e: Event) => {
      e.preventDefault();
      handlePrintPDF();
    };

    window.addEventListener("beforeprint", handlePrint);

    // Also override keyboard shortcut (Cmd/Ctrl + P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        handlePrintPDF();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("beforeprint", handlePrint);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleDownload = () => {
    try {
      generateResumePDF(resumeData);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-700 dark:to-teal-700 dark:hover:from-emerald-800 dark:hover:to-teal-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label="Download resume as PDF"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>Download PDF</span>
      </button>

      <button
        onClick={handlePrintPDF}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 dark:from-slate-700 dark:to-gray-800 dark:hover:from-slate-800 dark:hover:to-gray-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label="Print resume as PDF"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        <span>Print PDF</span>
      </button>
    </div>
  );
}
