import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- ASSETS ---
import bgImage from '../../assets/speakers/bg-amphitheater.jpg';
import frameImage from '../../assets/speakers/gold-frame.png';

// Social Icons
import iconWeb from '../../assets/socials/web.png';
import iconInsta from '../../assets/socials/instagram.png';
import iconX from '../../assets/socials/x.png';
import iconLinkedin from '../../assets/socials/linkedin.png';

// --- DATA ---
const speakers = [
    {
        id: 1,
        name: "Ankur Warikoo",
        role: "Content Creator",
        image: "https://www.hackjklu.com/_next/image?url=%2Fspeakers%2Fankur-warikoo.webp&w=3840&q=75",
        tag: "@warikoo",
        bio: "Entrepreneur, mentor, and content creator inspiring millions to take charge of their lives.",
        socials: { linkedin: "https://www.linkedin.com/in/warikoo/" }
    },
    {
        id: 2,
        name: "Sandeep Jain",
        role: "Founder & CEO, GFG",
        image: "https://www.hackjklu.com/_next/image?url=%2Fspeakers%2Fsandeep-jain.webp&w=3840&q=75",
        tag: "@sandeep_gfg",
        bio: "Founder of GeeksforGeeks. Revolutionizing the way students learn programming.",
        socials: { linkedin: "https://www.linkedin.com/in/sandeep-jain-geeksforgeeks/" }
    },
    {
        id: 3,
        name: "Bhagirath Giri",
        role: "MD, WsCube Tech",
        image: "https://www.hackjklu.com/_next/image?url=%2Fspeakers%2Fbhagirath-giri.webp&w=1080&q=75",
        tag: "@bhagirath_tech",
        bio: "Leading ed-tech innovation at WsCube Tech, empowering careers in digital skills.",
        socials: { linkedin: "https://www.linkedin.com/in/bhagirath-giri/" }
    },
    {
        id: 4,
        name: "Jaskaran Singh",
        role: "SWE @Google",
        image: "https://www.hackjklu.com/_next/image?url=%2Fjudges%2F4.webp&w=1080&q=75",
        tag: "@jaskaran_code",
        bio: "ICPC World Finalist 2023. Cracking complex problems at Google.",
        socials: { linkedin: "https://www.linkedin.com/in/jaskaran-singh-8b8450200/" }
    },
    {
        id: 5,
        name: "Kanishak Chaurasia",
        role: "Founder, PolyCrypt",
        image: "https://www.hackjklu.com/_next/image?url=%2Fjudges%2F3.webp&w=1080&q=75",
        tag: "@kanishak_poly",
        bio: "Building the future of decentralized security at PolyCrypt HQ.",
        socials: { linkedin: "https://www.linkedin.com/in/dappdost/" }
    },
    {
        id: 6,
        name: "Harshvardhan Singh",
        role: "Tech Staff, GFG",
        image: "https://www.hackjklu.com/_next/image?url=%2Fjudges%2F1.webp&w=1080&q=75",
        tag: "@harsh_dev",
        bio: "Mentoring the next generation of developers at GeeksforGeeks.",
        socials: { linkedin: "https://www.linkedin.com/in/harshvardhan-singh-43bb86242/" }
    },
    {
        id: 7,
        name: "Vikas Thakur",
        role: "Tech Staff, GFG",
        image: "https://www.hackjklu.com/_next/image?url=%2Fjudges%2F2.webp&w=1080&q=75",
        tag: "@vikas_gfg",
        bio: "Expert in algorithms and data structures, shaping the GFG curriculum.",
        socials: { linkedin: "" }
    }
];

export function Speakers() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black font-cinzel">
            {/* Background & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Amphitheater"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-black/90" />

                {/* Ambient Particles/Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse pointer-events-none" />
            </div>

            {/* Title */}
            <div className="absolute top-12 md:top-20 left-0 right-0 z-20 text-center pointer-events-none px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-6xl lg:text-7xl text-[#EFE3A0] font-bold tracking-[0.2em] uppercase drop-shadow-[0_4px_15px_rgba(239,227,160,0.4)]"
                    style={{ textShadow: '0 0 40px rgba(212, 175, 55, 0.6)' }}
                >
                    The Council
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-[#d4af37]/80 text-sm md:text-lg tracking-[0.3em] font-light mt-2 uppercase"
                >
                    Past Speakers & Judges
                </motion.p>
            </div>

            {/* 3D Floor Container */}
            <div className="absolute inset-0 top-0 flex items-center justify-center perspective-[1200px] overflow-hidden">
                <FloorCarousel />
            </div>
        </section>
    );
}

function FloorCarousel() {
    const [isMobile, setIsMobile] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [hoveredSpeaker, setHoveredSpeaker] = useState<any>(null);
    const hoverTimeoutRef = useRef<any>(null); // For grace period

    const visibleCount = 7; // UPDATED to 7

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        }
    }, []);

    const nextSlide = () => {
        setStartIndex((prev) => (prev + 1) % speakers.length);
    };

    const prevSlide = () => {
        setStartIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
    };

    // Calculate Visible Speakers
    const visibleSpeakers = [];
    for (let i = 0; i < visibleCount; i++) {
        const index = (startIndex + i) % speakers.length;
        visibleSpeakers.push({ ...speakers[index], indexPosition: i });
    }

    const xRadius = isMobile ? window.innerWidth * 0.42 : Math.min(800, window.innerWidth * 0.4);
    const yRadius = isMobile ? 120 : 250;
    const startAngle = 180;
    const endAngle = 360;

    // --- HOVER HANDLERS ---
    const handleSpeakerEnter = (speaker: any) => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredSpeaker(speaker);
    };

    const handleSpeakerLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        // Add grace period to allow moving to panel
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredSpeaker(null);
        }, 300);
    };

    const handlePanelEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };

    const handlePanelLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredSpeaker(null);
        }, 300);
    };


    return (
        <div className={`relative w-full h-full flex items-center justify-center ${isMobile ? 'translate-y-20' : 'translate-y-32'}`} style={{ transformStyle: 'preserve-3d' }}>

            {/* --- NAVIGATION CONTROLS --- */}
            <div className="absolute z-50 flex justify-between w-full max-w-[90vw] md:max-w-[1400px] px-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="pointer-events-auto p-4 rounded-full bg-black/40 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all group backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                    <ChevronLeft className="w-8 h-8 text-[#d4af37]/70 group-hover:text-[#d4af37] group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={nextSlide}
                    className="pointer-events-auto p-4 rounded-full bg-black/40 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all group backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                    <ChevronRight className="w-8 h-8 text-[#d4af37]/70 group-hover:text-[#d4af37] group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Floor Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className={`absolute rounded-[100%] bg-amber-500/10 blur-[80px] pointer-events-none`}
                style={{
                    width: isMobile ? '350px' : '1200px',
                    height: isMobile ? '180px' : '500px',
                    transform: 'rotateX(70deg)',
                }}
            />

            {/* Golden Ring on Floor */}
            <div className="absolute border-[2px] border-[#d4af37]/30 rounded-[100%] pointer-events-none shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                style={{
                    width: xRadius * 2.2,
                    height: yRadius * 2.2,
                    transform: 'rotateX(70deg)',
                }}
            />

            {/* DEDICATED SPEAKER DETAILS PANEL */}
            <AnimatePresence mode='wait'>
                {hoveredSpeaker && (
                    <div className="absolute inset-0 z-[200] pointer-events-none flex items-end justify-center pb-32 md:pb-24">
                        <motion.div
                            key="detail-panel"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="pointer-events-auto max-w-[90vw] w-[350px] md:w-[600px] max-h-[70vh] overflow-y-auto bg-black/80 backdrop-blur-xl border border-[#d4af37]/40 rounded-xl p-5 md:p-8 flex flex-col md:flex-row gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative group"
                            onMouseEnter={handlePanelEnter}
                            onMouseLeave={handlePanelLeave}
                        >
                            {/* Animated Border Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 to-transparent pointer-events-none animate-pulse" />

                            {/* Profile Image (Small Circle) */}
                            <div className="hidden md:block w-24 h-24 rounded-full border-2 border-[#d4af37] overflow-hidden shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                <motion.img
                                    key={hoveredSpeaker.image}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    src={hoveredSpeaker.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left z-10">
                                <motion.div
                                    key={hoveredSpeaker.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-2xl md:text-3xl text-[#d4af37] font-bold font-cinzel tracking-wide mb-1 drop-shadow-md">
                                        {hoveredSpeaker.name}
                                    </h2>
                                    <p className="text-[#a89052] text-xs md:text-sm uppercase tracking-widest font-semibold mb-3">
                                        {hoveredSpeaker.role}
                                    </p>
                                    <div className="h-px w-full md:w-3/4 bg-gradient-to-r from-[#d4af37]/50 to-transparent mx-auto md:mx-0 mb-4" />
                                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-6 font-light font-sans tracking-wide">
                                        {hoveredSpeaker.bio}
                                    </p>
                                </motion.div>

                                {/* Socials */}
                                <div className="flex gap-4 justify-center md:justify-start">
                                    {hoveredSpeaker.socials.web && <SocialIcon icon={iconWeb} delay={0} />}
                                    {hoveredSpeaker.socials.linkedin && <SocialIcon icon={iconLinkedin} delay={0.1} />}
                                    {hoveredSpeaker.socials.x && <SocialIcon icon={iconX} delay={0.2} />}
                                    {hoveredSpeaker.socials.insta && <SocialIcon icon={iconInsta} delay={0.3} />}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            <AnimatePresence mode='popLayout'>
                {visibleSpeakers.map((speaker) => {
                    // Position Logic
                    const step = (endAngle - startAngle) / (visibleCount - 1);
                    // Use indexPosition (0 to 6) to determine slot
                    const degree = startAngle + (speaker.indexPosition * step);
                    const radian = (degree * Math.PI) / 180;

                    const x = Math.cos(radian) * xRadius;
                    const y = Math.sin(radian) * yRadius;

                    // Perspective Scale
                    const normalizedY = (y + yRadius) / (yRadius * 2);
                    const scale = 0.5 + (normalizedY * 0.5);
                    const zIndex = Math.floor(normalizedY * 100);

                    // Center is index 3 in a 7-item array (0 1 2 [3] 4 5 6)
                    const isCenter = speaker.indexPosition === 3;

                    return (
                        <SpeakerCard
                            key={speaker.id} // Stable key for smooth transition
                            speaker={speaker}
                            x={x}
                            y={y}
                            scale={scale}
                            zIndex={zIndex}
                            isCenter={isCenter}
                            isMobile={isMobile}
                            onMouseEnter={() => handleSpeakerEnter(speaker)}
                            onMouseLeave={handleSpeakerLeave}
                        />
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

function SpeakerCard({ speaker, x, y, scale, zIndex, isCenter, isMobile, onMouseEnter, onMouseLeave }: any) {
    const [isHovered, setIsHovered] = useState(false);

    // Initial random float offset to desynchronize bobbing
    const randomOffset = useRef(Math.random() * 2000).current;

    const handleEnter = () => {
        setIsHovered(true);
        onMouseEnter();
    };

    const handleLeave = () => {
        setIsHovered(false);
        onMouseLeave();
    };


    return (
        <motion.div
            className="absolute flex items-center justify-center block"
            initial={false} // Skip entering animation if standard transition handles it
            animate={{
                x: x,
                y: y,
                scale: scale,
                zIndex: isHovered ? 1000 : zIndex,
                filter: `blur(${isHovered || isCenter ? 0 : 3}px)`,
                opacity: 1
            }}
            transition={{
                type: "spring",
                stiffness: 45,
                damping: 20,
                mass: 1.2
            }}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Floating Animation Container */}
            <motion.div
                animate={isHovered ? { y: -10 } : { y: [0, -15, 0] }} // Stop floating on hover
                transition={isHovered ? { duration: 0.3 } : {
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: -randomOffset
                }}
                className="relative group"
            >

                {/* REFLECTION */}
                <div
                    className="absolute top-[92%] left-0 right-0 h-[80%] opacity-40 pointer-events-none"
                    style={{ transform: `scaleY(-1) skewX(${x * -0.015}deg)` }}
                >
                    <img
                        src={speaker.image}
                        alt=""
                        className="w-full h-full object-cover rounded-full blur-[8px] mask-image-gradient"
                        style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' }}
                    />
                </div>

                {/* CARD CONTAINER */}
                <motion.div
                    className={`${isMobile ? 'w-24 h-24' : 'w-56 h-56'} relative cursor-pointer`} // Slightly smaller for 7 items
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    whileHover={{ scale: 1.15, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {/* CUSTOM GOLD FRAME */}
                    <div className="absolute -inset-[18%] z-20 pointer-events-none filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                        <img
                            src={frameImage}
                            alt="Frame"
                            className="w-full h-full object-contain brightness-125 contrast-110"
                        />
                    </div>

                    {/* IMAGE */}
                    <div className={`absolute inset-[14%] rounded-full overflow-hidden z-10 border-[2px] ${isCenter ? 'border-[#d4af37]' : 'border-[#5c4d32]'} transition-colors duration-500 bg-black`}>
                        <motion.img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                            animate={{
                                filter: isHovered || isCenter
                                    ? 'grayscale(0%) sepia(0%) brightness(1.0) contrast(1.1)'
                                    : 'grayscale(100%) sepia(30%) brightness(0.6) contrast(1.0)',
                                scale: isHovered ? 1.1 : 1
                            }}
                            transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]" />
                    </div>

                    {/* GLOW (Only for Center or Hover) */}
                    {(isCenter || isHovered) && (
                        <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-[50px] -z-10 animate-pulse" />
                    )}

                    {/* Default Name Tag (Visible when NOT hovered) */}
                    <motion.div
                        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-max text-center pointer-events-none"
                        animate={{ opacity: isHovered ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <AnimatePresence mode='wait'>
                            {isCenter && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col items-center"
                                >
                                    <h3 className="text-[#F4E3A3] font-bold text-xl md:text-2xl tracking-wider drop-shadow-[0_0_10px_rgba(244,227,163,0.6)] font-cinzel">
                                        {speaker.name}
                                    </h3>
                                    <p className="text-[#a89052] text-xs md:text-sm uppercase tracking-[0.2em] mt-1 font-semibold">
                                        {speaker.role}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function SocialIcon({ icon, delay }: { icon: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: "spring", stiffness: 400, damping: 20 }}
            className="w-8 h-8 rounded-full bg-black/80 border border-[#d4af37]/50 hover:bg-[#d4af37] hover:border-white p-2 transition-all cursor-pointer group shadow-lg"
        >
            <img src={icon} alt="Social" className="w-full h-full object-contain invert opacity-70 group-hover:invert-0 group-hover:opacity-100 transition-all duration-300" />
        </motion.div>
    )
}
