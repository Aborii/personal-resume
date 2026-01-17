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

export default function ResumeHeader({ personalInfo }: HeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-6 sm:px-6 md:px-8 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-end mb-4">
        <div className="hidden sm:block">
          <DownloadPDFButton />
        </div>
      </div>

      {/* Centered Name */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-3">
        {personalInfo.name}
      </h1>

      {/* Centered Title with muted color */}
      <p className="text-base sm:text-lg md:text-xl text-[#2F4F4F] dark:text-[#4A7C7C] text-center mb-4 font-medium">
        {personalInfo.title}
      </p>

      {/* Compressed Contact Info - Line 1 */}
      <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 text-center mb-2">
        {personalInfo.location} | {personalInfo.phone} | {personalInfo.email}
      </div>

      {/* Links - Line 2 */}
      <div className="text-sm sm:text-base text-center flex flex-wrap justify-center gap-x-3">
        <a
          href={personalInfo.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0A66C2] hover:text-[#004182] dark:text-[#4A9EFF] dark:hover:text-[#6BB3FF] transition-colors duration-200"
        >
          LinkedIn
        </a>
        <span className="text-gray-400">|</span>
        <a
          href={personalInfo.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0A66C2] hover:text-[#004182] dark:text-[#4A9EFF] dark:hover:text-[#6BB3FF] transition-colors duration-200"
        >
          GitHub
        </a>
        <span className="text-gray-400">|</span>
        <a
          href={personalInfo.links.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0A66C2] hover:text-[#004182] dark:text-[#4A9EFF] dark:hover:text-[#6BB3FF] transition-colors duration-200"
        >
          Portfolio
        </a>
      </div>

      {/* Mobile Download Button */}
      <div className="sm:hidden mt-6 flex justify-center">
        <DownloadPDFButton />
      </div>
    </div>
  );
}
