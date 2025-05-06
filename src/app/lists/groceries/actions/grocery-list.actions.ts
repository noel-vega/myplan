"use server";
import { db } from "@/db";
import {
  groceryListItemsTable,
  GroceryListItemType,
  groceryListTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { AddGroceryListItemFormValues } from "../types";

export async function getGroceryList({ id }: { id: number }) {
  const groceryList = await db.query.groceryListTable.findFirst({
    where: eq(groceryListTable.id, id),
    with: {
      items: true,
    },
  });
  return groceryList;
}

export async function addGroceryListItem({
  groceryListId,
  item,
}: {
  groceryListId: number;
  item: AddGroceryListItemFormValues;
}) {
  const newGroceryListItem = (
    await db
      .insert(groceryListItemsTable)
      .values({ groceryListId, ...item })
      .returning()
  )[0];
  return newGroceryListItem;
}

export async function updateGroceryListItem({
  itemId,
  item,
}: {
  itemId: number;
  item: Partial<GroceryListItemType>;
}) {
  const updatedGroceryListItem = (
    await db
      .update(groceryListItemsTable)
      .set(item)
      .where(eq(groceryListItemsTable.id, itemId))
      .returning()
  )[0];
  return updatedGroceryListItem;
}

export async function deleteGroceryListItem({ id }: { id: number }) {
  const deletedGroceryListItem = (
    await db
      .delete(groceryListItemsTable)
      .where(eq(groceryListItemsTable.id, id))
      .returning()
  )[0];
  return deletedGroceryListItem;
}

export async function addGroceryItemToCart({ itemId }: { itemId: number }) {
  const updatedGroceryListItem = (
    await db
      .update(groceryListItemsTable)
      .set({ inCart: true })
      .where(eq(groceryListItemsTable.id, itemId))
      .returning()
  )[0];
  return updatedGroceryListItem;
}

export async function removeGroceryItemFromCart({
  itemId,
}: {
  itemId: number;
}) {
  const updatedGroceryListItem = (
    await db
      .update(groceryListItemsTable)
      .set({ inCart: false })
      .where(eq(groceryListItemsTable.id, itemId))
      .returning()
  )[0];
  return updatedGroceryListItem;
}
