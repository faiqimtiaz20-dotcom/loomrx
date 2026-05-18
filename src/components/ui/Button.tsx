import { type ButtonHTMLAttributes, forwardRef } from "react";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-transparent",
  secondary:
    "bg-surface-elevated text-slate-800 border border-border hover:bg-surface-muted",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent",
  danger: "bg-danger text-danger-foreground hover:bg-danger/90 border border-transparent",
  link: "bg-transparent text-primary underline-offset-4 hover:underline border-0 shadow-none px-0",
} as const;

const sizes = {
  sm: "h-9 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-11 px-5 text-base rounded-lg",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 min-h-[44px] md:min-h-0",
        variants[variant],
        variant !== "link" && sizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  ),
);
Button.displayName = "Button";
