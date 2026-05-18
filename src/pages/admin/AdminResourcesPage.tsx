import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Table, TableCards } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { TIER_LABELS } from "@/data/mock";
import type { Tier } from "@/contexts/AppStateContext";
import { useMockResources } from "@/hooks/useMockResources";

const pageSize = 5;

export function AdminResourcesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [tierF, setTierF] = useState<"all" | Tier>("all");
  const [page, setPage] = useState(1);
  const { resources, setPublishedBulk } = useMockResources();

  const categories = ["all", ...Array.from(new Set(resources.map((r) => r.category)))];

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const mq =
        !q ||
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.description.toLowerCase().includes(q.toLowerCase());
      const mc = cat === "all" || r.category === cat;
      const mt = tierF === "all" || r.tier === tierF;
      return mq && mc && mt;
    });
  }, [q, cat, tierF, resources]);

  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [q, cat, tierF]);

  useEffect(() => {
    const max = Math.max(1, Math.ceil(filtered.length / pageSize) || 1);
    if (page > max) setPage(max);
  }, [filtered.length, page]);

  const publishFiltered = (published: boolean) => {
    setPublishedBulk(
      filtered.map((r) => r.id),
      published,
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resources"
        description="Publish, unpublish, and control tier visibility (mock data in this browser)."
        actions={
          <Link
            to="/admin/resources/new"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            New resource
          </Link>
        }
      />
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Search title or description" value={q} onChange={(e) => setQ(e.target.value)} />
          <Select value={cat} onChange={(e) => setCat(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All categories" : c}
              </option>
            ))}
          </Select>
          <Select value={tierF} onChange={(e) => setTierF(e.target.value as "all" | Tier)}>
            <option value="all">All tiers</option>
            <option value="starter">Starter</option>
            <option value="growth">Growth</option>
            <option value="enterprise">Enterprise</option>
          </Select>
        </div>
      </Card>
      <Card className="p-0">
        {!filtered.length ? (
          <p className="p-8 text-center text-sm text-slate-600">No resources match filters.</p>
        ) : (
          <>
            <div className="hidden md:block">
              <Table
                columns={[
                  { key: "title", header: "Title", render: (r) => r.title },
                  { key: "category", header: "Category", render: (r) => r.category },
                  {
                    key: "tier",
                    header: "Tier",
                    render: (r) => <Badge variant="primary">{TIER_LABELS[r.tier]}</Badge>,
                  },
                  {
                    key: "pub",
                    header: "Status",
                    render: (r) => (
                      <Badge variant={r.published === false ? "warning" : "success"}>
                        {r.published === false ? "Draft" : "Live"}
                      </Badge>
                    ),
                  },
                  {
                    key: "actions",
                    header: "",
                    render: (r) => (
                      <Link className="text-primary hover:underline" to={`/admin/resources/${r.id}/edit`}>
                        Edit
                      </Link>
                    ),
                  },
                ]}
                rows={slice}
                empty={<p className="p-6 text-center text-sm text-slate-600">No resources match filters.</p>}
              />
              <div className="border-t border-border px-4 py-3">
                <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
              </div>
            </div>
            <div className="md:hidden">
              <TableCards
                rows={slice}
                renderCard={(r) => (
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-slate-900">{r.title}</p>
                    <p className="text-slate-600">{r.category}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">{TIER_LABELS[r.tier]}</Badge>
                      <Badge variant={r.published === false ? "warning" : "success"}>
                        {r.published === false ? "Draft" : "Live"}
                      </Badge>
                    </div>
                    <Link className="text-primary hover:underline" to={`/admin/resources/${r.id}/edit`}>
                      Edit
                    </Link>
                  </div>
                )}
              />
              <div className="border-t border-border px-4 py-3">
                <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
              </div>
            </div>
          </>
        )}
      </Card>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => publishFiltered(true)} disabled={!filtered.length}>
          Publish all in view (mock)
        </Button>
        <Button variant="secondary" onClick={() => publishFiltered(false)} disabled={!filtered.length}>
          Unpublish all in view (mock)
        </Button>
      </div>
    </div>
  );
}
