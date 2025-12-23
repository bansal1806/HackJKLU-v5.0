import { useRef } from 'react';
import { motion } from 'framer-motion';

const locations = [
    { id: 1, x: 50, y: 50, name: "JKLU Campus Main Hub" },
    { id: 2, x: 30, y: 40, name: "Hackers Hostel" },
    { id: 3, x: 70, y: 60, name: "Cafeteria" },
];

export function MapGallery() {
    const constraintsRef = useRef(null);

    return (
        <section className="h-screen bg-stone-900 relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-20 left-0 w-full text-center z-20 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-[Cinzel] text-white tracking-[0.2em]">The Venue</h2>
                <p className="text-stone-400 font-serif mt-4">JK Lakshmipat University, Jaipur</p>
            </div>

            <div ref={constraintsRef} className="w-full h-full cursor-grab active:cursor-grabbing">
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    className="w-[200vw] h-[200vh] -ml-[50vw] -mt-[50vh]"
                >
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                        alt="Ancient Map"
                        className="w-full h-full object-cover sepia-[0.4] opacity-60"
                        draggable="false"
                    />

                    {/* Markers */}
                    {locations.map((loc) => (
                        <div key={loc.id} className="absolute w-4 h-4 bg-gold-500 rounded-full animate-pulse" style={{ top: `${loc.y}%`, left: `${loc.x}%` }}>
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gold-400 font-[Cinzel]">
                                {loc.name}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute bottom-20 z-20 pointer-events-none text-white/20 text-xs tracking-[0.5em]">
                DRAG TO EXPLORE
            </div>
        </section>
    );
}
