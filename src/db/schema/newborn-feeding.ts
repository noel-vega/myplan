import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const newbornFeedingsTable = sqliteTable("newborn_feedings", {
  id: int().primaryKey({ autoIncrement: true }),
  datetime: text().notNull(),
  type: text({ enum: ["breast", "formula"] }).notNull(),
  unit: text({ enum: ["ounces", "minutes"] }).notNull(),
  amount: int().notNull(),
});

export const insertNewbornFeedingSchema =
  createInsertSchema(newbornFeedingsTable);
export type InsertNewbornFeedingType = z.infer<
  typeof insertNewbornFeedingSchema
>;

export const newbornFeedingSchema = createSelectSchema(newbornFeedingsTable);
export type NewbornFeedingType = z.infer<typeof newbornFeedingSchema>;
