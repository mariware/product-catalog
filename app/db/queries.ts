import { db } from "~/db";
import { gamesTable } from "~/db/schema";
import { asc, desc, sql } from 'drizzle-orm';

export async function getFeatured() {
  return await db.select().from(gamesTable).orderBy(desc(gamesTable.rating)).limit(1);
}

export async function getTopGames() {
  return await db.select().from(gamesTable).orderBy(desc(gamesTable.downloads)).limit(6);
}

export async function getFreeGames() {
  return await db.select().from(gamesTable).where(sql`${gamesTable.price} = "0"`).limit(6);
}

