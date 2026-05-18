import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "./Button";

export interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  triggerClassName?: string;
  /** Root wrapper width; use `w-full` in sidebars so `triggerClassName="w-full"` can fill the rail. */
  rootClassName?: string;
}

export function DropdownMenu({
  trigger,
  children,
  align = "right",
  triggerClassName = "",
  rootClassName = "w-auto shrink-0",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={["relative", rootClassName].filter(Boolean).join(" ")} ref={rootRef}>
      <button
        type="button"
        className={[
          "flex max-w-[14rem] items-center gap-2 rounded-lg border border-border bg-surface-muted/60 px-2 py-1.5 text-left text-sm text-slate-800 hover:bg-surface-muted min-h-[44px]",
          triggerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {trigger}
      </button>
      {open ? (
        <div
          className={[
            "absolute z-[70] mt-2 min-w-[12rem] rounded-lg border border-border bg-surface-elevated py-1 shadow-card",
            align === "right" ? "right-0" : "left-0",
          ].join(" ")}
          role="menu"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start rounded-none px-3 py-2.5 text-left text-sm font-normal text-slate-800 hover:bg-surface-muted"
      onClick={onClick}
      role="menuitem"
    >
      {children}
    </Button>
  );
}
