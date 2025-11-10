import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hero = document.getElementById('hero');

        // Jika hero tidak ada → navbar selalu tampil
        if (!hero) {
            setScrolled(true);
            return;
        }

        const handleScroll = () => {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            setScrolled(window.scrollY > heroBottom - 60);
            if (window.scrollY < heroBottom - 60) {
                setMobileMenuOpen(false);
            }
        };

        handleScroll(); // Check initial state
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    const menus = [
        { label: 'Beranda', href: '/#beranda' },
        { label: 'Tentang', href: '/#tentang' },
        { label: 'Galeri', href: '/#galeri' },
        { label: 'Proses', href: '/#proses' },
        { label: 'Kontak', href: '/#kontak' },
        { label: 'Produk', href: '/products' },
    ];

    return (
        <AnimatePresence>
            {scrolled && (
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="sticky top-0 right-0 left-0 z-50 border-b border-[#3E2308]/80 bg-[#FCFAF3] backdrop-blur-3xl"
                >
                    <div
                        ref={navRef}
                        className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6"
                    >
                        <div className="flex items-center justify-between">
                            <Link
                                href="/"
                                className="font-['Playfair_Display'] text-2xl font-bold text-[#dc7202] sm:text-3xl"
                            >
                                Sentra Tenun
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden gap-6 md:flex lg:gap-8">
                                {menus.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={`${item.href.toLowerCase()}`}
                                        className="group relative font-medium text-[#3E2308] transition-colors duration-300"
                                    >
                                        {item.label}
                                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#dc7202] transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="text-[#5A4A3A] md:hidden"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 left-0 w-full overflow-hidden border-b border-[#3E2308]/80 bg-[#FCFAF3] px-4 md:hidden"
                                >
                                    <div className="flex flex-col gap-4 pt-4 pb-4">
                                        {menus.map((item) => (
                                            <Link
                                                href={`${item.href.toLowerCase()}`}
                                                key={item.label}
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="text-left text-[#5A4A3A] transition-colors duration-300 hover:text-[#F4B393]"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
