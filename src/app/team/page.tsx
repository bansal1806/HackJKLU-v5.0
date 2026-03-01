'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Eye, Hexagon, Cpu, ScanLine, Share2, Globe, Github, Linkedin, Mail, Instagram, X } from 'lucide-react';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { COMMITTEE_DATA } from '@/data/committeeData';

// Row 1 (11 members)
const ROW1_TEAM = [
    { name: "Siddharth", role: "Registrations", image: "/team/Reg_TeamCard.png" },
    { name: "Tanya", role: "Food and Accommodation", image: "/team/F_A_TeamCard_Tanya-removebg-preview.png" },
    { name: "Siddhii", role: "Decor", image: "/team/Decor_TeamCard-removebg-preview.png" },
    { name: "Nikita", role: "Design Team", image: "/team/Design_TeamCard_nikita-removebg-preview.png" },
    { name: "Chestha", role: "Media & Report", image: "/team/Media_Report_TeamCard-removebg-preview.png" },
    { name: "Agrima", role: "Hospitality", image: "/team/Hospt_TeamCard.png" },
    { name: "Anmol", role: "IA", image: "/team/IA_TeamCard-removebg-preview.png" },
    { name: "Jheel", role: "P&C", image: "/team/P_C_TeamCard_Jheel-removebg-preview.png" },
    { name: "Swati", role: "Discipline", image: "/team/Discipline_TeamCard-removebg-preview.png" },
    { name: "Aditya", role: "Social Media", image: "/team/SocialMedia_TeamCard-removebg-preview.png" },
    { name: "Shourya", role: "Tech Team", image: "/team/Tech_TeamCard_SB.png" },
];

// Row 2 (12 members)
const ROW2_TEAM = [
    { name: "Tanikk", role: "Food and Accommodation", image: "/team/F_A_TeamCard_Tanik-removebg-preview.png" },
    { name: "Srishti", role: "Design Team", image: "/team/Design_TeamCard-removebg-preview.png" },
    { name: "Gaurav", role: "P&C", image: "/team/P_C_TeamCard_Gaurav-removebg-preview.png" },
    { name: "Aman", role: "Stage & Venue", image: "/team/S_V_TeamCard-removebg-preview.png" },
    { name: "Shubham", role: "Discipline", image: "/team/Discipline_TeamCard_2-removebg-preview.png" },
    { name: "Devam", role: "Sponsorships", image: "/team/Sponsor_TeamCard.png" },
    { name: "Mohit", role: "Social Media", image: "/team/SocialMedia_TeamCard-removebg-preview.png" },
    { name: "Aayan", role: "Tech Team", image: "/team/Tech_TeamCard_Aayan-removebg-preview.png" },
    { name: "Vaishnavi", role: "Anchoring", image: "/team/Anchoring_TeamCard.png" },
    { name: "Pratigya", role: "PS", image: "/team/PS_TeamCard-removebg-preview.png" },
    { name: "Ekansh", role: "Photography", image: "/team/Photography_TeamCard-removebg-preview.png" },
    { name: "Arpan", role: "Treasurer", image: "/team/team_bg.png" },
];

// Duplicate for infinite loop
const INFINITE_ROW1 = [...ROW1_TEAM, ...ROW1_TEAM];
const INFINITE_ROW2 = [...ROW2_TEAM, ...ROW2_TEAM];

function GlitchText({ text }: { text: string }) {
    return (
        <div className="relative inline-block group">
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 animate-pulse">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 animate-pulse delay-75">{text}</span>
        </div>
    );
}

function MemberCard({ member, isLeft, onViewCommittee }: { member: any, isLeft: boolean, onViewCommittee: (name: string) => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 300); // 300ms grace period to move mouse to popup
    };

    const popupWrapperClass = isLeft
        ? "left-full pl-4" // Invisible 16px bridge on the right
        : "right-full pr-4"; // Invisible 16px bridge on the left

    return (
        <motion.div
            className="relative w-[280px] h-[360px] bg-transparent shrink-0"
            style={{ zIndex: isHovered ? 60 : 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Image - Full Card Display */}
            <div className="absolute inset-0 transition-all duration-500 rounded-xl overflow-hidden shadow-2xl">
                <div className="w-full h-full relative">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* Hover Popup - Increased Size and Added Hover Delay via State */}
            <div
                className={`absolute top-1/2 -translate-y-1/2 ${popupWrapperClass} w-[280px] transition-all duration-300 z-50`}
                style={{
                    opacity: isHovered ? 1 : 0,
                    pointerEvents: isHovered ? 'auto' : 'none'
                }}
            >
                <div
                    className="relative bg-[#1a1723]/95 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_0_40px_rgba(0,0,0,1)] flex flex-col items-center transition-transform duration-300"
                    style={{
                        transform: isHovered ? 'translateX(0)' : (isLeft ? 'translateX(-16px)' : 'translateX(16px)')
                    }}
                >

                    {/* Top Badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#3b82f6] px-5 py-1.5 rounded-full shadow-[0_4px_10px_rgba(236,72,153,0.3)] whitespace-nowrap z-10">
                        <span className="text-white font-bold text-[13px] font-sans tracking-widest">{member.name}</span>
                    </div>

                    <h4 className="text-2xl font-sans text-white font-bold mt-5 mb-3 text-center whitespace-nowrap">{member.name}</h4>

                    <div className="w-full h-px bg-white/10 my-2" />

                    <p className="text-[11px] tracking-widest text-[#9ca3af] text-center uppercase mb-4 mt-2 font-sans font-medium">Connect With Me</p>

                    <div className="flex justify-center gap-6 mb-5 text-[#d1d5db]">
                        <Linkedin className="w-7 h-7 hover:text-white hover:scale-110 transition-all cursor-pointer" />
                        <Instagram className="w-7 h-7 hover:text-white hover:scale-110 transition-all cursor-pointer" />
                    </div>

                    <div className="w-full h-px bg-white/10 my-1" />

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewCommittee(member.role);
                        }}
                        className="w-full mt-4 bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#3b82f6] hover:opacity-90 text-white text-[12px] font-bold py-3.5 rounded-full shadow-[0_4px_15px_rgba(236,72,153,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.5)] transition-all duration-300 font-sans tracking-wide">
                        View Complete Committee
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function InfiniteRow({ items, direction, speed, onViewCommittee }: { items: any[], direction: 'left' | 'right', speed: number, onViewCommittee: (name: string) => void }) {
    return (
        <div className="relative flex w-full py-8 group/row overflow-visible">
            <div
                className={`flex gap-6 shrink-0 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} pause-on-hover`}
                style={{
                    width: 'max-content',
                    // Pass custom speed to CSS variable
                    ['--speed' as any]: `${speed}s`
                }}
            >
                {items.map((member, idx) => (
                    <MemberCard
                        key={idx}
                        member={member}
                        isLeft={direction === 'left'}
                        onViewCommittee={onViewCommittee}
                    />
                ))}
            </div>
        </div>
    );
}

export default function TeamPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const officeRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);
    const [activeTeam, setActiveTeam] = useState<'council' | 'hack'>('council');

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <main ref={containerRef} className="bg-[#0c0a09] min-h-screen relative overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-[#ffecd1]">
            {/* Global Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/team/team_bg.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-60 mix-blend-normal"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09]/80 via-[#0c0a09]/50 to-[#0c0a09]" />
            </div>

            <div className="relative z-10">
                <PageNavigation />

                {/* SECTION 1: THE OFFICE BEARERS (OH) DIMENSION - RE-THEMED */}
                <section ref={officeRef} className="relative min-h-screen flex flex-col items-center justify-center text-[#ffecd1] overflow-hidden pt-32 pb-20">

                    {/* Team Toggles */}
                    <div className="relative z-20 flex gap-4 sm:gap-6 mb-16 items-center justify-center -mt-10">
                        <button
                            onClick={() => setActiveTeam('council')}
                            className={`flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full border-[2px] transition-all duration-300 backdrop-blur-md ${activeTeam === 'council' ? 'border-[#ffb800] bg-black/40 text-[#ffb800] shadow-[0_0_20px_rgba(255,184,0,0.15)]' : 'border-white/20 bg-black/20 text-[#a3a3a3] hover:border-white/40 hover:text-white'}`}
                        >
                            <span className="text-xl sm:text-2xl pt-1">⚆⚇</span>
                            <span className="font-[Cinzel] font-bold text-xl sm:text-3xl tracking-wide drop-shadow-md">Council</span>
                        </button>

                        <button
                            onClick={() => setActiveTeam('hack')}
                            className={`flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full border-[2px] transition-all duration-300 backdrop-blur-md ${activeTeam === 'hack' ? 'border-[#ffb800] bg-black/40 text-[#ffb800] shadow-[0_0_20px_rgba(255,184,0,0.15)]' : 'border-white/20 bg-black/20 text-[#a3a3a3] hover:border-white/40 hover:text-white'}`}
                        >
                            <span className="text-lg sm:text-xl">⚖</span>
                            <span className="font-[Cinzel] font-bold text-xl sm:text-3xl tracking-wide drop-shadow-md">Hack Team</span>
                        </button>
                    </div>

                    <div className="container mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col xl:flex-row items-center justify-between gap-12">



                        {/* Center: Office Bearer Portrait Cards */}
                        <div className="flex flex-col md:flex-row flex-wrap gap-8 z-10 w-full justify-center items-center">
                            {/* Toggle Data Render */}
                            {(activeTeam === 'council' ? [
                                { id: 1, src: '/team/OH_TeamCard-removebg-preview.png', alt: 'Office Bearer 1' },
                                { id: 2, src: '/team/OH1_TeamCard.png', alt: 'Office Bearer 2' },
                                { id: 3, src: '/team/OH_PakhiDi-removebg-preview.png', alt: 'Pakhi Di - Office Bearer' }
                            ] : [
                                { id: 4, src: '/team/Tech_TeamCard_SB.png', alt: 'Shourya Bansal - Hack Team Lead' },
                            ]).map((oh, index) => (
                                <motion.div
                                    key={`${activeTeam}-${oh.id}`}
                                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative w-[280px] sm:w-full sm:max-w-[320px] aspect-[3/4]"
                                >
                                    <div className="absolute inset-0 bg-[#1a1816] border-[1px] border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                                        style={{ clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%, 0 30px)' }}
                                    >
                                        <div className="absolute inset-2 bg-[#0c0a09] overflow-hidden border border-[#d4af37]/20">
                                            <div className="w-full h-full relative">
                                                <Image
                                                    src={oh.src}
                                                    alt={oh.alt}
                                                    fill
                                                    className="object-cover sm:object-contain transition-transform duration-700 hover:scale-105"
                                                    priority={index === 0}
                                                />
                                                <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>



                    </div>

                    {/* Scroll Indicator - Gold */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#d4af37]/70"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-[10px] font-[Cinzel] tracking-widest uppercase">Descend to Core</span>
                        <div className="w-[1px] h-12 bg-[#d4af37]/30" />
                    </motion.div>
                </section>

                {/* SECTION 2: THE CORE INFINITE CAROUSEL - RE-THEMED */}
                <section className="relative min-h-screen bg-[#0c0a09] overflow-hidden py-32 flex flex-col justify-center">

                    {/* Background Ambience - Cosmic Gold/Blue */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[120px] rounded-full mix-blend-screen" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a0b2e]/20 blur-[150px] rounded-full mix-blend-screen" />
                        <div className="absolute inset-0 bg-[#0c0a09]/80 backdrop-blur-[1px]" />
                    </div>

                    {/* Section Header */}
                    <div className="container mx-auto px-4 mb-20 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[#ffecd1] text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none font-[Cinzel]">
                                23 CORES <span className="text-[#d4af37]">/</span> 17 TEAMS
                            </h2>

                        </motion.div>
                    </div>

                    {/* Decorative Elements - Gold Runes */}
                    <div className="absolute top-1/4 left-10 text-[#d4af37]/20 font-[Cinzel] text-xs hidden lg:block">
                        <div>sys_opt: divine</div>
                        <div>render_mode: aether</div>
                        <div>mem_alloc: infinite</div>
                    </div>

                    {/* Dual Infinite Carousel */}
                    <div className="flex flex-col gap-12 relative z-10 transform -rotate-1 scale-105">
                        {/* Row A: Moving Left */}
                        <div className="w-full border-y border-[#d4af37]/10 bg-black/20 backdrop-blur-sm">
                            <InfiniteRow items={INFINITE_ROW1} direction="left" speed={60} onViewCommittee={setSelectedCommittee} />
                        </div>

                        {/* Row B: Moving Right */}
                        <div className="w-full border-y border-[#d4af37]/10 bg-black/20 backdrop-blur-sm -ml-12">
                            <InfiniteRow items={INFINITE_ROW2} direction="right" speed={50} onViewCommittee={setSelectedCommittee} />
                        </div>
                    </div>

                    {/* Footer Gradient Fade */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
                </section>
            </div>

            {/* Complete Committee Modal */}
            <AnimatePresence>
                {selectedCommittee && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer z-0"
                            onClick={() => setSelectedCommittee(null)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-[#13161c] rounded-2xl border border-white/10 shadow-2xl overflow-y-auto overflow-x-hidden custom-scrollbar z-10"
                        >
                            {/* Close Button - Top Right Corner */}
                            <div className="absolute top-4 right-4 z-[100]">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedCommittee(null);
                                    }}
                                    className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 active:bg-white/20 rounded-full text-white/70 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                                >
                                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            {/* Dynamic Top Glow */}
                            <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

                            <div className="p-8 sm:p-12 relative z-20">
                                {/* Header */}
                                <div className="text-center mb-12">
                                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f43f5e] to-[#ec4899] mb-3">
                                        {selectedCommittee}
                                    </h2>
                                    <p className="text-[#9ca3af] text-lg">Complete Committee Members ({
                                        ((COMMITTEE_DATA[selectedCommittee]?.core?.length || 0) +
                                            (COMMITTEE_DATA[selectedCommittee]?.coordinators?.length || 0) +
                                            (COMMITTEE_DATA[selectedCommittee]?.volunteers?.length || 0))
                                    } members)</p>
                                </div>

                                {/* Core Section */}
                                {(COMMITTEE_DATA[selectedCommittee]?.core?.length || 0) > 0 && (
                                    <div className="flex flex-col items-center mb-10">
                                        <div className="bg-[#2a2b38] border border-white/10 px-8 py-2.5 rounded-full mb-6 z-10 shadow-lg">
                                            <h3 className="text-white font-bold text-lg">Core</h3>
                                        </div>
                                        <div className="flex justify-center flex-wrap gap-4 w-full">
                                            {COMMITTEE_DATA[selectedCommittee].core.map((name, i) => (
                                                <div key={i} className="bg-[#20232a] border border-white/5 rounded-xl p-5 text-center min-w-[200px] shadow-md hover:bg-[#2a2d36] transition-colors">
                                                    <p className="text-white font-bold text-lg">{name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Coordinators Section */}
                                {(COMMITTEE_DATA[selectedCommittee]?.coordinators?.length || 0) > 0 && (
                                    <div className="flex flex-col items-center mb-10">
                                        <div className="bg-[#2a2b38] border border-white/10 px-6 py-2 rounded-full mb-6 z-10 shadow-lg">
                                            <h3 className="text-white font-bold text-base">Coordinators</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                                            {COMMITTEE_DATA[selectedCommittee].coordinators.map((name, i) => (
                                                <div key={i} className="bg-[#20232a] border border-white/5 rounded-lg p-4 shadow-sm hover:bg-[#2a2d36] transition-colors">
                                                    <p className="text-white font-bold text-[15px]">{name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Volunteers Section */}
                                {(COMMITTEE_DATA[selectedCommittee]?.volunteers?.length || 0) > 0 && (
                                    <div className="flex flex-col items-center">
                                        <div className="bg-[#2a2b38] border border-white/10 px-6 py-2 rounded-full mb-6 z-10 shadow-lg">
                                            <h3 className="text-white font-bold text-base">Volunteers</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                                            {COMMITTEE_DATA[selectedCommittee].volunteers.map((name, i) => (
                                                <div key={i} className="bg-[#20232a] border border-white/5 rounded-lg p-4 shadow-sm hover:bg-[#2a2d36] transition-colors">
                                                    <p className="text-white font-bold text-[15px]">{name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
