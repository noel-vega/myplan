"use client";
import { PlusIcon } from "lucide-react";
import { GroceryListTable } from "./components/grocery-list-table";
import { AddGroceryListItemDrawer } from "./components/add-grocery-item-drawer";
import { useGroceryList } from "../hooks/useGroceryList";
import { useParams } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { GroceryCartTable } from "./components/cart-list-table";

export default function GroceryListPage() {
  const [tab, setTab] = useState("grocery-list");
  return (
    <Tabs.Root
      value={tab}
      onValueChange={setTab}
      defaultValue="grocery-list"
      className="flex flex-col p-4 h-full max-w-3xl mx-auto w-full"
    >
      <Tabs.List className="flex gap-4 mb-4 bg-gray-100 p-1 rounded-lg">
        <Tabs.Trigger
          value="grocery-list"
          className={cn("py-2 flex-1  rounded-lg cursor-pointer", {
            "bg-white shadow": tab === "grocery-list",
          })}
        >
          Groceries
        </Tabs.Trigger>
        <Tabs.Trigger
          value="cart"
          className={cn("py-2 flex-1  rounded-lg cursor-pointer", {
            "bg-white shadow": tab === "cart",
          })}
        >
          Cart
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="grocery-list" className="flex-1">
        <GroceryList />
      </Tabs.Content>
      <Tabs.Content value="cart" className="flex-1">
        <div className="flex flex-col h-full">
          <section className="flex-1">
            <GroceryCartTable />
          </section>

          <button
            className="border rounded-lg p-2 flex items-center justify-center gap-4 text-lg"
            onClick={() => {}}
          >
            <PlusIcon size={16} />
            New Cart
          </button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

function GroceryList() {
  const params = useParams();
  const groceryList = useGroceryList({ id: Number(params.id) });

  return (
    <div className="flex flex-col h-full">
      <section className="mb-4 flex-1">
        <GroceryListTable
          data={groceryList.data?.items.filter((x) => !x.inCart) ?? []}
        />
      </section>

      <GroceryListTotal />
      <div>
        <AddGroceryListItemDrawer groceryListId={Number(params.id)}>
          <button className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer flex-1">
            <PlusIcon size={16} /> Add Item
          </button>
        </AddGroceryListItemDrawer>
      </div>
    </div>
  );
}

function GroceryListTotal() {
  const groceryList = useGroceryList({ id: 1 });
  const total = groceryList.data?.items.reduce((acc, item) => {
    if (!item.inCart) {
      return acc + item.unitPrice * item.quantity;
    }
    return acc;
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
