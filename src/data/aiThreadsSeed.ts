export type AiMessage = { id: string; role: "user" | "assistant"; content: string };

export type AiThread = { id: string; title: string; messages: AiMessage[] };

export type AiPersist = { threads: AiThread[]; activeId: string };

export const AI_THREADS_SEED: AiPersist = {
  activeId: "t1",
  threads: [
    {
      id: "t1",
      title: "SOP outline — patient intake",
      messages: [
        {
          id: "m1",
          role: "assistant",
          content:
            "Here is a concise **SOP outline** you can adapt:\n\n1. **Purpose & scope** — intake for new/returning patients.\n2. **Roles** — reception, MA, provider.\n3. **Steps** — verify demographics → insurance → chief complaint → rooming.\n4. **Quality checks** — duplicate chart, consent, HIPAA minimum necessary.\n5. **Artifacts** — checklist PDF, phone script.\n\n_This is not medical or legal advice._",
        },
      ],
    },
  ],
};
