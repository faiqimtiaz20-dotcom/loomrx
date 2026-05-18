/** Public env (Vite) — safe for client bundle. No secrets. */

export const circleEmbedUrl = (import.meta.env.VITE_CIRCLE_EMBED_URL as string | undefined)?.trim() ?? "";
export const circlePortalUrl = (import.meta.env.VITE_CIRCLE_PORTAL_URL as string | undefined)?.trim() ?? "";

export const openAiEnabledFlag =
  String(import.meta.env.VITE_OPENAI_ENABLED ?? "").toLowerCase() === "true" ||
  import.meta.env.VITE_OPENAI_ENABLED === "1";
