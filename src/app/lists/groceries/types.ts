import { z } from "zod";

export const GroceryListItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(1, "Quantity is required"),
  unitPrice: z.number().min(0, "Unit price is required"),
});

export type GroceryListItem = z.infer<typeof GroceryListItemSchema>;

export const AddGroceryListItemSchema = GroceryListItemSchema.omit({
  id: true,
});

export type AddGroceryListItemFormValues = z.infer<
  typeof AddGroceryListItemSchema
>;

export type GroceryList = {
  id: string;
  name: string;
  items: GroceryListItem[];
};
