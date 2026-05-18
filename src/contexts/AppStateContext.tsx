import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { clearMockPersistence } from "@/lib/mockPersistence";

export type Tier = "starter" | "growth" | "enterprise";
export type Role = "member" | "admin";
export type BillingInterval = "monthly" | "yearly";
export type SubscriptionStatus = "active" | "paused" | "canceled";

export interface User {
  id: string;
  email: string;
  name: string;
  org?: string;
  timezone: string;
  avatarUrl?: string;
}

const TIER_RANK: Record<Tier, number> = {
  starter: 0,
  growth: 1,
  enterprise: 2,
};

export function tierMeets(required: Tier, actual: Tier) {
  return TIER_RANK[actual] >= TIER_RANK[required];
}

interface PersistedShape {
  user: User | null;
  role: Role;
  tier: Tier;
  interval: BillingInterval;
  onboardingComplete: boolean;
  subscriptionStatus: SubscriptionStatus;
}

const STORAGE_KEY = "loomrx-app-v2";

const defaultPersisted: PersistedShape = {
  user: null,
  role: "member",
  tier: "starter",
  interval: "monthly",
  onboardingComplete: false,
  subscriptionStatus: "active",
};

function normalizePersisted(raw: unknown): PersistedShape {
  if (!raw || typeof raw !== "object") return { ...defaultPersisted };
  const o = raw as Partial<PersistedShape>;
  return {
    ...defaultPersisted,
    ...o,
    subscriptionStatus:
      o.subscriptionStatus === "canceled" || o.subscriptionStatus === "paused" || o.subscriptionStatus === "active"
        ? o.subscriptionStatus
        : "active",
  };
}

interface AppStateContextValue extends PersistedShape {
  sessionExpired: boolean;
  offline: boolean;
  slowNetwork: boolean;
  setSessionExpired: (v: boolean) => void;
  setSlowNetwork: (v: boolean) => void;
  login: (user: User, opts?: { onboardingComplete?: boolean }) => void;
  logout: () => void;
  register: (user: User) => void;
  setRole: (r: Role) => void;
  setTier: (t: Tier) => void;
  setInterval: (i: BillingInterval) => void;
  setSubscriptionStatus: (s: SubscriptionStatus) => void;
  updateUser: (patch: Partial<User>) => void;
  completeOnboarding: () => void;
  resetDemo: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [persistedStore, setPersistedStore] = useLocalStorage<PersistedShape>(STORAGE_KEY, defaultPersisted);
  const persisted = useMemo(() => normalizePersisted(persistedStore), [persistedStore]);

  const setPersistedSafe = useCallback(
    (updater: (prev: PersistedShape) => PersistedShape) => {
      setPersistedStore((prev) => updater(normalizePersisted(prev)));
    },
    [setPersistedStore],
  );

  const [sessionExpired, setSessionExpired] = useState(false);
  const [offline, setOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );
  const [slowNetwork, setSlowNetwork] = useState(false);

  useEffect(() => {
    const up = () => setOffline(false);
    const down = () => setOffline(true);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  const login = useCallback(
    (user: User, opts?: { onboardingComplete?: boolean }) => {
      setPersistedSafe((p) => ({
        ...p,
        user,
        onboardingComplete: opts?.onboardingComplete ?? p.onboardingComplete,
        subscriptionStatus: "active",
      }));
      setSessionExpired(false);
    },
    [setPersistedSafe],
  );

  const register = useCallback(
    (user: User) => {
      setPersistedSafe((p) => ({
        ...p,
        user,
        onboardingComplete: false,
        subscriptionStatus: "active",
      }));
      setSessionExpired(false);
    },
    [setPersistedSafe],
  );

  const logout = useCallback(() => {
    clearMockPersistence();
    setPersistedStore(defaultPersisted);
    setSessionExpired(false);
  }, [setPersistedStore]);

  const setRole = useCallback(
    (role: Role) => {
      setPersistedSafe((p) => ({ ...p, role }));
    },
    [setPersistedSafe],
  );

  const setTier = useCallback(
    (tier: Tier) => {
      setPersistedSafe((p) => ({ ...p, tier }));
    },
    [setPersistedSafe],
  );

  const setInterval = useCallback(
    (interval: BillingInterval) => {
      setPersistedSafe((p) => ({ ...p, interval }));
    },
    [setPersistedSafe],
  );

  const setSubscriptionStatus = useCallback(
    (subscriptionStatus: SubscriptionStatus) => {
      setPersistedSafe((p) => ({ ...p, subscriptionStatus }));
    },
    [setPersistedSafe],
  );

  const updateUser = useCallback(
    (patch: Partial<User>) => {
      setPersistedSafe((p) => {
        if (!p.user) return p;
        return { ...p, user: { ...p.user, ...patch } };
      });
    },
    [setPersistedSafe],
  );

  const completeOnboarding = useCallback(() => {
    setPersistedSafe((p) => ({ ...p, onboardingComplete: true }));
  }, [setPersistedSafe]);

  const resetDemo = useCallback(() => {
    clearMockPersistence();
    setPersistedStore(defaultPersisted);
    setSessionExpired(false);
  }, [setPersistedStore]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      ...persisted,
      sessionExpired,
      offline,
      slowNetwork,
      setSessionExpired,
      setSlowNetwork,
      login,
      logout,
      register,
      setRole,
      setTier,
      setInterval,
      setSubscriptionStatus,
      updateUser,
      completeOnboarding,
      resetDemo,
    }),
    [
      persisted,
      sessionExpired,
      offline,
      slowNetwork,
      login,
      logout,
      register,
      setRole,
      setTier,
      setInterval,
      setSubscriptionStatus,
      updateUser,
      completeOnboarding,
      resetDemo,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

export { TIER_RANK };
