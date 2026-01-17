import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildResumeMD } from "../app/utils/mdGenerator.js";
import resumeData from "../data/resumeData.json" assert { type: "json" };
import type { ResumeData } from "../app/types/resume-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure public directory exists
const publicDir = join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

async function generateMD(): Promise<void> {
  try {
    console.log("🚀 Generating Markdown resume...");

    const mdContent = buildResumeMD(resumeData as ResumeData);

    const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.md`;
    const outputPath = join(publicDir, fileName);

    writeFileSync(outputPath, mdContent, "utf-8");
    console.log(`✅ Generated: ${fileName}`);
    console.log(`📁 Location: ${outputPath}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to generate Markdown:", errorMessage);
    process.exit(1);
  }
}

generateMD();
