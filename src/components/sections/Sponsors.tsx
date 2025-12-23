
import { motion } from 'framer-motion';

const sponsors = [
    { name: "Ention", tier: "Co-Powered By", logo: "https://placehold.co/200x80/000000/FFFFFF?text=ENTION" },
    { name: "WS CubeTech", tier: "Co-Powered By", logo: "https://placehold.co/200x80/000000/FFFFFF?text=WSCubeTech" },
    { name: "Devfolio", tier: "Platform Partner", logo: "https://placehold.co/200x80/000000/FFFFFF?text=Devfolio" },
    { name: "EthIndia", tier: "Platform Partner", logo: "https://placehold.co/200x80/000000/FFFFFF?text=EthIndia" },
    { name: "GeeksForGeeks", tier: "Education Partner", logo: "https://placehold.co/200x80/000000/FFFFFF?text=GFG" }
];

export function Sponsors() {
    return (
        <section className="bg-black py-20 px-4 md:px-20 relative z-10 border-t border-stone-800">
            <h2 className="text-4xl md:text-5xl font-[Cinzel] text-stone-200 mb-16 text-center tracking-[0.2em]">Our Partners</h2>

            <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center max-w-6xl mx-auto">
                {sponsors.map((sponsor, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-4 group"
                    >
                        <div className="w-48 h-24 bg-stone-900/50 border border-stone-800 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
                            {/* Use text fallbacks if images fail, but here using placeholder images */}
                            <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full opacity-70 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xs font-[Cinzel] text-stone-500 tracking-wider uppercase">{sponsor.tier}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
