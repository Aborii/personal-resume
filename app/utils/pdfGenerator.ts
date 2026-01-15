import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ResumeData {
  personalInfo: {
    name: string;
    location: string;
    phone: string;
    email: string;
    links: {
      linkedin: string;
      github: string;
      portfolio: string;
    };
  };
  summary: string;
  skills: Record<string, string[]>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    current: boolean;
    responsibilities: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    details: string[];
    url?: string;
  }>;
  education: {
    degree: string;
    school: string;
    location: string;
    period: string;
    gpa: string;
  };
  languages: Record<string, string>;
}

export const generateResumePDF = (resumeData: ResumeData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add section title
  const addSectionTitle = (title: string) => {
    checkPageBreak(15);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235); // Blue color
    doc.text(title, margin, yPosition);
    yPosition += 3;
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;
  };

  // Header Section
  doc.setFillColor(37, 99, 235); // Blue background
  doc.rect(0, 0, pageWidth, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(resumeData.personalInfo.name, pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(resumeData.personalInfo.location, pageWidth / 2, 28, { align: "center" });

  doc.setFontSize(9);
  const contactInfo = `${resumeData.personalInfo.phone} | ${resumeData.personalInfo.email}`;
  doc.text(contactInfo, pageWidth / 2, 35, { align: "center" });

  const linksInfo = `LinkedIn: ${resumeData.personalInfo.links.linkedin} | Portfolio: ${resumeData.personalInfo.links.portfolio}`;
  doc.text(linksInfo, pageWidth / 2, 40, { align: "center" });

  yPosition = 55;

  // Professional Summary
  addSectionTitle("PROFESSIONAL SUMMARY");
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  const summaryLines = doc.splitTextToSize(resumeData.summary, pageWidth - 2 * margin);
  doc.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * 5 + 5;

  // Technical Skills
  addSectionTitle("TECHNICAL SKILLS");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  Object.entries(resumeData.skills).forEach(([category, skills], index) => {
    checkPageBreak(10);

    // Category name in bold with better styling
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`${category}:`, margin, yPosition);

    // Skills list with bullets
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const skillsText = skills.join(" • ");
    const categoryWidth = doc.getTextWidth(`${category}: `);
    const skillsLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin - categoryWidth - 2);
    doc.text(skillsLines, margin + categoryWidth + 2, yPosition);
    yPosition += Math.max(5, skillsLines.length * 5);

    // Add small spacing between categories (except last one)
    if (index < Object.entries(resumeData.skills).length - 1) {
      yPosition += 2;
    }
  });

  yPosition += 5;

  // Professional Experience
  resumeData.experience.forEach((exp, index) => {
    // Calculate the total height needed for this experience block
    let blockHeight = 6 + 5 + 5 + 7; // title + company + location + period

    exp.responsibilities.forEach((resp) => {
      const respLines = doc.splitTextToSize(`• ${resp}`, pageWidth - 2 * margin - 5);
      blockHeight += respLines.length * 4.5;
    });

    if (index < resumeData.experience.length - 1) {
      blockHeight += 5; // spacing after block
    }

    // Add section title before first experience item
    if (index === 0) {
      // Check if section title + first block fits
      if (checkPageBreak(blockHeight + 15)) {
        // Page break occurred, add title on new page
        addSectionTitle("PROFESSIONAL EXPERIENCE");
      } else {
        // No page break, add title normally
        addSectionTitle("PROFESSIONAL EXPERIENCE");
      }
    } else {
      // Check if entire block fits, if not move to new page
      checkPageBreak(blockHeight);
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(exp.title, margin, yPosition);
    yPosition += 6;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.text(exp.company, margin, yPosition);
    yPosition += 5;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text(exp.location, margin, yPosition);
    yPosition += 5;

    doc.setTextColor(100, 100, 100);
    doc.text(exp.period, margin, yPosition);
    yPosition += 7;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    exp.responsibilities.forEach((resp) => {
      const respLines = doc.splitTextToSize(`• ${resp}`, pageWidth - 2 * margin - 5);
      doc.text(respLines, margin + 5, yPosition);
      yPosition += respLines.length * 4.5;
    });

    if (index < resumeData.experience.length - 1) {
      yPosition += 5;
    }
  });

  yPosition += 5;

  // Projects
  resumeData.projects.forEach((project, index) => {
    // Calculate the total height needed for this project block
    let blockHeight = 6; // project name + description line

    if (project.url) {
      blockHeight += 5; // URL line
    }

    project.details.forEach((detail) => {
      const detailLines = doc.splitTextToSize(`• ${detail}`, pageWidth - 2 * margin - 5);
      blockHeight += detailLines.length * 4.5;
    });

    if (index < resumeData.projects.length - 1) {
      blockHeight += 5; // spacing after block
    }

    // Add section title before first project item
    if (index === 0) {
      // Check if section title + first block fits
      if (checkPageBreak(blockHeight + 15)) {
        // Page break occurred, add title on new page
        addSectionTitle("NOTABLE PROJECTS");
      } else {
        // No page break, add title normally
        addSectionTitle("NOTABLE PROJECTS");
      }
    } else {
      // Check if entire block fits, if not move to new page
      checkPageBreak(blockHeight);
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(project.name, margin, yPosition);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(37, 99, 235);
    doc.text(`- ${project.description}`, margin + doc.getTextWidth(project.name) + 2, yPosition);
    yPosition += 6;

    if (project.url) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`URL: ${project.url}`, margin, yPosition);
      yPosition += 5;
    }

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    project.details.forEach((detail) => {
      const detailLines = doc.splitTextToSize(`• ${detail}`, pageWidth - 2 * margin - 5);
      doc.text(detailLines, margin + 5, yPosition);
      yPosition += detailLines.length * 4.5;
    });

    if (index < resumeData.projects.length - 1) {
      yPosition += 5;
    }
  });

  yPosition += 5;

  // Education
  addSectionTitle("EDUCATION");
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(resumeData.education.degree, margin, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235);
  doc.text(resumeData.education.school, margin, yPosition);
  yPosition += 5;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`${resumeData.education.location} | ${resumeData.education.period}`, margin, yPosition);
  yPosition += 5;

  doc.setTextColor(0, 0, 0);
  doc.text(`GPA: ${resumeData.education.gpa}`, margin, yPosition);
  yPosition += 10;

  // Languages
  addSectionTitle("LANGUAGES");
  const languagesText = Object.entries(resumeData.languages)
    .map(([lang, level]) => `${lang}: ${level}`)
    .join(" | ");
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(languagesText, margin, yPosition);

  // Footer
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Save the PDF
  const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume_${currentDate}.pdf`;
  doc.save(fileName);
};
