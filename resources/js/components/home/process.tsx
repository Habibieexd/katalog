import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const processSteps = [
    {
        id: 1,
        title: 'Persiapan Benang',
        description:
            'Pemilihan benang berkualitas tinggi dengan warna-warna pilihan yang akan menciptakan harmoni visual pada kain songket.',
        image: 'https://images.unsplash.com/photo-1758271613743-748b409c196b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHdlYXZpbmclMjBwcm9jZXNzfGVufDF8fHx8MTc2MDQyNzQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
        id: 2,
        title: 'Proses Tenun',
        description:
            'Dengan menggunakan alat tenun tradisional, pengrajin terampil merangkai setiap benang dengan penuh ketelitian dan kesabaran.',
        image: 'https://images.unsplash.com/photo-1617694820985-a5476fe22722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF2aW5nJTIwbG9vbSUyMGNyYWZ0c21hbnxlbnwxfHx8fDE3NjA0Mjc0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
        id: 3,
        title: 'Finishing & Quality Control',
        description:
            'Setiap helai kain melewati proses finishing dan kontrol kualitas untuk memastikan kesempurnaan dalam setiap detail.',
        image: 'https://images.unsplash.com/photo-1671696564980-02ac81b3f629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kd292ZW4lMjBmYWJyaWMlMjBkZXRhaWx8ZW58MXx8fHwxNzYwNDI3NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
];

export function Process() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <>
            <section
                id="proses"
                ref={ref}
                className="overflow-hidden bg-[#FFF6E5] px-6 py-24"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-4 font-bold text-[#dc7202]"
                        >
                            Proses Pembuatan
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-4 font-['Playfair_Display'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#3E2308]"
                        >
                            Dari Benang hingga Karya Seni
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto max-w-2xl text-[#7A6A5A]"
                        >
                            Setiap kain songket melewati proses yang panjang dan
                            penuh dedikasi, dikerjakan oleh tangan-tangan
                            terampil pengrajin berpengalaman
                        </motion.p>
                    </div>

                    <div className="space-y-24">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                }}
                                className={`grid items-center gap-12 md:grid-cols-2 ${
                                    index % 2 === 1 ? 'md:grid-flow-dense' : ''
                                }`}
                            >
                                <div
                                    className={`relative ${
                                        index % 2 === 1 ? 'md:col-start-2' : ''
                                    }`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative overflow-hidden rounded-2xl shadow-2xl"
                                    >
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="h-[400px] w-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,179,147,0.1),rgba(191,174,159,0.1))]" />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={
                                            isInView
                                                ? { opacity: 1, scale: 1 }
                                                : {}
                                        }
                                        transition={{
                                            delay: 0.4 + index * 0.2,
                                            duration: 0.5,
                                        }}
                                        className={`absolute -top-6 -left-0 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4B393] shadow-xl sm:-top-8 sm:-left-8 sm:h-20 sm:w-20 md:h-24 md:w-24 ${
                                            step.id % 2 === 1
                                                ? 'md:-right-8 md:left-auto'
                                                : ''
                                        }`}
                                    >
                                        <span className="font-['Playfair_Display'] text-3xl font-semibold text-[#FFF6E5] sm:text-4xl md:text-[2.5rem]">
                                            {step.id}
                                        </span>
                                    </motion.div>
                                </div>

                                <div
                                    className={
                                        index % 2 === 1 ? 'md:col-start-1' : ''
                                    }
                                >
                                    <motion.h3
                                        initial={{
                                            opacity: 0,
                                            x: index % 2 === 0 ? -30 : 30,
                                        }}
                                        animate={
                                            isInView ? { opacity: 1, x: 0 } : {}
                                        }
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3 + index * 0.2,
                                        }}
                                        className="mb-6 font-['Playfair_Display'] text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-[#3E2308]"
                                    >
                                        {step.title}
                                    </motion.h3>

                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            x: index % 2 === 0 ? -30 : 30,
                                        }}
                                        animate={
                                            isInView ? { opacity: 1, x: 0 } : {}
                                        }
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.4 + index * 0.2,
                                        }}
                                        className="text-lg leading-relaxed text-[#7A6A5A]"
                                    >
                                        {step.description}
                                    </motion.p>

                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={
                                            isInView ? { width: '100px' } : {}
                                        }
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.5 + index * 0.2,
                                        }}
                                        className="mt-8 h-1 rounded-full bg-[#E6CBA8]"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
