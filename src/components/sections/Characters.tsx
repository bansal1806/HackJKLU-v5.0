
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const characters = [
    { name: "Merlin", role: "The Prophet", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" },
    { name: "Ganieda", role: "The Seeress", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
    { name: "Taliesin", role: "The Bard", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
    { name: "Charis", role: "The Princess", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop" },
    { name: "Avallach", role: "The King", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" }
];

export function Characters() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-stone-900">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-20 pl-20 pr-20">
                    <div className="flex-shrink-0 w-[400px] flex flex-col justify-center">
                        <h2 className="text-6xl font-[Cinzel] text-white  mb-6">The<br />People</h2>
                        <p className="text-stone-400 font-serif leading-relaxed">
                            Discover the lineages of the ancient world. Kings, queens, prophets, and warriors whose fate will shape the future of Britain.
                        </p>
                    </div>

                    {characters.map((char, i) => (
                        <div key={i} className="relative flex-shrink-0 w-[300px] md:w-[400px] group cursor-pointer">
                            <div className="relative aspect-[3/4] overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out">
                                <img src={char.img} alt={char.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                                <span className="absolute bottom-4 right-4 text-8xl font-[Cinzel] text-white/10 font-bold group-hover:text-gold-500/20 transition-colors duration-700">0{i + 1}</span>
                            </div>
                            <h3 className="text-3xl font-[Cinzel] text-white group-hover:text-gold-400 transition-colors duration-500">{char.name}</h3>
                            <p className="text-lg text-stone-500 italic font-serif group-hover:text-stone-300 transition-colors duration-500">{char.role}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
