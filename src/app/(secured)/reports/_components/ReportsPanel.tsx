"use client";

import { useMemo, useState } from "react";
import { ChartCard } from "@/components/layout/ChartCard";
import { KpiCard } from "@/components/layout/KpiCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { dailyReports } from "@/lib/mock";
import { fmtNaira, fmtNairaCompact, fmtNum, fmtPct } from "@/lib/format";
import { Download, FileText, Search, CheckCircle2, Clock } from "lucide-react";

export function ReportsPanel() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return dailyReports;
    return dailyReports.filter(
      (r) => r.employee.toLowerCase().includes(t) || r.team.toLowerCase().includes(t) || r.date.includes(t),
    );
  }, [q]);

  const stats = useMemo(() => {
    const total = dailyReports.length;
    const submitted = dailyReports.filter((r) => r.status === "Submitted").length;
    const drafts = total - submitted;
    const revenue = dailyReports.reduce((a, r) => a + r.revenue, 0);
    return { total, submitted, drafts, revenue };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Reports" value={String(stats.total)} icon={<FileText className="h-4 w-4" />} accent="primary" />
        <KpiCard label="Submitted" value={String(stats.submitted)} icon={<CheckCircle2 className="h-4 w-4" />} accent="success" />
        <KpiCard label="Drafts" value={String(stats.drafts)} icon={<Clock className="h-4 w-4" />} accent="warning" />
        <KpiCard label="Revenue captured" value={fmtNairaCompact(stats.revenue)} />
      </div>

      <ChartCard
        title="All reports"
        description={`${filtered.length} of ${dailyReports.length} shown`}
        actions={
          <div className="flex items-center gap-2">
            <div className="relative w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reports…" className="pl-8 h-9" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Button size="sm" variant="outline" className="h-9"><Download className="h-4 w-4" /> Export CSV</Button>
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
                <th className="py-2.5 font-medium text-right">Confirm %</th>
                <th className="py-2.5 font-medium text-right">Revenue</th>
                <th className="py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const cp = (r.confirmed / r.received) * 100;
                return (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-3 text-muted-foreground">{r.date}</td>
                    <td className="py-3 font-medium">{r.employee}</td>
                    <td className="py-3">{r.team}</td>
                    <td className="py-3 text-right">{fmtNum(r.received)}</td>
                    <td className="py-3 text-right">{fmtNum(r.confirmed)}</td>
                    <td className="py-3 text-right">{fmtPct(cp, 0)}</td>
                    <td className="py-3 text-right font-medium">{fmtNaira(r.revenue)}</td>
                    <td className="py-3"><Badge variant={r.status === "Submitted" ? "default" : "secondary"}>{r.status}</Badge></td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-8 text-center text-sm text-muted-foreground">No reports match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
