import { motion } from 'framer-motion';
import { useState, useEffect, memo } from 'react';
import completeBg from '../../../assets/partners/complete-bg.webp';

export interface PartnerGroup {
  title: string;
  ring: string;
  color: string;
  partners: { name: string; logo: string }[];
}

export interface GridPartnerData {
  id: number;
  type: 'grid';
  title: string;
  groups: PartnerGroup[];
}

const GridPartnerView = ({ data }: { data: GridPartnerData }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile/tablet screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bgPosition = `center ${data.id * (100 / 3)}%`;

  return (
    <motion.div
      className="relative w-full min-h-screen"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background */}
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

      {/* Header: Fixed Top */}
      <div className="absolute top-0 left-0 right-0 z-50 flex flex-col items-center pt-20 xs:pt-24 sm:pt-28 md:pt-32 pointer-events-none px-4 text-center transition-all duration-300">
      </div>

      {/* Grid Content: Stacks on mobile, Split on desktop */}
      <div
        className={`absolute inset-0 z-40 ${isMobile ? 'overflow-y-auto pt-16 xs:pt-20 sm:pt-24 pb-12 hide-scrollbar' : ''
          }`}
      >
        {data.groups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`flex flex-col items-center w-full ${isMobile
              ? 'relative py-4 xs:py-6 border-b border-white/5 last:border-none'
              : 'absolute left-0 right-0'
              }`}
            style={
              !isMobile
                ? {
                  top: groupIndex === 0 ? '0%' : '50%',
                  height: '50%',
                  justifyContent: 'center',
                  paddingTop: groupIndex === 0 ? '15vh' : '0px', // Fluid vertical padding
                  paddingBottom: groupIndex === 0 ? '0px' : '5vh',
                }
                : {}
            }
          >
            <h2
              className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-heading tracking-wider uppercase mb-4 xs:mb-6 sm:mb-8 text-center relative z-10"
              style={{
                background: `linear-gradient(to bottom, ${group.color} 60%, #4a4a4a 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {group.title}
            </h2>
            {/* Fluid Gaps using vh/vw */}
            <div className="flex flex-wrap justify-center gap-x-[2vw] gap-y-[3vh] px-2 w-full max-w-[98%] xl:max-w-screen-2xl mx-auto">
              {group.partners.map((partner, pIndex) => (
                <div key={pIndex} className="flex flex-col items-center gap-0 group relative">
                  {/* Fluid Ring Sizing using vmin */}
                  <div
                    className="relative will-change-transform"
                    style={{
                      width: isMobile ? '35vw' : '18vmin',
                      height: isMobile ? '35vw' : '18vmin',
                      maxWidth: '260px',
                      minWidth: '100px'
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 30, // Identical to Gold/Standard speed
                        ease: 'linear',
                      }}
                      className="absolute inset-0 w-full h-full"
                      style={{ transformOrigin: '50% 50%' }}
                    >
                      <img
                        src={group.ring}
                        alt="Ring"
                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        loading="eager"
                      />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center p-3 xs:p-4 sm:p-8">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-w-[65%] max-h-[65%] object-contain filter group-hover:brightness-125 transition-all duration-300 drop-shadow-md"
                          loading="eager"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] xs:text-xs sm:text-base md:text-lg font-heading text-[#EFE3A0]/80 tracking-wide text-center -mt-2 sm:-mt-6 transition-colors group-hover:text-[#EFE3A0]">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
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

export default memo(GridPartnerView);
