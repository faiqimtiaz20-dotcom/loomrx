import { Link } from "react-router-dom";

export function ServerErrorPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">500</p>
      <h1 className="mt-2 type-display text-slate-900">Something went wrong</h1>
      <p className="mt-2 text-sm text-slate-600">Our team has been notified. Please retry shortly.</p>
      <button
        type="button"
        className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
      <Link className="mt-3 text-sm text-primary hover:underline" to="/support">
        Contact support
      </Link>
    </div>
  );
}
