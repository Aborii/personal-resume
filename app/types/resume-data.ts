export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    links: {
      linkedin: string;
      github: string;
      portfolio: string;
    };
  };
  /** Lines and chips for the generated OG image; topSkills also stars those skills on the site. */
  og: {
    topSkills: string[];
    identityLine: string;
    experienceLine: string;
  };
  /** The About page's circled stats and its "these days" sentence. */
  about: {
    stats: Array<{ value: string; label: string }>;
    now: string;
  };
  summary: string;
  keyAchievements: string[];
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
    description?: string;
    details: string[];
    url?: string;
    /** Labelled links for a project with more than one home, e.g. app store listings. */
    links?: Array<{ label: string; url: string }>;
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
