"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg dark:bg-white/10 bg-gray-800 cursor-pointer hover:bg-gray-700 flex items-center dark:hover:bg-white/20 transition-colors duration-200"
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
