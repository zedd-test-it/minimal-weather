"use client";

import { motion } from "framer-motion";
import { WeatherIcon } from "@/components/weather-icon";
import {
  formatTemp,
  type TemperatureUnit,
  type DailyForecast as DailyData,
} from "@/types/weather";

interface DailyForecastProps {
  data: DailyData[];
  unit: TemperatureUnit;
}

export function DailyForecast({ data, unit }: DailyForecastProps) {
  return (
    <motion.div
      className="kakao-card p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-xs text-amber-700/60 dark:text-amber-300/60 font-bold mb-3">
        📅 주간 예보
      </h3>
      <div className="flex flex-col gap-1">
        {data.map((day, i) => (
          <div
            key={day.date}
            className="flex items-center justify-between py-2.5 px-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
          >
            <span className="text-sm text-amber-800 dark:text-amber-200 w-14">
              {i === 0 ? "오늘" : formatDay(day.date)}
            </span>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <WeatherIcon iconCode={day.iconCode} size="sm" />
              <span className="text-xs text-amber-700/60 dark:text-amber-300/60 capitalize hidden sm:inline">
                {day.description}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-amber-600/50 dark:text-amber-400/50 w-12 text-right">
                {formatTemp(day.temp_min, unit)}
              </span>
              <span className="font-bold text-amber-900 dark:text-amber-100 w-12 text-right">
                {formatTemp(day.temp_max, unit)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function formatDay(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("ko-KR", { weekday: "short" });
}
