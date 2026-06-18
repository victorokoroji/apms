import { PageHeader } from "@/components/layout/PageHeader";
import { DailyReportForm } from "./_components/DailyReportForm";
import { DailyReportHistory } from "./_components/DailyReportHistory";

export const metadata = { title: "Daily Reports · APMS" };

export default function DailyReportPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Daily reports"
        description="Submit today's performance and review past submissions."
      />
      <DailyReportForm />
      <DailyReportHistory />
    </div>
  );
}
