import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { getFeatured, getFreeGames, getGames, getTopGames } from "~/db/queries";
import { Carousel } from "~/components/carousel";
import SearchInput from "~/components/search";
import { useContext } from "react";
import { CartContext } from "~/utils/context";
import { saveToLocalStorage } from "~/utils/storage";
import game from "./games/game";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ARQADE | Discover" },
    { name: "description", content: "Discover the best games." },
  ];
}

export async function loader() {
  const featured = await getFeatured();
  const topGames = await getTopGames();
  const freeGames = await getFreeGames();
  return [featured, topGames, freeGames];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const query = (formData.get("q") as string) || "";
  const games = await getGames(query);
  return games;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [featured, topGames, freeGames] = loaderData;
  const cart = useContext(CartContext);
  
      const handleBuy = (e: React.MouseEvent) => {
          e.preventDefault();
          if (!cart.some((g) => g.id === featured[0].id)) {
              cart.push(featured[0]);
              saveToLocalStorage("cart", cart);
              window.dispatchEvent(new Event("cartUpdated"));
          }
      }

  return (
    <>
      <Header />
      <div className="flex flex-col max-w-5xl p-8 gap-16 pb-16">
        <a href={`/games/${featured[0].id}`}>
          <div className="flex flex-col gap-8 p-4 pb-8 hover:bg-black bg-radial-[at_50%_50%] hover:from-indigo-900/50 rounded-2xl">
            <img className="aspect-16/9 md:aspect-4/1 object-cover rounded-xl" src={`${featured[0].backgroundImage}`} />
            <div>
              <p className="text-lg">Featured</p>
              <p className="text-4xl font-[Afacad] font-extrabold">{featured[0].name}</p>
              <div className="card-actions pt-4">
                <button className="btn btn-primary btn-lg font-[Afacad] bg-linear-to-b from-black to-indigo-900 hover:from-indigo-600 transition-all duration-200" onClick={handleBuy} disabled={cart.some((g) => g.id === featured[0].id)}>{cart.some((g) => g.id === featured[0].id) ? "IN CART" : "ADD TO CART"}</button>
              </div>
            </div>
          </div>
        </a>
        <Carousel title={"Discover Top Games"} games={topGames} />
        <Carousel title={"Free Games"} games={freeGames} />
      </div>
      <Footer />
    </>
  );
}
