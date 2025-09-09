import { createContext } from 'react';
import { loadFromLocalStorage } from './storage';
import type { gamesTable } from '~/db/schema';

export const CartContext = createContext<typeof gamesTable.$inferInsert[]>(loadFromLocalStorage('cart', []));