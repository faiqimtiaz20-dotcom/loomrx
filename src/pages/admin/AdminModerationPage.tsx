import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/ui/PageHeader";
import { Table, TableCards } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { MOCK_MODERATION } from "@/data/mock";

const pageSize = 4;

export function AdminModerationPage() {
  const [page, setPage] = useState(1);
  const filtered = MOCK_MODERATION;
  const slice = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page],
  );

  useEffect(() => {
    const max = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (page > max) setPage(max);
  }, [filtered.length, page]);

  const columns = [
    { key: "title", header: "Title", render: (r: (typeof MOCK_MODERATION)[0]) => r.title },
    { key: "submitter", header: "Submitter", render: (r: (typeof MOCK_MODERATION)[0]) => r.submitter },
    { key: "date", header: "Submitted", render: (r: (typeof MOCK_MODERATION)[0]) => r.submittedAt },
    {
      key: "status",
      header: "Status",
      render: (r: (typeof MOCK_MODERATION)[0]) => <Badge variant="warning">{r.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      render: (r: (typeof MOCK_MODERATION)[0]) => (
        <Link className="text-primary hover:underline" to={`/admin/moderation/${r.id}`}>
          Review
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Moderation queue" description="Approve or reject member-submitted assets (mock queue)." />
      {!filtered.length ? (
        <p className="rounded-xl border border-border bg-surface-elevated p-8 text-center text-sm text-slate-600">
          No items in queue.
        </p>
      ) : (
        <>
          <div className="hidden md:block">
            <Table
              columns={columns}
              rows={slice}
              empty={<p className="p-6 text-center text-sm text-slate-600">No items on this page.</p>}
            />
            <div className="mt-3 flex justify-end border-t border-border pt-3">
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
            </div>
          </div>
          <div className="md:hidden">
            <TableCards
              rows={slice}
              renderCard={(r) => (
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-slate-900">{r.title}</p>
                  <p className="text-slate-600">{r.submitter}</p>
                  <p className="text-xs text-slate-500">{r.submittedAt}</p>
                  <Badge variant="warning">{r.status}</Badge>
                  <Link className="text-primary hover:underline" to={`/admin/moderation/${r.id}`}>
                    Review
                  </Link>
                </div>
              )}
            />
            <div className="mt-3 flex justify-end border-t border-border pt-3">
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
