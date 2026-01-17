import { jsPDF } from "jspdf";
import type { ResumeData } from "../types/resume-data";

// Colors
const COLORS = {
  headerBackground: { r: 30, g: 58, b: 69 }, // slate-800 to emerald-900 blend
  white: { r: 255, g: 255, b: 255 },
  gray200: { r: 229, g: 231, b: 235 },
  gray600: { r: 100, g: 100, b: 100 },
  gray700: { r: 55, g: 65, b: 81 },
  gray900: { r: 17, g: 24, b: 39 },
  green500: { r: 12, g: 148, b: 103 },
  black: { r: 0, g: 0, b: 0 },
};

// Special characters
const CHARS = {
  bullet: "•",
  pipe: "|",
};

// Font sizes and line heights
const TYPOGRAPHY = {
  headerName: { size: 24, lineHeight: 8 },
  headerTitle: { size: 11, lineHeight: 7 },
  headerInfo: { size: 10, lineHeight: 7 },
  headerContact: { size: 9, lineHeight: 6 },
  sectionTitle: { size: 14, lineHeight: 8 },
  subsectionTitle: { size: 11, lineHeight: 5 },
  bodyLarge: { size: 10, lineHeight: 4.5 },
  bodyNormal: { size: 10, lineHeight: 4 },
  bodySmall: { size: 9, lineHeight: 4.2 },
};

type PDFContext = {
  doc: jsPDF;
  pageWidth: number;
  pageHeight: number;
  margin: number;
  yPosition: number;
};

// Helper function to check and add page breaks
const checkPageBreak = (ctx: PDFContext, requiredSpace: number): boolean => {
  if (ctx.yPosition + requiredSpace > ctx.pageHeight - ctx.margin) {
    ctx.doc.addPage();
    ctx.yPosition = ctx.margin;
    return true;
  }
  return false;
};

// Helper function to add section title
const addSectionTitle = (ctx: PDFContext, title: string): void => {
  checkPageBreak(ctx, 12);
  ctx.doc.setFontSize(TYPOGRAPHY.sectionTitle.size);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(COLORS.gray900.r, COLORS.gray900.g, COLORS.gray900.b);
  ctx.doc.text(title, ctx.margin, ctx.yPosition);
  ctx.yPosition += 2;
  ctx.doc.setDrawColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
  ctx.doc.setLineWidth(0.8);
  ctx.doc.line(ctx.margin, ctx.yPosition, ctx.pageWidth - ctx.margin, ctx.yPosition);
  ctx.yPosition += 6;
};

// Render header section
const renderHeader = (ctx: PDFContext, personalInfo: ResumeData["personalInfo"]): void => {
  // Dark gradient background (slate-800 to emerald-900)
  ctx.doc.setFillColor(COLORS.headerBackground.r, COLORS.headerBackground.g, COLORS.headerBackground.b);
  ctx.doc.rect(0, 0, ctx.pageWidth, 55, "F");

  ctx.doc.setTextColor(COLORS.white.r, COLORS.white.g, COLORS.white.b);
  ctx.doc.setFontSize(TYPOGRAPHY.headerName.size);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.text(personalInfo.name, ctx.pageWidth / 2, 18, { align: "center" });

  ctx.doc.setFontSize(TYPOGRAPHY.headerTitle.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.text(personalInfo.title, ctx.pageWidth / 2, 26, { align: "center" });

  ctx.doc.setFontSize(TYPOGRAPHY.headerInfo.size);
  ctx.doc.text(personalInfo.location, ctx.pageWidth / 2, 33, { align: "center" });

  // Email and links
  ctx.doc.setFontSize(TYPOGRAPHY.headerContact.size);
  const contactInfo = `${personalInfo.phone} ${CHARS.pipe} ${personalInfo.email}`;
  ctx.doc.text(contactInfo, ctx.pageWidth / 2, 40, { align: "center" });

  const linksInfo = `LinkedIn: ${personalInfo.links.linkedin} ${CHARS.pipe} GitHub: ${personalInfo.links.github} ${CHARS.pipe} Portfolio: ${personalInfo.links.portfolio}`;
  ctx.doc.text(linksInfo, ctx.pageWidth / 2, 46, { align: "center" });

  ctx.yPosition = 65;
};

// Render professional summary section
const renderSummary = (ctx: PDFContext, summary: string): void => {
  addSectionTitle(ctx, "PROFESSIONAL SUMMARY");
  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.gray700.r, COLORS.gray700.g, COLORS.gray700.b);
  const summaryLines = ctx.doc.splitTextToSize(summary, ctx.pageWidth - 2 * ctx.margin);
  ctx.doc.text(summaryLines, ctx.margin, ctx.yPosition, { align: "justify", maxWidth: ctx.pageWidth - 2 * ctx.margin });
  ctx.yPosition += summaryLines.length * TYPOGRAPHY.bodyNormal.lineHeight;
  ctx.yPosition += 5;
};

// Render key achievements section
const renderKeyAchievements = (ctx: PDFContext, keyAchievements: string[]): void => {
  addSectionTitle(ctx, "KEY ACHIEVEMENTS");
  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);

  keyAchievements.forEach((achievement) => {
    checkPageBreak(ctx, 10);
    const achievementLines = ctx.doc.splitTextToSize(
      `${CHARS.bullet} ${achievement}`,
      ctx.pageWidth - 2 * ctx.margin - 5,
    );
    ctx.doc.text(achievementLines, ctx.margin + 5, ctx.yPosition);
    ctx.yPosition += achievementLines.length * TYPOGRAPHY.bodyLarge.lineHeight + 2.5;
  });

  ctx.yPosition += 3;
};

// Render technical skills section
const renderSkills = (ctx: PDFContext, skills: Record<string, string[]>): void => {
  addSectionTitle(ctx, "TECHNICAL SKILLS");

  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);

  Object.entries(skills).forEach(([category, skillList], index) => {
    checkPageBreak(ctx, 10);

    // Category name in bold with green color
    ctx.doc.setFontSize(TYPOGRAPHY.subsectionTitle.size);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
    ctx.doc.text(`${category}:`, ctx.margin, ctx.yPosition);

    // Get the width with current font settings
    const categoryWidth = ctx.doc.getTextWidth(`${category}:`);

    // Skills list
    ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
    const skillsText = skillList.join(", ");
    const skillsLines = ctx.doc.splitTextToSize(skillsText, ctx.pageWidth - 2 * ctx.margin - categoryWidth - 2);
    ctx.doc.text(skillsLines, ctx.margin + categoryWidth + 2, ctx.yPosition);
    ctx.yPosition += Math.max(5, skillsLines.length * TYPOGRAPHY.bodyLarge.lineHeight);

    // Add spacing between categories
    if (index < Object.entries(skills).length - 1) {
      ctx.yPosition += 1;
    }
  });

  ctx.yPosition += 3;
};

// Render professional experience section
const renderExperience = (ctx: PDFContext, experience: ResumeData["experience"]): void => {
  experience.forEach((exp, index) => {
    // Calculate block height
    let blockHeight = 5 + 4 + 5;
    exp.responsibilities.forEach((resp) => {
      const respLines = ctx.doc.splitTextToSize(`• ${resp}`, ctx.pageWidth - 2 * ctx.margin - 5);
      blockHeight += respLines.length * 4.2 + 1.5;
    });

    if (index < experience.length - 1) {
      blockHeight += 3;
    }

    // Add section title before first experience
    if (index === 0) {
      if (checkPageBreak(ctx, blockHeight + 15)) {
        addSectionTitle(ctx, "PROFESSIONAL EXPERIENCE");
      } else {
        addSectionTitle(ctx, "PROFESSIONAL EXPERIENCE");
      }
    } else {
      checkPageBreak(ctx, blockHeight);
    }

    // Job title
    ctx.doc.setFontSize(TYPOGRAPHY.subsectionTitle.size);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
    ctx.doc.text(exp.title, ctx.margin, ctx.yPosition);
    ctx.yPosition += TYPOGRAPHY.subsectionTitle.lineHeight;

    // Company name and period
    ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
    ctx.doc.text(exp.company, ctx.margin, ctx.yPosition);

    const companyWidth = ctx.doc.getTextWidth(exp.company);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(COLORS.gray600.r, COLORS.gray600.g, COLORS.gray600.b);
    ctx.doc.setFontSize(TYPOGRAPHY.bodySmall.size);
    ctx.doc.text(` ${CHARS.pipe} ${exp.period}`, ctx.margin + companyWidth + 2, ctx.yPosition);
    ctx.yPosition += 4;

    // Location
    ctx.doc.setTextColor(COLORS.gray600.r, COLORS.gray600.g, COLORS.gray600.b);
    ctx.doc.text(exp.location, ctx.margin, ctx.yPosition);
    ctx.yPosition += 5;

    // Responsibilities
    ctx.doc.setFontSize(TYPOGRAPHY.bodySmall.size);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);

    exp.responsibilities.forEach((resp, respIndex) => {
      const respLines = ctx.doc.splitTextToSize(`${CHARS.bullet} ${resp}`, ctx.pageWidth - 2 * ctx.margin - 5);
      ctx.doc.text(respLines, ctx.margin + 5, ctx.yPosition);
      ctx.yPosition +=
        respLines.length * TYPOGRAPHY.bodySmall.lineHeight + (respIndex < exp.responsibilities.length - 1 ? 1.5 : 0);
    });

    if (index < experience.length - 1) {
      ctx.yPosition += 3;
    }
  });

  ctx.yPosition += 5;
};

// Render projects section
const renderProjects = (ctx: PDFContext, projects: ResumeData["projects"]): void => {
  projects.forEach((project, index) => {
    // Calculate block height
    let blockHeight = 10;
    project.details.forEach((detail) => {
      const detailLines = ctx.doc.splitTextToSize(`• ${detail}`, ctx.pageWidth - 2 * ctx.margin - 5);
      blockHeight += detailLines.length * 3.8;
    });

    if (index < projects.length - 1) {
      blockHeight += 3;
    }

    // Add section title before first project
    if (index === 0) {
      if (checkPageBreak(ctx, blockHeight + 15)) {
        addSectionTitle(ctx, "NOTABLE PROJECTS");
      } else {
        addSectionTitle(ctx, "NOTABLE PROJECTS");
      }
    } else {
      checkPageBreak(ctx, blockHeight);
    }

    // Project name and URL
    ctx.doc.setFontSize(TYPOGRAPHY.subsectionTitle.size);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
    ctx.doc.text(project.name, ctx.margin, ctx.yPosition);

    if (project.url) {
      const nameWidth = ctx.doc.getTextWidth(project.name);
      ctx.doc.setFontSize(TYPOGRAPHY.bodySmall.size);
      ctx.doc.setFont("helvetica", "normal");
      ctx.doc.setTextColor(COLORS.gray600.r, COLORS.gray600.g, COLORS.gray600.b);
      ctx.doc.text(`(${project.url})`, ctx.margin + nameWidth + 3, ctx.yPosition);
    }
    ctx.yPosition += 5;

    // Description
    ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
    ctx.doc.setFont("helvetica", "italic");
    ctx.doc.setTextColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
    ctx.doc.text(project.description, ctx.margin, ctx.yPosition);
    ctx.yPosition += 5;

    // Details
    ctx.doc.setFontSize(TYPOGRAPHY.bodySmall.size);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);

    project.details.forEach((detail) => {
      const detailLines = ctx.doc.splitTextToSize(`${CHARS.bullet} ${detail}`, ctx.pageWidth - 2 * ctx.margin - 5);
      ctx.doc.text(detailLines, ctx.margin + 5, ctx.yPosition);
      ctx.yPosition += detailLines.length * 3.8;
    });

    if (index < projects.length - 1) {
      ctx.yPosition += 3;
    }
  });

  ctx.yPosition += 5;
};

// Render education section
const renderEducation = (ctx: PDFContext, education: ResumeData["education"]): void => {
  addSectionTitle(ctx, "EDUCATION");

  ctx.doc.setFontSize(TYPOGRAPHY.subsectionTitle.size);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
  ctx.doc.text(education.degree, ctx.margin, ctx.yPosition);
  ctx.yPosition += 5;

  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
  ctx.doc.text(education.school, ctx.margin, ctx.yPosition);
  ctx.yPosition += 4;

  ctx.doc.setFontSize(TYPOGRAPHY.bodySmall.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.gray600.r, COLORS.gray600.g, COLORS.gray600.b);
  ctx.doc.text(`${education.location} ${CHARS.pipe} ${education.period}`, ctx.margin, ctx.yPosition);
  ctx.yPosition += 4;

  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
  ctx.doc.text(`GPA: ${education.gpa}`, ctx.margin, ctx.yPosition);
  ctx.yPosition += 7;
};

// Render languages section
const renderLanguages = (ctx: PDFContext, languages: Record<string, string>): void => {
  addSectionTitle(ctx, "LANGUAGES");

  const languagesText = Object.entries(languages)
    .map(([lang, level]) => `${lang}: ${level}`)
    .join(` ${CHARS.pipe} `);

  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
  ctx.doc.text(languagesText, ctx.margin, ctx.yPosition);
};

const generateInfo = (
  resumeData: ResumeData,
): {
  fileName: string;
  title: string;
} => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    fileName: `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume_${currentDate}.pdf`,
    title: `Resume ${resumeData.personalInfo.name}`,
  };
};

// Render footer

export const buildResumePDF = (resumeData: ResumeData): jsPDF => {
  const doc = new jsPDF();
  const ctx: PDFContext = {
    doc,
    pageWidth: doc.internal.pageSize.getWidth(),
    pageHeight: doc.internal.pageSize.getHeight(),
    margin: 14,
    yPosition: 15,
  };

  // Render all sections
  renderHeader(ctx, resumeData.personalInfo);
  renderSummary(ctx, resumeData.summary);
  renderKeyAchievements(ctx, resumeData.keyAchievements);
  renderSkills(ctx, resumeData.skills);
  renderExperience(ctx, resumeData.experience);
  renderProjects(ctx, resumeData.projects);
  renderEducation(ctx, resumeData.education);
  renderLanguages(ctx, resumeData.languages);

  const fileInfo = generateInfo(resumeData);

  doc.setProperties({
    title: fileInfo.title,
    author: resumeData.personalInfo.name,
    subject: fileInfo.title,
    keywords: "resume, pdf",
  });

  return doc;
};

export const generateResumePDF = (resumeData: ResumeData) => {
  const doc = buildResumePDF(resumeData);

  const fileInfo = generateInfo(resumeData);
  doc.save(fileInfo.fileName);
};

// Function to generate and print PDF
export const generateResumePDFForPrint = (resumeData: ResumeData) => {
  const doc = buildResumePDF(resumeData);

  // Open print dialog with the PDF
  doc.autoPrint();

  const newWindow = window.open(doc.output("bloburl"), "_blank");
  if (!newWindow) return;
};
