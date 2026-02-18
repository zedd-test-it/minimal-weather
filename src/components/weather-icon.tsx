"use client";

interface WeatherIconProps {
  iconCode: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const emojiMap: Record<string, string> = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "⛅",
  "02n": "☁️",
  "03d": "☁️",
  "03n": "☁️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧️",
  "09n": "🌧️",
  "10d": "🌦️",
  "10n": "🌧️",
  "11d": "⛈️",
  "11n": "⛈️",
  "13d": "❄️",
  "13n": "❄️",
  "50d": "🌫️",
  "50n": "🌫️",
};

const sizeMap = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
  xl: "text-7xl sm:text-8xl",
};

export function WeatherIcon({
  iconCode,
  className = "",
  size = "md",
}: WeatherIconProps) {
  const emoji = emojiMap[iconCode] || "☁️";

  return (
    <span
      role="img"
      aria-label={`Weather: ${iconCode}`}
      className={`inline-block leading-none select-none ${sizeMap[size]} ${className}`}
      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
    >
      {emoji}
    </span>
  );
}
