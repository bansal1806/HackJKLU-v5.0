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
      {/* Previous Page Button - Bottom Left */}
      {previousPage && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[10000]"
        >
          <Link
            to={previousPage.path}
            className="group flex items-center gap-2 md:gap-3 transition-colors duration-300"
            style={{ color: 'var(--ivory-cream)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                Previous
              </span>
              <span
                className="text-xs md:text-base font-[Cinzel] pb-1 transition-colors"
                style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.5)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = 'var(--gold-shimmer)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = 'rgba(255, 215, 0, 0.5)')
                }
              >
                {previousPage.name}
              </span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Next Page Button - Bottom Right */}
      {nextPage && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[10000]"
        >
          {onNext && location.pathname === '/' && nextPage.path === '/about' ? (
            <button
              type="button"
              onClick={() => {
                onNext?.();
              }}
              className="group flex items-center gap-2 md:gap-3 transition-colors duration-300"
              style={{
                color: 'var(--ivory-cream)',
                background: 'transparent',
                border: 'none',
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                  Next
                </span>
                <span
                  className="text-xs md:text-base font-[Cinzel] pb-1 transition-colors"
                  style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.5)' }}
                >
                  {nextPage.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link
              to={nextPage.path}
              className="group flex items-center gap-2 md:gap-3 transition-colors duration-300"
              style={{ color: 'var(--ivory-cream)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                  Next
                </span>
                <span
                  className="text-xs md:text-base font-[Cinzel] pb-1 transition-colors"
                  style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.5)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderBottomColor = 'var(--gold-shimmer)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderBottomColor = 'rgba(255, 215, 0, 0.5)')
                  }
                >
                  {nextPage.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>
      )}
    </>
  );
}
