"use client";

import { X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SavedLocation } from "@/types/weather";

interface LocationTabsProps {
  locations: SavedLocation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export function LocationTabs({
  locations,
  activeId,
  onSelect,
  onRemove,
}: LocationTabsProps) {
  if (locations.length === 0) return null;

  return (
    <Tabs value={activeId ?? undefined} onValueChange={onSelect}>
      <TabsList className="bg-white/10 border-0 h-auto flex-wrap gap-1 p-1">
        {locations.map((loc) => (
          <TabsTrigger
            key={loc.id}
            value={loc.id}
            className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white text-xs px-3 py-1.5 rounded-full gap-1.5"
          >
            {loc.name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(loc.id);
              }}
              className="ml-0.5 hover:bg-white/20 rounded-full p-0.5"
              aria-label={`${loc.name} 삭제`}
            >
              <X className="w-3 h-3" />
            </button>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
