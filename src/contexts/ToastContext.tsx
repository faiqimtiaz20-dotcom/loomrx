import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastTone = "default" | "success" | "danger";

export interface ToastItem {
  id: string;
  message: string;
  tone?: ToastTone;
}

interface ToastContextValue {
  push: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const uid = useId();
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, tone: ToastTone = "default") => {
    const id = `${uid}-${Math.random().toString(36).slice(2)}`;
    setItems((t) => [...t, { id, message, tone }]);
    window.setTimeout(() => {
      setItems((t) => t.filter((x) => x.id !== id));
    }, 4200);
  }, [uid]);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2"
        aria-live="polite"
        aria-relevant="additions"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={[
              "pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow-card",
              t.tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-900",
              t.tone === "danger" && "border-red-200 bg-red-50 text-red-900",
              (!t.tone || t.tone === "default") &&
                "border-slate-200 bg-surface-elevated text-slate-800",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
