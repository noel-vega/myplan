"use server";
import { db } from "@/db";
import {
  groceryListItemsTable,
  GroceryListItemType,
  InsertGroceryListItemType,
} from "@/db/schema/groceries";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getGroceryList() {
  const groceryList = await db.query.groceryListItemsTable.findMany({
    where: eq(groceryListItemsTable.inCart, false),
  });
  return groceryList;
}

export async function getGroceryCart() {
  const cart = await db.query.groceryListItemsTable.findMany({
    where: eq(groceryListItemsTable.inCart, true),
  });
  return cart;
}

export async function addGroceryListItem(item: InsertGroceryListItemType) {
  const newGroceryListItem = (
    await db.insert(groceryListItemsTable).values(item).returning()
  )[0];
  revalidatePath("/groceries");
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
  revalidatePath("/groceries");
  return updatedGroceryListItem;
}

export async function deleteGroceryListItem({ id }: { id: number }) {
  const deletedGroceryListItem = (
    await db
      .delete(groceryListItemsTable)
      .where(eq(groceryListItemsTable.id, id))
      .returning()
  )[0];
  revalidatePath("/groceries");
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
  revalidatePath("/groceries");
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
  revalidatePath("/groceries");
  return updatedGroceryListItem;
}
