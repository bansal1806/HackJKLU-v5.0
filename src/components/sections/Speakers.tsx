import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import arrowLeft from '../../assets/prizes/arrow-left.webp';
import arrowRight from '../../assets/prizes/arrow-right.webp';

// --- ASSETS ---
import bgImage from '../../assets/speakers/bg-amphitheater.jpg';
import frameImage from '../../assets/speakers/gold-frame.png';



// Judges Images
import imgPranav from '../../assets/judges/pranav.webp';
import imgSandhita from '../../assets/judges/sandhitaagarwal.webp';
import imgAman from '../../assets/judges/aman.webp';
import imgRishabh from '../../assets/judges/rishabhnag.webp';
import imgDevendra from '../../assets/judges/devendraparihar.webp';
import imgVineet from '../../assets/judges/vineetsharma.webp';
import imgSparsh from '../../assets/judges/sparshagarwal.webp';

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
    image: imgPranav,
    tag: '@pranav_ms',
    bio: 'SDE-II at Microsoft',
    socials: { linkedin: 'https://www.linkedin.com/in/candidatepstx-95adfsdk23/' },
  },
  {
    id: 103,
    name: 'Sandhita Agarwal',
    role: 'Founder at Hygge',
    image: imgSandhita,
    tag: '@sandhita',
    bio: 'Founder at Hygge',
    socials: { linkedin: 'https://www.linkedin.com/in/sandhitaagarwal/' },
  },
  {
    id: 104,
    name: 'Aman',
    role: 'Founder at Ecovia',
    image: imgAman,
    tag: '@aman',
    bio: 'Founder at Ecovia',
    socials: { linkedin: 'https://ecovia-pro.com/' },
  },
  {
    id: 105,
    name: 'Rishabh Nag',
    role: 'Co-Founder at Humanli AI',
    image: imgRishabh,
    tag: '@rishabh',
    bio: 'Co-Founder at Humanli AI',
    socials: { linkedin: 'https://www.linkedin.com/in/rishabh-nag-founder03/' },
  },
  {
    id: 106,
    name: 'Devendra Parihar',
    role: 'Lead Data Scientist',
    image: imgDevendra,
    tag: '@devendra',
    bio: 'Lead Data Scientist at KainSkep',
    socials: { linkedin: 'https://www.linkedin.com/in/devendra-parihar/' },
  },
  {
    id: 109,
    name: 'Vineet Sharma',
    role: 'Associate SWE',
    image: imgVineet,
    tag: '@vineet',
    bio: 'Associate Software Engineer at Celebal Technologies',
    socials: { linkedin: 'https://www.linkedin.com/in/vineetsharma-24/' },
  },
  {
    id: 110,
    name: 'Sparsh Agarwal',
    role: 'Associate SWE',
    image: imgSparsh,
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
      <div className="absolute top-20 md:top-24 left-0 right-0 z-[2000] text-center pointer-events-none px-4">
        <motion.h1

          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[#EFE3A0] font-bold tracking-[0.2em] uppercase drop-shadow-[0_4px_15px_rgba(239,227,160,0.4)]"
          style={{
            fontSize: 'clamp(2rem, 5vw + 1rem, 5rem)',
            textShadow: '0 0 40px rgba(212, 175, 55, 0.6)'
          }}
        >
          The Council
        </motion.h1>


        {/* Category Toggle */}
        <div className="mt-1 md:mt-2 flex justify-center gap-6 pointer-events-auto">
          <button
            onClick={() => setActiveCategory('speakers')}
            className={`text-xs md:text-lg tracking-[0.15em] md:tracking-[0.2em] relative px-4 py-2 transition-all duration-300 ${activeCategory === 'speakers' ? 'text-[#d4af37] font-bold' : 'text-neutral-500 hover:text-[#d4af37]/70'}`}
          >
            PAST SPEAKERS
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
            className={`text-xs md:text-lg tracking-[0.15em] md:tracking-[0.2em] relative px-4 py-2 transition-all duration-300 ${activeCategory === 'judges' ? 'text-[#d4af37] font-bold' : 'text-neutral-500 hover:text-[#d4af37]/70'}`}
          >
            PAST JUDGES
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
    </section >
  );
}

interface FloorCarouselProps {
  data: typeof speakers;
}

// --- RESPONSIVE HELPER FUNCTIONS ---
// Linear interpolation: smoothly scale values between min and max based on viewport
function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * Math.max(0, Math.min(1, t));
}

// Calculate normalized position (0-1) based on viewport dimension
function getViewportFactor(value: number, minVp: number, maxVp: number): number {
  return Math.max(0, Math.min(1, (value - minVp) / (maxVp - minVp)));
}

function FloorCarousel({ data }: FloorCarouselProps) {
  // Track viewport dimensions for responsive calculations
  const [viewport, setViewport] = useState({ w: 1920, h: 1080 });
  // Unbounded index to allow infinite scrolling with stable keys
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<any>(null);
  const hoverTimeoutRef = useRef<any>(null);

  // Enforce ODD visible count (add 1 if even) to ensure a center item (at 270deg) exists
  const visibleCount = data.length % 2 === 0 ? data.length + 1 : data.length;

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // --- RESPONSIVE DIMENSION CALCULATIONS ---
  const { w, h } = viewport;
  const isExtremelySmall = w < 320 || h < 400;

  // Width factor for horizontal scaling (320px to 1920px)
  const wFactor = getViewportFactor(w, 320, 1920);
  // Height factor for vertical scaling (400px to 1080px)
  const hFactor = getViewportFactor(h, 400, 1080);
  // Combined factor using the smaller dimension for balanced scaling
  const combinedFactor = Math.min(wFactor, hFactor);

  // Carousel X Radius: 100px at minimum, 800px at maximum
  const xRadius = lerp(100, 800, wFactor) * (isExtremelySmall ? 0.6 : 1);

  // Carousel Y Radius: 50px at minimum, 250px at maximum
  const yRadius = lerp(50, 250, hFactor) * (isExtremelySmall ? 0.5 : 1);

  // Speaker Card Size: 60px at minimum, 224px at maximum
  const cardSize = lerp(60, 224, combinedFactor);

  // Navigation Arrow Size: 24px at minimum, 64px at maximum
  const arrowSize = lerp(24, 64, combinedFactor);

  // Floor Glow Size
  const glowWidth = lerp(200, 1200, wFactor);
  const glowHeight = lerp(100, 500, hFactor);

  // Golden Ring Scale
  const ringScale = lerp(0.5, 1, combinedFactor);

  // Title translate Y
  // Title translate Y
  const translateY = h < 600 ? 160 : lerp(120, 220, hFactor);

  // Step angle between speakers (smaller on small screens)
  const stepAngle = lerp(30, 50, wFactor);

  // Scale boost for center item
  const centerScaleBoost = lerp(1.2, 1.6, combinedFactor);

  // Detail panel width
  const panelWidth = lerp(280, 600, wFactor);

  // Detail panel bottom padding
  const panelPaddingBottom = lerp(60, 96, hFactor);

  const nextSlide = () => {
    setStartIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setStartIndex((prev) => prev - 1);
  };

  const centerIndex = Math.floor(visibleCount / 2);

  const handleSpeakerClick = (absoluteIndex: number) => {
    // We want the clicked item to move to the center.
    // The center item is at i = centerIndex.
    // absoluteIndex = startIndex + i
    // So targetStartIndex = absoluteIndex - centerIndex
    setStartIndex(absoluteIndex - centerIndex);
  };

  // --- HOVER HANDLERS ---
  const handleSpeakerEnter = (speaker: any) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredSpeaker(speaker);
  };

  const handleSpeakerLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
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
    <div className="relative w-full h-full">
      {/* DEDICATED SPEAKER DETAILS PANEL - MOVED OUTSIDE TRANSFORM */}
      <AnimatePresence mode="wait">
        {hoveredSpeaker && (
          <div
            className="absolute inset-0 z-[2000] pointer-events-none flex items-end justify-center"
            style={{ paddingBottom: panelPaddingBottom }}
          >
            <motion.div
              key="detail-panel"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="pointer-events-auto max-w-[90vw] max-h-[70vh] overflow-y-auto bg-black/80 backdrop-blur-xl border border-[#d4af37]/40 rounded-xl flex flex-col md:flex-row gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative group"
              style={{
                width: panelWidth,
                padding: `${lerp(12, 32, combinedFactor)}px`,
              }}
              onMouseEnter={handlePanelEnter}
              onMouseLeave={handlePanelLeave}
            >
              {/* Animated Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 to-transparent pointer-events-none animate-pulse" />

              {/* Profile Image (Small Circle) - hide on very small screens */}
              {w >= 640 && (
                <div
                  className="rounded-full border-2 border-[#d4af37] overflow-hidden shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  style={{
                    width: lerp(48, 96, combinedFactor),
                    height: lerp(48, 96, combinedFactor),
                  }}
                >
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
              )}

              {/* Content */}
              <div className="flex-1 text-center md:text-left z-10">
                <motion.div
                  key={hoveredSpeaker.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2
                    className="text-[#d4af37] font-bold font-cinzel tracking-wide mb-1 drop-shadow-md"
                    style={{ fontSize: `${lerp(1, 1.875, combinedFactor)}rem` }}
                  >
                    {hoveredSpeaker.name}
                  </h2>
                  <p
                    className="text-[#a89052] uppercase tracking-widest font-semibold mb-2"
                    style={{ fontSize: `${lerp(0.625, 0.875, combinedFactor)}rem` }}
                  >
                    {hoveredSpeaker.role}
                  </p>
                  <div className="h-px w-full md:w-3/4 bg-gradient-to-r from-[#d4af37]/50 to-transparent mx-auto md:mx-0 mb-3" />
                  <p
                    className="text-white/80 leading-relaxed mb-4 font-light font-sans tracking-wide"
                    style={{ fontSize: `${lerp(0.625, 0.875, combinedFactor)}rem` }}
                  >
                    {hoveredSpeaker.bio}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateY(${translateY}px)`,
        }}
      >
        {/* --- NAVIGATION CONTROLS --- */}
        <div
          className="absolute z-[1000] flex justify-between pointer-events-none"
          style={{
            width: `min(85vw, ${lerp(300, 1100, wFactor)}px)`,
            padding: `0 ${lerp(8, 48, wFactor)}px`,
            top: '55%',
            transform: 'translateY(-50%)',
          }}
        >
          <button
            onClick={prevSlide}
            className="pointer-events-auto rounded-full bg-black/40 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all group backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            style={{ padding: `${lerp(4, 12, combinedFactor)}px` }}
            aria-label="Previous speaker"
          >
            <img
              src={arrowLeft}
              alt="Prev"
              style={{ width: arrowSize, height: arrowSize }}
              className="drop-shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-110"
            />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto rounded-full bg-black/40 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all group backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            style={{ padding: `${lerp(4, 12, combinedFactor)}px` }}
            aria-label="Next speaker"
          >
            <img
              src={arrowRight}
              alt="Next"
              style={{ width: arrowSize, height: arrowSize }}
              className="drop-shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-110"
            />
          </button>
        </div>

        {/* Floor Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute rounded-[100%] bg-amber-500/10 pointer-events-none"
          style={{
            width: glowWidth,
            height: glowHeight,
            filter: `blur(${lerp(40, 80, combinedFactor)}px)`,
            transform: 'rotateX(70deg)',
          }}
        />

        {/* Golden Ring on Floor */}
        <div
          className="absolute border-[2px] border-[#d4af37]/30 rounded-[100%] pointer-events-none shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          style={{
            width: xRadius * 2.2 * ringScale,
            height: yRadius * 2.2 * ringScale,
            transform: 'rotateX(70deg)',
          }}
        />

        <AnimatePresence mode="popLayout">
          {Array.from({ length: visibleCount }).map((_, i) => {
            // Calculate absolute index (unbounded) and data index (wrapped)
            const absoluteIndex = startIndex + i;
            // Handle negative wrapping correctly
            const dataIndex = ((absoluteIndex % data.length) + data.length) % data.length;
            const speaker = data[dataIndex];

            // Position Logic
            // i varies from 0 to visibleCount-1
            const degree = 270 + (i - centerIndex) * stepAngle;
            const radian = (degree * Math.PI) / 180;

            const x = Math.cos(radian) * xRadius;
            const y = Math.sin(radian) * yRadius;

            // Perspective Scale
            const normalizedY = (y + yRadius) / (yRadius * 2);
            let scale = 0.5 + normalizedY * 0.5;
            const zIndex = Math.floor(normalizedY * 100);

            // Center logic
            const isCenter = i === centerIndex;

            // SCALE BOOST for center item (Responsive)
            if (isCenter) {
              scale *= centerScaleBoost;
            }

            return (
              <SpeakerCard
                key={absoluteIndex} // UNIQUE KEY based on absolute position index
                speaker={speaker}
                x={x}
                y={y}
                scale={scale}
                zIndex={zIndex}
                isCenter={isCenter}
                cardSize={cardSize}
                viewport={viewport}
                onMouseEnter={() => handleSpeakerEnter(speaker)}
                onMouseLeave={handleSpeakerLeave}
                onClick={() => handleSpeakerClick(absoluteIndex)}
              />
            );
          })}
        </AnimatePresence>
      </div>
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
  cardSize,
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
          className="relative cursor-pointer"
          style={{ width: cardSize, height: cardSize }}
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
            className="absolute left-1/2 -translate-x-1/2 w-max text-center pointer-events-none"
            style={{ bottom: -cardSize * 0.45 }}
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
                  <h3
                    className="text-[#F4E3A3] font-bold tracking-wider drop-shadow-[0_0_10px_rgba(244,227,163,0.6)] font-cinzel"
                    style={{ fontSize: Math.max(16, cardSize * 0.12) }}
                  >
                    {speaker.name}
                  </h3>
                  <p
                    className="text-[#a89052] uppercase tracking-[0.2em] mt-1 font-semibold"
                    style={{ fontSize: Math.max(10, cardSize * 0.06) }}
                  >
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


