"use client";

import { motion } from "framer-motion";
import type { CurrentWeather } from "@/types/weather";

interface WeatherDetailsProps {
  data: CurrentWeather;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const details = [
    { emoji: "💧", label: "습도", value: `${data.humidity}%` },
    { emoji: "💨", label: "바람", value: `${data.wind_speed.toFixed(1)} m/s` },
    { emoji: "🔵", label: "기압", value: `${data.pressure} hPa` },
    { emoji: "👁️", label: "가시거리", value: `${data.visibility.toFixed(1)} km` },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {details.map((d) => (
        <motion.div
          key={d.label}
          className="kakao-card p-4 text-center"
          variants={item}
        >
          <span className="text-2xl block mb-1">{d.emoji}</span>
          <p className="text-xs text-amber-700/60 dark:text-amber-300/60 mb-0.5">
            {d.label}
          </p>
          <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
            {d.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
