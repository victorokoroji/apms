"use client";

import { useMemo, useState } from "react";
import { ChartCard } from "@/components/layout/ChartCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notifications as seed } from "@/lib/mock";
import { CheckCircle2, Info, AlertTriangle, CheckCheck, BellOff } from "lucide-react";

type Filter = "all" | "unread";
type NotificationItem = {
  id: string;
  type: "success" | "info" | "warning";
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const ICONS = {
  success: { Icon: CheckCircle2, tone: "text-success bg-success/10" },
  info: { Icon: Info, tone: "text-primary bg-primary-soft" },
  warning: { Icon: AlertTriangle, tone: "text-warning bg-warning/10" },
} as const;

export function NotificationsList() {
  const [items, setItems] = useState<NotificationItem[]>(() => seed.map((n) => ({ ...n })));
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => (filter === "unread" ? items.filter((n) => !n.read) : items), [items, filter]);
  const unread = items.filter((n) => !n.read).length;

  return (
    <ChartCard
      title="Notifications"
      description={unread > 0 ? `${unread} unread` : "You're all caught up."}
      actions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
            {(["all", "unread"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  "rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
                  (filter === f ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")
                }
              >
                {f}
              </button>
            ))}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-9"
            onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
            disabled={unread === 0}
          >
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        </div>
      }
    >
      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-sm text-muted-foreground">
          <BellOff className="h-6 w-6" />
          <span>No notifications.</span>
        </div>
      ) : (
        <ul className="space-y-2">
          {visible.map((n) => {
            const meta = ICONS[n.type as keyof typeof ICONS] ?? ICONS.info;
            const Icon = meta.Icon;
            return (
              <li
                key={n.id}
                className={
                  "flex items-start gap-3 rounded-lg border border-border p-3 transition-colors " +
                  (n.read ? "bg-card" : "bg-primary-soft/30")
                }
              >
                <div className={"grid h-9 w-9 shrink-0 place-items-center rounded-lg " + meta.tone}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-semibold text-foreground">{n.title}</h4>
                    {!n.read && <Badge variant="default" className="h-4 px-1.5 text-[10px]">New</Badge>}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/80">{n.time}</p>
                </div>
                {!n.read && (
                  <button
                    onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                    className="text-[11px] font-medium text-primary hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </ChartCard>
  );
}
