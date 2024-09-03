import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { settingsMenu } from '@/lib/constants';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <h1 className="mb-4 text-xl font-bold md:text-2xl">Configurações</h1>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside>
            <ul className="flex flex-col gap-3">
              {settingsMenu.map((op) => (
                <li key={op.name}>
                  <Link href={op.href}>
                    <Button variant={'link'}>{op.name}</Button>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
