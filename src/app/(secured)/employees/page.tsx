import { PageHeader } from "@/components/layout/PageHeader";
import { EmployeesTable } from "./_components/EmployeesTable";

export const metadata = { title: "Employees · APMS" };

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="View, filter, and manage every member of your organization."
      />
      <EmployeesTable />
    </div>
  );
}
