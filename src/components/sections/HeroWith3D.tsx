import { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronRight, Play } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { SimpleSkybox } from '../3d/SimpleSkybox';

export function HeroWith3D() {
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

            {/* 3D Skybox Background */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: "high-performance",
                    }}
                    camera={{ position: [0, 0, 0], fov: 75 }}
                >
                    <Suspense fallback={
                        <div className="w-full h-full bg-gradient-to-b from-purple-900 to-black" />
                    }>
                        <PerspectiveCamera makeDefault position={[0, 0, 0]} />
                        <SimpleSkybox
                            imagePath="/skybox.jpg"
                            autoRotate={true}
                            rotationSpeed={0.001}
                        />
                    </Suspense>
                </Canvas>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                >
                    <h2 className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-subheading" style={{ color: 'var(--stone-gray)' }}>
                        March 13<sup className="text-[0.6em] lowercase">th</sup> - 15<sup className="text-[0.6em] lowercase">th</sup>, 2026 • JK Lakshmipat University
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
                    className="mb-8 md:mb-12"
                >
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold tracking-wider leading-none px-2" style={{ color: 'var(--ivory-cream)', textShadow: '0 0 30px rgba(74, 14, 14, 0.8), 0 10px 40px rgba(74, 14, 14, 0.6)' }}>
                        HACKJKLU<br />5.0
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl font-heading mt-4 tracking-[0.2em] uppercase text-glow-amber" style={{ color: 'var(--gold-shimmer)' }}>
                        Where innovation meets code
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-6"
                >
                    <a
                        href="https://hackjklu-4.devfolio.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto group relative px-8 py-3 overflow-hidden bg-transparent text-center transition-all duration-300"
                        style={{
                            border: '1px solid var(--terracotta)',
                            color: 'var(--ivory-cream)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--gold-shimmer)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--terracotta)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.2em] uppercase">
                            Register Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" style={{ backgroundColor: 'rgba(238, 138, 60, 0.1)' }} />
                    </a>

                    <a
                        href="https://discord.gg/TYyAmwzC38"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto group flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.2em] uppercase transition-colors"
                        style={{ color: 'var(--ivory-cream)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-shimmer)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ivory-cream)'}
                    >
                        <span
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            style={{ border: '1px solid rgba(255, 236, 209, 0.3)' }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-shimmer)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 236, 209, 0.3)'}
                        >
                            <Play className="w-4 h-4 fill-current ml-1" />
                        </span>
                        Join Discord
                    </a>
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
                            className="flex flex-col items-center gap-4 transition-colors"
                            style={{ color: 'var(--stone-gray)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-shimmer)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--stone-gray)'}
                        >
                            <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center glow-amber">
                                <Volume2 className="w-6 h-6" />
                            </div>
                            <span className="text-xs uppercase tracking-[0.3em]">Enter HACKJKLU 5.0</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}