import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        toast.success(
            'Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.',
        );
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section id="kontak" ref={ref} className="overflow-hidden px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-4 font-bold text-[#dc7202]"
                    >
                        Kontak & Pemesanan
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-4 font-['Playfair_Display'] text-4xl font-semibold text-[#3E2308] md:text-5xl"
                    >
                        Mari Berdiskusi
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto max-w-2xl text-[#7A6A5A]"
                    >
                        Hubungi kami untuk konsultasi, pemesanan custom, atau
                        pertanyaan lainnya. Kami siap membantu mewujudkan
                        kebutuhan songket Anda.
                    </motion.p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="mb-6 font-['Playfair_Display'] text-[1.75rem] font-semibold text-[#5A4A3A]">
                                Informasi Kontak
                            </h3>

                            <div className="space-y-6">
                                {[
                                    {
                                        label: 'Alamat',
                                        value: 'Jl. Tenun Tradisional No. 123, Jakarta Selatan',
                                    },
                                    {
                                        label: 'Telepon',
                                        value: '+62 812-3456-7890',
                                    },
                                    {
                                        label: 'Email',
                                        value: 'info@songket.com',
                                    },
                                    {
                                        label: 'Jam Operasional',
                                        value: 'Senin - Sabtu, 09:00 - 17:00 WIB',
                                    },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={
                                            isInView ? { opacity: 1, y: 0 } : {}
                                        }
                                        transition={{
                                            delay: 0.3 + index * 0.1,
                                        }}
                                        className="flex flex-col"
                                    >
                                        <Label className="mb-1 text-base text-[#dc7202]">
                                            {item.label}
                                        </Label>
                                        <span className="text-[#5A4A3A]">
                                            {item.value}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 rounded-2xl bg-white p-8 shadow-xl"
                        >
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="mb-2 block text-[#5A4A3A]"
                                >
                                    Nama Lengkap
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-[#E6CBA8] bg-[#FFF6E5] px-4 py-3 transition-all duration-300 focus:ring-2"
                                    placeholder="Masukkan nama Anda"
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="email"
                                    className="mb-2 block text-[#5A4A3A]"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-[#E6CBA8] bg-[#FFF6E5] px-4 py-3 transition-all duration-300 focus:ring-2"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="phone"
                                    className="mb-2 block text-[#]"
                                >
                                    Nomor Telepon
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-[#E6CBA8] bg-[#FFF6E5] px-4 py-3 transition-all duration-300 focus:ring-2"
                                    placeholder="+62 812-3456-7890"
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="message"
                                    className="mb-2 block text-[#5A4A3A]"
                                >
                                    Pesan / Pertanyaan
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full resize-none rounded-lg border border-[#E6CBA8] bg-[#FFF6E5] px-4 py-3 transition-all duration-300 focus:ring-2"
                                    placeholder="Tulis pesan Anda di sini..."
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full rounded-lg bg-[#dc7202] py-4 text-[#FFF6E5] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#dc7202]/90 hover:shadow-xl active:scale-[0.98]"
                            >
                                Kirim Pesan
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
