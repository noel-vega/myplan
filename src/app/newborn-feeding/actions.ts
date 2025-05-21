"use server";

import { db } from "@/db";
import { newbornFeedingsTable } from "@/db/schema";
import { InsertNewbornFeedingType } from "@/db/schema/newborn-feeding";
import { desc, eq } from "drizzle-orm";

export async function createFeeding(params: InsertNewbornFeedingType) {
  await db.insert(newbornFeedingsTable).values(params);
}

export async function getNewbornFeedings() {
  const feedings = await db.query.newbornFeedingsTable.findMany({
    orderBy: desc(newbornFeedingsTable.id),
  });

  return feedings;
}

export async function deleteFeeding(id: number) {
  await db.delete(newbornFeedingsTable).where(eq(newbornFeedingsTable.id, id));
}
