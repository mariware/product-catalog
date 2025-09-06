import { ShoppingCart } from "lucide-react";

export function Header() {
    return (
        <div className="navbar bg-base-100/50 min-h-0 shadow-sm p-4 border-b-1 border-b-white/15">
            <div className="navbar-start">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl hover:bg-primary">Catalog</a>
                </div>
            </div>
            <div className="navbar-end">
                <div className="drawer drawer-end w-fit">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content indicator">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn btn-ghost btn-circle hover:bg-primary drawer-button">
                            <ShoppingCart className="h-4 w-4"/>
                        </label>
                        <span className="badge badge-sm indicator-item">0</span>
                    </div>
                    <div className="drawer-side z-100">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            {/* Sidebar content here */}
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}