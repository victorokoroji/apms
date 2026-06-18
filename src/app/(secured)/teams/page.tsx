import { PageHeader } from "@/components/layout/PageHeader";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";
import { TeamsList } from "./_components/TeamsList";

export const metadata = { title: "Teams · APMS" };

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Teams"
        description="Manage and monitor all teams in the organization."
        actions={<DateRangeFilter />}
      />
      <TeamsList />
    </div>
  );
}
