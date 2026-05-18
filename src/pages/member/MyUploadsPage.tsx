import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Table } from "@/components/ui/Table";
import { useMockUploads } from "@/hooks/useMockUploads";

export function MyUploadsPage() {
  const { uploads } = useMockUploads();

  return (
    <div className="space-y-6">
      <PageHeader
        title="My uploads"
        description="Track moderation status for anything you’ve submitted to the library (mock data in this browser)."
      />
      <Card>
        <CardBody className="p-0 md:p-0">
          <div className="hidden md:block">
            <Table
              columns={[
                { key: "title", header: "Title", render: (r) => r.title },
                {
                  key: "status",
                  header: "Status",
                  render: (r) => (
                    <Badge
                      variant={
                        r.status === "approved" ? "success" : r.status === "rejected" ? "danger" : "warning"
                      }
                    >
                      {r.status}
                    </Badge>
                  ),
                },
                { key: "updated", header: "Updated", render: (r) => r.updated },
                {
                  key: "note",
                  header: "Admin note",
                  render: (r) => <span className="text-slate-600">{r.note || "—"}</span>,
                },
              ]}
              rows={uploads}
            />
          </div>
          <div className="space-y-3 p-4 md:hidden">
            {uploads.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-surface-elevated p-4 shadow-sm">
                <p className="font-medium text-slate-900">{r.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    variant={
                      r.status === "approved" ? "success" : r.status === "rejected" ? "danger" : "warning"
                    }
                  >
                    {r.status}
                  </Badge>
                  <span className="text-xs text-slate-500">{r.updated}</span>
                </div>
                {r.note ? <p className="mt-2 text-sm text-slate-600">Note: {r.note}</p> : null}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
