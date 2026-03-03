'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const HACKATHON_DATE = new Date('2026-03-14T09:00:00+05:30');

interface TimeUnit {
    value: number;
    label: string;
    max: number;
}

function pad(n: number) {
    return String(Math.max(0, n)).padStart(2, '0');
}

function getTimeLeft() {
    const now = new Date();
    const diff = HACKATHON_DATE.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    const total = diff;
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    return { days, hours, minutes, seconds, total };
}

// Gear Component
function SVGGear({ className, size = 100, color = "#d4af37" }: { className?: string, size?: number, color?: string }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke={color} 
            strokeWidth="2" 
            className={className}
        >
            <path d="M50 15 A35 35 0 1 0 50 85 A35 35 0 1 0 50 15 Z" strokeDasharray="4 4" />
            <path d="M50 25 A25 25 0 1 0 50 75 A25 25 0 1 0 50 25 Z" strokeDasharray="1 6" strokeWidth="4" />
            <circle cx="50" cy="50" r="10" fill={color} fillOpacity="0.2" />
        </svg>
    )
}

function AstrolabeRing({ className, size, reverse = false }: { className?: string, size: number, reverse?: boolean }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 200 200" 
            className={`${className} overflow-visible`}
            style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
        >
            <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="0.5" strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="4" strokeDasharray="1 12" />
            {/* Markings */}
            {[...Array(12)].map((_, i) => (
                <line 
                    key={i} 
                    x1="100" y1="2" x2="100" y2="8" 
                    stroke="rgba(212,175,55,0.8)" 
                    strokeWidth="2"
                    transform={`rotate(${i * 30} 100 100)`}
                />
            ))}
            {[...Array(60)].map((_, i) => i % 5 !== 0 && (
                <line 
                    key={`small-${i}`} 
                    x1="100" y1="2" x2="100" y2="5" 
                    stroke="rgba(212,175,55,0.4)" 
                    strokeWidth="1"
                    transform={`rotate(${i * 6} 100 100)`}
                />
            ))}
        </svg>
    )
}

export function ClockClient() {
    const [time, setTime] = useState(getTimeLeft());
    const [started, setStarted] = useState(false);

    useEffect(() => {
        setTime(getTimeLeft());
        setStarted(true);
        const id = setInterval(() => setTime(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    const units: TimeUnit[] = [
        { value: time.days, label: 'DAY', max: 365 },
        { value: time.hours, label: 'HR', max: 23 },
        { value: time.minutes, label: 'MIN', max: 59 },
        { value: time.seconds, label: 'SEC', max: 59 },
    ];

    if (!started) return <div className="min-h-screen bg-[#050301]" />;

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#050301] overflow-hidden font-cinzel selection:bg-gold-500/30">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,30,0,0.8),transparent_70%)] mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

            {/* Central Giant Astrolabe Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-40 mix-blend-screen pointer-events-none animate-spin-extremely-slow">
                <Image
                    src="/astrolabe-bg.png"
                    alt="Ancient Clockwork Mask"
                    fill
                    className="object-contain rounded-full"
                    style={{
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
                    }}
                />
            </div>

            {/* --- Magical Embers/Particles --- */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                {[...Array(25)].map((_, i) => {
                    const size = Math.random() * 4 + 2;
                    const left = Math.random() * 100;
                    const animDuration = Math.random() * 10 + 10;
                    const delay = Math.random() * 10;
                    return (
                        <div
                            key={i}
                            className="absolute rounded-full bg-gold-400 blur-[1px] mix-blend-screen opacity-0 animate-float-up"
                            style={{
                                width: size,
                                height: size,
                                left: `${left}%`,
                                bottom: '-5%',
                                animationDuration: `${animDuration}s`,
                                animationDelay: `${delay}s`,
                                boxShadow: '0 0 10px 2px rgba(212,175,55,0.6)'
                            }}
                        />
                    );
                })}
            </div>

            {/* --- Left Panel: Divine Telemetry --- */}
            <div className="absolute left-0 top-16 bottom-12 w-20 sm:w-64 border-r border-gold-500/10 bg-[#050301]/80 backdrop-blur-sm z-20 flex col pt-8 pb-8 px-4 hidden lg:flex flex-col gap-12 overflow-hidden">
                {/* Protocol Status List */}
                <div className="flex flex-col gap-4 w-full">
                    <div className="text-gold-500/80 font-mono text-[0.65rem] tracking-[0.3em] uppercase border-b border-gold-500/20 pb-2 mb-2">Active Protocols</div>
                    {['DIONYSUS_VINE', 'HEPHAESTUS_FORGE', 'ATHENA_AEGIS', 'APOLLO_SUN'].map((proto, i) => (
                        <div key={proto} className="flex items-center justify-between w-full">
                            <span className="text-gold-200/60 font-mono text-[0.55rem] tracking-widest">{proto}</span>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className={`w-1.5 h-1.5 rounded-full ${j === i % 3 ? 'bg-gold-500 animate-pulse' : 'bg-gold-500/20'}`} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vertical Progress Bar */}
                <div className="flex-1 w-full flex gap-4 mt-8">
                    <div className="w-1 h-full bg-gold-900/30 rounded-full relative overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-gold-600 to-amber-400 h-[76%] rounded-full animate-pulse-slow shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-end pb-4 font-mono">
                        <span className="text-white text-3xl font-light tabular-nums">76%</span>
                        <span className="text-gold-500/50 text-[0.5rem] tracking-[0.2em] uppercase mt-1">Energy Matrix</span>
                    </div>
                </div>

                {/* Scrolling Cipher Text Block */}
                <div className="w-full h-32 overflow-hidden relative border-t border-gold-500/20 pt-4 cursor-default select-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050301] via-transparent to-[#050301] z-10 pointer-events-none" />
                    <div className="flex flex-col animate-scroll-up text-gold-500/30 font-serif text-[0.6rem] tracking-widest leading-relaxed break-all">
                        {`ΕΝ ΑΡΧΗ ΗΝ Ο ΧΑΟΣ ΚΑΙ ΕΚ ΤΟΥ ΧΑΟΥΣ ΕΓΕΝΕΤΟ ΓΑΙΑ Η ΕΥΡΥΣΤΕΡΝΟΣ... ΟΥΡΑΝΟΣ ΑΣΤΕΡΟΕΙΔΗΣ... ΚΡΟΝΟΣ ΑΓΚΥΛΟΜΗΤΗΣ... ΖΕΥΣ ΥΨΙΒΡΕΜΕΤΗΣ... ΤΟ ΠΥΡ ΤΟΥ ΠΡΟΜΗΘΕΩΣ...`.repeat(10)}
                    </div>
                </div>
            </div>

            {/* --- Right Panel: Astrological Data --- */}
            <div className="absolute right-0 top-16 bottom-12 w-20 sm:w-64 border-l border-gold-500/10 bg-[#050301]/80 backdrop-blur-sm z-20 flex col pt-8 pb-8 px-4 hidden lg:flex flex-col justify-between items-end overflow-hidden overflow-y-auto">
                
                {/* Alignment Graph */}
                <div className="flex flex-col items-end gap-2 w-full text-right">
                    <div className="text-gold-500/80 font-mono text-[0.65rem] tracking-[0.3em] uppercase border-b border-gold-500/20 pb-2 mb-4 w-full text-right">Celestial Alignment</div>
                    <div className="relative w-32 h-32 flex items-center justify-center opacity-80 mix-blend-screen">
                        {/* Nested rotating squares */}
                        <div className="absolute w-28 h-28 border border-gold-500/40 animate-spin-slow" />
                        <div className="absolute w-24 h-24 border border-gold-400/60 rotate-45 animate-spin-slower animation-reverse" />
                        <div className="w-12 h-12 rounded-full border border-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.6)] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Coordinates Block */}
                <div className="flex flex-col items-end gap-3 mt-12 w-full">
                    {[
                        { label: 'DECLINATION', val: '+23° 26′ 14″' },
                        { label: 'RIGHT ASCEN.', val: '05h 36m 23s' },
                        { label: 'LUNAR PHASE', val: 'WAXING GIB.' },
                        { label: 'SOLAR WIND', val: '412 KM/S' }
                    ].map((data, i) => (
                        <div key={i} className="flex flex-col items-end">
                            <span className="text-gold-500/40 font-mono text-[0.5rem] tracking-[0.3em] uppercase">{data.label}</span>
                            <span className="text-white/90 font-mono text-[0.7rem] tracking-wider">{data.val}</span>
                        </div>
                    ))}
                </div>

                {/* Vertical Decorative Lines & Runes */}
                <div className="w-full flex-1 flex justify-end items-end gap-2 pr-2 opacity-40 mt-12">
                     <div className="w-[1px] h-full bg-gradient-to-t from-gold-500/50 to-transparent" />
                     <div className="flex flex-col gap-2 text-[0.5rem] text-gold-400 font-serif pb-4">
                         {'ΟΛΥΜΠΟΣ'.split('').map((char, i) => <span key={i}>{char}</span>)}
                     </div>
                </div>
            </div>

            {/* Intricate Corner Framing */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold-500/40 z-20 pointer-events-none" />
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold-500/40 z-20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold-500/40 z-20 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold-500/40 z-20 pointer-events-none" />

            {/* Thematic Header Bar */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#0a0501] to-transparent z-30 flex items-center justify-between px-8 sm:px-12 border-b border-gold-500/10">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                    <span className="text-gold-200 font-serif tracking-[0.4em] text-xs sm:text-sm uppercase">HACKJKLU V5.0</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
                    <span className="text-gold-500/60 font-mono tracking-[0.2em] text-[0.6rem] uppercase">System: ORACLE_UPLINK</span>
                    <span className="text-green-500/80 font-mono tracking-widest text-[0.6rem] uppercase">Stable</span>
                </div>
            </div>

            {/* Complex Bottom Footer Log */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-[#050301]/80 backdrop-blur-md z-30 border-t border-gold-500/20 overflow-hidden flex items-center">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-gold-600/40 font-mono text-[0.6rem] tracking-[0.3em] uppercase mx-8">
                            [SYS.LOG] CONSTELLATION ALIGNMENT: {Math.floor(Math.random() * 100)}% ... GATES OF OLYMPUS: PREPARING ... AMBROSIA LEVELS: NOMINAL ... {Date.now().toString(16).toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Interface Wrapper */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
                
                {/* Title Section mapped to ancient lore */}
                <div className="text-center mb-16 md:mb-24 relative">
                    {/* Decorative Top Arch */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[300px] h-[60px]">
                        <svg viewBox="0 0 300 60" fill="none" className="w-full h-full opacity-60">
                            <defs>
                                <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="#d4af37" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                            <path d="M 0 60 Q 150 -20 300 60" stroke="url(#goldLine)" strokeWidth="1" fill="none" />
                            <circle cx="150" cy="20" r="4" fill="#d4af37" className="animate-pulse" />
                            <circle cx="150" cy="20" r="12" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <h2 className="text-gold-400 text-xs sm:text-sm tracking-[0.5em] uppercase font-light mb-4 ml-2 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                        The Mechanism Awakens
                    </h2>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#fffac2] via-[#d4af37] to-[#8a5a19] drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        HACKJKLU
                    </h1>
                    <div className="flex items-center justify-center gap-6 mt-6 animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold-600" />
                        <span className="text-gold-300 tracking-[0.4em] text-sm uppercase">Volume 5.0</span>
                        <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold-600" />
                    </div>
                </div>

                {/* The "Mechanical" Clock Display */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none mt-16 md:mt-24">
                    
                    {/* Horizontal connecting rod */}
                    <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent -translate-y-1/2 z-0 hidden md:block" />

                    <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-12 md:gap-20 lg:gap-32 w-full z-10 pointer-events-auto">
                        {units.map((unit, idx) => (
                            <div key={unit.label} className="relative group flex flex-col items-center">
                                
                                {/* Ethereal Glowing Orb Behind Number */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[320px] lg:h-[320px] bg-gold-600/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 group-hover:bg-gold-500/20 transition-all duration-1000 ease-out" />
                                
                                {/* Outer Spinning SVG Ring - Simplified for elegance */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[360px] lg:h-[360px] pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-1000">
                                    <svg viewBox="0 0 200 200" className={`w-full h-full animate-spin-extremely-slow ${idx % 2 !== 0 ? 'animation-reverse' : ''}`}>
                                        <circle cx="100" cy="100" r="95" fill="none" stroke="url(#goldRim)" strokeWidth="0.5" strokeDasharray="2 6" />
                                        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" strokeDasharray="20 40" />
                                    </svg>
                                </div>

                                {/* The Giant Elegant Digits */}
                                <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110">
                                    <span style={{ fontVariantNumeric: 'tabular-nums' }} className="relative z-20 font-serif text-8xl sm:text-[9rem] md:text-[11rem] lg:text-[14rem] font-medium tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fed7aa] to-[#d97706] drop-shadow-[0_0_35px_rgba(212,175,55,0.5)]">
                                        {pad(unit.value)}
                                    </span>
                                </div>

                                {/* Minimal Label */}
                                <div className="mt-4 sm:mt-6 relative z-20 flex flex-col items-center gap-2">
                                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
                                    <span className="text-xs sm:text-sm font-semibold tracking-[0.5em] sm:tracking-[0.6em] text-gold-300/80 group-hover:text-gold-200 transition-colors uppercase m-0 p-0 drop-shadow-md">
                                        {unit.label}
                                    </span>
                                    <div className="w-4 h-[1px] bg-gold-500/30" />
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom Coordinates & Engraving */}
                <div className="absolute bottom-8 w-full text-center flex flex-col items-center opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                    <div className="w-16 h-16 opacity-30 mb-2">
                        <SVGGear size={64} className="animate-spin-slow" />
                    </div>
                    <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.3em] font-sans text-gold-500/40 uppercase">
                        LAT: 26.8361° N · LON: 75.6508° E
                    </p>
                    <p className="text-xs tracking-[0.2em] text-gold-600/60 mt-2">
                        INITIATION PROTOCOL: ACTIVE
                    </p>
                </div>
            </div>

            <style>{`
                .animate-spin-slow {
                    animation: spin 30s linear infinite;
                }
                .animate-spin-slower {
                    animation: spin 60s linear infinite;
                }
                .animate-spin-extremely-slow {
                    animation: spin 180s linear infinite;
                }
                .animation-reverse {
                    animation-direction: reverse;
                }
                .animate-pulse-slow {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .animation-delay-300 {
                    animation-delay: 3s;
                }
                .animate-float-up {
                    animation-name: float-up;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(20px); filter: blur(10px); }
                    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
                }

                @keyframes float-up {
                    0% {
                        transform: translateY(100vh) scale(0.5);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-10vh) scale(1.2);
                        opacity: 0;
                    }
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @keyframes scroll-up {
                    0% { transform: translateY(100%); }
                    100% { transform: translateY(-100%); }
                }
            `}</style>
        </div>
    );
}
