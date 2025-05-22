import { PlusIcon } from "lucide-react";
import { GroceryListTable } from "./components/grocery-list-table";
import { AddGroceryListItemDrawer } from "./components/add-grocery-item-drawer";
import { GroceryCartTable } from "./components/cart-list-table";
import * as Tabs from "@/components/tabs";
import { GroceryListItemType } from "@/db/schema/groceries";
import { getGroceryCart, getGroceryList } from "./actions";

export default async function Page() {
  const groceries = await getGroceryList();
  const cart = await getGroceryCart();
  return (
    <Tabs.Root
      defaultValue="grocery-list"
      className="flex flex-col p-4 h-full max-w-3xl mx-auto w-full"
    >
      <Tabs.List>
        <Tabs.Trigger value="grocery-list">Groceries</Tabs.Trigger>
        <Tabs.Trigger value="cart">Cart</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="grocery-list" className="flex-1">
        <div className="flex flex-col h-full">
          <section className="mb-4 flex-1">
            <GroceryListTable data={groceries} />
          </section>

          <Total items={groceries} />
          <footer>
            <AddGroceryListItemDrawer />
          </footer>
        </div>
      </Tabs.Content>
      <Tabs.Content value="cart" className="flex-1">
        <div className="flex flex-col h-full">
          <section className="flex-1">
            <GroceryCartTable data={cart} />
          </section>

          <Total items={cart} />
          <footer>
            <button className="border rounded-lg p-2 flex items-center justify-center gap-4 text-lg w-full">
              <PlusIcon size={16} />
              New Cart
            </button>
          </footer>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

function Total({ items }: { items: GroceryListItemType[] }) {
  const total = items.reduce((acc, item) => {
    return acc + item.unitPrice * item.quantity;
  }, 0);

  return (
    <p className="text-2xl text-right font-semibold py-4">Total: ${total}</p>
  );
}
