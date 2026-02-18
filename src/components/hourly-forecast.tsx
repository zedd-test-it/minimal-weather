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
      className="glass rounded-2xl p-4 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xs font-medium opacity-70 uppercase tracking-wide mb-3">
        시간별 예보
      </h3>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-2">
          {data.map((hour, i) => (
            <div
              key={hour.time}
              className="flex flex-col items-center gap-1.5 min-w-[56px]"
            >
              <span className="text-xs opacity-70">
                {i === 0 ? "지금" : formatHour(hour.time)}
              </span>
              <WeatherIcon
                iconCode={hour.iconCode}
                className="w-6 h-6"
                strokeWidth={1.5}
              />
              <span className="text-sm font-medium">
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
