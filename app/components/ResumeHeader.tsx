import DownloadPDFButton from "./DownloadPDFButton";

interface HeaderProps {
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
    <div className="bg-linear-to-r from-slate-800 to-emerald-900 dark:from-gray-800 dark:to-green-900 text-white px-4 py-8 sm:px-6 md:px-8 lg:py-12">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">{personalInfo.name}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-2">{personalInfo.title}</p>
        </div>
        <div className="hidden sm:block">
          <DownloadPDFButton />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-gray-200 mb-4 sm:mb-6 text-sm sm:text-base">
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
      <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-sm sm:text-base">
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-200"
        >
          {icons.email}
          {personalInfo.email}
        </a>

        <a
          href={personalInfo.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-200"
        >
          {icons.linkedin}
          LinkedIn
        </a>

        <a
          href={personalInfo.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-200"
        >
          {icons.github}
          GitHub
        </a>
      </div>

      {/* Mobile Download Button */}
      <div className="sm:hidden mt-6 flex justify-center">
        <DownloadPDFButton />
      </div>
    </div>
  );
}
