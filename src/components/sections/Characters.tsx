import { motion } from 'framer-motion';

const characters = [
    { name: "Environment", role: "Sustainability", img: "https://images.unsplash.com/photo-1473042904451-00171c69419d?q=80&w=2075&auto=format&fit=crop" },
    { name: "Healthcare", role: "Well-being", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" },
    { name: "Tech", role: "AI & Innovation", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Education", role: "Social Innovation", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" },
    { name: "Finance", role: "Business", img: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop" },
    { name: "Entertainment", role: "Media & Culture", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" },
    { name: "Open", role: "Innovation", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" }
];

export function Characters() {
    return (
        <section id="themes" className="min-h-screen py-20 px-4" style={{ backgroundColor: 'var(--deep-wine)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-[Cinzel] tracking-[0.2em] mb-4 text-glow-gold" style={{ color: 'var(--ivory-cream)' }}>The Tracks</h2>
                    <p className="font-serif text-lg" style={{ color: 'var(--stone-gray)' }}>Choose your path of innovation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {characters.map((char, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative h-96 overflow-hidden cursor-pointer transition-all duration-300"
                            style={{ border: '1px solid var(--terracotta)' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--gold-shimmer)';
                                e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--terracotta)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <img src={char.img} alt={char.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 
                                    className="text-3xl font-[Cinzel] transition-colors mb-2"
                                    style={{ color: 'var(--ivory-cream)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-shimmer)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ivory-cream)'}
                                >
                                    {char.name}
                                </h3>
                                <p className="font-serif italic" style={{ color: 'var(--stone-gray)' }}>{char.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
