import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import bgThemes from '../assets/themes/bg-themes.jpg';
import scrollOpen from '../assets/themes/scroll-open.png';
import scrollRolled from '../assets/themes/scroll-rolled.png';

// Reusing arrows from prizes if available, or imports
import arrowLeft from '../assets/prizes/arrow-left.png';
import arrowRight from '../assets/prizes/arrow-right.png';
import { PageNavigation } from '../components/navigation/PageNavigation';


const themesData = [
  {
    id: 1,
    title: "FinTech",
    description: "Revolutionizing finance with blockchain and AI.",
    content: [
      "Digital Banking Solutions",
      "Cryptocurrency & Blockchain",
      "AI-Powered Financial Analytics",
      "Robo-Advisory Platforms",
      "Payment Gateway Innovations",
      "RegTech & Compliance",
      "InsurTech Solutions",
      "Peer-to-Peer Lending"
    ]
  },
  {
    id: 2,
    title: "HealthTech",
    description: "Innovating healthcare for a better tomorrow.",
    content: [
      "Telemedicine Platforms",
      "AI Diagnostics & Imaging",
      "Electronic Health Records",
      "Wearable Health Monitoring",
      "Mental Health Applications",
      "Drug Discovery & Research",
      "Surgical Robotics",
      "Personalized Medicine"
    ]
  },
  {
    id: 3,
    title: "EdTech",
    description: "Transforming education through technology.",
    content: [
      "Virtual Learning Environments",
      "AI-Powered Tutoring Systems",
      "Gamified Learning Platforms",
      "Skill Assessment Tools",
      "Language Learning Apps",
      "STEM Education Solutions",
      "Accessibility in Education",
      "Micro-Learning Platforms"
    ]
  },
  {
    id: 4,
    title: "Open Innovation",
    description: "Solving real-world problems with creative solutions.",
    content: [
      "Smart City Solutions",
      "Environmental Monitoring",
      "Disaster Management Systems",
      "Agricultural Technology",
      "Transportation Innovation",
      "Energy Management",
      "Social Impact Applications",
      "Community Engagement Tools"
    ]
  },
  {
    id: 5,
    title: "Web3",
    description: "Building the decentralized future.",
    content: [
      "Decentralized Applications (DApps)",
      "NFT Marketplaces",
      "DeFi Protocols",
      "Blockchain Infrastructure",
      "Smart Contract Development",
      "Metaverse Platforms",
      "DAO Governance Systems",
      "Cross-Chain Solutions"
    ]
  }
];

export function Themes() {
  const [activeIndex, setActiveIndex] = useState(2); // Start in the middle
  const [scale, setScale] = useState(1);

  // Calculate scale based on viewport width - keeps desktop layout on all devices
  useEffect(() => {
    const calculateScale = () => {
      // Use 550px as base width instead of 700px
      // This increases the scale/zoom on mobile devices
      const baseWidth = 550;
      const viewportWidth = window.innerWidth;

      // On mobile, use full width (no padding) for max size
      // On desktop, keep some breathing room
      const availableWidth = viewportWidth < 768 ? viewportWidth : viewportWidth - 40;

      const newScale = Math.min(1, availableWidth / baseWidth);
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % themesData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + themesData.length) % themesData.length);
  };

  // Helper to determine visual position index
  const getPosition = (index: number) => {
    const diff = (index - activeIndex + themesData.length) % themesData.length;
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    if (diff === 2) return 2;
    if (diff === themesData.length - 1) return -1;
    if (diff === themesData.length - 2) return -2;
    return 100; // Hidden
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-cinzel text-[#e8dab2]">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center z-0 contrast-125 brightness-50"
        style={{ backgroundImage: `url(${bgThemes})` }}
      />

      {/* Mystical Overlay with Animated Particles */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Floating Mystical Particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full opacity-60"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              boxShadow: '0 0 6px #d4af37, 0 0 12px #d4af37',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">

        {/* Enhanced Header with Glow */}
        <motion.h1
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-5xl mb-16 text-center tracking-[0.2em] font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          style={{
            background: 'linear-gradient(to bottom, #fff8e7 0%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4)',
            filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))'
          }}
        >
          THEMES
        </motion.h1>

        {/* Enhanced Carousel - Fixed size container that scales */}
        <div
          className="relative flex items-center justify-center perspective-[1000px]"
          style={{
            width: '1200px',
            height: '700px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >

          {/* Enhanced Navigation Arrows with Glow */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.2, filter: 'drop-shadow(0 0 15px #d4af37)' }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-[320px] md:left-20 z-50 p-2 transition-all duration-300 cursor-pointer"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))'
            }}
          >
            <img src={arrowLeft} alt="Prev" className="w-10 sm:w-16 md:w-24" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.2, filter: 'drop-shadow(0 0 15px #d4af37)' }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-[320px] md:right-20 z-50 p-2 transition-all duration-300 cursor-pointer"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))'
            }}
          >
            <img src={arrowRight} alt="Next" className="w-10 sm:w-16 md:w-24" />
          </motion.button>

          {/* Scroll Items with Enhanced Effects */}
          <div
            className="relative w-full max-w-7xl h-full flex items-center justify-center"
            style={{
              transformStyle: 'flat',
              perspective: '1000px',
            }}
          >
            {themesData.map((theme, i) => {
              const position = getPosition(i);
              if (Math.abs(position) > 2 && position !== 100) return null;

              const isCenter = position === 0;
              const isOuter = Math.abs(position) === 2;

              const xOffset = isCenter ? 0 : position * 280;
              const scale = isCenter ? 1.0 : isOuter ? 0.6 : 0.8;
              const zIndex = isCenter ? 30 : isOuter ? 10 : 20;
              const rotateY = isCenter ? 0 : position > 0 ? -15 : 15;

              return (
                <motion.div
                  key={theme.id}
                  initial={false}
                  animate={{
                    x: xOffset,
                    scale: scale,
                    zIndex: zIndex,
                    rotateY: rotateY,
                    opacity: 1,
                    width: isCenter ? 1000 : 180,
                    filter: isCenter ? 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.6))' : 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))'
                  }}
                  transition={{
                    x: isOuter ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 20 },
                    scale: isOuter ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 20 },
                    rotateY: { duration: 0 },
                    opacity: { duration: 0 },
                    width: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                    filter: { duration: 0.5 },
                    zIndex: { duration: 0 }
                  }}
                  className="absolute flex items-center justify-center"
                  style={{
                    height: '700px',
                    perspective: '1000px',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* ROLLED SCROLL with Glow */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-0"
                    style={{ opacity: isCenter ? 0 : 1, backfaceVisibility: 'hidden' }}
                    animate={{
                      filter: !isCenter ? 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))' : 'none'
                    }}
                  >
                    <img
                      src={scrollRolled}
                      alt="Rolled Scroll"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>

                  {/* OPEN SCROLL COMPOSITION with Enhanced Effects */}
                  <div
                    className="absolute inset-0 w-full h-full transition-opacity duration-0"
                    style={{ opacity: isCenter ? 1 : 0, backfaceVisibility: 'hidden' }}
                  >
                    {(isCenter || Math.abs(position) <= 1) && (
                      <div className="relative w-full h-full flex items-center justify-center">

                        {/* Enhanced Left Handle with Mystical Glow */}
                        <motion.div
                          animate={{
                            left: isCenter ? '0px' : 'calc(50% - 50px)',
                            rotateY: isCenter ? -360 : 0
                          }}
                          transition={{ left: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }, rotateY: { duration: 0 } }}
                          className="absolute top-0 bottom-0 w-[100px] z-20 overflow-hidden"
                          style={{
                            transformStyle: 'preserve-3d',
                            filter: isCenter ? 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.8))' : 'none'
                          }}
                        >
                          <img
                            src={scrollOpen}
                            className="absolute top-0 left-0 w-[1000px] max-w-none h-full object-contain object-left"
                            alt=""
                          />
                        </motion.div>

                        {/* Enhanced Right Handle */}
                        <motion.div
                          animate={{
                            right: isCenter ? '0px' : 'calc(50% - 50px)',
                            rotateY: isCenter ? 360 : 0
                          }}
                          transition={{ right: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }, rotateY: { duration: 0 } }}
                          className="absolute top-0 bottom-0 w-[100px] z-20 overflow-hidden"
                          style={{
                            transformStyle: 'preserve-3d',
                            filter: isCenter ? 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.8))' : 'none'
                          }}
                        >
                          <img
                            src={scrollOpen}
                            className="absolute top-0 right-0 w-[1000px] max-w-none h-full object-contain object-right"
                            alt=""
                          />
                        </motion.div>

                        {/* Enhanced Middle Body with Scrollable Content */}
                        <motion.div
                          animate={{
                            width: isCenter ? 'calc(100% - 200px)' : '0px',
                            left: isCenter ? '100px' : '50%'
                          }}
                          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute top-0 bottom-0 z-10 overflow-hidden"
                        >
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full">
                            <img
                              src={scrollOpen}
                              className="w-full h-full object-contain"
                              alt=""
                              style={{ clipPath: 'inset(0 10% 0 10%)' }}
                            />
                          </div>

                          {/* Enhanced Content Overlay with Scrollable Section */}
                          <motion.div
                            animate={{ opacity: isCenter ? 1 : 0, scale: isCenter ? 1 : 0.9 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="absolute inset-0 flex flex-col items-center text-neutral-900 p-12 md:p-16"
                            style={{ paddingTop: '160px' }}
                          >
                            {/* Title positioned in upper scroll area */}
                            <motion.h3
                              className="text-2xl md:text-4xl font-bold text-[#5c3a21] uppercase tracking-wider text-center mb-1"
                              style={{
                                textShadow: '0 0 10px rgba(92, 58, 33, 0.5), 0 2px 4px rgba(0,0,0,0.3)',
                                marginTop: '0'
                              }}
                              animate={{
                                textShadow: isCenter ? '0 0 15px rgba(92, 58, 33, 0.8), 0 2px 4px rgba(0,0,0,0.5)' : '0 0 5px rgba(92, 58, 33, 0.3)'
                              }}
                            >
                              {theme.title}
                            </motion.h3>

                            {/* Description positioned below title */}
                            <motion.p
                              className="text-base md:text-lg font-serif text-[#3e2715] italic leading-tight text-center mb-2 max-w-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isCenter ? 1 : 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              {theme.description}
                            </motion.p>

                            {/* Transparent Scrollable Content Section */}
                            <AnimatePresence>
                              {isCenter && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ delay: 0.8, duration: 0.6 }}
                                  className="w-full max-w-lg h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-transparent flex-1"
                                  style={{
                                    background: 'transparent',
                                    border: '2px solid rgba(212, 175, 55, 0.4)',
                                    borderRadius: '12px',
                                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.15), inset 0 0 20px rgba(255, 248, 231, 0.1)',
                                    maxHeight: '280px'
                                  }}
                                >
                                  <div className="p-6">
                                    <h4 className="text-xl font-bold text-[#5c3a21] mb-4 text-center border-b-2 border-amber-600 pb-3"
                                      style={{
                                        textShadow: '0 0 8px rgba(92, 58, 33, 0.6)'
                                      }}>
                                      Focus Areas
                                    </h4>
                                    <ul className="space-y-3">
                                      {theme.content.map((item, idx) => (
                                        <motion.li
                                          key={idx}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 1 + idx * 0.1 }}
                                          className="text-sm md:text-base text-[#3e2715] flex items-center hover:text-[#5c3a21] transition-colors duration-200 font-medium"
                                          style={{
                                            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
                                          }}
                                        >
                                          <span
                                            className="w-2 h-2 rounded-full mr-4 flex-shrink-0"
                                            style={{
                                              background: 'radial-gradient(circle, #d4af37 0%, #b8860b 100%)',
                                              boxShadow: '0 0 6px rgba(212, 175, 55, 0.8)'
                                            }}
                                          ></span>
                                          {item}
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </motion.div>

                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
      <PageNavigation />
    </div >
  );
}
