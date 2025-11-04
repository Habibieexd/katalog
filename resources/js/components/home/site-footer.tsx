export function SiteFooter() {
    return (
        <footer className="border-t">
            <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-4">
                <div>
                    <h4 className="font-medium">Kataloga</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Katalog e‑commerce dengan sentuhan editorial. Kurasi
                        yang berarti.
                    </p>
                </div>
                <div>
                    <h5 className="text-sm font-medium">Jelajah</h5>
                    <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
                        <li>
                            <a href="#koleksi">Koleksi</a>
                        </li>
                        <li>
                            <a href="#panduan">Panduan</a>
                        </li>
                        <li>
                            <a href="#cerita">Cerita</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-sm font-medium">Bantuan</h5>
                    <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
                        <li>
                            <a href="#">Pengiriman</a>
                        </li>
                        <li>
                            <a href="#">Pengembalian</a>
                        </li>
                        <li>
                            <a href="#">Hubungi Kami</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-sm font-medium">Legal</h5>
                    <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
                        <li>
                            <a href="#">Kebijakan Privasi</a>
                        </li>
                        <li>
                            <a href="#">Syarat & Ketentuan</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t">
                <div className="container mx-auto flex items-center justify-between px-4 py-6 text-xs text-muted-foreground">
                    <span>© {new Date().getFullYear()} Kataloga</span>
                    <span>Dibuat dengan cinta dan kurasi</span>
                </div>
            </div>
        </footer>
    );
}
