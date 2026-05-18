/** localStorage keys for Phase 1 mock data (cleared on logout / reset demo). */

export const MOCK_LS = {
  resources: "loomrx-mock-resources-v1",
  uploads: "loomrx-mock-uploads-v1",
  aiThreads: "loomrx-mock-ai-threads-v1",
  adminAi: "loomrx-mock-admin-ai-v1",
  sessions: "loomrx-mock-sessions-v1",
  recentResources: "loomrx-mock-recent-resources-v1",
  announcements: "loomrx-mock-announcements-v1",
  knowledgeDocs: "loomrx-mock-knowledge-docs-v1",
  memberNotes: "loomrx-mock-member-notes-v1",
  supportTickets: "loomrx-mock-support-tickets-v1",
  notifications: "loomrx-mock-notifications-v1",
} as const;

/** One-time resource download terms (member); cleared with mock reset. */
export const LS_RESOURCE_TERMS = "loomrx-resource-download-terms-v1";

export function clearMockPersistence(): void {
  (Object.values(MOCK_LS) as string[]).forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  });
  try {
    localStorage.removeItem(LS_RESOURCE_TERMS);
  } catch {
    /* ignore */
  }
}
