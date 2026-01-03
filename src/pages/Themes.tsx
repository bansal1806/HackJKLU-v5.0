import { useState } from 'react';
import { motion } from 'framer-motion';

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
    description: "Revolutionizing finance with blockchain and AI."
  },
  {
    id: 2,
    title: "HealthTech",
    description: "Innovating healthcare for a better tomorrow."
  },
  {
    id: 3,
    title: "EdTech",
    description: "Transforming education through technology."
  },
  {
    id: 4,
    title: "Open Innovation",
    description: "Solving real-world problems with creative solutions."
  },
  {
    id: 5,
    title: "Web3",
    description: "Building the decentralized future."
  }
];

export function Themes() {
  const [activeIndex, setActiveIndex] = useState(2); // Start in the middle

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % themesData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + themesData.length) % themesData.length);
  };

  // Helper to determine visual position index
  const getPosition = (index: number) => {
    const diff = (index - activeIndex + themesData.length) % themesData.length;
    // Map to -2, -1, 0, 1, 2 for a 5-item window logic
    // If array is 5, diffs are 0, 1, 2, 3, 4. 
    // 0 -> center
    // 1 -> right 1
    // 2 -> right 2? or far
    // 3 -> left 2? (since 3 is -2 mod 5)
    // 4 -> left 1  (since 4 is -1 mod 5)

    if (diff === 0) return 0;
    if (diff === 1) return 1;
    if (diff === 2) return 2;
    if (diff === themesData.length - 1) return -1;
    if (diff === themesData.length - 2) return -2;
    return 100; // Hidden
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-cinzel text-[#e8dab2]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 contrast-125 brightness-50"
        style={{ backgroundImage: `url(${bgThemes})` }}
      />

      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl mb-20 text-center tracking-[0.2em] font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          style={{
            background: 'linear-gradient(to bottom, #fff8e7 0%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          THEMES
        </motion.h1>

        {/* Carousel */}
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px]">

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-20 z-50 p-2 hover:scale-110 transition-transform cursor-pointer"
          >
            <img src={arrowLeft} alt="Prev" className="w-16 md:w-24 drop-shadow-lg" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-20 z-50 p-2 hover:scale-110 transition-transform cursor-pointer"
          >
            <img src={arrowRight} alt="Next" className="w-16 md:w-24 drop-shadow-lg" />
          </button>

          {/* Scroll Items */}
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            {themesData.map((theme, i) => {
              const position = getPosition(i);
              // Only render if visible (-2 to 2)
              if (Math.abs(position) > 2 && position !== 100) return null;

              const isCenter = position === 0;
              const isOuter = Math.abs(position) === 2;

              // Visual properties based on position
              const xOffset = isCenter ? 0 : position * 220; // Distance between items
              const scale = isCenter ? 1.0 : isOuter ? 0.6 : 0.8;
              const zIndex = isCenter ? 30 : isOuter ? 10 : 20;
              const rotateY = isCenter ? 0 : position > 0 ? -15 : 15; // Rotate inwards

              return (
                <motion.div
                  key={theme.id}
                  initial={false}
                  animate={{
                    x: xOffset,
                    scale: scale,
                    zIndex: zIndex,
                    rotateY: rotateY,
                    width: isCenter ? 800 : 140,
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 60, damping: 20 },
                    scale: { type: "spring", stiffness: 60, damping: 20 },
                    rotateY: { type: "spring", stiffness: 60, damping: 20 },
                    width: { duration: 1.0, ease: "easeInOut" },
                    zIndex: { duration: 0 }
                  }}
                  className="absolute flex items-center justify-center"
                  style={{
                    height: '500px',
                    perspective: '1000px'
                  }}
                >
                  {/* ROLLED SCROLL (Visible when NOT center) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-0"
                    style={{ opacity: isCenter ? 0 : 1 }}
                  >
                    <img
                      src={scrollRolled}
                      alt="Rolled Scroll"
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* OPEN SCROLL COMPOSITION */}
                  <div
                    className="absolute inset-0 w-full h-full transition-opacity duration-0"
                    style={{ opacity: isCenter ? 1 : 0 }}
                  >
                    {/* Only render complex scroll if center or transitioning to/from center */}
                    {(isCenter || Math.abs(position) <= 1) && (
                      <div className="relative w-full h-full flex items-center justify-center">

                        {/* Left Handle */}
                        <motion.div
                          animate={{
                            left: isCenter ? '0%' : 'calc(50% - 70px)',
                            rotateY: isCenter ? -360 : 0
                          }}
                          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }} // Slower roll
                          className="absolute top-0 bottom-0 w-[60px] md:w-[80px] z-20 overflow-hidden"
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <img
                            src={scrollOpen}
                            className="absolute top-0 left-0 w-[800px] max-w-none h-full object-contain object-left"
                            alt=""
                          />
                        </motion.div>

                        {/* Right Handle */}
                        <motion.div
                          animate={{
                            right: isCenter ? '0%' : 'calc(50% - 70px)',
                            rotateY: isCenter ? 360 : 0
                          }}
                          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute top-0 bottom-0 w-[60px] md:w-[80px] z-20 overflow-hidden"
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <img
                            src={scrollOpen}
                            className="absolute top-0 right-0 w-[800px] max-w-none h-full object-contain object-right"
                            alt=""
                          />
                        </motion.div>

                        {/* Middle Body (Paper) */}
                        <motion.div
                          animate={{ width: isCenter ? 'calc(100% - 140px)' : '0px' }}
                          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute top-0 bottom-0 z-10 overflow-hidden"
                        >
                          {/* Inner Image Centered relative to parent 800px */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-full">
                            <img
                              src={scrollOpen}
                              className="w-full h-full object-contain"
                              alt=""
                              style={{ clipPath: 'inset(0 10% 0 10%)' }} // Trim handles from center image
                            />
                          </div>

                          {/* Content Overlay */}
                          <motion.div
                            animate={{ opacity: isCenter ? 1 : 0, scale: isCenter ? 1 : 0.9 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-neutral-900 p-8 md:p-12 text-center"
                          >
                            <h3 className="text-3xl md:text-5xl font-bold mb-4 text-[#5c3a21] uppercase tracking-wider">{theme.title}</h3>
                            <p className="text-sm md:text-base font-serif text-[#3e2715] italic leading-relaxed max-w-md">{theme.description}</p>
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
