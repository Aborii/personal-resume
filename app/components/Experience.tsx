import React from "react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <div className="space-y-8">
      {experiences.map((exp) => (
        <div
          key={`${exp.company}-${exp.period}`}
          className={`border-l-4 pl-6 ${exp.current ? "border-green-500" : "border-gray-300 dark:border-gray-600"}`}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
              <p
                className={`text-lg font-medium ${
                  exp.current ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {exp.company}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{exp.location}</p>
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  exp.current
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                }`}
              >
                {exp.period}
              </span>
            </div>
          </div>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2 mt-4">
            {exp.responsibilities.map((responsibility, respIndex) => (
              <li key={respIndex} className="flex items-start">
                <span
                  className={`material-icons text-sm mr-2 mt-0.5 ${exp.current ? "text-green-500" : "text-gray-400"}`}
                >
                  arrow_right
                </span>
                {responsibility}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
