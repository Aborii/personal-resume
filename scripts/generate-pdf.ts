import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildResumePDF } from "../app/utils/pdfGenerator.js";
import resumeData from "../data/resumeData.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure public directory exists
const publicDir = join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

async function generatePDF(): Promise<void> {
  try {
    console.log("🚀 Generating PDF resume...");
    
    const doc = buildResumePDF(resumeData);
    const pdfBuffer = doc.output("arraybuffer");
    
    const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`;
    const outputPath = join(publicDir, fileName);
    
    writeFileSync(outputPath, Buffer.from(pdfBuffer));
    console.log(`✅ Generated: ${fileName}`);
    console.log(`📁 Location: ${outputPath}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to generate PDF:", errorMessage);
    process.exit(1);
  }
}

generatePDF();
