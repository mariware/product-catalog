import { db } from "./index";
import { gamesTable, genresTable, gameGenresTable, screenshotsTable } from "./schema";
import { eq } from "drizzle-orm";
import { genres } from "./fixtures/genres";
import { games } from "./fixtures/games";

type genreType = typeof genresTable.$inferInsert;
type gameType = typeof gamesTable.$inferInsert;

async function resetDb() {
  await db.delete(gamesTable);
  await db.delete(genresTable);
  await db.delete(gameGenresTable);
  await db.delete(screenshotsTable);

  console.log("🗑️ All tables cleared.");
}

async function insertGenres(g: genreType) {
  const [genre] = await db.select({ id: genresTable.id })
    .from(genresTable)
    .where(eq(genresTable.slug, g.slug));

  if (genre) return genre.id;

  const [insert] = await db.insert(genresTable).values(g).$returningId();
  return insert.id;
}

async function insertGames(g: gameType) {
  const [game] = await db.select({ id: gamesTable.id })
    .from(gamesTable)
    .where(eq(gamesTable.slug, g.slug));

  if (game) return game.id;

  const [insert] = await db.insert(gamesTable).values({
    slug: g.slug,
    name: g.name,
    backgroundImage: g.backgroundImage,
    rating: g.rating,
    ratingsCount: g.ratingsCount,
    playtime: g.playtime,
    price: g.price,
  }).$returningId();

  return insert.id;
}

async function seed() {
  console.log("🌱 Seeding started.");
  resetDb();

  for (const g of genres) {
    await insertGenres(g);
  }

  for (const g of games) {
    const gameId = await insertGames(g);

    for (const slug of g.genres) {
      const genreId = await insertGenres(genres.find(s => s.slug === slug)!);
      await db.insert(gameGenresTable).values({ gameId, genreId });
    }

    for (const img of g.screenshots) {
      await db.insert(screenshotsTable).values({ gameId, image: img });
    }
  }

  console.log("✅ Seeding completed.");
}

seed()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });