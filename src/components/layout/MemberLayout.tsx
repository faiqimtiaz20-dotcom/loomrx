import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { AppShell } from "@/components/layout/AppShell";
import { Drawer } from "@/components/ui/Drawer";
import { SidebarContent, SidebarRail } from "@/components/layout/Sidebar";
import { SidebarUserPanel } from "@/components/layout/SidebarUserPanel";
import { TopBar } from "@/components/layout/TopBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { memberTitleFromPath } from "@/lib/titles";

export function MemberLayout() {
  const [collapsed, setCollapsed] = useLocalStorage("loomrx-sidebar-collapsed", false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const title = memberTitleFromPath(location.pathname);
  const { offline, slowNetwork, subscriptionStatus } = useAppState();
  const topPad = offline || slowNetwork;

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <AppShell
      mainId="main-content"
      skipLink={
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
      }
      sidebar={
        <>
          <SidebarRail
            collapsed={Boolean(collapsed)}
            onToggle={() => setCollapsed(!collapsed)}
            variant="member"
          />
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Navigate" side="left">
            <SidebarUserPanel collapsed={false} onNavigate={() => setDrawerOpen(false)} />
            <SidebarContent
              collapsed={false}
              variant="member"
              omitUserFooter
              onNavigate={() => setDrawerOpen(false)}
            />
          </Drawer>
        </>
      }
      header={<TopBar title={title} onMenuClick={() => setDrawerOpen(true)} />}
    >
      <div className={topPad ? "pt-10" : ""}>
        {subscriptionStatus === "paused" ? (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <strong>Subscription paused.</strong> Some features may be limited until billing resumes.{" "}
            <Link className="font-medium underline" to="/billing">
              Open billing
            </Link>
          </div>
        ) : null}
        <Outlet />
      </div>
    </AppShell>
  );
}
