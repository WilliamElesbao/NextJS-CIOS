import { BreadcrumbComponent } from '@/components/breadcrumb';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ResponsiveSidebar } from '@/components/responsive-sidebar';
import { Sidebar } from '@/components/sidebar';
import { Label } from '@/components/ui/label';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | CIOS',
    default: 'CIOS',
  },
  description: 'CIOS - Check-In & Out System',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Sidebar />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/5 px-4 backdrop-blur-md sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <ResponsiveSidebar />
              <BreadcrumbComponent />

              <div className="relative ml-auto flex-1 md:grow-0"></div>

              <ProfileDropdown />
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}
