import { MinusCircle, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "~/utils/context";
import SearchInput from "./search";
import { saveToLocalStorage } from "~/utils/storage";
import { Logo } from "./logo";

export function Header() {
    const cart = useContext(CartContext);

    const handleRemove = (id: number | undefined) => {
        saveToLocalStorage('cart', cart.filter((game) => (game.id !== id)));
        window.dispatchEvent(new Event("cartUpdated"));
    }

    const total = () => cart.reduce((sum, game) => sum + (Number(game.price) || 0), 0);

    return (
        <div className="flex flex-col w-full bg-base-100 border-b border-indigo-800 shadow-lg shadow-indigo-900/50 z-10 sticky top-0 bg-linear-to-b from-50% to-indigo-950">
            <div className="navbar min-h-0 shadow-sm p-4">
                <div className="navbar-start w-[100%]">
                    <div className="flex-1 flex gap-2 font-[Afacad]">
                        <a href="/" className="btn btn-ghost text-xl hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200"><Logo /></a>
                        <a href="/" className="btn btn-ghost font-normal text-sm hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200">DISCOVER</a>
                        <a href="/browse" className="btn btn-ghost font-normal text-sm hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200">BROWSE</a>
                        <div className="hidden md:flex pl-2">
                            <SearchInput />
                        </div>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="drawer drawer-end w-fit">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content indicator">
                            <label htmlFor="my-drawer" className="btn btn-ghost px-3 drawer-button hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200">
                                <ShoppingCart className="h-4 w-4" />
                            </label>
                            <span className="badge badge-sm px-1.5 rounded-full indicator-item bg-primary/50">{cart.length}</span>
                        </div>
                        <div className="drawer-side z-100">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu flex flex-col gap-2 bg-base-100 border-l border-l-indigo-800 text-base-content min-h-full w-80 p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col px-3">
                                    <p className="font-bold font-[Afacad] text-lg">GAME CART</p>
                                    <p className="text-sm ">TOTAL: $ {total().toFixed(2)}</p>
                                    </div>
                                    <button className="btn btn-primary font-[Afacad] bg-linear-to-b from-black to-indigo-900 hover:from-indigo-600 transition-all duration-200">CHECKOUT</button>
                                </div>
                                {cart.map((game) => (
                                    <div className="flex gap-2 items-center">
                                        <a href={`/games/${game.id}`} key={game.id} className="w-full">
                                            <li className="flex flex-row gap-4 items-center px-2 py-1 rounded-md hover:bg-radial-[at_50%_75%] hover:shadow-lg hover:shadow-indigo-900 hover:from-indigo-900/50 hover:border-indigo-900 transition-all duration-200">
                                                <img className="aspect-1/1 object-cover rounded-sm w-12 p-0" src={`${game.backgroundImage}`} />
                                                <div className="flex flex-col gap-0 items-start max-w-41 hover:bg-inherit">
                                                    <p className="font-bold line-clamp-1">{game.name}</p>
                                                    <p>$ {game.price}</p>
                                                </div>
                                            </li>
                                        </a>
                                        <button onClick={() => handleRemove(game.id)} className="btn btn-circle bg-base-100 drawer-button hover:bg-radial-[at_50%_75%] hover:bg-black hover:from-indigo-600 hover:border-indigo-900 transition-all duration-200"><MinusCircle /></button>
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