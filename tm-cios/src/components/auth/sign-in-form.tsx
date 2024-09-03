'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Icons } from '../icons';

export function SignInForm() {
  return (
    <>
      <form
        className="grid gap-4"
        action={async () => {
          await signIn('microsoft-entra-id');
        }}
      >

        <Button className="mt-2 w-full" type="submit">
          <Icons.microsoft className="mr-2 h-5 w-5" />
          Entrar com Microsoft
        </Button>
      </form>
    </>
  );
}
