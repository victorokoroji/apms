"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/layout/KpiCard";
import { ChartCard } from "@/components/layout/ChartCard";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";
import { Chart } from "@/components/layout/Chart";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/store";
import { teams, employees, revenueTrend, confirmTrend } from "@/lib/mock";
import { fmtNaira, fmtNum, fmtPct, initials } from "@/lib/format";
import { DollarSign, TrendingUp, ShoppingCart, CheckCircle2, Percent, Search } from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis,
} from "recharts";

const tip = {
  contentStyle: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 },
  labelStyle: { color: "var(--muted-foreground)", fontSize: 11 },
};

export function LeaderDashboard() {
  const { user } = useAuth();
  const team = teams.find((t) => t.id === user.teamId) ?? teams[0];
  const members = employees.filter((e) => e.teamId === team.id);
  const roi = ((team.revenue - team.amountLoaded) / team.amountLoaded) * 100;
  const cp = (team.ordersConfirmed / team.ordersReceived) * 100;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${team.name} — Team performance`}
        description={`You're viewing your assigned team. ${members.length} active members.`}
        actions={<DateRangeFilter />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <KpiCard label="Team Revenue" value={fmtNaira(team.revenue)} delta={8.3} icon={<DollarSign className="h-4 w-4" />} accent="primary" />
        <KpiCard label="Team ROI" value={fmtPct(roi)} delta={4.1} icon={<TrendingUp className="h-4 w-4" />} accent="success" />
        <KpiCard label="Orders Received" value={fmtNum(team.ordersReceived)} delta={6.2} icon={<ShoppingCart className="h-4 w-4" />} />
        <KpiCard label="Orders Confirmed" value={fmtNum(team.ordersConfirmed)} delta={5.0} icon={<CheckCircle2 className="h-4 w-4" />} />
        <KpiCard label="Confirmation %" value={fmtPct(cp)} delta={-0.8} icon={<Percent className="h-4 w-4" />} accent="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Team revenue trend">
          <Chart height={260}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="tr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" tickFormatter={(v: number) => `₦${(v/1_000_000).toFixed(1)}M`} />
              <Tooltip {...tip} formatter={(v) => fmtNaira(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#tr)" />
            </AreaChart>
          </Chart>
        </ChartCard>
        <ChartCard title="Confirmation trend" description="Weekly confirmation %">
          <Chart height={260}>
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

      <ChartCard
        title="Team performance"
        description="Individual rep performance"
        actions={
          <div className="relative w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reps…" className="pl-8 h-9" />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2.5 font-medium">Employee</th>
                <th className="py-2.5 font-medium text-right">Received</th>
                <th className="py-2.5 font-medium text-right">Confirmed</th>
                <th className="py-2.5 font-medium text-right">Revenue</th>
                <th className="py-2.5 font-medium text-right">Confirm %</th>
                <th className="py-2.5 font-medium">Last submission</th>
              </tr>
            </thead>
            <tbody>
              {members.map((e) => {
                const r = (e.ordersConfirmed / e.ordersReceived) * 100;
                return (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-muted text-[10px] font-semibold">{initials(e.name)}</div>
                        <div className="font-medium">{e.name}</div>
                      </div>
                    </td>
                    <td className="py-3 text-right">{fmtNum(e.ordersReceived)}</td>
                    <td className="py-3 text-right">{fmtNum(e.ordersConfirmed)}</td>
                    <td className="py-3 text-right font-medium">{fmtNaira(e.revenue)}</td>
                    <td className="py-3 text-right">
                      <Badge variant={r >= 75 ? "default" : "secondary"} className={r >= 75 ? "bg-success/15 text-success hover:bg-success/15" : ""}>
                        {fmtPct(r, 0)}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{e.lastActivity}</td>
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
