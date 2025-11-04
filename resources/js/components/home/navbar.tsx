import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto flex items-center justify-between px-4 py-4">
                <a
                    href="/"
                    className="font-serif text-xl tracking-tight text-foreground"
                >
                    Kataloga
                    <span className="sr-only">Beranda</span>
                </a>
                <ul className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
                    <li>
                        <a href="#koleksi" className="hover:text-foreground">
                            Koleksi
                        </a>
                    </li>
                    <li>
                        <a href="#panduan" className="hover:text-foreground">
                            Panduan
                        </a>
                    </li>
                    <li>
                        <a href="#cerita" className="hover:text-foreground">
                            Cerita
                        </a>
                    </li>
                    <li>
                        <a href="#harga" className="hover:text-foreground">
                            Harga
                        </a>
                    </li>
                </ul>
                <div className="flex items-center gap-2">
                    {/* <Button
                        variant="ghost"
                        className="hidden rounded-full bg-gradient-to-b from-[#8AD71D] to-[#65A30D] text-white md:inline-flex"
                    >
                        Pengaduan
                    </Button> */}
                    <Button
                        variant="outline"
                        className="rounded-full border-primary bg-transparent"
                    >
                        Pengaduan
                    </Button>
                </div>
            </nav>
        </header>
    );
}
