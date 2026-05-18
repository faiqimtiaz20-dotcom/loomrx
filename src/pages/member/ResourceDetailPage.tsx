import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tierMeets, useAppState, type Tier } from "@/contexts/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { FeatureGate } from "@/components/ui/FeatureGate";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Spinner } from "@/components/ui/Spinner";
import { useMockResources } from "@/hooks/useMockResources";
import { TIER_LABELS } from "@/data/mock";
import { useToast } from "@/contexts/ToastContext";
import { LS_RESOURCE_TERMS } from "@/lib/mockPersistence";
import { useMockRecentResources } from "@/hooks/useMockRecentResources";

export function ResourceDetailPage() {
  const { id } = useParams();
  const { tier } = useAppState();
  const toast = useToast();
  const { resources } = useMockResources();
  const resource = id ? resources.find((r) => r.id === id) : undefined;
  const { record } = useMockRecentResources();
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!resource || resource.published === false) return;
    record(resource.id, resource.title);
  }, [resource?.id, resource?.title, resource?.published, record]);

  if (!resource) {
    return (
      <div className="space-y-4">
        <PageHeader title="Resource not found" description="The link may be outdated." />
        <Link
          to="/resources"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
        >
          Back to library
        </Link>
      </div>
    );
  }

  if (resource.published === false) {
    return (
      <div className="space-y-4">
        <PageHeader title="Resource unavailable" description="This item has been unpublished by an administrator." />
        <Link
          to="/resources"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
        >
          Back to library
        </Link>
      </div>
    );
  }

  const locked = !tierMeets(resource.tier as Tier, tier);

  const startDownload = () => {
    setDownloading(true);
    window.setTimeout(() => {
      setDownloading(false);
      toast.push("Download started (demo)", "success");
    }, 600);
  };

  const onDownloadClick = () => {
    if (typeof localStorage !== "undefined" && localStorage.getItem(LS_RESOURCE_TERMS) === "1") {
      startDownload();
      return;
    }
    setTermsAccepted(false);
    setTermsOpen(true);
  };

  const confirmTermsAndDownload = () => {
    if (!termsAccepted) return;
    localStorage.setItem(LS_RESOURCE_TERMS, "1");
    setTermsOpen(false);
    startDownload();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={resource.title}
        description={resource.description}
        actions={
          <Link
            to="/resources"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
          >
            Back
          </Link>
        }
      />

      <Modal
        open={termsOpen}
        title="Resource download terms"
        description="One-time acknowledgment before your first download in this browser."
        onClose={() => setTermsOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setTermsOpen(false)}>
              Cancel
            </Button>
            <Button disabled={!termsAccepted} onClick={confirmTermsAndDownload}>
              Accept & download
            </Button>
          </div>
        }
      >
        <Checkbox
          name="termsDl"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          label="I agree to use this resource in compliance with my organization’s policies and applicable law."
        />
      </Modal>

      {locked ? (
        <FeatureGate
          requiredTier={resource.tier as Tier}
          title={`${TIER_LABELS[resource.tier as Tier]} content`}
          description="Upgrade your membership to download this asset and unlock related Circle spaces."
        />
      ) : (
        <Card>
          <CardBody className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">{resource.category}</Badge>
              <Badge variant="primary">{resource.type}</Badge>
            </div>
            <p className="text-sm text-slate-600">
              Demo file — in production this would open a secure viewer or start a tracked download.
            </p>
            <Button onClick={onDownloadClick} disabled={downloading}>
              {downloading ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner /> Preparing…
                </span>
              ) : (
                "Download"
              )}
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
