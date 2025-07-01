"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // SSR 중에는 기본 UI만 렌더링
  if (typeof window === "undefined") {
    return (
      <button
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="테마 전환"
      >
        <Moon className="w-5 h-5 text-text-primary" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === "light" ? "다크모드로 전환" : "라이트모드로 전환"}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-text-primary" />
      ) : (
        <Sun className="w-5 h-5 text-semantic-warning" />
      )}
    </button>
  );
}
