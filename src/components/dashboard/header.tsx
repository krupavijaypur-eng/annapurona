'use client';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';

export function DashboardHeader() {

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />

      <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>

    </header>
  );
}
