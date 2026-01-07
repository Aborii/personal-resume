import ResumeHeader from "./components/ResumeHeader";
import Section from "./components/Section";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import { FormattedText } from "./utils/textFormatter";
import resumeData from "./../data/resumeData.json";

export default function Resume() {
  return (
    <div className="min-h-screen bg-linear-to-br to-green-100 via-emerald-200 from-teal-300 font-sans dark:from-green-900 dark:via-gray-900 dark:to-purple-900">
      <main className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 md:px-8 lg:py-16">
        <div className="bg-white dark:bg-gray-800 shadow-lg sm:shadow-2xl rounded-lg sm:rounded-2xl overflow-hidden">
          <ResumeHeader personalInfo={resumeData.personalInfo} />

          <div className="px-4 py-6 sm:px-6 md:p                      x-8 lg:py-8">
            {/* Summary Section */}
            <Section title="Professional Summary">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <FormattedText>{resumeData.summary}</FormattedText>
              </p>
            </Section>

            {/* Skills Section */}
            <Section title="Technical Skills">
              <Skills skills={resumeData.skills} />
            </Section>

            {/* Experience Section */}
            <Section title="Professional Experience">
              <Experience experiences={resumeData.experience} />
            </Section>

            {/* Projects Section */}
            <Section title="Notable Projects">
              <Projects projects={resumeData.projects} />
            </Section>

            {/* Education Section */}
            <Section title="Education">
              <div className="border-l-4 border-blue-500 pl-4 sm:pl-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  <FormattedText>{resumeData.education.degree}</FormattedText>
                </h3>
                <p className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-medium">
                  <FormattedText>{resumeData.education.school}</FormattedText>
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <FormattedText>{resumeData.education.location}</FormattedText>
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    <FormattedText>{resumeData.education.period}</FormattedText>
                  </span>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <FormattedText>{`GPA: ${resumeData.education.gpa}`}</FormattedText>
                  </span>
                </div>
              </div>
            </Section>

            {/* Languages Section */}
            <Section title="Languages">
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {Object.entries(resumeData.languages).map(([language, level]) => (
                  <span
                    key={language}
                    className="px-3 py-2 sm:px-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-lg font-medium text-sm sm:text-base"
                  >
                    {language}: {level}
                  </span>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">About</h2>
          <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4">
            <p>
              I&apos;m a passionate software developer with a love for creating innovative digital solutions. My
              expertise spans across modern web technologies, with a focus on building scalable and user-friendly
              applications.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source
              projects, or enjoying a good cup of coffee while planning my next project.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-green-200 dark:bg-green-900/30 border dark:border-0 border-green-800 text-green-800 dark:text-green-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Backend & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Git", "Docker", "AWS", "Nest.js"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-green-200 dark:bg-green-900/30 dark:border-0 text-green-800 border border-green-800 dark:text-green-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Abdullah Almofleh. Building the future, one line of code at a time.
          </p>
        </footer>
      </main>
    </div>
  );
}
