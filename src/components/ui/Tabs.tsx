import { type ReactNode, useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const current = items.find((i) => i.id === active) ?? items[0];

  return (
    <div>
      <div
        className="flex gap-1 overflow-x-auto border-b border-border"
        role="tablist"
        aria-label="Tabs"
      >
        {items.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={[
              "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition min-h-[44px]",
              active === t.id
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-800",
            ].join(" ")}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">
        {current?.content}
      </div>
    </div>
  );
}
