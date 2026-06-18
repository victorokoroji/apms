"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ANIMATION_STYLES = {
  reverseSpinner: {
    animationDirection: "reverse" as const,
    animationDuration: "1.5s",
  },
} as const;

export default function Loading() {
  const [dotCount, setDotCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const dots = useMemo(() => ".".repeat(dotCount), [dotCount]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 border-2 border-transparent border-b-primary/70 rounded-full animate-spin"
              style={ANIMATION_STYLES.reverseSpinner}
            ></div>
            <div className="absolute inset-8 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Admord Global Multiservices
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Admord Performance Management System{dots}
          </h2>
          <p className="text-muted-foreground">Preparing your workspace…</p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
