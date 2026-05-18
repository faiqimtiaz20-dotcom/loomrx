import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { FeatureGate } from "@/components/ui/FeatureGate";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/contexts/ToastContext";
import type { AiThread as Thread, AiMessage as Message } from "@/data/aiThreadsSeed";
import { readAiPersist, writeAiPersist } from "@/lib/aiThreadsStore";
import { openAiEnabledFlag } from "@/lib/publicConfig";

const starterPrompts = [
  "Draft an SOP outline for front-desk intake at an outpatient clinic.",
  "Write a professional marketing email to re-engage dormant patients.",
  "List a weekly ops checklist for a two-provider clinic.",
];

function simulateAssistantReply(
  threadId: string,
  setThreads: Dispatch<SetStateAction<Thread[]>>,
  setBusy: (v: boolean) => void,
  setError: (s: string | null) => void,
  toast: { push: (m: string, t?: "default" | "success" | "danger") => void },
) {
  window.setTimeout(() => {
    const roll = Math.random();
    if (roll < 0.05) {
      setError(
        "This request was blocked by safety policies (e.g. disallowed clinical advice). Rephrase as a business or operations question, or contact support.",
      );
      setBusy(false);
      return;
    }
    if (roll < 0.1) {
      setError("The model is temporarily unavailable. Please retry in a moment.");
      setBusy(false);
      return;
    }
    if (roll < 0.15) {
      setError("Rate limit reached for your plan. Try again later or upgrade.");
      setBusy(false);
      return;
    }
    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content:
        "Here is a **draft** you can refine for your organization:\n\n- Keep language operational, not clinical.\n- Add your brand voice and local policies.\n- Have compliance review before patient-facing use.\n\n_Reminder: LoomRX AI supports business operations — not diagnosis or treatment._",
    };
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, messages: [...t.messages, assistantMsg] } : t)),
    );
    setBusy(false);
    toast.push("Response ready", "success");
  }, 700);
}

export function AiAssistantPage() {
  const { tier } = useAppState();
  const toast = useToast();
  const isMd = useMediaQuery("(min-width: 768px)");
  const [searchParams, setSearchParams] = useSearchParams();

  const seed = useMemo(() => readAiPersist(), []);
  const [threadsOpen, setThreadsOpen] = useState(false);
  const [threads, setThreads] = useState<Thread[]>(seed.threads);
  const [activeId, setActiveId] = useState(seed.activeId);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    writeAiPersist({ threads, activeId });
  }, [threads, activeId]);

  useEffect(() => {
    const tid = searchParams.get("thread");
    if (!tid || !threads.some((t) => t.id === tid)) return;
    setActiveId(tid);
    setSearchParams(
      (p) => {
        const n = new URLSearchParams(p);
        n.delete("thread");
        return n;
      },
      { replace: true },
    );
  }, [searchParams, threads, setSearchParams]);

  const active = useMemo(() => threads.find((t) => t.id === activeId) ?? threads[0], [threads, activeId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages]);

  const limit = tier === "starter" ? 80 : tier === "growth" ? 200 : 600;
  const used = 42;

  const canRetry =
    Boolean(error && active?.messages.length && active.messages[active.messages.length - 1]?.role === "user");

  const send = async () => {
    const text = input.trim();
    if (!text || !active) return;
    setError(null);
    setInput("");
    const threadId = active.id;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, messages: [...t.messages, userMsg] } : t)),
    );
    setBusy(true);
    simulateAssistantReply(threadId, setThreads, setBusy, setError, toast);
  };

  const retryAssistant = () => {
    if (!active || !canRetry) return;
    setError(null);
    setBusy(true);
    simulateAssistantReply(active.id, setThreads, setBusy, setError, toast);
  };

  const newChat = () => {
    const t: Thread = { id: `t-${Date.now()}`, title: "New conversation", messages: [] };
    setThreads((prev) => [t, ...prev]);
    setActiveId(t.id);
    if (!isMd) setThreadsOpen(false);
  };

  const saveRename = (id: string) => {
    const t = editTitle.trim();
    if (!t) return;
    setThreads((prev) => prev.map((x) => (x.id === id ? { ...x, title: t } : x)));
    setEditingId(null);
  };

  const deleteThread = (id: string) => {
    if (!window.confirm("Delete this conversation?")) return;
    setThreads((prev) => {
      const next = prev.filter((x) => x.id !== id);
      if (!next.length) {
        const fresh: Thread = { id: `t-${Date.now()}`, title: "New conversation", messages: [] };
        setActiveId(fresh.id);
        return [fresh];
      }
      if (id === activeId) setActiveId(next[0]!.id);
      return next;
    });
  };

  const threadList = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Threads</p>
        <Button size="sm" variant="secondary" onClick={newChat}>
          New
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {threads.map((t) => (
          <div
            key={t.id}
            className={[
              "mb-2 rounded-lg border border-transparent p-2",
              t.id === active?.id ? "border-primary/30 bg-primary/5" : "hover:bg-surface-muted",
            ].join(" ")}
          >
            {editingId === t.id ? (
              <div className="flex flex-col gap-2">
                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} aria-label="Thread title" />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveRename(t.id)}>
                    Save
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(t.id);
                    if (!isMd) setThreadsOpen(false);
                  }}
                  className="min-h-[44px] w-full rounded-md px-2 py-2 text-left text-sm font-medium text-slate-800"
                >
                  {t.title}
                </button>
                <div className="mt-1 flex flex-wrap gap-1 px-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="min-h-0 px-2 py-1 text-xs"
                    onClick={() => {
                      setEditingId(t.id);
                      setEditTitle(t.title);
                    }}
                  >
                    Rename
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="min-h-0 px-2 py-1 text-xs text-red-700 hover:text-red-800"
                    onClick={() => deleteThread(t.id)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col gap-4">
      <PageHeader
        title="AI Assistant"
        description="Business operations copilot for healthcare organizations — not clinical decision support."
        actions={
          <>
            {openAiEnabledFlag ? (
              <Badge variant="default" className="hidden sm:inline-flex">
                OPENAI_ENABLED
              </Badge>
            ) : null}
            {!isMd ? (
              <Button variant="secondary" onClick={() => setThreadsOpen(true)}>
                Threads
              </Button>
            ) : null}
            <Button variant="secondary" onClick={newChat}>
              New chat
            </Button>
          </>
        }
      />

      {openAiEnabledFlag ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-950">
          <strong>Integration flag:</strong> <span className="font-mono">VITE_OPENAI_ENABLED</span> is on. Wire your
          backend to stream model output; this UI still uses local simulation until connected.
        </div>
      ) : null}

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
        <strong>Disclaimer:</strong> Outputs are informational drafts for business use. Not medical advice. You are
        responsible for compliance in your environment. See{" "}
        <Link className="underline" to="/ai-disclaimer">
          AI disclaimer
        </Link>
        .
      </div>

      <div className="flex min-h-[480px] flex-1 overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-card">
        {isMd ? (
          <aside className="hidden w-64 shrink-0 border-r border-border md:block">{threadList}</aside>
        ) : null}
        <Drawer open={threadsOpen} onClose={() => setThreadsOpen(false)} title="Threads" side="left">
          {threadList}
        </Drawer>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-border px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-slate-800">{active?.title ?? "Conversation"}</p>
              <p className="text-xs text-slate-500">
                {used} / {limit} messages this cycle (demo)
              </p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(100, (used / limit) * 100)}%` }}
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {!active?.messages.length ? (
              <EmptyState
                title="Start with a template"
                description="Pick a suggested prompt or describe your workflow."
                actionLabel="Insert first suggestion"
                onAction={() => setInput(starterPrompts[0] ?? "")}
              />
            ) : null}
            {active?.messages.map((m) => (
              <div
                key={m.id}
                className={[
                  "max-w-[min(100%,52rem)] rounded-xl border px-4 py-3 text-sm shadow-sm",
                  m.role === "user"
                    ? "ml-auto border-primary/20 bg-primary/5 text-slate-900"
                    : "mr-auto border-border bg-surface-muted/40 text-slate-900",
                ].join(" ")}
              >
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {m.role === "user" ? "You" : "LoomRX AI"}
                </p>
                {m.role === "assistant" ? (
                  <div className="text-sm leading-relaxed text-slate-900 [&_a]:text-primary [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
                <button
                  type="button"
                  className="mt-2 text-xs font-medium text-primary hover:underline"
                  onClick={() => {
                    void navigator.clipboard.writeText(m.content);
                    toast.push("Copied to clipboard", "success");
                  }}
                >
                  Copy
                </button>
              </div>
            ))}
            {busy ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="inline-flex h-2 w-2 animate-ping rounded-full bg-primary" />
                Assistant is thinking…
              </div>
            ) : null}
            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}{" "}
                {canRetry ? (
                  <button type="button" className="font-semibold underline" onClick={retryAssistant}>
                    Retry
                  </button>
                ) : null}{" "}
                <button type="button" className="font-semibold underline" onClick={() => setError(null)}>
                  Dismiss
                </button>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border bg-surface-muted/30 p-3">
            <div className="mx-auto flex max-w-[52rem] flex-col gap-2 md:flex-row md:items-end">
              <div className="flex-1">
                <Textarea
                  aria-label="Your message"
                  rows={3}
                  placeholder="Describe the workflow, template, or business question…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                />
              </div>
              <Button className="md:mb-1" disabled={busy} onClick={() => void send()}>
                Send
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {starterPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="rounded-full border border-border bg-surface-elevated px-3 py-1 text-left text-xs text-slate-700 md:text-xs"
                  onClick={() => setInput(p)}
                >
                  {!isMd ? "Use: " : ""}
                  {p.length > 60 && !isMd ? `${p.slice(0, 58)}…` : p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FeatureGate
        requiredTier="enterprise"
        title="Tenant knowledge pack (RAG)"
        description="Enterprise can attach approved internal documents so answers stay on-policy. Upgrade to enable this module."
      >
        <Card>
          <CardBody className="text-sm text-slate-700">
            <p className="type-h4">Knowledge pack connected</p>
            <p className="mt-1">
              Admin-uploaded documents are indexed for retrieval alongside the base model (demo placeholder).
            </p>
          </CardBody>
        </Card>
      </FeatureGate>
    </div>
  );
}
