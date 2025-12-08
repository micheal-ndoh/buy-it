"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Use resolvedTheme to avoid hydration mismatch
  const currentTheme = resolvedTheme || theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-white shadow-xl border-2 border-white dark:border-gray-800 hover:bg-red-700 dark:hover:bg-red-600 transition-all duration-300 hover:scale-110"
      aria-label="Toggle Theme"
    >
      {currentTheme === "dark" ? (
        <span className="material-symbols-outlined text-2xl text-yellow-300">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-2xl text-blue-900">dark_mode</span>
      )}
    </button>
  );
}
