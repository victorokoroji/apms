import { cn } from "@/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  label: string;
  value: ReactNode;
  delta?: number;
  hint?: string;
  icon?: ReactNode;
  accent?: "default" | "primary" | "success" | "warning";
}

export function KpiCard({ label, value, delta, hint, icon, accent = "default" }: Props) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-center justify-between gap-2">
        <div className="truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        {icon && (
          <div
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
              accent === "primary" && "bg-primary-soft text-primary",
              accent === "success" && "bg-success/10 text-success",
              accent === "warning" && "bg-warning/10 text-warning",
              accent === "default" && "bg-muted text-muted-foreground",
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 text-[1.6rem] leading-none font-bold tracking-tight text-foreground whitespace-nowrap">
        {value}
      </div>
      {(delta !== undefined || hint) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold",
                up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
              )}
            >
              {up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(delta).toFixed(1)}%
            </span>
          )}
          {hint && <span className="truncate text-muted-foreground">{hint}</span>}
        </div>
      )}
    </div>
  );
}
