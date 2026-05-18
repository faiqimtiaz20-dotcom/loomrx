import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type RecentResource = { id: string; title: string; at: string };

const MAX = 5;

export function useMockRecentResources() {
  const [stored, setStored] = useLocalStorage<RecentResource[]>(MOCK_LS.recentResources, []);

  const recent = useMemo(() => [...stored], [stored]);

  const record = useCallback(
    (id: string, title: string) => {
      const at = new Date().toISOString().slice(0, 10);
      setStored((prev) => {
        const next = [{ id, title, at }, ...prev.filter((r) => r.id !== id)];
        return next.slice(0, MAX);
      });
    },
    [setStored],
  );

  return { recent, record };
}
