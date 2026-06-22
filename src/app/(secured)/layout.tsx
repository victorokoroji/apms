import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { AuthGuard } from "@/components/guards/AuthGuard";

export default function SecuredLayout({ children }: { children: ReactNode }) {
  return (
    // <AuthGuard>
      <div className="flex min-h-screen bg-background text-foreground">
        <div className="hidden md:flex md:w-64 md:shrink-0 md:border-r md:border-sidebar-border/60">
          <AppSidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-4 py-6 md:px-6 md:py-8">{children}</main>
        </div>
      </div>
    // </AuthGuard>
  );
}
