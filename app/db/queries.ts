import { db } from "~/db";
import { gamesTable } from "~/db/schema";

export async function getGames() {
  return await db.select().from(gamesTable);
}
