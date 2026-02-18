"use client";

import { useState, useEffect } from "react";
import type { Location } from "@/types/weather";

interface GeolocationState {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
}

export function useGeolocation(enabled: boolean): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.geolocation) {
      setState({ location: null, isLoading: false, error: "위치 서비스를 지원하지 않는 브라우저입니다" });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
          );
          if (!res.ok) throw new Error("위치 정보를 가져올 수 없습니다");

          const data: Location = await res.json();
          setState({ location: data, isLoading: false, error: null });
        } catch {
          setState({
            location: {
              name: "현재 위치",
              country: "",
              lat: latitude,
              lon: longitude,
            },
            isLoading: false,
            error: null,
          });
        }
      },
      (err) => {
        let message = "위치 정보를 가져올 수 없습니다";
        if (err.code === err.PERMISSION_DENIED) {
          message = "위치 접근 권한이 거부되었습니다";
        }
        setState({ location: null, isLoading: false, error: message });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, [enabled]);

  return state;
}
