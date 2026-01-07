
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import arrowLeft from '../../assets/prizes/arrow-left.png';
import arrowRight from '../../assets/prizes/arrow-right.png';
import zeusImg from '../../assets/prizes/zeus.jpg';
import poseidonImg from '../../assets/prizes/poseidon.jpg';
import hadesImg from '../../assets/prizes/hades.jpg';
import domainSpartan from '../../assets/prizes/domain-spartan.jpg';


const mainPrizes = [
    {
        rank: "1",
        title: "1ST PRIZE",
        god: "Zeus",
        role: "Ruler of the Sky",
        amount: "50K",
        color: "#FFD700",
        border: "linear-gradient(to bottom right, #FFD700, #B8860B)",
        image: zeusImg
    },
    {
        rank: "2",
        title: "2ND PRIZE",
        god: "Poseidon",
        role: "Ruler of the Seas",
        amount: "25K",
        color: "#C0C0C0",
        border: "linear-gradient(to bottom right, #a0a0a0, #e0e0e0)",
        image: hadesImg
    },
    {
        rank: "3",
        title: "3RD PRIZE",
        god: "Hades",
        role: "Ruler of the Underworld",
        amount: "25K",
        color: "#cd7f32",
        border: "linear-gradient(to bottom right, #cd7f32, #8b4500)",
        image: poseidonImg
    }
];

const domainPrizes = [
    { title: "AI & ML", desc: "Best AI Innovation", img: domainSpartan },
    { title: "Cyber Security", desc: "Best Security Hack", img: domainSpartan },
    { title: "Blockchain", desc: "Best Web3 DApp", img: domainSpartan },
    { title: "Data Science", desc: "Best Data Solution", img: domainSpartan }
];



export default function Prizes() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [domainActiveIndex, setDomainActiveIndex] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const prevIndex = (activeIndex - 1 + mainPrizes.length) % mainPrizes.length;
    const nextIndex = (activeIndex + 1) % mainPrizes.length;
    const activePrize = mainPrizes[activeIndex];

    const domainPrevIndex = (domainActiveIndex - 1 + domainPrizes.length) % domainPrizes.length;
    const domainNextIndex = (domainActiveIndex + 1) % domainPrizes.length;
    const activeDomainPrize = domainPrizes[domainActiveIndex];

    const sections = [
        { id: 0, name: 'main-prizes', label: 'Main Prizes' },
        { id: 1, name: 'domain-prizes', label: 'Domain Prizes' }
    ];

    // Generate random values once for particles using useState lazy initialization
    const [flameParticles] = useState(() =>
        Array.from({ length: 20 }).map(() => ({
            width: Math.random() * 4 + 2,
            height: Math.random() * 6 + 3,
            left: Math.random() * 100,
            x1: Math.random() * 80 - 40,
            x2: Math.random() * 60 - 30,
            rotate: Math.random() * 180 - 90,
            duration: Math.random() * 6 + 8,
            delay: Math.random() * 10
        }))
    );

    const [fireEmberParticles] = useState(() =>
        Array.from({ length: 25 }).map(() => ({
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: Math.random() * 100,
            borderRadius: Math.random() * 50 + 50,
            x1: Math.random() * 60 - 30,
            x2: Math.random() * 40 - 20,
            duration: Math.random() * 8 + 10,
            delay: Math.random() * 12
        }))
    );

    const [ashParticles] = useState(() =>
        Array.from({ length: 30 }).map(() => ({
            width: Math.random() * 2.5 + 1,
            height: Math.random() * 2.5 + 1,
            left: Math.random() * 100,
            borderRadius: Math.random() * 40 + 60,
            x: Math.random() * 50 - 25,
            rotate: Math.random() * 180,
            duration: Math.random() * 7 + 9,
            delay: Math.random() * 12
        }))
    );

    const [debrisParticles] = useState(() =>
        Array.from({ length: 15 }).map(() => ({
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            left: Math.random() * 100,
            borderRadius: Math.random() * 30 + 70,
            x: Math.random() * 40 - 20,
            duration: Math.random() * 10 + 12,
            delay: Math.random() * 15
        }))
    );

    const handleNext = () => {
        if (isAnimating) return;
        setActiveIndex((prev) => (prev + 1) % mainPrizes.length);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setActiveIndex((prev) => (prev - 1 + mainPrizes.length) % mainPrizes.length);
    };

    const goToSlide = (index: number) => {
        if (isAnimating || index === activeIndex) return;
        setActiveIndex(index);
    };

    const handleDomainNext = () => {
        if (isAnimating) return;
        setDomainActiveIndex((prev) => (prev + 1) % domainPrizes.length);
    };

    const handleDomainPrev = () => {
        if (isAnimating) return;
        setDomainActiveIndex((prev) => (prev - 1 + domainPrizes.length) % domainPrizes.length);
    };

    const goToDomainSlide = (index: number) => {
        if (isAnimating || index === domainActiveIndex) return;
        setDomainActiveIndex(index);
    };

    const switchSection = (nextSection: number) => {
        if (isAnimating || nextSection === currentSection) return;

        setIsAnimating(true);
        setCurrentSection(nextSection);

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            if (e.deltaY > 0 && currentSection < sections.length - 1) {
                switchSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                switchSection(currentSection - 1);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (currentSection === 0) { // Main prizes section
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        handlePrev();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        handleNext();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (currentSection > 0) switchSection(currentSection - 1);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (currentSection < sections.length - 1) switchSection(currentSection + 1);
                        break;
                    case ' ':
                        e.preventDefault();
                        setIsPaused(!isPaused);
                        break;
                }
            } else { // Domain prizes section
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        handleDomainPrev();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        handleDomainNext();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (currentSection > 0) switchSection(currentSection - 1);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (currentSection < sections.length - 1) switchSection(currentSection + 1);
                        break;
                    case ' ':
                        e.preventDefault();
                        setIsPaused(!isPaused);
                        break;
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [currentSection, isAnimating, isPaused, activeIndex, domainActiveIndex]);

    // Auto-play functionality
    useEffect(() => {
        if (currentSection === 0 && !isPaused && !isAnimating) {
            const interval = setInterval(() => {
                handleNext();
            }, 10000); // Change slide every 10 seconds

            return () => clearInterval(interval);
        } else if (currentSection === 1 && !isPaused && !isAnimating) {
            const interval = setInterval(() => {
                handleDomainNext();
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [activeIndex, domainActiveIndex, currentSection, isPaused, isAnimating]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div ref={containerRef} className="relative bg-neutral-950 text-neutral-100 min-h-screen h-[100dvh] overflow-hidden selection:bg-yellow-900 selection:text-white pt-20 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48 pb-16 sm:pb-20 md:pb-24">
            {/* Section Navigation Indicators */}
            <div className="fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 sm:gap-3 md:gap-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => switchSection(section.id)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 ${currentSection === section.id
                            ? 'bg-[#d4af37] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                            : 'bg-transparent border-neutral-500 hover:border-[#d4af37]/60'
                            }`}
                        aria-label={`Go to ${section.label}`}
                    />
                ))}
            </div>

            {/* Scroll Hint with enhanced styling - Only show if not last section */}
            <AnimatePresence>
                {currentSection < sections.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-12 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-50 text-center"
                    >
                        {/* Slide Indicators - Show for both sections appropriately */}
                        <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            {currentSection === 0 ? mainPrizes.map((_, index) => (
                                <button
                                    key={`main-${index}`}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                        ? 'bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                                        : 'bg-neutral-600 hover:bg-neutral-500'
                                        }`}
                                    aria-label={`Go to ${mainPrizes[index].god} prize`}
                                />
                            )) : domainPrizes.map((_, index) => (
                                <button
                                    key={`domain-${index}`}
                                    onClick={() => goToDomainSlide(index)}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === domainActiveIndex
                                        ? 'bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                                        : 'bg-neutral-600 hover:bg-neutral-500'
                                        }`}
                                    aria-label={`Go to ${domainPrizes[index].title} prize`}
                                />
                            ))}
                        </div>

                        {/* Keyboard Instructions */}
                        <motion.p
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xs sm:text-sm text-neutral-400 mb-2 sm:mb-3 font-cinzel tracking-wider"
                        >
                            {currentSection <= 1 ? 'Use ← → keys or scroll to explore' : 'Scroll to explore'}
                        </motion.p>

                        {/* Mouse Indicator */}
                        <motion.div
                            className="w-5 h-8 sm:w-6 sm:h-10 md:w-8 md:h-12 border-2 border-neutral-500 rounded-full mx-auto relative"
                            whileHover={{ scale: 1.1, borderColor: '#d4af37' }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="w-0.5 h-1.5 sm:w-1 sm:h-2 md:w-1.5 md:h-3 bg-neutral-400 rounded-full absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Hide Scrollbar */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
                
                /* Ensure full height on mobile browsers */
                @supports (-webkit-touch-callout: none) {
                    .min-h-screen {
                        min-height: -webkit-fill-available;
                    }
                }
                
                * {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                *::-webkit-scrollbar {
                    display: none;
                }
                body {
                    font-family: 'Cinzel', serif;
                    overscroll-behavior: none; /* Prevent bounce on mobile */
                }
                .font-cinzel {
                    font-family: 'Cinzel', serif;
                }
                .font-baskerville {
                    font-family: 'Libre Baskerville', serif;
                }
                .font-medieval {
                    font-family: 'Cinzel', serif;
                    font-weight: 700;
                }
                @keyframes animate-clouds {
                    from { background-position: 0 0; }
                    to { background-position: 100% 0; }
                }
                @keyframes battlefield-drift {
                    0%, 100% { 
                        transform: translateX(0) translateY(0) scale(1) rotate(0deg);
                        opacity: 0.8;
                    }
                    25% { 
                        transform: translateX(25px) translateY(-15px) scale(1.1) rotate(3deg);
                        opacity: 1;
                    }
                    50% { 
                        transform: translateX(-20px) translateY(-25px) scale(0.9) rotate(-2deg);
                        opacity: 0.9;
                    }
                    75% { 
                        transform: translateX(-30px) translateY(-15px) scale(1.05) rotate(2deg);
                        opacity: 1;
                    }
                }
                @keyframes ash-drift {
                    0% { transform: translateY(-10px) translateX(0px) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.2; }
                    100% { transform: translateY(100vh) translateX(20px) rotate(180deg); opacity: 0; }
                }
                .ash-particle {
                    animation: ash-drift linear infinite;
                }
            `}</style>

            {/* ULTIMATE: Combined Fire + Ash Particles */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* FIRE PARTICLES - Rising from ground */}
                {/* Large flame particles rising from bottom */}
                {flameParticles.map((particle, i) => (
                    <motion.div
                        key={`flame-${i}`}
                        className="absolute rounded-full shadow-lg"
                        style={{
                            width: `${particle.width}px`,
                            height: `${particle.height}px`,
                            left: `${particle.left}%`,
                            bottom: `-20px`,
                            borderRadius: `50% 50% 50% 50% / 60% 60% 40% 40%`,
                            backgroundColor: 'rgba(255, 140, 0, 0.8)',
                            boxShadow: '0 0 8px rgba(255, 140, 0, 0.6), 0 0 16px rgba(255, 69, 0, 0.4)',
                        }}
                        animate={{
                            y: ['0vh', '-120vh'],
                            x: [0, particle.x1, particle.x2],
                            opacity: [0, 0.9, 0.7, 0.4, 0],
                            scale: [0.3, 1.2, 0.8, 0.3],
                            rotate: [0, particle.rotate],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeOut",
                        }}
                    />
                ))}
                {/* Fire embers rising */}
                {fireEmberParticles.map((particle, i) => (
                    <motion.div
                        key={`fire-ember-${i}`}
                        className="absolute rounded-full shadow-md"
                        style={{
                            width: `${particle.width}px`,
                            height: `${particle.height}px`,
                            left: `${particle.left}%`,
                            bottom: `-15px`,
                            borderRadius: `${particle.borderRadius}%`,
                            backgroundColor: 'rgba(255, 69, 0, 0.7)',
                            boxShadow: '0 0 6px rgba(255, 69, 0, 0.5)',
                        }}
                        animate={{
                            y: ['0vh', '-110vh'],
                            x: [0, particle.x1, particle.x2],
                            opacity: [0, 0.8, 0.6, 0.2, 0],
                            scale: [0.2, 1.3, 0.9, 0.2],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeOut",
                        }}
                    />
                ))}

                {/* ASH PARTICLES - Falling from top */}
                {/* Battlefield ash falling down */}
                {ashParticles.map((particle, i) => (
                    <motion.div
                        key={`ash-${i}`}
                        className="absolute rounded-full shadow-md"
                        style={{
                            width: `${particle.width}px`,
                            height: `${particle.height}px`,
                            left: `${particle.left}%`,
                            top: `-15px`,
                            borderRadius: `${particle.borderRadius}%`,
                            backgroundColor: 'rgba(245, 245, 220, 0.6)',
                            boxShadow: '0 0 3px rgba(139, 69, 19, 0.4)',
                        }}
                        animate={{
                            y: ['0vh', '108vh'],
                            x: [0, particle.x],
                            opacity: [0, 0.8, 0.6, 0.2, 0],
                            scale: [0.2, 1.3, 0.9, 0.2],
                            rotate: [0, particle.rotate],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "linear",
                        }}
                    />
                ))}
                {/* Dark debris falling */}
                {debrisParticles.map((particle, i) => (
                    <motion.div
                        key={`falling-debris-${i}`}
                        className="absolute rounded-full shadow-lg"
                        style={{
                            width: `${particle.width}px`,
                            height: `${particle.height}px`,
                            left: `${particle.left}%`,
                            top: `-20px`,
                            borderRadius: `${particle.borderRadius}%`,
                            backgroundColor: 'rgba(139, 69, 19, 0.7)',
                            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
                        }}
                        animate={{
                            y: ['0vh', '110vh'],
                            x: [0, particle.x],
                            opacity: [0, 0.7, 0.5, 0.2, 0],
                            scale: [0.2, 1.2, 0.8, 0.2],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Burning Battlefield Background - Using client color palette */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-70">
                {/* Battlefield fire and smoke layers */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 600px 300px at 20% 80%, rgba(139, 69, 19, 0.4) 0%, rgba(160, 82, 45, 0.2) 40%, transparent 80%),
                            radial-gradient(ellipse 500px 250px at 80% 70%, rgba(178, 34, 34, 0.5) 0%, rgba(139, 69, 19, 0.3) 50%, transparent 90%),
                            radial-gradient(ellipse 400px 200px at 40% 20%, rgba(255, 140, 0, 0.3) 0%, rgba(255, 69, 0, 0.2) 60%, transparent 100%),
                            radial-gradient(ellipse 700px 350px at 70% 90%, rgba(139, 69, 19, 0.6) 0%, rgba(160, 82, 45, 0.4) 30%, transparent 70%)
                        `
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear',
                    }}
                />
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 450px 200px at 60% 30%, rgba(255, 140, 0, 0.4) 0%, rgba(255, 69, 0, 0.2) 50%, transparent 80%),
                            radial-gradient(ellipse 350px 180px at 30% 60%, rgba(178, 34, 34, 0.3) 0%, rgba(139, 69, 19, 0.2) 60%, transparent 100%)
                        `
                    }}
                    animate={{
                        backgroundPosition: ['100% 0%', '0% 100%'],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear',
                    }}
                />
                {/* Animated smoke and fire wisps */}
                <div
                    className="absolute inset-0 opacity-80"
                    style={{
                        background: `
                            radial-gradient(ellipse 500px 250px at 25% 40%, rgba(105, 105, 105, 0.6) 0%, rgba(169, 169, 169, 0.3) 40%, transparent 80%),
                            radial-gradient(ellipse 400px 200px at 75% 60%, rgba(139, 69, 19, 0.5) 0%, rgba(160, 82, 45, 0.2) 50%, transparent 90%),
                            radial-gradient(ellipse 350px 180px at 50% 80%, rgba(255, 140, 0, 0.4) 0%, rgba(255, 69, 0, 0.2) 60%, transparent 100%)
                        `,
                        animation: 'battlefield-drift 30s ease-in-out infinite',
                    }}
                />
            </div>

            {/* Enhanced battlefield smoke */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
                <motion.div
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] opacity-70"
                    style={{ filter: 'sepia(30%) saturate(150%) hue-rotate(15deg)' }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 0%'],
                    }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
                <motion.div
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] opacity-60"
                    style={{ filter: 'sepia(50%) saturate(200%) hue-rotate(30deg)' }}
                    animate={{
                        backgroundPosition: ['100% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>

            {/* Burning Battlefield Effects - Using client color palette */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Battlefield fires using client colors - Classes removed to prevent oklch conflicts */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(255, 140, 0, 0.2)' }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(178, 34, 34, 0.25)' }} />
                <div className="absolute top-[15%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[80px]" style={{ backgroundColor: 'rgba(255, 69, 0, 0.18)' }} />
                <div className="absolute bottom-[15%] left-[-5%] w-[45%] h-[45%] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(139, 69, 19, 0.22)' }} />
                <div className="absolute w-[35%] h-[35%] rounded-full blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: 'rgba(178, 34, 34, 0.18)' }} />

                {/* Additional battlefield fire sources */}
                <div className="absolute top-[30%] left-[20%] w-[25%] h-[25%] rounded-full blur-[70px]" style={{ backgroundColor: 'rgba(255, 140, 0, 0.15)' }} />
                <div className="absolute bottom-[30%] right-[20%] w-[30%] h-[30%] rounded-full blur-[90px]" style={{ backgroundColor: 'rgba(160, 82, 45, 0.16)' }} />

                {/* Battlefield smoke atmosphere using client grays and browns */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 via-gray-700/12 to-gray-600/25" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700/8 via-gray-600/15 to-gray-700/8" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/8 via-transparent to-orange-900/6" style={{
                    background: 'linear-gradient(to top, rgba(139, 69, 19, 0.08) 0%, transparent 50%, rgba(255, 140, 0, 0.06) 100%)'
                }} />

                {/* Battlefield texture */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNnY2SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEgMWgxdjFIMXoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L3N2Zz4=')] opacity-40" />

                {/* Animated battlefield heat shimmer */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to top, rgba(255, 140, 0, 0.04) 0%, rgba(178, 34, 34, 0.06) 50%, rgba(255, 69, 0, 0.04) 100%)'
                    }}
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            <AnimatePresence mode="wait">
                {/* SECTION 1: MAIN PRIZES */}
                <motion.section
                    key={`section-${currentSection}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute inset-0 flex flex-col items-center justify-center z-10 font-cinzel ${currentSection === 0 ? 'block' : 'hidden'}`}
                >
                    <div className="container mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-8 md:py-12 flex flex-col items-center justify-center h-full">
                        {/* HEADLINE */}
                        <motion.h1
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 md:mb-10 lg:mb-12 xl:mb-16 text-center tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] xl:tracking-[0.3em] text-[#e8dab2] drop-shadow-[0_0_20px_rgba(232,218,178,0.4)] mt-4 sm:mt-6 md:mt-12 lg:mt-8"
                        >
                            PRIZES
                        </motion.h1>

                        {/* MAIN PRIZES CAROUSEL */}
                        <div className="relative w-full max-w-7xl h-[380px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] flex items-center justify-center">
                            {/* Navigation Buttons */}
                            {/* Navigation Buttons */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-[-10px] sm:left-[-20px] md:left-2 lg:left-4 xl:left-[-60px] 2xl:left-[-100px] top-1/2 z-30 p-2 sm:p-3 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none opacity-80 hover:opacity-100"
                                aria-label="Previous prize"
                            >
                                <img src={arrowLeft} alt="" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-[-10px] sm:right-[-20px] md:right-2 lg:right-4 xl:right-[-60px] 2xl:right-[-100px] top-1/2 z-30 p-2 sm:p-3 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none opacity-80 hover:opacity-100"
                                aria-label="Next prize"
                            >
                                <img src={arrowRight} alt="" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                            </button>

                            {/* Cards Container */}
                            <div className="relative w-full h-full flex items-center justify-center px-2 sm:px-4 md:px-8 lg:px-12">
                                {/* Left Card (Previous) - Symmetrical positioning */}
                                <motion.div
                                    key={`prev-${prevIndex}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.25, x: 0, scale: 0.6 }}
                                    className="absolute left-[2%] sm:left-[4%] md:left-[6%] lg:left-[8%] xl:left-[10%] blur-[1px] z-10 cursor-pointer hidden md:block"
                                    onClick={handlePrev}
                                >
                                    <div
                                        className="w-[140px] h-[210px] sm:w-[160px] sm:h-[240px] md:w-[180px] md:h-[270px] lg:w-[200px] lg:h-[300px] xl:w-[220px] xl:h-[330px] 2xl:w-[260px] 2xl:h-[390px] rounded-xl overflow-hidden bg-cover bg-center border border-neutral-700/50"
                                        style={{ backgroundImage: `url(${mainPrizes[prevIndex].image})` }}
                                    />
                                </motion.div>

                                {/* Active Card (Center) */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`active-${activeIndex}`}
                                        initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
                                        animate={{ scale: 1, opacity: 1, x: 0, rotateY: 0 }}
                                        exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="z-20 relative group cursor-pointer"
                                        style={{ transformStyle: 'preserve-3d' }}
                                        whileHover={{ scale: 1.05, y: -10 }}
                                        onMouseEnter={() => setIsPaused(true)}
                                        onMouseLeave={() => setIsPaused(false)}
                                    >
                                        <div
                                            className="w-[220px] h-[330px] sm:w-[260px] sm:h-[390px] md:w-[280px] md:h-[420px] lg:w-[320px] lg:h-[480px] xl:w-[360px] xl:h-[540px] rounded-xl overflow-hidden bg-cover bg-center border-[3px] transition-all duration-500 group-hover:brightness-110"
                                            style={{
                                                backgroundImage: `url(${activePrize.image})`,
                                                boxShadow: `0 0 40px ${activePrize.color}50, 0 20px 60px rgba(0,0,0,0.5)`,
                                                borderColor: activePrize.color
                                            }}
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Right Card (Next) - Symmetrical positioning */}
                                <motion.div
                                    key={`next-${nextIndex}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.25, x: 0, scale: 0.6 }}
                                    className="absolute right-[1%] sm:right-[1%] md:right-[1%] lg:right-[1%] xl:right-[1%] blur-[1px] z-10 cursor-pointer hidden md:block"
                                    onClick={handleNext}
                                >
                                    <div
                                        className="w-[140px] h-[210px] sm:w-[160px] sm:h-[240px] md:w-[180px] md:h-[270px] lg:w-[200px] lg:h-[300px] xl:w-[220px] xl:h-[330px] 2xl:w-[260px] 2xl:h-[390px] rounded-xl overflow-hidden bg-cover bg-center border border-neutral-700/50"
                                        style={{ backgroundImage: `url(${mainPrizes[nextIndex].image})` }}
                                    />
                                </motion.div>

                                {/* INFO TEXT (Right Side on Desktop) */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`text-${activeIndex}`}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="hidden xl:flex absolute right-[5%] 2xl:right-[8%] flex-col items-start text-left w-[280px] 2xl:w-[320px] z-20"
                                    >
                                        <h2 className="text-2xl xl:text-3xl 2xl:text-4xl tracking-[0.2em] xl:tracking-[0.25em] 2xl:tracking-[0.3em] mb-2 xl:mb-3" style={{ color: activePrize.color }}>
                                            {activePrize.title}
                                        </h2>
                                        <h3 className="text-4xl xl:text-5xl 2xl:text-6xl font-medieval text-white mb-2 xl:mb-3 leading-tight">
                                            {activePrize.god}
                                        </h3>
                                        <p className="text-base xl:text-lg 2xl:text-xl italic text-neutral-400 font-baskerville mb-4 xl:mb-6 pb-3 xl:pb-4 w-full">
                                            {activePrize.role}
                                        </p>
                                        <div className="text-5xl xl:text-6xl 2xl:text-7xl font-bold font-baskerville tracking-tighter" style={{
                                            color: activePrize.color,
                                            textShadow: `0 0 35px ${activePrize.color}60`
                                        }}>
                                            {activePrize.amount}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Mobile/Tablet Text Below Cards */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`mobile-text-${activeIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="xl:hidden text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-col items-center px-4"
                            >
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] mb-1 sm:mb-2 font-bold" style={{ color: activePrize.color }}>
                                    {activePrize.title}
                                </h2>
                                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medieval text-white mb-1 sm:mb-2 leading-tight drop-shadow-md">
                                    {activePrize.god}
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl italic text-neutral-400 font-baskerville mb-3 sm:mb-4">
                                    {activePrize.role}
                                </p>
                                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-baskerville tracking-tighter" style={{
                                    color: activePrize.color,
                                    textShadow: `0 0 30px ${activePrize.color}50`
                                }}>
                                    {activePrize.amount}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.section>
            </AnimatePresence>

            {/* SECTION 2: DOMAIN PRIZES */}
            <motion.section
                key={`section-${currentSection}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`absolute inset-0 flex flex-col items-center justify-center z-20 font-cinzel ${currentSection === 1 ? 'block' : 'hidden'}`}
            >
                <div className="container mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-12 lg:py-16 h-full flex flex-col justify-center items-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[#e8dab2] text-center mb-8 drop-shadow-[0_0_15px_rgba(232,218,178,0.3)]"
                    >
                        DOMAIN PRIZES
                    </motion.h2>

                    {/* DOMAIN PRIZES CAROUSEL */}
                    <div className="relative w-full max-w-7xl h-[380px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] flex items-center justify-center">
                        {/* Navigation Buttons */}
                        <button
                            onClick={handleDomainPrev}
                            className="absolute left-[-10px] sm:left-[-20px] md:left-2 lg:left-4 xl:left-[-60px] 2xl:left-[-100px] top-1/2 z-30 p-2 sm:p-3 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none opacity-80 hover:opacity-100"
                            aria-label="Previous domain prize"
                        >
                            <img src={arrowLeft} alt="" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                        </button>
                        <button
                            onClick={handleDomainNext}
                            className="absolute right-[-10px] sm:right-[-20px] md:right-2 lg:right-4 xl:right-[-60px] 2xl:right-[-100px] top-1/2 z-30 p-2 sm:p-3 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none opacity-80 hover:opacity-100"
                            aria-label="Next domain prize"
                        >
                            <img src={arrowRight} alt="" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                        </button>

                        {/* Cards Container */}
                        <div className="relative w-full h-full flex items-center justify-center px-2 sm:px-4 md:px-8 lg:px-12">
                            {/* Left Card (Previous) */}
                            <motion.div
                                key={`domain-prev-${domainPrevIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.25, x: 0, scale: 0.6 }}
                                className="absolute left-[2%] sm:left-[4%] md:left-[6%] lg:left-[8%] xl:left-[10%] blur-[1px] z-10 cursor-pointer hidden md:block"
                                onClick={handleDomainPrev}
                            >
                                <div className="relative w-[180px] h-[260px] sm:w-[220px] sm:h-[300px] lg:w-[260px] lg:h-[360px] rounded-xl overflow-hidden border border-[#d4af37]/40" style={{ backgroundColor: '#171717' }}>
                                    <div className="absolute inset-0 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${domainPrizes[domainPrevIndex].img})` }} />
                                    <div className="absolute inset-0 bg-black/60" />
                                </div>
                            </motion.div>

                            {/* Active Card (Center) */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`domain-active-${domainActiveIndex}`}
                                    initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
                                    animate={{ scale: 1, opacity: 1, x: 0, rotateY: 0 }}
                                    exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="z-20 relative group cursor-pointer"
                                    style={{ transformStyle: 'preserve-3d' }}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[440px] lg:w-[400px] lg:h-[480px] rounded-xl overflow-hidden border border-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500" style={{ backgroundColor: '#171717', boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)' }}>
                                        {/* Image */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-110"
                                            style={{ backgroundImage: `url(${activeDomainPrize.img})` }}
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                                        {/* Corner Accents */}
                                        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] opacity-80" />
                                        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] opacity-80" />
                                        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] opacity-80" />
                                        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] opacity-80" />

                                        {/* Text Content */}
                                        <div className="absolute bottom-0 left-0 w-full text-center px-4 pb-8 transform group-hover:translate-y-[-8px] transition-transform duration-500">
                                            <h4 className="text-3xl sm:text-4xl text-[#d4af37] font-bold mb-3 font-medieval tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                                {activeDomainPrize.title}
                                            </h4>
                                            <div className="inline-block">
                                                <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-neutral-300 border-t border-[#d4af37]/40 pt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                                                    {activeDomainPrize.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Right Card (Next) */}
                            <motion.div
                                key={`domain-next-${domainNextIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.25, x: 0, scale: 0.6 }}
                                className="absolute right-[1%] sm:right-[1%] md:right-[1%] lg:right-[1%] xl:right-[1%] blur-[1px] z-10 cursor-pointer hidden md:block"
                                onClick={handleDomainNext}
                            >
                                <div className="relative w-[180px] h-[260px] sm:w-[220px] sm:h-[300px] lg:w-[260px] lg:h-[360px] rounded-xl overflow-hidden border border-[#d4af37]/40" style={{ backgroundColor: '#171717' }}>
                                    <div className="absolute inset-0 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${domainPrizes[domainNextIndex].img})` }} />
                                    <div className="absolute inset-0 bg-black/60" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}