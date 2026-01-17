import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Document, Paragraph, TextRun, AlignmentType, BorderStyle, Packer } from "docx";
import resumeData from "../data/resumeData.json" assert { type: "json" };
import type { ResumeData } from "../app/types/resume-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure public directory exists
const publicDir = join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

async function buildResumeDOCX(resumeData: ResumeData): Promise<Buffer> {
  const children: Paragraph[] = [];

  // Header Section
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.personalInfo.name,
          bold: true,
          size: 32,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.personalInfo.title,
          size: 22,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.personalInfo.location,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 50 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${resumeData.personalInfo.phone} | ${resumeData.personalInfo.email}`,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 50 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `LinkedIn: ${resumeData.personalInfo.links.linkedin} | Portfolio: ${resumeData.personalInfo.links.portfolio}`,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
  );

  // Professional Summary
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "PROFESSIONAL SUMMARY",
          bold: true,
          size: 24,
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: "2563EB",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.summary,
        }),
      ],
      spacing: { after: 200 },
    }),
  );

  // Key Achievements
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "KEY ACHIEVEMENTS",
          bold: true,
          size: 24,
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: "2563EB",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
  );

  resumeData.keyAchievements.forEach((achievement) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `• ${achievement}`,
          }),
        ],
        spacing: { after: 100 },
        indent: { left: 360 },
      }),
    );
  });

  children.push(
    new Paragraph({
      text: "",
      spacing: { after: 100 },
    }),
  );

  // Technical Skills
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "TECHNICAL SKILLS",
          bold: true,
          size: 24,
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: "2563EB",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
  );

  Object.entries(resumeData.skills).forEach(([category, skills]) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${category}: `,
            bold: true,
          }),
          new TextRun({
            text: skills.join(" • "),
          }),
        ],
        spacing: { after: 100 },
      }),
    );
  });

  children.push(
    new Paragraph({
      text: "",
      spacing: { after: 100 },
    }),
  );

  // Professional Experience
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "PROFESSIONAL EXPERIENCE",
          bold: true,
          size: 24,
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: "2563EB",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
  );

  resumeData.experience.forEach((exp) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: exp.title,
            bold: true,
            size: 22,
          }),
        ],
        spacing: { before: 150, after: 50 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: exp.company,
            bold: true,
            color: "2563EB",
          }),
        ],
        spacing: { after: 50 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: exp.location,
          }),
        ],
        spacing: { after: 50 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: exp.period,
          }),
        ],
        spacing: { after: 100 },
      }),
    );

    exp.responsibilities.forEach((resp) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${resp}`,
            }),
          ],
          spacing: { after: 80 },
          indent: { left: 360 },
        }),
      );
    });
  });

  // Projects
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "NOTABLE PROJECTS",
          bold: true,
          size: 24,
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: "2563EB",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
  );

  resumeData.projects.forEach((project) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: project.name,
            bold: true,
          }),
          ...(project.description
            ? [
                new TextRun({
                  text: ` - ${project.description}`,
                  italics: true,
                  color: "2563EB",
                }),
              ]
            : []),
        ],
        spacing: { before: 150, after: 50 },
      }),
    );

    if (project.url) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `URL: ${project.url}`,
            }),
          ],
          spacing: { after: 50 },
        }),
      );
    }

    project.details.forEach((detail) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${detail}`,
            }),
          ],
          spacing: { after: 80 },
          indent: { left: 360 },
        }),
      );
    });
  });

  // Education
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "EDUCATION",
          bold: true,
          size: 24,
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: "2563EB",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.education.degree,
          bold: true,
          size: 22,
        }),
      ],
      spacing: { after: 50 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.education.school,
          bold: true,
          color: "2563EB",
        }),
      ],
      spacing: { after: 50 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${resumeData.education.location} | ${resumeData.education.period}`,
        }),
      ],
      spacing: { after: 50 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `GPA: ${resumeData.education.gpa}`,
        }),
      ],
      spacing: { after: 200 },
    }),
  );

  // Languages
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "LANGUAGES",
          bold: true,
          size: 24,
        }),
      ],
      spacing: { before: 200, after: 100 },
      border: {
        bottom: {
          color: "2563EB",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: Object.entries(resumeData.languages)
            .map(([lang, level]) => `${lang}: ${level}`)
            .join(" | "),
        }),
      ],
      spacing: { after: 100 },
    }),
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

async function generateDOCX(): Promise<void> {
  try {
    console.log("🚀 Generating DOCX resume...");

    const docBuffer = await buildResumeDOCX(resumeData as ResumeData);

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
