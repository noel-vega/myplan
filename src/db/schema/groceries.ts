import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

export const groceryListTable = sqliteTable("grocery_list", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export type GroceryListType = typeof groceryListTable.$inferSelect;

export const groceryListRelations = relations(groceryListTable, ({ many }) => ({
  items: many(groceryListItemsTable),
}));

export const groceryListItemsTable = sqliteTable("grocery_list_item", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  quantity: int().notNull(),
  unitPrice: int().notNull(),
  inCart: int({ mode: "boolean" }).notNull().default(false),
  groceryListId: int()
    .notNull()
    .references(() => groceryListTable.id, { onDelete: "cascade" }),
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

export const groceryListItemsRelations = relations(
  groceryListItemsTable,
  ({ one }) => ({
    groceryList: one(groceryListTable, {
      fields: [groceryListItemsTable.groceryListId],
      references: [groceryListTable.id],
    }),
  })
);
