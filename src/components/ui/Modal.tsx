import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "./Button";

export interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, title, description, onClose, children, footer }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-lg rounded-xl border border-border bg-surface-elevated shadow-shell"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 id="modal-title" className="type-h3">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            ) : null}
          </div>
          <Button variant="ghost" size="sm" className="min-h-[44px] px-2" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
        {children ? <div className="px-5 py-4">{children}</div> : null}
        {footer ? <div className="border-t border-border px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
