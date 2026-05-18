import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";

export function ProtectedRoute({
  mode = "member",
}: {
  mode?: "member" | "onboarding" | "admin" | "auth-only";
}) {
  const { user, onboardingComplete, role, subscriptionStatus } = useAppState();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (mode === "auth-only") {
    return <Outlet />;
  }

  if (mode === "admin") {
    if (role !== "admin") {
      return <Navigate to="/403" replace />;
    }
    return <Outlet />;
  }

  if (mode === "onboarding") {
    if (onboardingComplete) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
  }

  if (!onboardingComplete) {
    return <Navigate to="/onboarding/welcome" replace />;
  }

  if (subscriptionStatus === "canceled" && location.pathname !== "/subscription-inactive") {
    return <Navigate to="/subscription-inactive" replace />;
  }

  return <Outlet />;
}
