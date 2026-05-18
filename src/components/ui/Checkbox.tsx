import { type InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({ className = "", label, id, ...props }: CheckboxProps) {
  const cid = id ?? props.name;
  return (
    <label
      htmlFor={cid}
      className={["flex cursor-pointer items-start gap-3 text-sm text-slate-700", className].join(
        " ",
      )}
    >
      <input
        id={cid}
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
