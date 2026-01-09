import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// --- ASSETS ---
import bgImage from '../../assets/speakers/bg.webp';
import ringImage from '../../assets/speakers/ring.webp';

// --- DATA ---
const speakers = [
    { id: 1, name: "Dr. Rachel Green", role: "Keynote Speaker", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500", tag: "@rachel_ai" },
    { id: 2, name: "David Chen", role: "Judge", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500", tag: "@chen_tech" },
    { id: 3, name: "Sarah Miller", role: "Mentor", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500", tag: "@sarahm_ux" },
    { id: 4, name: "James Wilson", role: "Head Judge", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500", tag: "@jwilson_dev" },
    { id: 5, name: "Emily White", role: "Speaker", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500", tag: "@emily_design" },
    { id: 6, name: "Michael Ross", role: "Judge", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500", tag: "@mross_vc" },
    { id: 7, name: "Anita Patel", role: "Mentor", image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=500", tag: "@anita_code" },
    // Added 8th speaker
    { id: 8, name: "Kenji Sato", role: "Investor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500", tag: "@kenji_vc" },
];

export function Speakers() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black font-cinzel">
            {/* Background & Overlay */}
            <div className="absolute inset-0 z-0">
                <img src={bgImage} alt="Chamber" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/80" />
            </div>

            {/* Title */}
            <div className="absolute top-16 md:top-24 left-0 right-0 z-20 text-center pointer-events-none px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-3xl md:text-5xl lg:text-6xl text-[#EFE3A0] font-bold tracking-widest uppercase drop-shadow-[0_4px_15px_rgba(239,227,160,0.4)]"
                    style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
                >
                    Past Speakers & Judges
                </motion.h1>
            </div>

            {/* 3D Floor Container */}
            <div className="absolute inset-0 top-0 flex items-center justify-center perspective-[1200px] overflow-hidden">
                <FloorEllipse />
            </div>
        </section>
    );
}

function FloorEllipse() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- CONFIGURATION FOR AMPHITHEATER-STYLE ELLIPSE ---
    // Create a more pronounced semi-circular arc like the reference image
    const xRadius = isMobile ? window.innerWidth * 0.45 : 800;
    const yRadius = isMobile ? 140 : 280;

    // Semi-circular arc arrangement: from left (180°) to right (0°/360°)
    // This creates a visible arc from left to right, with center at top (270°)
    const startAngle = 200; // Start from left side
    const endAngle = 340;   // End at right side
    // This gives us a 140-degree arc, creating a pronounced semi-circular arrangement

    return (
        <div className={`relative w-full h-full flex items-center justify-center ${isMobile ? 'translate-y-16' : 'translate-y-28'}`} style={{ transformStyle: 'preserve-3d' }}>

            {/* Enhanced Golden Floor Glow - More prominent like reference */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className={`absolute rounded-[100%] bg-gradient-to-b from-amber-500/15 via-amber-500/10 to-transparent blur-[80px] pointer-events-none`}
                style={{
                    width: isMobile ? '350px' : '1200px',
                    height: isMobile ? '180px' : '500px',
                    transform: 'rotateX(60deg)',
                    boxShadow: 'inset 0 0 100px rgba(212, 175, 55, 0.25), 0 0 60px rgba(212, 175, 55, 0.15)'
                }}
            />

            {/* Prominent Golden Elliptical Path - Matching reference image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute border-2 border-amber-500/40 rounded-[100%] pointer-events-none"
                style={{
                    width: xRadius * 2.1,
                    height: yRadius * 2.1,
                    transform: 'rotateX(60deg)',
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.1)'
                }}
            />

            {/* Secondary inner glow ring for depth */}
            <div className="absolute border border-amber-500/20 rounded-[100%] pointer-events-none"
                style={{
                    width: xRadius * 1.8,
                    height: yRadius * 1.8,
                    transform: 'rotateX(60deg)'
                }} />

            {speakers.map((speaker, index) => {
                const count = speakers.length;
                // Distribute speakers evenly along the arc
                const step = (endAngle - startAngle) / (count - 1);
                const degree = startAngle + (index * step);
                const radian = (degree * Math.PI) / 180;

                // Ellipse parametric equations
                const x = Math.cos(radian) * xRadius;
                const y = Math.sin(radian) * yRadius;

                // Depth-based scaling for 3D perspective
                // y ranges from -yRadius (back/top) to +yRadius (front/bottom)
                const normalizedY = (y + yRadius) / (yRadius * 2); // 0 (back) to 1 (front)
                
                // Scale: back items smaller (0.55), front items larger (1.0)
                const scale = 0.55 + (normalizedY * 0.45);
                
                // zIndex for proper layering
                const zIndex = Math.floor(normalizedY * 100);

                return (
                    <SpeakerCard
                        key={speaker.id}
                        speaker={speaker}
                        x={x}
                        y={y}
                        scale={scale}
                        zIndex={zIndex}
                        delay={index * 0.1}
                        isMobile={isMobile}
                    />
                );
            })}
        </div>
    );
}

function SpeakerCard({ speaker, x, y, scale, zIndex, delay, isMobile }: any) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="absolute flex items-center justify-center"
            initial={{ opacity: 0, y: -200, scale: 0 }}
            animate={{
                opacity: 1,
                x: x,
                y: y,
                scale: scale,
                zIndex: isHovered ? 1000 : zIndex
            }}
            transition={{
                duration: 1,
                delay: delay,
                ease: "easeOut"
            }}
            style={{
                transformStyle: "preserve-3d" // Crucial for z-index and 3D stacking
            }}
        >
            <div className="relative group">
                {/* REFLECTION SHADOW (New Enhancement) */}
                {/* This creates the 'standing on floor' illusion */}
                <motion.div
                    className="absolute top-[90%] left-0 right-0 h-full opacity-30 pointer-events-none"
                    animate={{
                        opacity: isHovered ? 0.2 : 0.4,
                        transform: `scaleY(-1) skewX(${x * -0.01}deg)` // Subtle skew based on position for realism
                    }}
                >
                    <div className="w-full h-full relative">
                        <img
                            src={speaker.image}
                            alt=""
                            className="w-full h-full object-cover rounded-full blur-[2px]"
                        />
                        {/* Gradient mask to fade out the reflection */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
                    </div>
                </motion.div>

                {/* MAIN CARD */}
                <motion.div
                    className={`${isMobile ? 'w-24 h-24' : 'w-40 h-40'} relative cursor-pointer`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.2, y: -20 }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        y: {
                            duration: 3 + Math.random(),
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        scale: { duration: 0.3 }
                    }}
                >
                    {/* Ring Frame */}
                    <div className="absolute inset-[-25%] z-20 pointer-events-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)]">
                        <img src={ringImage} alt="Frame" className="w-full h-full object-contain" />
                    </div>

                    {/* Speaker Image */}
                    <div className="absolute inset-0 rounded-full overflow-hidden bg-black z-10 border border-[#4a3b22]">
                        <motion.img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                            animate={{
                                filter: isHovered ? 'grayscale(0%) sepia(0%) brightness(1.1)' : 'grayscale(100%) sepia(20%) brightness(0.9)'
                            }}
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]" />
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, y: isMobile ? 80 : 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`absolute z-50 w-max ${isMobile ? 'left-1/2 -translate-x-1/2 top-full' : 'left-full top-1/2 -translate-y-1/2 ml-6'}`}
                            >
                                <div className="bg-black/80 backdrop-blur-md border border-[#EFE3A0]/40 p-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                    <h3 className="text-[#d4af37] font-bold text-lg leading-none mb-1 font-cinzel">{speaker.tag}</h3>
                                    <div className="h-px w-full bg-gradient-to-r from-[#d4af37]/50 to-transparent my-2" />
                                    <p className="text-white font-semibold text-sm">{speaker.name}</p>
                                    <p className="text-neutral-400 text-xs uppercase tracking-wider mt-1">{speaker.role}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
