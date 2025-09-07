import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Card, CardSkeleton } from "~/components/card";
import { Search } from "lucide-react";
import { getFeatured, getFreeGames, getTopGames } from "~/db/queries";
import { Carousel } from "~/components/carousel";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Catalog" },
    { name: "description", content: "Browse latest games." },
  ];
}

export async function loader() {
  const featured = await getFeatured();
  const topGames = await getTopGames();
  const freeGames = await getFreeGames();
  return [featured, topGames, freeGames];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [featured, topGames, freeGames] = loaderData;
  return (
    <>
      <Header />
      <div className="flex flex-col max-w-5xl p-8 gap-16 pb-16">
        <div className="sticky top-0 w-full py-4 bg-base-100/50 z-10 backdrop-blur-md">
          <label className="input">
            <Search className="h-4"/>
            <input type="search" className="grow" placeholder="Search" />
          </label>
        </div>
        <div className="flex flex-col gap-8">
          <img className="aspect-4/1 object-cover rounded-xl" src={`${featured[0].backgroundImage}`} />
          <div>
            <p className="text-xl">Featured</p>
            <p className="text-3xl font-bold">{featured[0].name}</p>
          </div>
        </div>
        <Carousel title={"Discover Top Games"} games={topGames} />
        <Carousel title={"Free Games"} games={freeGames} />
      </div>
      <Footer />
    </>
  );
}
