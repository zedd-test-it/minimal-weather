"use client";

import { useEffect, useRef } from "react";
import { CloudSun, MapPin, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { WeatherBackground } from "@/components/weather-background";
import { CurrentWeather } from "@/components/current-weather";
import { WeatherInsight } from "@/components/weather-insight";
import { WeatherDetails } from "@/components/weather-details";
import { HourlyForecast } from "@/components/hourly-forecast";
import { DailyForecast } from "@/components/daily-forecast";
import { DailyInspiration } from "@/components/daily-inspiration";
import { WeatherSkeleton } from "@/components/weather-skeleton";
import { LocationSearch } from "@/components/location-search";
import { LocationTabs } from "@/components/location-tabs";
import { UnitToggle } from "@/components/unit-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSavedLocations } from "@/hooks/use-saved-locations";
import { useTemperatureUnit } from "@/hooks/use-temperature-unit";
import { useWeather } from "@/hooks/use-weather";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useCurrentTime } from "@/hooks/use-current-time";

export default function Home() {
  const {
    locations,
    activeId,
    activeLocation,
    setActiveId,
    addLocation,
    removeLocation,
    isLoaded,
  } = useSavedLocations();

  const { unit, toggleUnit } = useTemperatureUnit();

  const shouldGeolocate = isLoaded && locations.length === 0;
  const geo = useGeolocation(shouldGeolocate);
  const geoAdded = useRef(false);

  useEffect(() => {
    if (geo.location && !geoAdded.current && locations.length === 0) {
      geoAdded.current = true;
      addLocation(geo.location);
    }
  }, [geo.location, locations.length, addLocation]);

  const { data, isLoading, error } = useWeather(activeLocation);

  if (!isLoaded) {
    return (
      <WeatherBackground>
        <div className="min-h-screen flex items-center justify-center">
          <WeatherSkeleton />
        </div>
      </WeatherBackground>
    );
  }

  const showGeoLoading = shouldGeolocate && geo.isLoading && !activeLocation;

  return (
    <WeatherBackground
      condition={data?.current.condition}
      iconCode={data?.current.iconCode}
    >
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
          <div className="flex items-center gap-2 min-w-0">
            <LocationSearch onSelect={addLocation} />
            <div className="min-w-0 overflow-x-auto no-scrollbar">
              <LocationTabs
                locations={locations}
                activeId={activeId}
                onSelect={setActiveId}
                onRemove={removeLocation}
              />
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <UnitToggle unit={unit} onToggle={toggleUnit} />
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 flex items-start justify-center px-4 py-4 sm:px-6 sm:py-6">
          <AnimatePresence mode="wait">
            {showGeoLoading ? (
              <GeoLoadingState key="geo-loading" />
            ) : !activeLocation ? (
              <motion.div
                key="empty"
                className="flex-1 flex items-center justify-center min-h-[70vh]"
              >
                <EmptyState geoError={geo.error} />
              </motion.div>
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-md mx-auto"
              >
                <WeatherSkeleton />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                className="flex-1 flex items-center justify-center min-h-[70vh]"
              >
                <ErrorState message={error} />
              </motion.div>
            ) : data ? (
              <motion.div
                key={`weather-${activeId}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md mx-auto flex flex-col gap-4 pb-8"
              >
                <CurrentWeather
                  data={data.current}
                  locationName={`${data.location.name}, ${data.location.country}`}
                  unit={unit}
                />
                <WeatherInsight
                  current={data.current}
                  hourly={data.hourly}
                />
                <WeatherDetails data={data.current} />
                <HourlyForecast data={data.hourly} unit={unit} />
                <DailyForecast data={data.daily} unit={unit} />
                <DailyInspiration />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="text-center py-3 text-white/30 text-xs">
          Minimal Weather
        </footer>
      </div>
    </WeatherBackground>
  );
}

function GeoLoadingState() {
  return (
    <motion.div
      className="flex-1 flex items-center justify-center min-h-[70vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-4 text-white text-center">
        <Loader2 className="w-10 h-10 animate-spin opacity-60" />
        <div className="space-y-1">
          <p className="text-sm font-medium">현재 위치를 확인하고 있습니다</p>
          <p className="text-xs opacity-60">위치 접근을 허용해주세요</p>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ geoError }: { geoError?: string | null }) {
  const now = useCurrentTime();

  const timeStr = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateStr = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <motion.div
      className="flex flex-col items-center gap-6 text-white text-center px-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="glass rounded-full p-6">
        <CloudSun className="w-16 h-16 opacity-80" strokeWidth={1.2} />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Minimal Weather
        </h1>
        <p className="text-lg opacity-80">{timeStr}</p>
        <p className="text-xs opacity-50">{dateStr}</p>
      </div>

      {geoError && (
        <div className="glass rounded-xl px-4 py-3 text-xs opacity-70 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{geoError} — 도시를 직접 검색해주세요</span>
        </div>
      )}

      <p className="text-sm opacity-60 max-w-[260px] leading-relaxed">
        도시를 검색하여 날씨와 오늘의 옷차림 추천을 확인하세요
      </p>

      <div className="glass rounded-full px-4 py-2 text-xs opacity-50">
        <kbd className="font-mono">Ctrl</kbd> + <kbd className="font-mono">K</kbd> 로 빠르게 검색
      </div>
    </motion.div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <motion.div
      className="glass rounded-2xl p-8 text-white text-center max-w-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <p className="text-lg font-semibold mb-2">
        날씨 정보를 불러올 수 없습니다
      </p>
      <p className="text-sm opacity-70">{message}</p>
    </motion.div>
  );
}
