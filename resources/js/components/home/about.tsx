export function About() {
    return (
        <section id="tentang" className="bg-[#FCFAF3] px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1707569615782-13f021c40eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYWJyaWMlMjB0ZXh0dXJlJTIwZ29sZHxlbnwxfHx8fDE3NjA0Mjc0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Detail Songket"
                                className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>

                        <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-[#F4B393] opacity-50 blur-3xl" />
                    </div>

                    <div>
                        <div className="mb-4 font-bold text-[#dc7202]">
                            - Tentang Kami
                        </div>

                        <h2 className="mb-6 font-['Playfair_Display'] text-[clamp(2rem,4vw,3rem)] leading-[1.3] font-semibold text-[#3E2308]">
                            Warisan Budaya yang Ditenun dengan Cinta
                        </h2>

                        <div className="space-y-4 text-[#7A6A5A]">
                            <p className="leading-relaxed">
                                Songket adalah karya seni tekstil tradisional
                                yang telah menjadi bagian dari warisan budaya
                                Indonesia selama berabad-abad. Setiap helai kain
                                songket yang kami ciptakan adalah hasil dari
                                dedikasi, keahlian, dan cinta terhadap tradisi
                                leluhur.
                            </p>

                            <p className="leading-relaxed">
                                Kami menggunakan teknik tenun tradisional yang
                                diwariskan turun-temurun, memadukan benang emas
                                dan perak dengan warna-warna lembut yang
                                menciptakan motif-motif indah penuh makna.
                                Setiap motif memiliki filosofi dan cerita yang
                                menjadikan songket lebih dari sekadar kain—ia
                                adalah simbol keanggunan dan kemewahan yang
                                abadi.
                            </p>

                            <p className="leading-relaxed">
                                Dengan sentuhan modern dalam desain dan
                                presentasi, kami berusaha memperkenalkan
                                keindahan songket kepada generasi baru, menjaga
                                agar warisan budaya ini tetap hidup dan relevan
                                di era kontemporer.
                            </p>
                        </div>

                        <div className="mt-8 border-t border-[#E6CBA8] pt-8">
                            <div className="grid grid-cols-3 gap-6 text-center">
                                {[
                                    { number: '50+', label: 'Motif Unik' },
                                    {
                                        number: '25+',
                                        label: 'Tahun Pengalaman',
                                    },
                                    {
                                        number: '1000+',
                                        label: 'Pelanggan Puas',
                                    },
                                ].map((item, index) => (
                                    <div key={index}>
                                        <div className="mb-1 font-['Playfair_Display'] text-[2rem] font-semibold text-[#dc7202]">
                                            {item.number}
                                        </div>
                                        <div className="text-sm text-[#7A6A5A]">
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
