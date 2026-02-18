"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getWeatherBackground, type WeatherCondition } from "@/types/weather";

interface WeatherBackgroundProps {
  condition?: WeatherCondition;
  iconCode?: string;
  children: React.ReactNode;
}

export function WeatherBackground({
  condition = "Clear",
  iconCode = "01d",
  children,
}: WeatherBackgroundProps) {
  const bgClass = getWeatherBackground(condition, iconCode);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={bgClass}
          className={`absolute inset-0 ${bgClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
      {/* Cute floating dots decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute w-32 h-32 rounded-full bg-white/30 -top-10 -left-10 blur-2xl" />
        <div className="absolute w-24 h-24 rounded-full bg-yellow-200/30 top-1/4 right-10 blur-2xl" />
        <div className="absolute w-20 h-20 rounded-full bg-white/20 bottom-1/4 left-1/4 blur-2xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
