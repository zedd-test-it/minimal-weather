"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto animate-pulse">
      {/* Current weather skeleton */}
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-4 w-24 bg-white/20" />
          <Skeleton className="h-20 w-20 rounded-full bg-white/20" />
          <Skeleton className="h-14 w-36 bg-white/20" />
          <Skeleton className="h-5 w-28 bg-white/20" />
          <Skeleton className="h-4 w-48 bg-white/20" />
        </div>
      </div>

      {/* Details grid skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-4">
            <Skeleton className="h-3 w-12 bg-white/20 mb-3" />
            <Skeleton className="h-6 w-16 bg-white/20" />
          </div>
        ))}
      </div>

      {/* Hourly skeleton */}
      <div className="glass rounded-2xl p-4">
        <Skeleton className="h-3 w-20 bg-white/20 mb-3" />
        <div className="flex gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[56px]">
              <Skeleton className="h-3 w-8 bg-white/20" />
              <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
              <Skeleton className="h-3 w-10 bg-white/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Daily skeleton */}
      <div className="glass rounded-2xl p-4">
        <Skeleton className="h-3 w-16 bg-white/20 mb-3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <Skeleton className="h-4 w-10 bg-white/20" />
            <Skeleton className="h-5 w-5 rounded-full bg-white/20" />
            <Skeleton className="h-4 w-24 bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
