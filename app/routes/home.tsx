import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Card } from "~/components/card";
import { Search } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Catalog" },
    { name: "description", content: "Browse latest games." },
  ];
}

export default function Home() {
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
          <img className="aspect-4/1 object-cover rounded-xl" src="https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg" />
          <div>
            <p className="text-xl">Featured</p>
            <p className="text-3xl font-bold">Game Title</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold">Discover Top Games</p>
          <div className="grid grid-cols-3 gap-4">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold">New Releases</p>
          <div className="grid grid-cols-3 gap-4">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
