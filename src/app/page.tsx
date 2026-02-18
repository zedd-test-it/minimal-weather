"use client";

import { useEffect, useRef } from "react";
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
          <div className="flex items-center gap-1.5 shrink-0">
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
        <footer className="text-center py-3 text-amber-800/30 dark:text-amber-200/30 text-xs">
          🐥 카카오 날씨
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
      <div className="kakao-card-main p-8 text-center">
        <motion.span
          className="text-5xl block mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🐥
        </motion.span>
        <p className="text-sm font-bold text-amber-800 dark:text-amber-200">
          현재 위치를 찾고 있어요!
        </p>
        <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-1">
          위치 접근을 허용해주세요~
        </p>
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
      className="flex flex-col items-center gap-5 text-center px-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <motion.div
        className="kakao-card-main p-8"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-7xl block mb-3">🐥</span>
        <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
          카카오 날씨
        </h1>
        <p className="text-xl text-amber-800 dark:text-amber-200 mt-2">
          {timeStr}
        </p>
        <p className="text-xs text-amber-600/50 dark:text-amber-400/50 mt-1">
          {dateStr}
        </p>
      </motion.div>

      {geoError && (
        <div className="kakao-card px-4 py-3 text-xs text-amber-700 dark:text-amber-300">
          📍 {geoError} — 도시를 직접 검색해주세요!
        </div>
      )}

      <div className="kakao-card px-5 py-3 text-sm text-amber-800 dark:text-amber-200">
        🔍 도시를 검색해서 날씨를 확인해봐요!
      </div>

      <div className="text-xs text-amber-700/40 dark:text-amber-300/40">
        <kbd className="bg-white/60 dark:bg-amber-900/40 px-2 py-0.5 rounded border border-amber-300/30">Ctrl</kbd>
        {" + "}
        <kbd className="bg-white/60 dark:bg-amber-900/40 px-2 py-0.5 rounded border border-amber-300/30">K</kbd>
        {" 로 빠르게 검색!"}
      </div>
    </motion.div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <motion.div
      className="kakao-card-main p-8 text-center max-w-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <span className="text-4xl block mb-3">😢</span>
      <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
        앗! 날씨를 불러올 수 없어요
      </p>
      <p className="text-sm text-amber-700/60 dark:text-amber-300/60 mt-2">{message}</p>
    </motion.div>
  );
}
