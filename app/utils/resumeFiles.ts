// The resume files the site serves as static files, so a visitor's download is never generated
// in their browser. The build writes fresh copies into out/ (postbuild); the committed copies in
// public/, written by `npm run g:resume`, are what `next dev` serves.

const SUFFIXES = {
  pdf: ".pdf",
  // same PDF, but it opens the print dialog by itself
  print: "_print.pdf",
  docx: ".docx",
  md: ".md",
} as const;

export type ResumeFileKind = keyof typeof SUFFIXES;

export const resumeFileName = (name: string, kind: ResumeFileKind): string =>
  `${name.replace(/\s+/g, "_")}_Resume${SUFFIXES[kind]}`;

export const resumeFileUrl = (name: string, kind: ResumeFileKind): string => `/${resumeFileName(name, kind)}`;

// Open the print copy in a new tab; the browser's PDF viewer shows its print dialog
export const openResumeForPrint = (name: string) => {
  const newWindow = window.open(resumeFileUrl(name, "print"), "_blank");
  if (!newWindow) {
    console.warn("Unable to open the print dialog. The popup may have been blocked by the browser.");
    alert("Unable to open the print dialog. Please allow popups for this site in your browser settings and try again.");
  }
};
