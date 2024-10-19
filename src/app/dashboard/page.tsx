import { BellRing, Settings } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { User } from "@/components/header/user";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center space-x-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex items-center space-x-5">
            <Settings className="size-4" />
            <BellRing className="size-4" />
            <User loaderColor="black" />
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
