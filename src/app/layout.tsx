import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '../styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s | TMSA CIOS',
    default: 'TMSA CIOS',
  },
  description: 'TMSA CIOS - Check-In & Out System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        {' '}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}{' '}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
