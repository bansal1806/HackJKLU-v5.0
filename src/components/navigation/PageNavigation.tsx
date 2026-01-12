import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const pageOrder = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About Us' },
  { path: '/themes', name: 'Themes' },
  { path: '/prizes', name: 'Prizes' },
  { path: '/partners', name: 'Partners' },
  { path: '/speakers', name: 'Speakers' },
  { path: '/itinerary', name: 'Itinerary' },
  { path: '/gallery', name: 'Past Photos' },
  { path: '/faq', name: 'FAQ' },
  { path: '/events', name: 'Events' },
];

export function PageNavigation({ onNext }: { onNext?: () => void }) {
  const location = useLocation();
  const currentIndex = pageOrder.findIndex((page) => page.path === location.pathname);

  const previousPage = currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  const nextPage = currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;

  return (
    <>
      {/* Desktop/Default Navigation - Corner Buttons */}
      <div className="hidden md:block">
        {/* Previous Page Button */}
        {previousPage && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed bottom-8 left-8 z-[10000]"
          >
            <Link
              to={previousPage.path}
              className="group flex items-center gap-3 transition-colors duration-300 p-3 -m-3"
              style={{ color: 'var(--ivory-cream)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                  Previous
                </span>
                <span
                  className="nav-page-name text-base font-[Cinzel] pb-1 transition-colors whitespace-nowrap"
                  style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.5)' }}
                >
                  {previousPage.name}
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Next Page Button */}
        {nextPage && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed bottom-8 right-8 z-[10000]"
          >
            {onNext && location.pathname === '/' && nextPage.path === '/about' ? (
              <button
                type="button"
                onClick={() => onNext?.()}
                className="group flex items-center gap-3 transition-colors duration-300 p-3 -m-3"
                style={{ color: 'var(--ivory-cream)', background: 'transparent', border: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
              >
                <div className="flex flex-col items-end">
                  <span className="text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                    Next
                  </span>
                  <span
                    className="nav-page-name text-base font-[Cinzel] pb-1 transition-colors whitespace-nowrap"
                    style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.5)' }}
                  >
                    {nextPage.name}
                  </span>
                </div>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link
                to={nextPage.path}
                className="group flex items-center gap-3 transition-colors duration-300 p-3 -m-3"
                style={{ color: 'var(--ivory-cream)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
              >
                <div className="flex flex-col items-end">
                  <span className="text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                    Next
                  </span>
                  <span
                    className="nav-page-name text-base font-[Cinzel] pb-1 transition-colors whitespace-nowrap"
                    style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.5)' }}
                  >
                    {nextPage.name}
                  </span>
                </div>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </motion.div>
        )}
      </div>

      {/* Mobile Mythic Navigation Bar - Unified Pill */}
      {location.pathname !== '/' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[10000] flex items-center px-0.5 py-0.5 rounded-full bg-black/5 backdrop-blur-[2px] border border-white/5 shadow-sm"
        >
          {/* Previous link */}
          {previousPage ? (
            <Link
              to={previousPage.path}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-gold-500/40 active:bg-gold-500/5 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-[8px] uppercase tracking-widest font-cinzel text-ivory-cream/60">Prev</span>
            </Link>
          ) : (
            <div className="w-12 opacity-5 pointer-events-none flex items-center justify-center p-1.5 grayscale">
              <ChevronLeft className="w-3.5 h-3.5" />
            </div>
          )}

          {/* Divider icon */}
          <div className="w-px h-3 bg-white/5 mx-0.5" />

          {/* Next link */}
          {nextPage ? (
            onNext && location.pathname === '/' && nextPage.path === '/about' ? (
              <button
                onClick={() => onNext?.()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-gold-500/40 active:bg-gold-500/5 active:scale-95 transition-all outline-none"
              >
                <span className="text-[8px] uppercase tracking-widest font-cinzel text-ivory-cream/60">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                to={nextPage.path}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-gold-500/40 active:bg-gold-500/5 active:scale-95 transition-all"
              >
                <span className="text-[8px] uppercase tracking-widest font-cinzel text-ivory-cream/60">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )
          ) : (
            <div className="w-12 opacity-5 pointer-events-none flex items-center justify-center p-1.5 grayscale">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
