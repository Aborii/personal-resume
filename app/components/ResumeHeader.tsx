interface HeaderProps {
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
}

const icons = {
  location: <span className="material-icons text-base">location_on</span>,
  phone: <span className="material-icons text-base">phone</span>,
  email: <span className="material-icons text-base">email</span>,
  linkedin: <span className="material-icons text-base">work</span>,
  github: <span className="material-icons text-base">code</span>,
  portfolio: <span className="material-icons text-base">public</span>,
};

export default function ResumeHeader({ personalInfo }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-800 dark:to-green-900 text-white px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">{personalInfo.name}</h1>
      <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
        <div className="flex items-center gap-2">
          {icons.location}
          {personalInfo.location}
        </div>
        <div className="flex items-center gap-2">
          {icons.phone}
          {personalInfo.phone}
        </div>
      </div>

      {/* Contact Links */}
      <div className="flex flex-wrap gap-6">
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          {icons.email}
          {personalInfo.email}
        </a>

        <a
          href={personalInfo.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          {icons.linkedin}
          LinkedIn
        </a>

        <a
          href={personalInfo.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          {icons.github}
          GitHub
        </a>

        <a
          href={personalInfo.links.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          {icons.portfolio}
          Portfolio
        </a>
      </div>
    </div>
  );
}
