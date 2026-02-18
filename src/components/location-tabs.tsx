"use client";

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
    <div className="flex gap-1.5 flex-wrap">
      {locations.map((loc) => {
        const isActive = loc.id === activeId;
        return (
          <button
            key={loc.id}
            onClick={() => onSelect(loc.id)}
            className={`
              flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all active:scale-95
              ${
                isActive
                  ? "bg-amber-400 text-amber-900 border-2 border-amber-500 shadow-sm"
                  : "bg-white/70 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-2 border-amber-200/50 dark:border-amber-700/30 hover:bg-white dark:hover:bg-amber-900/60"
              }
            `}
          >
            {loc.name}
            <span
              onClick={(e) => {
                e.stopPropagation();
                onRemove(loc.id);
              }}
              className="hover:bg-amber-600/20 rounded-full w-4 h-4 flex items-center justify-center text-[10px] leading-none"
            >
              ✕
            </span>
          </button>
        );
      })}
    </div>
  );
}
