import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const invalid = !token || token === "expired";
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  if (invalid) {
    return (
      <Card>
        <CardBody className="p-6 sm:p-8">
          <h1 className="type-h2 text-slate-900">Link invalid or expired</h1>
          <p className="mt-2 text-sm text-slate-600">Request a new reset link from the sign-in page.</p>
          <Button className="mt-6" variant="secondary" onClick={() => navigate("/forgot-password")}>
            Request new link
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <h1 className="type-h2 text-slate-900">Choose a new password</h1>
        {done ? (
          <p className="mt-4 text-sm text-emerald-800">
            Password updated.{" "}
            <Link className="font-medium underline" to="/login">
              Sign in
            </Link>
          </p>
        ) : (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <Input
              label="New password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Update password
            </Button>
          </form>
        )}
      </CardBody>
    </Card>
  );
}
