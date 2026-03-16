import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Settings, User2 } from "lucide-react";
import { BaseLogo } from "./BaseLogo";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <BaseLogo />
          <span className="text-sm font-semibold tracking-tight text-sidebar-accent-foreground">
            Base
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase tracking-[0.05em]">
            Overview
          </SidebarGroupLabel>
          <SidebarMenuButton className="text-[13px]" isActive>
            <LayoutDashboard />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarGroup>
        {/* <SidebarGroup>
          <SidebarGroupLabel className="uppercase tracking-[0.05em]">
            Manage
          </SidebarGroupLabel>
        </SidebarGroup> */}

        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
