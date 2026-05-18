import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export function OnboardingWelcomePage() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step 1 of 5</p>
        <h1 className="mt-2 type-h1 text-slate-900">Welcome to LoomRX</h1>
        <p className="mt-3 text-sm text-slate-600 text-balance">
          A calm, systems-first workspace for healthcare operators: AI copilots for business work, curated
          resources, and a Circle-powered community — gated to your membership tier.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Operational templates, SOP starters, and training paths</li>
          <li>Private peer groups mapped to your plan</li>
          <li>AI tuned for healthcare business context (not clinical advice)</li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={() => navigate("/onboarding/profile")}>Continue</Button>
          <Link
            to="/login"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg px-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Exit to sign in
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
