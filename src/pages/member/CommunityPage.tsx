import { tierMeets, useAppState } from "@/contexts/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { CIRCLE_SPACES, TIER_LABELS } from "@/data/mock";
import { circleEmbedUrl, circlePortalUrl } from "@/lib/publicConfig";

export function CommunityPage() {
  const { tier } = useAppState();
  const communityOpen = circlePortalUrl || "https://circle.so";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Community (Circle)"
        description="Discussions, private groups, and peer collaboration are hosted in Circle for Phase 1."
        actions={
          <Button
            variant="primary"
            onClick={() => window.open(communityOpen, "_blank", "noopener,noreferrer")}
          >
            Open Circle
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <p className="type-h4">How access works</p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm text-slate-700">
          <p>
            Your <Badge variant="primary">{TIER_LABELS[tier]}</Badge> plan unlocks the spaces below. If a link fails,
            confirm you are using the same email as LoomRX and allow pop-ups.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Wrong email in Circle → update in Settings or contact support.</li>
            <li>Not added to a private group → open a ticket with your organization name.</li>
          </ul>
          {circlePortalUrl ? (
            <p className="rounded-lg bg-surface-muted/50 p-3 text-xs text-slate-600">
              SSO / deep link: your <span className="font-mono">VITE_CIRCLE_PORTAL_URL</span> is set — use “Open
              Circle” for the handoff.
            </p>
          ) : null}
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {CIRCLE_SPACES.map((space) => {
          const allowed = tierMeets(space.minTier, tier);
          return (
            <Card key={space.id}>
              <CardHeader>
                <p className="type-h4">{space.name}</p>
              </CardHeader>
              <CardBody className="space-y-3">
                <p className="text-xs text-slate-500">
                  Minimum plan: <strong>{TIER_LABELS[space.minTier]}</strong>
                </p>
                <Button
                  variant={allowed ? "primary" : "secondary"}
                  disabled={!allowed}
                  className="w-full"
                  onClick={() => {
                    if (allowed) window.open(communityOpen, "_blank", "noopener,noreferrer");
                  }}
                >
                  {allowed ? "Enter space" : "Upgrade to access"}
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <p className="type-h4">Embed preview (optional)</p>
        </CardHeader>
        <CardBody>
          {circleEmbedUrl ? (
            <div className="aspect-video overflow-hidden rounded-lg border border-border bg-black shadow-card">
              <iframe title="Circle community embed" src={circleEmbedUrl} className="h-full w-full border-0" />
            </div>
          ) : (
            <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border bg-surface-muted p-6 text-sm text-slate-600">
              <p>
                Set <span className="rounded bg-surface-elevated px-1 font-mono text-xs">VITE_CIRCLE_EMBED_URL</span> in
                your <span className="font-mono text-xs">.env</span> (see <span className="font-mono text-xs">.env.example</span>
                ) to mount your Circle iframe here. Use HTTPS embed URLs only.
              </p>
              <p className="text-xs text-slate-500">
                SSO still typically requires a backend token exchange — this shell only renders the embed surface.
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
