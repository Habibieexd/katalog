import { motion } from 'motion/react';

export function Footer() {
    return (
        <footer
            className="relative border-t bg-[#FFF6E5] px-6 py-12 pb-20"
            style={{ borderColor: '#E6CBA8' }}
        >
            <div
                className="absolute right-0 bottom-0 left-0 h-10 bg-cover bg-center bg-repeat-x opacity-95 contrast-[0.95]"
                style={{
                    backgroundImage:
                        'url(https://budayago.id/assets/219d62037e631ba43c8d78139d17919628407c06-qBgggbdf.png)',
                }}
            ></div>
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 grid gap-12 md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 font-['Playfair_Display'] text-[1.75rem] font-semibold text-[#3E2308]">
                            Songket
                        </h3>
                        <p className="text-[#7A6A5A]">
                            Melestarikan warisan budaya Indonesia melalui kain
                            songket berkualitas tinggi dengan sentuhan modern
                            yang elegan.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-['Playfair_Display'] text-[1.25rem] font-semibold text-[#3E2308]">
                            Alamat
                        </h4>
                        <p className="text-[#7A6A5A]">
                            Jl. Jorong Jl. Rajawali Raya, Tigo Jangko, Lintau
                            Buo,
                        </p>
                        <p className="text-[#7A6A5A]">
                            Kabupaten Tanah Datar, Sumatera Barat 27292
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-['Playfair_Display'] text-[1.25rem] font-semibold text-[#5A4A3A]">
                            Ikuti Kami
                        </h4>

                        <div className="flex gap-4">
                            {['Instagram', 'Facebook', 'WhatsApp'].map(
                                (platform) => (
                                    <motion.button
                                        key={platform}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF6E5] text-[#F4B393] transition-all duration-300"
                                        aria-label={platform}
                                    >
                                        {platform.charAt(0)}
                                    </motion.button>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#E6CBA8] pt-8 text-center">
                    <p className="text-sm text-[#7A6A5A]">
                        © 2025 Songket. Semua hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
