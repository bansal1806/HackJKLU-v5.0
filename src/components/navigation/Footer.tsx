'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Twitter, ArrowRight, MapPin, Heart } from 'lucide-react';
import owlLogo from '@/assets/owl-logo.png';

const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Themes', path: '/themes' },
    { name: 'Prizes', path: '/prizes' },
    { name: 'Partners', path: '/partners' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Sponsor', path: '/sponsor' },
    { name: 'Itinerary', path: '/itinerary' },
    { name: 'Events', path: '/events' },
];

const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/hackjklu',
        icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
        color: '#E1306C'
    },
    {
        name: 'Twitter',
        url: 'https://x.com/HackJklu',
        icon: <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />,
        color: '#1DA1F2'
    },
    {
        name: 'Discord',
        url: 'https://discord.gg/TYyAmwzC38',
        icon: (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
        ),
        color: '#5865F2'
    },
];

interface FooterProps {
    className?: string;
}

export function Footer({ className = '' }: FooterProps) {
    return (
        <footer className={`relative transition-colors duration-500 overflow-hidden bg-black/40 backdrop-blur-xl border-t border-[#d4af37]/20 ${className}`}>

            {/* Mythic Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-[#d4af37] rounded-full blur-[80px] sm:blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-60 sm:w-96 h-60 sm:h-96 bg-[#d4af37] rounded-full blur-[100px] sm:blur-[120px] translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Greek Meander Border Top */}
            <div
                className="absolute top-0 left-0 right-0 h-3 sm:h-4 w-full opacity-40 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='10' viewBox='0 0 40 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 V0 H10 V5 H5 V10 H15 V5 H20 V0 H30 V5 H25 V10 H35 V5 H40' fill='none' stroke='%23d4af37' stroke-opacity='0.6' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '40px 10px',
                    backgroundRepeat: 'repeat-x'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">

                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">

                    {/* 1. Brand Column */}
                    <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4 sm:gap-6 text-center sm:text-left">
                        <Link href="/" className="inline-block group mx-auto sm:mx-0">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 sm:gap-3"
                            >
                                <div className="relative w-9 h-9 sm:w-12 sm:h-12">
                                    <Image src={owlLogo} alt="HackJKLU Owl" fill className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                                </div>
                                <span className="font-[Cinzel] text-xl sm:text-2xl text-[#d4af37] tracking-wider group-hover:text-white transition-colors duration-300">
                                    HACKJKLU
                                </span>
                            </motion.div>
                        </Link>
                        <p className="text-[#EFE3A0]/70 text-xs sm:text-sm leading-relaxed font-serif italic max-w-xs mx-auto sm:mx-0">
                            &quot;In the realm of code and myth, legends are forged. Join the odyssey of innovation at JK Lakshmipat University.&quot;
                        </p>

                        {/* Address Card */}
                        <div className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start pt-1 sm:pt-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37] shrink-0 mt-0.5" />
                            <p className="text-[10px] sm:text-xs text-[#EFE3A0]">
                                JK Lakshmipat University<br />
                                Near Mahindra SEZ, Jaipur<br />
                                Rajasthan, India
                            </p>
                        </div>
                    </div>

                    {/* 2. Links Column */}
                    <div className="sm:col-span-1 lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex flex-col gap-2.5 sm:gap-4">
                            <h4 className="font-[Cinzel] text-[#d4af37] text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] border-b border-[#d4af37]/30 pb-2 mb-1 sm:mb-2 inline-block">
                                EXPLORE
                            </h4>
                            {footerLinks.slice(0, 5).map((link) => (
                                <Link key={link.path} href={link.path} className="group flex items-center gap-1.5 sm:gap-2 text-[#EFE3A0]/60 hover:text-[#d4af37] transition-all text-xs sm:text-sm">
                                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2.5 sm:gap-4">
                            <h4 className="font-[Cinzel] text-[#d4af37] text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] border-b border-[#d4af37]/30 pb-2 mb-1 sm:mb-2 inline-block">
                                LEGACY
                            </h4>
                            {footerLinks.slice(5, 10).map((link) => (
                                <Link key={link.path} href={link.path} className="group flex items-center gap-1.5 sm:gap-2 text-[#EFE3A0]/60 hover:text-[#d4af37] transition-all text-xs sm:text-sm">
                                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 3. Map & Connect Column (4 cols) */}
                    <div className="sm:col-span-1 lg:col-span-4 flex flex-col gap-4 sm:gap-6">
                        <h4 className="font-[Cinzel] text-[#d4af37] text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-center sm:text-left">
                            FIND US
                        </h4>

                        {/* Map & Social Container */}
                        <div className="flex gap-4 sm:gap-6 lg:gap-8">
                            {/* Map Container */}
                            <div className="flex-1 relative group h-[140px] sm:h-[160px] lg:h-[180px]">
                                {/* Decorative Frame */}
                                <div className="absolute -inset-1 border border-[#d4af37]/30 rounded-sm pointer-events-none" />
                                <div className="absolute -inset-[3px] border border-[#d4af37]/60 rounded-sm pointer-events-none" />

                                <div className="w-full h-full rounded-sm overflow-hidden border-2 border-[#d4af37] bg-black/50 relative shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.117070008914!2d75.64722912457951!3d26.836228513374916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af4fe68f403%3A0x3bf05f95df22b8c4!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1695563431231!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="JK Lakshmipat University Location"
                                        className="opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0 w-full h-full"
                                    />
                                    {/* Gold overlay - fades out on hover */}
                                    <div className="absolute inset-0 bg-[#d4af37]/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />

                                    {/* Inner Shadow / Vignette */}
                                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] border-4 border-double border-[#d4af37]/50" />
                                </div>
                            </div>

                            {/* Social Icons - Vertical Stack on Right */}
                            <div className="flex flex-col justify-between items-center py-1">
                                <p className="text-[10px] sm:text-xs lg:text-sm text-[#d4af37] font-[Cinzel] tracking-[0.15em] sm:tracking-[0.2em] mb-4"
                                    style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
                                >
                                    JOIN US
                                </p>
                                <div className="flex flex-col gap-2 sm:gap-3">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ x: -3, scale: 1.1 }}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center text-[#EFE3A0]/60 hover:text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                            aria-label={`Follow us on ${social.name}`}
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-[#d4af37]/10 flex flex-col gap-3 sm:gap-4 items-center text-center">
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2 sm:gap-4">
                        <p className="text-[#EFE3A0]/40 text-[10px] sm:text-xs font-[Cinzel] tracking-wider">
                            © 2026 HACKJKLU V5.0. ALL RIGHTS RESERVED.
                        </p>
                        <p className="text-[#EFE3A0]/40 text-[10px] sm:text-xs font-[Cinzel] tracking-wider flex items-center gap-1.5 sm:gap-2">
                            Developed with <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500 fill-red-500 animate-pulse" /> by <span className="text-[#d4af37]">Tech Team HackJKLU</span>
                        </p>
                    </div>
                    <p className="text-[#EFE3A0]/50 text-xs sm:text-sm font-[Cinzel] tracking-wider">
                        For registration queries — <span className="text-[#d4af37]">Siddharth Ranka</span>{' '}
                        <a href="tel:+918955395771" className="text-[#d4af37] hover:text-white transition-colors duration-300">(+91 89553 95771)</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
