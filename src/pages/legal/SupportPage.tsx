import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/contexts/ToastContext";
import { useMockSupportTickets } from "@/hooks/useMockSupportTickets";

export function SupportPage() {
  const toast = useToast();
  const { append } = useMockSupportTickets();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ref, setRef] = useState<string | null>(null);

  if (ref) {
    return (
      <div className="space-y-4">
        <h1 className="type-display text-slate-900">Support</h1>
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          Thanks — your message was saved for this browser session. Reference: <strong>{ref}</strong>
        </p>
        <p className="text-sm text-slate-600">
          Production: this becomes an email or helpdesk ticket via your backend. View stored mock tickets in{" "}
          <span className="font-mono text-xs">localStorage</span> key <span className="font-mono text-xs">loomrx-mock-support-tickets-v1</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="type-display text-slate-900">Support</h1>
      <p className="text-sm text-slate-600">Questions about access, Circle provisioning, or billing.</p>
      <form
        className="space-y-4 rounded-xl border border-border bg-surface-elevated p-6 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          const id = append({ email, subject, message });
          setRef(id);
          toast.push("Ticket recorded locally.", "success");
        }}
      >
        <Input label="Email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Subject" name="subject" required value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Textarea label="Message" name="message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button type="submit">Send message</Button>
      </form>
      <p className="text-sm text-slate-600">
        Prefer email?{" "}
        <a className="text-primary hover:underline" href="mailto:support@loomrx.health">
          support@loomrx.health
        </a>
      </p>
    </div>
  );
}
