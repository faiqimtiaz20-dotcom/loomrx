import { useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/DropdownMenu";
import { TIER_LABELS } from "@/data/mock";

export function SidebarUserPanel({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const { user, tier, role, setRole, logout } = useAppState();
  const navigate = useNavigate();

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const triggerInner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/10 text-xs font-bold text-primary">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </span>
      {!collapsed ? (
        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-sm font-semibold text-slate-900">{user.name}</span>
          <span className="mt-0.5 block">
            <Badge variant="primary" className="text-[10px]">
              {TIER_LABELS[tier]}
            </Badge>
          </span>
        </span>
      ) : null}
      {!collapsed ? <span className="text-slate-400">▾</span> : null}
    </>
  );

  return (
    <div className="w-full border-b border-border px-2 py-3">
      <DropdownMenu
        rootClassName="w-full"
        align="left"
        triggerClassName={
          collapsed
            ? "w-full max-w-none justify-center border-0 bg-transparent px-1 hover:bg-surface-muted"
            : "w-full max-w-none"
        }
        trigger={
          collapsed ? (
            <span className="flex w-full justify-center">{triggerInner}</span>
          ) : (
            <span className="flex w-full items-center gap-2 rounded-lg px-2 py-2 hover:bg-surface-muted min-h-[44px]">
              {triggerInner}
            </span>
          )
        }
      >
        <div className="px-1 py-1">
          <DropdownMenuItem
            onClick={() => {
              navigate("/settings/profile");
              onNavigate?.();
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/billing");
              onNavigate?.();
            }}
          >
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setRole(role === "admin" ? "member" : "admin");
              onNavigate?.();
            }}
          >
            {role === "admin" ? "Exit admin (demo)" : "Become admin (demo)"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              logout();
              onNavigate?.();
            }}
          >
            Sign out
          </DropdownMenuItem>
        </div>
      </DropdownMenu>
    </div>
  );
}
