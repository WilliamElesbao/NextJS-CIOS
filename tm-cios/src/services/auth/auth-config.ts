import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthConfig, Session, User } from 'next-auth';
import { prisma } from '../db/prisma';
import { Adapter } from 'next-auth/adapters';
import { updateUserImage } from '@/lib/actions';

export const authConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: { signIn: '/' },
  callbacks: {
    async signIn({ account, user }: { account: any; user: User }) {
      if (!account) return true;

      const response = await fetch(
        'https://graph.microsoft.com/v1.0/me/photo/$value',
        {
          headers: {
            Authorization: `Bearer ${account?.access_token}`,
          },
          method: 'GET',
        },
      );

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        const userImage = `data:image/jpeg;base64,${base64Image}`;
        await updateUserImage(user.id, userImage);
      }
      return true;
    },
    async session({ session }: { session: Session }) {
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
