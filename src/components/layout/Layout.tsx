
import { Menu, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    return (
        <div className="min-h-screen bg-black text-white font-serif relative overflow-hidden">
            {/* Cinematic Border Frame */}
            {/* Cinematic Border Frame */}
            <div className="fixed inset-0 border-[1px] border-white/10 pointer-events-none z-50 m-2 sm:m-4 md:m-6 transition-all duration-700"></div>

            {/* Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-30 mix-blend-overlay"></div>

            {/* Header / Top Nav */}
            <header className="fixed top-0 left-0 w-full z-40 px-8 py-8 flex justify-between items-center mix-blend-difference">
                {/* Menu Trigger */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-2 group cursor-none-hover"
                >
                    <span className="uppercase text-xs tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">Menu</span>
                    <Menu className="w-5 h-5 text-gold-500" />
                </button>

                {/* Logo / Title */}
                <div className="absolute left-1/2 -translate-x-1/2 text-center">
                    {/* Svg Logo or Text */}
                    <span className="font-[Cinzel] tracking-[0.2em] font-bold text-sm sm:text-base">THE PENDRAGON CYCLE</span>
                </div>

                {/* Audio Toggle */}
                <button onClick={() => setIsMuted(!isMuted)} className="opacity-80 hover:opacity-100 transition-opacity">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
            </header>

            {/* Main Content */}
            <main className="relative z-10">
                {children}
            </main>

            {/* Footer Minimal */}
            <footer className="fixed bottom-0 left-0 w-full z-40 px-8 py-8 flex justify-between items-end text-[10px] uppercase tracking-widest opacity-60 pointer-events-none">
                <div className="pointer-events-auto flex gap-4">
                    <a href="#" className="hover:text-gold-400 transition-colors">Terms</a>
                    <a href="#" className="hover:text-gold-400 transition-colors">Privacy</a>
                </div>
                <div>
                    MGM+
                </div>
            </footer>

            {/* Full Screen Menu Overlay (Placeholder) */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center">
                    <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 left-8 text-white">Close</button>
                    <nav className="flex flex-col gap-4 text-center">
                        {['Home', 'The Story', 'The Map', 'The Episodes', 'The People'].map((item) => (
                            <Link key={item} to="#" className="text-3xl font-[Cinzel] hover:text-gold-400 transition-colors">{item}</Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}
