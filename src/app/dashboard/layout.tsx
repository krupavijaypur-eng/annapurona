import * as React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  ChefHat,
  LayoutDashboard,
  Lightbulb,
  Refrigerator,
  ShoppingBasket,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { DashboardHeader } from '@/components/dashboard/header';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/inventory', icon: Refrigerator, label: 'Inventory' },
  { href: '/dashboard/recipes', icon: ChefHat, label: 'Recipes' },
  { href: '/dashboard/shopping-list', icon: ShoppingBasket, label: 'Shopping List' },
  { href: '/dashboard/tips', icon: Lightbulb, label: 'Tips' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Logo className="size-8" />
              <span className="text-lg font-semibold">Annapourna</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link href={item.href}>
                      <>
                        <item.icon />
                        <span>{item.label}</span>
                      </>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
