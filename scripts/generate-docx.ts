import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Packer } from "docx";
import { buildResumeDOCX } from "../app/utils/docxGenerator.js";
import resumeData from "../data/resumeData.json" assert { type: "json" };
import type { ResumeData } from "../app/types/resume-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure public directory exists
const publicDir = join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

async function generateDOCX(): Promise<void> {
  try {
    console.log("🚀 Generating DOCX resume...");

    const doc = buildResumeDOCX(resumeData as ResumeData);
    const docBuffer = await Packer.toBuffer(doc);

    const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.docx`;
    const outputPath = join(publicDir, fileName);

    writeFileSync(outputPath, docBuffer);
    console.log(`✅ Generated: ${fileName}`);
    console.log(`📁 Location: ${outputPath}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to generate DOCX:", errorMessage);
    process.exit(1);
  }
}

generateDOCX();
