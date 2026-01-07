import React from "react";

// Common technology keywords to bold
const techKeywords = [
  "JavaScript",
  "TypeScript",
  "PHP",
  "React",
  "Next.js",
  "Vue.js",
  "HTML",
  "CSS",
  "Node.js",
  "Nest.js",
  "Express.js",
  "Laravel",
  "REST",
  "GraphQL",
  "RESTful",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Docker",
  "AWS",
  "CI/CD",
  "Jest",
  "Cypress",
  "Agile",
  "Scrum",
  "SSR",
  "SSG",
  "API",
  "APIs",
  "Flutter",
  "React.js",
];

// Numbers that typically represent experience/years/versions
const experiencePattern =
  /(\b(?:seven|Seven|7)\s*years?\b|\b\d+\s*years?\b|\bv?\d+\.\d+(?:\.\d+)?\b|\b(?:May|June|July|August|September|October|November|December)\s+\d{4}\b)/gi;

// GPA and academic achievements
const academicPattern = /(\bGPA:?\s*\d+\.\d+\b|\b\d+\.\d+\s*out\s*of\s*\d+\.\d+\b)/gi;

// Company names and project names (specific important ones)
const companyProjectPattern =
  /\b(Envita|Ecorize|ASP School|Beethere|Al-Adham|Estia Software|Nordelco|Digital Real Marketing|3 Miles|Unifi Solutions|Technical G|Aspiraties|We Media|Arab International University)\b/gi;

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
