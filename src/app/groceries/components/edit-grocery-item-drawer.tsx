"use client";
import { Drawer } from "vaul";
import { PropsWithChildren, useState } from "react";
import { EditIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GroceryListItemType,
  updateGroceryListItemSchema,
  UpdateGroceryListItemType,
} from "@/db/schema/groceries";
import { z } from "zod";
import { useUpdateGroceryListItem } from "../hooks/useUpdateGroceryListItem";
import { useDeleteGroceryListItem } from "../hooks/useDeleteGroceryListItem";
import { cn } from "@/lib/cn";
import { LoadingSpinner } from "@/components/loading-spinner";

type Props = {
  item: GroceryListItemType;
  onSuccess?: () => void;
} & PropsWithChildren;

export function EditGroceryItemForm(props: Props) {
  const deleteGroceryListItem = useDeleteGroceryListItem();
  const updateGroceryListItem = useUpdateGroceryListItem();

  const form = useForm<UpdateGroceryListItemType & { id: number }>({
    resolver: zodResolver(
      updateGroceryListItemSchema.merge(z.object({ id: z.number() }))
    ),
    defaultValues: props.item,
  });

  const handleAddItemToCart = () => {
    updateGroceryListItem.mutate(
      {
        itemId: props.item.id,
        item: { inCart: true },
      },
      {
        onSuccess: () => {
          props.onSuccess?.();
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto relative px-4 py-8 ">
      <button
        onClick={() => {
          deleteGroceryListItem.mutate({ id: props.item.id });
          props.onSuccess?.();
        }}
        className="absolute top-4 right-4 text-red-500 p-2"
      >
        <Trash2Icon />
      </button>
      <Drawer.Title className="font-semibold text-xl mb-4 flex items-center gap-4">
        {props.item.name}
        <LoadingSpinner loading={updateGroceryListItem.isPending} />
      </Drawer.Title>
      <form
        className={cn("flex flex-col gap-4", {
          "opacity-50": updateGroceryListItem.isPending,
        })}
        onSubmit={form.handleSubmit((data) => {
          console.log("edit item", data);
          const { id, ...rest } = data;
          updateGroceryListItem.mutate(
            {
              itemId: id,
              item: rest,
            },
            {
              onSuccess: () => {
                props.onSuccess?.();
                form.reset();
              },
            }
          );
        })}
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer flex-1"
            disabled={updateGroceryListItem.isPending}
          >
            <EditIcon size={16} />
            Update Item
          </button>
          <button
            type="button"
            className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer flex-1"
            onClick={(e) => {
              e.stopPropagation();
              handleAddItemToCart();
            }}
            disabled={updateGroceryListItem.isPending}
          >
            <ShoppingCartIcon size={16} />
            Add to cart
          </button>
        </div>
      </form>
    </div>
  );
}

export function EditGroceryItemDrawer(
  props: { item: GroceryListItemType } & PropsWithChildren
) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{props.children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed h-fit bottom-0 left-0 right-0 bg-white outline-none rounded-t-lg">
          <EditGroceryItemForm
            onSuccess={() => setOpen(false)}
            item={props.item}
          />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
