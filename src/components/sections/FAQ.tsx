
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { q: "What is the team size?", a: "You can form teams of 1 to 5 members." },
    { q: "Do I need prior experience?", a: "No! Beginners are welcome. We have mentors to guide you." },
    { q: "Is there a registration fee?", a: "No, HACKJKLU 5.0 is completely free for all participants." },
    { q: "Will accom-modation be provided?", a: "Yes, food and accommodation will be provided for offline participants." },
    { q: "Who can participate?", a: "Any student with a valid ID card from a recognized institute." }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="min-h-screen bg-stone-900 flex flex-col items-center justify-center py-20 px-4">
            <h2 className="text-4xl md:text-6xl font-[Cinzel] text-white tracking-[0.2em] mb-16 text-center">FAQ</h2>

            <div className="w-full max-w-3xl">
                {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-stone-800">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full py-6 flex items-center justify-between text-left group"
                        >
                            <span className="text-lg md:text-xl font-[Cinzel] text-stone-300 group-hover:text-gold-400 transition-colors uppercase tracking-wider">{faq.q}</span>
                            <ChevronDown className={`w-6 h-6 text-stone-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-8 text-stone-400 font-serif leading-relaxed px-4">
                                        {faq.a}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
