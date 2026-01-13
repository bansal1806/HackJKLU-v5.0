import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Assets
import completeBg from '../../../assets/partners/complete-bg.webp';

import StandardPartnerView from './StandardPartnerView';
import GridPartnerView from './GridPartnerView';

import goldRing from '../../../assets/partners/gold-ring.webp';
import silverRing from '../../../assets/partners/silver-ring.webp';
import bronzeRing from '../../../assets/partners/bronze-ring.webp';

import entionLogo from '../../../assets/partners/ention-logo.webp';
import wsCubeLogo from '../../../assets/partners/ws.cubetech-logo.webp';

// Silver Partners
import gfgLogo from '../../../assets/partners/geeksforgeeks-logo.webp';
import devfolioLogo from '../../../assets/partners/devfolio-logo.webp';
import ethIndiaLogo from '../../../assets/partners/ethindia-logo.webp';

// Bronze Partners
import balsamiqLogo from '../../../assets/partners/balsamiq-logo.webp';
import fluxorLogo from '../../../assets/partners/fluxor-logo.webp';
import blockPenLogo from '../../../assets/partners/blockpen-logo.webp';

// Community Partners
import gdgLogo from '../../../assets/partners/gdg.webp';
import codingNinjasLogo from '../../../assets/partners/coding-ninjas.webp';
import devStationLogo from '../../../assets/partners/dev-station.webp';
import devArmyLogo from '../../../assets/partners/devarmy.webp';
import iiitDelhiLogo from '../../../assets/partners/iiit_delhi.webp';
import iitDelhiLogo from '../../../assets/partners/iit_delhi.webp';
import iitKharagpurLogo from '../../../assets/partners/iit_kharagpur.webp';
import iitPatnaLogo from '../../../assets/partners/iit_patna.webp';

type Partner = {
  name: string;
  logo: string;
};

type PartnerGroup = {
  title: string;
  ring: string;
  color: string;
  partners: Partner[];
};

type StandardPartnerData = {
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
};

type GridPartnerData = {
  id: number;
  type: 'grid';
  title: string;
  groups: PartnerGroup[];
};

type CommunityPartnerData = {
  id: number;
  type: 'community';
  title: string;
  partnerName: string; // Used for "COMMUNITY PARTNERS" title or similar
  ring: string; // Will hold the table image path
  bgImage: string; // NEW field for the background image
  partners: { name: string; logo: string }[]; // List of partners for the slots
  logo: null;
  description: string[];
  socials: boolean;
  themeColor: string;
};

type PartnerData = StandardPartnerData | GridPartnerData | CommunityPartnerData;

const partnersData: PartnerData[] = [
  {
    id: 0,
    type: 'standard',
    title: 'GOLD PARTNER',
    partnerName: 'ENTION',
    ring: goldRing,
    logo: entionLogo,
    description: [
      'Ention is a leading innovator in digital solutions, empowering businesses with cutting-edge technology and advanced automation tools to optimize operations and drive growth. It was incorporated on 28th Jan, 2022 in India to provide innovative laptop products, helping users stay connected with the latest technology trends.',
      'Focused on delivering customer-centric computing solutions, Ention stands apart with a strong emphasis on service and support. Ention is revolutionizing the laptop experience with high-performance devices designed for creators, gamers, and professionals.',
    ],
    socials: true,
    themeColor: '#FFEAA4', // Gold
    socialLinks: {
      web: 'https://ention.in/',
      linkedin: 'https://www.linkedin.com/company/entiontechnology/',
      instagram: 'https://www.instagram.com/entiontech?igsh=ZHA3OGNxZDNxYXcx',
    },
  },
  {
    id: 1,
    type: 'standard',
    title: 'PRE-HACKATHON PARTNER',
    partnerName: 'WSCUBE TECH',
    ring: goldRing,
    logo: wsCubeLogo,
    description: [
      'WSCube is a Hybrid Upskilling Edtech, develops and disseminates Tech-powered Career Acceleration Programs and Job Oriented Professional curated for Aspirants of Bharat, readying them for Global workforce opportunities.',
      'WS Cube Tech is providing us with knowledge about HTML, CSS, JS, React, git and Github as part of pre-hackathon bootcamp.',
    ],
    socials: true,
    themeColor: '#FFEAA4', // Gold
    socialLinks: {
      web: 'https://www.wscubetech.com/',
      linkedin: 'https://www.linkedin.com/company/wscubetechindia/',
      instagram: 'https://www.instagram.com/wscubetechindia?igsh=cjJid2hxa3c3MjF3',
      x: 'https://share.google/GE3VTFtczttKcO33Z',
    },
  },
  {
    id: 2,
    type: 'grid',
    title: 'SILVER & BRONZE PARTNERS',
    groups: [
      {
        title: 'SILVER PARTNERS',
        ring: silverRing,
        color: '#C0C0C0',
        partners: [
          { name: 'Geeks for Geeks', logo: gfgLogo },
          { name: 'Devfolio', logo: devfolioLogo },
          { name: 'ETHIndia', logo: ethIndiaLogo },
        ],
      },
      {
        title: 'BRONZE PARTNERS',
        ring: bronzeRing,
        color: '#CD7F32',
        partners: [
          { name: 'Balsamiq', logo: balsamiqLogo },
          { name: 'Fluxor', logo: fluxorLogo },
          { name: 'BlockPen', logo: blockPenLogo },
        ],
      },
    ],
  },
  {
    id: 3,
    type: 'community',
    title: 'COMMUNITY PARTNERS',
    partnerName: '',
    ring: '/community_table.webp',
    bgImage: completeBg, // Explicitly pass the background
    partners: [
      { name: 'GDG', logo: gdgLogo },
      { name: 'Coding Ninjas', logo: codingNinjasLogo },
      { name: 'Dev Station', logo: devStationLogo },
      { name: 'Dev Army', logo: devArmyLogo },
      { name: 'IIIT Delhi', logo: iiitDelhiLogo },
      { name: 'IIT Delhi', logo: iitDelhiLogo },
      { name: 'IIT Kharagpur', logo: iitKharagpurLogo },
      { name: 'IIT Patna', logo: iitPatnaLogo },
    ],
    logo: null,
    description: [],
    socials: false,
    themeColor: '#CD7F32',
  },
];

export default function PartnersSections() {
  return (
    <div className="bg-neutral-950 text-neutral-100 h-screen font-heading overflow-y-auto overflow-x-hidden hide-scrollbar">
      {partnersData.map((section) => (
        <div key={section.id} className="relative w-full min-h-screen shrink-0 flex flex-col">
          <PartnerSection data={section} />
        </div>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap');
        
        /* Custom scrollbar hiding */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function PartnerSection({ data }: { data: PartnerData }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState<{ name: string; logo: string } | null>(null);

  // Check for mobile/tablet screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Type guard ensures 'id' exists on all union types
  const bgPosition = `center ${data.id * (100 / 3)}%`;

  // --- GRID LAYOUT (Silver & Bronze) ---
  if (data.type === 'grid') {
    return <GridPartnerView data={data} />;
  }

  // --- COMMUNITY PARTNERS LAYOUT ---
  if (data.type === 'community') {
    const logoSlots = [
      // User manually positioned slots
      { top: '5.5%', left: '50.5%', transform: 'translate(-50%, 0)' }, // 12:00 (Top)
      { top: '20%', right: '12%', transform: 'translate(0, 0)' }, // 1:30
      { top: '52%', right: '4.5%', transform: 'translate(0, -50%)' }, // 3:00 (Right)
      { bottom: '17%', right: '17.5%', transform: 'translate(0, 0)' }, // 4:30
      { bottom: '5.5%', left: '49.5%', transform: 'translate(-50%, 0)' }, // 6:00 (Bottom)
      { bottom: '17%', left: '16.5%', transform: 'translate(0, 0)' }, // 7:30
      { top: '52%', left: '4%', transform: 'translate(0, -50%)' }, // 9:00 (Left)
      { top: '20%', left: '11%', transform: 'translate(0, 0)' }, // 10:30
    ];
    // Changed fixed inset-0 to relative w-full min-h-screen for consistent scrolling
    return (
      <motion.div
        className="relative w-full min-h-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background (Same as Standard to preserve BG) */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div
            className="w-full h-full bg-cover transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${data.bgImage || completeBg})`,
              backgroundPosition: bgPosition,
              // Unified background size for consistency
              backgroundSize: '100% 400%',
              backgroundRepeat: 'no-repeat',
              filter: 'contrast(1.1) saturate(1.1)',
            }}
          />

          <div className="absolute inset-0 bg-neutral-950/60 z-10" />
        </div>

        {/* Header */}
        <div
          className={`absolute top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4 text-center ${isMobile ? 'pt-20' : 'pt-8 sm:pt-12 md:pt-16 lg:pt-24'}`}
        >
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading tracking-wider uppercase mb-1 sm:mb-2 md:mb-4"
            style={{
              background: `linear-gradient(to bottom, ${data.themeColor || '#CD7F32'} 60%, #6E561C 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {data.title}
          </h1>
        </div>

        {/* Interactive Table Area */}
        <div
          className={`absolute inset-0 z-40 flex flex-col items-center justify-center ${isMobile ? 'pt-24 xs:pt-28 sm:pt-32' : 'pt-24'
            }`}
        >
          <motion.div
            className="relative w-[92vw] h-[92vw] max-w-[340px] max-h-[340px] xs:w-[85vw] xs:h-[85vw] sm:max-w-none sm:max-h-none sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] mt-8 xs:mt-12 sm:mt-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {/* Main Table Image */}
            <img
              src={data.ring} // Using 'ring' field for the table image
              alt="Community Table"
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(205,127,50,0.3)]"
            />

            {/* Logo Slots */}
            {logoSlots.map((pos, index) => {
              const partner = data.partners && data.partners[index];
              return (
                <div
                  key={index}
                  className="absolute w-[14%] h-[14%] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] rounded-full flex items-center justify-center cursor-pointer z-50 group"
                  style={pos}
                  onMouseEnter={() => partner && !isMobile && setHoveredPartner(partner)}
                  onMouseLeave={() => !isMobile && setHoveredPartner(null)}
                  // Mobile Tap Support
                  onClick={() =>
                    partner && setHoveredPartner(partner === hoveredPartner ? null : partner)
                  }
                >
                  {partner ? (
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className={`w-[60%] h-[60%] object-contain drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(239,227,160,0.8)] group-hover:brightness-125 ${partner.name === 'IIIT Delhi' ? 'scale-110 group-hover:scale-125' : partner.name === 'IIT Delhi' ? 'scale-125 group-hover:scale-140 object-cover' : 'group-hover:scale-125'}`}
                      />
                    </motion.div>
                  ) : (
                    <div className="w-full h-full rounded-full bg-black/20" />
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Footer / Hover Name Display */}
          <div className="h-16 xs:h-20 sm:h-24 mt-4 sm:mt-8 flex flex-col items-center justify-center text-center transition-opacity duration-300 px-4">
            <AnimatePresence mode="wait">
              {hoveredPartner ? (
                <motion.div
                  key={hoveredPartner.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-gold-400 font-heading tracking-widest text-[10px] xs:text-xs sm:text-sm md:text-base uppercase opacity-80">
                    Community Partner
                  </span>
                  <span className="text-base xs:text-lg sm:text-xl md:text-3xl lg:text-4xl font-heading text-[#EFE3A0] uppercase tracking-wider">
                    {hoveredPartner.name}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="text-white/30 font-heading text-[10px] xs:text-xs sm:text-sm md:text-base italic"
                >
                  {isMobile ? 'Tap to reveal...' : 'Hover over the sigils...'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- STANDARD LAYOUT (Gold & Pre-Hackathon) ---
  return <StandardPartnerView data={data} />;
}
