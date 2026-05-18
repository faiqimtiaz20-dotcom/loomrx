import { NavLink, useLocation } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { SidebarUserPanel } from "@/components/layout/SidebarUserPanel";

export type NavItem = {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
};

const memberNav: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: "⌂", end: true },
  { to: "/ai", label: "AI Assistant", icon: "✦" },
  { to: "/resources", label: "Resources", icon: "▤" },
  { to: "/community", label: "Community", icon: "◎" },
  { to: "/billing", label: "Billing", icon: "◈" },
  { to: "/settings/profile", label: "Settings", icon: "⚙" },
];

const adminNav: NavItem[] = [
  { to: "/admin", label: "Overview", icon: "▣", end: true },
  { to: "/admin/members", label: "Members", icon: "👥" },
  { to: "/admin/resources", label: "Resources", icon: "📚" },
  { to: "/admin/moderation", label: "Moderation", icon: "🛡" },
  { to: "/admin/ai", label: "AI & knowledge", icon: "🧠" },
  { to: "/admin/circle-mapping", label: "Circle mapping", icon: "🔗" },
];

function NavList({
  items,
  collapsed,
  onNavigate,
}: {
  items: NavItem[];
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const location = useLocation();
  return (
    <nav className="space-y-1 px-2" aria-label="Primary">
      {items.map((item) => {
        const active =
          item.end === true
            ? location.pathname === item.to
            : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={[
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition min-h-[44px]",
              active
                ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/15"
                : "text-slate-600 hover:bg-surface-muted hover:text-slate-900",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-base",
                active ? "border-primary/30 bg-white" : "border-border bg-surface-elevated",
              ].join(" ")}
              aria-hidden
            >
              {item.icon}
            </span>
            {!collapsed ? <span className="truncate">{item.label}</span> : null}
            {collapsed ? <span className="sr-only">{item.label}</span> : null}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function SidebarContent({
  collapsed,
  variant,
  onNavigate,
  omitUserFooter,
  onToggleCollapse,
}: {
  collapsed: boolean;
  variant: "member" | "admin";
  onNavigate?: () => void;
  omitUserFooter?: boolean;
  onToggleCollapse?: () => void;
}) {
  const { role } = useAppState();
  const isAdmin = role === "admin";

  const collapseBtn = onToggleCollapse ? (
    <button
      type="button"
      onClick={onToggleCollapse}
      className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-surface-muted hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? "⟩" : "⟨"}
    </button>
  ) : null;

  if (variant === "admin") {
    return (
      <div className="flex h-full flex-col">
        <div className="flex min-h-[3.25rem] items-center justify-between gap-2 border-b border-border px-3 py-2.5 md:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-white">
              AD
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="type-h4 text-sm">Admin console</p>
                <p className="text-xs text-slate-500">LoomRX operations</p>
              </div>
            ) : null}
          </div>
          {collapseBtn}
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex items-center gap-2 px-4 pb-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Admin</p>
            <Badge variant="warning" className="normal-case">
              Staff
            </Badge>
          </div>
          <NavList items={adminNav} collapsed={collapsed} onNavigate={onNavigate} />
        </div>
        <div className="mt-auto space-y-2 border-t border-border px-3 py-4 text-xs text-slate-500">
          {!collapsed ? (
            <div className="flex flex-col gap-1 px-1">
              <NavLink className="hover:text-primary" to="/dashboard" onClick={onNavigate}>
                ← Back to app
              </NavLink>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-[3.25rem] items-center justify-between gap-2 border-b border-border px-3 py-2.5 md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            LR
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="type-h4 text-sm">LoomRX</p>
              <p className="text-xs text-slate-500">Healthcare growth workspace</p>
            </div>
          ) : null}
        </div>
        {collapseBtn}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <p className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>
        <NavList items={memberNav} collapsed={collapsed} onNavigate={onNavigate} />

        {isAdmin ? (
          <div className="mt-6">
            <div className="flex items-center gap-2 px-4 pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Admin</p>
              <Badge variant="warning" className="normal-case">
                Staff
              </Badge>
            </div>
            <NavList items={adminNav} collapsed={collapsed} onNavigate={onNavigate} />
          </div>
        ) : null}
      </div>

      <div className="mt-auto space-y-2 border-t border-border px-3 py-4 text-xs text-slate-500">
        {!omitUserFooter ? <SidebarUserPanel collapsed={collapsed} onNavigate={onNavigate} /> : null}
        {!collapsed ? (
          <div className="flex flex-col gap-1 px-1">
            <NavLink className="hover:text-primary" to="/support" onClick={onNavigate}>
              Help & support
            </NavLink>
            <NavLink className="hover:text-primary" to="/terms" onClick={onNavigate}>
              Terms
            </NavLink>
            <NavLink className="hover:text-primary" to="/privacy" onClick={onNavigate}>
              Privacy
            </NavLink>
            <NavLink className="hover:text-primary" to="/ai-disclaimer" onClick={onNavigate}>
              AI disclaimer
            </NavLink>
            <span className="pt-1 text-[10px] text-slate-400">UI v0.1 · Phase 1 MVP</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SidebarRail({
  collapsed,
  onToggle,
  variant,
}: {
  collapsed: boolean;
  onToggle: () => void;
  variant: "member" | "admin";
}) {
  return (
    <aside
      className={[
        "hidden h-full shrink-0 border-r border-border bg-surface-elevated shadow-shell md:flex md:flex-col",
        collapsed ? "w-[72px]" : "w-[272px]",
      ].join(" ")}
      aria-label="Sidebar"
    >
      <SidebarContent
        collapsed={collapsed}
        variant={variant}
        onToggleCollapse={onToggle}
      />
    </aside>
  );
}
