"use client";

import { useState } from "react";
import { ChartCard } from "@/components/layout/ChartCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/store";
import { initials } from "@/lib/format";
import { Save, KeyRound } from "lucide-react";

export function SettingsPanels() {
  const { user } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState("Performance enthusiast at Admord Global.");
  const [prefs, setPrefs] = useState({
    emailReports: true,
    weeklyDigest: true,
    teamAlerts: true,
    smsAlerts: false,
  });

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <ChartCard title="Profile" description="Update your personal information.">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                {initials(user.name)}
              </div>
              <Button variant="outline" size="sm">Change photo</Button>
            </div>
            <Separator orientation="vertical" className="hidden md:block h-24" />
            <div className="grid flex-1 gap-3 md:grid-cols-2">
              <Field label="Full name"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
              <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
              <div className="md:col-span-2">
                <Field label="Bio"><Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} /></Field>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button size="sm"><Save className="h-4 w-4" /> Save changes</Button>
          </div>
        </ChartCard>
      </TabsContent>

      <TabsContent value="preferences" className="space-y-4">
        <ChartCard title="Notification preferences" description="Choose what we should keep you informed about.">
          <ul className="divide-y divide-border">
            <PrefRow
              title="Daily report email"
              desc="Receive a summary of submitted daily reports."
              checked={prefs.emailReports}
              onChange={(v) => setPrefs((p) => ({ ...p, emailReports: v }))}
            />
            <PrefRow
              title="Weekly digest"
              desc="A Monday morning recap of last week's performance."
              checked={prefs.weeklyDigest}
              onChange={(v) => setPrefs((p) => ({ ...p, weeklyDigest: v }))}
            />
            <PrefRow
              title="Team alerts"
              desc="Get notified when a team hits a milestone or falls behind."
              checked={prefs.teamAlerts}
              onChange={(v) => setPrefs((p) => ({ ...p, teamAlerts: v }))}
            />
            <PrefRow
              title="SMS alerts"
              desc="Critical alerts via SMS (additional charges may apply)."
              checked={prefs.smsAlerts}
              onChange={(v) => setPrefs((p) => ({ ...p, smsAlerts: v }))}
            />
          </ul>
        </ChartCard>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <ChartCard title="Password" description="Use a strong password you don't use anywhere else.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Current password"><Input type="password" placeholder="••••••••" /></Field>
            <Field label="New password"><Input type="password" placeholder="••••••••" /></Field>
            <Field label="Confirm new password"><Input type="password" placeholder="••••••••" /></Field>
          </div>
          <div className="mt-5 flex justify-end">
            <Button size="sm"><KeyRound className="h-4 w-4" /> Update password</Button>
          </div>
        </ChartCard>
        <ChartCard title="Active sessions" description="Devices currently signed in to your account.">
          <ul className="space-y-2 text-sm">
            <SessionRow device="Chrome on Windows" location="Lagos, NG" time="Active now" current />
            <SessionRow device="Safari on iPhone" location="Lagos, NG" time="2 hours ago" />
            <SessionRow device="Firefox on macOS" location="Abuja, NG" time="Yesterday" />
          </ul>
        </ChartCard>
      </TabsContent>
    </Tabs>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function PrefRow({ title, desc, checked, onChange }: { title: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </li>
  );
}

function SessionRow({ device, location, time, current }: { device: string; location: string; time: string; current?: boolean }) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-border p-3">
      <div>
        <div className="text-sm font-medium">{device} {current && <span className="ml-2 rounded bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold text-success">This device</span>}</div>
        <div className="text-xs text-muted-foreground">{location} · {time}</div>
      </div>
      {!current && <Button variant="outline" size="sm" className="h-8">Sign out</Button>}
    </li>
  );
}
