import { useEffect, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { UpgradeBanner } from "@/components/ui/UpgradeBanner";
import { getAiThreadPreviewLinks, subscribeAiPersist } from "@/lib/aiThreadsStore";
import { TIER_LABELS } from "@/data/mock";
import { useMockAnnouncements } from "@/hooks/useMockAnnouncements";
import { useMockRecentResources } from "@/hooks/useMockRecentResources";

type ChecklistTasks = { profile: boolean; circle: boolean; ai: boolean };

export function DashboardPage() {
  const { user, tier, interval } = useAppState();
  const { visible: announcements, dismiss } = useMockAnnouncements();
  const { recent } = useMockRecentResources();
  const aiPreviews = useSyncExternalStore(subscribeAiPersist, getAiThreadPreviewLinks, getAiThreadPreviewLinks);
  const aiCap = tier === "starter" ? 80 : tier === "growth" ? 200 : 600;
  const aiPct = Math.min(100, Math.round((42 / aiCap) * 100));

  const [checklistDismissed, setChecklistDismissed] = useState(
    () => localStorage.getItem("loomrx-checklist-dismissed") === "1",
  );
  const [tasks, setTasks] = useState<ChecklistTasks>(() => {
    try {
      const raw = localStorage.getItem("loomrx-checklist-tasks");
      if (raw) return JSON.parse(raw) as ChecklistTasks;
    } catch {
      /* ignore */
    }
    return { profile: false, circle: false, ai: false };
  });

  useEffect(() => {
    localStorage.setItem("loomrx-checklist-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const dismissChecklist = () => {
    localStorage.setItem("loomrx-checklist-dismissed", "1");
    setChecklistDismissed(true);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Hello, ${user?.name?.split(" ")[0] ?? "there"}`}
        description="Your healthcare business command center — AI, resources, and community in one place."
        actions={
          <Link
            to="/ai"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
          >
            Open AI
          </Link>
        }
      />

      {tier === "starter" ? (
        <UpgradeBanner
          title="Unlock Growth templates and private Circle labs"
          description="Starter covers foundations — upgrade for deeper playbooks and peer groups."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Plan</p>
            <p className="type-h3">{TIER_LABELS[tier]}</p>
          </CardHeader>
          <CardBody className="pt-0">
            <p className="text-sm text-slate-600">
              Billing cadence: <Badge variant="default">{interval}</Badge>
            </p>
            <p className="mt-2 text-xs text-slate-500">Renewal (demo): June 12, 2026</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">AI usage</p>
            <p className="type-h3">42 / {aiCap} messages</p>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-primary" style={{ width: `${aiPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">Resets on your billing date.</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Announcements</p>
          </CardHeader>
          <CardBody className="max-h-52 space-y-3 overflow-y-auto pt-0 text-sm">
            {announcements.length ? (
              announcements.map((a) => (
                <div key={a.id} className="rounded-lg border border-border bg-surface-muted/30 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-slate-900">{a.title}</p>
                    <button
                      type="button"
                      className="shrink-0 text-xs font-medium text-primary hover:underline"
                      onClick={() => dismiss(a.id)}
                    >
                      Dismiss
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{a.body}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-400">{a.createdAt}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-600">You are caught up — no announcements right now.</p>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className={checklistDismissed ? "lg:col-span-3" : "lg:col-span-2"}>
          <CardHeader>
            <p className="type-h4">Shortcuts</p>
          </CardHeader>
          <CardBody className="grid gap-3 sm:grid-cols-3">
            <Link
              className="rounded-lg border border-border bg-surface-muted/30 p-4 text-sm font-medium text-slate-800 hover:border-primary/40"
              to="/ai"
            >
              AI Assistant
            </Link>
            <Link
              className="rounded-lg border border-border bg-surface-muted/30 p-4 text-sm font-medium text-slate-800 hover:border-primary/40"
              to="/resources"
            >
              Browse resources
            </Link>
            <Link
              className="rounded-lg border border-border bg-surface-muted/30 p-4 text-sm font-medium text-slate-800 hover:border-primary/40"
              to="/community"
            >
              Community (Circle)
            </Link>
          </CardBody>
        </Card>
        {!checklistDismissed ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <p className="type-h4">Getting started</p>
                <button
                  type="button"
                  className="text-xs font-medium text-slate-500 hover:text-primary"
                  onClick={dismissChecklist}
                >
                  Dismiss
                </button>
              </div>
            </CardHeader>
            <CardBody className="space-y-3 text-sm text-slate-700">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary"
                  checked={tasks.profile}
                  onChange={(e) => setTasks((t) => ({ ...t, profile: e.target.checked }))}
                />
                Complete profile details
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary"
                  checked={tasks.circle}
                  onChange={(e) => setTasks((t) => ({ ...t, circle: e.target.checked }))}
                />
                Join your Circle space
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary"
                  checked={tasks.ai}
                  onChange={(e) => setTasks((t) => ({ ...t, ai: e.target.checked }))}
                />
                Run your first AI workflow
              </label>
            </CardBody>
          </Card>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="type-h4">Recent AI threads</p>
          </CardHeader>
          <CardBody className="space-y-2 text-sm">
            {aiPreviews.length ? (
              aiPreviews.map((row) => (
                <Link
                  key={row.id}
                  className="block rounded-lg border border-transparent px-2 py-2 hover:border-border hover:bg-surface-muted/50"
                  to={`/ai?thread=${encodeURIComponent(row.id)}`}
                >
                  {row.title}
                </Link>
              ))
            ) : (
              <p className="text-sm text-slate-600">No AI threads yet — open the assistant to start one.</p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <p className="type-h4">Recently viewed resources</p>
          </CardHeader>
          <CardBody className="space-y-2 text-sm">
            {recent.length ? (
              recent.map((r) => (
                <Link
                  key={r.id}
                  className="block rounded-lg border border-transparent px-2 py-2 text-primary hover:border-border hover:bg-surface-muted/50"
                  to={`/resources/${encodeURIComponent(r.id)}`}
                >
                  <span className="font-medium">{r.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">Viewed {r.at}</span>
                </Link>
              ))
            ) : (
              <p className="text-slate-600">No recent views yet — open a resource from the library.</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
