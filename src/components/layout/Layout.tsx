'use client';

import { X } from 'lucide-react';
import owlLogo from '@/assets/owl-logo.png';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { Footer } from '@/components/navigation/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { number: 'I', name: 'Home', path: '/' },
  { number: 'II', name: 'About', path: '/about' },
  { number: 'III', name: 'Themes', path: '/themes' },
  { number: 'IV', name: 'Prizes', path: '/prizes' },
  { number: 'V', name: 'Partners', path: '/partners' },
  { number: 'VI', name: 'Past Photos', path: '/gallery' },
  { number: 'VII', name: 'FAQ', path: '/faq' },
  { number: 'VIII', name: 'Why Sponsor Us ?', path: '/sponsor' },
  { number: 'IX', name: 'Call for Problems', path: '/problem-statements' },
  { number: 'X', name: 'Itinerary', path: '/itinerary' },
  { number: 'XI', name: 'Events', path: '/events' },
];

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen bg-void-black text-ivory-cream font-serif relative"
      style={{ backgroundColor: 'var(--void-black)', color: 'var(--ivory-cream)' }}
    >
      {/* Top Line with Menu and Logo */}
      <div className="fixed top-0 left-0 right-0 h-24 md:h-32 z-50 transition-all duration-300 bg-transparent">
        <div className="relative w-full h-full mt-10 md:mt-12">
          {/* Horizontal line - Only between Menu and Sound (not extending before/after) */}
          <div
            className="absolute top-0 left-20 right-20 md:left-26 md:right-20 h-px pointer-events-none"
            style={{ backgroundColor: 'rgba(126, 64, 49, 0.3)' }}
          ></div>

          {/* Menu - Left */}
          <div className="absolute top-0 left-6 md:left-8 -translate-y-1/2 pointer-events-auto px-2">
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 group">
              <span
                className="uppercase text-xs md:text-sm tracking-[0.2em] transition-colors"
                style={{ color: 'rgba(255, 236, 209, 0.8)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--golden-amber)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 236, 209, 0.8)')}
              >
                Menu
              </span>
            </button>
          </div>

          {/* Logo - Center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto px-4 md:px-6 h-12 md:h-16 flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center transition-transform hover:scale-110 duration-300"
            >
              <Image src={owlLogo} alt="HackJKLU Owl" className="h-12 md:h-16 w-auto object-contain" />
            </Link>
          </div>

          {/* Sound Button - Right */}

        </div>
      </div>

      {/* Bottom Line - Only between navigation buttons */}
      <div
        className="fixed bottom-4 md:bottom-8 left-10 right-10 md:left-40 md:right-40 h-px pointer-events-none z-50 transition-all duration-300"
        style={{ backgroundColor: 'rgba(126, 64, 49, 0.3)' }}
      ></div>

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-30 mix-blend-overlay"></div>

      {/* Main Content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <Footer />

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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 z-60 w-[85vw] sm:w-[26rem] flex flex-col shadow-2xl sidebar-menu overflow-y-auto"
              style={{ backgroundColor: 'black' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: Socials + Close Button */}
              <div className="flex items-center justify-between p-4 sm:p-6 pl-4 sm:pl-8">
                {/* Social Icons */}
                <div className="flex items-center gap-5">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/hackjklu?igsh=emlxeDluZjNueTNq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-110"
                    title="Instagram"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <defs>
                        <linearGradient id="insta_grad" x1="2" y1="21" x2="22" y2="3" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#f09433" />
                          <stop offset="0.25" stopColor="#e6683c" />
                          <stop offset="0.5" stopColor="#dc2743" />
                          <stop offset="0.75" stopColor="#cc2366" />
                          <stop offset="1" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#insta_grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" stroke="url(#insta_grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17.5 6.5H17.51" stroke="url(#insta_grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  {/* X (formerly Twitter) */}
                  <a
                    href="https://x.com/HackJklu?s=20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-110"
                    style={{ color: 'var(--ivory-cream)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
                    title="X (Twitter)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* Discord */}
                  <a
                    href="https://discord.gg/TYyAmwzC38"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-110"
                    title="Discord"
                  >
                    {/* Official Discord Logo (Clyde) - Filled */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 127.14 96.36"
                      className="w-7 h-7"
                    >
                      <path
                        fill="#5865F2"
                        d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.72-18.53.07-35.84-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.06-12.74,11.32-12.74S96.15,46,96.06,53,91,65.69,84.69,65.69Z"
                      />
                    </svg>
                  </a>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--ivory-cream)',
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
              <nav className="flex-1 px-4 sm:px-8 py-4">
                <div className="flex flex-col gap-6">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 group transition-all active:scale-95 touch-manipulation"
                        style={{
                          color: isActive ? 'var(--gold-shimmer)' : 'var(--ivory-cream)',
                          fontStyle: 'italic',
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
                        <span
                          className="font-[Cinzel] text-xl tracking-wider"
                          style={{
                            color: isActive ? 'var(--gold-shimmer)' : 'var(--stone-gray)',
                            minWidth: '2.5rem',
                          }}
                        >
                          {item.number}.
                        </span>
                        <span className="font-[Cinzel] text-xl tracking-wide">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Campus Map Section */}
              <div className="px-4 sm:px-8 py-4 border-t" style={{ borderColor: 'rgba(126, 64, 49, 0.3)' }}>
                <span className="font-[Cinzel] text-lg block mb-3 text-center" style={{ color: 'var(--d4af37)' }}>
                  — Campus Map —
                </span>

                {/* Greek Map Container */}
                <div className="w-full relative group">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-1 border border-[#d4af37]/30 rounded-sm pointer-events-none" />
                  <div className="absolute -inset-[3px] border border-[#d4af37]/60 rounded-sm pointer-events-none" />

                  <div className="w-full rounded-sm overflow-hidden border-2 border-[#d4af37] bg-black/50 relative shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.117070008914!2d75.64722912457951!3d26.836228513374916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af4fe68f403%3A0x3bf05f95df22b8c4!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1695563431231!5m2!1sen!2sin"
                      width="100%"
                      height="250"
                      style={{
                        border: 0,
                        filter: 'grayscale(100%) invert(90%) sepia(20%) contrast(0.9)',
                        transition: 'filter 0.5s ease'
                      }}
                      allowFullScreen={true}
                      loading="eager"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="JKLU Campus Map"
                      className="w-full h-[15rem] opacity-70 group-hover:opacity-100 group-hover:filter-none transition-all duration-500"
                    />

                    {/* Inner Shadow / Vignette */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] border-4 border-double border-[#d4af37]/50" />
                  </div>
                </div>
              </div>



              <div className="px-4 sm:px-8 py-6 border-t" style={{ borderColor: 'rgba(126, 64, 49, 0.3)' }}>
                <span
                  className="font-[Cinzel] text-sm transition-colors block text-center opacity-80"
                  style={{ color: 'var(--stone-gray)' }}
                >
                  © 2026 HackJKLU v5.0, All rights reserved
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
