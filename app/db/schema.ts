import { decimal, int, mysqlTable, primaryKey, serial, varchar } from 'drizzle-orm/mysql-core';

export const gamesTable = mysqlTable('games', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  backgroundImage: varchar('background_image', { length: 255 }),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  ratingsCount: int('ratings_count'),
  downloads: int('downloads'),
  playtime: int('playtime'),
  price: decimal('price', { precision: 10, scale: 2 }),
});

export const genresTable = mysqlTable('genres', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  backgroundImage: varchar('background_image', { length: 255 }),
});

export const gameGenresTable = mysqlTable(
  'game_genres',
  {
    gameId: int('gameId')
      .notNull()
      .references(() => gamesTable.id),
    genreId: int('genreId')
      .notNull()
      .references(() => genresTable.id),
  },
  (table) => [
    primaryKey({ columns: [table.gameId, table.genreId] }),
  ]
);

export const screenshotsTable = mysqlTable('screenshots', {
  id: serial('id').primaryKey(),
  gameId: int('gameId')
    .notNull()
    .references(() => gamesTable.id),
  image: varchar('image', { length: 255 }).notNull(),
});