import { useCallback, useMemo } from "react";
import { MOCK_RESOURCES, type MockResource } from "@/data/mock";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

function cloneSeed(): MockResource[] {
  return MOCK_RESOURCES.map((r) => ({ ...r, published: r.published !== false }));
}

export function useMockResources() {
  const [stored, setStored] = useLocalStorage<MockResource[] | null>(MOCK_LS.resources, null);

  const resources = useMemo(() => (stored ? [...stored] : cloneSeed()), [stored]);

  const replace = useCallback(
    (next: MockResource[]) => {
      setStored(next);
    },
    [setStored],
  );

  const upsert = useCallback(
    (row: MockResource) => {
      setStored((prev) => {
        const base = prev ? [...prev] : cloneSeed();
        const i = base.findIndex((r) => r.id === row.id);
        if (i < 0) return [...base, row];
        const copy = [...base];
        copy[i] = row;
        return copy;
      });
    },
    [setStored],
  );

  const setPublishedBulk = useCallback(
    (ids: string[], published: boolean) => {
      if (!ids.length) return;
      const idSet = new Set(ids);
      setStored((prev) => {
        const base = prev ? [...prev] : cloneSeed();
        return base.map((r) => (idSet.has(r.id) ? { ...r, published } : r));
      });
    },
    [setStored],
  );

  return { resources, replace, upsert, setPublishedBulk };
}
