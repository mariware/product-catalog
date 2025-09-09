import { MinusCircle, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "~/utils/context";
import SearchInput from "./search";
import { saveToLocalStorage } from "~/utils/storage";

export function Header() {
    const cart = useContext(CartContext);

    const handleRemove = (id: number | undefined) => {
        saveToLocalStorage('cart', cart.filter((game) => (game.id !== id)));
        window.dispatchEvent(new Event("cartUpdated"));
    }

    return (
        <div className="flex flex-col w-full bg-base-100 border-b-1 border-b-white/15 z-10 sticky top-0">
            <div className="navbar min-h-0 shadow-sm p-4">
                <div className="navbar-start w-[100%]">
                    <div className="flex-1 flex gap-2">
                        <a href="/" className="btn btn-ghost text-xl hover:bg-primary">ARQADE</a>
                        <a href="/" className="btn btn-ghost font-normal text-base">Discover</a>
                        <a href="/browse" className="btn btn-ghost font-normal text-base">Browse</a>
                        <div className="hidden md:flex">
                            <SearchInput />
                        </div>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="drawer drawer-end w-fit">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content indicator">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle hover:bg-primary drawer-button">
                                <ShoppingCart className="h-4 w-4" />
                            </label>
                            <span className="badge badge-sm indicator-item">{cart.length}</span>
                        </div>
                        <div className="drawer-side z-100">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu flex flex-col gap-2 bg-base-200 text-base-content min-h-full w-80 p-4">
                                <p className="px-3 font-bold text-sm">Cart</p>
                                {cart.map((game) => (
                                    <div className="flex gap-2 items-center">
                                        <a href={`/games/${game.id}`} key={game.id} className="w-full">
                                            <li className="flex flex-row gap-4 items-center hover:bg-base-300 p-2">
                                                <img className="aspect-1/1 object-cover rounded-sm w-12 p-0" src={`${game.backgroundImage}`} />
                                                <div className="flex flex-col gap-0 items-start max-w-41 hover:bg-inherit">
                                                    <p className="font-bold line-clamp-1">{game.name}</p>
                                                    <p>$ {game.price}</p>
                                                </div>
                                            </li>
                                        </a>
                                        <button onClick={() => handleRemove(game.id)} className="btn btn-circle"><MinusCircle /></button>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex md:hidden w-full justify-center pb-4">
                <SearchInput />
            </div>
        </div>
    );
}