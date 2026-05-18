import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/contexts/ToastContext";
import { useMockAdminAi } from "@/hooks/useMockAdminAi";
import { useMockKnowledgeDocs } from "@/hooks/useMockKnowledgeDocs";

export function AdminAiKnowledgePage() {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [stored, setStored] = useMockAdminAi();
  const { docs, addFromFile, remove, reindex } = useMockKnowledgeDocs();
  const [prompt, setPrompt] = useState(stored.prompt);
  const [versionNote, setVersionNote] = useState(stored.versionNote);
  const [test, setTest] = useState("");

  const onPickFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    addFromFile(f);
    toast.push(`Queued “${f.name}” for indexing.`, "success");
  };

  useEffect(() => {
    setPrompt(stored.prompt);
    setVersionNote(stored.versionNote);
  }, [stored.prompt, stored.versionNote]);

  const save = () => {
    setStored({ prompt, versionNote });
    toast.push("Prompt settings saved.", "success");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI & knowledge"
        description="System prompt, disclaimers, and knowledge base documents for retrieval (browser mock store)."
      />
      <Card>
        <CardHeader>
          <p className="type-h4">System prompt & disclaimer</p>
        </CardHeader>
        <CardBody className="space-y-3">
          <Textarea label="Prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={6} />
          <Input
            label="Version note"
            placeholder="e.g. 2026-05-16 tightened PHI guidance"
            value={versionNote}
            onChange={(e) => setVersionNote(e.target.value)}
          />
          <Button onClick={save}>Save prompt</Button>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <p className="type-h4">Knowledge documents</p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm text-slate-700">
          <input ref={fileRef} type="file" className="hidden" onChange={onPickFile} />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
              Upload / add
            </Button>
          </div>
          <ul className="divide-y divide-border rounded-lg border border-border">
            {docs.map((d) => (
              <li key={d.id} className="flex flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-medium text-slate-900">{d.name}</span>
                  <p className="text-xs text-slate-500">
                    {d.status} · {d.updatedAt}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" onClick={() => reindex(d.id)}>
                    Mark indexed
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => remove(d.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <p className="type-h4">Safety test panel</p>
        </CardHeader>
        <CardBody className="space-y-3">
          <Textarea label="Sample user query" value={test} onChange={(e) => setTest(e.target.value)} />
          <Button
            variant="secondary"
            onClick={() => {
              if (!test.trim()) {
                toast.push("Enter a sample query to run the evaluation.", "danger");
                return;
              }
              toast.push("Safety evaluation: no policy violations flagged for this sample.", "success");
            }}
          >
            Run test
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
