import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const downtimeCodes = pgTable("downtime_codes", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description").notNull(),
  machine: varchar("machine", { length: 100 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
});

export const insertDowntimeCodeSchema = createInsertSchema(downtimeCodes).omit({ id: true });

export type DowntimeCode = typeof downtimeCodes.$inferSelect;
export type InsertDowntimeCode = z.infer<typeof insertDowntimeCodeSchema>;
