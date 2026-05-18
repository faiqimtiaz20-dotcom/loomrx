import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export function SessionExpiredPage() {
  const { logout } = useAppState();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface-muted px-4">
      <Card className="w-full max-w-md">
        <CardBody className="space-y-4 p-6 text-center">
          <h1 className="type-h2 text-slate-900">Session expired</h1>
          <p className="text-sm text-slate-600">Please sign in again to continue where you left off.</p>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Sign in
            </Button>
            <Link className="text-sm text-primary hover:underline" to="/support">
              Need help?
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
