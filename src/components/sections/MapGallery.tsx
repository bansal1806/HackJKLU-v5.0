
import { useRef } from 'react';
import { motion } from 'framer-motion';

export function MapGallery() {
    const constraintsRef = useRef(null);

    return (
        <section className="h-screen w-full bg-stone-950 overflow-hidden relative flex flex-col items-center justify-center">
            <div className="absolute top-10 left-0 w-full text-center z-20 pointer-events-none">
                <h2 className="text-4xl font-[Cinzel] text-stone-300 tracking-[0.2em] uppercase">The Map</h2>
                <p className="text-stone-500 mt-2 text-sm tracking-widest">Explore the lands of Britain and Atlantis</p>
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
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="absolute w-4 h-4 bg-gold-500 rounded-full animate-pulse" style={{ top: `${30 + i * 20}%`, left: `${40 + i * 15}%` }}>
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gold-400 font-[Cinzel]">
                                Location {i}
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
