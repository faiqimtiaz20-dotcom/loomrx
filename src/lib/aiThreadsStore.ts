import { MOCK_LS } from "@/lib/mockPersistence";
import { AI_THREADS_SEED, type AiPersist } from "@/data/aiThreadsSeed";

export function readAiPersist(): AiPersist {
  try {
    const raw = localStorage.getItem(MOCK_LS.aiThreads);
    if (!raw) return AI_THREADS_SEED;
    const p = JSON.parse(raw) as AiPersist;
    if (!Array.isArray(p?.threads) || !p.threads.length) return AI_THREADS_SEED;
    const activeId = p.activeId && p.threads.some((t) => t.id === p.activeId) ? p.activeId : p.threads[0]!.id;
    return { threads: p.threads, activeId };
  } catch {
    return AI_THREADS_SEED;
  }
}

export function writeAiPersist(next: AiPersist) {
  try {
    localStorage.setItem(MOCK_LS.aiThreads, JSON.stringify(next));
    window.dispatchEvent(new Event("loomrx-ai-updated"));
  } catch {
    /* ignore */
  }
}

export function subscribeAiPersist(onStore: () => void) {
  const fn = () => onStore();
  window.addEventListener("loomrx-ai-updated", fn);
  return () => window.removeEventListener("loomrx-ai-updated", fn);
}

export type AiThreadPreviewLink = { id: string; title: string };

/** Raw LS key used to memoize previews for useSyncExternalStore (stable snapshot refs). */
let previewCacheKey: string | null = null;
let previewCacheValue: AiThreadPreviewLink[] = [];

export function getAiThreadPreviewLinks(): AiThreadPreviewLink[] {
  let raw: string;
  try {
    raw = localStorage.getItem(MOCK_LS.aiThreads) ?? "";
  } catch {
    raw = "";
  }
  if (raw === previewCacheKey) return previewCacheValue;
  previewCacheKey = raw;
  previewCacheValue = readAiPersist()
    .threads.slice(0, 4)
    .map((t) => ({ id: t.id, title: t.title }));
  return previewCacheValue;
}
