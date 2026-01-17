import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";

interface SkillsProps {
  skills: Record<string, string[]>;
}

const container = cva("space-y-5");

const categoryBase = cva("border-l-4 pl-4 sm:pl-5");

const badge = cva("px-3 py-1.5 text-xs sm:text-sm rounded-md border font-medium transition-transform hover:scale-105", {
  variants: {
    color: {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      green:
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      orange:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800",
      teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800",
      red: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
      indigo:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border-pink-200 dark:border-pink-800",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

const colorKeys = ["blue", "green", "purple", "orange", "teal", "red", "indigo", "pink"] as const;

export default function Skills({ skills }: SkillsProps) {
  const skillCategories = Object.entries(skills);

  return (
    <div className={container()}>
      {skillCategories.map(([category, skillList], index) => {
        const colorKey = colorKeys[index % colorKeys.length];
        return (
          <div key={category} className={categoryBase()}>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">{category}</h3>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {skillList.map((skill) => (
                <span key={skill} className={cn(badge({ color: colorKey }))} title={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
