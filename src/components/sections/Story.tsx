import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { CloudTransition } from '../ui/CloudTransition';

// Static About Content
const aboutText = {
  title: 'HackJKLU v5.0',
  paragraphs: [
    'HackJKLU v5.0 is more than just a hackathon. It’s a place where ideas are turned into action. This year, the focus is majorly on creativity, teamwork, and solutions that actually matter. Participants come together to think freely, experiment boldly, and learn by actually doing the tasks.',
    'Organized at JK Lakshmipat University by the Council of Technical Affairs (JKLU), HackJKLU v5.0 brings talented students from across the country onto a single platform. With different skill sets and perspectives all teams work on real world problems that are related to technology, society, and the upcoming future.',
    'Throughout the event the participating students will be brainstorming, building, and improving their ideas through the help of mentors and experts present then and there. It’s not just about being perfect but it’s about learning, collaborating, and creating something meaningful.',
    'HackJKLU v5.0 is all about energy, innovation, and growth. Come with an idea, leave with an ultimate experience, confidence, and inspiration.',
  ],
};

export function Story() {
  const location = useLocation();
  const [showTransition, setShowTransition] = useState(() => !!location.state?.transition);

  useEffect(() => {
    if (location.state?.transition) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <section
      className="relative z-10 text-white min-h-screen pt-40 pb-40 lg:flex lg:items-center lg:justify-center lg:py-20"
      style={{
        paddingLeft: 'clamp(24px, 8vw, 96px)',
        paddingRight: 'clamp(24px, 8vw, 96px)',
        lineHeight: '1.7',
      }}
    >
      {/* Cloud Uncover Transition */}
      {showTransition && (
        <CloudTransition type="uncover" onComplete={() => setShowTransition(false)} />
      )}

      <div
        className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl"
        style={{ gap: 'clamp(40px, 8vw, 80px)' }}
      >
        {/* Text Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full lg:w-3/5"
        >
          <h1
            className="font-heading font-bold text-amber-500 mb-8 drop-shadow-md"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', // Fluid Heading
              lineHeight: '1.1',
            }}
          >
            {aboutText.title}
          </h1>

          <div
            className="text-stone-300 font-subheading leading-relaxed tracking-wide text-justify"
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', // Fluid Body Text
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {aboutText.paragraphs.map((para, index) => (
              <p key={index} className="drop-shadow-sm">
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Animated Logo - Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full lg:w-2/5 flex justify-center lg:justify-end items-center"
          style={{
            marginTop: 'clamp(0px, 5vw, 0px)', // Gap handling via parent, but extra safety
          }}
        >
          <div
            className="relative"
            style={{
              width: 'clamp(280px, 40vw, 400px)', // Fluid Logo Size
              aspectRatio: '1/1',
            }}
          >
            {/* CSS Optimized Swirling Particles - HIGH DENSITY */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {/* Ring 1 - Fast Inner Orbit (Clockwise) - 6 Particles */}
              <div className="absolute inset-0 animate-spin-normal">
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24] -translate-x-1/2 -translate-y-[140%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-300 rounded-full shadow-[0_0_5px_#fcd34d] -translate-x-1/2 translate-y-[140%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_8px_#eab308] translate-x-[140%] -translate-y-1/2"></div>
                {/* New Particles Ring 1 */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-200 rounded-full shadow-[0_0_4px_#fde68a] translate-x-[100%] translate-y-[100%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_6px_#facc15] -translate-x-[100%] -translate-y-[100%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-orange-300 rounded-full shadow-[0_0_4px_#fdba74] -translate-x-[100%] translate-y-[100%]"></div>
              </div>

              {/* Ring 2 - Slow Outer Orbit (Counter-Clockwise) - 6 Particles */}
              <div
                className="absolute inset-0 animate-spin-reverse-slower"
                style={{ opacity: 0.8 }}
              >
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-200 rounded-full shadow-[0_0_10px_#fef08a] -translate-x-1/2 -translate-y-[280%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-amber-200 rounded-full shadow-[0_0_6px_#fde68a] -translate-x-1/2 translate-y-[280%]"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_#fde047] translate-x-[280%] -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-100 rounded-full shadow-[0_0_4px_#fef3c7] -translate-x-[280%] -translate-y-1/2"></div>
                {/* New Particles Ring 2 */}
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-yellow-100 rounded-full shadow-[0_0_5px_#fef9c3] translate-x-[200%] translate-y-[200%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-50 rounded-full shadow-[0_0_4px_#fffbeb] -translate-x-[200%] -translate-y-[200%]"></div>
              </div>

              {/* Ring 3 - Tilted Elliptical Orbit - 4 Particles */}
              <div
                className="absolute inset-0 animate-spin-slow"
                style={{ transform: 'rotate(45deg)' }}
              >
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_12px_#f59e0b] translate-x-[200%] translate-y-[200%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-orange-400 rounded-full shadow-[0_0_6px_#fb923c] -translate-x-[200%] -translate-y-[200%]"></div>
                {/* New Particles Ring 3 */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-600 rounded-full shadow-[0_0_10px_#d97706] -translate-x-[200%] translate-y-[200%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-500 rounded-full shadow-[0_0_5px_#eab308] translate-x-[200%] -translate-y-[200%]"></div>
              </div>

              {/* Ring 4 - Random Scatter (Pulse) */}
              <div className="absolute inset-0 animate-pulse-slow">
                <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-white rounded-full opacity-60"></div>
                <div className="absolute bottom-[20%] right-[30%] w-1.5 h-1.5 bg-amber-200 rounded-full opacity-50"></div>
                <div className="absolute top-[40%] right-[10%] w-1 h-1 bg-yellow-100 rounded-full opacity-70"></div>
              </div>
            </div>

            {/* Static CSS Glow - INTENSIFIED */}
            <div className="absolute inset-0 bg-amber-500/30 blur-[60px] rounded-full z-[-1] animate-pulse-slow" />

            <img
              src="/logo2.webp"
              alt="HackJKLU Logo"
              className="w-full h-full object-contain relative z-10"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', // Static shadow is efficient
                animation: 'float 6s ease-in-out infinite',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* CSS Keyframes for performance */}
      <style>{`
                @keyframes spin-slow {
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse-slower {
                    to { transform: rotate(-360deg); }
                }
                @keyframes spin-normal {
                    to { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(0.9); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                .animate-spin-slow { animation: spin-slow 12s linear infinite; }
                .animate-spin-reverse-slower { animation: spin-reverse-slower 18s linear infinite; }
                .animate-spin-normal { animation: spin-normal 8s linear infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
            `}</style>
    </section>
  );
}

// Removed unused StoryBlock component
