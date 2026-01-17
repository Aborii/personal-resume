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
