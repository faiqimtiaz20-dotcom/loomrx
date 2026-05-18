import { useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { TIER_LABELS } from "@/data/mock";

export function OnboardingCheckoutSuccessPage() {
  const navigate = useNavigate();
  const { tier, interval, completeOnboarding } = useAppState();

  const go = (path: string) => {
    completeOnboarding();
    navigate(path, { replace: true });
  };

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step 4 of 5</p>
        <h1 className="mt-2 type-h1 text-slate-900">You’re in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Welcome to <strong>{TIER_LABELS[tier]}</strong> on a <strong>{interval}</strong> cadence (demo values).
        </p>
        <p className="mt-4 text-sm font-medium text-slate-800">Next steps — open the app now (skips remaining Circle step for demo):</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Button type="button" variant="secondary" onClick={() => go("/ai")}>
            AI Assistant
          </Button>
          <Button type="button" variant="secondary" onClick={() => go("/resources")}>
            Resources
          </Button>
          <Button type="button" variant="secondary" onClick={() => go("/community")}>
            Community
          </Button>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Prefer to finish Circle setup first?{" "}
          <button type="button" className="font-medium text-primary underline" onClick={() => navigate("/onboarding/circle")}>
            Continue to Circle step
          </button>
        </p>
      </CardBody>
    </Card>
  );
}
