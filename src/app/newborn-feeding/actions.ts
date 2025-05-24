"use server";

import { db } from "@/db";
import { newbornFeedingsTable } from "@/db/schema";
import { InsertNewbornFeedingType } from "@/db/schema/newborn-feeding";
import { asc, eq, like } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createFeeding(params: InsertNewbornFeedingType) {
  const feeding = await db
    .insert(newbornFeedingsTable)
    .values(params)
    .returning();
  revalidatePath("/newborn-feeding");
  return feeding[0];
}

export async function getNewbornFeedingsByDate(date: string) {
  const feedings = await db.query.newbornFeedingsTable.findMany({
    orderBy: asc(newbornFeedingsTable.datetime),
    where: like(newbornFeedingsTable.datetime, `${date}%`),
  });

  return feedings;
}

export async function deleteFeeding(id: number) {
  const feeding = await db
    .delete(newbornFeedingsTable)
    .where(eq(newbornFeedingsTable.id, id))
    .returning();
  revalidatePath("/newborn-feeding");
  return feeding[0];
}
