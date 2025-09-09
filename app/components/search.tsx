import { Search } from "lucide-react";
import { useState } from "react";
import { useSubmit, useActionData } from "react-router";
import type { gamesTable } from "~/db/schema";

export type Game = typeof gamesTable.$inferInsert;

export default function SearchInput() {
    const [query, setQuery] = useState("");
    const submit = useSubmit();
    const results = useActionData<Game[]>();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setQuery(value);
        submit({ q: value }, { method: "post" });
    }

    return (
        <div className="group relative ">
            <label className="input bg-base-100 border-indigo-800 focus-within:outline-0 focus-within:shadow-md focus-within:shadow-indigo-900">
                <Search className="h-4" />
                <input
                    type="search"
                    value={query}
                    onChange={handleChange}
                    className="grow"
                    placeholder="Search"
                />
            </label>

            <div className="hidden absolute top-10 rounded-sm w-80 z-10 bg-base-100 group-focus-within:flex">
                {(results && results.length > 0) ?
                    <ul className="flex flex-col gap-2 p-4 w-full">
                        <p className="px-3 font-bold text-sm">TOP RESULTS</p>
                        {results.map((game) => (
                            <a href={`/games/${game.id}`} key={game.id}>
                                <li className="flex gap-4 items-center px-2 py-1 rounded-md hover:bg-radial-[at_50%_75%] hover:shadow-lg hover:shadow-indigo-900 hover:from-indigo-900/50 hover:border-indigo-900 transition-all duration-200">
                                    <img className="aspect-1/1 object-cover rounded-sm w-12" src={`${game.backgroundImage}`} />
                                    {game.name}
                                </li>
                            </a>
                        ))}
                    </ul>
                    :
                    <ul className="flex flex-col gap-2 p-4 w-full">
                        <p className="px-3 text-sm">No games found.</p>
                    </ul>
                }
            </div>
        </div>
    );
}