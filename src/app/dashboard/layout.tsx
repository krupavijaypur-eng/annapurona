'use client';

import * as React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
  Loader2,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { DashboardHeader } from '@/components/dashboard/header';
import { useUser } from '@/firebase';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, tKey: 'nav.dashboard' },
  { href: '/dashboard/inventory', icon: Refrigerator, tKey: 'nav.inventory' },
  { href: '/dashboard/recipes', icon: ChefHat, tKey: 'nav.recipes' },
  { href: '/dashboard/shopping-list', icon: ShoppingBasket, tKey: 'nav.shopping-list' },
  { href: '/dashboard/tips', icon: Lightbulb, tKey: 'nav.tips' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const { t } = useLanguage();

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return redirect('/login');
  }

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
                  <SidebarMenuButton asChild tooltip={t(item.tKey)}>
                    <Link href={item.href}>
                      <>
                        <item.icon />
                        <span>{t(item.tKey)}</span>
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
