"use client";
import { GroceryListItem } from "../page";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGroceryList } from "../providers/grocery-list";
import { Drawer } from "vaul";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

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
    header: "Total Price",
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

export function GroceryListTable() {
  const groceryList = useGroceryList();
  const table = useReactTable({
    columns,
    data: groceryList.items,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleMinusClick = ({ itemId }: { itemId: string }) => {
    const currentQuantity = groceryList.items.find(
      (x) => x.id === itemId
    )?.quantity;
    console.log("itemCount", currentQuantity);
    if (currentQuantity === 0 || !currentQuantity) return;

    const newQuantity = currentQuantity - 1;
    if (newQuantity === 0) {
      groceryList.removeItem(itemId);
      return;
    }
    groceryList.setItemQuantity({ itemId, quantity: newQuantity });
  };

  const handlePlusClick = ({ itemId }: { itemId: string }) => {
    const currentQuantity = groceryList.items.find(
      (x) => x.id === itemId
    )?.quantity;
    console.log("itemCount", currentQuantity);
    if (currentQuantity === 0 || !currentQuantity) return;
    groceryList.setItemQuantity({ itemId, quantity: currentQuantity + 1 });
  };

  return (
    <div className="w-full rounded-lg overflow-clip">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left">
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
            <Drawer.Root key={row.id}>
              <Drawer.Trigger asChild>
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="fixed h-fit bottom-0 left-0 right-0 bg-white outline-none rounded-t-lg">
                  <div className="max-w-3xl mx-auto relative px-4 py-8 ">
                    <button className="absolute top-4 right-4 text-red-500 p-2">
                      <Trash2Icon />
                    </button>
                    <Drawer.Title className="font-semibold text-3xl mb-8 text-center">
                      {row.original.name}
                    </Drawer.Title>
                    {/* <div className="mb-4">
                      <p className="text-xl">
                        Quantity: {row.original.quantity}
                      </p>
                    </div> */}
                    <div className="flex gap-12 items-center">
                      <button
                        className="flex-1 flex justify-center border rounded py-2"
                        onClick={() =>
                          handleMinusClick({ itemId: row.original.id })
                        }
                      >
                        <MinusIcon />
                      </button>
                      <span className="text-6xl">{row.original.quantity}</span>

                      <button
                        onClick={() =>
                          handlePlusClick({ itemId: row.original.id })
                        }
                        className="flex-1 border rounded flex justify-center py-2"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          ))}
        </tbody>
      </table>
    </div>
  );
}
