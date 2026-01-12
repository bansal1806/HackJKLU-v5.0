import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import arrowLeft from '../../assets/prizes/arrow-left.webp';
import arrowRight from '../../assets/prizes/arrow-right.webp';
import zeusImg from '../../assets/prizes/zeus.webp';
import poseidonImg from '../../assets/prizes/poseidon.webp';
import hadesImg from '../../assets/prizes/hades.webp';
import domainSpartan from '../../assets/prizes/domain-spartan.webp';
import bgImage from '../../assets/prizes/bg.webp';

const mainPrizes = [
  {
    rank: '1',
    title: '1ST PRIZE',
    god: 'Zeus',
    role: 'Ruler of the Sky',
    amount: '50K',
    color: '#FFD700',
    border: 'linear-gradient(to bottom right, #FFD700, #B8860B)',
    image: zeusImg,
  },
  {
    rank: '2',
    title: '2ND PRIZE',
    god: 'Poseidon',
    role: 'Ruler of the Seas',
    amount: '25K',
    color: '#C0C0C0',
    border: 'linear-gradient(to bottom right, #a0a0a0, #e0e0e0)',
    image: poseidonImg,
  },
  {
    rank: '3',
    title: '3RD PRIZE',
    god: 'Hades',
    role: 'Ruler of the Underworld',
    amount: '15K',
    color: '#cd7f32',
    border: 'linear-gradient(to bottom right, #cd7f32, #8b4500)',
    image: hadesImg,
  },
];

const domainPrizes = [
  { title: 'AI & ML', desc: 'Best AI Innovation', img: domainSpartan },
  { title: 'Cyber Security', desc: 'Best Security Hack', img: domainSpartan },
  { title: 'Blockchain', desc: 'Best Web3 DApp', img: domainSpartan },
  { title: 'Data Science', desc: 'Best Data Solution', img: domainSpartan },
];

export default function Prizes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  // Responsive check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prevIndex = (activeIndex - 1 + mainPrizes.length) % mainPrizes.length;
  const nextIndex = (activeIndex + 1) % mainPrizes.length;
  const activePrize = mainPrizes[activeIndex];

  const sections = [
    { id: 0, name: 'main-prizes', label: 'Main Prizes' },
    { id: 1, name: 'domain-prizes', label: 'Domain Prizes' },
  ];

  // Generate random values once for particles using useState lazy initialization
  // Reduced particle count on mobile for performance
  const [flameParticles] = useState(() => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobileDevice ? 10 : 20;
    return Array.from({ length: count }).map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 6 + 3,
      left: Math.random() * 100,
      x1: Math.random() * 80 - 40,
      x2: Math.random() * 60 - 30,
      rotate: Math.random() * 180 - 90,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 10,
    }));
  });

  const [fireEmberParticles] = useState(() => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobileDevice ? 12 : 25;
    return Array.from({ length: count }).map(() => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      borderRadius: Math.random() * 50 + 50,
      x1: Math.random() * 60 - 30,
      x2: Math.random() * 40 - 20,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 12,
    }));
  });

  const [ashParticles] = useState(() => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobileDevice ? 15 : 30;
    return Array.from({ length: count }).map(() => ({
      width: Math.random() * 2.5 + 1,
      height: Math.random() * 2.5 + 1,
      left: Math.random() * 100,
      borderRadius: Math.random() * 40 + 60,
      x: Math.random() * 50 - 25,
      rotate: Math.random() * 180,
      duration: Math.random() * 7 + 9,
      delay: Math.random() * 12,
    }));
  });

  const [debrisParticles] = useState(() => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobileDevice ? 8 : 15;
    return Array.from({ length: count }).map(() => ({
      width: Math.random() * 3 + 2,
      height: Math.random() * 3 + 2,
      left: Math.random() * 100,
      borderRadius: Math.random() * 30 + 70,
      x: Math.random() * 40 - 20,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 15,
    }));
  });

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setActiveIndex((prev) => (prev + 1) % mainPrizes.length);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setActiveIndex((prev) => (prev - 1 + mainPrizes.length) % mainPrizes.length);
  }, [isAnimating]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return;
      setActiveIndex(index);
    },
    [isAnimating, activeIndex],
  );

  const switchSection = useCallback(
    (nextSection: number) => {
      if (isAnimating || nextSection === currentSection) return;

      setIsAnimating(true);
      setCurrentSection(nextSection);

      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    },
    [isAnimating, currentSection],
  );

  // Touch gesture handlers for mobile
  const minSwipeDistance = 50;
  const minVerticalSwipeDistance = 80; // Higher threshold for vertical (section switching)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchEndY.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current || !touchStartY.current || !touchEndY.current)
      return;

    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY = touchStartY.current - touchEndY.current;
    const absDistanceX = Math.abs(distanceX);
    const absDistanceY = Math.abs(distanceY);

    // Determine if it's primarily horizontal or vertical swipe
    if (absDistanceY > absDistanceX) {
      // Vertical swipe - Switch sections
      if (absDistanceY > minVerticalSwipeDistance && !isAnimating) {
        if (distanceY > 0 && currentSection < sections.length - 1) {
          // Swipe up - Next section
          switchSection(currentSection + 1);
        } else if (distanceY < 0 && currentSection > 0) {
          // Swipe down - Previous section
          switchSection(currentSection - 1);
        }
      }
    } else {
      // Horizontal swipe - Navigate carousel (only in main prizes section)
      if (absDistanceX > minSwipeDistance && currentSection === 0 && !isAnimating) {
        if (distanceX > 0) {
          // Swipe left - Next prize
          handleNext();
        } else {
          // Swipe right - Previous prize
          handlePrev();
        }
      }
    }

    // Reset touch points
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  }, [currentSection, sections.length, handleNext, handlePrev, switchSection, isAnimating]);

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
      if (currentSection === 0) {
        // Main prizes section
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
      } else {
        // For Domain Prizes (Grid), we might just allow vertical scrolling or section switching
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            if (currentSection > 0) switchSection(currentSection - 1);
            break;
          // Allow normal key behavior or other interactions?
          // Removed Left/Right for carousel since it is now a grid
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
  }, [
    currentSection,
    isAnimating,
    isPaused,
    activeIndex,
    handleNext,
    handlePrev,
    switchSection,
    sections.length,
  ]);

  // Auto-play functionality
  useEffect(() => {
    if (currentSection === 0 && !isPaused && !isAnimating) {
      const interval = setInterval(() => {
        handleNext();
      }, 10000); // Change slide every 10 seconds

      return () => clearInterval(interval);
    }
  }, [activeIndex, currentSection, isPaused, isAnimating, handleNext]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-neutral-950 text-neutral-100 min-h-screen h-dvh overflow-hidden selection:bg-yellow-900 selection:text-white pt-16 xs:pt-18 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 2xl:pt-48 pb-12 xs:pb-14 sm:pb-16 md:pb-20 lg:pb-24"
      style={{ touchAction: 'pan-y pan-x pinch-zoom' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Image with Black Mask */}
      <div className="fixed inset-0 z-0 will-change-transform">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Section Navigation Indicators - Touch-friendly */}
      <div className="fixed right-2 xs:right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 xs:gap-2.5 sm:gap-3 md:gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => switchSection(section.id)}
            className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 touch-manipulation ${currentSection === section.id
              ? 'bg-[#d4af37] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.6)] scale-110'
              : 'bg-transparent border-neutral-500 hover:border-[#d4af37]/60 active:border-[#d4af37]/80'
              }`}
            aria-label={`Go to ${section.label}`}
          />
        ))}
      </div>

      {/* Scroll Hint with enhanced styling - Positioned above header, always visible */}
      <AnimatePresence>
        {currentSection < sections.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-24 md:bottom-2 left-1/2 -translate-x-1/2 z-[60] text-center pointer-events-none px-2 xs:px-3 sm:px-4"
          >
            {/* Background blur for better visibility */}
            <div className="absolute inset-0 -mx-2 xs:-mx-3 sm:-mx-4 bg-black/40 backdrop-blur-sm rounded-lg -z-10" />

            {/* Keyboard Instructions */}
            <motion.p
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base text-neutral-300 xs:text-neutral-200 mb-1 xs:mb-1.5 sm:mb-2 font-heading tracking-wider leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              {currentSection === 0
                ? isMobile
                  ? 'Swipe ← → for prizes, ⬆️ ⬇️ for sections'
                  : 'Use ← → keys or scroll to explore'
                : isMobile
                  ? 'Swipe ⬆️ ⬇️ to navigate'
                  : 'Scroll to explore'}
            </motion.p>

            {/* Mouse Indicator - Hidden on mobile */}
            {!isMobile && (
              <motion.div
                className="w-3 h-4 xs:w-3.5 xs:h-5 sm:w-4 sm:h-6 md:w-5 md:h-7 lg:w-6 lg:h-8 border-2 border-neutral-400 rounded-full mx-auto relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                whileHover={{ scale: 1.1, borderColor: '#d4af37' }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-0.5 h-0.5 xs:h-1 sm:w-1 sm:h-1.5 md:w-1 md:h-2 lg:w-1.5 lg:h-2.5 bg-neutral-300 rounded-full absolute top-0.5 xs:top-1 sm:top-1.5 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            )}
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
                    font-family: 'IM Fell English', serif;
                    overscroll-behavior: none; /* Prevent bounce on mobile */
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

      {/* ULTIMATE: Combined Fire + Ash Particles - Optimized */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
        style={{ contain: 'layout style paint' }}
      >
        {/* FIRE PARTICLES - Rising from ground */}
        {/* Large flame particles rising from bottom */}
        {flameParticles.map((particle, i) => (
          <motion.div
            key={`flame-${i}`}
            className="absolute rounded-full shadow-lg will-change-transform"
            style={{
              width: isMobile ? `${particle.width * 0.7}px` : `${particle.width}px`,
              height: isMobile ? `${particle.height * 0.7}px` : `${particle.height}px`,
              left: `${particle.left}%`,
              bottom: `-20px`,
              borderRadius: `50% 50% 50% 50% / 60% 60% 40% 40%`,
              backgroundColor: 'rgba(255, 140, 0, 0.8)',
              boxShadow: '0 0 8px rgba(255, 140, 0, 0.6), 0 0 16px rgba(255, 69, 0, 0.4)',
              transform: 'translateZ(0)',
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
              ease: 'easeOut',
            }}
          />
        ))}
        {/* Fire embers rising */}
        {fireEmberParticles.map((particle, i) => (
          <motion.div
            key={`fire-ember-${i}`}
            className="absolute rounded-full shadow-md will-change-transform"
            style={{
              width: isMobile ? `${particle.width * 0.7}px` : `${particle.width}px`,
              height: isMobile ? `${particle.height * 0.7}px` : `${particle.height}px`,
              left: `${particle.left}%`,
              bottom: `-15px`,
              borderRadius: `${particle.borderRadius}%`,
              backgroundColor: 'rgba(255, 69, 0, 0.7)',
              boxShadow: '0 0 6px rgba(255, 69, 0, 0.5)',
              transform: 'translateZ(0)',
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
              ease: 'easeOut',
            }}
          />
        ))}

        {/* ASH PARTICLES - Falling from top */}
        {/* Battlefield ash falling down */}
        {ashParticles.map((particle, i) => (
          <motion.div
            key={`ash-${i}`}
            className="absolute rounded-full shadow-md will-change-transform"
            style={{
              width: isMobile ? `${particle.width * 0.7}px` : `${particle.width}px`,
              height: isMobile ? `${particle.height * 0.7}px` : `${particle.height}px`,
              left: `${particle.left}%`,
              top: `-15px`,
              borderRadius: `${particle.borderRadius}%`,
              backgroundColor: 'rgba(245, 245, 220, 0.6)',
              boxShadow: '0 0 3px rgba(139, 69, 19, 0.4)',
              transform: 'translateZ(0)',
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
              ease: 'linear',
            }}
          />
        ))}
        {/* Dark debris falling */}
        {debrisParticles.map((particle, i) => (
          <motion.div
            key={`falling-debris-${i}`}
            className="absolute rounded-full shadow-lg will-change-transform"
            style={{
              width: isMobile ? `${particle.width * 0.7}px` : `${particle.width}px`,
              height: isMobile ? `${particle.height * 0.7}px` : `${particle.height}px`,
              left: `${particle.left}%`,
              top: `-20px`,
              borderRadius: `${particle.borderRadius}%`,
              backgroundColor: 'rgba(139, 69, 19, 0.7)',
              boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
              transform: 'translateZ(0)',
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
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* SECTION 1: MAIN PRIZES */}
        <motion.section
          key={`section-${currentSection}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className={`absolute inset-0 flex flex-col items-center justify-center z-10 font-heading ${currentSection === 0 ? 'block' : 'hidden'}`}
        >
          <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-3 xs:py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 pb-12 xs:pb-14 sm:pb-16 md:pb-20 lg:pb-24 flex flex-col items-center justify-center h-full">
            {/* HEADLINE */}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl mb-3 xs:mb-4 sm:mb-5 md:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 text-center tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] xl:tracking-[0.3em] text-[#e8dab2] drop-shadow-[0_0_15px_rgba(232,218,178,0.3)] sm:drop-shadow-[0_0_20px_rgba(232,218,178,0.4)] mt-2 xs:mt-3 sm:mt-4 md:mt-6 lg:mt-8 leading-tight"
            >
              PRIZES
            </motion.h1>

            {/* MAIN PRIZES CAROUSEL */}
            <div className="relative w-full max-w-7xl h-[280px] xs:h-[320px] sm:h-[400px] md:h-[480px] lg:h-[550px] xl:h-[600px] 2xl:h-[650px] flex items-center justify-center">
              {/* Navigation Buttons - Responsive positioning */}
              <button
                onClick={handlePrev}
                className="absolute left-1 xs:left-2 sm:left-4 md:left-8 lg:left-12 xl:left-16 2xl:left-20 top-1/2 z-30 p-1.5 xs:p-2 sm:p-2.5 md:p-3 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none opacity-70 hover:opacity-100 touch-manipulation"
                aria-label="Previous prize"
              >
                <img
                  src={arrowLeft}
                  alt=""
                  className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                  loading="eager"
                  decoding="async"
                />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-1 xs:right-2 sm:right-4 md:right-8 lg:right-12 xl:right-16 2xl:right-20 top-1/2 z-30 p-1.5 xs:p-2 sm:p-2.5 md:p-3 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none opacity-70 hover:opacity-100 touch-manipulation"
                aria-label="Next prize"
              >
                <img
                  src={arrowRight}
                  alt=""
                  className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                  loading="eager"
                  decoding="async"
                />
              </button>

              {/* Cards Container */}
              <div className="relative w-full h-full flex items-center justify-center px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                {/* Left Card (Previous) - Symmetrical positioning, hidden on mobile */}
                <motion.div
                  key={`prev-${prevIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25, x: 0, scale: 0.6 }}
                  className="absolute left-[1%] md:left-[3%] lg:left-[5%] xl:left-[8%] 2xl:left-[10%] blur-[1px] z-10 cursor-pointer hidden md:block will-change-transform"
                  onClick={handlePrev}
                  style={{ transform: 'translateZ(0)' }}
                >
                  <div
                    className="w-[100px] h-[150px] md:w-[120px] md:h-[180px] lg:w-[160px] lg:h-[240px] xl:w-[200px] xl:h-[300px] 2xl:w-[240px] 2xl:h-[360px] rounded-lg md:rounded-xl overflow-hidden bg-cover bg-center border border-neutral-700/50"
                    style={{
                      backgroundImage: `url(${mainPrizes[prevIndex].image})`,
                      willChange: 'transform',
                    }}
                  />
                </motion.div>

                {/* Active Card (Center) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`active-${activeIndex}`}
                    initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
                    animate={{ scale: 1, opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="z-20 relative group cursor-pointer will-change-transform"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(0)',
                    }}
                    whileHover={!isMobile ? { scale: 1.05, y: -10 } : {}}
                    onMouseEnter={() => !isMobile && setIsPaused(true)}
                    onMouseLeave={() => !isMobile && setIsPaused(false)}
                  >
                    <div
                      className="w-[180px] h-[270px] xs:w-[200px] xs:h-[300px] sm:w-[240px] sm:h-[360px] md:w-[260px] md:h-[390px] lg:w-[300px] lg:h-[450px] xl:w-[340px] xl:h-[510px] 2xl:w-[380px] 2xl:h-[570px] rounded-lg md:rounded-xl overflow-hidden bg-cover bg-center border-2 md:border-[3px] transition-all duration-500 group-hover:brightness-110"
                      style={{
                        backgroundImage: `url(${activePrize.image})`,
                        boxShadow: `0 0 30px ${activePrize.color}40, 0 15px 40px rgba(0,0,0,0.4)`,
                        borderColor: activePrize.color,
                        willChange: 'transform',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Right Card (Next) - Symmetrical positioning, hidden on mobile */}
                <motion.div
                  key={`next-${nextIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25, x: 0, scale: 0.6 }}
                  className="absolute right-[1%] md:right-[3%] lg:right-[5%] xl:right-[8%] 2xl:right-[10%] blur-[1px] z-10 cursor-pointer hidden md:block will-change-transform"
                  onClick={handleNext}
                  style={{ transform: 'translateZ(0)' }}
                >
                  <div
                    className="w-[100px] h-[150px] md:w-[120px] md:h-[180px] lg:w-[160px] lg:h-[240px] xl:w-[200px] xl:h-[300px] 2xl:w-[240px] 2xl:h-[360px] rounded-lg md:rounded-xl overflow-hidden bg-cover bg-center border border-neutral-700/50"
                    style={{
                      backgroundImage: `url(${mainPrizes[nextIndex].image})`,
                      willChange: 'transform',
                    }}
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
                    className="hidden xl:flex absolute right-[2%] xl:right-[4%] 2xl:right-[6%] flex-col items-start text-left w-[240px] xl:w-[280px] 2xl:w-[320px] z-20"
                  >
                    <h2
                      className="text-5xl xl:text-6xl 2xl:text-7xl font-heading tracking-[0.15em] xl:tracking-[0.2em] mb-1.5 xl:mb-2 2xl:mb-3 leading-tight"
                      style={{ color: activePrize.color }}
                    >
                      {activePrize.title}
                    </h2>
                    <h3 className="text-3xl xl:text-4xl 2xl:text-5xl font-subheading font-bold italic text-[#DEC169] mb-1.5 xl:mb-2 2xl:mb-3 leading-tight">
                      {activePrize.god}
                    </h3>
                    <p className="text-xl xl:text-2xl 2xl:text-3xl italic text-neutral-400 font-subheading mb-3 xl:mb-4 2xl:mb-6 pb-2 xl:pb-3 2xl:pb-4 w-full leading-snug">
                      {activePrize.role}
                    </p>
                    <div
                      className="text-6xl xl:text-7xl 2xl:text-8xl font-normal font-heading tracking-tighter leading-none"
                      style={{
                        color: activePrize.color,
                        textShadow: `0 0 30px ${activePrize.color}50, 0 0 60px ${activePrize.color}30`,
                      }}
                    >
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
                className="xl:hidden text-center mt-4 xs:mt-5 sm:mt-6 md:mt-8 lg:mt-10 flex flex-col items-center px-3 xs:px-4 sm:px-6 mb-3 sm:mb-4 md:mb-6"
              >
                <h2
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest mb-1 xs:mb-1.5 sm:mb-2 font-bold font-heading leading-tight"
                  style={{ color: activePrize.color }}
                >
                  {activePrize.title}
                </h2>
                <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-subheading font-bold italic text-[#DEC169] mb-1 xs:mb-1.5 sm:mb-2 leading-tight drop-shadow-md">
                  {activePrize.god}
                </h3>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl italic text-neutral-400 font-subheading mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 leading-snug px-2">
                  {activePrize.role}
                </p>
                <div
                  className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-heading tracking-tighter mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-none"
                  style={{
                    color: activePrize.color,
                    textShadow: `0 0 20px ${activePrize.color}40, 0 0 40px ${activePrize.color}20`,
                  }}
                >
                  {activePrize.amount}
                </div>

                {/* Carousel Indicators - Below Cards - Touch-friendly on mobile */}
                <div className="flex justify-center gap-2.5 xs:gap-3 sm:gap-3.5 md:gap-4 mt-3 xs:mt-3.5 sm:mt-4 md:mt-5">
                  {mainPrizes.map((_, index) => (
                    <button
                      key={`main-indicator-${index}`}
                      onClick={() => goToSlide(index)}
                      className={`w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 rounded-full transition-all duration-300 touch-manipulation p-1.5 ${index === activeIndex
                        ? 'bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.8)] scale-125'
                        : 'bg-neutral-600/70 hover:bg-neutral-500 active:bg-neutral-400 active:scale-95'
                        }`}
                      aria-label={`Go to ${mainPrizes[index].god} prize`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Desktop Carousel Indicators - Below Cards (Only for desktop) */}
            <div className="hidden xl:flex justify-center gap-3 mt-4 mb-4">
              {mainPrizes.map((_, index) => (
                <button
                  key={`desktop-indicator-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                    ? 'bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.6)] scale-110'
                    : 'bg-neutral-600 hover:bg-neutral-500'
                    }`}
                  aria-label={`Go to ${mainPrizes[index].god} prize`}
                />
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* SECTION 2: DOMAIN PRIZES */}
      <motion.section
        key={`section-${currentSection}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 font-heading ${currentSection === 1 ? 'block' : 'hidden'}`}
      >
        {/* Container with dynamic padding based on screen height */}
        <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 w-full h-full flex flex-col justify-center items-center pt-12 xs:pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-12 xs:pb-14 sm:pb-16 md:pb-20 lg:pb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-widest text-[#e8dab2] text-center mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-10 drop-shadow-[0_0_12px_rgba(232,218,178,0.25)] sm:drop-shadow-[0_0_15px_rgba(232,218,178,0.3)] shrink-0 leading-tight px-2"
          >
            DOMAIN PRIZES
          </motion.h2>

          {/* DOMAIN PRIZES GRID - Fully Responsive */}
          <div className="w-full max-w-[1400px] flex flex-wrap justify-center items-center content-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 perspective-1000 px-2 xs:px-3 sm:px-4">
            {domainPrizes.map((prize, index) => (
              <motion.div
                key={`domain-card-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group w-[140px] h-[210px] xs:w-[160px] xs:h-[240px] sm:w-[180px] sm:h-[270px] md:w-[200px] md:h-[300px] lg:w-[220px] lg:h-[330px] xl:w-[260px] xl:h-[390px] 2xl:w-[300px] 2xl:h-[450px] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer border border-[#d4af37]/40 hover:border-[#d4af37] transition-all duration-500 bg-[#0a0a0a] will-change-transform"
                whileHover={!isMobile ? { scale: 1.05, zIndex: 10 } : {}}
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Background Image - Blurs on Hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out group-hover:blur-[2px] group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0"
                  style={{
                    backgroundImage: `url(${prize.img})`,
                    willChange: 'transform',
                  }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:bg-black/60 transition-all duration-500" />

                {/* Static Border Frame (Golden) */}
                <div className="absolute inset-1.5 xs:inset-2 border border-[#d4af37]/20 rounded-lg pointer-events-none z-20 transition-colors group-hover:border-[#d4af37]/60" />

                {/* Content Container - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 xs:p-3 sm:p-4 text-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 xs:mb-1.5 sm:mb-2 font-medieval tracking-widest text-[#e8dab2] drop-shadow-lg leading-tight px-2">
                    {prize.title}
                  </h3>
                  <div className="w-6 xs:w-7 sm:w-8 h-0.5 bg-[#d4af37] mb-1 xs:mb-1.5 sm:mb-2 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  <p className="text-[10px] xs:text-xs sm:text-sm md:text-base font-baskerville italic tracking-wider drop-shadow-md leading-snug px-2">
                    {prize.desc}
                  </p>
                </div>

                {/* Default View Title (Visible only when NOT hovering) */}
                <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-0 w-full text-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4 z-20">
                  <div className="bg-black/60 backdrop-blur-sm border-y border-[#d4af37]/30 py-1 xs:py-1.5 sm:py-2 mx-1.5 xs:mx-2 sm:mx-3 md:mx-4">
                    <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-[#e8dab2] tracking-widest font-cinzel leading-tight px-1">
                      {prize.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
