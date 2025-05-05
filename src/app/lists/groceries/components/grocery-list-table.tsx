"use client";
import { GroceryListItem, useGroceryList } from "../page";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// type GroceryListTableProps = {
//   groceryList: GroceryList;
// };

const columns: ColumnDef<GroceryListItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  { accessorKey: "quantity", header: "Quantity" },
];

export function GroceryListTable() {
  const groceryList = useGroceryList();
  const table = useReactTable({
    columns,
    data: groceryList.items,
    getCoreRowModel: getCoreRowModel(),
  });
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
