"use client";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { GroceryListTable } from "./components/grocery-list-table";
import { Drawer } from "vaul";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GroceryListProvider, useGroceryList } from "./providers/grocery-list";

export type GroceryList = {
  id: string;
  name: string;
  items: GroceryListItem[];
};

export type GroceryListItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice?: number;
};

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

        <div>
          <GroceryListTotal />
        </div>
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

const AddGroceryListItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(1, "Quantity is required"),
  unitPrice: z.number().min(0, "Unit price is required"),
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
      unitPrice: 0,
    },
  });

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      {!open ? (
        <Drawer.Trigger className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer">
          <PlusIcon size={16} /> Add Item
        </Drawer.Trigger>
      ) : null}

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={
            "fixed bottom-0 left-0 right-0 bg-white px-4 py-8 rounded-t-lg outline-none"
          }
        >
          <div className="max-w-lg mx-auto w-full">
            <Drawer.Title className="mb-4 font-semibold text-xl">
              Add item to grocery list
            </Drawer.Title>
            <form
              onSubmit={form.handleSubmit((data) => {
                console.log(data, "data");
                groceryList.addItem({
                  name: data.name,
                  quantity: data.quantity,
                  unitPrice: data.unitPrice,
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
                <label htmlFor="item-unit-price">Unit Price</label>
                <Controller
                  control={form.control}
                  name={"unitPrice"}
                  render={({ field }) => (
                    <input
                      type="number"
                      value={field.value}
                      onBlur={(e) => {
                        if (!e.currentTarget.value) {
                          field.onChange(0);
                        }
                      }}
                      onChange={(e) => {
                        field.onChange(e.currentTarget.valueAsNumber);
                      }}
                      id="item-unit-price"
                      className="border rounded-lg p-2 w-full"
                    />
                  )}
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
                      onBlur={(e) => {
                        if (!e.currentTarget.value) {
                          field.onChange(0);
                        }
                      }}
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
                className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer"
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
