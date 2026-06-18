import { PageHeader } from "@/components/layout/PageHeader";
import { SettingsPanels } from "./_components/SettingsPanels";

export const metadata = { title: "Settings · APMS" };

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, preferences, and security."
      />
      <SettingsPanels />
    </div>
  );
}
