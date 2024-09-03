import { AnimationCard } from '@/components/auth/animation-card';
import { SignInForm } from '@/components/auth/sign-in-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CIOS - Sign In',
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center h-screen lg:h-auto">
        <div className="mx-auto grid w-[370px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">C • I • O • S</h1>
            <p className="text-muted-foreground">Check In & Out System</p>
          </div>
          <SignInForm />
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center relative bg-muted">
        <AnimationCard />
      </div>
    </div>
  );
}
