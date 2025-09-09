import { useContext, useState } from "react";
import type { gamesTable } from "~/db/schema";
import { CartContext } from "~/utils/context";
import { saveToLocalStorage } from "~/utils/storage";

export function CardSkeleton() {
    return (
        <div className="card shadow-sm">
            <figure>
                <div
                    className="skeleton w-full rounded-lg aspect-16/9"
                />
            </figure>
            <div className="card-body px-0 py-2">
                <div className="skeleton h-6.75 w-24" />
                <div className="skeleton h-5.25 w-22" />
                <div className="skeleton h-8.75 w-23.5" />
            </div>
        </div>
    );
}

export function Card({ game }: { game: typeof gamesTable.$inferInsert }) {
    const cart = useContext(CartContext);

    const handleBuy = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!cart.some((g) => g.id === game.id)) {
            cart.push(game);
            saveToLocalStorage("cart", cart);
            window.dispatchEvent(new Event("cartUpdated"));
        }
    }

    return (
        <a href={`/games/${game.id}`}>
            <div className="card shadow-sm p-4 hover:bg-black bg-radial-[at_50%_100%] hover:from-indigo-900/50 hover:shadow-lg hover:shadow-indigo-800">
                <figure>
                    <img
                        className="rounded-lg aspect-16/9 object-cover"
                        src={`${game.backgroundImage}`}
                        alt="Game" />
                </figure>
                <div className="card-body px-0 pt-4 py-2 gap-1">
                    <h2 className="card-title text-xl font-[Afacad]">{game.name}</h2>
                    <p>{game.price == "0.00" ? "Free" : `$ ${game.price}`}</p>
                    <div className="card-actions pt-2">
                        <button className="btn btn-primary font-[Afacad] bg-linear-to-b from-black to-indigo-900 hover:from-indigo-600 transition-all duration-200" onClick={handleBuy} disabled={cart.some((g) => g.id === game.id)}>{cart.some((g) => g.id === game.id) ? "IN CART" : "ADD TO CART"}</button>
                    </div>
                </div>
            </div>
        </a>
    );
}