"use client";

import { useState, useEffect, useCallback } from "react";
import type { SavedLocation, Location } from "@/types/weather";

const STORAGE_KEY = "weather-saved-locations";
const MAX_LOCATIONS = 5;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useSavedLocations() {
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: SavedLocation[] = JSON.parse(stored);
        setLocations(parsed);
        if (parsed.length > 0) {
          setActiveId(parsed[0].id);
        }
      }
    } catch {
      // corrupted data — reset
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoaded(true);
  }, []);

  const persist = useCallback((updated: SavedLocation[]) => {
    setLocations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addLocation = useCallback(
    (location: Location) => {
      const exists = locations.some(
        (l) =>
          l.lat.toFixed(2) === location.lat.toFixed(2) &&
          l.lon.toFixed(2) === location.lon.toFixed(2)
      );
      if (exists) return;

      const newLoc: SavedLocation = { ...location, id: generateId() };
      const updated = [...locations, newLoc].slice(-MAX_LOCATIONS);
      persist(updated);
      setActiveId(newLoc.id);
    },
    [locations, persist]
  );

  const removeLocation = useCallback(
    (id: string) => {
      const updated = locations.filter((l) => l.id !== id);
      persist(updated);
      if (activeId === id) {
        setActiveId(updated.length > 0 ? updated[0].id : null);
      }
    },
    [locations, activeId, persist]
  );

  const activeLocation = locations.find((l) => l.id === activeId) ?? null;

  return {
    locations,
    activeId,
    activeLocation,
    setActiveId,
    addLocation,
    removeLocation,
    isLoaded,
  };
}
