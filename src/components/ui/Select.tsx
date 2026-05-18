import { type SelectHTMLAttributes, forwardRef } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, hint, error, id, children, ...props }, ref) => {
    const autoId = id ?? props.name;
    return (
      <div className="space-y-1.5">
        {label ? (
          <label htmlFor={autoId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={autoId}
          className={[
            "block w-full min-h-[44px] rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            error && "border-red-400",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </select>
        {hint && !error ? <p className="text-xs text-slate-500">{hint}</p> : null}
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  },
);
Select.displayName = "Select";
