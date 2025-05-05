"use client";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { GroceryListTable } from "./components/grocery-list-table";
import { GroceryListProvider, useGroceryList } from "./providers/grocery-list";
import { AddGroceryListItemDrawer } from "./components/add-grocery-item-drawer";

export default function GroceryList() {
  return (
    <GroceryListProvider>
      <div className="px-4 h-full flex flex-col py-2 max-w-2xl mx-auto">
        <header className="mb-4">
          <Link href="/lists" className="flex items-center gap-1 py-2 mb-4">
            <ArrowLeftIcon size={16} /> Back
          </Link>
          <div className="flex justify-between items-baseline">
            <p className="text-2xl font-semibold">Grocery list</p>
          </div>
        </header>

        <section className="mb-4 flex-1">
          <GroceryListTable />
        </section>

        <GroceryListTotal />
        <AddGroceryListItemDrawer />
      </div>
    </GroceryListProvider>
  );
}

function GroceryListTotal() {
  const groceryList = useGroceryList();
  const total = groceryList.items.reduce((acc, item) => {
    return acc + (item.unitPrice || 0) * item.quantity;
  }, 0);
  console.log("total", total);
  return (
    <p className="text-2xl text-right font-semibold py-4">Total: ${total}</p>
  );
}
