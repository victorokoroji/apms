"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactElement, cloneElement } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Drop-in replacement for Recharts' <ResponsiveContainer> that reliably
 * measures its parent across SSR/hydration.
 */
export function Chart({
  children,
  height = 280,
}: {
  children: ReactElement<{ width?: number; height?: number }>;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth || el.getBoundingClientRect().width;
      if (w > 0) setWidth((prev) => (prev === w ? prev : w));
    };

    measure();
    const raf1 = requestAnimationFrame(measure);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(measure));

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height, position: "relative" }}>
      {width > 0 ? cloneElement(children, { width, height }) : null}
    </div>
  );
}
