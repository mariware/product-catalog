import type { Route } from "./+types/game";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { getGameDetails } from "~/db/queries";
import { StarHalfIcon, StarIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "~/utils/context";
import { saveToLocalStorage } from "~/utils/storage";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Catalog | Game" },
        { name: "description", content: "Browse latest games." },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const id = Number(url.pathname.slice(7));
    const [game, screenshots] = await getGameDetails(id);
    return [game, screenshots];
}

export default function Game({ loaderData }: Route.ComponentProps) {
    const [game, screenshots] = loaderData;
    const gameDetails = game[0].games;
    const gameGenres = game.flatMap(g => 'genres' in g ? g.genres : []);
    const gameScreenshots = screenshots.flatMap(g => 'screenshots' in g ? g.screenshots : []);

    const [preview, setPreview] = useState(gameDetails.backgroundImage);
    const [scroll, setScroll] = useState(1);
    const [startIndex, setStartIndex] = useState(0);

    const cart = useContext(CartContext);

    const handleBuy = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!cart.some((g) => g.id === gameDetails.id)) {
            cart.push(gameDetails);
            saveToLocalStorage("cart", cart);
            window.dispatchEvent(new Event("cartUpdated"));
        }
    }

    useEffect(() => {
        const update = () => {
            if (window.innerWidth >= 1024) setScroll(3);
            else if (window.innerWidth >= 640) setScroll(2);
            else setScroll(1);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const handlePrev = () => {
        setStartIndex((prev) => (prev - scroll + gameScreenshots.length) % gameScreenshots.length);
    };

    const handleNext = () => {
        setStartIndex((prev) => (prev + scroll) % gameScreenshots.length);
    };

    return (
        <>
            <Header />
            <img className="h-48 object-cover w-full" src={`${preview}`} />
            <div className="flex flex-col w-fit max-w-[80%] rounded-xl p-8 sm:px-16 gap-4 bg-base-200 -translate-y-16 items-center justify-center">
                <p className="text-4xl text-center font-bold">{gameDetails.name}</p>
                <div className="w-full flex flex-wrap gap-2 items-center justify-center">
                    {gameGenres.map((genre, index) => (
                        <div key={index} className="text-xs p-2 rounded-sm bg-primary">
                            {genre?.name}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold">{gameDetails?.rating}</span>
                    {Array.from({ length: Math.floor(Number(gameDetails?.rating) || 0) }).map(
                        (_, i) => (
                            <StarIcon
                                key={i}
                                className="h-4 w-4 fill-white"
                            />
                        ),
                    )}
                    {gameDetails?.rating !== undefined &&
                        Number(gameDetails?.rating) % 1 >= 0.5 && (
                            <StarHalfIcon className="h-4 w-4 text-background fill-white" />
                        )}
                    {gameDetails?.ratingsCount !== undefined && (
                        <span className="text-sm">
                            {gameDetails?.ratingsCount ? gameDetails?.ratingsCount.toLocaleString() : 0} ratings
                        </span>
                    )}
                </div>
                <p className="text-center"><span className="font-bold">Est. Playtime: </span>{gameDetails.playtime} hours</p>
                <div className="card-actions pt-2">
                    <button className="btn btn-primary" onClick={handleBuy} disabled={cart.some((g) => g.id === gameDetails.id)}>{cart.some((g) => g.id === gameDetails.id) ? "In Cart" : "Add to Cart"}</button>
                </div>
            </div>
            <div className="flex gap-2 items-center px-4">
                <button onClick={handlePrev} className="btn btn-circle">❮</button>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: scroll }).map((_, i) => {
                        return <img className="h-48 aspect-16/9 object-cover w-full" src={`${gameScreenshots[(startIndex + i) % gameScreenshots.length]?.image}`} />;
                    })}
                </div>
                <button onClick={handleNext} className="btn btn-circle">❯</button>
            </div>
            <Footer />
        </>
    );
}
