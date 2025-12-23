
import { motion } from 'framer-motion';

const speakers = [
    { name: "Speaker 1", role: "Tech Lead", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
    { name: "Speaker 2", role: "Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
    { name: "Speaker 3", role: "Innovator", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" },
];

export function Speakers() {
    return (
        <section id="speakers" className="min-h-screen bg-black flex flex-col items-center justify-center py-20 relative">
            <h2 className="text-4xl md:text-6xl font-[Cinzel] text-white tracking-[0.2em] mb-20 text-center">Speakers</h2>

            <div className="flex flex-wrap justify-center gap-12 max-w-7xl px-6">
                {speakers.map((speaker, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="group relative w-72 h-96 overflow-hidden cursor-pointer"
                    >
                        <img src={speaker.img} alt={speaker.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-2xl font-[Cinzel] text-white group-hover:text-gold-400 transition-colors">{speaker.name}</h3>
                            <p className="text-stone-400 font-serif italic">{speaker.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
