
import { motion } from 'framer-motion';

const prizes = [
    { title: "2nd Prize", amount: "₹25,000", color: "var(--bronze)", border: "var(--bronze)", scale: 0.9 },
    { title: "1st Prize", amount: "₹50,000", color: "var(--gold-shimmer)", border: "var(--gold-shimmer)", scale: 1.1 },
    { title: "3rd Prize", amount: "₹10,000", color: "var(--terracotta)", border: "var(--terracotta)", scale: 0.9 },
];

export function Prizes() {
    return (
        <section id="prizes" className="min-h-screen flex flex-col items-center justify-center py-20 relative" style={{ backgroundColor: 'var(--void-black)' }}>
            <h2 className="text-4xl md:text-6xl font-[Cinzel] tracking-[0.2em] mb-20 text-center text-glow-gold" style={{ color: 'var(--ivory-cream)' }}>Prize Pool</h2>

            <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-12 px-4">
                {prizes.map((prize, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        className="relative p-8 md:p-12 backdrop-blur-sm flex flex-col items-center justify-center text-center w-full md:w-64 aspect-[3/4]"
                        style={{ 
                            transform: `scale(${prize.scale})`,
                            border: `1px solid ${prize.border}`,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            boxShadow: i === 1 ? '0 0 30px rgba(255, 215, 0, 0.3)' : 'none'
                        }}
                    >
                        <h3 className="text-2xl font-[Cinzel] mb-4" style={{ color: prize.color }}>{prize.title}</h3>
                        <p className="text-4xl md:text-5xl font-bold font-sans" style={{ color: 'var(--ivory-cream)' }}>{prize.amount}</p>
                        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, ${prize.color}20, transparent)` }} />
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="font-[Cinzel] tracking-widest text-sm uppercase" style={{ color: 'var(--stone-gray)' }}>Total Pool: ₹1,00,000+</p>
            </div>
        </section>
    );
}
