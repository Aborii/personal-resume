import resumeData from "../../data/resumeData.json";

export function generateMetadata(pageType: "home" | "resume", customTitle?: string, customDescription?: string) {
  const { personalInfo, summary, skills, experience } = resumeData;

  // Get current role for dynamic titles
  const currentRole = experience.find((exp) => exp.current) || experience[0];
  const roleTitle = currentRole?.title || "Software Engineer";

  const titles = {
    home: `${personalInfo.name} - Portfolio | ${roleTitle}`,
    resume: `${personalInfo.name} - Resume | ${roleTitle}`,
  };

  const descriptions = {
    home: `Portfolio of ${personalInfo.name}, a ${roleTitle} with nearly 7 years of experience. Explore my projects, skills, and professional experience.`,
    resume: summary,
  };

  const urls = {
    home: personalInfo.links.portfolio,
    resume: `${personalInfo.links.portfolio}/resume`,
  };

  const ogImages = {
    home: `/og-portfolio.png`,
    resume: "/og-resume.png",
  };

  const title = customTitle || titles[pageType];
  const description = customDescription || descriptions[pageType];

  return {
    title,
    description,
    keywords: [
      personalInfo.name,
      pageType === "home" ? "Portfolio" : "Resume",
      roleTitle,
      ...Object.values(skills).flat().slice(0, 8),
      personalInfo.location.split(",")[1]?.trim() || "UAE",
      personalInfo.location.split(",")[0]?.trim() || "Dubai",
    ],
    authors: [{ name: personalInfo.name, url: personalInfo.links.linkedin }],
    creator: personalInfo.name,
    openGraph: {
      title,
      description,
      url: urls[pageType],
      siteName: `${personalInfo.name} - Portfolio`,
      type: pageType === "home" ? "website" : "profile",
      locale: "en_US",
      images: [
        {
          url: ogImages[pageType],
          width: 1200,
          height: 630,
          alt: `${personalInfo.name} - ${pageType === "home" ? "Portfolio" : "Resume"}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.length > 160 ? description.slice(0, 160) + "..." : description,
      images: [ogImages[pageType]],
    },
  };
}

export function generatePageSpecificOGImageUrl(title: string, subtitle: string, description: string): string {
  const params = new URLSearchParams({
    title,
    subtitle,
    description,
  });
  return `/api/og?${params.toString()}`;
}
