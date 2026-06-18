"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Users, PhoneCall, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, ROLE_LABELS, type Role } from "@/lib/store";
import { cn } from "@/utils";

const ROLE_CARDS: Array<{ value: Role; title: string; description: string; icon: typeof ShieldCheck }> = [
  { value: "ceo", title: ROLE_LABELS.ceo, description: "Company-wide performance, teams and revenue overview.", icon: ShieldCheck },
  { value: "team_leader", title: ROLE_LABELS.team_leader, description: "Manage your team's reports, members and KPIs.", icon: Users },
  { value: "call_rep", title: ROLE_LABELS.call_rep, description: "Submit daily reports and track personal targets.", icon: PhoneCall },
];

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const login = useAuth((s) => s.login);
  const [role, setRole] = useState<Role>("ceo");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(role);
    const next = params.get("next");
    router.replace(next && next.startsWith("/") ? next : "/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between bg-sidebar text-sidebar-foreground p-10">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">A</div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Admord Global Multiservices</div>
            <div className="text-[11px] text-sidebar-foreground/60">Performance Management System</div>
          </div>
        </div>
        <div className="space-y-4 max-w-md">
          <h2 className="text-3xl font-semibold leading-tight">Track performance. Empower teams. Grow revenue.</h2>
          <p className="text-sidebar-foreground/70 text-sm leading-relaxed">
            Real-time dashboards, daily reporting, and analytics built for Admord's call operations.
          </p>
        </div>
        <div className="text-[11px] text-sidebar-foreground/40">© {new Date().getFullYear()} Admord Global Multiservices</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Admord Global Multiservices
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Sign in to APMS</h1>
            <p className="text-sm text-muted-foreground">Choose your role to continue. Email/password is a placeholder until the auth API is connected.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <Input
              type="email"
              placeholder="you@admordglobal.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Sign in as</label>
            <div className="grid gap-2">
              {ROLE_CARDS.map((r) => {
                const Icon = r.icon;
                const active = role === r.value;
                return (
                  <button
                    type="button"
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                      active
                        ? "border-primary bg-primary-soft/50 ring-1 ring-primary"
                        : "border-border hover:bg-muted/40",
                    )}
                  >
                    <div className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-md",
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">{r.title}</div>
                      <div className="text-xs text-muted-foreground">{r.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button type="submit" className="w-full h-10">
            Continue to dashboard <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
