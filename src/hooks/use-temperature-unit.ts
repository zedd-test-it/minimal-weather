"use client";

import { useState, useEffect, useCallback } from "react";
import type { TemperatureUnit } from "@/types/weather";

const STORAGE_KEY = "weather-temp-unit";

export function useTemperatureUnit() {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as TemperatureUnit | null;
    if (stored === "celsius" || stored === "fahrenheit") {
      setUnit(stored);
    }
  }, []);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => {
      const next = prev === "celsius" ? "fahrenheit" : "celsius";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { unit, toggleUnit };
}
