"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto animate-pulse">
      <div className="kakao-card-main p-6 sm:p-8">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-4 w-24 bg-amber-200/50 rounded-full" />
          <Skeleton className="h-20 w-20 rounded-full bg-amber-200/50" />
          <Skeleton className="h-14 w-36 bg-amber-200/50 rounded-full" />
          <Skeleton className="h-5 w-28 bg-amber-200/50 rounded-full" />
          <Skeleton className="h-4 w-48 bg-amber-200/50 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="kakao-card p-4 text-center">
            <Skeleton className="h-8 w-8 rounded-full bg-amber-200/50 mx-auto mb-2" />
            <Skeleton className="h-3 w-12 bg-amber-200/50 mx-auto mb-2 rounded-full" />
            <Skeleton className="h-5 w-16 bg-amber-200/50 mx-auto rounded-full" />
          </div>
        ))}
      </div>

      <div className="kakao-card p-4">
        <Skeleton className="h-3 w-20 bg-amber-200/50 mb-3 rounded-full" />
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
              <Skeleton className="h-3 w-8 bg-amber-200/50 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full bg-amber-200/50" />
              <Skeleton className="h-3 w-10 bg-amber-200/50 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
