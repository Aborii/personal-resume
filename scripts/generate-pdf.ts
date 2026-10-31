import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { jsPDF } from "jspdf";
import { buildResumePDF } from "../app/utils/pdfGenerator.js";
import { resumeFileName } from "../app/utils/resumeFiles.js";
import resumeData from "../data/resumeData.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure public directory exists
const publicDir = join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

const writePDF = (doc: jsPDF, fileName: string): void => {
  const outputPath = join(publicDir, fileName);

  writeFileSync(outputPath, Buffer.from(doc.output("arraybuffer")));
  console.log(`✅ Generated: ${fileName}`);
  console.log(`📁 Location: ${outputPath}`);
};

async function generatePDF(): Promise<void> {
  try {
    console.log("🚀 Generating PDF resume...");

    const { name } = resumeData.personalInfo;
    writePDF(buildResumePDF(resumeData), resumeFileName(name, "pdf"));

    // The Print button's copy: the PDF viewer opens the print dialog as soon as it loads
    const printDoc = buildResumePDF(resumeData);
    printDoc.autoPrint();
    writePDF(printDoc, resumeFileName(name, "print"));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to generate PDF:", errorMessage);
    process.exit(1);
  }
}

generatePDF();
