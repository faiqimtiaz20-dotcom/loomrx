import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { login } = useAppState();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";
  const [email, setEmail] = useState("demo@loomrx.health");
  const [password, setPassword] = useState("password");
  const [skipOnboarding, setSkipOnboarding] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter email and password.");
      return;
    }
    if (password === "wrong") {
      setError("Invalid email or password. Please try again.");
      return;
    }
    setError("");
    login(
      {
        id: "u-demo",
        email,
        name: "Alex Morgan",
        org: "Summit Care Group",
        timezone: "America/Chicago",
      },
      { onboardingComplete: skipOnboarding },
    );
    navigate(from.startsWith("/login") ? "/dashboard" : from, { replace: true });
  };

  const oauth = (provider: "google" | "microsoft") => {
    toast.push(
      `Signing in with ${provider === "google" ? "Google" : "Microsoft"} — UI simulation (no external IdP).`,
      "default",
    );
    window.setTimeout(() => {
      login(
        {
          id: `u-${provider}`,
          email: provider === "google" ? "you@gmail.com" : "you@company.com",
          name: provider === "google" ? "Jordan Lee" : "Taylor Singh",
          org: "Connected Health PLLC",
          timezone: "America/Chicago",
        },
        { onboardingComplete: skipOnboarding },
      );
      navigate(from.startsWith("/login") ? "/dashboard" : from, { replace: true });
    }, 450);
  };

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <h1 className="type-h2 text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-600">Welcome back to your LoomRX workspace.</p>
        <div className="mt-4 grid gap-2">
          <Button type="button" variant="secondary" className="w-full" onClick={() => oauth("google")}>
            Continue with Google
          </Button>
          <Button type="button" variant="secondary" className="w-full" onClick={() => oauth("microsoft")}>
            Continue with Microsoft
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-slate-500">or use email</p>
        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error && !email ? error : undefined}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Checkbox
            name="skipOnboarding"
            checked={skipOnboarding}
            onChange={(e) => setSkipOnboarding(e.target.checked)}
            label="Skip onboarding and go straight to the app (try LoomRX faster)"
          />
          {error && email ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link className="text-slate-600 hover:text-primary" to="/">
            ← Back to marketing site
          </Link>
        </p>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <Link className="text-primary hover:underline" to="/forgot-password">
            Forgot password?
          </Link>
          <p className="text-slate-600">
            New here?{" "}
            <Link className="font-medium text-primary hover:underline" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
