"use client";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type GroceryList = {
  id: string;
  name: string;
  items: GroceryListItem[];
};

export type GroceryListItem = {
  id: string;
  name: string;
  quantity: number;
};

export default function FoodShoppingLists() {
  const [lists, setLists] = useState<GroceryList[]>([]);

  return (
    <div className="px-4">
      <div className="">
        <Link href="/lists" className="flex items-center gap-1 py-2">
          <ArrowLeftIcon size={16} /> Back
        </Link>
        <h1 className="text-2xl font-semibold">Grocery Lists</h1>
      </div>

      <section className="py-4">
        <Link
          href="/lists/groceries/create-grocery-list"
          className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg"
        >
          {" "}
          <PlusIcon size={16} /> Create
        </Link>
      </section>

      <section>
        <ul>
          {lists.map((list) => (
            <li>{list.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
