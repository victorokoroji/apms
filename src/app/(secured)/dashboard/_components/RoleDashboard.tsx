"use client";

import { AuthUser, useAuth } from "@/lib/store";
import { CeoDashboard } from "./CeoDashboard";
import { LeaderDashboard } from "./LeaderDashboard";
import { RepDashboard } from "./RepDashboard";

export function RoleDashboard() {
  const { user } = useAuth() as { user: AuthUser };
  if (user.role === "ceo") return <CeoDashboard />;
  if (user.role === "team_leader") return <LeaderDashboard />;
  return <RepDashboard />;
}
