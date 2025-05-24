"use server";

import { db } from "@/db";
import { newbornFeedingsTable } from "@/db/schema";
import { InsertNewbornFeedingType } from "@/db/schema/newborn-feeding";
import { format } from "date-fns";
import { asc, eq, like } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createFeeding(params: InsertNewbornFeedingType) {
  await db.insert(newbornFeedingsTable).values(params);
  revalidatePath("/newborn-feeding");
}

export async function getNewbornFeedings() {
  const feedings = await db.query.newbornFeedingsTable.findMany({
    orderBy: asc(newbornFeedingsTable.datetime),
  });

  return feedings;
}

export async function getNewbornFeedingsByDate(date: Date) {
  const feedings = await db.query.newbornFeedingsTable.findMany({
    orderBy: asc(newbornFeedingsTable.datetime),
    where: like(
      newbornFeedingsTable.datetime,
      `${format(date, "yyyy-MM-dd")}%`
    ),
  });

  return feedings;
}

export async function deleteFeeding(id: number) {
  await db.delete(newbornFeedingsTable).where(eq(newbornFeedingsTable.id, id));
  revalidatePath("/newborn-feeding");
}
