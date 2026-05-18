import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { AppShell } from "@/components/layout/AppShell";
import { Drawer } from "@/components/ui/Drawer";
import { SidebarContent, SidebarRail } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { adminTitleFromPath } from "@/lib/titles";

export function AdminLayout() {
  const [collapsed, setCollapsed] = useLocalStorage("loomrx-admin-sidebar-collapsed", false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const title = adminTitleFromPath(location.pathname);
  const { offline, slowNetwork } = useAppState();
  const topPad = offline || slowNetwork;

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <AppShell
      mainId="admin-main"
      shellClassName="bg-slate-100"
      skipLink={
        <a
          href="#admin-main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-amber-600 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
      }
      sidebar={
        <>
          <SidebarRail
            collapsed={Boolean(collapsed)}
            onToggle={() => setCollapsed(!collapsed)}
            variant="admin"
          />
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Admin menu" side="left">
            <SidebarContent
              collapsed={false}
              variant="admin"
              onNavigate={() => setDrawerOpen(false)}
            />
          </Drawer>
        </>
      }
      header={
        <TopBar
          title={title}
          breadcrumbs={[
            { label: "Admin", to: "/admin" },
            { label: title.replace(/^Admin /, "") },
          ]}
          onMenuClick={() => setDrawerOpen(true)}
        />
      }
    >
      <div className={topPad ? "pt-10" : ""}>
        <Outlet />
      </div>
    </AppShell>
  );
}
