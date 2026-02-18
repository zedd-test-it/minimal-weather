"use client";

import { motion } from "framer-motion";
import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import type { CurrentWeather } from "@/types/weather";

interface WeatherDetailsProps {
  data: CurrentWeather;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const details = [
    {
      label: "습도",
      value: `${data.humidity}%`,
      icon: Droplets,
    },
    {
      label: "풍속",
      value: `${data.wind_speed.toFixed(1)} m/s`,
      icon: Wind,
    },
    {
      label: "기압",
      value: `${data.pressure} hPa`,
      icon: Gauge,
    },
    {
      label: "가시거리",
      value: `${data.visibility.toFixed(1)} km`,
      icon: Eye,
    },
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
          className="glass rounded-2xl p-4 text-white"
          variants={item}
        >
          <div className="flex items-center gap-2 mb-2">
            <d.icon className="w-4 h-4 opacity-70" />
            <span className="text-xs font-medium opacity-70 uppercase tracking-wide">
              {d.label}
            </span>
          </div>
          <p className="text-xl font-semibold">{d.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

