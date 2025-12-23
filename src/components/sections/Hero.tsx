
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronRight, Play } from 'lucide-react';


export function Hero() {
    const [hasInteracted, setHasInteracted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Attempt to play video on interaction
    const handleInteraction = () => {
        setHasInteracted(true);
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
        }
    };

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

            {/* Background Video (Placeholder) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                    // Using a placeholder video that looks somewhat cinematic (nature/snow)
                    src="https://assets.mixkit.co/videos/preview/mixkit-winter-forest-with-heavy-snow-and-fog-25660-large.mp4"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                >
                    <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-stone-300 mb-4 font-sans">
                        Episode 1 Premieres January 22
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-[Cinzel] font-bold text-stone-100 tracking-wider leading-none drop-shadow-2xl">
                        THE<br />PENDRAGON<br />CYCLE
                    </h1>
                    <p className="text-xl md:text-2xl font-[Cinzel] text-gold-500 mt-4 tracking-[0.2em] uppercase">
                        Rise of The Merlin
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <button className="group relative px-8 py-3 overflow-hidden bg-transparent border border-stone-500 hover:border-white transition-colors duration-300">
                        <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.2em] uppercase">
                            Get Access <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </button>

                    <button className="group flex items-center gap-3 text-sm tracking-[0.2em] uppercase hover:text-gold-400 transition-colors">
                        <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-gold-400 transition-colors">
                            <Play className="w-4 h-4 fill-current ml-1" />
                        </span>
                        View Trailer
                    </button>
                </motion.div>
            </div>

            {/* Splash Screen / Sound Toggle Overlay */}
            <AnimatePresence>
                {!hasInteracted && (
                    <motion.div
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black flex items-center justify-center cursor-pointer"
                        onClick={handleInteraction}
                    >
                        <motion.button
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="flex flex-col items-center gap-4 text-stone-400 hover:text-white transition-colors"
                        >
                            <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center">
                                <Volume2 className="w-6 h-6" />
                            </div>
                            <span className="text-xs uppercase tracking-[0.3em]">Click to Enable Sound</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
