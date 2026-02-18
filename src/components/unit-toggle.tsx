"use client";

import { Toggle } from "@/components/ui/toggle";
import type { TemperatureUnit } from "@/types/weather";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <Toggle
      pressed={unit === "fahrenheit"}
      onPressedChange={onToggle}
      className="text-white hover:bg-white/20 data-[state=on]:bg-white/20 text-sm font-medium px-3"
      aria-label={`온도 단위: ${unit === "celsius" ? "섭씨" : "화씨"}`}
    >
      °{unit === "celsius" ? "C" : "F"}
    </Toggle>
  );
}
