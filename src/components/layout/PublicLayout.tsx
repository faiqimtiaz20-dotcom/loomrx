import { Link, Outlet } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";

export function PublicLayout() {
  const { user } = useAppState();
  return (
    <div className="min-h-dvh bg-surface-muted">
      <header className="border-b border-border bg-surface-elevated">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="type-h4 text-sm">
            LoomRX
          </Link>
          <Link
            to={user ? "/dashboard" : "/login"}
            className="text-sm font-medium text-primary hover:underline"
          >
            {user ? "Back to app" : "Sign in"}
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
