"use client";

import { motion } from "framer-motion";
import type { CurrentWeather, HourlyForecast, WeatherCondition } from "@/types/weather";

interface WeatherInsightProps {
  current: CurrentWeather;
  hourly: HourlyForecast[];
}

interface Insight {
  emoji: string;
  text: string;
  priority: number;
}

export function WeatherInsight({ current, hourly }: WeatherInsightProps) {
  const insights = generateInsights(current, hourly);

  if (insights.length === 0) return null;

  return (
    <motion.div
      className="kakao-card p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h3 className="text-xs text-amber-700/60 dark:text-amber-300/60 font-bold mb-3">
        💡 오늘의 팁
      </h3>
      <div className="flex flex-col gap-2.5">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-2 rounded-xl bg-amber-50/50 dark:bg-amber-900/10"
          >
            <span className="text-lg shrink-0">{insight.emoji}</span>
            <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              {insight.text}
            </p>
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
  const feelsLike = current.feels_like;

  insights.push({
    emoji: "👕",
    text: getClothingRecommendation(feelsLike),
    priority: 1,
  });

  const rainConditions: WeatherCondition[] = ["Rain", "Drizzle", "Thunderstorm"];
  const willRain = hourly.some((h) => rainConditions.includes(h.condition));
  const isRainingNow = rainConditions.includes(current.condition);

  if (isRainingNow) {
    insights.push({ emoji: "☂️", text: "비가 오고 있어요! 우산 꼭 챙기세요~", priority: 2 });
  } else if (willRain) {
    insights.push({ emoji: "🌂", text: "잠시 후 비 올 수 있어요. 우산 챙기면 좋겠죠?", priority: 2 });
  }

  if (current.condition === "Snow") {
    insights.push({ emoji: "⛄", text: "눈이 오고 있어요! 미끄럼 조심~", priority: 2 });
  } else if (hourly.some((h) => h.condition === "Snow")) {
    insights.push({ emoji: "❄️", text: "곧 눈이 올 수 있어요. 따뜻하게 입으세요!", priority: 3 });
  }

  if (current.wind_speed >= 10) {
    insights.push({ emoji: "🌪️", text: `바람이 많이 불어요! (${current.wind_speed.toFixed(1)}m/s) 조심하세요~`, priority: 3 });
  } else if (current.wind_speed >= 5) {
    insights.push({ emoji: "🍃", text: "바람이 살랑살랑~ 겉옷 하나 챙기세요!", priority: 4 });
  }

  if (Math.abs(current.temp - feelsLike) >= 4) {
    insights.push({ emoji: "🤔", text: `체감 온도가 ${Math.round(feelsLike)}°C에요. 온도차 주의!`, priority: 3 });
  }

  if (current.condition === "Clear" && current.iconCode.endsWith("d") && current.temp >= 20) {
    insights.push({ emoji: "😎", text: "햇살이 강해요! 선크림 바르면 좋겠죠?", priority: 4 });
  }

  if (current.visibility < 2) {
    insights.push({ emoji: "🌁", text: `앞이 잘 안 보여요! (${current.visibility.toFixed(1)}km) 운전 조심~`, priority: 2 });
  }

  return insights
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4);
}

function getClothingRecommendation(feelsLike: number): string {
  if (feelsLike <= -10) return "🧊 진짜 추워요! 패딩, 목도리, 장갑 다 챙기세요~";
  if (feelsLike <= 0) return "🥶 많이 추워요! 두꺼운 외투에 히트텍 필수!";
  if (feelsLike <= 5) return "😣 쌀쌀해요~ 코트나 두꺼운 자켓 입으세요!";
  if (feelsLike <= 10) return "🧥 자켓이나 점퍼에 니트 매치하면 딱이에요!";
  if (feelsLike <= 15) return "🧶 가디건이나 얇은 자켓이면 충분해요~";
  if (feelsLike <= 20) return "👔 긴팔에 가벼운 겉옷 하나면 OK!";
  if (feelsLike <= 25) return "🙂 반팔에 얇은 긴팔 하나 걸치면 좋아요~";
  if (feelsLike <= 30) return "🩳 반팔, 반바지! 시원하게 입으세요!";
  return "🥵 너무 더워요! 얇은 옷에 물 많이 마시세요~";
}
