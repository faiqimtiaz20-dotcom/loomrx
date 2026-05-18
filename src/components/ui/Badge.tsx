import { type HTMLAttributes } from "react";

const styles = {
  default: "bg-slate-100 text-slate-800 border border-border",
  primary: "bg-primary/10 text-primary border border-primary/20",
  success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  warning: "bg-amber-50 text-amber-900 border border-amber-200",
  danger: "bg-red-50 text-red-800 border border-red-200",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof styles;
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        styles[variant],
        className,
      ].join(" ")}
      {...props}
    />
  );
}
