import { Navigate, Outlet } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";

/** Guests see marketing; signed-in users skip to onboarding or app. */
export function MarketingGate() {
  const { user, onboardingComplete } = useAppState();
  if (user && !onboardingComplete) return <Navigate to="/onboarding/welcome" replace />;
  if (user && onboardingComplete) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
