import React from "react";

interface ProjectItem {
  name: string;
  description: string;
  details: string[];
  url?: string;
}

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div
          key={project.name}
          className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.name}</h3>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
                title={`Visit ${project.name}`}
              >
                <span className="material-icons text-lg">open_in_new</span>
              </a>
            )}
          </div>
          <p className="text-green-600 dark:text-green-400 font-medium mb-4">{project.description}</p>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            {project.details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">arrow_right</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
