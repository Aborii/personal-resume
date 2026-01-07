import React from "react";
import { FormattedText } from "../utils/textFormatter";

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
    <div className="space-y-6 sm:space-y-8">
      {experiences.map((exp) => (
        <div
          key={`${exp.company}-${exp.period}`}
          className={`border-l-4 pl-4 sm:pl-6 ${
            exp.current ? "border-green-500" : "border-gray-300 dark:border-gray-600"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"><FormattedText>{exp.title}</FormattedText></h3>
              <p
                className={`text-base sm:text-lg font-medium ${
                  exp.current ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <FormattedText>{exp.company}</FormattedText>
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400"><FormattedText>{exp.location}</FormattedText></p>
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2 sm:mt-0 sm:ml-4">
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${
                  exp.current
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                }`}
              >
                <FormattedText>{exp.period}</FormattedText>
              </span>
            </div>
          </div>
          <ul className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-2 mt-3 sm:mt-4">
            {exp.responsibilities.map((responsibility, respIndex) => (
              <li key={respIndex} className="flex items-start">
                <span
                  className={`material-icons text-sm mr-2 mt-0.5 shrink-0 ${
                    exp.current ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  arrow_right
                </span>
                <span className="leading-relaxed"><FormattedText>{responsibility}</FormattedText></span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
