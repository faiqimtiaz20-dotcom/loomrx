/** API base for future backend wiring (empty in static UI demo). */
export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export const appEnv = import.meta.env.MODE;

export { circleEmbedUrl, circlePortalUrl, openAiEnabledFlag } from "@/lib/publicConfig";
