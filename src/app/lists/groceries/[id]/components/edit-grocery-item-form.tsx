import { Drawer } from "vaul";
import { PropsWithChildren } from "react";
import { EditIcon, Trash2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroceryListItem, GroceryListItemSchema } from "../../types";
import { useUpdateGroceryListItem } from "../../hooks/useUpdateGroceryListItem";
import { useDeleteGroceryListItem } from "../../hooks/useDeleteGroceryListItem";

type Props = {
  item: GroceryListItem;
  onSuccess?: () => void;
} & PropsWithChildren;

export function EditGroceryItemForm(props: Props) {
  const deleteGroceryListItem = useDeleteGroceryListItem();
  const updateGroceryListItem = useUpdateGroceryListItem();

  const form = useForm<GroceryListItem>({
    resolver: zodResolver(GroceryListItemSchema),
    defaultValues: props.item,
  });

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
      <Drawer.Title className="font-semibold text-xl mb-4">
        {props.item.name}
      </Drawer.Title>
      <form
        onSubmit={form.handleSubmit((data) => {
          const { id, ...rest } = data;
          updateGroceryListItem.mutate({
            itemId: id,
            item: rest,
          });

          props.onSuccess?.();
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
          <EditIcon size={16} />
          Update Item
        </button>
      </form>
    </div>
  );
}
