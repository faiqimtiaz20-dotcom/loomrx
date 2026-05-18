import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export function SubscriptionInactivePage() {
  const { user, subscriptionStatus, setSubscriptionStatus, logout } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
    else if (subscriptionStatus === "active") navigate("/dashboard", { replace: true });
  }, [user, subscriptionStatus, navigate]);

  if (!user || subscriptionStatus === "active") return null;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface-muted px-4">
      <Card className="w-full max-w-lg">
        <CardBody className="space-y-4 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Subscription inactive</p>
          <h1 className="type-h1 text-slate-900">Your membership is canceled</h1>
          <p className="text-sm text-slate-600">
            You no longer have access to member areas (roadmap: not entitled). Restore billing to continue, or contact
            support if this is a mistake.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => {
                setSubscriptionStatus("active");
                navigate("/dashboard", { replace: true });
              }}
            >
              Reactivate (demo)
            </Button>
            <Button variant="secondary" onClick={() => window.open("https://stripe.com", "_blank")}>
              Open billing portal
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link className="text-primary hover:underline" to="/support">
              Contact support
            </Link>
            <span className="text-slate-500">Billing self-serve: use the portal button above (in-app billing is locked while inactive).</span>
          </div>
          <Button variant="ghost" className="text-slate-600" onClick={() => logout()}>
            Sign out
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
