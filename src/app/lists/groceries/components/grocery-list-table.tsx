"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Drawer } from "vaul";
import { EditGroceryItemForm } from "./edit-grocery-item-form";
import { GroceryListItem } from "../types";
import { PropsWithChildren, useState } from "react";

// type GroceryListTableProps = {
//   groceryList: GroceryList;
// };

const columns: ColumnDef<GroceryListItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  { accessorKey: "quantity", header: "Quantity" },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => <p>${row.original.unitPrice}</p>,
  },
  {
    header: "Total",
    cell: ({ row }) => {
      const totalPrice =
        Number(row.original.unitPrice) * Number(row.original.quantity);
      console.log(
        `${row.original.unitPrice} * ${row.original.quantity} = ${totalPrice}`
      );
      return <p>$ {totalPrice}</p>;
    },
  },
];

export function GroceryListTable({ items }: { items: GroceryListItem[] }) {
  const table = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
  });
  // const handleMinusClick = ({ itemId }: { itemId: string }) => {
  //   const currentQuantity = groceryList.items.find(
  //     (x) => x.id === itemId
  //   )?.quantity;
  //   console.log("itemCount", currentQuantity);
  //   if (currentQuantity === 0 || !currentQuantity) return;

  //   const newQuantity = currentQuantity - 1;
  //   if (newQuantity === 0) {
  //     groceryList.removeItem(itemId);
  //     return;
  //   }
  //   groceryList.setItemQuantity({ itemId, quantity: newQuantity });
  // };

  // const handlePlusClick = ({ itemId }: { itemId: string }) => {
  //   const currentQuantity = groceryList.items.find(
  //     (x) => x.id === itemId
  //   )?.quantity;
  //   console.log("itemCount", currentQuantity);
  //   if (currentQuantity === 0 || !currentQuantity) return;
  //   groceryList.setItemQuantity({ itemId, quantity: currentQuantity + 1 });
  // };

  return (
    <div className="w-full rounded border overflow-clip border-gray-200">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left pl-2 py-3 bg-gray-50"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <EditGroceryItemDrawer item={row.original} key={row.id}>
              <tr
                key={row.id}
                className="border-b border-gray-200 even:bg-gray-50 hover:bg-indigo-200/20 hover:cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 pl-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            </EditGroceryItemDrawer>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditGroceryItemDrawer(
  props: { item: GroceryListItem } & PropsWithChildren
) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{props.children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed h-fit bottom-0 left-0 right-0 bg-white outline-none rounded-t-lg">
          <EditGroceryItemForm
            onSuccess={() => setOpen(false)}
            item={props.item}
          />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
