import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>Configurações</h1>
      <ul>
        <li>
          <Link href={'/cios/settings/equipments'}>
            <Button>Equipamentos</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
