import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Table, TableCards } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { MOCK_ADMIN_MEMBERS, TIER_LABELS } from "@/data/mock";

export function AdminMembersPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return MOCK_ADMIN_MEMBERS.filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q.toLowerCase()) ||
        m.email.toLowerCase().includes(q.toLowerCase()),
    );
  }, [q]);

  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <PageHeader title="Members" description="Search, inspect, and take limited actions (demo data)." />
      <Input placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="hidden md:block">
        <Table
          columns={[
            { key: "name", header: "Name", render: (m) => m.name },
            { key: "email", header: "Email", render: (m) => m.email },
            {
              key: "tier",
              header: "Tier",
              render: (m) => <Badge variant="primary">{TIER_LABELS[m.tier]}</Badge>,
            },
            {
              key: "status",
              header: "Status",
              render: (m) => (
                <Badge variant={m.status === "active" ? "success" : "danger"}>{m.status}</Badge>
              ),
            },
            { key: "created", header: "Created", render: (m) => m.createdAt },
            {
              key: "actions",
              header: "",
              render: (m) => (
                <Link className="text-primary hover:underline" to={`/admin/members/${m.id}`}>
                  View
                </Link>
              ),
            },
          ]}
          rows={slice}
        />
        <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
      </div>
      <div className="md:hidden">
        <TableCards
          rows={slice}
          renderCard={(m) => (
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-slate-900">{m.name}</p>
              <p className="text-slate-600">{m.email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">{TIER_LABELS[m.tier]}</Badge>
                <Badge variant={m.status === "active" ? "success" : "danger"}>{m.status}</Badge>
              </div>
              <Link className="text-primary hover:underline" to={`/admin/members/${m.id}`}>
                Open detail
              </Link>
            </div>
          )}
        />
        <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
      </div>
    </div>
  );
}
