import { type ReactNode } from "react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, icon, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted/40 px-6 py-16 text-center">
      {icon ? <div className="mb-4 text-slate-400">{icon}</div> : null}
      <h3 className="type-h3">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p> : null}
      {actionLabel && onAction ? (
        <Button className="mt-6" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
