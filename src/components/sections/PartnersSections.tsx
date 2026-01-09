
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

// Assets
import completeBg from '../../assets/partners/complete-bg.jpg';

import goldRing from '../../assets/partners/gold-ring.png';
import silverRing from '../../assets/partners/silver-ring.png';
import bronzeRing from '../../assets/partners/bronze-ring.png';

import entionLogo from '../../assets/partners/ention-logo.png';
import wsCubeLogo from '../../assets/partners/ws.cubetech-logo.png';

// Silver Partners
import gfgLogo from '../../assets/partners/geeksforgeeks-logo.png';
import devfolioLogo from '../../assets/partners/devfolio-logo.png';
import ethIndiaLogo from '../../assets/partners/ethindia-logo.png';

// Bronze Partners
import balsamiqLogo from '../../assets/partners/balsamiq-logo.png';
import fluxorLogo from '../../assets/partners/fluxor-logo.png';
import blockPenLogo from '../../assets/partners/blockpen-logo.png';

import xIcon from '../../assets/partners/social-x.svg';
import instaIcon from '../../assets/partners/social-insta.svg';
import linkedinIcon from '../../assets/partners/social-linkedin.svg';
import webIcon from '../../assets/partners/social-web.svg';

// Community Partners
import gdgLogo from '../../assets/partners/gdg.webp';
import codingNinjasLogo from '../../assets/partners/coding-ninjas.webp';
import devStationLogo from '../../assets/partners/dev-station.webp';
import devArmyLogo from '../../assets/partners/devarmy.webp';
import iiitDelhiLogo from '../../assets/partners/iiit_delhi.webp';
import iitDelhiLogo from '../../assets/partners/iit_delhi.webp';
import iitKharagpurLogo from '../../assets/partners/iit_kharagpur.webp';
import iitPatnaLogo from '../../assets/partners/iit_patna.webp';

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
    type: "standard";
    title: string;
    partnerName: string;
    ring: string;
    logo: string | null;
    description: string[];
    socials: boolean;
    themeColor: string;
};

type GridPartnerData = {
    id: number;
    type: "grid";
    title: string;
    groups: PartnerGroup[];
};

type CommunityPartnerData = {
    id: number;
    type: "community";
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
        type: "standard",
        title: "GOLD PARTNER",
        partnerName: "ENTION",
        ring: goldRing,
        logo: entionLogo,
        description: [
            "Ention is a leading innovator in digital solutions, empowering businesses with cutting-edge technology and advanced automation tools to optimize operations and drive growth. It was incorporated on 28th Jan, 2022 in India to provide innovative laptop products, helping users stay connected with the latest technology trends.",
            "Focused on delivering customer-centric computing solutions, Ention stands apart with a strong emphasis on service and support. Ention is revolutionizing the laptop experience with high-performance devices designed for creators, gamers, and professionals."
        ],
        socials: true,
        themeColor: '#FFEAA4' // Gold
    },
    {
        id: 1,
        type: "standard",
        title: "PRE-HACKATHON PARTNER",
        partnerName: "WSCUBE TECH",
        ring: goldRing,
        logo: wsCubeLogo,
        description: [
            "WSCube is a Hybrid Upskilling Edtech, develops and disseminates Tech-powered Career Acceleration Programs and Job Oriented Professional curated for Aspirants of Bharat, readying them for Global workforce opportunities.",
            "WS Cube Tech is providing us with knowledge about HTML, CSS, JS, React, git and Github as part of pre-hackathon bootcamp."
        ],
        socials: true,
        themeColor: '#FFEAA4' // Gold
    },
    {
        id: 2,
        type: "grid",
        title: "SILVER & BRONZE PARTNERS",
        groups: [
            {
                title: "SILVER PARTNERS",
                ring: silverRing,
                color: "#C0C0C0",
                partners: [
                    { name: "Geeks for Geeks", logo: gfgLogo },
                    { name: "Devfolio", logo: devfolioLogo },
                    { name: "ETHIndia", logo: ethIndiaLogo }
                ]
            },
            {
                title: "BRONZE PARTNERS",
                ring: bronzeRing,
                color: "#CD7F32",
                partners: [
                    { name: "Balsamiq", logo: balsamiqLogo },
                    { name: "Fluxor", logo: fluxorLogo },
                    { name: "BlockPen", logo: blockPenLogo }
                ]
            }
        ]
    },
    {
        id: 3,
        type: "community",
        title: "COMMUNITY PARTNERS",
        partnerName: "",
        ring: "/community_table.webp",
        bgImage: completeBg, // Explicitly pass the background
        partners: [
            { name: "GDG", logo: gdgLogo },
            { name: "Coding Ninjas", logo: codingNinjasLogo },
            { name: "Dev Station", logo: devStationLogo },
            { name: "Dev Army", logo: devArmyLogo },
            { name: "IIIT Delhi", logo: iiitDelhiLogo },
            { name: "IIT Delhi", logo: iitDelhiLogo },
            { name: "IIT Kharagpur", logo: iitKharagpurLogo },
            { name: "IIT Patna", logo: iitPatnaLogo },
        ],
        logo: null,
        description: [],
        socials: false,
        themeColor: '#CD7F32'
    }
];

export default function PartnersSections() {
    const [currentSection, setCurrentSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const switchSection = useCallback((nextSection: number) => {
        if (isAnimating || nextSection === currentSection) return;
        setIsAnimating(true);
        setCurrentSection(nextSection);
        setTimeout(() => setIsAnimating(false), 1000);
    }, [isAnimating, currentSection]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isAnimating) return;
            if (e.deltaY > 0 && currentSection < partnersData.length - 1) {
                switchSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                switchSection(currentSection - 1);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isAnimating) return;
            if (e.key === 'ArrowDown' && currentSection < partnersData.length - 1) {
                switchSection(currentSection + 1);
            } else if (e.key === 'ArrowUp' && currentSection > 0) {
                switchSection(currentSection - 1);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSection, isAnimating, switchSection]);

    return (
        <div ref={containerRef} className="relative bg-neutral-950 text-neutral-100 min-h-screen overflow-hidden font-heading">

            {/* Section Navigation Indicators */}
            <div className="fixed right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 sm:gap-4 pointer-events-auto">
                {partnersData.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => switchSection(section.id)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 transition-all duration-300 ${currentSection === section.id
                            ? 'bg-gold-500 border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                            : 'bg-transparent border-neutral-500 hover:border-gold-500/60'
                            }`}
                        aria-label={`Go to section ${section.id + 1}`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <PartnerSection
                    key={partnersData[currentSection].id}
                    data={partnersData[currentSection]}
                />
            </AnimatePresence>

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
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile/tablet screen size
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const bgPosition = `center ${data.id * (100 / 3)}%`;

    // --- GRID LAYOUT (Silver & Bronze) ---
    if (data.type === 'grid') {
        return (
            <motion.div
                className="fixed inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <div
                        className="w-full h-full bg-cover transition-all duration-1000 ease-in-out"
                        style={{
                            backgroundImage: `url(${completeBg})`,
                            backgroundPosition: bgPosition,
                            filter: 'contrast(1.1) saturate(1.1)'
                        }}
                    />
                    <div className="absolute inset-0 bg-neutral-950/60 z-10" />
                </div>

                {/* Grid Content: Stacks on mobile, Split on desktop */}
                <div className={`fixed inset-0 z-40 ${isMobile ? 'overflow-y-auto pt-20 pb-20' : ''}`}>
                    {data.groups.map((group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className={`flex flex-col items-center w-full ${isMobile
                                ? 'relative py-12'
                                : 'absolute left-0 right-0'
                                }`}
                            style={!isMobile ? {
                                top: groupIndex === 0 ? '0%' : '50%',
                                height: '50%',
                                justifyContent: 'center',
                                paddingTop: groupIndex === 0 ? '120px' : '0px',
                                paddingBottom: groupIndex === 0 ? '0px' : '40px'
                            } : {}}
                        >
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl font-heading tracking-wider uppercase mb-6 sm:mb-8 md:mb-10 text-center"
                                style={{
                                    background: `linear-gradient(to bottom, ${group.color} 60%, #4a4a4a 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                {group.title}
                            </h2>
                            <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-14 lg:gap-20 px-4">
                                {group.partners.map((partner, pIndex) => (
                                    <div key={pIndex} className="flex flex-col items-center gap-0 group">
                                        <div className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 30,
                                                    ease: "linear"
                                                }}
                                                className="absolute inset-0 w-full h-full"
                                                style={{ transformOrigin: '50% 50%' }}
                                            >
                                                <img
                                                    src={group.ring}
                                                    alt="Ring"
                                                    className="w-full h-full object-contain"
                                                />
                                            </motion.div>
                                            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-10">
                                                <img
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    className="max-w-[55%] max-h-[55%] object-contain filter group-hover:brightness-125 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                        <span className="text-sm sm:text-base md:text-xl font-heading text-[#EFE3A0]/80 tracking-wide text-center -mt-6 sm:-mt-8 md:-mt-10">
                                            {partner.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    // --- COMMUNITY PARTNERS LAYOUT ---
    if (data.type === 'community') {
        const [hoveredPartner, setHoveredPartner] = useState<{ name: string; logo: string } | null>(null);

        const logoSlots = [
            // User manually positioned slots
            { top: '5.5%', left: '50.5%', transform: 'translate(-50%, 0)' },   // 12:00 (Top)
            { top: '20%', right: '12%', transform: 'translate(0, 0)' },    // 1:30
            { top: '52%', right: '4.5%', transform: 'translate(0, -50%)' },  // 3:00 (Right)
            { bottom: '17%', right: '17.5%', transform: 'translate(0, 0)' }, // 4:30
            { bottom: '5.5%', left: '49.5%', transform: 'translate(-50%, 0)' },// 6:00 (Bottom)
            { bottom: '17%', left: '16.5%', transform: 'translate(0, 0)' }, // 7:30
            { top: '52%', left: '4%', transform: 'translate(0, -50%)' },   // 9:00 (Left)
            { top: '20%', left: '11%', transform: 'translate(0, 0)' }      // 10:30
        ];

        return (
            <motion.div
                className="fixed inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background (Same as Standard to preserve BG) */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <div
                        className="w-full h-full bg-cover transition-all duration-1000 ease-in-out"
                        style={{
                            backgroundImage: `url(${data.bgImage || completeBg})`,
                            backgroundPosition: bgPosition,
                            filter: 'contrast(1.1) saturate(1.1)'
                        }}
                    />
                    <div className="absolute inset-0 bg-neutral-950/60 z-10" />
                </div>

                {/* Header */}
                <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-8 sm:pt-12 md:pt-16 lg:pt-24 pointer-events-none px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading tracking-wider uppercase mb-1 sm:mb-2 md:mb-4" style={{ color: '#EFE3A0' }}>
                        PAST PARTNERS
                    </h1>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-heading tracking-wider uppercase mb-1 sm:mb-2 md:mb-4"
                        style={{
                            background: `linear-gradient(to bottom, ${data.themeColor || '#CD7F32'} 60%, #6E561C 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                        {data.title}
                    </h2>
                </div>

                {/* Interactive Table Area */}
                <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${isMobile ? 'pt-32' : 'pt-24'}`}>
                    <motion.div
                        className="relative w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] mt-12"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
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
                                    className="absolute w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] rounded-full flex items-center justify-center cursor-pointer z-50 group"
                                    style={pos}
                                    onMouseEnter={() => partner && setHoveredPartner(partner)}
                                    onMouseLeave={() => setHoveredPartner(null)}
                                >
                                    {partner ? (
                                        <motion.div
                                            className="w-full h-full flex items-center justify-center"
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
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
                    <div className="h-20 sm:h-24 mt-4 sm:mt-8 flex flex-col items-center justify-center text-center transition-opacity duration-300">
                        <AnimatePresence mode="wait">
                            {hoveredPartner ? (
                                <motion.div
                                    key={hoveredPartner.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col items-center gap-1"
                                >
                                    <span className="text-gold-400 font-heading tracking-widest text-sm sm:text-base uppercase opacity-80">
                                        Community Partner
                                    </span>
                                    <span className="text-xl sm:text-3xl md:text-4xl font-heading text-[#EFE3A0] uppercase tracking-wider">
                                        {hoveredPartner.name}
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    className="text-white/30 font-heading text-sm sm:text-base italic"
                                >
                                    Hover over the sigils...
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </motion.div>
        );
    }

    // --- STANDARD LAYOUT (Gold & Pre-Hackathon) ---
    const gradientStyle = {
        background: `linear-gradient(to bottom, ${data.themeColor} 60%, #6E561C 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };

    return (
        <motion.div
            className="fixed inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div
                    className="w-full h-full bg-cover transition-all duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `url(${completeBg})`,
                        backgroundPosition: bgPosition,
                        filter: 'contrast(1.1) saturate(1.1)'
                    }}
                />
                <div className="absolute inset-0 bg-neutral-950/60 z-10" />
            </div>

            {/* Header: Fixed Top */}
            <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-8 sm:pt-12 md:pt-16 lg:pt-24 pointer-events-none px-4 text-center">
                <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading tracking-wider uppercase mb-1 sm:mb-2 md:mb-4"
                    style={{ color: '#EFE3A0' }}
                >
                    PAST PARTNERS
                </h1>
                <h2
                    className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-heading tracking-wider uppercase mb-1 sm:mb-2 md:mb-4"
                    style={gradientStyle}
                >
                    {data.title}
                </h2>
                <motion.h3
                    animate={{ opacity: isHovered && data.logo ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-heading tracking-wider uppercase"
                    style={gradientStyle}
                >
                    {data.partnerName}
                </motion.h3>
            </div>

            {/* Interaction Area */}
            <div className={`fixed inset-0 z-40 flex items-center justify-center ${isMobile ? 'pt-44' : ''}`}>
                <div className={`relative w-full max-w-7xl flex items-center justify-center ${isMobile ? 'flex-col gap-8' : 'gap-16'}`}>

                    {/* Ring Group */}
                    <motion.div
                        className="flex items-center justify-center cursor-pointer"
                        // Animation: Mobile = Shift UP, Desktop = Shift LEFT
                        animate={
                            isHovered && data.logo
                                ? (isMobile ? { y: -60 } : { x: -300 })
                                : { x: 0, y: 0 }
                        }
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        onMouseEnter={() => { if (data.logo) setIsHovered(true); }}
                    >
                        {/* Adjust Ring Size for Mobile vs Desktop */}
                        <div className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 30,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 w-full h-full"
                                style={{ transformOrigin: '50% 50%' }}
                            >
                                <img
                                    src={data.ring}
                                    alt="Ring"
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>

                            {/* Logo */}
                            {data.logo && (
                                <div
                                    className="absolute left-1/2 top-1/2 w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] flex items-center justify-center"
                                    style={{ transform: 'translateX(-50%) translateY(-50%)' }}
                                >
                                    <img
                                        src={data.logo}
                                        alt="Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Content Details (Visible on Hover) */}
                    <AnimatePresence>
                        {isHovered && data.logo && (
                            <motion.div
                                // Animation: Mobile = Fade In Bottom, Desktop = Fade In Right
                                initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: 50 }}
                                animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                                exit={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: 50 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className={`flex flex-col gap-4 sm:gap-6 text-left ${isMobile ? 'w-[90%] -mt-10 px-4' : 'max-w-xl'}`}
                            >
                                <div className="space-y-4 sm:space-y-6">
                                    <h4
                                        className="text-2xl sm:text-3xl font-heading uppercase tracking-widest border-b pb-2"
                                        style={{ color: data.themeColor, borderColor: `${data.themeColor}33` }}
                                    >
                                        {data.partnerName}
                                    </h4>

                                    {data.description.map((desc: string, i: number) => (
                                        <p key={i} className="text-[#FFEAA4] font-subheading leading-relaxed text-sm sm:text-base md:text-lg text-justify opacity-90">
                                            {desc}
                                        </p>
                                    ))}
                                </div>

                                <div className="w-full h-px my-2" style={{ background: `linear-gradient(to right, ${data.themeColor}80, ${data.themeColor}33, transparent)` }} />

                                {/* Social Links */}
                                {data.socials && (
                                    <div className="flex items-center justify-end gap-4 sm:gap-6">
                                        <SocialIcon icon={xIcon} />
                                        <SocialIcon icon={instaIcon} />
                                        <SocialIcon icon={linkedinIcon} />
                                        <SocialIcon icon={webIcon} />
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

function SocialIcon({ icon }: { icon: string }) {
    return (
        <motion.a
            href="#"
            whileHover={{ scale: 1.25, filter: 'brightness(1.5)', y: -5 }}
            className="w-8 h-8 sm:w-10 sm:h-10 transition-all cursor-pointer opacity-90 hover:opacity-100"
        >
            <img src={icon} alt="Social" className="w-full h-full object-contain brightness-125 saturate-150" />
        </motion.a>
    );
}
