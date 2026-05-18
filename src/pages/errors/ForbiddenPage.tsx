import { Link } from "react-router-dom";

export function ForbiddenPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">403</p>
      <h1 className="mt-2 type-display text-slate-900">Access denied</h1>
      <p className="mt-2 text-sm text-slate-600">
        You don’t have permission to view this area. If you need a different role, ask your organization admin.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link
          to="/dashboard"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Back to dashboard
        </Link>
        <Link
          to="/support"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
}
