"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, MapPin, Plus } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import type { Location } from "@/types/weather";

interface LocationSearchProps {
  onSelect: (location: Location) => void;
}

const SAMPLE_CITIES: { label: string; location: Location }[] = [
  { label: "서울", location: { name: "Seoul", country: "KR", lat: 37.5667, lon: 126.9783 } },
  { label: "부산", location: { name: "Busan", country: "KR", lat: 35.1796, lon: 129.0756 } },
  { label: "제주", location: { name: "Jeju", country: "KR", lat: 33.4996, lon: 126.5312 } },
  { label: "인천", location: { name: "Incheon", country: "KR", lat: 37.4563, lon: 126.7052 } },
  { label: "도쿄", location: { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 } },
  { label: "뉴욕", location: { name: "New York", country: "US", lat: 40.7128, lon: -74.006 } },
  { label: "런던", location: { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 } },
  { label: "파리", location: { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 } },
];

export function LocationSearch({ onSelect }: LocationSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data: Location[] = await res.json();
        setResults(data);
      }
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 400);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (location: Location) => {
    onSelect(location);
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  const formatLocationLabel = (loc: Location) => {
    const parts = [loc.name];
    if (loc.state) parts.push(loc.state);
    parts.push(loc.country);
    return parts.join(", ");
  };

  const showSamples = query.trim().length < 2 && results.length === 0;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20"
        onClick={() => setOpen(true)}
        aria-label="지역 검색 (Ctrl+K)"
      >
        <Search className="w-5 h-5" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="도시 이름을 검색하세요 (한글/영어)..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {isSearching ? "검색 중..." : "검색 결과가 없습니다"}
          </CommandEmpty>

          {showSamples && (
            <CommandGroup heading="추천 도시">
              {SAMPLE_CITIES.map((city) => (
                <CommandItem
                  key={`sample-${city.location.lat}-${city.location.lon}`}
                  onSelect={() => handleSelect(city.location)}
                  className="cursor-pointer"
                >
                  <MapPin className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <span>
                    {city.label}{" "}
                    <span className="text-muted-foreground text-xs">
                      {city.location.name}, {city.location.country}
                    </span>
                  </span>
                  <Plus className="ml-auto h-4 w-4 opacity-50" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {results.length > 0 && (
            <CommandGroup heading="검색 결과">
              {results.map((loc, i) => (
                <CommandItem
                  key={`${loc.lat}-${loc.lon}-${i}`}
                  onSelect={() => handleSelect(loc)}
                  className="cursor-pointer"
                >
                  <MapPin className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <span>{formatLocationLabel(loc)}</span>
                  <Plus className="ml-auto h-4 w-4 opacity-50" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
