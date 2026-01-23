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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useFirebase } from '@/firebase';
import { handleSignOut } from '@/firebase/auth/actions';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

function getTitleFromPathname(pathname: string): string {
    const title = pathname.split('/').pop() || 'dashboard';
    return title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ');
}

export function DashboardHeader() {
  const pathname = usePathname();
  const { auth, user } = useFirebase();
  const { locale, setLocale, t } = useLanguage();

  const title = getTitleFromPathname(pathname);
  const translatedTitle = t(`nav.${title.toLowerCase().replace(/ /g, '-')}`);


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />

      <h1 className="text-xl font-semibold md:text-2xl">{translatedTitle}</h1>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('header.language')}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={locale} onValueChange={(value) => setLocale(value as 'en' | 'hi' | 'kn')}>
                    <DropdownMenuRadioItem value="en">{t('lang.en')}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="hi">{t('lang.hi')}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="kn">{t('lang.kn')}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

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
                    {t('header.logout')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
