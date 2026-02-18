"use client";

import type { TemperatureUnit } from "@/types/weather";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="bg-white/80 dark:bg-amber-900/50 hover:bg-white dark:hover:bg-amber-900/70 text-amber-800 dark:text-amber-200 text-sm font-bold px-3 py-1.5 rounded-full border-2 border-amber-300/50 dark:border-amber-600/30 transition-all active:scale-95"
      aria-label={`온도 단위: ${unit === "celsius" ? "섭씨" : "화씨"}`}
    >
      °{unit === "celsius" ? "C" : "F"}
    </button>
  );
}
