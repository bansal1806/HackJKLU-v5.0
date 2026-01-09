import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Assets
import bgThemes from '../assets/themes/bg-themes.jpg';
import scrollOpen from '../assets/themes/scroll-open.png';
import scrollRolled from '../assets/themes/scroll-rolled.png';
import arrowLeft from '../assets/prizes/arrow-left.png';
import arrowRight from '../assets/prizes/arrow-right.png';
import { PageNavigation } from '../components/navigation/PageNavigation';

const themesData = [
  {
    id: 1,
    title: "FinTech",
    description: "Revolutionizing finance with blockchain and AI. This Hackathon empowers contestants to develop innovative solutions that reshape the future of financial services.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
    content: [
      "Digital Banking Solutions",
      "Cryptocurrency & Blockchain",
      "AI-Powered Financial Analytics",
      "Robo-Advisory Platforms",
      "Payment Gateway Innovations",
      "RegTech & Compliance"
    ]
  },
  {
    id: 2,
    title: "HealthTech",
    description: "Innovating healthcare for a better tomorrow. Empowering contestants to create technologies that transform medical care and improve patient outcomes.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    content: [
      "Telemedicine Platforms",
      "AI Diagnostics & Imaging",
      "Electronic Health Records",
      "Wearable Health Monitoring",
      "Mental Health Applications",
      "Drug Discovery & Research"
    ]
  },
  {
    id: 3,
    title: "EdTech",
    description: "Merges STEM (Science, Technology, Engineering, & Mathematics), AI (Artificial Intelligence), AR (Augmented Reality), and innovative technologies. This Hackathon empowers contestants to develop captivating technologies that redefine and reshape the future of learning across all domains.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop",
    content: [
      "Online Learning Platforms",
      "Virtual Classrooms",
      "AI-Powered Tutoring Systems",
      "Gamified Learning Platforms",
      "Skill Assessment Tools",
      "Language Learning Apps"
    ]
  },
  {
    id: 4,
    title: "Open Innovation",
    description: "Solving real-world problems with creative solutions. Encouraging innovative thinking to address global challenges through technology and collaboration.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    content: [
      "Smart City Solutions",
      "Environmental Monitoring",
      "Disaster Management Systems",
      "Agricultural Technology",
      "Transportation Innovation",
      "Energy Management"
    ]
  },
  {
    id: 5,
    title: "Web3",
    description: "Building the decentralized future. Empowering developers to create next-generation applications on blockchain and decentralized networks.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
    content: [
      "Decentralized Applications",
      "NFT Marketplaces",
      "DeFi Protocols",
      "Blockchain Infrastructure",
      "Smart Contract Development",
      "Metaverse Platforms"
    ]
  },
  {
    id: 6,
    title: "Cyber Security",
    description: "Safeguarding the digital frontier. Empowering contestants to develop robust security solutions that protect against evolving cyber threats.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
    content: [
      "Threat Intelligence Systems",
      "Zero Trust Architecture",
      "Biometric Authentication",
      "Network Forensics",
      "Privacy-Preserving Tech",
      "Security Automation"
    ]
  },
  {
    id: 7,
    title: "Future Tech",
    description: "Pioneering the next generation of AI & Robotics. Encouraging innovation in cutting-edge technologies that will shape tomorrow's world.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    content: [
      "Generative AI Models",
      "Autonomous Robotics",
      "Quantum Computing Apps",
      "Human-Computer Interface",
      "Sustainable Tech Solutions",
      "AR/VR Innovations"
    ]
  }
];

export function Themes() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with EdTech (index 2)
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % themesData.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + themesData.length) % themesData.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Calculate relative position from center (-3 to +3)
  const getRelativePosition = useCallback((index: number, activeIdx: number, total: number) => {
    let diff = (index - activeIdx) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }, []);

  // Background particles - Generated once on mount using lazy initializer
  const [particles] = useState(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      // Use index-based deterministic values for consistency
      const seed = i * 0.618; // Golden ratio for better distribution
      const x = Math.abs((Math.sin(seed) * 50 + 50) % 100);
      const y = Math.abs((Math.cos(seed * 1.3) * 50 + 50) % 100);
      const size = (Math.abs((i * 0.14159) % 1) * 3) + 1;
      const duration = (Math.abs((i * 0.2718) % 1) * 10) + 10;
      return { id: i, x, y, size, duration };
    });
  });

  return (
    <div className="h-screen relative overflow-hidden font-cinzel text-[#e8dab2] flex flex-col bg-neutral-900">
      {/* Background with Ornate Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
        style={{ backgroundImage: `url(${bgThemes})` }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute bg-gold-400 rounded-full opacity-40"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              boxShadow: '0 0 5px #d4af37'
            }}
            animate={{
              y: [0, -100],
              opacity: [0.4, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header - THEMES Title */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-8 sm:pt-12 md:pt-16 pb-4 text-center pointer-events-none">
        <motion.h1
          className="text-4xl md:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            textShadow: '0 0 30px rgba(212,175,55,0.5)'
          }}
        >
          THEMES
        </motion.h1>
      </div>

      {/* Main Carousel Area */}
      <div className="absolute inset-0 flex items-center justify-center w-full z-10 ">

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-12 z-50 p-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 active:scale-95"
          aria-label="Previous theme"
        >
          <img
            src={arrowLeft}
            alt="Prev"
            className="w-12 h-12 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
            loading="eager"
          />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-12 z-50 p-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 active:scale-95"
          aria-label="Next theme"
        >
          <img
            src={arrowRight}
            alt="Next"
            className="w-12 h-12 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
            loading="eager"
          />
        </button>

        {/* Scroll Carousel */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
          {themesData.map((theme, index) => {
            const position = getRelativePosition(index, activeIndex, themesData.length);
            const isCenter = position === 0;

            // Calculate positioning and scaling with perspective
            const centerX = 50; // Viewport center
            const spacing = isMobile ? 18 : 20; // Space between scrolls

            let left = '30%';
            let scale = 1;
            let zIndex = 50;
            let opacity = 1;
            let rotateY = 0;
            let brightness = 1;

            if (!isCenter) {
              if (Math.abs(position) > 3) return null; // Hide scrolls beyond visible range

              left = `${centerX + (position * spacing)}%`;
              // Progressive scaling: closer scrolls larger, further smaller
              scale = Math.max(0.45, 1 - Math.abs(position) * 0.18);
              zIndex = 50 - Math.abs(position) * 12;
              opacity = Math.max(0.5, 1 - Math.abs(position) * 0.2);
              brightness = Math.max(0.55, 1 - Math.abs(position) * 0.12);
              // Subtle perspective rotation for depth effect
              rotateY = position > 0 ? -6 : 6;
            }

            return (
              <motion.div
                key={theme.id}
                initial={false}
                animate={{
                  left: left,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                  rotateY: rotateY,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 25,
                  mass: 1
                }}
                className="absolute top-[30%] flex items-center justify-center will-change-transform pointer-events-auto"
                style={{
                  transform: 'translate(-50%, -50%) translateZ(0)',
                  width: isCenter ? (isMobile ? 'min(90vw, 700px)' : 'min(75vw, 900px)') : (isMobile ? '100px' : '160px'),
                  height: isCenter ? 'auto' : '70%',
                  transformStyle: 'preserve-3d'
                }}
              >
                {isCenter ? (
                  // OPEN SCROLL (Active)
                  <div className="relative w-full flex items-center justify-center">
                    <motion.img
                      src={scrollOpen}
                      alt="Open Scroll"
                      className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      loading="eager"
                    />

                    {/* Content Layer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center px-[14%] pt-[14%] pb-[14%] text-center"
                    >
                      {/* Theme Image */}
                      <div className="w-full max-w-[70%] mb-0 md:mb-5 rounded overflow-hidden grayscale opacity-75 max-h[100%]">
                        <img
                          src={theme.image}
                          alt={theme.title}
                          className="w-full h-[100%] object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* Title */}
                      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold uppercase mb-3 md:mb-4 tracking-widest text-[#5c3a21] border-b-2 border-[#5c3a21]/30 pb-2 md:pb-3 w-full max-w-[90%]">
                        {theme.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xs md:text-sm lg:text-base font-serif text-[#3e2715] mb-4 md:mb-6 leading-relaxed max-w-[95%] text-justify px-2">
                        {theme.description}
                      </p>

                      {/* Focus Areas */}
                      <div className="w-full max-w-[95%] px-2 mt-auto">
                        <h3 className="text-xs md:text-sm uppercase font-bold tracking-widest mb-2 md:mb-3 text-[#5c3a21] opacity-60 border-b border-[#5c3a21]/30 pb-1.5">
                          Focus Areas
                        </h3>
                        <ul className="text-xs md:text-sm font-medium text-[#3e2715] space-y-1.5 max-h-[120px] overflow-y-auto hide-scrollbar">
                          {theme.content.slice(0, 6).map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-left">
                              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-600 shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // ROLLED SCROLL (Inactive)
                  <div
                    className="relative w-full h-full flex items-center justify-center cursor-pointer transition-all duration-300"
                    onClick={() => setActiveIndex(index)}
                    style={{
                      filter: `brightness(${brightness})`
                    }}
                  >
                    <img
                      src={scrollRolled}
                      alt="Rolled Scroll"
                      className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                      loading="lazy"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <PageNavigation />

      {/* Custom Scrollbar Styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(92, 58, 33, 0.4);
          border-radius: 2px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(92, 58, 33, 0.6);
        }
      `}</style>
    </div>
  );
}
