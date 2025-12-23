
import { motion } from 'framer-motion';

const team = [
    { name: "Organizer 1", role: "Lead", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop" },
    { name: "Organizer 2", role: "Tech", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop" },
    { name: "Organizer 3", role: "Design", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
    { name: "Organizer 4", role: "Logistics", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
];

export function Team() {
    return (
        <section id="team" className="min-h-screen bg-stone-950 flex flex-col items-center justify-center py-20 px-4">
            <h2 className="text-4xl md:text-6xl font-[Cinzel] text-white tracking-[0.2em] mb-20 text-center">Our Team</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {team.map((member, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="text-center group"
                    >
                        <div className="w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden mb-6 border border-stone-800 group-hover:border-gold-500 transition-colors">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <h3 className="text-xl font-[Cinzel] text-white tracking-wide">{member.name}</h3>
                        <p className="text-stone-500 font-serif text-sm mt-2">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
