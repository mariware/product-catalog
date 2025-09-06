import { Github, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="footer bg-base-100 footer-horizontal footer-center text-primary-content p-10">
            <aside>
                <p className="font-bold text-lg">
                    Catalog
                </p>
                <p>© {new Date().getFullYear()} mariware. All right reserved.{/*  Data provided by _.*/}</p> 
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <Github />
                    </a>
                    <a>
                        <Linkedin />
                    </a>
                </div>
            </nav>
        </footer>
    );
}