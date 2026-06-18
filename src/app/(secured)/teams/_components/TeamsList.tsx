"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChartCard } from "@/components/layout/ChartCard";
import { KpiCard } from "@/components/layout/KpiCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teams } from "@/lib/mock";
import { fmtNaira, fmtNairaCompact, fmtNum, fmtPct } from "@/lib/format";
import { Search, Users, Trophy, Target, TrendingUp, Plus } from "lucide-react";

export function TeamsList() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return teams;
    return teams.filter((x) => x.name.toLowerCase().includes(t) || x.leader.toLowerCase().includes(t));
  }, [q]);

  const stats = useMemo(() => {
    const totalRevenue = teams.reduce((a, t) => a + t.revenue, 0);
    const totalMembers = teams.reduce((a, t) => a + t.members, 0);
    const totalReceived = teams.reduce((a, t) => a + t.ordersReceived, 0);
    const totalConfirmed = teams.reduce((a, t) => a + t.ordersConfirmed, 0);
    return {
      teams: teams.length,
      members: totalMembers,
      revenue: totalRevenue,
      confirmRate: (totalConfirmed / totalReceived) * 100,
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Teams" value={String(stats.teams)} icon={<Users className="h-4 w-4" />} accent="primary" />
        <KpiCard label="Members" value={String(stats.members)} icon={<Users className="h-4 w-4" />} />
        <KpiCard label="Revenue" value={fmtNairaCompact(stats.revenue)} icon={<Trophy className="h-4 w-4" />} accent="success" />
        <KpiCard label="Confirm rate" value={fmtPct(stats.confirmRate)} icon={<Target className="h-4 w-4" />} accent="warning" />
      </div>

      <ChartCard
        title="All teams"
        description="Performance breakdown by team."
        actions={
          <div className="flex items-center gap-2">
            <div className="relative w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search teams…" className="pl-8 h-9" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Button size="sm" className="h-9"><Plus className="h-4 w-4" /> New team</Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => {
            const roi = ((t.revenue - t.amountLoaded) / t.amountLoaded) * 100;
            const cp = (t.ordersConfirmed / t.ordersReceived) * 100;
            return (
              <div key={t.id} className="rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary font-semibold">
                        {t.name.slice(0, 1)}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                        <p className="text-[11px] text-muted-foreground">Led by {t.leader}</p>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{t.members} members</Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <Stat label="Revenue" value={fmtNaira(t.revenue)} />
                  <Stat label="ROI" value={fmtPct(roi, 0)} tone="success" />
                  <Stat label="Orders" value={fmtNum(t.ordersReceived)} />
                  <Stat label="Confirm %" value={fmtPct(cp, 0)} tone={cp >= 75 ? "success" : "default"} />
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] text-success">
                    <TrendingUp className="h-3.5 w-3.5" /> Trending up
                  </span>
                  <Button asChild variant="outline" size="sm" className="h-8">
                    <Link href={`/teams/${t.id}`}>View team</Link>
                  </Button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full py-10 text-center text-sm text-muted-foreground">
              No teams match your search.
            </div>
          )}
        </div>
      </ChartCard>
    </div>
  );
}

function Stat({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "success" }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={"mt-0.5 font-semibold " + (tone === "success" ? "text-success" : "text-foreground")}>{value}</div>
    </div>
  );
}
