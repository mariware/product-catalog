import type { gamesTable } from "~/db/schema";

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

export function Card({game} : {game: typeof gamesTable.$inferInsert}) {
    return (
        <div className="card shadow-sm">
            <figure>
                <img
                    className="rounded-lg aspect-16/9 object-cover"
                    src={`${game.backgroundImage}`}
                    alt="Game" />
            </figure>
            <div className="card-body px-0 py-2">
                <h2 className="card-title">{game.name}</h2>
                <p>{game.price == "0.00" ? "Free" : `$ ${game.price}`}</p>
                <div className="card-actions pt-2">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}