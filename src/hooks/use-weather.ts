"use client";

import { useState, useEffect } from "react";
import type { WeatherData, Location } from "@/types/weather";

interface UseWeatherResult {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

export function useWeather(location: Location | null): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) {
      setData(null);
      return;
    }

    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/weather?lat=${location!.lat}&lon=${location!.lon}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `HTTP ${res.status}`);
        }

        const weatherData = await res.json();
        setData({ ...weatherData, location });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(
            err instanceof Error ? err.message : "Failed to load weather"
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [location]);

  return { data, isLoading, error };
}
