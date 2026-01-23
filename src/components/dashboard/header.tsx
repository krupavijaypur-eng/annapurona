'use client';
import { usePathname } from 'next/navigation';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFirebase } from '@/firebase';
import { handleSignOut } from '@/firebase/auth/actions';

function getTitleFromPathname(pathname: string): string {
    const title = pathname.split('/').pop() || 'dashboard';
    return title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ');
}

export function DashboardHeader() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);
  const { auth, user } = useFirebase();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />

      <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>

      <div className="ml-auto">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                        <AvatarFallback>{user?.displayName?.[0] ?? 'U'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignOut(auth)}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
