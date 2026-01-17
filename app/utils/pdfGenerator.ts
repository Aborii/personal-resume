import { jsPDF } from "jspdf";
import type { ResumeData } from "../types/resume-data";

// Colors
const COLORS = {
  headerBackground: { r: 5, g: 46, b: 22 }, // slate-800 to emerald-900 blend
  white: { r: 255, g: 255, b: 255 },
  gray200: { r: 229, g: 231, b: 235 },
  gray600: { r: 100, g: 100, b: 100 },
  gray700: { r: 55, g: 65, b: 81 },
  gray800: { r: 31, g: 41, b: 55 },
  gray900: { r: 17, g: 24, b: 39 },
  green500: { r: 5, g: 150, b: 105 },
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
  summaryLineHeight: { size: 10, lineHeight: 5.5 }, // Increased spacing for summary
} as const;

// Layout constants
const LAYOUT = {
  pageMargin: 14,
  initialYPosition: 15,
  headerHeight: 55,
  headerNameY: 18,
  headerTitleY: 26,
  headerLocationY: 33,
  headerContactY: 40,
  headerLinksY: 46,
  headerEndY: 65,
  sectionTitleUnderlineY: 2,
  sectionTitleUnderlineWidth: 0.8,
  sectionTitleBottomSpacing: 6,
  sectionTitleRequiredSpace: 12,
  bulletIndent: 5,
  categorySpacing: 2,
  skillMinLineHeight: 5,
  skillCategorySpacing: 1,
  experienceTitleSpacing: 5,
  experienceCompanySpacing: 4,
  experienceLocationSpacing: 5,
  experienceBlockSpacing: 3,
  experienceEndSpacing: 5,
  projectNameUrlSpacing: 3,
  projectNameSpacing: 5,
  projectDescriptionSpacing: 5,
  projectBlockSpacing: 3,
  projectEndSpacing: 5,
  educationDegreeSpacing: 5,
  educationSchoolSpacing: 4,
  educationLocationSpacing: 4,
  educationGpaSpacing: 7,
  achievementSpacing: 1,
  achievementEndSpacing: 3,
  summaryEndSpacing: 5,
  experienceHeightBase: 14, // 5 + 4 + 5
  projectHeightBase: 10,
  sectionTitleExtraSpace: 15,
} as const;

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
  checkPageBreak(ctx, LAYOUT.sectionTitleRequiredSpace);
  ctx.doc.setFontSize(TYPOGRAPHY.sectionTitle.size);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(COLORS.gray900.r, COLORS.gray900.g, COLORS.gray900.b);
  ctx.doc.text(title, ctx.margin, ctx.yPosition);
  ctx.yPosition += LAYOUT.sectionTitleUnderlineY;
  ctx.doc.setDrawColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
  ctx.doc.setLineWidth(LAYOUT.sectionTitleUnderlineWidth);
  ctx.doc.line(ctx.margin, ctx.yPosition, ctx.pageWidth - ctx.margin, ctx.yPosition);
  ctx.yPosition += LAYOUT.sectionTitleBottomSpacing;
};

// Render header section
const renderHeader = (ctx: PDFContext, personalInfo: ResumeData["personalInfo"]): void => {
  // Dark gradient background (slate-800 to emerald-900)
  ctx.doc.setFillColor(COLORS.headerBackground.r, COLORS.headerBackground.g, COLORS.headerBackground.b);
  ctx.doc.rect(0, 0, ctx.pageWidth, LAYOUT.headerHeight, "F");

  ctx.doc.setTextColor(COLORS.white.r, COLORS.white.g, COLORS.white.b);
  ctx.doc.setFontSize(TYPOGRAPHY.headerName.size);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.text(personalInfo.name, ctx.pageWidth / 2, LAYOUT.headerNameY, { align: "center" });

  ctx.doc.setFontSize(TYPOGRAPHY.headerTitle.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.text(personalInfo.title, ctx.pageWidth / 2, LAYOUT.headerTitleY, { align: "center" });

  ctx.doc.setFontSize(TYPOGRAPHY.headerInfo.size);
  ctx.doc.text(personalInfo.location, ctx.pageWidth / 2, LAYOUT.headerLocationY, { align: "center" });

  // Email and links
  ctx.doc.setFontSize(TYPOGRAPHY.headerContact.size);
  const contactInfo = `${personalInfo.phone} ${CHARS.pipe} ${personalInfo.email}`;
  ctx.doc.text(contactInfo, ctx.pageWidth / 2, LAYOUT.headerContactY, { align: "center" });

  const linksInfo = `LinkedIn: ${personalInfo.links.linkedin} ${CHARS.pipe} GitHub: ${personalInfo.links.github} ${CHARS.pipe} Portfolio: ${personalInfo.links.portfolio}`;
  ctx.doc.text(linksInfo, ctx.pageWidth / 2, LAYOUT.headerLinksY, { align: "center" });

  ctx.yPosition = LAYOUT.headerEndY;
};

// Render professional summary section
const renderSummary = (ctx: PDFContext, summary: string): void => {
  addSectionTitle(ctx, "PROFESSIONAL SUMMARY");
  ctx.doc.setFontSize(TYPOGRAPHY.summaryLineHeight.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
  const summaryLines = ctx.doc.splitTextToSize(summary, ctx.pageWidth - 2 * ctx.margin);

  // Render each line manually with increased spacing
  summaryLines.forEach((line: string) => {
    ctx.doc.text(line, ctx.margin, ctx.yPosition);
    ctx.yPosition += TYPOGRAPHY.summaryLineHeight.lineHeight;
  });

  ctx.yPosition += LAYOUT.summaryEndSpacing;
};

// Render key achievements section
const renderKeyAchievements = (ctx: PDFContext, keyAchievements: string[]): void => {
  addSectionTitle(ctx, "KEY ACHIEVEMENTS");
  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);

  keyAchievements.forEach((achievement) => {
    checkPageBreak(ctx, LAYOUT.projectHeightBase);
    const achievementLines = ctx.doc.splitTextToSize(
      `${CHARS.bullet} ${achievement}`,
      ctx.pageWidth - 2 * ctx.margin - LAYOUT.bulletIndent,
    );
    ctx.doc.text(achievementLines, ctx.margin + LAYOUT.bulletIndent, ctx.yPosition);
    ctx.yPosition += achievementLines.length * TYPOGRAPHY.bodyLarge.lineHeight + LAYOUT.achievementSpacing;
  });

  ctx.yPosition += LAYOUT.achievementEndSpacing;
};

// Render technical skills section
const renderSkills = (ctx: PDFContext, skills: Record<string, string[]>): void => {
  addSectionTitle(ctx, "TECHNICAL SKILLS");

  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);

  Object.entries(skills).forEach(([category, skillList], index) => {
    checkPageBreak(ctx, LAYOUT.projectHeightBase);

    // Category name in bold with green color
    ctx.doc.setFontSize(TYPOGRAPHY.subsectionTitle.size);
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
    ctx.doc.text(`${category}:`, ctx.margin, ctx.yPosition);

    // Get the width with current font settings
    const categoryWidth = ctx.doc.getTextWidth(`${category}:`);

    // Skills list - render on new line for single column layout
    ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
    const skillsText = skillList.join(", ");
    const skillsLines = ctx.doc.splitTextToSize(
      skillsText,
      ctx.pageWidth - 2 * ctx.margin - categoryWidth - LAYOUT.categorySpacing,
    );
    ctx.doc.text(skillsLines, ctx.margin + categoryWidth + LAYOUT.categorySpacing, ctx.yPosition);
    ctx.yPosition += Math.max(LAYOUT.skillMinLineHeight, skillsLines.length * TYPOGRAPHY.bodyLarge.lineHeight);

    // Add spacing between categories
    if (index < Object.entries(skills).length - 1) {
      ctx.yPosition += LAYOUT.skillCategorySpacing;
    }
  });

  ctx.yPosition += LAYOUT.achievementEndSpacing;
};

// Render professional experience section
const renderExperience = (ctx: PDFContext, experience: ResumeData["experience"]): void => {
  experience.forEach((exp, index) => {
    // Calculate block height
    let blockHeight = LAYOUT.experienceHeightBase;
    exp.responsibilities.forEach((resp) => {
      const respLines = ctx.doc.splitTextToSize(
        `${CHARS.bullet} ${resp}`,
        ctx.pageWidth - 2 * ctx.margin - LAYOUT.bulletIndent,
      );
      blockHeight += respLines.length * TYPOGRAPHY.bodySmall.lineHeight;
    });

    if (index < experience.length - 1) {
      blockHeight += LAYOUT.experienceBlockSpacing;
    }

    // Add section title before first experience
    if (index === 0) {
      if (checkPageBreak(ctx, blockHeight + LAYOUT.sectionTitleExtraSpace)) {
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
    ctx.doc.text(` ${CHARS.pipe} ${exp.period}`, ctx.margin + companyWidth + LAYOUT.categorySpacing, ctx.yPosition);
    ctx.yPosition += LAYOUT.experienceCompanySpacing;

    // Location
    ctx.doc.setTextColor(COLORS.gray600.r, COLORS.gray600.g, COLORS.gray600.b);
    ctx.doc.text(exp.location, ctx.margin, ctx.yPosition);
    ctx.yPosition += LAYOUT.experienceLocationSpacing;

    // Responsibilities
    ctx.doc.setFontSize(TYPOGRAPHY.bodySmall.size);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(COLORS.gray800.r, COLORS.gray800.g, COLORS.gray800.b);

    exp.responsibilities.forEach((resp) => {
      const respLines = ctx.doc.splitTextToSize(
        `${CHARS.bullet} ${resp}`,
        ctx.pageWidth - 2 * ctx.margin - LAYOUT.bulletIndent,
      );
      ctx.doc.text(respLines, ctx.margin + LAYOUT.bulletIndent, ctx.yPosition);
      ctx.yPosition += respLines.length * TYPOGRAPHY.bodySmall.lineHeight;
    });

    if (index < experience.length - 1) {
      ctx.yPosition += LAYOUT.experienceBlockSpacing;
    }
  });

  ctx.yPosition += LAYOUT.experienceEndSpacing;
};

// Render projects section
const renderProjects = (ctx: PDFContext, projects: ResumeData["projects"]): void => {
  projects.forEach((project, index) => {
    // Calculate block height
    let blockHeight = LAYOUT.projectHeightBase;
    project.details.forEach((detail) => {
      const detailLines = ctx.doc.splitTextToSize(
        `${CHARS.bullet} ${detail}`,
        ctx.pageWidth - 2 * ctx.margin - LAYOUT.bulletIndent,
      );
      blockHeight += detailLines.length * TYPOGRAPHY.bodySmall.lineHeight;
    });

    if (index < projects.length - 1) {
      blockHeight += LAYOUT.projectBlockSpacing;
    }

    // Add section title before first project
    if (index === 0) {
      if (checkPageBreak(ctx, blockHeight + LAYOUT.sectionTitleExtraSpace)) {
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
      ctx.doc.text(`(${project.url})`, ctx.margin + nameWidth + LAYOUT.projectNameUrlSpacing, ctx.yPosition);
    }
    ctx.yPosition += LAYOUT.projectNameSpacing;

    // Description
    ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
    ctx.doc.setFont("helvetica", "italic");
    ctx.doc.setTextColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
    ctx.doc.text(project.description, ctx.margin, ctx.yPosition);
    ctx.yPosition += LAYOUT.projectDescriptionSpacing;

    // Details
    ctx.doc.setFontSize(TYPOGRAPHY.bodySmall.size);
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(COLORS.gray800.r, COLORS.gray800.g, COLORS.gray800.b);

    project.details.forEach((detail) => {
      const detailLines = ctx.doc.splitTextToSize(
        `${CHARS.bullet} ${detail}`,
        ctx.pageWidth - 2 * ctx.margin - LAYOUT.bulletIndent,
      );
      ctx.doc.text(detailLines, ctx.margin + LAYOUT.bulletIndent, ctx.yPosition);
      ctx.yPosition += detailLines.length * TYPOGRAPHY.bodySmall.lineHeight;
    });

    if (index < projects.length - 1) {
      ctx.yPosition += LAYOUT.projectBlockSpacing;
    }
  });

  ctx.yPosition += LAYOUT.projectEndSpacing;
};

// Render education section
const renderEducation = (ctx: PDFContext, education: ResumeData["education"]): void => {
  addSectionTitle(ctx, "EDUCATION");

  ctx.doc.setFontSize(TYPOGRAPHY.subsectionTitle.size);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
  ctx.doc.text(education.degree, ctx.margin, ctx.yPosition);
  ctx.yPosition += LAYOUT.educationDegreeSpacing;

  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setTextColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
  ctx.doc.text(education.school, ctx.margin, ctx.yPosition);
  ctx.yPosition += LAYOUT.educationSchoolSpacing;

  ctx.doc.setFontSize(TYPOGRAPHY.bodySmall.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.gray600.r, COLORS.gray600.g, COLORS.gray600.b);
  ctx.doc.text(`${education.location} ${CHARS.pipe} ${education.period}`, ctx.margin, ctx.yPosition);
  ctx.yPosition += LAYOUT.educationLocationSpacing;

  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
  ctx.doc.text(`GPA: ${education.gpa}`, ctx.margin, ctx.yPosition);
  ctx.yPosition += LAYOUT.educationGpaSpacing;
};

// Render languages section
const renderLanguages = (ctx: PDFContext, languages: Record<string, string>): void => {
  addSectionTitle(ctx, "LANGUAGES");

  ctx.doc.setFontSize(TYPOGRAPHY.bodyNormal.size);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);

  Object.entries(languages).forEach(([lang, level], index) => {
    // Language name in bold
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setTextColor(COLORS.green500.r, COLORS.green500.g, COLORS.green500.b);
    ctx.doc.text(`${lang}:`, ctx.margin, ctx.yPosition);

    const langWidth = ctx.doc.getTextWidth(`${lang}:`);

    // Proficiency level
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b);
    ctx.doc.text(level, ctx.margin + langWidth + LAYOUT.categorySpacing, ctx.yPosition);

    if (index < Object.entries(languages).length - 1) {
      ctx.yPosition += LAYOUT.skillMinLineHeight;
    }
  });
};

const generateInfo = (
  resumeData: ResumeData,
): {
  fileName: string;
  title: string;
} => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleDateString("en-US", { month: "short" }).toLowerCase();
  const year = now.getFullYear();
  const fileDate = `${day}_${month}_${year}`;

  return {
    fileName: `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume_${fileDate}.pdf`,
    title: `Resume ${resumeData.personalInfo.name} - Generated on ${day} ${month}, ${year}`,
  };
};

// Render footer

export const buildResumePDF = (resumeData: ResumeData): jsPDF => {
  const doc = new jsPDF();
  const ctx: PDFContext = {
    doc,
    pageWidth: doc.internal.pageSize.getWidth(),
    pageHeight: doc.internal.pageSize.getHeight(),
    margin: LAYOUT.pageMargin,
    yPosition: LAYOUT.initialYPosition,
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
