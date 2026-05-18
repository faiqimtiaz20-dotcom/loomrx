import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/contexts/ToastContext";
import { useMockSessions } from "@/hooks/useMockSessions";

export function SecuritySettingsPage() {
  const toast = useToast();
  const { sessions, revoke } = useMockSessions();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");

  return (
    <Card>
      <CardBody className="max-w-xl space-y-4">
        <div>
          <p className="type-h3">Security</p>
          <p className="text-sm text-slate-600">Password rotation and session hygiene (mock).</p>
        </div>
        <Input
          label="Current password"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <Input label="New password" type="password" value={next} onChange={(e) => setNext(e.target.value)} />
        <Button
          onClick={() => {
            if (!current || !next) {
              toast.push("Enter current and new password (mock).", "danger");
              return;
            }
            toast.push("Password updated for this demo session.", "success");
            setCurrent("");
            setNext("");
          }}
        >
          Update password (demo)
        </Button>
        <div className="rounded-lg border border-border bg-surface-muted/40 p-3 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Active sessions</p>
          <ul className="mt-2 space-y-2">
            {sessions.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2 last:border-0 last:pb-0">
                <span>
                  {s.label}
                  {s.current ? (
                    <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                      This device
                    </span>
                  ) : null}
                </span>
                {!s.current ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      revoke(s.id);
                      toast.push("Session revoked (mock).", "success");
                    }}
                  >
                    Revoke
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
