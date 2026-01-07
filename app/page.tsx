import ResumeHeader from "./components/ResumeHeader";
import Section from "./components/Section";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import resumeData from "./../data/resumeData.json";

export default function Resume() {
  return (
    <div className="min-h-screen bg-linear-to-br to-green-100 via-emerald-200 from-teal-300 font-sans dark:from-green-900 dark:via-gray-900 dark:to-purple-900">
      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          <ResumeHeader personalInfo={resumeData.personalInfo} />

          <div className="px-8 py-8">
            {/* Summary Section */}
            <Section title="Professional Summary">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{resumeData.summary}</p>
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
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{resumeData.education.degree}</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{resumeData.education.school}</p>
                <p className="text-gray-600 dark:text-gray-400">{resumeData.education.location}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                    {resumeData.education.period}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">GPA: {resumeData.education.gpa}</span>
                </div>
              </div>
            </Section>

            {/* Languages Section */}
            <Section title="Languages">
              <div className="flex flex-wrap gap-4">
                {Object.entries(resumeData.languages).map(([language, level]) => (
                  <span
                    key={language}
                    className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-lg font-medium"
                  >
                    {language}: {level}
                  </span>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
}
