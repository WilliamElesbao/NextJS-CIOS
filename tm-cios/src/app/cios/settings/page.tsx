import { verifyUserPermission } from '@/lib/data';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Configurações',
};

export default async function Page() {
  const isAdmin = await verifyUserPermission();

  if (!isAdmin) {
    redirect('/warnings');
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Painel de configurações</h3>
          <p className="text-sm text-muted-foreground">
            Cadastre novos equipamentos e motivos.
          </p>
        </div>
      </div>
    </>
  );
}
