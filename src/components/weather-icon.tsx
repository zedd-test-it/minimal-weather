"use client";

import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  type LucideProps,
} from "lucide-react";

interface WeatherIconProps extends LucideProps {
  iconCode: string;
}

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  "01d": Sun,
  "01n": Moon,
  "02d": Cloud,
  "02n": Cloud,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudDrizzle,
  "09n": CloudDrizzle,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
};

export function WeatherIcon({ iconCode, ...props }: WeatherIconProps) {
  const Icon = iconMap[iconCode] || Cloud;
  return (
    <Icon
      aria-label={`Weather icon: ${iconCode}`}
      {...props}
    />
  );
}
