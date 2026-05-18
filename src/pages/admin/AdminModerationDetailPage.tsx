import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Textarea } from "@/components/ui/Textarea";
import { MOCK_MODERATION } from "@/data/mock";
import { useToast } from "@/contexts/ToastContext";

export function AdminModerationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();  const item = MOCK_MODERATION.find((m) => m.id === id);

  if (!item) {
    return (
      <div className="space-y-4">
        <PageHeader title="Item not found" />
        <Link to="/admin/moderation" className="text-primary hover:underline">
          Back to queue
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={item.title}
        description={`Submitted ${item.submittedAt} by ${item.submitter}`}
        actions={
          <Link
            to="/admin/moderation"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-surface-elevated px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-surface-muted"
          >
            Back
          </Link>
        }
      />
      <Card>
        <CardHeader>
          <p className="type-h4">Preview</p>
        </CardHeader>
        <CardBody className="text-sm text-slate-600">
          File preview pane — integrate virus scan + PDF viewer in production.
        </CardBody>
      </Card>
      <Textarea label="Rejection reason (optional)" placeholder="Explain to the member…" />
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            toast.push("Approved — member notified (demo)", "success");
            navigate("/admin/moderation");
          }}
        >
          Approve (demo)
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            toast.push("Rejected — member notified with reason (demo)", "success");
            navigate("/admin/moderation");
          }}
        >
          Reject (demo)
        </Button>
      </div>    </div>
  );
}
