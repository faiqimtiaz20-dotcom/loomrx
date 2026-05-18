import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Table, type Column } from "@/components/ui/Table";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/contexts/ToastContext";
import { getActivityForMember, getSubscriptionEventsForMember, type ActivityRow, type SubscriptionEventRow } from "@/data/adminMemberActivity";
import { MOCK_ADMIN_MEMBERS, TIER_LABELS } from "@/data/mock";
import { useMockMemberNotes } from "@/hooks/useMockMemberNotes";

const subCols: Column<SubscriptionEventRow>[] = [
  { key: "at", header: "When", render: (r) => r.at },
  { key: "type", header: "Type", render: (r) => <span className="font-mono text-xs">{r.type}</span> },
  { key: "detail", header: "Detail", render: (r) => r.detail },
];

const actCols: Column<ActivityRow>[] = [
  { key: "at", header: "When", render: (r) => r.at },
  { key: "channel", header: "Channel", render: (r) => r.channel },
  { key: "summary", header: "Summary", render: (r) => r.summary },
];

export function AdminMemberDetailPage() {
  const { id } = useParams();
  const toast = useToast();
  const member = MOCK_ADMIN_MEMBERS.find((m) => m.id === id);
  const { notes, setNotes } = useMockMemberNotes(id);
  const [draft, setDraft] = useState(notes);

  useEffect(() => {
    setDraft(notes);
  }, [notes, id]);

  if (!member) {
    return (
      <div className="space-y-4">
        <PageHeader title="Member not found" />
        <Link to="/admin/members" className="text-primary hover:underline">
          Back to members
        </Link>
      </div>
    );
  }

  const subRows = getSubscriptionEventsForMember(member.id);
  const actRows = getActivityForMember(member.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={member.name}
        description={member.email}
        actions={
          <Link
            to="/admin/members"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
          >
            Back
          </Link>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="type-h4">Subscription</p>
          </CardHeader>
          <CardBody className="space-y-2 text-sm text-slate-700">
            <p>
              Tier: <strong>{TIER_LABELS[member.tier]}</strong>
            </p>
            <p>
              Status: <strong>{member.status}</strong>
            </p>
            <p>Created: {member.createdAt}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <p className="type-h4">Actions</p>
          </CardHeader>
          <CardBody className="space-y-3">
            <Button
              variant="danger"
              onClick={() => toast.push("Suspend queued — wire to admin API in production.", "default")}
            >
              Suspend access
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.push("Invite email queued — wire to mailer in production.", "default")}
            >
              Resend invite
            </Button>
            <Textarea label="Internal notes" placeholder="Support notes…" value={draft} onChange={(e) => setDraft(e.target.value)} />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setNotes(draft);
                toast.push("Notes saved for this member.", "success");
              }}
            >
              Save notes
            </Button>
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <p className="type-h4">Subscription events</p>
          </CardHeader>
          <CardBody>
            <Table columns={subCols} rows={subRows} empty="No billing events in this mock dataset." />
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <p className="type-h4">Product activity (30d)</p>
          </CardHeader>
          <CardBody>
            <Table columns={actCols} rows={actRows} empty="No activity rows." />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
