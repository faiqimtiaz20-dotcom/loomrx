import { Card, CardBody } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";

export function NotificationsSettingsPage() {
  return (
    <Card>
      <CardBody className="max-w-xl space-y-1 divide-y divide-border">
        <div>
          <p className="type-h3">Notifications</p>
          <p className="pb-3 text-sm text-slate-600">Email preferences (UI stub).</p>
        </div>
        <Switch name="billing" defaultChecked label="Billing & receipts" />
        <Switch name="product" defaultChecked label="Product updates" />
        <Switch name="community" label="Community digest" />
      </CardBody>
    </Card>
  );
}
