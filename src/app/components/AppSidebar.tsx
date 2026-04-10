"use client";

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
import {
  ArrowLeftRight,
  Atom,
  LayoutDashboard,
  Settings,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BaseLogo } from "./BaseLogo";

export const AppSidebar = () => {
  const pathname = usePathname();
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

          <SidebarMenuButton
            className="text-[13px]"
            isActive={pathname === "/"}
            asChild
          >
            <Link href="/">
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase tracking-[0.05em]">
            Manage
          </SidebarGroupLabel>

          <SidebarMenuButton
            className="text-[13px]"
            isActive={pathname.startsWith("/matter")}
            asChild
          >
            <Link href="/matter">
              <Atom />
              <span>Matter</span>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton
            className="text-[13px]"
            isActive={pathname.startsWith("/flow")}
            asChild
          >
            <Link href="/flow">
              <ArrowLeftRight />
              {/* <Atom /> */}
              <span>Flow</span>
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>

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
