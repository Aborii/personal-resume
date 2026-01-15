"use client";

import { generateResumePDF, generateResumePDFForPrint } from "../utils/pdfGenerator";
import { generateResumeDOCX } from "../utils/docxGenerator";
import { DownloadIcon, ChevronDownIcon, PrintIcon, DocumentIcon } from "./Icons";
import resumeData from "../../data/resumeData.json";
import { useEffect, useState, useRef } from "react";

export default function DownloadPDFButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePrintPDF = () => {
    try {
      generateResumePDFForPrint(resumeData);
      setIsDropdownOpen(false);
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

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("beforeprint", handlePrint);
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
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

  const handleDownloadDOCX = async () => {
    try {
      await generateResumeDOCX(resumeData);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error generating DOCX:", error);
      alert("Failed to generate DOCX. Please try again.");
    }
  };

  return (
    <div className="flex gap-0">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-700 dark:to-teal-700 dark:hover:from-emerald-800 dark:hover:to-teal-800 text-white font-medium rounded-l-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label="Download resume as PDF"
      >
        <DownloadIcon />
        <span className="hidden sm:inline">Download PDF</span>
        <span className="sm:hidden">PDF</span>
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center h-full  justify-center px-3 py-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-700 dark:to-teal-700 dark:hover:from-emerald-800 dark:hover:to-teal-800 text-white font-medium rounded-r-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 border-l border-emerald-700 dark:border-emerald-800"
          aria-label="More download options"
        >
          <ChevronDownIcon />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition-colors duration-150"
            >
              <PrintIcon />
              <span>Print PDF</span>
            </button>
            <button
              onClick={handleDownloadDOCX}
              className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors duration-150"
            >
              <DocumentIcon />
              <span>Download DOCX</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
