import { Volume2, VolumeX, X } from 'lucide-react';
import owlLogo from '../../assets/owl-logo.png';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const menuItems = [
    { number: 'I', name: 'Home', path: '/' },
    { number: 'II', name: 'About Us', path: '/about' },
    { number: 'III', name: 'Themes', path: '/themes' },
    { number: 'IV', name: 'Prizes', path: '/prizes' },
    { number: 'V', name: 'Partners', path: '/partners' },
    { number: 'VI', name: 'Itinerary', path: '/itinerary' },
    { number: 'VII', name: 'Past Photos', path: '/gallery' },
    { number: 'VIII', name: 'FAQ', path: '/faq' },
    { number: 'IX', name: 'Events', path: '/events' }
];

export function Layout({ children }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-void-black text-ivory-cream font-serif relative" style={{ backgroundColor: 'var(--void-black)', color: 'var(--ivory-cream)' }}>
            {/* Top Line with Menu, Logo, and Sound */}
            <div className="fixed top-12 left-0 right-0 z-50">
                {/* Horizontal line - Only between Menu and Sound (not extending before/after) */}
                <div className="absolute top-0 left-26 right-20 h-px pointer-events-none" style={{ backgroundColor: 'rgba(126, 64, 49, 0.3)' }}></div>

                {/* Menu - Left */}
                <div className="absolute top-0 left-8 -translate-y-1/2 pointer-events-auto px-2">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="flex items-center gap-2 group"
                    >
                        <span className="uppercase text-sm tracking-[0.2em] transition-colors" style={{ color: 'rgba(255, 236, 209, 0.8)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--golden-amber)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 236, 209, 0.8)'}>Menu</span>
                    </button>
                </div>

                {/* Logo - Center */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto px-6 h-16 flex items-center justify-center">
                    <Link to="/" className="flex items-center transition-transform hover:scale-110 duration-300">
                        <img src={owlLogo} alt="HackJKLU Owl" className="h-16 w-auto object-contain" />
                    </Link>
                </div>

                {/* Sound Button - Right */}
                <div className="absolute top-0 right-8 -translate-y-1/2 pointer-events-auto px-2">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="opacity-80 hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--ivory-cream)' }}
                    >
                        {isMuted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Bottom Line - Only between navigation buttons */}
            <div className="fixed bottom-8 left-40 right-40 h-px pointer-events-none z-50" style={{ backgroundColor: 'rgba(126, 64, 49, 0.3)' }}></div>

            {/* Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-30 mix-blend-overlay"></div>

            {/* Main Content */}
            <main className="relative z-10">
                {children}
            </main>

            {/* Left Sidebar Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop - Semi-transparent overlay on content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 pointer-events-auto"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Sidebar Menu */}
                        <motion.div
                            initial={{ x: -400 }}
                            animate={{ x: 0 }}
                            exit={{ x: -400 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="fixed left-0 top-0 bottom-0 z-60 w-80 flex flex-col"
                            style={{ backgroundColor: 'var(--void-black)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <div className="flex justify-end p-6">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'var(--ivory-cream)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
                                        e.currentTarget.style.color = 'var(--gold-shimmer)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.color = 'var(--ivory-cream)';
                                    }}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <nav className="flex-1 px-8 py-4">
                                <div className="flex flex-col gap-6">
                                    {menuItems.map((item) => {
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-4 group transition-all"
                                                style={{
                                                    color: isActive ? 'var(--gold-shimmer)' : 'var(--ivory-cream)',
                                                    fontStyle: 'italic'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!isActive) {
                                                        e.currentTarget.style.color = 'var(--gold-shimmer)';
                                                        e.currentTarget.style.textShadow = '0 0 8px rgba(255, 215, 0, 0.6)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isActive) {
                                                        e.currentTarget.style.color = 'var(--ivory-cream)';
                                                        e.currentTarget.style.textShadow = 'none';
                                                    }
                                                }}
                                            >
                                                <span className="font-[Cinzel] text-xl tracking-wider" style={{
                                                    color: isActive ? 'var(--gold-shimmer)' : 'var(--stone-gray)',
                                                    minWidth: '2.5rem'
                                                }}>
                                                    {item.number}.
                                                </span>
                                                <span className="font-[Cinzel] text-xl tracking-wide">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </nav>

                            {/* Subscribe Section */}
                            <div className="px-8 py-4 border-t" style={{ borderColor: 'rgba(126, 64, 49, 0.3)' }}>
                                <Link
                                    to="#"
                                    className="font-[Cinzel] text-lg transition-colors block"
                                    style={{ color: 'var(--ivory-cream)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--gold-shimmer)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--ivory-cream)';
                                    }}
                                >
                                    Subscribe
                                </Link>
                            </div>

                            {/* Terms and Privacy */}
                            <div className="px-8 py-4 border-t" style={{ borderColor: 'rgba(126, 64, 49, 0.3)' }}>
                                <Link
                                    to="#"
                                    className="font-[Cinzel] text-xs transition-colors block underline"
                                    style={{ color: 'var(--stone-gray)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--ivory-cream)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--stone-gray)';
                                    }}
                                >
                                    Terms of Use & Privacy Policy
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
