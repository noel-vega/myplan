import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const groceryListTable = sqliteTable("grocery_list", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export type GroceryListType = typeof groceryListTable.$inferSelect;

export const groceryList = relations(groceryListTable, ({ many }) => ({
  items: many(groceryListItemsTable),
}));

export const groceryListItemsTable = sqliteTable("grocery_list_item", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  quantity: int().notNull(),
  unitPrice: int().notNull(),
  groceryListId: int()
    .notNull()
    .references(() => groceryListTable.id, { onDelete: "cascade" }),
});

export type GroceryListItemType = typeof groceryListItemsTable.$inferSelect;
export type AddGroceryListItemType = Omit<GroceryListItemType, "id">;

export const groceryListItemsRelations = relations(
  groceryListItemsTable,
  ({ one }) => ({
    groceryList: one(groceryListTable, {
      fields: [groceryListItemsTable.groceryListId],
      references: [groceryListTable.id],
    }),
  })
);
