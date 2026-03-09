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

    // Check if it's the Maan Panu event for special text rendering
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

    // MAAN PANU ABSOLUTE IMAGE OVERLAY OVERRIDE
    if (isMaanPanu) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-[1200px] mx-auto overflow-hidden select-none bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-[2px] sm:border-[4px] border-[#2a1b0a] rounded-[16px] xl:rounded-[24px]"
                // Set the aspect ratio precisely to the image bounds (3486x1394)
                style={{ aspectRatio: '3486 / 1394', containerType: 'inline-size' }}
            >
                {/* 100% PRE-RENDERED BACKGROUND IMAGE */}
                <img
                    src="/events/maan_panu_ticket.webp"
                    alt="Maan Panu Ticket"
                    className="absolute inset-0 w-full h-full object-cover z-[0]"
                />

                {/* OVERLAYS TO COVER AND REPLACE BAKED-IN STATIC DATA FROM THE IMAGE */}

                {/* --- LEFT SIDE: QR CODE & ID PATCHES --- */}
                {/* QR Code Container covers the original QR */}
                {/* Repositioned left and resized to fit within ~20-25% layout block */}
                <div className="absolute top-[28%] left-[8%] w-[16.5%] aspect-square bg-[#ffffff] rounded-[0.8cqw] z-[10] flex items-center justify-center p-[0.8cqw] shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]">
                    <QRCodeSVG
                        value={ticketId}
                        size={512}
                        level="H"
                        className="w-[96%] h-[96%]"
                        bgColor="#ffffff"
                        fgColor="#1a0f05" // Dark thematic color
                    />
                </div>

                {/* FT... ID Patch */}
                <div className="absolute top-[70%] left-[8%] w-[17%] h-[4.5%] bg-[#ebd7b1] z-[10] flex items-center justify-center rounded-sm">
                    <p className="text-[#856133] font-mono text-[1.2cqw] tracking-[0.2em] font-medium uppercase mt-[0.2cqw]">
                        FT...{shortId}
                    </p>
                </div>

                {/* MT-2026-XQ Patch */}
                <div className="absolute top-[86%] left-[8%] w-[17%] h-[5%] bg-[#ebd7b1] z-[10] flex items-center justify-center rounded-sm">
                    <p className="text-[#3b2512] font-black font-mono text-[1.5cqw] tracking-[0.2em] uppercase mt-[0.2cqw]">
                        MT-2026-XQ
                    </p>
                </div>

                {/* --- RIGHT SIDE: INFO PANEL TEXT PATCHES --- */}
                {/* Grouped entirely inside the right 20% box constraint */}

                <div className="absolute top-[37%] right-[4%] w-[20%] h-[50%] z-[10] flex flex-col items-start gap-[5.5cqw]">
                    {/* Attendee Name Patch */}
                    <div className="w-full flex items-center bg-[#0f0701] shadow-[0_0_10px_2px_#0f0701] pl-[3cqw]">
                        <p className="text-[#e2c78d] font-bold text-[1.6cqw] uppercase font-[Cinzel] tracking-widest leading-none drop-shadow-md truncate w-full pt-[0.2cqw]">
                            {attendee}
                        </p>
                    </div>

                    {/* Venue Box Patch */}
                    <div className="w-full flex items-center bg-[#0f0701] shadow-[0_0_10px_2px_#0f0701] pl-[3.5cqw]">
                        <p className="text-white font-bold text-[1.6cqw] font-[Cinzel] tracking-widest leading-none drop-shadow-md truncate w-full pt-[0.2cqw]">
                            {venue}
                        </p>
                    </div>

                    {/* Schedule Day Box Patch */}
                    <div className="w-full flex items-center bg-[#0f0701] shadow-[0_0_10px_2px_#0f0701] pl-[3cqw]">
                        <p className="text-white font-bold text-[1.5cqw] font-[Cinzel] tracking-widest leading-none drop-shadow-md truncate w-full pt-[0.2cqw]">
                            {datePart}
                        </p>
                    </div>
                </div>

                {/* Sub-Schedule Time Box Patch */}
                <div className="absolute top-[70%] right-[4%] w-[20%] z-[10] flex items-center bg-[#0f0701] shadow-[0_0_10px_2px_#0f0701] pl-[2.8cqw]">
                    <p className="text-[#a89b7d] text-[1.4cqw] italic font-medium leading-none drop-shadow-md truncate w-full pt-[0.2cqw]">
                        {timePart ? `• ${timePart}` : '• 07:00 PM onwards'}
                    </p>
                </div>

                {/* Bottom MT ID Box Patch */}
                <div className="absolute top-[78.8%] right-[11.5%] w-[8.5%] h-[4.5%] bg-[#0f0701] z-[10] flex items-center justify-start pl-[0.2cqw] shadow-[0_0_10px_2px_#0f0701]">
                    <p className="text-[#8c7a5f] font-mono font-bold text-[1.2cqw] tracking-[0.1em] uppercase bg-[#0f0701] w-full pt-[0.2cqw]">
                        MT-2026-XQ
                    </p>
                </div>
            </motion.div>
        );
    }

    // DEFAULT RETURN FOR NON-MAAN PANU EVENTS
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-[1000px] mx-auto overflow-hidden rounded-[16px] bg-black shadow-[0_40px_80px_rgba(0,0,0,0.9)] group select-none flex flex-col sm:flex-row items-center justify-between border-[2px] sm:border-[4px] border-[#2a1b0a]"
            style={{
                aspectRatio: '2.5 / 1', // standard wide ticket
                WebkitMaskImage:
                    'radial-gradient(circle at 0px 50%, transparent 12px, black 13px), radial-gradient(circle at 100% 50%, transparent 12px, black 13px), linear-gradient(black, black)',
                WebkitMaskSize: '24px 24px, 24px 24px, calc(100% - 48px) 100%',
                WebkitMaskPosition: '-12px center, calc(100% + 12px) center, center',
                WebkitMaskRepeat: 'repeat-y, repeat-y, no-repeat',
                maskImage:
                    'radial-gradient(circle at 0px 16px, transparent 8px, black 8.5px), radial-gradient(circle at 100% 16px, transparent 8px, black 8.5px), linear-gradient(black, black)',
                maskSize: '16px 32px, 16px 32px, calc(100% - 32px) 100%',
                maskPosition: '-8px 0, calc(100% + 8px) 0, center',
                maskRepeat: 'repeat-y, repeat-y, no-repeat',
            }}
        >
            {/* BACKGROUND POSTER */}
            <div className="absolute inset-0 z-[0] overflow-hidden">
                <img
                    src={poster}
                    alt={eventTitle}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
            </div>

            {/* Glowing red artist text behind the overlays */}
            <div className="absolute top-[10%] left-0 w-full flex justify-center z-[5] pointer-events-none">
                <h1
                    className="text-[60px] sm:text-[90px] md:text-[120px] font-black tracking-[0.05em] uppercase font-[Cinzel] whitespace-nowrap opacity-80 text-transparent bg-clip-text"
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, #ff3333, #800000)',
                        WebkitTextStroke: '2px rgba(255,100,100,0.2)',
                        textShadow: '0 0 50px rgba(255,0,0,0.6)',
                        filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,1))',
                    }}
                >
                    {mainTitle}
                </h1>
            </div>

            {/* DARK THEMATIC OVERLAYS */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-black/90 pointer-events-none z-[10]" />
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%] pointer-events-none z-[10]" />
            <div className="absolute inset-0 bg-red-900/20 mix-blend-color pointer-events-none z-[10]" />

            {/* INNER GOLDEN FRAME */}
            <div className="absolute inset-[12px] sm:inset-[20px] border border-[#d4af37]/50 rounded-[8px] z-[15] pointer-events-none shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]">
                {/* Corner Accents */}
                <div className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] border border-[#d4af37] bg-black rotate-45" />
                <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] border border-[#d4af37] bg-black rotate-45" />
                <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] border border-[#d4af37] bg-black rotate-45" />
                <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] border border-[#d4af37] bg-black rotate-45" />
            </div>

            {/* MAIN CONTENT CONTAINERS */}

            {/* LEFT: PARCHMENT QR STUB (~22% width standard) */}
            <div className="relative z-[20] hidden sm:flex h-[85%] w-[22%] min-w-[200px] ml-8 lg:ml-12 bg-gradient-to-b from-[#f9f1e1] to-[#e8d6b8] rounded-xl flex-col items-center justify-between p-4 shadow-[0_20px_40px_rgba(0,0,0,0.7)] border border-[#cba165]/60 shrink-0 transform transition-transform duration-500 hover:scale-[1.02]">
                {/* Inner fainter border ring */}
                <div className="absolute inset-[4px] border border-[#d5b383]/40 rounded-lg pointer-events-none" />

                {/* QR Code Container */}
                <div className="w-[85%] aspect-square bg-white border border-[#cba165] p-[2px] mt-1 relative z-10 shadow-sm rounded-sm">
                    <QRCodeSVG
                        value={ticketId}
                        size={512}
                        level="H"
                        className="w-full h-full text-black"
                        bgColor="#ffffff"
                        fgColor="#2b1a10"
                    />
                </div>

                {/* Scan Text */}
                <div className="flex flex-col items-center w-full mt-2 relative z-10">
                    <h4 className="font-[Cinzel] font-black text-[#5c4022] text-[15px] lg:text-[18px] tracking-[0.05em] drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
                        SCAN TO VERIFY
                    </h4>

                    <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-[#b38f56]/70 to-transparent my-1" />

                    <p className="font-mono text-[11px] lg:text-[13px] text-[#555] tracking-[0.1em] opacity-90 mt-[2px]">
                        FT...{shortId}
                    </p>
                </div>

                {/* Diamond Separator */}
                <div className="w-full flex items-center justify-center relative z-10 my-[2px]">
                    <div className="h-px bg-[#b38f56]/60 w-[15%]" />
                    <span className="text-[#b38f56] text-[15px] leading-none px-[6px] pb-[1px]">❖</span>
                    <div className="h-px bg-[#b38f56]/60 w-[15%]" />
                </div>

                {/* Tear dashed line */}
                <div className="w-[105%] relative z-10 border-t border-dashed border-[#8b6e4e]/60 mb-1" />

                {/* MT Date Code */}
                <div className="w-full text-center relative z-10 pb-1">
                    <p className="font-[Cinzel] font-bold text-[#2b1a10] text-[15px] lg:text-[18px] tracking-[0.15em] drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
                        MT-2026-XQ
                    </p>
                </div>
            </div>

            {/* Mobile-only stub */}
            <div className="sm:hidden w-[90%] bg-gradient-to-b from-[#f9f1e1] to-[#e8d6b8] rounded-xl flex items-center justify-between p-3 mt-4 relative z-[20] shadow-[0_20px_40px_rgba(0,0,0,0.7)] border border-[#cba165]/60 mb-2">
                <div className="w-16 aspect-square bg-white border border-[#cba165] p-1 flex items-center justify-center relative z-10">
                    <QRCodeSVG
                        value={ticketId}
                        size={60}
                        level="M"
                        className="w-full h-full"
                        bgColor="#ffffff"
                        fgColor="#2b1a10"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="font-[Cinzel] font-black text-[#6a4f2b] text-[12px] tracking-[0.05em]">
                        SCAN TO VERIFY
                    </h4>
                    <p className="font-mono text-[10px] text-[#555] tracking-wide mt-1">FT...{shortId}</p>
                </div>
            </div>

            {/* RIGHT: INFO PANEL */}
            <div className="relative z-[20] sm:h-[80%] flex-1 ml-4 sm:ml-8 lg:ml-12 mr-8 lg:mr-12 my-auto flex flex-col justify-center pb-4 sm:pb-0">
                {/* PANEL FRAME */}
                <div className="relative bg-black/60 backdrop-blur-xl border border-[#d4af37]/40 rounded-lg p-6 lg:p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col h-full justify-between lg:h-auto lg:gap-0">
                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-4 lg:mb-6 text-[#d4af37]">
                        <TicketIcon size={18} strokeWidth={2.5} />
                        <span className="font-[Cinzel] text-[12px] lg:text-[14px] font-bold tracking-[0.2em] uppercase">
                            OFFICIAL ENTRY PASS
                        </span>
                    </div>

                    {/* TITLE */}
                    <div className="mb-4 lg:mb-6">
                        <h2 className="font-[Cinzel] font-black uppercase text-[32px] sm:text-[40px] leading-[1.1] text-[#fdf6e3]">
                            {mainTitle}
                        </h2>

                        <h3 className="font-[Cinzel] font-bold uppercase text-[18px] tracking-[0.1em] text-[#e3cf9d] mt-1">
                            {subTitle}
                        </h3>
                    </div>

                    {/* INFO STACK */}
                    <div className="flex flex-col flex-1 pb-4 lg:pb-6 justify-around lg:justify-start lg:gap-0">
                        {/* ATTENDEE */}
                        <div className="flex items-start gap-4 py-3 lg:py-4 border-t border-[#d4af37]/25 shrink-0">
                            <User
                                size={26}
                                className="text-[#d4af37] shrink-0 fill-[#d4af37]/10"
                                strokeWidth={2.5}
                            />

                            <div>
                                <p className="font-[Cinzel] text-[#d4af37] text-[12px] uppercase tracking-[0.15em] font-bold">
                                    ATTENDEE
                                </p>

                                <p className="font-[Cinzel] text-white text-[20px] font-black mt-[2px] lg:mt-1 drop-shadow-sm">
                                    {attendee}
                                </p>
                            </div>
                        </div>

                        {/* VENUE */}
                        <div className="flex items-start gap-4 py-3 lg:py-4 border-t border-[#d4af37]/25 shrink-0">
                            <MapPin
                                size={26}
                                className="text-[#d4af37] shrink-0 fill-[#d4af37]/10"
                                strokeWidth={2.5}
                            />

                            <div>
                                <p className="font-[Cinzel] text-[#d4af37] text-[12px] uppercase tracking-[0.15em] font-bold">
                                    VENUE
                                </p>

                                <p className="font-[Cinzel] text-white text-[20px] font-black mt-[2px] lg:mt-1 drop-shadow-sm">
                                    {venue}
                                </p>
                            </div>
                        </div>

                        {/* SCHEDULE */}
                        <div className="flex items-start gap-4 py-3 lg:py-4 border-t border-[#d4af37]/25 shrink-0">
                            <Clock
                                size={26}
                                className="text-[#d4af37] shrink-0 fill-[#d4af37]/5"
                                strokeWidth={2.5}
                            />

                            <div>
                                <p className="font-[Cinzel] text-[#d4af37] text-[12px] uppercase tracking-[0.15em] font-bold">
                                    SCHEDULE
                                </p>

                                <p className="font-[Cinzel] text-white text-[20px] font-black mt-[2px] lg:mt-1 drop-shadow-sm">
                                    {datePart}
                                </p>

                                {timePart && (
                                    <p className="font-[Cinzel] text-white/80 text-[16px] italic mt-1 font-medium">
                                        • {timePart}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between pt-4 lg:pt-6 border-t border-[#d4af37]/25 mt-auto">
                        <span className="font-[Cinzel] text-[#a09476] text-[16px] tracking-[0.15em]">
                            MT-2026-XQ
                        </span>

                        <div className="px-4 py-1 lg:py-[6px] border border-green-600 bg-green-900/40 rounded-sm shadow-[0_0_10px_rgba(34,197,94,0.3)] hover:bg-[#113a21] transition-colors duration-300">
                            <span className="text-green-400 font-[Cinzel] font-black text-[12px] tracking-[0.15em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                VERIFIED
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BoardingPass;
