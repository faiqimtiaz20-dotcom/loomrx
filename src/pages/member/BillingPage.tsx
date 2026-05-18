import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppState, type Tier } from "@/contexts/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Switch } from "@/components/ui/Switch";
import { Tabs } from "@/components/ui/Tabs";
import { TIER_LABELS } from "@/data/mock";
import { useToast } from "@/contexts/ToastContext";

const planCopy: Record<Tier, { priceM: number; priceY: number; bullets: string[] }> = {
  starter: {
    priceM: 49,
    priceY: 490,
    bullets: ["AI (capped)", "Core library", "General Circle lounge"],
  },
  growth: {
    priceM: 129,
    priceY: 1290,
    bullets: ["Higher AI limits", "Growth templates", "Growth Lab in Circle"],
  },
  enterprise: {
    priceM: 329,
    priceY: 3290,
    bullets: ["Top AI tier", "Enterprise assets", "Executive roundtable"],
  },
};

export function BillingPage() {
  const toast = useToast();
  const { tier, interval, setTier, setInterval, subscriptionStatus, setSubscriptionStatus } = useAppState();
  const [confirmPlan, setConfirmPlan] = useState<Tier | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  const price = (t: Tier) => (interval === "monthly" ? planCopy[t].priceM : planCopy[t].priceY);

  const paused = subscriptionStatus === "paused";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & subscription"
        description="Manage your membership, usage summary, and invoices (demo values)."
      />

      <Tabs
        defaultId="current"
        items={[
          {
            id: "current",
            label: "Current plan",
            content: (
              <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Active plan</p>
                    <p className="type-h2 text-slate-900">{TIER_LABELS[tier]}</p>
                  </CardHeader>
                  <CardBody className="space-y-2 text-sm text-slate-700">
                    <p>
                      <Badge variant="default">{interval}</Badge> billing — next renewal (demo){" "}
                      <strong>June 12, 2026</strong>
                    </p>
                    <p>
                      Amount due on renewal: <strong>${price(tier)}</strong>
                    </p>
                    <div className="pt-2">
                      <p className="text-xs font-semibold uppercase text-slate-500">Usage</p>
                      <p>AI messages: 42 / {tier === "starter" ? 80 : tier === "growth" ? 200 : 600}</p>
                      <p>Resource downloads: 18 this month</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <Switch
                        name="pauseBilling"
                        checked={paused}
                        onChange={(e) => setSubscriptionStatus(e.target.checked ? "paused" : "active")}
                        label="Pause subscription (demo — limits access messaging in-app)"
                      />
                      <p className="mt-2 text-xs text-slate-500">
                        Production: maps to Stripe pause collection or manual account flag.
                      </p>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <p className="type-h4">Payment method</p>
                  </CardHeader>
                  <CardBody className="space-y-3 text-sm text-slate-700">
                    <p>Visa •••• 4242 (demo)</p>
                    <Button variant="secondary" onClick={() => window.open("https://stripe.com", "_blank")}>
                      Open customer portal
                    </Button>
                    <p className="text-xs text-slate-500">
                      Production: Stripe Customer Portal or Elements-hosted update flow.
                    </p>
                  </CardBody>
                </Card>
              </div>
            ),
          },
          {
            id: "change",
            label: "Change plan",
            content: (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={interval === "monthly" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setInterval("monthly")}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={interval === "yearly" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setInterval("yearly")}
                  >
                    Yearly
                  </Button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="min-w-full divide-y divide-border text-sm">
                    <thead className="bg-surface-muted/80">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Plan</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Price</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Highlights</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-surface-elevated">
                      {(Object.keys(planCopy) as Tier[]).map((t) => (
                        <tr key={t}>
                          <td className="px-4 py-3 font-medium text-slate-900">{TIER_LABELS[t]}</td>
                          <td className="px-4 py-3 text-slate-700">
                            ${price(t)} / {interval === "monthly" ? "mo" : "yr"}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            <ul className="list-disc pl-4">
                              {planCopy[t].bullets.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              size="sm"
                              variant={t === tier ? "secondary" : "primary"}
                              disabled={t === tier}
                              onClick={() => setConfirmPlan(t)}
                            >
                              {t === tier ? "Current" : "Select"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Card>
                  <CardBody className="text-sm text-slate-700">
                    <p className="font-medium text-slate-900">Proration & timing</p>
                    <p className="mt-1">
                      Upgrades take effect immediately with prorated credit (policy placeholder). Downgrades apply at
                      period end unless otherwise configured.
                    </p>
                  </CardBody>
                </Card>
              </div>
            ),
          },
          {
            id: "invoices",
            label: "Invoices",
            content: (
              <Card>
                <CardBody className="p-0">
                  <table className="min-w-full text-sm">
                    <thead className="bg-surface-muted/80 text-left text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { id: "1", date: "2026-05-01", amount: "$129.00", status: "Paid" },
                        { id: "2", date: "2026-04-01", amount: "$129.00", status: "Paid" },
                      ].map((inv) => (
                        <tr key={inv.id} className="bg-surface-elevated">
                          <td className="px-4 py-3">{inv.date}</td>
                          <td className="px-4 py-3">{inv.amount}</td>
                          <td className="px-4 py-3">{inv.status}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              className="text-primary hover:underline"
                              onClick={() =>
                                toast.push(`Invoice ${inv.date} PDF download started (mock).`, "success")
                              }
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            ),
          },
          {
            id: "cancel",
            label: "Cancel / pause",
            content: (
              <Card>
                <CardBody className="space-y-4 text-sm text-slate-700">
                  <p>
                    Canceling ends member access after the current period. You can also use <strong>Pause</strong> on
                    the Current plan tab to simulate a paused account without canceling.
                  </p>
                  <Button variant="danger" onClick={() => setCancelOpen(true)}>
                    Cancel subscription…
                  </Button>
                  <p className="text-xs text-slate-500">
                    Demo: cancellation sets your account to the inactive state used in the roadmap (not entitled).
                  </p>
                </CardBody>
              </Card>
            ),
          },
        ]}
      />

      <Modal
        open={Boolean(confirmPlan)}
        title="Confirm plan change"
        description="This is a UI demo — no payment processor is called."
        onClose={() => setConfirmPlan(null)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmPlan(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                if (confirmPlan) setTier(confirmPlan);
                setConfirmPlan(null);
              }}
            >
              Apply change (demo)
            </Button>
          </div>
        }
      />

      <Modal
        open={cancelOpen}
        title="Cancel subscription?"
        description="You will lose access to member areas after the period ends. This demo applies cancellation immediately for testing."
        onClose={() => setCancelOpen(false)}
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={() => setCancelOpen(false)}>
              Keep subscription
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setSubscriptionStatus("canceled");
                setCancelOpen(false);
              }}
            >
              Confirm cancel (demo)
            </Button>
          </div>
        }
      >
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Circle access will be removed per your runbook.</li>
          <li>Exports should be completed before the access end date.</li>
          <li>
            Questions?{" "}
            <Link className="text-primary underline" to="/support">
              Contact support
            </Link>
            .
          </li>
        </ul>
      </Modal>
    </div>
  );
}
