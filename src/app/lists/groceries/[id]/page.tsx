"use client";
import { FileClockIcon, ListCheckIcon, PlusIcon } from "lucide-react";
import { GroceryListTable } from "./components/grocery-list-table";
import { AddGroceryListItemDrawer } from "./components/add-grocery-item-drawer";
import { BackButton } from "@/components/back-button";
import { useGroceryList } from "../hooks/useGroceryList";
import { useParams } from "next/navigation";

export default function GroceryListPage() {
  return (
    <div className="h-full flex flex-col">
      <header className="mb-4">
        <BackButton href="/lists" />
        <div className="flex justify-between items-baseline">
          <p className="text-2xl font-semibold">Grocery list</p>
          <FileClockIcon className="text-gray-400" size={20} />
        </div>
      </header>

      <GroceryList />
    </div>
  );
}

function GroceryList() {
  const params = useParams();
  const groceryList = useGroceryList({ id: 1 });

  // const groceryList = useGroceryList();

  if (groceryList.isError) {
    return <p className="text-red-500">Error loading grocery list</p>;
  }

  return (
    <>
      <section className="mb-4 flex-1">
        <GroceryListTable />
      </section>

      <GroceryListTotal />
      <div className="flex flex-col gap-4">
        <AddGroceryListItemDrawer groceryListId={Number(params.id)}>
          <button className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer flex-1">
            <PlusIcon size={16} /> Add Item
          </button>
        </AddGroceryListItemDrawer>

        <button className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer flex-1">
          <ListCheckIcon size={20} />
          Done
        </button>
      </div>
    </>
  );
}

function GroceryListTotal() {
  const groceryList = useGroceryList({ id: 1 });
  const total = groceryList.data?.items.reduce((acc, item) => {
    return acc + (item.unitPrice || 0) * item.quantity;
  }, 0);
  console.log("total", total);

  if (groceryList.isLoading) {
    <p className="text-2xl text-right font-semibold py-4">
      Total: <span className="h-10 w-20 bg-gray-400"></span>
    </p>;
  }
  return (
    <p className="text-2xl text-right font-semibold py-4">Total: ${total}</p>
  );
}
