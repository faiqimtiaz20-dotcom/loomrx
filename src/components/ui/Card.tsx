import { type HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "rounded-xl border border-border bg-surface-elevated shadow-card",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={["border-b border-border px-6 py-4", className].join(" ")} {...props} />;
}

export function CardBody({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={["px-6 py-4", className].join(" ")} {...props} />;
}

export function CardFooter({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["border-t border-border px-6 py-4 bg-surface-muted/50", className].join(" ")} {...props} />
  );
}
