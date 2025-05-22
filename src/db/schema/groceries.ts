import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

export const groceryListItemsTable = sqliteTable("grocery_list_item", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  quantity: int().notNull(),
  unitPrice: int().notNull(),
  inCart: int({ mode: "boolean" }).notNull().default(false),
});

export const insertGroceryListItemSchema = createInsertSchema(
  groceryListItemsTable
);
export type InsertGroceryListItemType = z.infer<
  typeof insertGroceryListItemSchema
>;

export const groceryListItemSchema = createSelectSchema(groceryListItemsTable);
export type GroceryListItemType = z.infer<typeof groceryListItemSchema>;

export const updateGroceryListItemSchema = createUpdateSchema(
  groceryListItemsTable
);
export type UpdateGroceryListItemType = z.infer<
  typeof updateGroceryListItemSchema
>;
