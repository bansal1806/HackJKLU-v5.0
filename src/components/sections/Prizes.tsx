
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
    { title: "Spartan", desc: "Best Beginner", img: domainSpartan },
    { title: "Warrior", desc: "Best UI/UX", img: domainSpartan },
    { title: "Centurion", desc: "Best AI/ML", img: domainSpartan },
    { title: "Gladiator", desc: "Best Web3", img: domainSpartan }
];

export default function Prizes() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const prevIndex = (activeIndex - 1 + mainPrizes.length) % mainPrizes.length;
    const nextIndex = (activeIndex + 1) % mainPrizes.length;
    const activePrize = mainPrizes[activeIndex];

    const sections = [
        { id: 0, name: 'main-prizes' },
        { id: 1, name: 'domain-prizes' }
    ];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % mainPrizes.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + mainPrizes.length) % mainPrizes.length);
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

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [currentSection, isAnimating]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div ref={containerRef} className="relative bg-neutral-950 text-neutral-100 h-screen overflow-hidden selection:bg-yellow-900 selection:text-white">
            {/* Hide Scrollbar */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
                * {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                *::-webkit-scrollbar {
                    display: none;
                }
                body {
                    font-family: 'Cinzel', serif;
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
            `}</style>

            {/* Animated Cloud Background */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                <div
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fog.png')]"
                    style={{
                        animation: 'animate-clouds 40s linear infinite'
                    }}
                />
            </div>

            {/* Background Effects - Fixed */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNnY2SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEgMWgxdjFIMXoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L3N2Zz4=')] opacity-20" />
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
                <div className="container mx-auto px-4 py-12 flex flex-col items-center">
                    {/* HEADLINE */}
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl mb-16 md:mb-24 text-center tracking-[0.3em] text-[#e8dab2] drop-shadow-[0_0_20px_rgba(232,218,178,0.4)]"
                    >
                        PRIZES
                    </motion.h1>

                    {/* MAIN PRIZES CAROUSEL */}
                    <div className="relative w-full max-w-7xl h-[500px] md:h-[600px] flex items-center justify-center">
                        {/* Navigation Buttons */}
                        <button 
                            onClick={handlePrev} 
                            className="absolute left-2 md:left-[-80px] lg:left-[-120px] top-1/2 z-30 p-2 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none"
                            aria-label="Previous prize"
                        >
                            <img src={arrowLeft} alt="" className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                        </button>
                        <button 
                            onClick={handleNext} 
                            className="absolute right-2 md:right-[-80px] lg:right-[-120px] top-1/2 z-30 p-2 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none"
                            aria-label="Next prize"
                        >
                            <img src={arrowRight} alt="" className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                        </button>

                        {/* Cards Container */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Left Card (Previous) */}
                            <motion.div
                                key={`prev-${prevIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.25, x: -120, scale: 0.7 }}
                                className="absolute left-[5%] md:left-[8%] blur-[1px] z-10 cursor-pointer hidden md:block"
                                onClick={handlePrev}
                            >
                                <div
                                    className="w-[220px] h-[350px] md:w-[260px] md:h-[400px] rounded-xl overflow-hidden bg-cover bg-center border border-neutral-700/50"
                                    style={{ backgroundImage: `url(${mainPrizes[prevIndex].image})` }}
                                />
                            </motion.div>

                            {/* Active Card (Center) */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`active-${activeIndex}`}
                                    initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
                                    animate={{ scale: 1.1, opacity: 1, x: 0, rotateY: 0 }}
                                    exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="z-20 relative"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div
                                        className="w-[280px] h-[420px] md:w-[320px] md:h-[480px] rounded-xl overflow-hidden bg-cover bg-center border-[3px]"
                                        style={{
                                            backgroundImage: `url(${activePrize.image})`,
                                            boxShadow: `0 0 40px ${activePrize.color}50, 0 20px 60px rgba(0,0,0,0.5)`,
                                            borderColor: activePrize.color
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Right Card (Next) */}
                            <motion.div
                                key={`next-${nextIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.25, x: 120, scale: 0.7 }}
                                className="absolute right-[5%] md:right-[8%] blur-[1px] z-10 cursor-pointer hidden md:block"
                                onClick={handleNext}
                            >
                                <div
                                    className="w-[220px] h-[350px] md:w-[260px] md:h-[400px] rounded-xl overflow-hidden bg-cover bg-center border border-neutral-700/50"
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
                                    className="hidden lg:flex absolute right-[5%] flex-col items-start text-left w-[380px] z-20"
                                >
                                    <h2 className="text-3xl lg:text-4xl tracking-[0.3em] mb-3" style={{ color: activePrize.color }}>
                                        {activePrize.title}
                                    </h2>
                                    <h3 className="text-5xl lg:text-6xl font-medieval text-white mb-3 leading-tight">
                                        {activePrize.god}
                                    </h3>
                                    <p className="text-lg lg:text-xl italic text-neutral-400 font-baskerville mb-6 border-b border-neutral-700 pb-4 w-full">
                                        {activePrize.role}
                                    </p>
                                    <div className="text-7xl lg:text-8xl font-bold font-baskerville tracking-tighter" style={{
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
                            className="lg:hidden text-center mt-12 flex flex-col items-center"
                        >
                            <h2 className="text-3xl md:text-4xl tracking-[0.3em] mb-3" style={{ color: activePrize.color }}>
                                {activePrize.title}
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-medieval text-white mb-2">
                                {activePrize.god}
                            </h3>
                            <p className="text-base md:text-lg italic text-neutral-400 font-baskerville mb-4">
                                {activePrize.role}
                            </p>
                            <div className="text-6xl md:text-7xl font-bold font-baskerville tracking-tighter" style={{
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
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl lg:text-6xl tracking-[0.25em] text-[#e8dab2] text-center mb-16 md:mb-20 drop-shadow-[0_0_15px_rgba(232,218,178,0.3)]"
                    >
                        DOMAIN PRIZES
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {domainPrizes.map((domain, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="relative w-full aspect-[3/4.5] rounded-xl overflow-hidden border border-[#d4af37]/40 group bg-neutral-900 cursor-pointer"
                            >
                                {/* Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-110" 
                                    style={{ backgroundImage: `url(${domain.img})` }} 
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />

                                {/* Corner Accents */}
                                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] opacity-70 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] opacity-70 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] opacity-70 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] opacity-70 group-hover:opacity-100 transition-opacity" />

                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 w-full text-center px-4 pb-8 transform group-hover:translate-y-[-8px] transition-transform duration-500">
                                    <h4 className="text-2xl md:text-3xl text-[#d4af37] font-bold mb-3 font-medieval tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                        {domain.title}
                                    </h4>
                                    <div className="inline-block">
                                        <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-neutral-300 border-t border-[#d4af37]/40 pt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                                            {domain.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 border-2 border-[#d4af37] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" 
                                     style={{ boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.3)' }} 
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}