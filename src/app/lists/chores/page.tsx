"use client";
import { useState } from "react";

// type ChoreList = {
//   id: string;
//   name: string;
//   items: ChoreListItem[];
// };

// type ChoreListItem = {
//   id: string;
//   name: string;
// };

export default function Chores() {
  const [listName, setListName] = useState("");
  const handleCreateShoppingList = (e: React.FormEvent) => {
    e.preventDefault();
    const name = listName.trim();
    if (!name) return;
    // const newList: ChoreList = {
    //   id: crypto.randomUUID(),
    //   name,
    //   items: [],
    // };
  };
  return (
    <div>
      <h1>Chores</h1>

      <form onSubmit={handleCreateShoppingList}>
        <input
          value={listName}
          onInput={(e) => setListName(e.currentTarget.value)}
        />
        <button>Create</button>
      </form>
      <section>
        <h2>My Chores</h2>
      </section>
    </div>
  );
}
