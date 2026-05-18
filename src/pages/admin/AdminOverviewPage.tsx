import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/contexts/ToastContext";
import { useMockAnnouncements } from "@/hooks/useMockAnnouncements";

const signups = [12, 18, 10, 22, 28, 24, 32];
const aiUsage = [40, 52, 48, 60, 55, 70, 65];

function MiniBars({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(...values, 1);
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-3 flex h-24 items-end gap-1">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-primary/70"
            style={{ height: `${(v / max) * 100}%` }}
            title={`${v}`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">Sample 7-period trend (mock data)</p>
    </div>
  );
}

export function AdminOverviewPage() {
  const toast = useToast();
  const { broadcast } = useMockAnnouncements();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin overview"
        description="Lightweight operational snapshot for LoomRX staff."
      />
      <Card>
        <CardHeader>
          <p className="type-h4">Member announcements</p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm text-slate-700">
          <p className="text-xs text-slate-500">
            Broadcasts appear on member dashboards until dismissed. Stored in this browser&apos;s mock store.
          </p>
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Maintenance window Saturday" />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="ann-body">
              Body
            </label>
            <textarea
              id="ann-body"
              className="block w-full min-h-[88px] rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Short message shown on dashboards…"
            />
          </div>
          <Button
            onClick={() => {
              if (!title.trim() || !body.trim()) {
                toast.push("Enter both title and body.", "danger");
                return;
              }
              broadcast(title.trim(), body.trim());
              setTitle("");
              setBody("");
              toast.push("Announcement published to member dashboards.", "success");
            }}
          >
            Publish announcement
          </Button>
        </CardBody>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "New signups (7d)", value: "128", hint: "Demo metric" },
          { label: "Active subscriptions", value: "412", hint: "Demo metric" },
          { label: "MRR", value: "Coming soon", hint: "Connect Stripe reporting for live MRR" },
        ].map((k) => (
          <Card key={k.label}>
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k.label}</p>
              <p className="type-h2 text-slate-900">{k.value}</p>
            </CardHeader>
            <CardBody className="pt-0 text-xs text-slate-500">{k.hint}</CardBody>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <p className="type-h4">Trends (optional charts)</p>
        </CardHeader>
        <CardBody className="grid gap-8 md:grid-cols-2">
          <MiniBars values={signups} label="Signups" />
          <MiniBars values={aiUsage} label="AI usage (units)" />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <p className="type-h4">System health</p>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-3 text-sm text-slate-700">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800 ring-1 ring-emerald-200">
            API healthy
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-900 ring-1 ring-amber-200">
            Moderation queue: 3 pending
          </span>
        </CardBody>
      </Card>
    </div>
  );
}
