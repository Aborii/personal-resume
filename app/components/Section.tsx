import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 border-b-2 border-green-500 pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}
