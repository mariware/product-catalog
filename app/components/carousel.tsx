import type { gamesTable } from "~/db/schema";
import { Card } from "~/components/card";
import { useEffect, useState } from "react";

export function Carousel({ title, games }: { title: string, games: typeof gamesTable.$inferInsert[] }) {
    const [startIndex, setStartIndex] = useState(0);
    const [scroll, setScroll] = useState(1);

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
        setStartIndex((prev) => (prev - scroll + games.length) % games.length);
    };

    const handleNext = () => {
        setStartIndex((prev) => (prev + scroll) % games.length);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold font-[Afacad]">{title.toUpperCase()}</p>
                <div className="flex gap-2">
                    <button onClick={handlePrev} className="btn btn-circle bg-base-100 hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200">❮</button>
                    <button onClick={handleNext} className="btn btn-circle bg-base-100 hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200">❯</button>
                </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: scroll }).map((_, i) => {
                    const game = games[(startIndex + i) % games.length];
                    return <Card key={`${startIndex}-${i}`} game={game} />;
                })}
            </div>
        </div>
    );
}
