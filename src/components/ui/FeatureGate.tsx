import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { tierMeets, type Tier, useAppState } from "@/contexts/AppStateContext";
import { Button } from "./Button";
import { Card, CardBody } from "./Card";

export function FeatureGate({
  requiredTier,
  title,
  description,
  children = null,
}: {
  requiredTier: Tier;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  const { tier } = useAppState();
  const navigate = useNavigate();
  if (tierMeets(requiredTier, tier)) return children;

  return (
    <Card>
      <CardBody className="py-10">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Upgrade required</p>
          <h2 className="mt-2 type-h2 text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
          <Button className="mt-6" onClick={() => navigate("/billing")}>
            View plans & upgrade
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
