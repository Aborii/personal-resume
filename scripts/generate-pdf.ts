import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import type { jsPDF } from "jspdf";
import { buildResumePDF } from "../app/utils/pdfGenerator.js";
import { resumeFileName } from "../app/utils/resumeFiles.js";
import resumeData from "../data/resumeData.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Write into public/ unless a folder is given. The build passes "out", which must already exist:
// creating it would let the deploy ship a folder holding only these files.
const outputDir = resolve(__dirname, "..", process.argv[2] ?? "public");
if (process.argv[2] === undefined) {
  mkdirSync(outputDir, { recursive: true });
} else if (!existsSync(outputDir)) {
  console.error(`❌ Output folder not found: ${outputDir}`);
  process.exit(1);
}

const writePDF = (doc: jsPDF, fileName: string): void => {
  const outputPath = join(outputDir, fileName);

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
