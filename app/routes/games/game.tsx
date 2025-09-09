import type { Route } from "./+types/game";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { getGameDetails, getGames } from "~/db/queries";
import { StarHalfIcon, StarIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "~/utils/context";
import { saveToLocalStorage } from "~/utils/storage";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ARQADE | Game" },
        { name: "description", content: "Check game details." },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const id = Number(url.pathname.slice(7));
    const [game, screenshots] = await getGameDetails(id);
    return [game, screenshots];
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const query = (formData.get("q") as string) || "";
    const games = await getGames(query);
    return games;
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
            <div className="flex flex-col w-fit max-w-[80%] rounded-xl p-8 sm:px-16 gap-4 bg-base-100 bg-radial-[at_50%_80%] shadow-lg shadow-indigo-900 from-indigo-900/50 -translate-y-16 items-center justify-center">
                <p className="text-4xl text-center font-bold font-[Afacad]">{gameDetails.name}</p>
                <div className="w-full flex flex-wrap gap-2 items-center justify-center">
                    {gameGenres.map((genre, index) => (
                        <div key={index} className="badge text-xs p-2 bg-primary/50">
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
                                className="h-4 w-4 text-transparent fill-indigo-600"
                            />
                        ),
                    )}
                    {gameDetails?.rating !== undefined &&
                        Number(gameDetails?.rating) % 1 >= 0.5 && (
                            <StarHalfIcon className="h-4 w-4 text-transparent fill-indigo-600" />
                        )}
                    {gameDetails?.ratingsCount !== undefined && (
                        <span className="text-sm">
                            {gameDetails?.ratingsCount ? gameDetails?.ratingsCount.toLocaleString() : 0} ratings
                        </span>
                    )}
                </div>
                <p className="text-center"><span className="font-bold font-[Afacad]">PLAYTIME: </span>{gameDetails.playtime} hours</p>
                <div className="card-actions pt-2">
                    <button className="btn btn-primary font-[Afacad] bg-linear-to-b from-black to-indigo-900 hover:from-indigo-600 transition-all duration-200" onClick={handleBuy} disabled={cart.some((g) => g.id === gameDetails.id)}>{cart.some((g) => g.id === gameDetails.id) ? "IN CART" : "ADD TO CART"}</button>
                </div>
            </div>
            <div className="flex gap-4 items-center px-4">
                <button onClick={handlePrev} className="btn btn-circle bg-base-100 hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200">❮</button>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: scroll }).map((_, i) => {
                        return <img className="h-48 aspect-16/9 object-cover w-full" src={`${gameScreenshots[(startIndex + i) % gameScreenshots.length]?.image}`} />;
                    })}
                </div>
                <button onClick={handleNext} className="btn btn-circle bg-base-100 hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200">❯</button>
            </div>
            <Footer />
        </>
    );
}
