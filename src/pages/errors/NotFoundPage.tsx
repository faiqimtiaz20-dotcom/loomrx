import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="mt-2 type-display text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">The link may be broken or the page was moved.</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
        >
          Marketing site
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm hover:opacity-95"
        >
          Open app
        </Link>
      </div>
    </div>
  );
}
