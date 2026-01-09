
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PageNavigation } from '../components/navigation/PageNavigation';

// --- ASSETS ---
import bgImage from '../assets/speakers/bg.webp';
import ringImage from '../assets/speakers/ring.webp';

// --- DATA ---
const speakers = [
  { id: 1, name: "Dr. Rachel Green", role: "Keynote Speaker", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500", tag: "@rachel_ai" },
  { id: 2, name: "David Chen", role: "Judge", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500", tag: "@chen_tech" },
  { id: 3, name: "Sarah Miller", role: "Mentor", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500", tag: "@sarahm_ux" },
  { id: 4, name: "James Wilson", role: "Head Judge", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500", tag: "@jwilson_dev" },
  { id: 5, name: "Emily White", role: "Speaker", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500", tag: "@emily_design" },
  { id: 6, name: "Michael Ross", role: "Judge", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500", tag: "@mross_vc" },
  { id: 7, name: "Anita Patel", role: "Mentor", image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=500", tag: "@anita_code" },
];

export function SpeakersPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-cinzel">
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Chamber" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[#0a0a0a]/30" />
      </div>

      {/* Title */}
      <div className="absolute top-16 md:top-24 left-0 right-0 z-20 text-center pointer-events-none px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl lg:text-6xl text-[#EFE3A0] font-bold tracking-widest uppercase drop-shadow-[0_4px_15px_rgba(239,227,160,0.4)]"
          style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
        >
          Past Speakers & Judges
        </motion.h1>
      </div>

      {/* 3D Floor Container */}
      <div className="absolute inset-0 top-0 flex items-center justify-center perspective-[1200px] overflow-hidden">
        <FloorEllipse />
      </div>

      <PageNavigation />
    </div>
  );
}

function FloorEllipse() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Matches the reference image's wide semi-circle layout
  // Adjust xRadius to spread them out appropriately
  const xRadius = isMobile ? window.innerWidth * 0.40 : 750;
  const yRadius = isMobile ? 120 : 250;



  return (
    <div className={`relative w-full h-full flex items-center justify-center ${isMobile ? 'translate-y-20' : 'translate-y-32'}`} style={{ transformStyle: 'preserve-3d' }}>

      {/* Golden Floor Glow - Matching Reference */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className={`absolute rounded-[100%] bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-transparent blur-[60px] pointer-events-none`}
        style={{
          width: isMobile ? '300px' : '1000px',
          height: isMobile ? '150px' : '400px',
          transform: 'rotateX(60deg)',
          boxShadow: 'inset 0 0 80px rgba(212, 175, 55, 0.3), 0 0 50px rgba(212, 175, 55, 0.2)'
        }}
      />

      {/* Golden Ellipse Ring Path */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute border-[3px] border-amber-500/50 rounded-[100%] pointer-events-none"
        style={{
          width: xRadius * 2.1,
          height: yRadius * 2.1,
          transform: 'rotateX(60deg)',
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.2)'
        }}
      />

      {/* Secondary Inner Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute border border-amber-500/30 rounded-[100%] pointer-events-none"
        style={{
          width: xRadius * 1.8,
          height: yRadius * 1.8,
          transform: 'rotateX(60deg)'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute border-[3px] border-amber-500/50 rounded-[100%] pointer-events-none"
        style={{
          zIndex: 60,
          width: xRadius * 2.1,
          height: yRadius * 2.1,
          transform: 'rotateX(60deg)',
          clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)',
          boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.2)'
        }}
      />

      {speakers.map((speaker, index) => {
        let x, y, scale, zIndex;

        // HEXAGON ARRANGEMENT (6 + 1 Center)
        if (index < 6) {
          // Outer Hexagon Ring
          const angleDeg = index * 60; // 0, 60, 120, 180, 240, 300
          const radian = (angleDeg * Math.PI) / 180;
          x = Math.cos(radian) * xRadius;
          y = Math.sin(radian) * yRadius;
        } else {
          // Center Speaker (7th)
          x = 0;
          y = -40; // Moved up to sit 'between' the rings
        }

        // Depth sorting and scaling
        // y ranges from -yRadius (back) to +yRadius (front)
        // Normalize Y to 0..1 for ring items. Center is 0.5.
        // We use a slightly different normalization to handle the center item correctly relative to front/back items.

        const normalizedY = (y + yRadius) / (yRadius * 2);

        // Scale logic: 
        // Back items (y < 0) -> smaller
        // Front items (y > 0) -> larger
        // Center item (y=0) -> medium (but maybe slightly larger to emphasize centrality?)
        // Let's stick to depth-based scaling for consistency.

        scale = 0.65 + (normalizedY * 0.35);

        // Boost center item scale slightly if desired, or keep uniform 3d perspective
        if (index === 6) scale *= 1.1;

        zIndex = Math.floor(normalizedY * 100);

        return (
          <SpeakerCard
            key={speaker.id}
            speaker={speaker}
            x={x}
            y={y}
            scale={scale}
            zIndex={zIndex}
            delay={index * 0.1}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
}

function SpeakerCard({ speaker, x, y, scale, zIndex, delay, isMobile }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      initial={{ opacity: 0, y: -300, scale: 0 }}
      animate={{
        opacity: 1,
        x: x,
        y: y,
        scale: scale,
        zIndex: isHovered ? 1000 : zIndex
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        type: "spring",
        stiffness: 50,
        damping: 20
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative group">
        {/* Reflection/Shadow on Floor */}
        <motion.div
          className="absolute top-[85%] left-0 right-0 h-[80%] opacity-30 pointer-events-none origin-top"
          style={{
            transform: `scaleY(-1) skewX(${x * -0.02}deg)`,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
          }}
        >
          <div className="w-full h-full bg-black/50 blur-[4px] rounded-full transform scale-x-75" />
        </motion.div>

        {/* Main Card */}
        <motion.div
          className={`${isMobile ? 'w-28 h-28' : 'w-48 h-48'} relative cursor-pointer`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.15, y: -15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Ring Frame */}
          <div className="absolute inset-[-18%] z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            <img src={ringImage} alt="Frame" className="w-full h-full object-contain filter brightness-110 contrast-110" />
          </div>

          {/* Image Mask */}
          <div className="absolute inset-[6%] rounded-full overflow-hidden bg-neutral-900 z-10 box-border border-2 border-[#5c4a2e]">
            <motion.img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1,
                filter: isHovered ? 'grayscale(0%) sepia(0%)' : 'grayscale(100%) sepia(25%)'
              }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: isMobile ? 100 : 130, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute left-1/2 -translate-x-1/2 z-50 w-[200px]"
              >
                <div className="bg-black/90 backdrop-blur-xl border border-[#d4af37]/60 p-4 rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] text-center">
                  <h3 className="text-[#EFE3A0] font-bold text-lg leading-tight mb-2 font-cinzel">{speaker.name}</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-2" />
                  <p className="text-[#d4af37]/80 text-xs uppercase tracking-widest">{speaker.role}</p>
                  <p className="text-white/60 text-[10px] mt-1">{speaker.tag}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
