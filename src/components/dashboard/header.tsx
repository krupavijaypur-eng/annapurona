'use client';
import { usePathname } from 'next/navigation';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';

function getTitleFromPathname(pathname: string): string {
    const title = pathname.split('/').pop() || 'dashboard';
    return title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ');
}

export function DashboardHeader() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />

      <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>

    </header>
  );
}
