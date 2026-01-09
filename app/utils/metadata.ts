import resumeData from "../../data/resumeData.json";

export function generateMetadata(pageType: "home", customTitle?: string, customDescription?: string) {
  const { personalInfo, skills, experience } = resumeData;

  // Get current role for dynamic titles
  const currentRole = experience.find((exp) => exp.current) || experience[0];
  const roleTitle = currentRole?.title || "Software Engineer";

  const titles = {
    home: `${personalInfo.name} - Portfolio | ${roleTitle}`,
  };

  const descriptions = {
    home: `Portfolio of ${personalInfo.name}, a ${roleTitle} with nearly 7 years of experience. Explore my projects, skills, and professional experience.`,
  };

  const urls = {
    home: personalInfo.links.portfolio,
  };

  const ogImages = {
    home: `/og-main.png`,
  };

  const title = customTitle || titles[pageType];
  const description = customDescription || descriptions[pageType];

  return {
    title,
    description,
    keywords: [
      personalInfo.name,
      "Portfolio",
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
          alt: `${personalInfo.name} - Portfolio`,
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
