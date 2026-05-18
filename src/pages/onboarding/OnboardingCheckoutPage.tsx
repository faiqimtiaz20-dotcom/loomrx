import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState, type Tier } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { TIER_LABELS } from "@/data/mock";

export function OnboardingCheckoutPage() {
  const navigate = useNavigate();
  const { tier, interval } = useAppState();
  const [step, setStep] = useState<1 | 2>(1);
  const [cardName, setCardName] = useState("Alex Morgan");
  const [cardNumber, setCardNumber] = useState("4242424242424242");
  const [exp, setExp] = useState("12 / 28");
  const [cvc, setCvc] = useState("123");
  const [busy, setBusy] = useState(false);

  const price: Record<Tier, string> = {
    starter: "$49",
    growth: "$129",
    enterprise: "Custom",
  };

  const onPay = () => {
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      navigate("/onboarding/checkout-success", { replace: true });
    }, 900);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Checkout"
        description="Review your plan and confirm payment (UI simulation — no card processor is called)."
      />
      <Card>
        <CardBody className="space-y-6 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step {step} of 2</p>
          {step === 1 ? (
            <>
              <h1 className="type-h1 text-slate-900">Order summary</h1>
              <div className="rounded-lg border border-border bg-surface-muted/40 p-4 text-sm text-slate-700">
                <p>
                  <strong>Plan:</strong> {TIER_LABELS[tier]}
                </p>
                <p className="mt-1">
                  <strong>Billing cadence:</strong> {interval === "yearly" ? "Yearly" : "Monthly"}
                </p>
                <p className="mt-1">
                  <strong>Due today:</strong> {price[tier]} {tier !== "enterprise" ? (interval === "yearly" ? "/yr" : "/mo") : ""}
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Production: Stripe Checkout or Elements posts a PaymentIntent to your backend. This screen exists so
                UX, validation, and error states can ship before keys are configured.
              </p>
              <Button className="w-full md:w-auto" onClick={() => setStep(2)}>
                Continue to payment
              </Button>
            </>
          ) : (
            <>
              <h1 className="type-h1 text-slate-900">Payment method</h1>
              <Input label="Name on card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
              <Input label="Card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Expiry" value={exp} onChange={(e) => setExp(e.target.value)} />
                <Input label="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button disabled={busy} onClick={onPay}>
                  {busy ? "Processing…" : "Pay & activate"}
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
