"use client";

import { motion } from "framer-motion";
import { WeatherIcon } from "@/components/weather-icon";
import { useCurrentTime } from "@/hooks/use-current-time";
import { formatTemp, type TemperatureUnit, type CurrentWeather as CurrentWeatherData } from "@/types/weather";

interface CurrentWeatherProps {
  data: CurrentWeatherData;
  locationName: string;
  unit: TemperatureUnit;
}

export function CurrentWeather({ data, locationName, unit }: CurrentWeatherProps) {
  const now = useCurrentTime();

  const timeStr = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateStr = now.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <motion.div
      className="kakao-card-main p-6 sm:p-8"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="flex flex-col items-center text-center gap-1">
        <p className="text-sm text-amber-800/70 dark:text-amber-200/70">
          📍 {locationName}
        </p>
        <p className="text-xs text-amber-700/50 dark:text-amber-300/50">
          {dateStr} {timeStr}
        </p>

        <motion.div
          className="my-3"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <WeatherIcon iconCode={data.iconCode} size="xl" />
        </motion.div>

        <p className="text-5xl sm:text-6xl font-bold text-amber-900 dark:text-amber-100 tracking-tight">
          {formatTemp(data.temp, unit)}
        </p>

        <p className="text-lg text-amber-800 dark:text-amber-200 capitalize mt-1">
          {data.description}
        </p>

        <div className="flex gap-3 text-sm text-amber-700/70 dark:text-amber-300/70 mt-2">
          <span>🌡️ 체감 {formatTemp(data.feels_like, unit)}</span>
          <span className="text-amber-400">•</span>
          <span>
            ⬆️ {formatTemp(data.temp_max, unit)} ⬇️{" "}
            {formatTemp(data.temp_min, unit)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
