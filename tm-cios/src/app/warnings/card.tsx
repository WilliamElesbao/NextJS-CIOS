import { EvervaultCard, Icon } from '@/components/ui/evervault-card';
import { Button } from '@/components/ui/moving-border';
import Link from 'next/link';
import React from 'react';

export function AnimationCard() {
  return (
    <div className="flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <EvervaultCard text="Acesso Negado" />

      <h2 className="dark:text-white text-white mt-4 text-sm">
        Você não tem permissão para acessar esse serviço. Por favor contate o
        administrador do sistema.
      </h2>
      <Link href={'/'} className=' w-full'>
      <Button className='w-full'>Retornar à plataforma CIOS</Button>
      </Link>
    </div>
  );
}
