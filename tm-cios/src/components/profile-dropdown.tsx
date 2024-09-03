// 'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { auth, signOut } from '@/services/auth/auth';
import { Label } from './ui/label';

export async function ProfileDropdown() {
  const session = await auth();

  return (
    <>
      <Label className="text-nowrap">{session?.user?.name}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={session?.user?.image || '/logos/logo.png'}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem className='cursor-pointer'>Logout</DropdownMenuItem> */}
          <DropdownMenuItem className="cursor-pointer p-0">
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
              className="w-full"
            >
              <button
                type="submit"
                className="flex items-center justify-between w-full p-1"
              >
                <div className="block">Sair</div>
                <LogOut className="w-4 ml-auto" />
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
