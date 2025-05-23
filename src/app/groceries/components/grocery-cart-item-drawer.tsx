"use client";
import { Drawer } from "vaul";
import { PropsWithChildren, useState } from "react";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GroceryListItemType,
  updateGroceryListItemSchema,
  UpdateGroceryListItemType,
} from "@/db/schema/groceries";
import { z } from "zod";
import { useDeleteGroceryListItem } from "../hooks/useDeleteGroceryListItem";
import { useUpdateGroceryListItem } from "../hooks/useUpdateGroceryListItem";
import { LoadingSpinner } from "@/components/loading-spinner";
import { cn } from "@/lib/cn";

type Props = {
  item: GroceryListItemType;
  onSuccess?: () => void;
} & PropsWithChildren;

export function EditGroceryCartItemForm(props: Props) {
  const deleteGroceryListItem = useDeleteGroceryListItem();
  const updateGroceryListItem = useUpdateGroceryListItem();

  const form = useForm<UpdateGroceryListItemType & { id: number }>({
    resolver: zodResolver(
      updateGroceryListItemSchema.merge(z.object({ id: z.number() }))
    ),
    defaultValues: props.item,
  });

  const moveToGroceryList = () => {
    updateGroceryListItem.mutate(
      {
        itemId: props.item.id,
        item: { inCart: false },
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
        onSubmit={form.handleSubmit((data) => {
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
        className={cn("flex flex-col gap-4", {
          "opacity-50": updateGroceryListItem.isPending,
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
            type="button"
            className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer flex-1"
            onClick={moveToGroceryList}
            disabled={updateGroceryListItem.isPending}
          >
            <ArrowLeftIcon size={16} />
            Move to Grocery List
          </button>
        </div>
      </form>
    </div>
  );
}

export function GroceryCartItemDrawer(
  props: { item: GroceryListItemType } & PropsWithChildren
) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{props.children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed h-fit bottom-0 left-0 right-0 bg-white outline-none rounded-t-lg">
          <EditGroceryCartItemForm
            onSuccess={() => setOpen(false)}
            item={props.item}
          />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
