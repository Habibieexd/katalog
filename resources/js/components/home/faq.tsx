import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        id: 'item-1',
        question: 'Apa itu kain songket dan apa keunikanannya?',
        answer: 'Kain songket adalah kain tradisional dengan motif emas yang ditenun secara manual. Setiap piece adalah karya seni unik yang menggabungkan keahlian pengrajin dengan bahan berkualitas tinggi. Keunikannya terletak pada proses pembuatan yang teliti dan detail motif yang sangat presisi.',
    },
    {
        id: 'item-2',
        question:
            'Berapa lama waktu yang dibutuhkan untuk membuat satu lembar kain songket?',
        answer: 'Waktu pembuatan tergantung pada kompleksitas motif dan ukuran kain. Rata-rata, satu lembar kain songket membutuhkan waktu 2-6 minggu untuk diselesaikan. Motif yang lebih kompleks dengan detail emas yang lebih banyak akan memerlukan waktu yang lebih lama.',
    },
    {
        id: 'item-3',
        question: 'Apakah kain songket bisa digunakan untuk acara sehari-hari?',
        answer: 'Tentu saja! Meskipun kain songket sering digunakan untuk acara formal dan spesial, koleksi kami juga menyediakan desain yang cocok untuk penggunaan sehari-hari. Tekstil kami nyaman, tahan lama, dan dapat dirawat dengan mudah.',
    },
    {
        id: 'item-4',
        question: 'Bagaimana cara merawat kain songket?',
        answer: 'Kain songket sebaiknya dicuci dengan tangan menggunakan air dingin dan sabun lembut. Hindari pemutih dan jangan menggosoknya terlalu kuat. Keringkan dengan cara digantung di tempat yang teduh, dan setrika dengan api sedang dari bagian dalam untuk menjaga kilau emas.',
    },
    {
        id: 'item-5',
        question: 'Apakah tersedia custom design atau pemesanan khusus?',
        answer: 'Ya, kami menerima pesanan khusus sesuai dengan preferensi dan kebutuhan Anda. Tim pengrajin kami siap bekerja sama untuk menciptakan design yang unik dan sesuai dengan visi Anda. Silakan hubungi kami untuk konsultasi lebih lanjut.',
    },
    {
        id: 'item-6',
        question: 'Berapa harga kain songket?',
        answer: 'Harga kain songket bervariasi tergantung pada ukuran, kompleksitas motif, dan bahan yang digunakan. Untuk informasi harga yang detail dan penawaran khusus, silakan hubungi kami melalui form kontak atau telepon.',
    },
];

export function Faq() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });
    return (
        <section
            id="faq"
            ref={ref}
            className="bg-[#FCFAF3] px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-7xl">
                <div className="flex w-full flex-col items-center space-y-8 sm:space-y-12 md:space-y-16">
                    <div className="space-y-2 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-3 text-sm font-bold text-[#dc7202] sm:mb-4 sm:text-base"
                        >
                            Pertanyaan yang Sering Diajukan
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-3 font-['Playfair_Display'] text-3xl font-semibold text-[#3E2308] sm:mb-4 sm:text-4xl md:text-5xl"
                        >
                            Punya Pertanyaan?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto max-w-2xl px-4 text-sm text-[#7A6A5A] sm:px-0 sm:text-base"
                        >
                            Temukan jawaban atas pertanyaan umum tentang kain
                            songket dan layanan kami
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-5xl"
                    >
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2 sm:space-y-3"
                        >
                            {faqItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="overflow-hidden rounded-lg border border-primary/20 bg-[#fef4e3] transition-colors hover:bg-[#FFF6E5]/80"
                                >
                                    <AccordionItem
                                        value={item.id}
                                        className="border-none px-4 sm:px-6"
                                    >
                                        <AccordionTrigger className="text-left text-base font-bold text-[#3d3126] transition-colors hover:text-[#5A4A3A] hover:no-underline sm:text-lg">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-sm leading-relaxed text-[#7A6A5A] sm:text-base">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                </div>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
