import { GroceryListItemType } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GroceryListItemType>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    filterFn: "includesString",
  },
  { accessorKey: "quantity", header: "Quantity" },
  {
    header: "Total",
    cell: ({ row }) => {
      const totalPrice =
        Number(row.original.unitPrice) * Number(row.original.quantity);
      return <p>$ {totalPrice}</p>;
    },
  },
];
