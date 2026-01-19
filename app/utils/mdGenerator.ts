import { saveAs } from "file-saver";
import type { ResumeData } from "../types/resume-data";

// Build the Markdown content
export const buildResumeMD = (resumeData: ResumeData): string => {
  const lines: string[] = [];

  // Header Section
  lines.push(`# ${resumeData.personalInfo.name}`);
  lines.push(`### ${resumeData.personalInfo.title}`);
  lines.push("");
  lines.push(`📍 ${resumeData.personalInfo.location}`);
  lines.push(`📞 ${resumeData.personalInfo.phone} | ✉️ ${resumeData.personalInfo.email}`);
  lines.push(
    `🔗 [LinkedIn](${resumeData.personalInfo.links.linkedin}) | [GitHub](${resumeData.personalInfo.links.github}) | [Portfolio](${resumeData.personalInfo.links.portfolio})`,
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  // Professional Summary
  lines.push("## Professional Summary");
  lines.push("");
  lines.push(resumeData.summary);
  lines.push("");
  lines.push("---");
  lines.push("");

  // Key Achievements
  lines.push("## Key Achievements");
  lines.push("");
  resumeData.keyAchievements.forEach((achievement) => {
    lines.push(`- ${achievement}`);
  });
  lines.push("");
  lines.push("---");
  lines.push("");

  // Technical Skills
  lines.push("## Technical Skills");
  lines.push("");
  Object.entries(resumeData.skills).forEach(([category, skills]) => {
    lines.push(`**${category}:** ${skills.join(" • ")}`);
    lines.push("");
  });
  lines.push("---");
  lines.push("");

  // Professional Experience
  lines.push("## Professional Experience");
  lines.push("");
  resumeData.experience.forEach((exp) => {
    lines.push(`### ${exp.title}`);
    lines.push(`**${exp.company}** | ${exp.location}`);
    lines.push(`*${exp.period}*`);
    lines.push("");
    exp.responsibilities.forEach((resp) => {
      lines.push(`- ${resp}`);
    });
    lines.push("");
  });
  lines.push("---");
  lines.push("");

  // Projects
  lines.push("## Notable Projects");
  lines.push("");
  resumeData.projects.forEach((project) => {
    if (project.description) {
      lines.push(`### ${project.name} - *${project.description}*`);
    } else {
      lines.push(`### ${project.name}`);
    }
    if (project.url) {
      lines.push(`🔗 [${project.url}](${project.url})`);
    }
    lines.push("");
    project.details.forEach((detail) => {
      lines.push(`- ${detail}`);
    });
    lines.push("");
  });
  lines.push("---");
  lines.push("");

  // Education
  lines.push("## Education");
  lines.push("");
  lines.push(`### ${resumeData.education.degree}`);
  lines.push(`**${resumeData.education.school}** | ${resumeData.education.location}`);
  lines.push(`*${resumeData.education.period}*`);
  lines.push(`GPA: ${resumeData.education.gpa}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // Languages
  lines.push("## Languages");
  lines.push("");
  Object.entries(resumeData.languages).forEach(([lang, level]) => {
    lines.push(`- **${lang}:** ${level}`);
  });
  lines.push("");

  return lines.join("\n");
};

// Generate and download MD for the app
export const generateResumeMD = (resumeData: ResumeData) => {
  const mdContent = buildResumeMD(resumeData);
  const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
  saveAs(blob, `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.md`);
};
