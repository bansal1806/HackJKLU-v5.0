
import { motion } from 'framer-motion';

const episodes = [
    { id: 1, title: "Day 1: Inception", desc: "Check-in, Opening Ceremony, and the 36-hour timer begins.", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, title: "Day 2: Validation", desc: "Mentoring sessions, Speaker talks, and prototype development.", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, title: "Day 3: The Pitch", desc: "Final submissions, Jury rounds, and Awards Ceremony.", img: "https://images.unsplash.com/photo-1475721027767-p05a6dbd03ba?q=80&w=2069&auto=format&fit=crop" }
];

export function Episodes() {
    return (
        <section className="bg-black py-32 px-4 md:px-20 relative z-20">
            <h2 className="text-4xl md:text-6xl font-[Cinzel] text-stone-200 mb-20 text-center tracking-[0.2em]">The Timeline</h2>

            <div className="flex flex-col gap-32 max-w-6xl mx-auto">
                {episodes.map((ep, i) => (
                    <div key={ep.id} className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="w-full md:w-3/5 aspect-video overflow-hidden relative group"
                        >
                            <img src={ep.img} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                            <div className="absolute top-4 left-4 font-[Cinzel] text-xs tracking-[0.2em] bg-black/50 px-3 py-1">
                                DAY 0{ep.id}
                            </div>
                        </motion.div>

                        {/* Content */}
                        <div className="w-full md:w-2/5 text-center md:text-left">
                            <h3 className="text-3xl font-[Cinzel] text-white mb-4 tracking-wide">{ep.title}</h3>
                            <p className="text-stone-400 font-serif leading-relaxed mb-6">{ep.desc}</p>
                            <MagneticButton>View Details</MagneticButton>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-32 text-center">
                <button className="bg-white text-black px-8 py-3 font-[Cinzel] tracking-widest hover:bg-gold-500 transition-colors">
                    Download Full Itinerary
                </button>
            </div>
        </section>
    );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-block cursor-pointer font-[Cinzel] text-xs tracking-[0.2em] uppercase py-2"
        >
            <span className="relative z-10 border-b border-gold-500 pb-1 group-hover:text-gold-400 transition-colors duration-300">{children}</span>
            <motion.span
                className="absolute inset-0 bg-gold-500/10 rounded-lg -z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    )
}
