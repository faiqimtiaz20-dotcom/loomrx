import { useAppState } from "@/contexts/AppStateContext";
import { useIdleSession } from "@/hooks/useIdleSession";

/** 20 minutes of inactivity → session expired modal (roadmap session UX). */
const IDLE_MS = 20 * 60 * 1000;

export function IdleSessionListener() {
  const { user, setSessionExpired } = useAppState();
  useIdleSession(user ? IDLE_MS : null, () => setSessionExpired(true));
  return null;
}
