import { useAppState } from "@/contexts/AppStateContext";

/** Offline takes precedence; slow connection when online (roadmap §3.15). */
export function OfflineBanner() {
  const { offline, slowNetwork } = useAppState();
  if (offline) {
    return (
      <div
        className="fixed inset-x-0 top-0 z-[120] border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm font-medium text-amber-900"
        role="status"
      >
        You appear to be offline. Some actions may be unavailable until connection is restored.
      </div>
    );
  }
  if (slowNetwork) {
    return (
      <div
        className="fixed inset-x-0 top-0 z-[120] border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-950"
        role="status"
      >
        Your connection looks slow. The app may take longer to respond.
      </div>
    );
  }
  return null;
}
