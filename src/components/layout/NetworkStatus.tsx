import { useEffect } from "react";
import { useAppState } from "@/contexts/AppStateContext";

function readSlow(): boolean {
  const conn = (
    navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    }
  ).connection;
  if (!conn?.effectiveType) return false;
  if (conn.saveData) return true;
  return conn.effectiveType === "slow-2g" || conn.effectiveType === "2g";
}

/** Sets `slowNetwork` from Network Information API when available. */
export function NetworkStatusListener() {
  const { offline, setSlowNetwork } = useAppState();

  useEffect(() => {
    const conn = (
      navigator as Navigator & {
        connection?: EventTarget & { effectiveType?: string; saveData?: boolean; addEventListener: typeof EventTarget.prototype.addEventListener };
      }
    ).connection;
    if (!conn || typeof conn.addEventListener !== "function") {
      setSlowNetwork(false);
      return;
    }
    const sync = () => setSlowNetwork(readSlow());
    sync();
    conn.addEventListener("change", sync);
    return () => conn.removeEventListener("change", sync);
  }, [setSlowNetwork]);

  useEffect(() => {
    if (offline) setSlowNetwork(false);
  }, [offline, setSlowNetwork]);

  return null;
}
