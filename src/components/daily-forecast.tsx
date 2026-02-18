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
      className="glass rounded-2xl p-4 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-xs font-medium opacity-70 uppercase tracking-wide mb-3">
        7일 예보
      </h3>
      <div className="flex flex-col divide-y divide-white/10">
        {data.map((day, i) => (
          <div
            key={day.date}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <span className="text-sm w-16">
              {i === 0 ? "오늘" : formatDay(day.date)}
            </span>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <WeatherIcon
                iconCode={day.iconCode}
                className="w-5 h-5"
                strokeWidth={1.5}
              />
              <span className="text-xs capitalize opacity-75 hidden sm:inline">
                {day.description}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="opacity-60 w-12 text-right">
                {formatTemp(day.temp_min, unit)}
              </span>
              <span className="font-medium w-12 text-right">
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
