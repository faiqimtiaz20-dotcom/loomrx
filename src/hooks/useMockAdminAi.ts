import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MOCK_LS } from "@/lib/mockPersistence";

export type MockAdminAi = {
  prompt: string;
  versionNote: string;
};

const DEFAULT: MockAdminAi = {
  prompt:
    "You are LoomRX Ops Copilot. Help with healthcare *business* operations only. Never diagnose or treat.",
  versionNote: "",
};

export function useMockAdminAi() {
  return useLocalStorage<MockAdminAi>(MOCK_LS.adminAi, DEFAULT);
}
