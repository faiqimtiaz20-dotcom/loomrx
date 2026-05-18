import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useMockNotifications } from "@/hooks/useMockNotifications";

export function NotificationsPopover() {
  const { items, unreadCount, markAllRead, markRead } = useMockNotifications();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated text-slate-600 hover:bg-surface-muted hover:text-slate-900"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden>🔔</span>
        {unreadCount > 0 ? (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-surface-elevated" />
        ) : null}
      </button>
      {open ? (
        <div
          className="absolute right-0 z-[70] mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border border-border bg-surface-elevated py-2 shadow-card"
          role="menu"
        >
          <div className="flex items-center justify-between border-b border-border px-3 pb-2">
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            <Button size="sm" variant="ghost" className="min-h-0 px-2 py-1 text-xs" onClick={() => markAllRead()}>
              Mark all read
            </Button>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {items.map((n) => (
              <button
                key={n.id}
                type="button"
                className={[
                  "w-full border-b border-border px-3 py-2.5 text-left text-sm last:border-b-0 hover:bg-surface-muted/60",
                  n.read ? "text-slate-600" : "bg-primary/5 font-medium text-slate-900",
                ].join(" ")}
                onClick={() => {
                  markRead(n.id);
                }}
              >
                <p className="text-xs text-slate-500">{n.at}</p>
                <p className="mt-0.5">{n.title}</p>
                <p className="mt-1 text-xs font-normal text-slate-600">{n.body}</p>
              </button>
            ))}
          </div>
          <div className="border-t border-border px-3 pt-2">
            <Link to="/settings/notifications" className="text-xs font-medium text-primary hover:underline" onClick={() => setOpen(false)}>
              Notification settings
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
