"use client";
import { NewbornFeedingType } from "@/db/schema/newborn-feeding";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { EditFeedingDrawer } from "./edit-feeding-drawer";

const columns: ColumnDef<NewbornFeedingType>[] = [
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      return format(row.original.datetime, "h:mm a"); // 'h' for 12-hour format without leading zero, 'a' for AM/PM
    },
  },
  {
    accessorKey: "feeding",
    header: "Feeding",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.type} {row.original.amount} {row.original.unit}
        </p>
      );
    },
  },
];

type Props = {
  // fetched server-side in next js page
  data: NewbornFeedingType[];
};
export function FeedingsTable(props: Props) {
  const table = useReactTable({
    data: props.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
              <EditFeedingDrawer id={row.original.id} key={row.id}>
                <tr
                  key={row.original.id}
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
              </EditFeedingDrawer>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
