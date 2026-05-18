import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    cadence: "/mo",
    blurb: "Foundations for solo operators and small teams.",
    bullets: ["AI assistant (capped)", "Core resource library", "Community lounge"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$129",
    cadence: "/mo",
    blurb: "Scaling clinics operationalizing playbooks.",
    bullets: ["Higher AI limits", "Growth resource packs", "Private Growth Lab"],
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Let’s talk",
    cadence: "",
    blurb: "Multi-location operators and advanced collaboration.",
    bullets: ["Top AI tier", "Executive roundtable", "Priority support"],
  },
];

export function LandingPage() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-surface-muted px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Badge variant="primary" className="mb-4">
            Phase 1 MVP
          </Badge>
          <h1 className="type-display text-balance text-slate-900">Run the business side of care — with clarity.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-slate-600">
            LoomRX brings together an operations-focused AI assistant, a gated resource library, and a Circle-powered
            community — matched to your membership tier.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register">
              <Button className="min-h-[48px] px-8">Start membership</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="min-h-[48px] px-8">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="type-h2 text-center text-slate-900">What you get</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Everything in one workspace — designed for owners and operators, not clinical decision-making inside the AI.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "AI assistant",
              body: "SOP outlines, marketing drafts, ops checklists, and workflow ideas — with guardrails and usage limits by tier.",
            },
            {
              title: "Resource library",
              body: "Templates, training packs, and downloadable assets. Visibility follows your plan so upgrades feel worthwhile.",
            },
            {
              title: "Community (Circle)",
              body: "Tier-mapped spaces for peer learning. Embed or SSO handoff when your integration keys are configured.",
            },
          ].map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <p className="type-h4">{f.title}</p>
              </CardHeader>
              <CardBody className="text-sm text-slate-600">{f.body}</CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-y border-border bg-surface-elevated px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="type-h2 text-center text-slate-900">Pricing</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
            Pick a starting tier during signup. Production billing uses your payment provider; this site ships the full
            checkout UI as a guided mock.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.id}
                className={p.highlight ? "border-primary ring-2 ring-primary/20 shadow-card" : ""}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <p className="type-h3">{p.name}</p>
                    {p.highlight ? <Badge variant="primary">Popular</Badge> : null}
                  </div>
                  <p className="mt-2 type-h2 text-slate-900">
                    {p.price}
                    {p.cadence ? <span className="text-base font-normal text-slate-500">{p.cadence}</span> : null}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{p.blurb}</p>
                </CardHeader>
                <CardBody className="space-y-4">
                  <ul className="list-disc space-y-1 pl-4 text-sm text-slate-700">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <Link to="/register" className="block">
                    <Button className="w-full" variant={p.highlight ? "primary" : "secondary"}>
                      Choose {p.name}
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-20">
        <h2 className="type-h2 text-slate-900">Ready to join?</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-600">Create your account, pick a plan, and complete checkout.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/register">
            <Button className="min-h-[48px] px-8">Create account</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="min-h-[48px] px-8">
              Already a member?
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
