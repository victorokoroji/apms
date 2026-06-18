"use client";

import { useMemo, useState } from "react";
import { ChartCard } from "@/components/layout/ChartCard";
import { KpiCard } from "@/components/layout/KpiCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { employees } from "@/lib/mock";
import { fmtNaira, fmtNum, fmtPct, initials } from "@/lib/format";
import { Search, UserPlus, Users, UserCheck, UserX, Clock } from "lucide-react";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  Active: "default",
  Pending: "secondary",
  Inactive: "destructive",
};

export function EmployeesTable() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | "Active" | "Pending" | "Inactive">("All");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return employees.filter((e) => {
      if (status !== "All" && e.status !== status) return false;
      if (!t) return true;
      return (
        e.name.toLowerCase().includes(t) ||
        e.email.toLowerCase().includes(t) ||
        e.team.toLowerCase().includes(t)
      );
    });
  }, [q, status]);

  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter((e) => e.status === "Active").length,
    pending: employees.filter((e) => e.status === "Pending").length,
    inactive: employees.filter((e) => e.status === "Inactive").length,
  }), []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Total" value={String(stats.total)} icon={<Users className="h-4 w-4" />} accent="primary" />
        <KpiCard label="Active" value={String(stats.active)} icon={<UserCheck className="h-4 w-4" />} accent="success" />
        <KpiCard label="Pending" value={String(stats.pending)} icon={<Clock className="h-4 w-4" />} accent="warning" />
        <KpiCard label="Inactive" value={String(stats.inactive)} icon={<UserX className="h-4 w-4" />} />
      </div>

      <ChartCard
        title="All employees"
        description={`${filtered.length} of ${employees.length} shown`}
        actions={
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 rounded-md border border-border p-0.5">
              {(["All", "Active", "Pending", "Inactive"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={
                    "rounded px-2.5 py-1 text-xs font-medium transition-colors " +
                    (status === s ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="relative w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees…" className="pl-8 h-9" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Button size="sm" className="h-9"><UserPlus className="h-4 w-4" /> Invite</Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2.5 font-medium">Employee</th>
                <th className="py-2.5 font-medium">Role</th>
                <th className="py-2.5 font-medium">Team</th>
                <th className="py-2.5 font-medium text-right">Revenue</th>
                <th className="py-2.5 font-medium text-right">Orders</th>
                <th className="py-2.5 font-medium text-right">Confirm %</th>
                <th className="py-2.5 font-medium">Status</th>
                <th className="py-2.5 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const cp = (e.ordersConfirmed / e.ordersReceived) * 100;
                return (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-[10px] font-semibold">{initials(e.name)}</div>
                        <div className="min-w-0">
                          <div className="font-medium">{e.name}</div>
                          <div className="text-[11px] text-muted-foreground truncate">{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{e.role}</td>
                    <td className="py-3"><Badge variant="secondary">{e.team}</Badge></td>
                    <td className="py-3 text-right font-medium">{fmtNaira(e.revenue)}</td>
                    <td className="py-3 text-right">{fmtNum(e.ordersReceived)}</td>
                    <td className="py-3 text-right">{fmtPct(cp, 0)}</td>
                    <td className="py-3">
                      <Badge variant={STATUS_VARIANT[e.status]}>{e.status}</Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{e.lastActivity}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-8 text-center text-sm text-muted-foreground">No employees match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
