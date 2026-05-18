import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState, type Tier } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const plans: { id: Tier; name: string; blurb: string; bullets: string[] }[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "Foundations for solo operators and small teams.",
    bullets: ["AI assistant (capped)", "Core resource library", "Community — general lounge"],
  },
  {
    id: "growth",
    name: "Growth",
    blurb: "For scaling clinics ready to operationalize playbooks.",
    bullets: ["Higher AI limits", "Growth resource packs", "Private Growth Lab in Circle"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "Multi-location operators and advanced collaboration.",
    bullets: ["Top AI tier", "Enterprise resources", "Executive roundtable + priority support"],
  },
];

export function OnboardingPlanPage() {
  const navigate = useNavigate();
  const { setTier } = useAppState();
  const [selected, setSelected] = useState<Tier>("growth");

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step 3 of 5</p>
        <h1 className="mt-2 type-h1 text-slate-900">Choose your plan</h1>
        <p className="mt-2 text-sm text-slate-600">You can switch later — this sets your starting tier before checkout.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                className={[
                  "rounded-xl border p-4 text-left transition min-h-[44px]",
                  active ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border bg-surface-elevated hover:border-primary/40",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="type-h3">{p.name}</p>
                  {active ? <Badge variant="primary">Selected</Badge> : null}
                </div>
                <p className="mt-2 text-sm text-slate-600">{p.blurb}</p>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-700">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
        <Button
          className="mt-8 w-full md:w-auto"
          onClick={() => {
            setTier(selected);
            navigate("/onboarding/checkout");
          }}
        >
          Continue to checkout
        </Button>
      </CardBody>
    </Card>
  );
}
