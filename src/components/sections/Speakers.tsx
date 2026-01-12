import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import arrowLeft from '../../assets/prizes/arrow-left.webp';
import arrowRight from '../../assets/prizes/arrow-right.webp';

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
    name: 'Ankur Warikoo',
    role: 'Content Creator',
    image: '/speakers/ankur.webp',
    tag: '@warikoo',
    bio: 'Entrepreneur, mentor, and content creator inspiring millions to take charge of their lives.',
    socials: { linkedin: 'https://www.linkedin.com/in/warikoo/' },
  },
  {
    id: 2,
    name: 'Sandeep Jain',
    role: 'Founder & CEO, GFG',
    image: '/speakers/sandeep.jpeg',
    tag: '@sandeep_gfg',
    bio: 'Founder of GeeksforGeeks. Revolutionizing the way students learn programming.',
    socials: { linkedin: 'https://www.linkedin.com/in/sandeep-jain-geeksforgeeks/' },
  },
  {
    id: 3,
    name: 'Bhagirath Giri',
    role: 'MD, WsCube Tech',
    image: '/speakers/Bhagirath.jpeg',
    tag: '@bhagirath_tech',
    bio: 'Leading ed-tech innovation at WsCube Tech, empowering careers in digital skills.',
    socials: { linkedin: 'https://www.linkedin.com/in/bhagirath-giri/' },
  },
  {
    id: 4,
    name: 'Jaskaran Singh',
    role: 'SWE @Google',
    image: '/speakers/Jaskaran.jpeg',
    tag: '@jaskaran_code',
    bio: 'ICPC World Finalist 2023. Cracking complex problems at Google.',
    socials: { linkedin: 'https://www.linkedin.com/in/jaskaran-singh-8b8450200/' },
  },
];

const judges = [
  {
    id: 101,
    name: 'Pranav M',
    role: 'SDE-II at Microsoft',
    image: '/judges/pranav.webp',
    tag: '@pranav_ms',
    bio: 'SDE-II at Microsoft',
    socials: { linkedin: 'https://www.linkedin.com/in/candidatepstx-95adfsdk23/' },
  },
  {
    id: 103,
    name: 'Sandhita Agarwal',
    role: 'Founder at Hygge',
    image: '/judges/sandhitaagarwal.webp',
    tag: '@sandhita',
    bio: 'Founder at Hygge',
    socials: { linkedin: 'https://www.linkedin.com/in/sandhitaagarwal/' },
  },
  {
    id: 104,
    name: 'Aman',
    role: 'Founder at Ecovia',
    image: '/judges/aman.webp',
    tag: '@aman',
    bio: 'Founder at Ecovia',
    socials: { linkedin: 'https://ecovia-pro.com/' },
  },
  {
    id: 105,
    name: 'Rishabh Nag',
    role: 'Co-Founder at Humanli AI',
    image: '/judges/rishabhnag.webp',
    tag: '@rishabh',
    bio: 'Co-Founder at Humanli AI',
    socials: { linkedin: 'https://www.linkedin.com/in/rishabh-nag-founder03/' },
  },
  {
    id: 106,
    name: 'Devendra Parihar',
    role: 'Lead Data Scientist',
    image: '/judges/devendraparihar.webp',
    tag: '@devendra',
    bio: 'Lead Data Scientist at KainSkep',
    socials: { linkedin: 'https://www.linkedin.com/in/devendra-parihar/' },
  },
  {
    id: 109,
    name: 'Vineet Sharma',
    role: 'Associate SWE',
    image: '/judges/vineetsharma.webp',
    tag: '@vineet',
    bio: 'Associate Software Engineer at Celebal Technologies',
    socials: { linkedin: 'https://www.linkedin.com/in/vineetsharma-24/' },
  },
  {
    id: 110,
    name: 'Sparsh Agarwal',
    role: 'Associate SWE',
    image: '/judges/sparshagarwal.webp',
    tag: '@sparsh',
    bio: 'Associate Software Engineer at CoinDCX',
    socials: { linkedin: 'https://linkedin.com/in/akathecoder' },
  },
];

export function Speakers() {
  const [activeCategory, setActiveCategory] = useState<'speakers' | 'judges'>('speakers');

  const currentData = activeCategory === 'speakers' ? speakers : judges;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black font-cinzel">
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Amphitheater" className="w-full h-full object-cover opacity-50" />
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


        {/* Category Toggle */}
        <div className="mt-6 flex justify-center gap-6 pointer-events-auto">
          <button
            onClick={() => setActiveCategory('speakers')}
            className={`text-sm md:text-lg tracking-[0.2em] relative px-4 py-2 transition-all duration-300 ${activeCategory === 'speakers' ? 'text-[#d4af37] font-bold' : 'text-neutral-500 hover:text-[#d4af37]/70'}`}
          >
            SPEAKERS
            {activeCategory === 'speakers' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37] shadow-[0_0_10px_#d4af37]"
              />
            )}
          </button>

          <div className="w-[1px] h-6 bg-neutral-700 self-center" />

          <button
            onClick={() => setActiveCategory('judges')}
            className={`text-sm md:text-lg tracking-[0.2em] relative px-4 py-2 transition-all duration-300 ${activeCategory === 'judges' ? 'text-[#d4af37] font-bold' : 'text-neutral-500 hover:text-[#d4af37]/70'}`}
          >
            JUDGES
            {activeCategory === 'judges' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37] shadow-[0_0_10px_#d4af37]"
              />
            )}
          </button>
        </div>
      </div>

      {/* 3D Floor Container */}
      <div className="absolute inset-0 top-0 flex items-center justify-center perspective-[1200px] overflow-hidden">
        <FloorCarousel data={currentData} key={activeCategory} />
      </div>
    </section>
  );
}

interface FloorCarouselProps {
  data: typeof speakers;
}

function FloorCarousel({ data }: FloorCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<any>(null);
  const hoverTimeoutRef = useRef<any>(null); // For grace period

  // Enforce ODD visible count (add 1 if even) to ensure a center item (at 270deg) exists
  const visibleCount = data.length % 2 === 0 ? data.length + 1 : data.length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  // Calculate Visible Speakers
  const visibleSpeakers = [];
  for (let i = 0; i < visibleCount; i++) {
    const index = (startIndex + i) % data.length;
    visibleSpeakers.push({ ...data[index], indexPosition: i, originalIndex: index });
  }

  const xRadius = isMobile ? window.innerWidth * 0.42 : Math.min(800, window.innerWidth * 0.4);
  const yRadius = isMobile ? 120 : 250;

  const centerIndex = Math.floor(visibleCount / 2);
  const step = 50; // Fixed spacing in degrees

  const handleSpeakerClick = (originalIndex: number) => {
    const newStart = (originalIndex - centerIndex + data.length) % data.length;
    setStartIndex(newStart);
  };

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
    <div
      className={`relative w-full h-full flex items-center justify-center ${isMobile ? 'translate-y-20' : 'translate-y-32'}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* --- NAVIGATION CONTROLS --- */}
      <div className="absolute z-[1000] flex justify-between w-full max-w-[85vw] md:max-w-[1100px] px-4 md:px-12 top-[55%] -translate-y-1/2 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-1.5 md:p-3 rounded-full bg-black/40 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all group backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          aria-label="Previous speaker"
        >
          <img
            src={arrowLeft}
            alt="Prev"
            className="w-10 h-10 md:w-16 md:h-16 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-110"
          />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-1.5 md:p-3 rounded-full bg-black/40 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all group backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          aria-label="Next speaker"
        >
          <img
            src={arrowRight}
            alt="Next"
            className="w-10 h-10 md:w-16 md:h-16 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-110"
          />
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
      <div
        className="absolute border-[2px] border-[#d4af37]/30 rounded-[100%] pointer-events-none shadow-[0_0_30px_rgba(212,175,55,0.2)]"
        style={{
          width: xRadius * 2.2,
          height: yRadius * 2.2,
          transform: 'rotateX(70deg)',
        }}
      />

      {/* DEDICATED SPEAKER DETAILS PANEL */}
      <AnimatePresence mode="wait">
        {hoveredSpeaker && (
          <div className="absolute inset-0 z-[200] pointer-events-none flex items-end justify-center pb-32 md:pb-24">
            <motion.div
              key="detail-panel"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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
                  {hoveredSpeaker.socials.linkedin && (
                    <SocialIcon icon={iconLinkedin} delay={0.1} />
                  )}
                  {hoveredSpeaker.socials.x && <SocialIcon icon={iconX} delay={0.2} />}
                  {hoveredSpeaker.socials.insta && <SocialIcon icon={iconInsta} delay={0.3} />}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {visibleSpeakers.map((speaker) => {
          // Position Logic

          // Use indexPosition relative to centerIndex to fan out from 270 degrees
          const degree = 270 + (speaker.indexPosition - centerIndex) * step;
          const radian = (degree * Math.PI) / 180;

          const x = Math.cos(radian) * xRadius;
          const y = Math.sin(radian) * yRadius;

          // Perspective Scale
          const normalizedY = (y + yRadius) / (yRadius * 2);
          let scale = 0.5 + normalizedY * 0.5;
          const zIndex = Math.floor(normalizedY * 100);

          // Center logic using dynamic centerIndex
          const isCenter = speaker.indexPosition === centerIndex;

          // SCALE BOOST for center item (Responsive)
          if (isCenter) {
            scale *= isMobile ? 1.3 : 1.6; // 30% boost on mobile, 60% on desktop
          }

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
              onClick={() => handleSpeakerClick(speaker.originalIndex)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function SpeakerCard({
  speaker,
  x,
  y,
  scale,
  zIndex,
  isCenter,
  isMobile,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: any) {
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
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 45,
        damping: 20,
        mass: 1.2,
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Floating Animation Container */}
      <motion.div
        animate={isHovered ? { y: -10 } : { y: [0, -15, 0] }} // Stop floating on hover
        transition={
          isHovered
            ? { duration: 0.3 }
            : {
              duration: 6,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: -randomOffset,
            }
        }
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
            style={{
              maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
            }}
          />
        </div>

        {/* CARD CONTAINER */}
        <motion.div
          className={`${isMobile ? 'w-32 h-32' : 'w-56 h-56'} relative cursor-pointer`} // Increased mobile size
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={onClick}
          whileHover={{ scale: 1.15, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
          <div
            className={`absolute inset-[14%] rounded-full overflow-hidden z-10 border-[2px] ${isCenter ? 'border-[#d4af37]' : 'border-[#5c4d32]'} transition-colors duration-500 bg-black`}
          >
            <motion.img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover"
              animate={{
                filter:
                  isHovered || isCenter
                    ? 'grayscale(0%) sepia(0%) brightness(1.0) contrast(1.1)'
                    : 'grayscale(100%) sepia(30%) brightness(0.6) contrast(1.0)',
                scale: isHovered ? 1.1 : 1,
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
            className={`absolute ${isMobile ? '-bottom-20' : '-bottom-24'} left-1/2 -translate-x-1/2 w-max text-center pointer-events-none`}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
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

function SocialIcon({ icon, delay }: { icon: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 20 }}
      className="w-8 h-8 rounded-full bg-black/80 border border-[#d4af37]/50 hover:bg-[#d4af37] hover:border-white p-2 transition-all cursor-pointer group shadow-lg"
    >
      <img
        src={icon}
        alt="Social"
        className="w-full h-full object-contain invert opacity-70 group-hover:invert-0 group-hover:opacity-100 transition-all duration-300"
      />
    </motion.div>
  );
}
