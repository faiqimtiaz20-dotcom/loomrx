import { type HTMLAttributes } from "react";

export function Tag({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
