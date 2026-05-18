import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "./Button";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export interface DrawerProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  side?: "left" | "right";
}

export function Drawer({ open, title, onClose, children, side = "left" }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const root = panelRef.current;
    const getFocusable = () =>
      Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );
    window.setTimeout(() => {
      const first = getFocusable()[0];
      first?.focus();
    }, 0);

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const list = getFocusable();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    root.addEventListener("keydown", onTab);
    return () => {
      root.removeEventListener("keydown", onTab);
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] md:hidden" aria-modal="true" role="dialog">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={[
          "absolute top-0 flex h-full w-[min(100%,20rem)] flex-col border-border bg-surface-elevated shadow-shell transition-transform duration-200 ease-out translate-x-0",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="type-h4">{title ?? "Menu"}</span>
          <Button variant="ghost" size="sm" className="min-h-[44px] px-2" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
