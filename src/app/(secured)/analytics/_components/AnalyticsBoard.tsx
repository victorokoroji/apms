"use client";

import { ChartCard } from "@/components/layout/ChartCard";
import { KpiCard } from "@/components/layout/KpiCard";
import { Chart } from "@/components/layout/Chart";
import { teams, revenueTrend, confirmTrend, employees } from "@/lib/mock";
import { fmtNaira, fmtNairaCompact, fmtPct } from "@/lib/format";
import { TrendingUp, Activity, Target, Percent } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, Tooltip, XAxis, YAxis,
} from "recharts";

const tip = {
  contentStyle: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 },
  labelStyle: { color: "var(--muted-foreground)", fontSize: 11 },
};

const PIE_COLORS = ["var(--primary)", "var(--chart-2)", "var(--success)", "var(--warning)", "var(--chart-5)"];

export function AnalyticsBoard() {
  const totalRevenue = teams.reduce((a, t) => a + t.revenue, 0);
  const totalLoaded = teams.reduce((a, t) => a + t.amountLoaded, 0);
  const roi = ((totalRevenue - totalLoaded) / totalLoaded) * 100;
  const totalReceived = teams.reduce((a, t) => a + t.ordersReceived, 0);
  const totalConfirmed = teams.reduce((a, t) => a + t.ordersConfirmed, 0);
  const confirmPct = (totalConfirmed / totalReceived) * 100;

  const teamShare = teams.map((t) => ({ name: t.name, value: t.revenue }));
  const teamCompare = teams.map((t) => ({
    name: t.name,
    Revenue: Math.round(t.revenue / 1000),
    Loaded: Math.round(t.amountLoaded / 1000),
  }));
  const topEmployees = [...employees].sort((a, b) => b.revenue - a.revenue).slice(0, 8).map((e) => ({
    name: e.name.split(" ")[0],
    revenue: Math.round(e.revenue / 1000),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Revenue" value={fmtNairaCompact(totalRevenue)} delta={12.4} icon={<TrendingUp className="h-4 w-4" />} accent="primary" />
        <KpiCard label="ROI" value={fmtPct(roi)} delta={6.8} icon={<Activity className="h-4 w-4" />} accent="success" />
        <KpiCard label="Confirm %" value={fmtPct(confirmPct)} delta={-1.2} icon={<Percent className="h-4 w-4" />} accent="warning" />
        <KpiCard label="Goal progress" value="84%" delta={3.4} icon={<Target className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Revenue vs orders" description="Daily revenue and orders for the last 30 days">
          <Chart height={300}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="a-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis yAxisId="left" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" tickFormatter={(v: number) => `₦${(v / 1_000_000).toFixed(1)}M`} />
              <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip {...tip} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#a-rev)" />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
            </AreaChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Revenue share" description="By team">
          <Chart height={300}>
            <PieChart>
              <Tooltip {...tip} formatter={(v) => fmtNaira(Number(v))} />
              <Pie data={teamShare} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                {teamShare.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
            </PieChart>
          </Chart>
          <ul className="mt-2 grid grid-cols-2 gap-1 text-xs">
            {teamShare.map((t, i) => (
              <li key={t.name} className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="truncate">{t.name}</span>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Revenue vs amount loaded" description="In ₦K, per team">
          <Chart height={280}>
            <BarChart data={teamCompare}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip {...tip} />
              <Bar dataKey="Revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Loaded" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Confirmation trend" description="Weekly confirmation rate">
          <Chart height={280}>
            <LineChart data={confirmTrend}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis domain={[50, 90]} tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip {...tip} formatter={(v) => `${Number(v)}%`} />
              <Line type="monotone" dataKey="rate" stroke="var(--success)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </Chart>
        </ChartCard>
      </div>

      <ChartCard title="Top performers" description="Revenue in ₦K">
        <Chart height={260}>
          <BarChart data={topEmployees} layout="vertical">
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" width={70} />
            <Tooltip {...tip} />
            <Bar dataKey="revenue" fill="var(--primary)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </Chart>
      </ChartCard>
    </div>
  );
}
