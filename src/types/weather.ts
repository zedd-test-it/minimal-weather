export interface Location {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  condition: WeatherCondition;
  description: string;
  iconCode: string;
  humidity: number;
  wind_speed: number;
  uvi: number;
  visibility: number;
  pressure: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  iconCode: string;
  condition: WeatherCondition;
}

export interface DailyForecast {
  date: string;
  temp_min: number;
  temp_max: number;
  condition: WeatherCondition;
  description: string;
  iconCode: string;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  timezone_offset: number;
}

export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Fog"
  | "Haze";

export type TemperatureUnit = "celsius" | "fahrenheit";

export interface SavedLocation extends Location {
  id: string;
}

export function getWeatherBackground(
  condition: WeatherCondition,
  iconCode: string
): string {
  const isNight = iconCode.endsWith("n");

  switch (condition) {
    case "Clear":
      return isNight ? "weather-bg-clear-night" : "weather-bg-clear-day";
    case "Clouds":
    case "Mist":
    case "Fog":
    case "Haze":
      return "weather-bg-cloudy";
    case "Rain":
    case "Drizzle":
      return "weather-bg-rain";
    case "Snow":
      return "weather-bg-snow";
    case "Thunderstorm":
      return "weather-bg-thunderstorm";
    default:
      return "weather-bg-clear-day";
  }
}

export function convertTemp(
  temp: number,
  unit: TemperatureUnit
): number {
  if (unit === "fahrenheit") {
    return Math.round(temp * 9 / 5 + 32);
  }
  return Math.round(temp);
}

export function formatTemp(
  temp: number,
  unit: TemperatureUnit
): string {
  const converted = convertTemp(temp, unit);
  return `${converted}°${unit === "celsius" ? "C" : "F"}`;
}
