"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="bg-white/80 text-amber-800 text-lg px-2.5 py-1 rounded-full border-2 border-amber-300/50">
        ☀️
      </button>
    );
  }

  return (
    <button
      className="bg-white/80 dark:bg-amber-900/50 hover:bg-white dark:hover:bg-amber-900/70 text-lg px-2.5 py-1 rounded-full border-2 border-amber-300/50 dark:border-amber-600/30 transition-all active:scale-95"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`테마 전환: 현재 ${theme === "dark" ? "다크" : "라이트"} 모드`}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
