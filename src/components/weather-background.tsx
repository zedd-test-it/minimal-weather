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
      {/* Subtle vignette overlay for depth + readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      <div className="relative z-10 text-shadow">{children}</div>
    </div>
  );
}
