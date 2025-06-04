import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/react/app-sidebar";
import type { PropsWithChildren } from "react";

interface DashboardProps extends PropsWithChildren {
  sidebarOpen?: boolean;
}

export function Dashboard({ children, sidebarOpen = false }: DashboardProps) {
  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
