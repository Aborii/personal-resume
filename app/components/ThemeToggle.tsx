"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 rounded-full dark:bg-white/10 bg-gray-800 cursor-pointer hover:bg-gray-700 flex items-center dark:hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <span className="material-icons text-yellow-300">light_mode</span>
      ) : (
        <span className="material-icons text-gray-200">dark_mode</span>
      )}
    </button>
  );
}
