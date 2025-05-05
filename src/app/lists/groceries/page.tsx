"use client";
import { ArrowLeftIcon, ListCheckIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { GroceryListTable } from "./components/grocery-list-table";
import { GroceryListProvider, useGroceryList } from "./providers/grocery-list";
import { AddGroceryListItemDrawer } from "./components/add-grocery-item-drawer";
import { useState } from "react";

export default function GroceryListPage() {
  return (
    <GroceryListProvider>
      <GroceryList />
    </GroceryListProvider>
  );
}

function GroceryList() {
  const groceryList = useGroceryList();
  const [searchName, setSearchName] = useState("");
  return (
    <div className="h-full flex flex-col py-2 max-w-2xl mx-auto px-2">
      <header className="mb-4">
        <Link href="/lists" className="flex items-center gap-1 py-2 mb-4">
          <ArrowLeftIcon size={16} /> Back
        </Link>
        <div className="flex justify-between items-baseline">
          <p className="text-2xl font-semibold">Grocery list</p>
        </div>
      </header>

      <section>
        <input
          type="text"
          value={searchName}
          onInput={(e) => {
            setSearchName(e.currentTarget.value);
          }}
          placeholder="Search item"
          className="border rounded-lg p-2 w-full mb-5"
        />
      </section>

      <section className="mb-4 flex-1">
        <GroceryListTable
          items={groceryList.items.filter((x) =>
            x.name.toLowerCase().includes(searchName.toLowerCase())
          )}
        />
      </section>

      <GroceryListTotal />
      <div className="flex gap-4">
        <AddGroceryListItemDrawer>
          <button className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer flex-1">
            <PlusIcon size={16} /> Add Item
          </button>
        </AddGroceryListItemDrawer>

        <button className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer flex-1">
          <ListCheckIcon size={20} />
          Done
        </button>
      </div>
    </div>
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
