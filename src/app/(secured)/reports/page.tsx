import { PageHeader } from "@/components/layout/PageHeader";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";
import { ReportsPanel } from "./_components/ReportsPanel";

export const metadata = { title: "Reports · APMS" };

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Review and export submitted daily reports across the organization."
        actions={<DateRangeFilter />}
      />
      <ReportsPanel />
    </div>
  );
}
