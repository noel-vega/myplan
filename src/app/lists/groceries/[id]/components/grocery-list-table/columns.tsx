import { ColumnDef } from "@tanstack/react-table";
import { GroceryListItem } from "../../../types";

export const columns: ColumnDef<GroceryListItem>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    filterFn: "includesString",
  },
  { accessorKey: "quantity", header: "Quantity" },
  //   {
  //     accessorKey: "unitPrice",
  //     header: "Unit Price",
  //     cell: ({ row }) => <p>${row.original.unitPrice}</p>,
  //   },
  {
    header: "Total",
    cell: ({ row }) => {
      const totalPrice =
        Number(row.original.unitPrice) * Number(row.original.quantity);
      return <p>$ {totalPrice}</p>;
    },
  },
];
