"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/layout/ChartCard";
import { fmtNaira } from "@/lib/format";
import { Send, Save } from "lucide-react";

const today = new Date().toISOString().slice(0, 10);

export function DailyReportForm() {
  const [received, setReceived] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const confirmPct = received > 0 ? (confirmed / received) * 100 : 0;

  return (
    <ChartCard
      title="Submit today's report"
      description={`Report date: ${today}`}
      actions={
        <span className="text-xs font-medium text-muted-foreground">
          Confirmation rate: <span className="text-foreground">{confirmPct.toFixed(1)}%</span>
        </span>
      }
    >
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <Field label="Orders received">
          <Input type="number" min={0} value={received} onChange={(e) => setReceived(+e.target.value)} />
        </Field>
        <Field label="Orders confirmed">
          <Input type="number" min={0} max={received} value={confirmed} onChange={(e) => setConfirmed(+e.target.value)} />
        </Field>
        <Field label="Revenue generated (₦)">
          <Input type="number" min={0} value={revenue} onChange={(e) => setRevenue(+e.target.value)} />
          <p className="mt-1 text-[11px] text-muted-foreground">{fmtNaira(revenue)}</p>
        </Field>
        <Field label="Amount loaded (₦)">
          <Input type="number" min={0} value={loaded} onChange={(e) => setLoaded(+e.target.value)} />
          <p className="mt-1 text-[11px] text-muted-foreground">{fmtNaira(loaded)}</p>
        </Field>
        <div className="md:col-span-2">
          <Field label="Notes / blockers">
            <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Describe wins, challenges, or anything your leader should know…" />
          </Field>
        </div>
        <div className="md:col-span-2 flex items-center justify-between gap-3">
          {submitted ? (
            <span className="text-sm font-medium text-success">Report submitted successfully.</span>
          ) : (
            <span className="text-xs text-muted-foreground">Submissions auto-lock after 11:59 PM.</span>
          )}
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" className="h-9">
              <Save className="h-4 w-4" /> Save draft
            </Button>
            <Button type="submit" size="sm" className="h-9">
              <Send className="h-4 w-4" /> Submit report
            </Button>
          </div>
        </div>
      </form>
    </ChartCard>
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
