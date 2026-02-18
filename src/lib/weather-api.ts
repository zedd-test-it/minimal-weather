import type {
  Location,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  WeatherCondition,
} from "@/types/weather";

const OWM_BASE = "https://api.openweathermap.org";

function getApiKey(): string {
  const key = process.env.OPENWEATHERMAP_API_KEY;
  if (!key || key === "your_api_key_here") {
    throw new Error("OPENWEATHERMAP_API_KEY is not configured");
  }
  return key;
}

export async function geocodeCity(query: string): Promise<Location[]> {
  if (!query || query.trim().length < 2) return [];

  const apiKey = getApiKey();
  const url = `${OWM_BASE}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    throw new Error(`Geocoding API error: ${res.status}`);
  }

  const data = await res.json();

  return data.map((item: Record<string, unknown>) => ({
    name: item.name as string,
    country: item.country as string,
    state: (item.state as string) || undefined,
    lat: item.lat as number,
    lon: item.lon as number,
  }));
}

// Free tier: /data/2.5/weather (current) + /data/2.5/forecast (5-day / 3-hour)
export async function fetchWeather(
  lat: number,
  lon: number
): Promise<{
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  timezone_offset: number;
}> {
  const apiKey = getApiKey();

  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `${OWM_BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${apiKey}`,
      { next: { revalidate: 1800 } }
    ),
    fetch(
      `${OWM_BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${apiKey}`,
      { next: { revalidate: 1800 } }
    ),
  ]);

  if (!currentRes.ok) {
    throw new Error(`Current Weather API error: ${currentRes.status}`);
  }
  if (!forecastRes.ok) {
    throw new Error(`Forecast API error: ${forecastRes.status}`);
  }

  const currentRaw = await currentRes.json();
  const forecastRaw = await forecastRes.json();

  return normalizeFreeApiResponse(currentRaw, forecastRaw);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalizeFreeApiResponse(
  currentRaw: any,
  forecastRaw: any
): {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  timezone_offset: number;
} {
  const weather = currentRaw.weather[0];

  const current: CurrentWeather = {
    temp: currentRaw.main.temp,
    feels_like: currentRaw.main.feels_like,
    temp_min: currentRaw.main.temp_min,
    temp_max: currentRaw.main.temp_max,
    condition: weather.main as WeatherCondition,
    description: weather.description,
    iconCode: weather.icon,
    humidity: currentRaw.main.humidity,
    wind_speed: currentRaw.wind.speed,
    uvi: 0,
    visibility: (currentRaw.visibility ?? 10000) / 1000,
    pressure: currentRaw.main.pressure,
  };

  // 5-day / 3-hour forecast → hourly (next 24h = 8 slots)
  const forecastList: any[] = forecastRaw.list ?? [];

  const hourly: HourlyForecast[] = forecastList.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toISOString(),
    temp: item.main.temp,
    iconCode: item.weather[0].icon,
    condition: item.weather[0].main as WeatherCondition,
  }));

  // Group by date to derive daily forecast
  const dailyMap = new Map<
    string,
    { temps: number[]; conditions: any[]; icons: string[] }
  >();

  for (const item of forecastList) {
    const dateKey = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, { temps: [], conditions: [], icons: [] });
    }
    const entry = dailyMap.get(dateKey)!;
    entry.temps.push(item.main.temp_min, item.main.temp_max);
    entry.conditions.push(item.weather[0]);
    entry.icons.push(item.weather[0].icon);
  }

  const daily: DailyForecast[] = Array.from(dailyMap.entries())
    .slice(0, 5)
    .map(([dateKey, entry]) => {
      const midIdx = Math.floor(entry.conditions.length / 2);
      const representativeWeather = entry.conditions[midIdx];
      const dayIcon =
        entry.icons.find((ic: string) => ic.endsWith("d")) ?? entry.icons[0];

      return {
        date: new Date(dateKey).toISOString(),
        temp_min: Math.min(...entry.temps),
        temp_max: Math.max(...entry.temps),
        condition: representativeWeather.main as WeatherCondition,
        description: representativeWeather.description,
        iconCode: dayIcon,
      };
    });

  return {
    current,
    hourly,
    daily,
    timezone_offset: currentRaw.timezone ?? 0,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
