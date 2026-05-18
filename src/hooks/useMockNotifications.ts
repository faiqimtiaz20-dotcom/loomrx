import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type MockNotification = {
  id: string;
  title: string;
  body: string;
  read: boolean;
  at: string;
};

const SEED: MockNotification[] = [
  {
    id: "n-1",
    title: "Billing receipt",
    body: "Your last invoice is available under Billing → Invoices.",
    read: false,
    at: "2026-05-14",
  },
  {
    id: "n-2",
    title: "Resource approved",
    body: "Your upload “Recall campaign one-pager” was approved.",
    read: false,
    at: "2026-05-12",
  },
  {
    id: "n-3",
    title: "Welcome",
    body: "Complete the getting-started checklist on your dashboard.",
    read: true,
    at: "2026-05-01",
  },
];

export function useMockNotifications() {
  const [stored, setStored] = useLocalStorage<MockNotification[]>(MOCK_LS.notifications, SEED);

  const items = useMemo(() => [...stored], [stored]);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const markAllRead = useCallback(() => {
    setStored((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [setStored]);

  const markRead = useCallback(
    (id: string) => {
      setStored((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    },
    [setStored],
  );

  return { items, unreadCount, markAllRead, markRead };
}
