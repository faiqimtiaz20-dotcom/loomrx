import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-4 py-10">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-card">
            LR
          </div>
          <p className="type-h3 mt-4">LoomRX</p>
          <p className="text-sm text-slate-500">Healthcare business growth platform</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
