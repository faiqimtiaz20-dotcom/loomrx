import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { useAppState } from "@/contexts/AppStateContext";
import { useToast } from "@/contexts/ToastContext";

export function VerifyEmailPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAppState();

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <h1 className="type-h2 text-slate-900">Confirm your email</h1>
        <p className="mt-2 text-sm text-slate-600">
          We sent a verification link to your inbox. Pending verification, some features may be limited.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              toast.push("Verification email resent (mock — no email sent).", "success");
            }}
          >
            Resend email
          </Button>
          <Button
            type="button"
            onClick={() => {
              toast.push("Marked as verified for this demo session.", "success");
              navigate(user ? "/dashboard" : "/login", { replace: true });
            }}
          >
            I’ve verified — continue
          </Button>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Wrong address?{" "}
          <Link className="text-primary hover:underline" to="/settings/profile">
            Update profile
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
