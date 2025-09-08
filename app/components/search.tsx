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
        <div className="group relative">
            <label className="input">
                <Search className="h-4" />
                <input
                    type="search"
                    value={query}
                    onChange={handleChange}
                    className="grow"
                    placeholder="Search"
                />
            </label>

            <div className="hidden absolute top-10 rounded-sm w-80 z-10 bg-base-200 group-focus-within:flex">
                {results && results.length > 0 && (
                    <ul className="flex flex-col gap-2 p-4 w-full">
                        <p className="px-3 font-bold text-sm">Top Results</p>
                        {results.map((game) => (
                            <li key={game.id} className="flex gap-4 items-center hover:bg-base-300 p-2">
                                <img className="aspect-1/1 object-cover rounded-sm w-12" src={`${game.backgroundImage}`} />
                                {game.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}