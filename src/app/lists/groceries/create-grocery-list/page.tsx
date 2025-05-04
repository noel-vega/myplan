import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function CreateGroceryList() {
  return (
    <div className="px-4">
      <Link href="/lists/groceries" className="flex items-center gap-1 py-2">
        <ArrowLeftIcon size={16} /> Back
      </Link>
      <h1 className="text-2xl font-semibold mb-4">Create Grocery List</h1>
      <form className="space-y-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="list-name">List Name</label>
          <input
            type="text"
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
