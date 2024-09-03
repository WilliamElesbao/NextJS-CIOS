'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { deleteEquipment, editEquipment } from '@/lib/actions';
import { EquipmentsType } from '@prisma/client';
import { ChevronDownIcon, Pencil2Icon } from '@radix-ui/react-icons';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

export const columns: ColumnDef<EquipmentsType>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => (
      <div className="capitalize">{row.original.description}</div>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const equipId = row.original;

      const [equipmentToEdit, SetEquipmentToEdit] =
        useState<EquipmentsType | null>(null);
      const [openToEdit, setOpenToEdit] = useState(false);

      const [equipmentToDelete, SetEquipmentToDelete] =
        useState<EquipmentsType | null>(null);
      const [openToDelete, setOpenToDelete] = useState(false);

      const onSave = async () => {
        const result = await editEquipment(equipmentToEdit!);
        if (!result.status) {
          return toast({
            title: 'Erro ao atualizar',
            description: result.message,
          });
        }
        toast({
          title: 'Atualizado com sucesso',
          description: result.message,
        });
        setOpenToEdit(false);
      };

      const onDelete = async () => {
        const result = await deleteEquipment(equipmentToDelete!.id!);
        if (!result.status) {
          return toast({
            title: 'Erro ao excluir',
            description: result.message,
          });
        }
        toast({
          title: 'Excluído com sucesso',
          description: result.message,
        });
        setOpenToDelete(false);
      };

      return (
        <div className="flex justify-center gap-2 items-center">
          <Dialog open={openToEdit} onOpenChange={setOpenToEdit}>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="p-0 flex justify-center items-center w-7 h-7 rounded-full"
                onClick={() => SetEquipmentToEdit(equipId)}
              >
                <Pencil2Icon className="m-1 w-8 h-8" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar</DialogTitle>
                <DialogDescription>
                  Edite o registro selecionado
                </DialogDescription>
              </DialogHeader>
              {equipmentToEdit && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      value={equipmentToEdit.name}
                      onChange={(e) =>
                        SetEquipmentToEdit({
                          ...equipmentToEdit,
                          name: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descrição
                    </Label>
                    <Input
                      id="description"
                      value={equipmentToEdit.description}
                      onChange={(e) =>
                        SetEquipmentToEdit({
                          ...equipmentToEdit,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button onClick={onSave}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={openToDelete} onOpenChange={setOpenToDelete}>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="p-0 flex justify-center items-center w-7 h-7 rounded-full"
                onClick={() => SetEquipmentToDelete(equipId)}
              >
                <Trash2Icon className="m-1 w-8 h-8" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Excluir</DialogTitle>
                <DialogDescription>
                  Deseja excluir o registro {equipmentToDelete?.name}?
                </DialogDescription>
                <DialogDescription>Esta ação é irreversível.</DialogDescription>
              </DialogHeader>
              {equipmentToDelete && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      value={equipmentToDelete.name}
                      onChange={(e) =>
                        SetEquipmentToDelete({
                          ...equipmentToDelete,
                          name: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descrição
                    </Label>
                    <Input
                      id="description"
                      value={equipmentToDelete.description}
                      onChange={(e) =>
                        SetEquipmentToDelete({
                          ...equipmentToDelete,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button onClick={onDelete} variant={'destructive'}>
                  Excluir definitivamente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export function DataTable({ data }: { data: EquipmentsType[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrar..."
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
