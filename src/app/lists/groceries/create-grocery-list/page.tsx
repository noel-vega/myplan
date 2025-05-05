"use client";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreateGroceryList() {
  const [listName, setListName] = useState("");
  const handleCreateShoppingList = (e: React.FormEvent) => {
    e.preventDefault();
    const name = listName.trim();
    if (!name) return;
    // const newList: GroceryList = {
    //   id: crypto.randomUUID(),
    //   name,
    //   items: [],
    // };
  };
  return (
    <div className="px-4">
      <Link href="/lists/groceries" className="flex items-center gap-1 py-2">
        <ArrowLeftIcon size={16} /> Back
      </Link>
      <h1 className="text-2xl font-semibold mb-4">Create Grocery List</h1>
      <form className="space-y-2" onSubmit={handleCreateShoppingList}>
        <div className="flex flex-col gap-2">
          <label htmlFor="list-name">List Name</label>
          <input
            type="text"
            value={listName}
            onInput={(e) => setListName(e.currentTarget.value)}
            placeholder="List Name"
            className="border rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-lg bg-gray-100  px-4 w-full font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  );
}
