import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/themes', label: 'Themes' },
    { path: '/prizes', label: 'Prizes' },
    { path: '/partners', label: 'Partners' },
    { path: '/itinerary', label: 'Itinerary' },
    { path: '/speakers', label: 'Speakers' },
    { path: '/gallery', label: 'Past Photos' },
    { path: '/faq', label: 'FAQ' },
    { path: '/team', label: 'Our Team' },
    { path: '/events', label: 'Events' },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-8 right-8 z-[100] p-3 rounded-full bg-stone-900/50 backdrop-blur-md border border-stone-800 text-amber-500 hover:border-amber-500 transition-colors group"
            >
                <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-xl flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 p-3 rounded-full bg-stone-900/50 border border-stone-800 text-stone-400 hover:text-white hover:border-white transition-all transform hover:rotate-90 duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <nav className="flex flex-col items-center gap-6 max-h-[80vh] overflow-y-auto px-4 scrollbar-hide">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-3xl md:text-5xl font-medieval tracking-wider transition-all duration-300 hover:text-amber-500
                      ${location.pathname === link.path ? 'text-amber-500 scale-110' : 'text-stone-300'}
                    `}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="absolute bottom-10 text-stone-600 font-cinzel text-sm tracking-[0.3em]">
                            HACKJKLU V5.0
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
