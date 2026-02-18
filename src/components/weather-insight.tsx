"use client";

import { motion } from "framer-motion";
import {
  Shirt,
  Umbrella,
  Wind,
  Snowflake,
  Glasses,
  ThermometerSun,
  ShieldAlert,
} from "lucide-react";
import type { CurrentWeather, HourlyForecast, WeatherCondition } from "@/types/weather";

interface WeatherInsightProps {
  current: CurrentWeather;
  hourly: HourlyForecast[];
}

interface Insight {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  priority: number;
}

export function WeatherInsight({ current, hourly }: WeatherInsightProps) {
  const insights = generateInsights(current, hourly);

  if (insights.length === 0) return null;

  return (
    <motion.div
      className="glass rounded-2xl p-4 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h3 className="text-xs font-medium opacity-70 uppercase tracking-wide mb-3">
        오늘의 팁
      </h3>
      <div className="flex flex-col gap-2.5">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3">
            <insight.icon className="w-4 h-4 mt-0.5 shrink-0 opacity-80" />
            <p className="text-sm leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function generateInsights(
  current: CurrentWeather,
  hourly: HourlyForecast[]
): Insight[] {
  const insights: Insight[] = [];
  const temp = current.temp;
  const feelsLike = current.feels_like;

  // 옷차림 추천
  insights.push({
    icon: Shirt,
    text: getClothingRecommendation(feelsLike),
    priority: 1,
  });

  // 우산 필요 여부 (현재 + 앞으로 8시간)
  const rainConditions: WeatherCondition[] = ["Rain", "Drizzle", "Thunderstorm"];
  const willRain = hourly.some((h) => rainConditions.includes(h.condition));
  const isRainingNow = rainConditions.includes(current.condition);

  if (isRainingNow) {
    insights.push({
      icon: Umbrella,
      text: "현재 비가 오고 있어요. 우산을 꼭 챙기세요!",
      priority: 2,
    });
  } else if (willRain) {
    insights.push({
      icon: Umbrella,
      text: "잠시 후 비 소식이 있어요. 우산을 준비하세요.",
      priority: 2,
    });
  }

  // 눈
  const willSnow = hourly.some((h) => h.condition === "Snow");
  if (current.condition === "Snow") {
    insights.push({
      icon: Snowflake,
      text: "눈이 오고 있어요. 미끄럼에 주의하세요!",
      priority: 2,
    });
  } else if (willSnow) {
    insights.push({
      icon: Snowflake,
      text: "잠시 후 눈 소식이 있어요. 따뜻하게 입으세요.",
      priority: 3,
    });
  }

  // 강풍 주의
  if (current.wind_speed >= 10) {
    insights.push({
      icon: Wind,
      text: `바람이 강해요 (${current.wind_speed.toFixed(1)}m/s). 외출 시 주의하세요.`,
      priority: 3,
    });
  } else if (current.wind_speed >= 5) {
    insights.push({
      icon: Wind,
      text: "바람이 다소 불어요. 가벼운 겉옷을 챙기세요.",
      priority: 4,
    });
  }

  // 체감 vs 실제 온도 차이
  if (Math.abs(temp - feelsLike) >= 4) {
    insights.push({
      icon: ThermometerSun,
      text: `실제 온도와 체감 온도 차이가 커요. 체감 ${Math.round(feelsLike)}°C 기준으로 준비하세요.`,
      priority: 3,
    });
  }

  // 자외선 (맑은 낮)
  if (
    current.condition === "Clear" &&
    current.iconCode.endsWith("d") &&
    temp >= 20
  ) {
    insights.push({
      icon: Glasses,
      text: "햇살이 강해요. 선글라스와 자외선 차단제를 챙기세요.",
      priority: 4,
    });
  }

  // 가시거리 낮음
  if (current.visibility < 2) {
    insights.push({
      icon: ShieldAlert,
      text: `가시거리가 ${current.visibility.toFixed(1)}km로 낮아요. 운전 시 주의하세요.`,
      priority: 2,
    });
  }

  return insights
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4);
}

function getClothingRecommendation(feelsLike: number): string {
  if (feelsLike <= -10) return "패딩, 두꺼운 코트, 목도리, 장갑 필수! 최대한 따뜻하게 입으세요.";
  if (feelsLike <= 0) return "두꺼운 외투와 니트, 기모 제품을 입으세요. 목도리도 좋아요.";
  if (feelsLike <= 5) return "코트나 가죽자켓에 니트를 매치하세요. 히트텍 추천!";
  if (feelsLike <= 10) return "자켓이나 점퍼에 가벼운 니트면 적당해요.";
  if (feelsLike <= 15) return "가디건이나 얇은 자켓이면 충분해요.";
  if (feelsLike <= 20) return "긴팔 셔츠나 얇은 가디건이 딱 좋아요.";
  if (feelsLike <= 25) return "반팔에 얇은 긴팔 하나 걸치면 좋아요.";
  if (feelsLike <= 30) return "반팔, 반바지 등 시원한 옷차림을 추천해요.";
  return "얇고 통풍 잘 되는 옷을 입으세요. 수분 보충도 잊지 마세요!";
}
