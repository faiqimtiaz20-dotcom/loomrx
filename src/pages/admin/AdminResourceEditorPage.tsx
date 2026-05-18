import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TIER_RANK, type Tier } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockResource } from "@/data/mock";
import { TIER_LABELS } from "@/data/mock";
import { useMockResources } from "@/hooks/useMockResources";

function accessTiersFromMinTier(min: Tier): Record<Tier, boolean> {
  return {
    starter: TIER_RANK.starter >= TIER_RANK[min],
    growth: TIER_RANK.growth >= TIER_RANK[min],
    enterprise: TIER_RANK.enterprise >= TIER_RANK[min],
  };
}

function minTierFromChecks(m: Record<Tier, boolean>): Tier {
  const sel = (["starter", "growth", "enterprise"] as Tier[]).filter((t) => m[t]);
  if (!sel.length) return "enterprise";
  return sel.reduce((a, t) => (TIER_RANK[t] < TIER_RANK[a] ? t : a));
}

export function AdminResourceEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, upsert } = useMockResources();
  const isNew = !id || id === "new";
  const existing = !isNew && id ? resources.find((r) => r.id === id) : undefined;

  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [category, setCategory] = useState(existing?.category ?? "Operations");
  const [type, setType] = useState(existing?.type ?? "PDF");
  const [published, setPublished] = useState(existing?.published !== false);
  const [tiers, setTiers] = useState<Record<Tier, boolean>>(() =>
    existing ? accessTiersFromMinTier(existing.tier as Tier) : { starter: true, growth: true, enterprise: true },
  );

  const tierSummary = useMemo(() => minTierFromChecks(tiers), [tiers]);

  const toggle = (t: Tier) => setTiers((prev) => ({ ...prev, [t]: !prev[t] }));

  const save = () => {
    const minTier = minTierFromChecks(tiers);
    const row: MockResource = {
      id: isNew ? `r-${Date.now()}` : existing!.id,
      title: title.trim() || "Untitled resource",
      description: description.trim() || "—",
      category,
      type,
      tier: minTier,
      updatedAt: new Date().toISOString().slice(0, 10),
      published,
    };
    upsert(row);
    navigate("/admin/resources");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Create resource" : "Edit resource"}
        description="Metadata, tier visibility, and publish state (saved to mock library in this browser)."
        actions={
          <Link
            to="/admin/resources"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
          >
            Cancel
          </Link>
        }
      />
      <Card>
        <CardBody className="max-w-2xl space-y-4">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {["Operations", "Marketing", "Strategy", "Training"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Select label="File type" value={type} onChange={(e) => setType(e.target.value)}>
            {["PDF", "DOCX", "XLSX", "LINK"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Input label="Replace file" type="file" />
          <div>
            <p className="text-sm font-medium text-slate-800">Tier visibility</p>
            <p className="mt-1 text-xs text-slate-500">
              Members need at least the <strong>{TIER_LABELS[tierSummary]}</strong> plan (lowest tier checked) to access
              this asset.
            </p>
            <div className="mt-2 space-y-2">
              {(["starter", "growth", "enterprise"] as Tier[]).map((t) => (
                <Checkbox key={t} checked={tiers[t]} onChange={() => toggle(t)} label={TIER_LABELS[t]} />
              ))}
            </div>
          </div>
          <Checkbox
            name="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            label="Published (visible in member library)"
          />
          <Button onClick={save}>Save to mock library</Button>
        </CardBody>
      </Card>
    </div>
  );
}
