'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { User, MapPin, Clock, Ticket as TicketIcon } from 'lucide-react';

interface BoardingPassProps {
    ticketId: string;
    attendee: string;
    eventTitle: string;
    venue: string;
    time: string;
    poster: string;
}

const BoardingPass: React.FC<BoardingPassProps> = ({
    ticketId,
    attendee,
    eventTitle,
    venue,
    time,
    poster,
}) => {
    const shortId = ticketId.slice(0, 6) + '...' + ticketId.slice(-4);

    const isMaanPanu = eventTitle.toLowerCase().includes('maan panu');

    const mainTitle = eventTitle.toUpperCase().includes('LIVE')
        ? eventTitle.substring(0, eventTitle.toUpperCase().indexOf('LIVE')).trim()
        : eventTitle;

    const subTitle = eventTitle.toUpperCase().includes('LIVE')
        ? eventTitle.substring(eventTitle.toUpperCase().indexOf('LIVE')).trim()
        : isMaanPanu
            ? 'LIVE PERFORMANCE'
            : 'EVENT PASS';

    const timeParts = time.split('•');
    const datePart = timeParts[0]?.trim() || time;
    const timePart = timeParts[1]?.trim() || '';

    // CSS keyframes for sparkle animation
    const sparkleKeyframes = `
        @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;

    return (
        <div className="w-full flex justify-center" style={{ containerType: 'inline-size' }}>
            <style dangerouslySetInnerHTML={{ __html: sparkleKeyframes }} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-[800px] overflow-hidden bg-[#0c0702] group select-none"
                style={{
                    aspectRatio: '2.5 / 1',
                    borderRadius: '1.2cqw',
                    WebkitMaskImage:
                        'radial-gradient(circle at 0px 50%, transparent 1.6cqw, black 1.7cqw), radial-gradient(circle at 100% 50%, transparent 1.6cqw, black 1.7cqw), linear-gradient(black, black)',
                    WebkitMaskSize: '3.2cqw 3.2cqw, 3.2cqw 3.2cqw, calc(100% - 3.2cqw) 100%',
                    WebkitMaskPosition: '-1.6cqw center, calc(100% + 1.6cqw) center, center',
                    WebkitMaskRepeat: 'repeat-y, repeat-y, no-repeat',
                }}
            >
                {/* ========== GOLDEN GLITTER BORDER ========== */}
                <div className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, #b8860b, #daa520, #ffd700, #daa520, #b8860b, #8b6914, #daa520, #ffd700)',
                        backgroundSize: '300% 300%',
                        animation: 'shimmer 4s linear infinite',
                    }}
                />
                {/* Golden sparkle dots along border */}
                {Array.from({ length: 40 }).map((_, i) => {
                    const side = i % 4;
                    const pos = ((i / 4) * 25 + Math.random() * 10) % 100;
                    const style: React.CSSProperties = {
                        position: 'absolute',
                        width: `${0.3 + Math.random() * 0.5}cqw`,
                        height: `${0.3 + Math.random() * 0.5}cqw`,
                        borderRadius: '50%',
                        background: '#ffd700',
                        boxShadow: '0 0 0.4cqw #ffd700, 0 0 0.8cqw rgba(255,215,0,0.5)',
                        animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
                        zIndex: 2,
                    };
                    if (side === 0) { style.top = '0'; style.left = `${pos}%`; }
                    else if (side === 1) { style.bottom = '0'; style.left = `${pos}%`; }
                    else if (side === 2) { style.left = '0'; style.top = `${pos}%`; }
                    else { style.right = '0'; style.top = `${pos}%`; }
                    return <div key={`sp-${i}`} style={style} />;
                })}

                {/* INNER DARK AREA (inset from golden border) */}
                <div className="absolute z-[3]"
                    style={{
                        top: '1.2cqw',
                        left: '1.2cqw',
                        right: '1.2cqw',
                        bottom: '1.2cqw',
                        borderRadius: '0.6cqw',
                        background: '#0c0702',
                        overflow: 'hidden',
                    }}
                >
                    {/* BACKGROUND POSTER (center area) */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={poster}
                            alt={eventTitle}
                            className="absolute h-[130%] object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                            style={{ left: '18%', top: '-15%', width: '58%' }}
                        />
                        {/* Gradient overlays to fade poster edges */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0702] via-transparent to-transparent" style={{ width: '22%' }} />
                        <div className="absolute top-0 h-full bg-gradient-to-l from-[#0c0702] via-[#0c0702] to-transparent" style={{ left: '60%', width: '40%' }} />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0702]/60 via-transparent to-[#0c0702]/60" />
                    </div>

                    {/* Event title watermark behind poster */}
                    <div className="absolute top-[3%] left-[28%] z-[4] pointer-events-none">
                        <h1
                            className="font-[Cinzel] font-black uppercase whitespace-nowrap text-transparent bg-clip-text"
                            style={{
                                fontSize: '6cqw',
                                backgroundImage: 'linear-gradient(to bottom, #ffd700, #b8860b)',
                                opacity: 0.9,
                                textShadow: '0 0 3cqw rgba(255,215,0,0.3)',
                                letterSpacing: '0.08em',
                            }}
                        >
                            {mainTitle}
                        </h1>
                    </div>

                    {/* INNER GOLDEN FRAME LINE */}
                    <div className="absolute z-[10] pointer-events-none"
                        style={{
                            top: '1cqw',
                            left: '1cqw',
                            right: '1cqw',
                            bottom: '1cqw',
                            border: '0.15cqw solid rgba(212,175,55,0.5)',
                            borderRadius: '0.4cqw',
                            boxShadow: 'inset 0 0 1.5cqw rgba(212,175,55,0.15)',
                        }}
                    >
                        {/* Corner diamonds */}
                        <div className="absolute -top-[0.3cqw] -left-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] border-[#d4af37] bg-[#0c0702] rotate-45" />
                        <div className="absolute -top-[0.3cqw] -right-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] border-[#d4af37] bg-[#0c0702] rotate-45" />
                        <div className="absolute -bottom-[0.3cqw] -left-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] border-[#d4af37] bg-[#0c0702] rotate-45" />
                        <div className="absolute -bottom-[0.3cqw] -right-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] border-[#d4af37] bg-[#0c0702] rotate-45" />
                    </div>

                    {/* ========== LEFT SECTION: BEIGE QR STUB ========== */}
                    <div className="absolute z-[20] flex flex-col items-center justify-between"
                        style={{
                            top: '6%',
                            left: '2%',
                            width: '20%',
                            height: '88%',
                            background: 'linear-gradient(135deg, #f8ecd2, #ebd9b2, #debe84)',
                            borderRadius: '2cqw',
                            padding: '1.2cqw',
                            boxShadow: '0 0.8cqw 3cqw rgba(0,0,0,0.7)',
                            border: '0.08cqw solid rgba(168,130,67,0.5)',
                        }}
                    >
                        {/* Inner decorative border */}
                        <div className="absolute pointer-events-none"
                            style={{
                                top: '0.5cqw',
                                left: '0.5cqw',
                                right: '0.5cqw',
                                bottom: '0.5cqw',
                                border: '0.08cqw solid rgba(168,130,67,0.3)',
                                borderRadius: '1.6cqw',
                            }}
                        />

                        {/* QR Code */}
                        <div className="relative z-10 flex items-center justify-center bg-white"
                            style={{
                                width: '82%',
                                aspectRatio: '1',
                                borderRadius: '0.8cqw',
                                padding: '3%',
                                marginTop: '0.8cqw',
                                boxShadow: 'inset 0 0 1cqw rgba(0,0,0,0.08)',
                                border: '0.15cqw solid rgba(203,161,101,0.5)',
                            }}
                        >
                            <QRCodeSVG
                                value={ticketId}
                                size={512}
                                level="H"
                                className="w-[95%] h-[95%]"
                                bgColor="#ffffff"
                                fgColor="#1a0f05"
                            />
                        </div>

                        {/* Label area */}
                        <div className="flex flex-col items-center w-full relative z-10 flex-1 justify-center"
                            style={{ marginTop: '0.8cqw' }}
                        >
                            <h4 className="font-[Cinzel] font-black text-[#5c4022] whitespace-nowrap"
                                style={{ fontSize: '1.3cqw', letterSpacing: '0.08em' }}
                            >
                                SCAN TO VERIFY
                            </h4>
                            <p className="font-data font-bold text-[#6b5133]"
                                style={{ fontSize: '1.2cqw', letterSpacing: '0.05em', marginTop: '0.3cqw' }}
                            >
                                FT...{shortId}
                            </p>
                            {/* Diamond Separator */}
                            <div className="w-full flex items-center justify-center"
                                style={{ margin: '0.4cqw 0' }}
                            >
                                <div style={{ height: '0.08cqw', width: '15%', background: 'rgba(179,143,86,0.4)' }} />
                                <span style={{ fontSize: '0.9cqw', color: 'rgba(179,143,86,0.8)', padding: '0 0.5cqw', lineHeight: 1 }}>❖</span>
                                <div style={{ height: '0.08cqw', width: '15%', background: 'rgba(179,143,86,0.4)' }} />
                            </div>
                        </div>

                        {/* Tear dashed line */}
                        <div className="w-[90%] relative z-10"
                            style={{ borderTop: '0.18cqw dashed rgba(163,128,83,0.4)', marginBottom: '0.8cqw' }}
                        />

                        {/* MT Date Code */}
                        <div className="w-full text-center relative z-10" style={{ padding: '0 0.8cqw' }}>
                            <p className="font-data font-bold text-[#3b2512]"
                                style={{
                                    fontSize: '1.5cqw',
                                    padding: '0.4cqw 0',
                                    borderRadius: '0.3cqw',
                                }}
                            >
                                MT-2026-XQ
                            </p>
                        </div>
                    </div>

                    {/* ========== RIGHT SECTION: DETAILS PANEL ========== */}
                    <div className="absolute z-[20] flex flex-col"
                        style={{
                            right: '2%',
                            top: '6%',
                            width: '20%',
                            height: '88%',
                        }}
                    >
                        {/* Golden glitter background for right panel */}
                        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '1cqw' }}>
                            <div className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(12,7,2,1), rgba(30,20,5,0.98), rgba(12,7,2,1))',
                                }}
                            />
                            {/* Golden shimmer edge on left side */}
                            <div className="absolute top-0 left-0 w-[2%] h-full"
                                style={{
                                    background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)',
                                }}
                            />
                            {/* Sparkle particles in the background */}
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div key={`rsp-${i}`}
                                    style={{
                                        position: 'absolute',
                                        width: `${0.15 + Math.random() * 0.3}cqw`,
                                        height: `${0.15 + Math.random() * 0.3}cqw`,
                                        borderRadius: '50%',
                                        background: '#ffd700',
                                        opacity: 0.15 + Math.random() * 0.25,
                                        left: `${5 + Math.random() * 90}%`,
                                        top: `${5 + Math.random() * 90}%`,
                                        animation: `sparkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
                                        boxShadow: '0 0 0.3cqw rgba(255,215,0,0.4)',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full" style={{ padding: '1.5cqw 2cqw' }}>
                            {/* LOGOS */}
                            <div className="flex items-center justify-center w-full" style={{ marginBottom: '1.5cqw' }}>
                                <img src="/logo.png" alt="HackJKLU" style={{ height: '3.8cqw', objectFit: 'contain' }} />
                                <span className="font-[Cinzel] font-bold" style={{ fontSize: '1.4cqw', color: '#d4af37', paddingBottom: '0.2cqw', marginLeft: '2cqw', marginRight: '2cqw' }}>X</span>
                                <img src="/events/JkLU_Logo.webp" alt="JKLU" style={{ height: '6.5cqw', objectFit: 'contain' }} />
                            </div>

                            {/* OFFICIAL ENTRY PASS */}
                            <div className="flex items-center" style={{ gap: '0.4cqw', marginBottom: '0.6cqw' }}>
                                <TicketIcon strokeWidth={2.5} style={{ width: '1.4cqw', height: '1.4cqw', color: '#d4af37' }} />
                                <span className="font-[Cinzel] font-bold uppercase"
                                    style={{ fontSize: '0.9cqw', color: '#d4af37', letterSpacing: '0.12em' }}
                                >
                                    OFFICIAL ENTRY PASS
                                </span>
                            </div>

                            {/* Title */}
                            {!isMaanPanu && (
                                <div style={{ marginBottom: '0.8cqw' }}>
                                    <h2 className="font-[Cinzel] font-black uppercase truncate"
                                        style={{
                                            fontSize: '2.2cqw',
                                            lineHeight: 1.1,
                                            color: '#fdf6e3',
                                            textShadow: '0 0.2cqw 0.6cqw rgba(0,0,0,0.8)',
                                        }}
                                    >
                                        {mainTitle}
                                    </h2>
                                    {subTitle && (
                                        <h3 className="font-[Cinzel] font-bold uppercase truncate"
                                            style={{
                                                fontSize: '1.1cqw',
                                                color: '#e3cf9d',
                                                letterSpacing: '0.1em',
                                                marginTop: '0.3cqw',
                                                textShadow: '0 0.1cqw 0.3cqw rgba(0,0,0,0.8)',
                                            }}
                                        >
                                            {subTitle}
                                        </h3>
                                    )}
                                </div>
                            )}

                            {/* INFO GRID */}
                            <div className="flex flex-col flex-1" style={{ gap: '0.8cqw' }}>
                                {/* ATTENDEE */}
                                <div className="flex items-start" style={{ gap: '0.5cqw' }}>
                                    <User style={{ width: '1.6cqw', height: '1.6cqw', color: '#d4af37', marginTop: '0.1cqw', flexShrink: 0 }} strokeWidth={2.5} />
                                    <div style={{ borderBottom: '0.08cqw solid rgba(212,175,55,0.2)', paddingBottom: '0.4cqw', width: '90%' }}>
                                        <p className="font-[Cinzel] font-bold uppercase"
                                            style={{ fontSize: '0.8cqw', color: '#d4af37', letterSpacing: '0.1em' }}
                                        >
                                            ATTENDEE
                                        </p>
                                        <p className="font-[Cinzel] font-black truncate"
                                            style={{ fontSize: '1.4cqw', color: 'white', marginTop: '0.1cqw' }}
                                        >
                                            {attendee}
                                        </p>
                                    </div>
                                </div>

                                {/* VENUE */}
                                <div className="flex items-start" style={{ gap: '0.5cqw' }}>
                                    <MapPin style={{ width: '1.6cqw', height: '1.6cqw', color: '#d4af37', marginTop: '0.1cqw', flexShrink: 0 }} strokeWidth={2.5} />
                                    <div style={{ borderBottom: '0.08cqw solid rgba(212,175,55,0.2)', paddingBottom: '0.4cqw', width: '90%' }}>
                                        <p className="font-[Cinzel] font-bold uppercase"
                                            style={{ fontSize: '0.8cqw', color: '#d4af37', letterSpacing: '0.1em' }}
                                        >
                                            VENUE
                                        </p>
                                        <p className="font-[Cinzel] font-black leading-tight"
                                            style={{ fontSize: '1.4cqw', color: 'white', marginTop: '0.1cqw' }}
                                        >
                                            {venue}
                                        </p>
                                    </div>
                                </div>

                                {/* SCHEDULE */}
                                <div className="flex items-start" style={{ gap: '0.5cqw' }}>
                                    <Clock style={{ width: '1.6cqw', height: '1.6cqw', color: '#d4af37', marginTop: '0.1cqw', flexShrink: 0 }} strokeWidth={2.5} />
                                    <div style={{ width: '90%' }}>
                                        <p className="font-[Cinzel] font-bold uppercase"
                                            style={{ fontSize: '0.8cqw', color: '#d4af37', letterSpacing: '0.1em' }}
                                        >
                                            SCHEDULE
                                        </p>
                                        <p className="font-data font-black"
                                            style={{ fontSize: '1.4cqw', color: 'white', marginTop: '0.1cqw' }}
                                        >
                                            {datePart}
                                        </p>
                                        {timePart && (
                                            <p className="font-data italic"
                                                style={{ fontSize: '1cqw', color: 'rgba(255,255,255,0.7)', marginTop: '0.1cqw' }}
                                            >
                                                • {timePart}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM BADGES */}
                            <div className="flex items-center justify-center" style={{ gap: '0.4cqw', marginTop: 'auto' }}>
                                <span className="font-data font-medium"
                                    style={{
                                        fontSize: '0.8cqw',
                                        color: '#a09476',
                                        border: '0.06cqw solid rgba(160,148,118,0.3)',
                                        padding: '0.15cqw 0.4cqw',
                                        background: 'rgba(0,0,0,0.4)',
                                    }}
                                >
                                    MT-2026-XQ
                                </span>
                                <div className="inline-flex items-center justify-center" style={{
                                    padding: '0.2cqw 0.5cqw',
                                    border: '0.06cqw solid #16a34a',
                                    background: 'rgba(20,83,45,0.4)',
                                    borderRadius: '0.2cqw',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <span className="font-data font-bold uppercase"
                                        style={{
                                            fontSize: '0.75cqw',
                                            color: '#22c55e',
                                            letterSpacing: '0.1em',
                                            lineHeight: 'normal',
                                        }}
                                    >
                                        VERIFIED
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BoardingPass;
