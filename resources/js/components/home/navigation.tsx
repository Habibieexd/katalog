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
            setScrolled(window.scrollY > heroBottom - 50);
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

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false); // Close mobile menu after click
    };

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
                        className="mx-auto max-w-7xl px-4 py-4 sm:px-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="font-['Playfair_Display'] text-2xl font-bold text-[#dc7202] sm:text-3xl">
                                Sentra Tenun
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden gap-6 md:flex lg:gap-8">
                                {[
                                    'Beranda',
                                    'Tentang',
                                    'Galeri',
                                    'Proses',
                                    'Kontak',
                                ].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() =>
                                            scrollToSection(
                                                item === 'Beranda'
                                                    ? 'hero'
                                                    : item.toLowerCase(),
                                            )
                                        }
                                        className="group relative font-medium text-[#3E2308] transition-colors duration-300"
                                    >
                                        {item}
                                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#dc7202] transition-all duration-300 group-hover:w-full" />
                                    </button>
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
                                    className="overflow-hidden md:hidden"
                                >
                                    <div className="flex flex-col gap-4 pt-4 pb-4">
                                        {[
                                            'Beranda',
                                            'Tentang',
                                            'Galeri',
                                            'Proses',
                                            'Kontak',
                                        ].map((item) => (
                                            <button
                                                key={item}
                                                onClick={() =>
                                                    scrollToSection(
                                                        item === 'Beranda'
                                                            ? 'hero'
                                                            : item.toLowerCase(),
                                                    )
                                                }
                                                className="text-left text-[#5A4A3A] transition-colors duration-300 hover:text-[#F4B393]"
                                            >
                                                {item}
                                            </button>
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
