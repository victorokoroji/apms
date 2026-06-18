import { PageHeader } from "@/components/layout/PageHeader";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";
import { AnalyticsBoard } from "./_components/AnalyticsBoard";

export const metadata = { title: "Analytics · APMS" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Deep insights into revenue, conversion, and team performance."
        actions={<DateRangeFilter />}
      />
      <AnalyticsBoard />
    </div>
  );
}
