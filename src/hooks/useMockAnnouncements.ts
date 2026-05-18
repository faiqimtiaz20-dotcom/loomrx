import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type MockAnnouncement = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

type Store = { items: MockAnnouncement[]; dismissed: string[] };

const SEED: Store = {
  items: [
    {
      id: "a-seed-1",
      title: "New: Operations sprint kit",
      body: "Growth+ members can download the sprint kit from Resources → Templates.",
      createdAt: "2026-05-12",
    },
    {
      id: "a-seed-2",
      title: "Circle Growth Lab office hours",
      body: "Wednesdays 12pm CT — link posted in Community.",
      createdAt: "2026-05-08",
    },
  ],
  dismissed: [],
};

function normalize(raw: unknown): Store {
  if (!raw || typeof raw !== "object") return { ...SEED, items: [...SEED.items] };
  const o = raw as Partial<Store>;
  const items = Array.isArray(o.items) && o.items.length ? o.items : [...SEED.items];
  const dismissed = Array.isArray(o.dismissed) ? o.dismissed : [];
  return { items, dismissed };
}

export function useMockAnnouncements() {
  const [stored, setStored] = useLocalStorage<Store>(MOCK_LS.announcements, SEED);

  const state = useMemo(() => normalize(stored), [stored]);

  const visible = useMemo(
    () => state.items.filter((a) => !state.dismissed.includes(a.id)),
    [state.items, state.dismissed],
  );

  const dismiss = useCallback(
    (id: string) => {
      setStored((prev) => {
        const n = normalize(prev);
        if (n.dismissed.includes(id)) return n;
        return { ...n, dismissed: [...n.dismissed, id] };
      });
    },
    [setStored],
  );

  const broadcast = useCallback(
    (title: string, body: string) => {
      const id = `a-${Date.now()}`;
      const createdAt = new Date().toISOString().slice(0, 10);
      setStored((prev) => {
        const n = normalize(prev);
        return { ...n, items: [{ id, title, body, createdAt }, ...n.items] };
      });
    },
    [setStored],
  );

  return { visible, dismiss, broadcast, all: state.items };
}
