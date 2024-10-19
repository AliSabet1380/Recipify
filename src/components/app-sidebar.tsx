import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { HeaderLogo } from "./header/header-logo";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Application",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Explore",
          url: "/explore",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="w-full flex items-center justify-center pt-2">
          <HeaderLogo url={"/dashboard"} />
        </div>
        <hr className="mt-3" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <div key={item.title}>
                    <SidebarMenuItem className="p-2">
                      <SidebarMenuButton asChild>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarSeparator />
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
