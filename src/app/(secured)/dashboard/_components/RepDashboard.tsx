"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/layout/KpiCard";
import { ChartCard } from "@/components/layout/ChartCard";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";
import { Chart } from "@/components/layout/Chart";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store";
import { employees, revenueTrend, confirmTrend } from "@/lib/mock";
import { fmtNaira, fmtNum, fmtPct } from "@/lib/format";
import {
  DollarSign, ShoppingCart, CheckCircle2, Percent, Sparkles, TrendingUp, ArrowRight,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis,
} from "recharts";

const tip = {
  contentStyle: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 },
  labelStyle: { color: "var(--muted-foreground)", fontSize: 11 },
};

export function RepDashboard() {
  const { user } = useAuth();
  const me = employees.find((e) => e.name.startsWith(user?.name?.split(" ")[0] as string)) ?? employees[1];
  const cp = (me.ordersConfirmed / me.ordersReceived) * 100;

  const weekly = Array.from({ length: 8 }).map((_, i) => ({
    w: `W${i + 1}`,
    revenue: Math.round(800_000 + Math.sin(i) * 200_000 + Math.random() * 250_000),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name.split(" ")[0]}`}
        description="Your personal performance at a glance."
        actions={
          <>
            <DateRangeFilter />
            <Button asChild size="sm" className="h-9">
              <Link href="/daily-report">Submit today's report <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Revenue Generated" value={fmtNaira(me.revenue)} delta={14.2} icon={<DollarSign className="h-4 w-4" />} accent="primary" />
        <KpiCard label="Orders Received" value={fmtNum(me.ordersReceived)} delta={6.4} icon={<ShoppingCart className="h-4 w-4" />} />
        <KpiCard label="Orders Confirmed" value={fmtNum(me.ordersConfirmed)} delta={9.1} icon={<CheckCircle2 className="h-4 w-4" />} accent="success" />
        <KpiCard label="Confirmation Rate" value={fmtPct(cp)} delta={3.2} icon={<Percent className="h-4 w-4" />} accent="warning" />
      </div>

      <div className="rounded-xl border border-border bg-gradient-to-br from-primary-soft to-card p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground">Performance insights</div>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
              <li className="flex gap-2"><TrendingUp className="h-4 w-4 text-success shrink-0 mt-0.5" /> Your confirmation rate increased by <strong className="text-foreground">12%</strong> this week.</li>
              <li className="flex gap-2"><TrendingUp className="h-4 w-4 text-success shrink-0 mt-0.5" /> You generated <strong className="text-foreground">{fmtNaira(150_000)}</strong> more revenue than last week.</li>
              <li className="flex gap-2"><TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" /> You're <strong className="text-foreground">3 orders away</strong> from your weekly target.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Daily trend" description="Last 30 days">
          <Chart height={220}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="rd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip {...tip} formatter={(v) => fmtNaira(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fill="url(#rd)" />
            </AreaChart>
          </Chart>
        </ChartCard>
        <ChartCard title="Weekly trend" description="Revenue per week">
          <Chart height={220}>
            <BarChart data={weekly}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="w" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis hide />
              <Tooltip {...tip} formatter={(v) => fmtNaira(Number(v))} />
              <Bar dataKey="revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </Chart>
        </ChartCard>
        <ChartCard title="Monthly confirmation" description="Last 12 weeks">
          <Chart height={220}>
            <LineChart data={confirmTrend}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis domain={[50, 90]} hide />
              <Tooltip {...tip} formatter={(v) => `${Number(v)}%`} />
              <Line type="monotone" dataKey="rate" stroke="var(--success)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </Chart>
        </ChartCard>
      </div>
    </div>
  );
}
