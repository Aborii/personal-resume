import { FormattedText } from "../utils/textFormatter";

interface KeyAchievementsProps {
  achievements: string[];
}

export default function KeyAchievements({ achievements }: KeyAchievementsProps) {
  return (
    <div className="space-y-3">
      {achievements.map((achievement, index) => (
        <div key={index} className="flex gap-3 items-start">
          <div className="shrink-0 mt-1.5">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base text-justify flex-1">
            <FormattedText>{achievement}</FormattedText>
          </p>
        </div>
      ))}
    </div>
  );
}
