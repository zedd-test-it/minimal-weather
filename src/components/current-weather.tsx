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
      className="glass-elevated rounded-3xl p-6 sm:p-8 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <p className="text-sm font-medium opacity-80 tracking-wide uppercase">
          {locationName}
        </p>

        <p className="text-xs opacity-60">
          {dateStr} {timeStr}
        </p>

        <WeatherIcon
          iconCode={data.iconCode}
          className="w-20 h-20 sm:w-24 sm:h-24 my-2"
          strokeWidth={1.5}
        />

        <p className="text-6xl sm:text-7xl font-light tracking-tight text-shadow-lg">
          {formatTemp(data.temp, unit)}
        </p>

        <p className="text-lg capitalize opacity-90">{data.description}</p>

        <div className="flex gap-4 text-sm opacity-75 mt-1">
          <span>체감 {formatTemp(data.feels_like, unit)}</span>
          <span>|</span>
          <span>
            최고 {formatTemp(data.temp_max, unit)} / 최저{" "}
            {formatTemp(data.temp_min, unit)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
