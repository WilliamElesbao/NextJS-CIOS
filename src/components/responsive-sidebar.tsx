'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { links } from '@/lib/constants';
import clsx from 'clsx';
import { Package2, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './theme-switcher';

export function ResponsiveSidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'flex items-center gap-4 px-2.5',
                  { 'text-foreground': pathname === link.href },
                  {
                    'text-muted-foreground hover:text-foreground':
                      pathname !== link.href,
                  },
                )}
              >
                {link.icon && <link.icon className="h-5 w-5" />}
                {link.name}
              </Link>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeSwitcher />
              </TooltipTrigger>
            </Tooltip>
          </nav>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
