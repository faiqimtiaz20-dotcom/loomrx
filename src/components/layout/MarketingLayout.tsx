import { Link, Outlet } from "react-router-dom";

export function MarketingLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-muted text-slate-900">
      <header className="sticky top-0 z-50 border-b border-border bg-surface-elevated/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="type-h4 text-primary">
            LoomRX
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#features" className="hover:text-primary">
              Platform
            </a>
            <a href="#pricing" className="hover:text-primary">
              Pricing
            </a>
            <Link to="/support" className="hover:text-primary">
              Support
            </Link>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/login"
              className="inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-slate-800 hover:text-primary"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-surface-elevated py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-semibold text-slate-900">LoomRX</p>
            <p className="mt-1 max-w-sm">Healthcare business operations — AI, resources, and community in one membership.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Legal</span>
              <Link className="hover:text-primary" to="/terms">
                Terms
              </Link>
              <Link className="hover:text-primary" to="/privacy">
                Privacy
              </Link>
              <Link className="hover:text-primary" to="/ai-disclaimer">
                AI disclaimer
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">App</span>
              <Link className="hover:text-primary" to="/login">
                Sign in
              </Link>
              <Link className="hover:text-primary" to="/register">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
