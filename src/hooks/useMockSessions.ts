import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type MockSessionRow = {
  id: string;
  label: string;
  current: boolean;
};

const SEED: MockSessionRow[] = [
  { id: "s1", label: "Chrome · Windows · Austin, TX", current: true },
  { id: "s2", label: "Safari · iPhone · 2d ago", current: false },
];

export function useMockSessions() {
  const [stored, setStored] = useLocalStorage<MockSessionRow[]>(MOCK_LS.sessions, SEED);

  const sessions = useMemo(() => [...stored], [stored]);

  const revoke = useCallback(
    (id: string) => {
      setStored((prev) => prev.filter((s) => s.id !== id));
    },
    [setStored],
  );

  return { sessions, revoke };
}
