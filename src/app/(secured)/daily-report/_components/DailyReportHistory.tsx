"use client";

import { ChartCard } from "@/components/layout/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { dailyReports } from "@/lib/mock";
import { fmtNaira, fmtNum } from "@/lib/format";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export function DailyReportHistory() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return dailyReports;
    return dailyReports.filter(
      (r) =>
        r.employee.toLowerCase().includes(t) ||
        r.team.toLowerCase().includes(t) ||
        r.date.includes(t),
    );
  }, [q]);

  return (
    <ChartCard
      title="Report history"
      description="Recent daily submissions across the org."
      actions={
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reports…" className="pl-8 h-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="py-2.5 font-medium">Date</th>
              <th className="py-2.5 font-medium">Employee</th>
              <th className="py-2.5 font-medium">Team</th>
              <th className="py-2.5 font-medium text-right">Received</th>
              <th className="py-2.5 font-medium text-right">Confirmed</th>
              <th className="py-2.5 font-medium text-right">Revenue</th>
              <th className="py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="py-3 text-muted-foreground">{r.date}</td>
                <td className="py-3 font-medium">{r.employee}</td>
                <td className="py-3">{r.team}</td>
                <td className="py-3 text-right">{fmtNum(r.received)}</td>
                <td className="py-3 text-right">{fmtNum(r.confirmed)}</td>
                <td className="py-3 text-right font-medium">{fmtNaira(r.revenue)}</td>
                <td className="py-3">
                  <Badge variant={r.status === "Submitted" ? "default" : "secondary"}>
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={7} className="py-8 text-center text-sm text-muted-foreground">No reports match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
