import React from "react";

// ===== TECHNOLOGY KEYWORDS =====
// Programming Languages
export const programmingLanguages = ["TypeScript", "JavaScript", "PHP"];

// Frontend Technologies
export const frontendTechs = ["Next.js", "React.js", "React", "Vue.js", "Tailwind CSS", "HTML", "CSS", "SSR", "SSG"];

// Backend Technologies
export const backendTechs = ["Node.js", "Nest.js", "NestJS", "Express.js", "Laravel", "TypeORM"];

// Databases
export const databases = ["PostgreSQL", "TimescaleDB", "MongoDB", "MySQL", "Redis"];

// Real-time & IoT
export const realtimeIoT = ["MQTT", "AWS IoT Core", "IoT Core", "WebSockets", "Socket.io"];

// APIs
export const apiTechs = ["REST", "RESTful", "GraphQL", "API", "APIs"];

// DevOps & Cloud
export const devopsCloud = ["AWS", "EC2", "S3", "Lambda", "Docker", "GitHub Actions", "CI/CD", "Sentry"];

// Testing & Tools
export const testingTools = ["Jest", "Cypress", "Playwright", "Git"];

// Methodologies
export const methodologies = ["Agile", "Scrum"];

// Other Technologies
export const otherTechs = ["Stripe", "Flutter"];

// Combined tech keywords array
const techKeywords = [
  ...programmingLanguages,
  ...frontendTechs,
  ...backendTechs,
  ...databases,
  ...realtimeIoT,
  ...apiTechs,
  ...devopsCloud,
  ...testingTools,
  ...methodologies,
  ...otherTechs,
];

// ===== COMPANY NAMES =====
export const companyNames = [
  "Estia Software DMCC",
  "Estia Software",
  "Nordelco DMCC",
  "Nordelco",
  "Digital Real Marketing",
  "3 Miles",
  "Unifi Solutions",
  "Technical G",
  "Aspiraties",
  "We Media",
  "Arab International University",
];

// ===== PROJECT NAMES =====
export const projectNames = [
  "Envita",
  "Ecorize",
  "ASP School",
  "Beethere",
  "Al-Adham",
  "Bact",
  "Events Management System",
];

// ===== PATTERNS =====
// Numbers that typically represent experience/years/versions
const experiencePattern =
  /(\b(?:seven|Seven|7)\s*years?\b|\b\d+\+?\s*years?\b|\bv?\d+\.\d+(?:\.\d+)?\b|\b(?:May|June|July|August|September|October|November|December)\s+\d{4}\b)/gi;

// GPA and academic achievements
const academicPattern = /(\bGPA:?\s*\d+\.\d+\b|\b\d+\.\d+\s*out\s*of\s*\d+\.\d+\b)/gi;

// Build company/project pattern from arrays
const buildPattern = (items: string[]) => {
  const escaped = items.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");
};

const companyProjectPattern = buildPattern([...companyNames, ...projectNames]);

/**
 * Formats text by making important elements bold
 */
export function formatTextWithBold(text: string): React.ReactNode {
  if (!text) return text;

  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  const matches: Array<{ start: number; end: number; text: string }> = [];

  // Find all tech keywords
  techKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
      });
    }
  });

  // Find experience patterns
  let match;
  while ((match = experiencePattern.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
    });
  }

  // Find academic patterns
  experiencePattern.lastIndex = 0; // Reset regex
  while ((match = academicPattern.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
    });
  }

  // Find company/project patterns
  academicPattern.lastIndex = 0; // Reset regex
  while ((match = companyProjectPattern.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
    });
  }

  // Sort matches by start position and remove overlaps
  matches.sort((a, b) => a.start - b.start);
  const filteredMatches = [];
  let lastEnd = 0;

  for (const currentMatch of matches) {
    if (currentMatch.start >= lastEnd) {
      filteredMatches.push(currentMatch);
      lastEnd = currentMatch.end;
    }
  }

  // Build the result with bold formatting
  filteredMatches.forEach((match, index) => {
    // Add text before the match
    if (match.start > lastIndex) {
      result.push(text.slice(lastIndex, match.start));
    }

    // Add the bolded match
    result.push(
      <strong key={index} className="font-semibold">
        {match.text}
      </strong>
    );

    lastIndex = match.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  // Reset all regex lastIndex properties
  experiencePattern.lastIndex = 0;
  academicPattern.lastIndex = 0;
  companyProjectPattern.lastIndex = 0;

  return result.length > 0 ? result : text;
}

/**
 * Simple wrapper for JSX that handles arrays of text nodes
 */
export function FormattedText({ children }: { children: string }) {
  return <>{formatTextWithBold(children)}</>;
}
