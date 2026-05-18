import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { NotificationsPopover } from "@/components/layout/NotificationsPopover";
import { Badge } from "@/components/ui/Badge";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/DropdownMenu";
import { TIER_LABELS } from "@/data/mock";

export function TopBar({
  title,
  breadcrumbs,
  onMenuClick,
}: {
  title: string;
  breadcrumbs?: { label: string; to?: string }[];
  onMenuClick?: () => void;
}) {
  const { user, tier, logout, setSessionExpired, role, setRole } = useAppState();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-elevated/90 backdrop-blur">
      <div className="flex min-h-[3.25rem] items-center gap-3 px-4 py-2.5 md:px-6">
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated text-slate-700 shadow-sm md:hidden"
          aria-label="Open navigation"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <div className="min-w-0 flex-1 self-center">
          {breadcrumbs?.length ? (
            <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1">
                {breadcrumbs.map((b, i) => (
                  <li key={`${b.label}-${i}`} className="flex items-center gap-1">
                    {i > 0 ? <span aria-hidden>/</span> : null}
                    {b.to ? (
                      <Link className="hover:text-primary" to={b.to}>
                        {b.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-slate-700">{b.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <h1 className="type-h3 truncate leading-tight">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="primary" className="shrink-0 sm:hidden">
            {TIER_LABELS[tier]}
          </Badge>
          <div className="sm:hidden">
            <NotificationsPopover />
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <NotificationsPopover />
            <Badge variant="primary" className="shrink-0">
              {TIER_LABELS[tier]}
            </Badge>
          </div>
          <DropdownMenu
            align="right"
            trigger={
              <>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {user?.name
                    ?.split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() ?? "?"}
                </span>
                <span className="hidden min-w-0 flex-1 text-left lg:block">
                  <span className="block truncate font-medium">{user?.name}</span>
                  <span className="block truncate text-xs text-slate-500">{user?.email}</span>
                </span>
                <span className="shrink-0 text-slate-400">▾</span>
              </>
            }
          >
            <div className="px-1 py-1">
              <DropdownMenuItem onClick={() => navigate("/settings/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/billing")}>Billing</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole(role === "admin" ? "member" : "admin")}>
                {role === "admin" ? "Exit admin role (demo)" : "Become admin (demo)"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSessionExpired(true)}>Demo: session expired</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
            </div>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
