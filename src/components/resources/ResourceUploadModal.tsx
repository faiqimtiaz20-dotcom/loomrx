import { useState } from "react";
import { Link } from "react-router-dom";
import { tierMeets, useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { UpgradeBanner } from "@/components/ui/UpgradeBanner";
import { useToast } from "@/contexts/ToastContext";
import { useMockUploads } from "@/hooks/useMockUploads";

export function ResourceUploadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const toast = useToast();
  const { tier } = useAppState();
  const { append } = useMockUploads();
  const canUpload = tierMeets("growth", tier);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Operations");

  const submit = () => {
    const t = title.trim();
    if (!t) {
      toast.push("Add a title before submitting (mock).", "danger");
      return;
    }
    append({
      title: t,
      status: "pending",
      note: "",
      updated: new Date().toISOString().slice(0, 10),
    });
    toast.push("Upload queued for moderation (saved to My uploads mock)", "success");
    onClose();
    setTitle("");
    setDescription("");
  };

  return (
    <Modal
      open={open}
      title="Upload resource"
      description="Submit a template or document for admin review before it appears in the library."
      onClose={onClose}
      footer={
        canUpload ? (
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit}>Submit for review</Button>
          </div>
        ) : (
          <div className="flex justify-end">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        )
      }
    >
      {canUpload ? (
        <div className="space-y-4">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {["Operations", "Marketing", "Strategy", "Training"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Input label="File" type="file" />
          <p className="text-xs text-slate-500">
            By uploading you confirm you have rights to share this content. See{" "}
            <Link className="text-primary underline" to="/terms">
              Terms
            </Link>
            .
          </p>
        </div>
      ) : (
        <UpgradeBanner
          title="Uploads require Growth or Enterprise"
          description="Upgrade to submit templates for moderation and publishing."
        />
      )}
    </Modal>
  );
}
