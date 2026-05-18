import { type ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export function Table<T extends { id: string }>({
  columns,
  rows,
  empty,
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: ReactNode;
}) {
  if (!rows.length) {
    return <div className="rounded-xl border border-border bg-surface-elevated p-8 text-center text-sm text-slate-600">{empty ?? "No rows."}</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-surface-muted/80">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={["px-4 py-3 font-semibold text-slate-700", c.className].filter(Boolean).join(" ")}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-surface-muted/40">
                {columns.map((c) => (
                  <td key={c.key} className={["px-4 py-3 text-slate-800", c.className].filter(Boolean).join(" ")}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TableCards<T extends { id: string }>({
  rows,
  renderCard,
}: {
  rows: T[];
  renderCard: (row: T) => ReactNode;
}) {
  return (
    <div className="grid gap-3 md:hidden">
      {rows.map((row) => (
        <div key={row.id} className="rounded-xl border border-border bg-surface-elevated p-4 shadow-sm">
          {renderCard(row)}
        </div>
      ))}
    </div>
  );
}
