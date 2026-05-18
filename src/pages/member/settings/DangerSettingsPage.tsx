import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

export function DangerSettingsPage() {
  const { logout } = useAppState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");

  return (
    <Card>
      <CardBody className="max-w-xl space-y-4">
        <div>
          <p className="type-h3 text-red-700">Danger zone</p>
          <p className="text-sm text-slate-600">Deleting your account removes access to Circle and downloads.</p>
        </div>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete account…
        </Button>
      </CardBody>
      <Modal
        open={open}
        title="Delete account?"
        description="This cannot be undone. Type DELETE to confirm (demo)."
        onClose={() => setOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={confirm !== "DELETE"}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Delete (demo)
            </Button>
          </div>
        }
      >
        <Input label="Confirmation" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </Modal>
    </Card>
  );
}
