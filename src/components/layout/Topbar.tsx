"use client";

import { Bell, Menu, Search, LogOut, UserCog } from "lucide-react";
import { useState } from "react";
import type * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "./AppSidebar";
import { useAuth, useAuthedUser, ROLE_LABELS } from "@/lib/store";
import { initials } from "@/lib/format";
import { notifications } from "@/lib/mock";

export function Topbar() {
  const user = useAuthedUser();
  const logout = useAuth((s) => s.logout);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const unread = notifications.filter((n) => !n.read).length;

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/employees?q=${encodeURIComponent(q)}` : "/employees");
  };

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open navigation"
            className="grid h-9 w-9 place-items-center rounded-md border border-border md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AppSidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 max-w-md flex-1">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employees, teams, reports…"
            className="pl-9 bg-background border-border h-9"
            aria-label="Global search"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-accent"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {unread}
            </span>
          )}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Open profile menu"
              className="flex items-center gap-2 rounded-md border border-border px-2 py-1 h-9 hover:bg-accent"
            >
              <div className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {initials(user?.name)}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{user?.name.split(" ")[0]}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="font-normal">
              <div className="text-sm font-semibold text-foreground">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-primary">
                {ROLE_LABELS[user?.role]}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <UserCog className="h-4 w-4" /> Profile &amp; Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="cursor-pointer">
                <Bell className="h-4 w-4" /> Notifications
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onLogout} className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
