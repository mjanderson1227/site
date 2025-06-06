import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/react/app-sidebar";
import { Separator } from "@/components/ui/separator";

interface DashboardProps extends React.PropsWithChildren {
  sidebarOpen?: boolean;
  contentTitle?: string;
}

export function Dashboard({
  children,
  sidebarOpen = false,
  contentTitle = "Dashboard",
}: DashboardProps) {
  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex gap-4 py-4 md:gap-6 px-6">
          <div className="flex items-center gap-2 md:gap-3">
            <SidebarTrigger />
            <Separator orientation="vertical" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight">
            {contentTitle}
          </h1>
        </div>
        <Separator />
        <div className="px-6 py-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
