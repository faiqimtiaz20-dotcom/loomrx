import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { CIRCLE_SPACES, TIER_LABELS } from "@/data/mock";
import type { Tier } from "@/contexts/AppStateContext";

const tiers: Tier[] = ["starter", "growth", "enterprise"];

export function AdminCircleMappingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Circle mapping"
        description="Matrix of membership tiers vs Circle spaces. Provisioning runbook for semi-automated flows."
      />
      <Card>
        <CardHeader>
          <p className="type-h4">Tier × space access</p>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-border bg-surface-muted px-3 py-2 text-left">Space</th>
                {tiers.map((t) => (
                  <th key={t} className="border border-border bg-surface-muted px-3 py-2 text-center">
                    {TIER_LABELS[t]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CIRCLE_SPACES.map((space) => (
                <tr key={space.id}>
                  <td className="border border-border px-3 py-2 font-medium text-slate-900">{space.name}</td>
                  {tiers.map((t) => {
                    const tiersOrder: Tier[] = ["starter", "growth", "enterprise"];
                    const ok = tiersOrder.indexOf(t) >= tiersOrder.indexOf(space.minTier);
                    return (
                      <td key={t} className="border border-border px-3 py-2 text-center">
                        {ok ? "✓" : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <p className="type-h4">Provisioning runbook</p>
        </CardHeader>
        <CardBody className="space-y-2 text-sm text-slate-700">
          <ol className="list-decimal space-y-1 pl-5">
            <li>Verify Stripe subscription status = active.</li>
            <li>Match email to Circle member; invite if missing.</li>
            <li>Add user to mapped spaces per matrix above.</li>
            <li>Log action in support notes with ticket ID.</li>
          </ol>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <p className="type-h4">Support macros</p>
        </CardHeader>
        <CardBody className="space-y-2 text-sm">
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
            {`Hi {{name}} — your LoomRX plan includes {{tier}} Circle spaces. Please log into Circle with {{email}}. If access is missing, reply with a screenshot and we’ll sync within 1 business day.`}
          </pre>
        </CardBody>
      </Card>
    </div>
  );
}
