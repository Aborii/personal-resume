import { jsPDF } from "jspdf";
import type { ResumeData } from "../types/resume-data";

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
  ctx.doc.setFontSize(13);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(37, 99, 235);
  ctx.doc.text(title, ctx.margin, ctx.yPosition);
  ctx.yPosition += 2;
  ctx.doc.setDrawColor(37, 99, 235);
  ctx.doc.setLineWidth(0.5);
  ctx.doc.line(ctx.margin, ctx.yPosition, ctx.pageWidth - ctx.margin, ctx.yPosition);
  ctx.yPosition += 6;
};

// Render header section
const renderHeader = (ctx: PDFContext, personalInfo: ResumeData["personalInfo"]): void => {
  ctx.doc.setFillColor(37, 99, 235);
  ctx.doc.rect(0, 0, ctx.pageWidth, 50, "F");

  ctx.doc.setTextColor(255, 255, 255);
  ctx.doc.setFontSize(24);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.text(personalInfo.name, ctx.pageWidth / 2, 18, { align: "center" });

  ctx.doc.setFontSize(11);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.text(personalInfo.title, ctx.pageWidth / 2, 26, { align: "center" });

  ctx.doc.setFontSize(10);
  ctx.doc.text(personalInfo.location, ctx.pageWidth / 2, 33, { align: "center" });

  ctx.doc.setFontSize(9);
  const contactInfo = `${personalInfo.phone} | ${personalInfo.email}`;
  ctx.doc.text(contactInfo, ctx.pageWidth / 2, 40, { align: "center" });

  const linksInfo = `LinkedIn: ${personalInfo.links.linkedin} | GitHub: ${personalInfo.links.github} | Portfolio: ${personalInfo.links.portfolio}`;
  ctx.doc.text(linksInfo, ctx.pageWidth / 2, 46, { align: "center" });

  ctx.yPosition = 60;
};

// Render professional summary section
const renderSummary = (ctx: PDFContext, summary: string): void => {
  addSectionTitle(ctx, "PROFESSIONAL SUMMARY");
  ctx.doc.setFontSize(10);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(0, 0, 0);
  const summaryLines = ctx.doc.splitTextToSize(summary, ctx.pageWidth - 2 * ctx.margin);
  ctx.doc.text(summaryLines, ctx.margin, ctx.yPosition);
  ctx.yPosition += summaryLines.length * 4 + 3;
};

// Render key achievements section
const renderKeyAchievements = (ctx: PDFContext, keyAchievements: string[]): void => {
  addSectionTitle(ctx, "KEY ACHIEVEMENTS");
  ctx.doc.setFontSize(10);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(0, 0, 0);

  keyAchievements.forEach((achievement) => {
    checkPageBreak(ctx, 10);
    const achievementLines = ctx.doc.splitTextToSize(`• ${achievement}`, ctx.pageWidth - 2 * ctx.margin - 5);
    ctx.doc.text(achievementLines, ctx.margin + 5, ctx.yPosition);
    ctx.yPosition += achievementLines.length * 4.5 + 2.5;
  });

  ctx.yPosition += 3;
};

// Render technical skills section
const renderSkills = (ctx: PDFContext, skills: Record<string, string[]>): void => {
  addSectionTitle(ctx, "TECHNICAL SKILLS");

  ctx.doc.setFontSize(10);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(0, 0, 0);

  Object.entries(skills).forEach(([category, skillList], index) => {
    checkPageBreak(ctx, 10);

    // Category name in bold with blue color
    ctx.doc.setFontSize(11);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(37, 99, 235);
    ctx.doc.text(`${category}:`, ctx.margin, ctx.yPosition);

    // Get the width with current font settings
    const categoryWidth = ctx.doc.getTextWidth(`${category}:`);

    // Skills list with bullets
    ctx.doc.setFontSize(10);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(0, 0, 0);
    const skillsText = skillList.join(", ");
    const skillsLines = ctx.doc.splitTextToSize(skillsText, ctx.pageWidth - 2 * ctx.margin - categoryWidth - 2);
    ctx.doc.text(skillsLines, ctx.margin + categoryWidth + 2, ctx.yPosition);
    ctx.yPosition += Math.max(5, skillsLines.length * 4.5);

    // Add spacing between categories
    if (index < Object.entries(skills).length - 1) {
      ctx.yPosition += 2;
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
    ctx.doc.setFontSize(11);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(0, 0, 0);
    ctx.doc.text(exp.title, ctx.margin, ctx.yPosition);
    ctx.yPosition += 5;

    // Company name and period
    ctx.doc.setFontSize(10);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(37, 99, 235);
    ctx.doc.text(exp.company, ctx.margin, ctx.yPosition);

    const companyWidth = ctx.doc.getTextWidth(exp.company);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(100, 100, 100);
    ctx.doc.setFontSize(9);
    ctx.doc.text(` | ${exp.period}`, ctx.margin + companyWidth + 2, ctx.yPosition);
    ctx.yPosition += 4;

    // Location
    ctx.doc.setTextColor(100, 100, 100);
    ctx.doc.text(exp.location, ctx.margin, ctx.yPosition);
    ctx.yPosition += 5;

    // Responsibilities
    ctx.doc.setFontSize(9);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(0, 0, 0);

    exp.responsibilities.forEach((resp, respIndex) => {
      const respLines = ctx.doc.splitTextToSize(`• ${resp}`, ctx.pageWidth - 2 * ctx.margin - 5);
      ctx.doc.text(respLines, ctx.margin + 5, ctx.yPosition);
      ctx.yPosition += respLines.length * 4.2 + (respIndex < exp.responsibilities.length - 1 ? 1.5 : 0);
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
    ctx.doc.setFontSize(11);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(0, 0, 0);
    ctx.doc.text(project.name, ctx.margin, ctx.yPosition);

    if (project.url) {
      const nameWidth = ctx.doc.getTextWidth(project.name);
      ctx.doc.setFontSize(9);
      ctx.doc.setFont("helvetica", "normal");
      ctx.doc.setTextColor(100, 100, 100);
      ctx.doc.text(`(${project.url})`, ctx.margin + nameWidth + 3, ctx.yPosition);
    }
    ctx.yPosition += 5;

    // Description
    ctx.doc.setFontSize(10);
    ctx.doc.setFont("helvetica", "italic");
    ctx.doc.setTextColor(37, 99, 235);
    ctx.doc.text(project.description, ctx.margin, ctx.yPosition);
    ctx.yPosition += 5;

    // Details
    ctx.doc.setFontSize(9);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(0, 0, 0);

    project.details.forEach((detail) => {
      const detailLines = ctx.doc.splitTextToSize(`• ${detail}`, ctx.pageWidth - 2 * ctx.margin - 5);
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

  ctx.doc.setFontSize(11);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(0, 0, 0);
  ctx.doc.text(education.degree, ctx.margin, ctx.yPosition);
  ctx.yPosition += 5;

  ctx.doc.setFontSize(10);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(37, 99, 235);
  ctx.doc.text(education.school, ctx.margin, ctx.yPosition);
  ctx.yPosition += 4;

  ctx.doc.setFontSize(9);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(100, 100, 100);
  ctx.doc.text(`${education.location} | ${education.period}`, ctx.margin, ctx.yPosition);
  ctx.yPosition += 4;

  ctx.doc.setTextColor(0, 0, 0);
  ctx.doc.text(`GPA: ${education.gpa}`, ctx.margin, ctx.yPosition);
  ctx.yPosition += 7;
};

// Render languages section
const renderLanguages = (ctx: PDFContext, languages: Record<string, string>): void => {
  addSectionTitle(ctx, "LANGUAGES");

  const languagesText = Object.entries(languages)
    .map(([lang, level]) => `${lang}: ${level}`)
    .join(" | ");

  ctx.doc.setFontSize(10);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(0, 0, 0);
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

const buildResumePDF = (resumeData: ResumeData): jsPDF => {
  const doc = new jsPDF();
  const ctx: PDFContext = {
    doc,
    pageWidth: doc.internal.pageSize.getWidth(),
    pageHeight: doc.internal.pageSize.getHeight(),
    margin: 15,
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
