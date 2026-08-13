import React from "react";
import {
  programmingLanguages,
  frontendTechs,
  backendTechs,
  databases,
  realtimeIoT,
  apiTechs,
  devopsCloud,
  testingTools,
  methodologies,
  otherTechs,
  companyNames,
  projectNames,
} from "../../utils/textFormatter";

/**
 * Notebook flavor of FormattedText: metrics get a highlighter sweep,
 * tech keywords / companies / projects get heavier "pressed pen" ink.
 * Purely deterministic so it is SSR-safe.
 */

const KEYWORDS = [
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
  ...companyNames,
  ...projectNames,
]
  .slice()
  .sort((a, b) => b.length - a.length);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const KEYWORD_RE = new RegExp(`\\b(${KEYWORDS.map(escapeRe).join("|")})\\b`, "gi");

const METRIC_RE = new RegExp(
  [
    String.raw`\b\d+(?:\.\d+)?M\+(?:\s+daily)?(?:\s+time-series)?(?:\s+data\s+points?)?`,
    String.raw`\b\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?%`,
    String.raw`\b\d+(?:\.\d+)?%`,
    String.raw`\b\d+(?:\.\d+)?x\b`,
    String.raw`~\s?\d+\s*years?\b`,
    String.raw`\b\d+\+\s*(?:[A-Za-z-]+\s+)?(?:years?|engineers?|apps?|platforms?|projects?|sites?|users)\b`,
    String.raw`\bsub-second\b`,
    String.raw`\bzero-downtime\b`,
  ].join("|"),
  "gi",
);

const HL_CLASSES = ["", "nb-hl--g", "", "nb-hl--p", ""];

type Span = { start: number; end: number; kind: "metric" | "keyword" };

function collect(re: RegExp, text: string, kind: Span["kind"]): Span[] {
  const spans: Span[] = [];
  re.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    spans.push({ start: m.index, end: m.index + m[0].length, kind });
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  return spans;
}

export function formatNotebookText(text: string): React.ReactNode {
  if (!text) return text;

  const metrics = collect(METRIC_RE, text, "metric");
  const keywords = collect(KEYWORD_RE, text, "keyword");

  // metrics win over keywords; then drop any remaining overlaps left-to-right
  const all = [...metrics, ...keywords].sort(
    (a, b) => a.start - b.start || (a.kind === b.kind ? b.end - a.end : a.kind === "metric" ? -1 : 1),
  );
  const picked: Span[] = [];
  for (const span of all) {
    const clash = picked.some((p) => span.start < p.end && span.end > p.start);
    if (!clash) picked.push(span);
  }
  picked.sort((a, b) => a.start - b.start);

  const out: React.ReactNode[] = [];
  let cursor = 0;
  let hlIndex = 0;
  picked.forEach((span, i) => {
    if (span.start > cursor) out.push(text.slice(cursor, span.start));
    const chunk = text.slice(span.start, span.end);
    if (span.kind === "metric") {
      const colorClass = HL_CLASSES[hlIndex % HL_CLASSES.length];
      out.push(
        <mark
          key={i}
          className={`nb-hl ${colorClass}`.trim()}
          style={{ ["--hl-i" as string]: hlIndex } as React.CSSProperties}
        >
          {chunk}
        </mark>,
      );
      hlIndex++;
    } else {
      out.push(
        <strong key={i} className="nb-strong">
          {chunk}
        </strong>,
      );
    }
    cursor = span.end;
  });
  if (cursor < text.length) out.push(text.slice(cursor));

  return out;
}

export function NotebookText({ children }: { children: string }) {
  return <>{formatNotebookText(children)}</>;
}
