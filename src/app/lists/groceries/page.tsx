"use client";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { GroceryListTable } from "./components/grocery-list-table";
import { Drawer } from "vaul";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const initGroceryList: GroceryList = {
  id: crypto.randomUUID(),
  name: "my first list",
  items: [
    {
      id: crypto.randomUUID(),
      name: "Milk",
      quantity: 2,
    },
    {
      id: crypto.randomUUID(),
      name: "Eggs",
      quantity: 12,
    },
  ],
};

type GroceryListContextType = {
  items: GroceryListItem[];
  addItem: (item: Omit<GroceryListItem, "id">) => void;
  removeItem: (itemId: string) => void;
};

export const GroceryListContext = createContext<GroceryListContextType | null>(
  null
);

export function useGroceryList() {
  const groceryList = useContext(GroceryListContext);
  if (!groceryList) {
    throw new Error("GroceryListContext is not provided");
  }
  return groceryList;
}

function GroceryListProvider(props: PropsWithChildren) {
  const [items, setItems] = useState<GroceryListItem[]>(initGroceryList.items);

  const addItem = ({ name, quantity }: { name: string; quantity: number }) => {
    const newItem: GroceryListItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== itemId);
    });
  };

  return (
    <GroceryListContext.Provider value={{ items, addItem, removeItem }}>
      {props.children}
    </GroceryListContext.Provider>
  );
}

export default function FoodShoppingLists() {
  return (
    <GroceryListProvider>
      <div className="px-4 h-full flex flex-col py-2 max-w-2xl mx-auto">
        <header className="mb-4">
          <Link href="/lists" className="flex items-center gap-1 py-2">
            <ArrowLeftIcon size={16} /> Back
          </Link>
          <div className="flex justify-between items-baseline">
            <p className="text-2xl font-semibold">Grocery list</p>
            {/* <h1 className="text-2xl font-semibold">{groceryList.name}</h1> */}
          </div>
        </header>

        <section className="mb-4 flex-1">
          <GroceryListTable />
        </section>

        <AddGroceryListItemDrawer />
      </div>
    </GroceryListProvider>
  );
}

const AddGroceryListItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(1, "Quantity is required"),
});

type AddGroceryListItemFormValues = z.infer<typeof AddGroceryListItemSchema>;

function AddGroceryListItemDrawer() {
  const [open, setOpen] = useState(false);
  const groceryList = useGroceryList();
  const form = useForm<AddGroceryListItemFormValues>({
    resolver: zodResolver(AddGroceryListItemSchema),
    defaultValues: {
      name: "",
      quantity: 1,
    },
  });

  useEffect(() => {
    console.log("errors", form.formState.errors);
  }, [form.formState.errors]);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      {!open ? (
        <Drawer.Trigger className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg">
          <PlusIcon size={16} /> Add Item
        </Drawer.Trigger>
      ) : null}

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-fit bg-white px-4 py-8 rounded-t-lg">
          <div className="max-w-lg mx-auto w-full">
            <Drawer.Title className="mb-4 font-semibold text-xl">
              Add item to grocery list
            </Drawer.Title>
            <form
              onSubmit={form.handleSubmit((data) => {
                groceryList.addItem({
                  name: data.name,
                  quantity: data.quantity,
                });
                setOpen(false);
                form.reset();
              })}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor="item-name">Name</label>
                <input
                  {...form.register("name")}
                  type="text"
                  id="item-name"
                  className="border rounded-lg p-2 w-full"
                />
              </div>

              <div>
                <label htmlFor="item-quantity">Quantity</label>
                <Controller
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.currentTarget.valueAsNumber);
                      }}
                      id="item-quantity"
                      className="border rounded-lg p-2 w-full"
                    />
                  )}
                />
              </div>
              <button
                type="submit"
                className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg"
              >
                <PlusIcon size={16} />
                Add Item
              </button>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
