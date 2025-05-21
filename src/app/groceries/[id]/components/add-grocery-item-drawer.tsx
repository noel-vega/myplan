import { PlusIcon } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { Drawer } from "vaul";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAddGroceryListItem } from "../../hooks/useAddGroceryListItem";
import {
  insertGroceryListItemSchema,
  InsertGroceryListItemType,
} from "@/db/schema/groceries";

export function AddGroceryListItemDrawer({
  children,
}: { groceryListId: number } & PropsWithChildren) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      {!open ? <Drawer.Trigger asChild>{children}</Drawer.Trigger> : null}

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
            <AddGroceryListItemForm onSuccess={() => setOpen(false)} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function AddGroceryListItemForm({ onSuccess }: { onSuccess?: () => void }) {
  const addItem = useAddGroceryListItem();
  const form = useForm<InsertGroceryListItemType>({
    resolver: zodResolver(insertGroceryListItemSchema),
  });
  return (
    <form
      onSubmit={form.handleSubmit((item) => {
        addItem.mutate({
          item,
        });

        onSuccess?.();
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
  );
}
