import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import completeBg from '../../assets/partners/complete-bg.jpg';
import goldRing from '../../assets/partners/gold-ring.png';
import silverRing from '../../assets/partners/silver-ring.png';
import bronzeRing from '../../assets/partners/bronze-ring.png';
import entionLogo from '../../assets/partners/ention-logo.png';
import wsCubeLogo from '../../assets/partners/ws.cubetech-logo.png';

// Silver Logos
import gfgLogo from '../../assets/partners/geeksforgeeks-logo.png';
import devfolioLogo from '../../assets/partners/devfolio-logo.png';
import ethIndiaLogo from '../../assets/partners/ethindia-logo.png';

// Bronze Logos
import balsamiqLogo from '../../assets/partners/balsamiq-logo.png';
import fluxorLogo from '../../assets/partners/fluxor-logo.png';
import blockpenLogo from '../../assets/partners/blockpen-logo.png';

// Social Assets
import instaIcon from '../../assets/partners/social-insta.svg';
import linkedinIcon from '../../assets/partners/social-linkedin.svg';
import webIcon from '../../assets/partners/social-web.svg';
import xIcon from '../../assets/partners/social-x.svg';

interface Socials {
    x?: string;
    insta?: string;
    linkedin?: string;
    web?: string;
}

interface PartnerSection {
    id: number;
    isGrid?: boolean;
    type?: string;
    typeColor?: string;
    tier?: string;
    tierColor?: string;
    name?: string;
    nameColor?: string;
    logo?: string | null;
    ring?: string;
    ringSpeed?: number;
    bio?: string;
    socials?: Socials;
    tiers?: {
        title: string;
        color: string;
        ring: string;
        partners: { name: string; logo: string }[];
    }[];
}

const sections: PartnerSection[] = [
    {
        id: 0,
        type: "PAST PARTNERS",
        typeColor: "#e8dab2",
        tier: "GOLD PARTNER",
        tierColor: "#d4af37",
        name: "ENTION",
        nameColor: "#e8dab2",
        logo: entionLogo,
        ring: goldRing,
        ringSpeed: 25,
        bio: "Ention is a leading innovator in digital solutions, empowering businesses with cutting-edge technology and advanced automation tools to optimize operations and drive growth. It was incorporated on 11th Jan, 2023 in India to provide innovative laptop products, helping users stay connected with the latest technology trends. Focused on delivering customer-centric computing solutions, Ention stands apart with a strong emphasis on service and support.\n\nEntion is revolutionizing the laptop experience with high-performance devices designed for creators, gamers, and professionals. Featuring Intel and AMD processors, Ention laptops combine speed, power, and reliability to fuel your ambitions.",
        socials: { x: "#", insta: "#", linkedin: "#", web: "#" }
    },
    {
        id: 1,
        type: "PRE-HACKATHON PARTNER",
        typeColor: "#d4af37",
        tier: "",
        tierColor: "",
        name: "WSCUBE TECH",
        nameColor: "#e8dab2",
        logo: wsCubeLogo,
        ring: goldRing,
        ringSpeed: 30,
        bio: "WSCube is a Hybrid Upskilling Edtech, develops and disseminates Tech-powered Career Acceleration Programs and Job Oriented Professional courses for Aspirants of Bharat, readying them for Global workfloor opportunities.\n\nWSCube Tech is providing us with knowledge about HTML, CSS, JS, React, git and GitHub as part of pre-hackathon bootcamp.",
        socials: { x: "#", insta: "#", linkedin: "#", web: "#" }
    },
    {
        id: 2,
        isGrid: true,
        tiers: [
            {
                title: "SILVER PARTNERS",
                color: "#C0C0C0",
                ring: silverRing,
                partners: [
                    { name: "Geeks for Geeks", logo: gfgLogo },
                    { name: "Devfolio", logo: devfolioLogo },
                    { name: "ETHIndia", logo: ethIndiaLogo }
                ]
            },
            {
                title: "BRONZE PARTNERS",
                color: "#cd7f32",
                ring: bronzeRing,
                partners: [
                    { name: "Balsamiq", logo: balsamiqLogo },
                    { name: "Fluxor", logo: fluxorLogo },
                    { name: "BlockPen", logo: blockpenLogo }
                ]
            }
        ]
    },
    {
        id: 3,
        type: "SECTION FOUR",
        typeColor: "#e8dab2",
        tier: "Community Partners",
        tierColor: "#cd7f32",
        name: "COMING SOON",
        nameColor: "#e8dab2",
        logo: null,
        ring: silverRing,
        ringSpeed: 40,
        bio: "Further details coming soon.",
        socials: {}
    }
];

export default function PartnersSections() {
    const [currentSection, setCurrentSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const switchSection = (nextSection: number) => {
        if (isAnimating || nextSection === currentSection) return;
        if (nextSection < 0 || nextSection >= sections.length) return;

        setIsAnimating(true);
        setCurrentSection(nextSection);
        setIsHovered(false); // Reset hover on section change

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isAnimating) return;

            if (e.deltaY > 0 && currentSection < sections.length - 1) {
                switchSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                switchSection(currentSection - 1);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isAnimating) return;

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentSection > 0) switchSection(currentSection - 1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentSection < sections.length - 1) switchSection(currentSection + 1);
                    break;
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSection, isAnimating]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const section = sections[currentSection];

    return (
        <div ref={containerRef} className="relative bg-neutral-950 text-neutral-100 min-h-screen overflow-hidden font-cinzel">

            {/* Continuous Background Image */}
            <motion.div
                className="fixed inset-0 w-full h-[400vh] z-0"
                initial={false}
                animate={{ y: `-${currentSection * 100}vh` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${completeBg})`,
                        filter: 'contrast(1.1) saturate(1.1)'
                    }}
                />
                <div className="absolute inset-0 bg-neutral-950/60 z-10" />
            </motion.div>

            {/* Section Navigation Indicators */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
                {sections.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => switchSection(s.id)}
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${currentSection === s.id
                            ? 'bg-[#d4af37] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                            : 'bg-transparent border-neutral-500 hover:border-[#d4af37]/60'
                            }`}
                        aria-label={`Go to section ${s.id + 1}`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col items-center justify-start pt-16 md:pt-24"
                >
                    {section.isGrid ? (
                        <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col gap-16 md:gap-24 overflow-y-auto max-h-[85vh] py-10 no-scrollbar">
                            {section.tiers?.map((tier, tierIdx) => (
                                <div key={tierIdx} className="space-y-12">
                                    <motion.h3
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] text-center drop-shadow-[0_2px_10px_rgba(0,0,0,1)] uppercase"
                                        style={{ color: tier.color }}
                                    >
                                        {tier.title}
                                    </motion.h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                                        {tier.partners.map((partner, pIdx) => (
                                            <motion.div
                                                key={pIdx}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.3 + pIdx * 0.1, duration: 0.5 }}
                                                className="flex flex-col items-center gap-6"
                                            >
                                                <div className="relative w-48 h-48 lg:w-56 lg:h-56 flex items-center justify-center">
                                                    {/* Rotating Ring */}
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 30 + pIdx * 5,
                                                            ease: "linear"
                                                        }}
                                                        className="absolute inset-0"
                                                    >
                                                        <img
                                                            src={tier.ring}
                                                            alt=""
                                                            className="w-full h-full object-contain opacity-90 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                                        />
                                                    </motion.div>

                                                    {/* Logo */}
                                                    <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-10">
                                                        <img
                                                            src={partner.logo}
                                                            alt={partner.name}
                                                            className="w-[70%] h-[70%] object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                                                        />
                                                    </div>
                                                </div>
                                                <h4 className="text-ivory-cream font-cinzel text-sm lg:text-base tracking-widest text-center opacity-80">
                                                    {partner.name}
                                                </h4>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="w-full h-full flex flex-col items-center justify-start pointer-events-auto"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Constant Centered Headers */}
                            <div className="relative z-10 space-y-2 mb-8 md:mb-12">
                                <motion.h3
                                    animate={{ opacity: 1 }}
                                    className="text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] text-center drop-shadow-[0_2px_10px_rgba(0,0,0,1)] uppercase"
                                    style={{ color: section.typeColor }}
                                >
                                    {section.type}
                                </motion.h3>

                                {section.tier && (
                                    <motion.h4
                                        animate={{ opacity: 1 }}
                                        className="text-lg md:text-xl lg:text-2xl tracking-[0.2em] font-bold text-center drop-shadow-[0_2px_10px_rgba(0,0,0,1)] uppercase"
                                        style={{ color: section.tierColor }}
                                    >
                                        {section.tier}
                                    </motion.h4>
                                )}
                            </div>

                            {/* Dynamic Content Area */}
                            <div className="relative z-10 w-full max-w-7xl px-8 md:px-16 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 h-[55vh]">

                                {/* Logo and Ring Container */}
                                <motion.div
                                    layout
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className={`relative flex items-center justify-center ${isHovered ? 'md:w-1/3' : 'w-full'}`}
                                >
                                    {/* Rotating Ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: section.ringSpeed || 30,
                                            ease: "linear"
                                        }}
                                        className={`${isHovered ? 'w-[250px] h-[250px] lg:w-[320px] lg:h-[320px]' : 'w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]'}`}
                                    >
                                        <img
                                            src={section.ring}
                                            alt=""
                                            className="w-full h-full object-contain opacity-90 brightness-110 drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                                        />
                                    </motion.div>

                                    {/* Logo */}
                                    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 lg:p-16">
                                        {section.logo && (
                                            <motion.img
                                                layout
                                                src={section.logo}
                                                alt={section.name}
                                                className="w-[60%] h-[60%] object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
                                            />
                                        )}
                                    </div>
                                </motion.div>

                                {/* Hover-only Detailed Content */}
                                <AnimatePresence>
                                    {isHovered && section.bio && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="md:w-2/3 text-left flex flex-col justify-center"
                                        >
                                            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-[0.2em] uppercase mb-6" style={{ color: section.nameColor }}>
                                                {section.name}
                                            </h2>
                                            <div className="text-neutral-300 text-sm md:text-base lg:text-lg leading-relaxed space-y-4 max-w-2xl font-sans text-justify">
                                                {section.bio.split('\n\n').map((paragraph, idx) => (
                                                    <p key={idx}>{paragraph}</p>
                                                ))}
                                            </div>

                                            {/* Horizontal Line */}
                                            <div className="w-full h-[1px] bg-neutral-700/50 my-8" />

                                            {/* Social Icons */}
                                            <div className="flex justify-end gap-6 h-8 opacity-80">
                                                {section.socials?.x && <a href={section.socials.x} className="hover:scale-110 transition-transform"><img src={xIcon} alt="X" className="h-full invert sepia brightness-50 contrast-150" /></a>}
                                                {section.socials?.insta && <a href={section.socials.insta} className="hover:scale-110 transition-transform"><img src={instaIcon} alt="Instagram" className="h-full invert sepia brightness-50 contrast-150" /></a>}
                                                {section.socials?.linkedin && <a href={section.socials.linkedin} className="hover:scale-110 transition-transform"><img src={linkedinIcon} alt="LinkedIn" className="h-full invert sepia brightness-50 contrast-150" /></a>}
                                                {section.socials?.web && <a href={section.socials.web} className="hover:scale-110 transition-transform"><img src={webIcon} alt="Website" className="h-full invert sepia brightness-50 contrast-150" /></a>}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Non-hovered Partner Name */}
                                {!isHovered && (
                                    <motion.h2
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute bottom-[-100px] text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-[0.25em] drop-shadow-[0_2px_10px_rgba(0,0,0,1)] uppercase"
                                        style={{ color: section.nameColor }}
                                    >
                                        {section.name}
                                    </motion.h2>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400&display=swap');
        .font-cinzel {
          font-family: 'Cinzel', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}
