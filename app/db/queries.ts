import { db } from "~/db";
import { gamesTable } from "~/db/schema";
import { asc, desc, sql, like } from 'drizzle-orm';

export async function getFeatured() {
  return await db.select().from(gamesTable).orderBy(desc(gamesTable.rating)).limit(1);
}

export async function getTopGames() {
  return await db.select().from(gamesTable).orderBy(desc(gamesTable.downloads)).limit(6);
}

export async function getFreeGames() {
  return await db.select().from(gamesTable).where(sql`${gamesTable.price} = "0"`).limit(6);
}

export async function getGames(query: string) {
  console.log(query);
  return await db.select().from(gamesTable).where(like(gamesTable.name, `%${query}%`)).limit(3);
}

export async function getPaginatedGames({ page }: { page: number }) {
  const offset = (page - 1) * 12;

  const [games, countResult] = await Promise.all([
    db.select().from(gamesTable).limit(12).offset(offset).orderBy(desc(gamesTable.downloads)),
    db.select({ count: sql`count(*)`.mapWith(Number) }).from(gamesTable),
  ]);

  return [games, countResult[0].count];
}
