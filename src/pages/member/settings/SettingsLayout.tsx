import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/settings/profile", label: "Profile" },
  { to: "/settings/security", label: "Security" },
  { to: "/settings/notifications", label: "Notifications" },
  { to: "/settings/danger", label: "Danger zone" },
];

export function SettingsLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="type-h1 text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-600">Account, security, and preferences.</p>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="lg:w-56" aria-label="Settings sections">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    [
                      "block rounded-lg px-3 py-2 text-sm font-medium min-h-[44px] lg:min-h-0",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 hover:bg-surface-muted hover:text-slate-900",
                    ].join(" ")
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
