import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { Packer } from "docx";
import { buildResumeDOCX } from "../app/utils/docxGenerator.js";
import { resumeFileName } from "../app/utils/resumeFiles.js";
import resumeData from "../data/resumeData.json" assert { type: "json" };
import type { ResumeData } from "../app/types/resume-data.js";

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

async function generateDOCX(): Promise<void> {
  try {
    console.log("🚀 Generating DOCX resume...");

    const doc = buildResumeDOCX(resumeData as ResumeData);
    const docBuffer = await Packer.toBuffer(doc);

    const fileName = resumeFileName(resumeData.personalInfo.name, "docx");
    const outputPath = join(outputDir, fileName);

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
