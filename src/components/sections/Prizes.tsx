
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Assets
import arrowLeft from '../../assets/prizes/arrow-left.png';
import arrowRight from '../../assets/prizes/arrow-right.png';
import zeusImg from '../../assets/prizes/zeus.jpg';
import poseidonImg from '../../assets/prizes/poseidon.jpg';
import hadesImg from '../../assets/prizes/hades.jpg';
import text50k from '../../assets/prizes/text-50k.png';
import text1stPrize from '../../assets/prizes/text-1st-prize.png';
import text2ndPrize from '../../assets/prizes/text-2nd-prize.png';
import text3rdPrize from '../../assets/prizes/text-3rd-prize.png';
import textZeusDetails from '../../assets/prizes/text-zeus-details.png';
import textPoseidonDetails from '../../assets/prizes/text-poseidon-details.png';
import textHadesDetails from '../../assets/prizes/text-hades-details.png';
import domainSpartan from '../../assets/prizes/domain-spartan.jpg';

import logoSmall from '../../assets/prizes/hack-logo.png';

const mainPrizes = [
    {
        rank: "2",
        title: "2ND PRIZE",
        textTitleImg: text2ndPrize,
        god: "Poseidon",
        role: "Ruler of the Seas",
        textGodDetailsImg: textPoseidonDetails,
        amount: "25K",
        color: "#cd7f32",
        border: "linear-gradient(to bottom right, #cd7f32, #8b4500)",
        image: hadesImg
    },
    {
        rank: "1",
        title: "1ST PRIZE",
        textTitleImg: text1stPrize, // Use image if available
        god: "Zeus",
        role: "Ruler of the Sky",
        textGodDetailsImg: textZeusDetails,
        amount: "50K",
        textAmountImg: text50k, // Use image if available
        color: "#FFD700",
        border: "linear-gradient(to bottom right, #FFD700, #B8860B)",
        image: zeusImg
    },
    {
        rank: "3",
        title: "3RD PRIZE",
        textTitleImg: text3rdPrize,
        god: "Hades",
        role: "Ruler of the Underworld",
        textGodDetailsImg: textHadesDetails,
        amount: "25K",
        color: "#C0C0C0",
        border: "linear-gradient(to bottom right, #a0a0a0, #e0e0e0)",
        image: poseidonImg
    }
];

const domainPrizes = [
    { title: "Spartan", desc: "Best Beginner", img: domainSpartan },
    { title: "Warrior", desc: "Best UI/UX", img: domainSpartan }, // Using same style for cohesion
    { title: "Centurion", desc: "Best AI/ML", img: domainSpartan },
    { title: "Gladiator", desc: "Best Web3", img: domainSpartan }
];

export function Prizes() {
    const [activeIndex, setActiveIndex] = useState(1); // Default to Zeus (Center)
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Fade out Main Prizes as we scroll down (0% to 20% of scroll)
    const opacityMain = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Scale down Main Prizes slightly for effect
    const scaleMain = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    // Fade in Domain Prizes as we approach them (15% to 35% of scroll)
    const opacityDomain = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
    const yDomain = useTransform(scrollYProgress, [0.15, 0.35], [100, 0]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % mainPrizes.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + mainPrizes.length) % mainPrizes.length);
    };

    const activePrize = mainPrizes[activeIndex];

    // Determine indices for "Prev" and "Next" visually
    // In a 3-item array, if active is 1: prev is 0, next is 2.
    // If active is 0: prev is 2, next is 1.
    const prevIndex = (activeIndex - 1 + mainPrizes.length) % mainPrizes.length;
    const nextIndex = (activeIndex + 1) % mainPrizes.length;


    return (
        <div ref={containerRef} className="min-h-[200vh] bg-neutral-950 text-neutral-100 font-cinzel overflow-x-hidden selection:bg-yellow-900 selection:text-white pb-32">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
            </div>

            {/* Logo Watermark */}
            <div className="absolute top-8 right-8 z-50">
                <img src={logoSmall} alt="HackJKLU" className="w-48 md:w-64 opacity-80" />
            </div>

            {/* MAIN PRIZES SECTION (Fixed/Sticky behavior or just top part) */}
            <motion.div
                style={{ opacity: opacityMain, scale: scaleMain }}
                className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center sticky top-0"
            >

                {/* HEADLINE */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl mb-24 text-center tracking-widest text-[#e8dab2] drop-shadow-[0_0_15px_rgba(232,218,178,0.3)]"
                >
                    PRIZES PAGE
                </motion.h1>

                {/* MAIN PRIZES LAYOUT - "Exact" Copy: Card Center, Text Right */}
                <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center mb-40">

                    {/* Navigation Buttons (Floating) */}
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 z-30 p-2 hover:scale-110 transition-transform">
                        <img src={arrowLeft} alt="Previous" className="w-20 md:w-24 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    </button>
                    <button onClick={handleNext} className="absolute right-4 top-1/2 z-30 p-2 hover:scale-110 transition-transform">
                        <img src={arrowRight} alt="Next" className="w-20 md:w-24 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    </button>

                    {/* Left Card (Dimmed) */}
                    <motion.div
                        key={`prev-${prevIndex}`}
                        className="absolute left-[5%] opacity-30 blur-[2px] scale-75 z-10 cursor-pointer hidden md:block"
                        animate={{ x: -50, scale: 0.75, opacity: 0.3 }}
                        onClick={handlePrev}
                    >
                        <div
                            className="w-[300px] h-[480px] rounded-xl overflow-hidden bg-cover bg-center border border-neutral-700"
                            style={{ backgroundImage: `url(${mainPrizes[prevIndex].image})` }}
                        />
                    </motion.div>

                    {/* Active Card (Center) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`active-${activeIndex}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1.15, opacity: 1, x: -190 }} // Shifted LEFT to center the (Card + Text) block
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="z-20 relative shadow-[0_0_50px_rgba(255,215,0,0.2)]"
                        >
                            <div
                                className="w-[300px] h-[480px] rounded-xl overflow-hidden bg-cover bg-center border-[3px] border-[#d4af37]"
                                style={{
                                    backgroundImage: `url(${activePrize.image})`,
                                    boxShadow: `0 0 30px ${activePrize.color}40`,
                                    borderColor: activePrize.color
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* INFO TEXT (Right Side) */}
                    <motion.div
                        key={`text-${activeIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute z-20 hidden lg:flex flex-col items-start text-left w-[360px]"
                        style={{ left: 'calc(50% - 20px)' }} // Positioned relative to center: CardRight is at -40px, so -20px gives 20px gap
                    >
                        {/* Title: Text Image or Fallback Text */}
                        {activePrize.textTitleImg ? (
                            <img src={activePrize.textTitleImg} alt={activePrize.title} className="h-16 mb-4 object-contain" />
                        ) : (
                            <h2 className="text-4xl tracking-widest mb-2" style={{ color: activePrize.color }}>
                                {activePrize.title}
                            </h2>
                        )}

                        {/* God Details: Image or Fallback Text */}
                        {activePrize.textGodDetailsImg ? (
                            <img src={activePrize.textGodDetailsImg} alt={activePrize.god} className="w-full max-w-[280px] mb-6 object-contain" />
                        ) : (
                            <>
                                <h3 className="text-6xl font-medieval text-white mb-2 leading-none">
                                    {activePrize.god}
                                </h3>
                                <p className="text-xl italic text-neutral-400 font-baskerville mb-6 border-b border-neutral-700 pb-4 w-full">
                                    {activePrize.role}
                                </p>
                            </>
                        )}

                        {/* Amount: Text Image or Fallback Text */}
                        {activePrize.textAmountImg ? (
                            <img src={activePrize.textAmountImg} alt={activePrize.amount} className="h-24 object-contain" />
                        ) : (
                            <div className="text-8xl font-bold font-baskerville tracking-tighter transform scale-y-110" style={{
                                color: activePrize.color,
                                textShadow: `0 0 30px ${activePrize.color}50`
                            }}>
                                {activePrize.amount}
                            </div>
                        )}
                    </motion.div>

                    {/* Right Card (Dimmed) */}
                    <motion.div
                        key={`next-${nextIndex}`}
                        className="absolute right-[5%] opacity-30 blur-[2px] scale-75 z-10 cursor-pointer hidden md:block"
                        animate={{ x: 50, scale: 0.75, opacity: 0.3 }}
                        onClick={handleNext}
                    >
                        <div
                            className="w-[300px] h-[480px] rounded-xl overflow-hidden bg-cover bg-center border border-neutral-700"
                            style={{ backgroundImage: `url(${mainPrizes[nextIndex].image})` }}
                        />
                    </motion.div>

                </div>

                {/* Mobile Text Fallback */}
                <div className="lg:hidden text-center mb-24 flex flex-col items-center">
                    {activePrize.textTitleImg ? (
                        <img src={activePrize.textTitleImg} alt={activePrize.title} className="h-12 mb-2 object-contain" />
                    ) : (
                        <h2 className="text-3xl tracking-widest mb-1" style={{ color: activePrize.color }}>
                            {activePrize.title}
                        </h2>
                    )}

                    {activePrize.textGodDetailsImg ? (
                        <img src={activePrize.textGodDetailsImg} alt={activePrize.god} className="w-full max-w-[250px] mb-2 object-contain" />
                    ) : (
                        <h3 className="text-4xl font-medieval text-white mb-1">
                            {activePrize.god}
                        </h3>
                    )}

                    {activePrize.textAmountImg ? (
                        <img src={activePrize.textAmountImg} alt={activePrize.amount} className="h-16 mt-2 object-contain" />
                    ) : (
                        <div className="text-5xl font-bold font-baskerville tracking-tighter transform scale-y-110" style={{ color: activePrize.color }}>
                            {activePrize.amount}
                        </div>
                    )}
                </div>

            </motion.div>


            {/* DOMAIN PRIZES SECTION (Comes in after) */}
            <motion.div
                style={{ opacity: opacityDomain, y: yDomain }}
                className="w-full max-w-7xl mx-auto container px-4 mb-40 mt-20"
            >
                <div className="flex flex-col items-center justify-center mb-16 gap-4">
                    <h2 className="text-3xl md:text-5xl tracking-[0.2em] text-[#e8dab2] px-4">DOMAIN PRIZES</h2>
                </div>

                <div className="relative px-4 md:px-12">
                    {/* Domain Arrows - Reusing the gold arrows but smaller */}
                    <button className="hidden md:block absolute left-[-2rem] top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
                        <img src={arrowLeft} alt="Prev" className="w-16 opacity-50 hover:opacity-100" />
                    </button>
                    <button className="hidden md:block absolute right-[-2rem] top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
                        <img src={arrowRight} alt="Next" className="w-16 opacity-50 hover:opacity-100" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {domainPrizes.map((domain, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.2)" }}
                                className="relative w-full aspect-[3/4.5] rounded-xl overflow-hidden border border-[#d4af37]/30 group bg-neutral-900"
                            >
                                <div className="absolute inset-0 bg-cover bg-center contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-500" style={{ backgroundImage: `url(${domain.img})` }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                                {/* Ornate Corner Accents (CSS) */}
                                {/* Top Left */}
                                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]" />
                                {/* Top Right */}
                                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]" />
                                {/* Bottom Left */}
                                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]" />
                                {/* Bottom Right */}
                                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]" />

                                <div className="absolute bottom-10 left-0 w-full text-center px-4">
                                    <h4 className="text-2xl text-[#d4af37] font-bold mb-2 font-medieval tracking-wide">{domain.title}</h4>
                                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 border-t border-[#d4af37]/30 pt-3 inline-block">{domain.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
