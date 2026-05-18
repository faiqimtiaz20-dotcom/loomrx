import { useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export function OnboardingCirclePage() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAppState();

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step 5 of 5</p>
        <h1 className="mt-2 type-h1 text-slate-900">Connect to Circle</h1>
        <p className="mt-2 text-sm text-slate-600">
          Community spaces live in Circle. After launch, your membership tier controls which private groups you can
          access. Provisioning may be semi-automated during early access.
        </p>
        <div className="mt-6 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">What happens next</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Open Circle from the Community area after entering the app.</li>
            <li>Use the same email as your LoomRX account.</li>
            <li>If access is missing, contact support with your tier name.</li>
          </ol>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.open("https://circle.so", "_blank", "noopener,noreferrer")}
          >
            Open Circle (demo link)
          </Button>
          <Button
            onClick={() => {
              completeOnboarding();
              navigate("/dashboard", { replace: true });
            }}
          >
            Finish & go to dashboard
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
