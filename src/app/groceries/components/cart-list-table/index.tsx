"use client";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import { GroceryCartItemDrawer } from "../grocery-cart-item-drawer";
import { GroceryListItemType } from "@/db/schema/groceries";

export function GroceryCartTable({ data }: { data: GroceryListItemType[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  return (
    <div>
      <input
        type="text"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        placeholder="Search item"
        className="border rounded-lg p-2 w-full mb-5"
      />
      <div className="w-full rounded border overflow-clip border-gray-200 relative">
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
            {table.getRowModel().rows.map((row) => {
              return (
                <GroceryCartItemDrawer item={row.original} key={row.id}>
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 even:bg-gray-50 hover:bg-indigo-200/20 hover:cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 pl-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                </GroceryCartItemDrawer>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
