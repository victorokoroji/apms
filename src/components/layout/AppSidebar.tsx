"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  UserCog,
  BarChart3,
  PieChart,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";
import { useAuth, useAuthedUser, ROLE_LABELS } from "@/lib/store";
import { initials } from "@/lib/format";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/daily-report", label: "Daily Reports", icon: FileText },
  { to: "/teams", label: "Teams", icon: Users, roles: ["ceo", "team_leader"] as const },
  { to: "/employees", label: "Employees", icon: UserCog, roles: ["ceo"] as const },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/analytics", label: "Analytics", icon: PieChart, roles: ["ceo", "team_leader"] as const },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname() ?? "";
  const user = useAuthedUser();
  const logout = useAuth((s) => s.logout);
  const router = useRouter();

  const onLogout = () => {
    logout();
    onNavigate?.();
    router.replace("/login");
  };

  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border/60">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
          A
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold leading-tight truncate">Admord</div>
          <div className="text-[11px] text-sidebar-foreground/60 leading-tight">Performance Suite</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
          Workspace
        </div>
        <ul className="space-y-0.5">
          {NAV.filter((n) => !n.roles || n.roles.includes(user?.role as never)).map((item) => {
            const active = path === item.to || path.startsWith(item.to + "/");
            return (
              <li key={item.to}>
                <Link
                  href={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {active && <ChevronRight className="ml-auto h-4 w-4 text-primary" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border/60 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sidebar-accent text-sm font-semibold">
            {initials(user?.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{user?.name}</div>
            <div className="truncate text-[11px] text-sidebar-foreground/60">
              {ROLE_LABELS[user?.role]}
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="grid h-8 w-8 place-items-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
