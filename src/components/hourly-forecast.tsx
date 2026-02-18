"use client";

import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { WeatherIcon } from "@/components/weather-icon";
import { formatTemp, type TemperatureUnit, type HourlyForecast as HourlyData } from "@/types/weather";

interface HourlyForecastProps {
  data: HourlyData[];
  unit: TemperatureUnit;
}

export function HourlyForecast({ data, unit }: HourlyForecastProps) {
  return (
    <motion.div
      className="kakao-card p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xs text-amber-700/60 dark:text-amber-300/60 font-bold mb-3">
        ⏰ 시간별 예보
      </h3>
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {data.map((hour, i) => (
            <div
              key={hour.time}
              className="flex flex-col items-center gap-1 min-w-[60px] py-2 px-1 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              <span className="text-xs text-amber-700/60 dark:text-amber-300/60">
                {i === 0 ? "지금" : formatHour(hour.time)}
              </span>
              <WeatherIcon iconCode={hour.iconCode} size="sm" />
              <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                {formatTemp(hour.temp, unit)}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  );
}

function formatHour(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    hour12: true,
  });
}
