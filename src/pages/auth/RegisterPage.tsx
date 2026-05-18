import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAppState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      setError("Please accept the terms to continue.");
      return;
    }
    if (!name || !email || !password) {
      setError("Fill in all required fields.");
      return;
    }
    setError("");
    register({
      id: `u-${Math.random().toString(36).slice(2, 8)}`,
      email,
      name,
      timezone: "America/Chicago",
    });
    navigate("/onboarding/welcome", { replace: true });
  };

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <h1 className="type-h2 text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-600">Start your LoomRX membership journey.</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input label="Full name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Checkbox
            name="terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            label="I agree to the Terms and Privacy Policy."
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="font-medium text-primary hover:underline" to="/login">
            Sign in
          </Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link className="text-slate-600 hover:text-primary" to="/">
            ← Back to marketing site
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
