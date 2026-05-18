import type { ReactNode } from "react";

/**
 * Composable shell: sidebar + header + scrollable main (roadmap §1.2 `AppShell`).
 */
export function AppShell({
  mainId = "main-content",
  shellClassName = "",
  skipLink,
  sidebar,
  header,
  children,
}: {
  mainId?: string;
  shellClassName?: string;
  skipLink?: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={["flex min-h-dvh bg-surface-muted", shellClassName].filter(Boolean).join(" ")}>
      {skipLink}
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {header}
        <main id={mainId} className="flex-1 px-4 py-6 md:px-8" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
