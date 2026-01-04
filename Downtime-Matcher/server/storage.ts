import { db } from "./db";
import {
  downtimeCodes,
  type InsertDowntimeCode,
  type DowntimeCode
} from "@shared/schema";
import { ilike, or } from "drizzle-orm";

export interface IStorage {
  searchDowntimeCodes(query: string): Promise<DowntimeCode[]>;
  getAllDowntimeCodes(): Promise<DowntimeCode[]>;
  createDowntimeCode(code: InsertDowntimeCode): Promise<DowntimeCode>;
}

export class DatabaseStorage implements IStorage {
  async searchDowntimeCodes(query: string): Promise<DowntimeCode[]> {
    if (!query) return this.getAllDowntimeCodes();
    const lowercaseQuery = `%${query.toLowerCase()}%`;
    return await db.select().from(downtimeCodes).where(
      or(
        ilike(downtimeCodes.code, lowercaseQuery),
        ilike(downtimeCodes.description, lowercaseQuery),
        ilike(downtimeCodes.machine, lowercaseQuery)
      )
    );
  }

  async getAllDowntimeCodes(): Promise<DowntimeCode[]> {
    return await db.select().from(downtimeCodes);
  }

  async createDowntimeCode(code: InsertDowntimeCode): Promise<DowntimeCode> {
    const [created] = await db.insert(downtimeCodes).values(code).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
