import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type MemberNotesMap = Record<string, string>;

export function useMockMemberNotes(memberId: string | undefined) {
  const [map, setMap] = useLocalStorage<MemberNotesMap>(MOCK_LS.memberNotes, {});

  const notes = useMemo(() => (memberId ? map[memberId] ?? "" : ""), [map, memberId]);

  const setNotes = useCallback(
    (next: string) => {
      if (!memberId) return;
      setMap((prev) => ({ ...prev, [memberId]: next }));
    },
    [memberId, setMap],
  );

  return { notes, setNotes };
}
