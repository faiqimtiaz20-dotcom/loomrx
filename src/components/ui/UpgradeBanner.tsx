import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function UpgradeBanner({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      </div>
      <Button variant="primary" size="sm" onClick={() => navigate("/billing")}>
        Compare plans
      </Button>
    </div>
  );
}
