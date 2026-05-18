import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type MockUpload = {
  id: string;
  title: string;
  status: "pending" | "approved" | "rejected";
  note: string;
  updated: string;
};

const SEED: MockUpload[] = [
  {
    id: "1",
    title: "Custom SOAP note helper",
    status: "pending",
    note: "",
    updated: "2026-05-10",
  },
  {
    id: "2",
    title: "Recall campaign one-pager",
    status: "approved",
    note: "",
    updated: "2026-05-02",
  },
  {
    id: "3",
    title: "Budget workbook",
    status: "rejected",
    note: "Contains vendor-specific pricing; please remove logos.",
    updated: "2026-04-28",
  },
];

export function useMockUploads() {
  const [stored, setStored] = useLocalStorage<MockUpload[]>(MOCK_LS.uploads, SEED);

  const uploads = useMemo(() => [...stored], [stored]);

  const append = useCallback(
    (row: Omit<MockUpload, "id"> & { id?: string }) => {
      const id = row.id ?? `up-${Date.now()}`;
      const next: MockUpload = {
        id,
        title: row.title,
        status: row.status,
        note: row.note,
        updated: row.updated,
      };
      setStored((prev) => [...prev, next]);
    },
    [setStored],
  );

  return { uploads, append };
}
