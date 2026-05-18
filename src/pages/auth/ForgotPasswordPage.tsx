import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <h1 className="type-h2 text-slate-900">Reset password</h1>
        <p className="mt-1 text-sm text-slate-600">
          If an account exists for this email, you will receive reset instructions.
        </p>
        {sent ? (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Check your inbox for next steps. You can safely close this page.
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        )}
        <p className="mt-4 text-sm">
          <Link className="text-primary hover:underline" to="/login">
            Back to sign in
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
