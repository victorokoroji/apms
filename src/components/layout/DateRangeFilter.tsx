"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

export function DateRangeFilter({ defaultValue = "this_week" }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="h-9 w-[180px]">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="today">Today</SelectItem>
        <SelectItem value="yesterday">Yesterday</SelectItem>
        <SelectItem value="this_week">This week</SelectItem>
        <SelectItem value="last_week">Last week</SelectItem>
        <SelectItem value="this_month">This month</SelectItem>
        <SelectItem value="last_month">Last month</SelectItem>
        <SelectItem value="custom">Custom range…</SelectItem>
      </SelectContent>
    </Select>
  );
}
