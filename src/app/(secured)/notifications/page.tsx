import { PageHeader } from "@/components/layout/PageHeader";
import { NotificationsList } from "./_components/NotificationsList";

export const metadata = { title: "Notifications · APMS" };

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay on top of activity across teams, reports, and milestones."
      />
      <NotificationsList />
    </div>
  );
}
