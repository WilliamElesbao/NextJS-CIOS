'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border border-primary">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="cursor-pointer px-2 hover:bg-primary duration-200"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="cursor-pointer px-2 hover:bg-primary duration-200"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="cursor-pointer px-2 hover:bg-primary duration-200"
        >
          System
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('darkOrange')}
          className="cursor-pointer px-2 hover:bg-primary duration-200"
        >
          Dark Orange
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('darkGreen')}
          className="cursor-pointer px-2 hover:bg-primary duration-200"
        >
          Dark Green
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('darkRose')}
          className="cursor-pointer px-2 hover:bg-primary duration-200"
        >
          Dark Rose
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('darkBlue')}
          className="cursor-pointer px-2 hover:bg-primary duration-200"
        >
          Dark Blue
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
