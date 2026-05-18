import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type SupportTicket = {
  id: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export function useMockSupportTickets() {
  const [stored, setStored] = useLocalStorage<SupportTicket[]>(MOCK_LS.supportTickets, []);

  const tickets = useMemo(() => [...stored].reverse(), [stored]);

  const append = useCallback(
    (row: Omit<SupportTicket, "id" | "createdAt">) => {
      const id = `T-${Date.now()}`;
      const createdAt = new Date().toISOString();
      setStored((prev) => [...prev, { ...row, id, createdAt }]);
      return id;
    },
    [setStored],
  );

  return { tickets, append };
}
