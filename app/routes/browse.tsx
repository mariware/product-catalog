import type { Route } from "./+types/browse";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { getGames, getPaginatedGames } from "~/db/queries";
import SearchInput from "~/components/search";
import { Card } from "~/components/card";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ARQADE | Browse" },
        { name: "description", content: "Browse the latest games." },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const [games, total] = await getPaginatedGames({ page });
    return { games, page, total };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const query = (formData.get("q") as string) || "";
    const games = await getGames(query);
    return games;
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { games, page, total } = loaderData;
    const totalPages = Math.ceil(Number(total) / 12);

    return (
        <>
            <Header />
            <div className="flex flex-col max-w-5xl p-8 gap-16 pb-16">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.isArray(games) && games.map((game) => (
                        <Card key={game.id} game={game} />
                    ))}
                </div>

                <div className="flex gap-2 justify-center mt-8">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <a
                            key={i + 1}
                            href={`?page=${i + 1}`}
                            className={`px-4 py-1 rounded ${page === i + 1 ? "bg-primary/50 text-white" : "bg-base-200"
                                }`}
                        >
                            {i + 1}
                        </a>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
