import React from "react";

interface SkillsProps {
  skills: Record<string, string[]>;
}

const skillColors = [
  "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300",
  "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
  "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
];

export default function Skills({ skills }: SkillsProps) {
  const skillCategories = Object.entries(skills);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map(([category, skillList], index) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill) => (
              <span key={skill} className={`px-3 py-1 text-sm rounded-full ${skillColors[index % skillColors.length]}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
