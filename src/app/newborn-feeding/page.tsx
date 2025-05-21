"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Drawer } from "vaul";
import { format, parse } from "date-fns";
import { PlusIcon } from "lucide-react";
import { SelectProvider } from "./select-context";

export default function Page() {
  const date = new Date();
  const [feedings, setFeedings] = useState<FeedingType[]>([]);
  console.log(feedings);
  return (
    <SelectProvider>
      <div className="border h-full flex flex-col max-w-3xl mx-auto p-4">
        <section className="flex-1">
          <div className="flex items-end justify-between text-2xl font-semibold mb-4">
            <p className="text-3xl">Feeding</p>
            <p className="text-lg">{date.toLocaleDateString("en-US")}</p>
          </div>
          <FeedingTable data={feedings} />
        </section>

        <footer>
          <AddFeedingDrawer
            onSubmit={(feeding) => {
              console.log("Feeding", feeding);
              setFeedings((prev) => [...prev, feeding]);
            }}
          />
        </footer>
      </div>
    </SelectProvider>
  );
}

function AddFeedingDrawer({
  onSubmit,
}: {
  onSubmit: (feeding: FeedingType) => void;
}) {
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [ounces, setOunces] = useState(2);
  console.log(time);
  return (
    <Drawer.Root>
      <Drawer.Trigger className="border w-full rounded-lg p-2 cursor-pointer flex items-center gap-2 justify-center text-xl">
        <PlusIcon size={16} />
        Feed
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={
            "fixed bottom-0 left-0 right-0 bg-white p-8 rounded-t-lg outline-none"
          }
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <Drawer.Title className="py-0" />
            <div className="flex justify-between text-2xl">
              <div className="flex flex-col gap-1">
                <label>Time</label>
                <input
                  type="time"
                  value={time}
                  className="w-fit"
                  onChange={(e) => {
                    setTime(e.currentTarget.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Ounces</label>
                <input
                  type="number"
                  value={ounces}
                  className="w-20 px-2"
                  onChange={(e) => {
                    setOunces(Number(e.currentTarget.value));
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                onSubmit({ ounces, time: parse(time, "HH:mm", new Date()) })
              }
              className="border w-full p-4 rounded-lg text-xl"
            >
              Submit
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

type FeedingType = {
  time: Date;
  ounces: number;
};

const columns: ColumnDef<FeedingType>[] = [
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <p>{format(row.original.time, "hh:mm a")}</p>,
  },
  { accessorKey: "ounces", header: "Ounces" },
];

function FeedingTable({ data }: { data: FeedingType[] }) {
  const table = useReactTable({
    data,
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
