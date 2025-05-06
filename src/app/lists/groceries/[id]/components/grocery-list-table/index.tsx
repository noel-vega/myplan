"use client";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { GroceryListItem } from "../../../types";
import { useState } from "react";
import { columns } from "./columns";
import { EditGroceryItemDrawer } from "../edit-grocery-item-drawer";

export function GroceryListTable({ data }: { data: GroceryListItem[] }) {
  console.log("GroceryListTable rendered");
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
    <>
      {/* {groceryList.isLoading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="h-16 w-16 animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full" />
          <p className="text-lg">Loading grocery list</p>
        </div>
      ) : ( */}
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
                return <GroceryListRow key={row.id} row={row} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

function GroceryListRow({ row }: { row: Row<GroceryListItem> }) {
  return (
    <EditGroceryItemDrawer item={row.original} key={row.id}>
      <tr className="border-b border-gray-200 even:bg-gray-50 hover:bg-indigo-200/20 hover:cursor-pointer">
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="py-3 pl-2">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    </EditGroceryItemDrawer>
  );
}
