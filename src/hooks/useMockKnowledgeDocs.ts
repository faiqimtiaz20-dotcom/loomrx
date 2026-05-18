import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type MockKnowledgeDoc = {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
};

const SEED: MockKnowledgeDoc[] = [
  { id: "kd-1", name: "Playbook — staffing.pdf", status: "Indexed", updatedAt: "2026-05-16" },
  { id: "kd-2", name: "Brand voice.md", status: "Queued", updatedAt: "2026-05-15" },
];

export function useMockKnowledgeDocs() {
  const [stored, setStored] = useLocalStorage<MockKnowledgeDoc[]>(MOCK_LS.knowledgeDocs, SEED);

  const docs = useMemo(() => [...stored], [stored]);

  const addFromFile = useCallback(
    (file: File) => {
      const id = `kd-${Date.now()}`;
      const name = file.name || "Untitled";
      const row: MockKnowledgeDoc = {
        id,
        name,
        status: "Queued",
        updatedAt: new Date().toISOString().slice(0, 10),
      };
      setStored((prev) => [row, ...prev]);
      return id;
    },
    [setStored],
  );

  const remove = useCallback(
    (id: string) => {
      setStored((prev) => prev.filter((d) => d.id !== id));
    },
    [setStored],
  );

  const reindex = useCallback(
    (id: string) => {
      setStored((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, status: "Indexed", updatedAt: new Date().toISOString().slice(0, 10) }
            : d,
        ),
      );
    },
    [setStored],
  );

  return { docs, addFromFile, remove, reindex };
}
