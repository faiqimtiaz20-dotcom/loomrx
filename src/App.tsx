import { AppRoutes } from "./AppRoutes";
import { AppStateProvider } from "./contexts/AppStateContext";
import { ToastProvider } from "./contexts/ToastContext";
import { OfflineBanner } from "./components/layout/OfflineBanner";
import { NetworkStatusListener } from "./components/layout/NetworkStatus";
import { IdleSessionListener } from "./components/layout/IdleSessionListener";
import { SessionExpiredModal } from "./components/layout/SessionExpiredModal";

export default function App() {
  return (
    <AppStateProvider>
      <ToastProvider>
        <NetworkStatusListener />
        <IdleSessionListener />
        <OfflineBanner />
        <SessionExpiredModal />
        <AppRoutes />
      </ToastProvider>
    </AppStateProvider>
  );
}
