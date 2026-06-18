"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/layout/KpiCard";
import { ChartCard } from "@/components/layout/ChartCard";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";
import { Chart } from "@/components/layout/Chart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { revenueTrend, teams, employees } from "@/lib/mock";
import { fmtNaira, fmtNairaCompact, fmtNum, fmtPct, initials } from "@/lib/format";
import {
  DollarSign, Wallet, TrendingUp, ShoppingCart, CheckCircle2, Percent, Download,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis,
} from "recharts";

const tooltipStyle = {
  contentStyle: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: "var(--muted-foreground)", fontSize: 11 },
};

export function CeoDashboard() {
  const totalRevenue = teams.reduce((a, t) => a + t.revenue, 0);
  const totalLoaded = teams.reduce((a, t) => a + t.amountLoaded, 0);
  const totalReceived = teams.reduce((a, t) => a + t.ordersReceived, 0);
  const totalConfirmed = teams.reduce((a, t) => a + t.ordersConfirmed, 0);
  const roi = ((totalRevenue - totalLoaded) / totalLoaded) * 100;
  const confirmPct = (totalConfirmed / totalReceived) * 100;

  const topEmployees = [...employees].sort((a, b) => b.revenue - a.revenue).slice(0, 6);

  const teamCompare = teams.map((t) => ({
    name: t.name,
    Revenue: Math.round(t.revenue / 1000),
    ROI: Math.round(((t.revenue - t.amountLoaded) / t.amountLoaded) * 100),
    Confirmed: t.ordersConfirmed,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Overview"
        description="Real-time performance across Admord Global."
        actions={
          <>
            <DateRangeFilter />
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4" /> Export
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-6">
        <KpiCard label="Revenue" value={fmtNairaCompact(totalRevenue)} delta={12.4} hint="vs last month" icon={<DollarSign className="h-4 w-4" />} accent="primary" />
        <KpiCard label="Loaded" value={fmtNairaCompact(totalLoaded)} delta={4.1} hint="vs last month" icon={<Wallet className="h-4 w-4" />} />
        <KpiCard label="ROI" value={fmtPct(roi, 1)} delta={6.8} hint="vs last month" icon={<TrendingUp className="h-4 w-4" />} accent="success" />
        <KpiCard label="Orders" value={fmtNum(totalReceived)} delta={9.2} hint="received" icon={<ShoppingCart className="h-4 w-4" />} />
        <KpiCard label="Confirmed" value={fmtNum(totalConfirmed)} delta={7.6} hint="orders" icon={<CheckCircle2 className="h-4 w-4" />} />
        <KpiCard label="Confirm %" value={fmtPct(confirmPct)} delta={-1.2} hint="vs last month" icon={<Percent className="h-4 w-4" />} accent="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Revenue trend" description="Daily revenue across all teams — last 30 days">
          <Chart height={300}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" tickFormatter={(v: number) => `₦${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip {...tooltipStyle} formatter={(v) => fmtNaira(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Top performing teams" description="Ranked by revenue this period">
          <ul className="space-y-3">
            {[...teams].sort((a, b) => b.revenue - a.revenue).map((t, i) => {
              const r = ((t.revenue - t.amountLoaded) / t.amountLoaded) * 100;
              const cp = (t.ordersConfirmed / t.ordersReceived) * 100;
              return (
                <li key={t.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-muted text-sm font-semibold">{i + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate text-sm font-semibold">{t.name}</div>
                      <div className="text-sm font-semibold text-foreground">{fmtNaira(t.revenue)}</div>
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>ROI <span className="font-medium text-success">{fmtPct(r, 0)}</span></span>
                      <span>Confirm <span className="font-medium text-foreground">{fmtPct(cp, 0)}</span></span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Team performance comparison" description="Revenue (₦K) vs ROI (%)">
          <Chart height={280}>
            <BarChart data={teamCompare}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="Revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="ROI" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Company performance trend" description="Overall business growth">
          <Chart height={280}>
            <LineChart data={revenueTrend}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="orders" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="loaded" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </Chart>
        </ChartCard>
      </div>

      <ChartCard title="Top performing employees" description="Highest revenue contributors this period">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2.5 font-medium">#</th>
                <th className="py-2.5 font-medium">Employee</th>
                <th className="py-2.5 font-medium">Team</th>
                <th className="py-2.5 font-medium text-right">Revenue</th>
                <th className="py-2.5 font-medium text-right">Orders</th>
                <th className="py-2.5 font-medium text-right">Confirm %</th>
              </tr>
            </thead>
            <tbody>
              {topEmployees.map((e, i) => {
                const cp = (e.ordersConfirmed / e.ordersReceived) * 100;
                return (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-3 text-muted-foreground">{i + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-muted text-[10px] font-semibold">{initials(e.name)}</div>
                        <div>
                          <div className="font-medium">{e.name}</div>
                          <div className="text-[11px] text-muted-foreground">{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3"><Badge variant="secondary">{e.team}</Badge></td>
                    <td className="py-3 text-right font-medium">{fmtNaira(e.revenue)}</td>
                    <td className="py-3 text-right">{fmtNum(e.ordersReceived)}</td>
                    <td className="py-3 text-right">
                      <span className={cp >= 75 ? "text-success font-medium" : "text-foreground"}>{fmtPct(cp, 0)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
