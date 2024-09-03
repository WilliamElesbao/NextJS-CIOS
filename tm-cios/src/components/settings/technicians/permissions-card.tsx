'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUserPermission } from '@/lib/actions';
import { UserSelect } from '@/lib/definitions';
import { useState } from 'react';
import { SelectDropdown } from './select-dropdown';

interface PermissionsCardProps {
  users: UserSelect[];
}

export default function PermissionsCard({ users }: PermissionsCardProps) {
  const [selectedUser, setSelectedUser] = useState<UserSelect>();

  const handleUserSelect = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  const handleUserPermissionStatusChange = (
    userId: string,
    newPermissionStatus: string,
  ) => {
    setSelectedUser({
      ...selectedUser,
      id: selectedUser?.id || '',
      label: selectedUser?.label || '',
      role: newPermissionStatus ? 'admin' : 'tech',
    });
    (async () => {
      await updateUserPermission(userId, newPermissionStatus);
    })();
  };

  return (
    <>
      <Card className="mx-auto min-h-80 w-7/12">
        <CardHeader className="pb-2 capitalize">
          <CardTitle className="text-xl">Permissões</CardTitle>
          <CardDescription>
            Configure as permissões de acesso as configurações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <SelectDropdown
              onItemChange={handleUserSelect}
              placeholder="Selecione um técnico"
              label="Selecione um Usuário"
              items={users}
            />
            {selectedUser && (
              <>
                <Select
                  onValueChange={(newPermissionStatus) =>
                    handleUserPermissionStatusChange(
                      selectedUser.id,
                      newPermissionStatus,
                    )
                  }
                  defaultValue={selectedUser.role || ''}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Função</SelectLabel>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="tech">Técnico</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
