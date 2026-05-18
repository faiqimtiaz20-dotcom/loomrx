import { type InputHTMLAttributes } from "react";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Switch({ className = "", label, id, ...props }: SwitchProps) {
  const sid = id ?? props.name;
  return (
    <label
      htmlFor={sid}
      className={["flex cursor-pointer items-center justify-between gap-4 py-2", className].join(
        " ",
      )}
    >
      <span className="text-sm text-slate-700">{label}</span>
      <span className="relative inline-flex h-7 w-12 shrink-0 items-center">
        <input
          id={sid}
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
        <span
          className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
          aria-hidden
        />
        <span className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
