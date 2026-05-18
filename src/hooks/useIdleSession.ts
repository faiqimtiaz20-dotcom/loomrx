import { useEffect, useRef } from "react";

const EVENTS = ["mousedown", "keydown", "touchstart", "scroll", "click"] as const;

/**
 * Marks session expired after `timeoutMs` with no user activity (demo idle timeout).
 */
export function useIdleSession(timeoutMs: number | null, onIdle: () => void) {
  const onIdleRef = useRef(onIdle);
  onIdleRef.current = onIdle;
  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (timeoutMs === null) return;
    const bump = () => {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => onIdleRef.current(), timeoutMs);
    };

    EVENTS.forEach((ev) => window.addEventListener(ev, bump, { passive: true }));
    bump();
    return () => {
      EVENTS.forEach((ev) => window.removeEventListener(ev, bump));
      window.clearTimeout(timerRef.current);
    };
  }, [timeoutMs]);
}
