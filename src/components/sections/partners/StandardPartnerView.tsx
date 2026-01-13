import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, memo } from 'react';
import completeBg from '../../../assets/partners/complete-bg.webp';

// Social Icons
import xIcon from '../../../assets/partners/social-x.svg';
import instaIcon from '../../../assets/partners/social-insta.svg';
import linkedinIcon from '../../../assets/partners/social-linkedin.svg';
import webIcon from '../../../assets/partners/social-web.svg';

export interface StandardPartnerData {
  id: number;
  type: 'standard';
  title: string;
  partnerName: string;
  ring: string;
  logo: string | null;
  description: string[];
  socials: boolean;
  themeColor: string;
  socialLinks?: {
    web?: string;
    linkedin?: string;
    instagram?: string;
    x?: string;
  };
}

const SocialIcon = memo(({ icon, link }: { icon: string; link?: string }) => (
  <motion.a
    href={link || '#'}
    target={link ? '_blank' : '_self'}
    rel={link ? 'noopener noreferrer' : ''}
    whileHover={{ scale: 1.25, filter: 'brightness(1.5)', y: -5 }}
    whileTap={{ scale: 0.95 }}
    className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all ${link ? 'cursor-pointer opacity-90 hover:opacity-100' : 'cursor-default opacity-50'}`}
  >
    <img
      src={icon}
      alt="Social"
      className="w-full h-full object-contain brightness-125 saturate-150"
      loading="eager"
    />
  </motion.a>
));



const StandardPartnerView = ({ data }: { data: StandardPartnerData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCompactDesktop, setIsCompactDesktop] = useState(false);

  // Check for mobile/tablet and compact desktop screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      setIsCompactDesktop(width >= 1024 && width < 1400);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleView = () => {
    if (isMobile && data.logo) {
      setIsHovered(!isHovered);
    }
  };

  const bgPosition = `center ${data.id * (100 / 3)}%`;

  const gradientStyle = {
    background: `linear-gradient(to bottom, ${data.themeColor} 60%, #6E561C 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <motion.div
      className="relative w-full min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background - Optimizing with specific position */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          className="w-full h-full bg-cover transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${completeBg})`,
            backgroundPosition: bgPosition,
            backgroundSize: '100% 400%',
            backgroundRepeat: 'no-repeat',
            filter: 'contrast(1.1) saturate(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/60 z-10" />
      </div>

      {/* Header: Fixed Top -> Absolute (scrolls with section) */}
      <div className="absolute top-0 left-0 right-0 z-50 flex flex-col items-center pt-20 sm:pt-28 md:pt-32 pointer-events-none px-2 sm:px-4 text-center transition-all duration-300">
        {data.title === 'GOLD PARTNER' && (
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading tracking-wider uppercase mb-1 sm:mb-2 md:mb-4 text-[#EFE3A0]">
            PAST PARTNERS
          </h1>
        )}
        <h2
          className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-4xl font-heading tracking-wider uppercase mb-1 sm:mb-2 md:mb-4"
          style={gradientStyle}
        >
          {data.title}
        </h2>
        <motion.h3
          animate={{ opacity: isHovered && data.logo ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-heading tracking-wider uppercase"
          style={gradientStyle}
        >
          {data.partnerName}
        </motion.h3>
      </div>

      {/* Interaction Area */}
      <div
        className={`absolute inset-0 z-40 flex items-center justify-center ${isMobile
          ? 'pt-[18vh] xs:pt-[22vh] md:pt-[25vh] landscape:pt-[6rem]'
          : 'pt-32 lg:pt-40'
          }`}
      >
        <div
          className={`relative w-full max-w-7xl flex items-center justify-center ${isMobile ? 'flex-col gap-2xs sm:gap-4' : 'gap-8 lg:gap-16'
            }`}
        >
          {/* Ring Group - Clickable on Mobile */}
          <motion.div
            className="flex items-center justify-center cursor-pointer relative"
            // Animation: Mobile = Shift UP, Desktop = Shift LEFT
            // Using percentages relative to viewport width for fluid shifting
            animate={
              isHovered && data.logo
                ? isMobile
                  ? { y: 0, scale: 0.85 }
                  : { x: '-15vw' } // Fluid shift left
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onMouseEnter={() => {
              if (!isMobile && data.logo) setIsHovered(true);
            }}
            onClick={toggleView}
          >
            {/* Mobile Hint */}
            {isMobile && !isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-8 xs:-bottom-10 text-[#EFE3A0]/60 text-[9px] xs:text-[10px] font-heading tracking-widest uppercase"
              >
                Tap to view details
              </motion.div>
            )}

            {/* Adjust Ring Size for Mobile vs Desktop */}
            {/* FLUID RESPONSIVENESS: Using vmin to scale with the smallest viewport dimension */}
            <div
              className="relative will-change-transform object-contain"
              style={{
                width: isMobile ? '60vmin' : '45vmin',
                height: isMobile ? '60vmin' : '45vmin',
                maxWidth: '600px', // Upper bound
                minWidth: '280px', // Lower bound
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 30,
                  ease: 'linear',
                }}
                className="absolute inset-0 w-full h-full"
                style={{ transformOrigin: '50% 50%' }}
              >
                <img
                  src={data.ring}
                  alt="Ring"
                  className="w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>

              {/* Logo */}
              {data.logo && (
                <div
                  className="absolute left-1/2 top-1/2 w-[50%] h-[50%] flex items-center justify-center"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <div className="relative w-full h-full flex items-center justify-center p-2">
                    <img
                      src={data.logo}
                      alt="Logo"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Details (Visible on Hover/Click) */}
          <AnimatePresence>
            {isHovered && data.logo && (
              <motion.div
                // Animation: Mobile = Fade In Bottom, Desktop = Fade In Right
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
                animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                exit={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className={`flex flex-col gap-3 sm:gap-6 text-left ${isMobile
                  ? 'w-[90%] max-w-2xl mx-auto -mt-6 px-4 max-h-[40vh] overflow-y-auto hide-scrollbar bg-neutral-950/40 backdrop-blur-sm rounded-xl p-4'
                  : 'max-w-xl'
                  }`}
              >
                <div className="space-y-2 sm:space-y-6">
                  <h4
                    className="text-lg xs:text-xl sm:text-3xl font-heading uppercase tracking-widest border-b pb-2"
                    style={{ color: data.themeColor, borderColor: `${data.themeColor}33` }}
                  >
                    {data.partnerName}
                  </h4>

                  {data.description.map((desc: string, i: number) => (
                    <p
                      key={i}
                      className="text-[#FFEAA4] font-subheading leading-relaxed text-xs xs:text-sm sm:text-base md:text-lg text-justify opacity-90"
                    >
                      {desc}
                    </p>
                  ))}
                </div>

                <div
                  className="w-full h-px my-2"
                  style={{
                    background: `linear-gradient(to right, ${data.themeColor}80, ${data.themeColor}33, transparent)`,
                  }}
                />

                {/* Social Links */}
                {data.socials && (
                  <div className="flex items-center justify-end gap-4 sm:gap-6 pb-2 sm:pb-0">
                    {data.socialLinks?.x && <SocialIcon icon={xIcon} link={data.socialLinks?.x} />}
                    {data.socialLinks?.instagram && <SocialIcon icon={instaIcon} link={data.socialLinks?.instagram} />}
                    {data.socialLinks?.linkedin && <SocialIcon icon={linkedinIcon} link={data.socialLinks?.linkedin} />}
                    {data.socialLinks?.web && <SocialIcon icon={webIcon} link={data.socialLinks?.web} />}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Styles for scrollbar hiding if needed */}
      <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>
    </motion.div>
  );
};

export default memo(StandardPartnerView);
