import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { tierMeets, useAppState, type Tier } from "@/contexts/AppStateContext";
import { ResourceUploadModal } from "@/components/resources/ResourceUploadModal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tag } from "@/components/ui/Tag";
import { useMockResources } from "@/hooks/useMockResources";
import { TIER_LABELS } from "@/data/mock";

export function ResourcesListPage() {
  const { tier } = useAppState();
  const { resources: mockResources } = useMockResources();
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [fileType, setFileType] = useState("all");
  const [sort, setSort] = useState<"recent" | "title">("title");
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, [q, category, fileType, sort]);

  useEffect(() => {
    if (searchParams.get("upload") === "1") {
      setUploadOpen(true);
      const next = new URLSearchParams(searchParams);
      next.delete("upload");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filtered = useMemo(() => {
    let rows = mockResources.filter((r) => {
      if (r.published === false) return false;
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.description.toLowerCase().includes(q.toLowerCase());
      const matchC = category === "all" || r.category === category;
      const matchT = fileType === "all" || r.type === fileType;
      return matchQ && matchC && matchT;
    });
    rows = [...rows].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      return b.updatedAt.localeCompare(a.updatedAt);
    });
    return rows;
  }, [q, category, fileType, sort, mockResources]);

  const categories = ["all", ...Array.from(new Set(mockResources.map((r) => r.category)))];
  const types = ["all", ...Array.from(new Set(mockResources.map((r) => r.type)))];

  return (
    <div className="space-y-6">
      <ResourceUploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />

      <PageHeader
        title="Resource library"
        description="Templates, SOP starters, workflows, and training assets — visibility follows your tier."
        actions={
          <>
            <Link
              to="/resources/my-uploads"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
            >
              My uploads
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
              onClick={() => setUploadOpen(true)}
            >
              Upload
            </button>
          </>
        }
      />

      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All categories" : c}
              </option>
            ))}
          </Select>
          <Select value={fileType} onChange={(e) => setFileType(e.target.value)}>
            {types.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All file types" : c}
              </option>
            ))}
          </Select>
          <Select value={sort} onChange={(e) => setSort(e.target.value as "recent" | "title")}>
            <option value="title">Sort: Title</option>
            <option value="recent">Sort: Recent</option>
          </Select>
        </div>
      </Card>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-6 w-[72%]" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : !filtered.length ? (
        <EmptyState
          title="No resources match"
          description="Try clearing filters or search keywords."
          actionLabel="Reset filters"
          onAction={() => {
            setQ("");
            setCategory("all");
            setFileType("all");
            setSort("title");
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((r) => {
            const locked = !tierMeets(r.tier as Tier, tier);
            return (
              <Link
                key={r.id}
                to={`/resources/${r.id}`}
                className="group rounded-xl border border-border bg-surface-elevated p-5 shadow-card transition hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="type-h3 group-hover:text-primary">
                      {r.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{r.description}</p>
                    <p className="mt-2 text-xs text-slate-400">Updated {r.updatedAt}</p>
                  </div>
                  {locked ? <Badge variant="warning">Locked</Badge> : null}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Tag>{r.category}</Tag>
                  <Tag>{r.type}</Tag>
                  <Badge variant="primary">{TIER_LABELS[r.tier]} +</Badge>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
