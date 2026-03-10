'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { QRCodeCanvas } from 'qrcode.react';
import { ShoppingCart, CheckCircle, Clock, MapPin, X, Loader2, User, Ticket as TicketIcon, Gamepad2, Music, Map, Mic, Cpu, Zap, Star, Camera, Code2, Search, SlidersHorizontal, Sparkles, Flame, Bot, Palette, Glasses, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import BoardingPass from '@/components/ui/BoardingPass';

import { eventsData } from '@/data/events';

const iconMap: Record<number, any> = {
  1: Star,
  2: Code2,
  3: Mic,
  4: Gamepad2,
  13: Gamepad2,
  5: Zap,
  6: Bot,
  7: Camera,
  8: Cpu,
  9: Palette,
  10: Music,
  11: Map,
  12: Flame,
  14: Glasses,
};

export const events = eventsData.map(e => ({
  ...e,
  icon: iconMap[e.id] || Zap
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// Pre-seeded, stable ember particle data (no Math.random - avoids hydration mismatch)
const EMBER_PARTICLES = [
  { left: 23, top: 11, dur: 5.41, delay: 3.53, opacity: 0.05 },
  { left: 16, top: 80, dur: 5.81, delay: 4.56, opacity: 0.39 },
  { left: 67, top: 52, dur: 8.26, delay: 2.91, opacity: 0.09 },
  { left: 17, top: 27, dur: 9.70, delay: 3.50, opacity: 0.30 },
  { left: 70, top: 31, dur: 8.69, delay: 3.12, opacity: 0.23 },
  { left: 65, top: 73, dur: 9.73, delay: 1.07, opacity: 0.46 },
  { left: 70, top: 57, dur: 7.43, delay: 4.22, opacity: 0.08 },
  { left: 93, top: 18, dur: 9.98, delay: 0.85, opacity: 0.47 },
  { left: 77, top: 21, dur: 5.21, delay: 3.61, opacity: 0.36 },
  { left: 55, top: 34, dur: 9.76, delay: 4.39, opacity: 0.12 },
  { left: 77, top: 58, dur: 7.93, delay: 3.63, opacity: 0.46 },
  { left: 9, top: 50, dur: 6.14, delay: 0.28, opacity: 0.39 },
  { left: 39, top: 46, dur: 7.05, delay: 0.90, opacity: 0.01 },
  { left: 19, top: 60, dur: 7.07, delay: 4.99, opacity: 0.26 },
  { left: 69, top: 96, dur: 9.48, delay: 4.26, opacity: 0.02 },
  { left: 99, top: 47, dur: 6.10, delay: 1.35, opacity: 0.37 },
  { left: 32, top: 36, dur: 9.61, delay: 4.81, opacity: 0.16 },
  { left: 87, top: 46, dur: 6.98, delay: 1.42, opacity: 0.13 },
  { left: 40, top: 35, dur: 5.51, delay: 0.82, opacity: 0.08 },
  { left: 27, top: 59, dur: 5.83, delay: 3.55, opacity: 0.19 },
];

// Build a CSS string from the ember data - avoids inline style props on DOM elements
const EMBER_CSS = [
  `.ember-particle { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: radial-gradient(circle, #fff 0%, #d4af37 40%, transparent 100%); will-change: transform, opacity; }`,
  ...EMBER_PARTICLES.map((p, i) =>
    `.ember-${i} { left: ${p.left}%; top: ${p.top}%; animation: ember-rise ${p.dur}s infinite linear; animation-delay: ${p.delay}s; opacity: ${p.opacity}; }`
  ),
].join('\n');

export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'popular' | 'trending'>('all');
  type FilterId = 'all' | 'popular' | 'trending';
  const [mounted, setMounted] = useState(false);
  const { addItem, items } = useCart();

  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '', phone: '', college: '' });
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [rsvpError, setRsvpError] = useState('');
  const [rsvpTicketId, setRsvpTicketId] = useState<string | null>(null);

  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownloadTicket = async () => {
    if (!ticketRef.current || !selectedEvent) return;

    try {
      const dataUrl = await toPng(ticketRef.current, {
        backgroundColor: '#0c0702',
        pixelRatio: 2,
        cacheBust: true,
        // Prevent html-to-image from aggressively fetching external stylesheets like Google Fonts which throw CORS errors
        fontEmbedCSS: '',
        skipFonts: true, // Alternatively, you can use skipFonts: true to prevent font embedding entirely
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `HackJKLU-Ticket-${selectedEvent.title.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download ticket:', err);
    }
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setShowRsvpForm(false);
    setRsvpStatus('idle');
    setRsvpTicketId(null);
    setRsvpForm({ name: '', email: '', phone: '', college: '' });
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (!rsvpForm.name || !rsvpForm.email || !rsvpForm.phone || !rsvpForm.college) {
      setRsvpError('All fields are required');
      setRsvpStatus('error');
      return;
    }

    setRsvpStatus('loading');
    setRsvpError('');

    try {
      const res = await fetch('/api/register/free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          eventTitle: selectedEvent.title,
          attendeeName: rsvpForm.name,
          attendeeEmail: rsvpForm.email,
          attendeePhone: rsvpForm.phone,
          college: rsvpForm.college,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register');

      setRsvpTicketId(data.ticketId);
      setRsvpStatus('success');
    } catch (err) {
      setRsvpStatus('error');
      setRsvpError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.desc.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === 'all') return true;
      if (filterType === 'popular') return evt.isEpic;
      if (filterType === 'trending') return evt.isMythic;
      return true;
    });
  }, [searchQuery, filterType]);

  return (
    <section
      id="events"
      className="relative min-h-screen bg-[#020205] flex flex-col items-center pt-20 sm:pt-28 md:pt-40 pb-12 sm:pb-20 px-3 sm:px-4 overflow-hidden"
    >
      {/* 4-Layer Deep Parallax Background - Using fixed wrapper instead of bg-fixed to prevent severe mobile scroll lag */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Base Etching - CSS class handles filter to avoid inline style warning */}
        <div className="absolute inset-x-0 top-0 h-full opacity-20 bg-[url('/events/bg.png')] bg-cover bg-center bg-etch will-change-transform" />

        {/* Layer 2: Floating Sigils (Slow) */}
        <div className="absolute inset-0 flex items-center justify-around opacity-10 blur-sm overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="text-[8rem] sm:text-[14rem] md:text-[20rem] font-serif select-none will-change-transform"
              animate={{
                y: [0, -40, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {['╬⌐', '╬ú', '╬ª', '╬ö', '╬ô', '╬¿'][i]}
            </motion.div>
          ))}
        </div>

        {/* Layer 3: Ember Particle Effect - styles injected via <style> to avoid inline style warnings */}
        {mounted && (
          <div className="absolute inset-0" id="ember-layer">
            <style>{EMBER_CSS}</style>
            {EMBER_PARTICLES.map((_, i) => (
              <div key={i} className={`ember-particle ember-${i}`} />
            ))}
          </div>
        )}

        {/* Layer 4: Vignette & Depth */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,#020205_90%]" />
      </div>

      {/* Mythic Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 w-full flex flex-col items-center mb-12 sm:mb-16 md:mb-24"
      >
        <div className="relative">
          <h2 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] font-[Cinzel] font-black tracking-[-0.05em] text-transparent stroke-1 stroke-[#d4af37]/30 absolute inset-0 select-none">
            EVENTS
          </h2>
          {/* Animated Glow Layer - cheaper than animating textShadow */}
          <motion.h2
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] font-[Cinzel] font-black tracking-[-0.05em] text-[#d4af37] absolute inset-0 blur-xl z-0 will-change-opacity select-none"
          >
            EVENTS
          </motion.h2>
          {/* Foreground Text */}
          <h2 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] font-[Cinzel] font-black tracking-[-0.05em] bg-linear-to-b from-[#fff8e7] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent relative z-10 select-none">
            EVENTS
          </h2>
        </div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "min(300px, 80vw)" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent mt-3 sm:mt-4"
        />
        <p className="mt-4 sm:mt-6 text-[#d4af37] font-[Cinzel] italic text-sm sm:text-base md:text-xl tracking-[0.25em] sm:tracking-[0.4em] uppercase text-center opacity-80 px-4">
          - The XII Labours -
        </p>
      </motion.div>

      {/* Artist Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mb-16 sm:mb-24 px-4">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-3xl md:text-5xl font-[Cinzel] font-black text-[#d4af37] tracking-wider uppercase">Headliner</h3>
          <div className="h-px flex-1 bg-linear-to-r from-[#d4af37]/50 to-transparent" />
        </div>

        <div className="relative w-full overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-[#1A1C23] group h-[500px] sm:h-[600px] lg:h-[70vh]">
          <div className="absolute inset-0 bg-black">
            <img src="/events/artist_reveal.webp" alt="Artist" className="w-full h-full object-cover object-top sm:object-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-[#0B0C10] via-[#0B0C10]/80 to-transparent md:bg-linear-to-r md:from-[#0B0C10] md:via-[#0B0C10]/80 md:to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-end md:items-center h-full p-6 sm:p-8 md:p-12">
            <div className="w-full md:w-3/5 lg:w-1/2">
              <div className="transition-opacity duration-700 group-hover:opacity-0">
                <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-[Cinzel] font-black text-white mb-4 uppercase">Maan Panu</h3>
                <p className="text-stone-300 sm:text-lg italic font-serif leading-relaxed mb-6 sm:mb-8 max-w-xl">
                  Prepare for an unforgettable night of rhythm and energy. Maan Panu will take the stage to cap off the festival in spectacular fashion.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-stone-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-6">
                  <span className="flex items-center gap-2 font-data"><Clock size={16} className="text-[#d4af37]" /> 15th March, 7:00 PM</span>
                  <span className="flex items-center gap-2"><MapPin size={16} className="text-[#d4af37]" /> J.K LAKSHMIPAT UNIVERSITY</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedEvent({
                    id: 999, // Unique ID for Headliner
                    title: 'Maan Panu Live Performance',
                    desc: 'The cinematic live performance highlight of Sabrang 2026. A legendary night of music and mystery.',
                    time: '15th March, 2026 • 07:00 PM onwards',
                    location: 'J.K LAKSHMIPAT UNIVERSITY',
                    icon: Mic,
                    color: '#d4af37',
                    poster: '/events/maan_panu_ticket.webp',
                    isEpic: true,
                    isMythic: false,
                    entryFee: 0,
                    requiresBooking: false,
                    details: 'Prepare for an unforgettable night of rhythm and energy. Maan Panu will take the stage to cap off the festival in spectacular fashion.',
                  });
                  setShowRsvpForm(true);
                }}
                className="bg-[#d4af37] text-black font-[Cinzel] font-black py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-white transition-all uppercase tracking-widest text-sm mb-4 md:mb-0 relative z-20"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {false && (
        <div className="relative z-10 w-full max-w-7xl mx-auto mb-16 sm:mb-24 px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-linear-to-l from-[#d4af37]/50 to-transparent" />
            <h3 className="text-3xl md:text-5xl font-[Cinzel] font-black text-[#d4af37] tracking-wider uppercase text-right">Eminent Speakers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((speaker) => (
              <div key={speaker} className="relative group rounded-3xl overflow-hidden border border-[#d4af37]/20 bg-[#1A1C23] aspect-4/5 flex flex-col justify-end">
                <div className="absolute inset-0 bg-black">
                  <img src="/events/tech.png" alt={`Speaker ${speaker}`} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#0B0C10] via-[#0B0C10]/60 to-transparent" />
                <div className="relative z-10 p-6 sm:p-8">
                  <p className="text-[#d4af37] text-xs font-black tracking-widest uppercase mb-1">Keynote Speaker</p>
                  <h4 className="text-2xl sm:text-3xl font-[Cinzel] font-black text-white uppercase mb-2">Guest Speaker {speaker}</h4>
                  <p className="text-stone-400 text-sm italic line-clamp-2">Industry pioneer and expert joining the council to share profound knowledge and insights.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {false && (
        <div className="relative z-10 w-full mb-8 flex items-center justify-center">
          <h3 className="text-4xl md:text-6xl font-[Cinzel] font-black text-white tracking-wider uppercase text-center border-b-2 border-[#d4af37] pb-4 px-12">The Labours</h3>
        </div>
      )}

      {false && (
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-6 mb-10 sm:mb-16 md:mb-24 px-0 sm:px-4 italic">
          {/* Divine Search */}
          <div className="relative flex-1 group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1C23]/40 border border-[#d4af37]/20 rounded-2xl py-4 sm:py-5 pl-12 sm:pl-14 pr-4 sm:pr-6 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] transition-all backdrop-blur-xl relative z-10 text-base sm:text-lg font-[Cinzel]"
            />
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-[#d4af37] transition-colors z-20" size={20} />
          </div>

          {/* Oracle Sigils */}
          <div className="flex gap-2 sm:gap-4 justify-center sm:justify-end">
            {[
              { id: 'all', icon: SlidersHorizontal, label: 'All' },
              { id: 'popular', icon: Sparkles, label: 'Epic' },
              { id: 'trending', icon: Flame, label: 'Mythic' }
            ].map((type) => {
              const Icon = type.icon;
              const isActive = filterType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setFilterType(type.id as FilterId)}
                  aria-label={`Filter by ${type.label}`}
                  className={`relative flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border transition-all duration-500 group ${isActive ? 'bg-[#d4af37] border-[#d4af37] text-black scale-110 shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'bg-white/5 border-white/10 text-white hover:border-[#d4af37]/50'
                    }`}
                >
                  <Icon size={20} className={`mb-0.5 sm:mb-1 transition-transform duration-300 ${!isActive && 'group-hover:scale-125'}`} />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter">{type.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-sigil"
                      className="absolute -bottom-2 w-1.5 h-1.5 bg-[#d4af37] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Staggered Temple Pillar Grid */}
      {false && (
        <div className="relative z-10 flex flex-wrap justify-center gap-y-10 sm:gap-y-16 md:gap-y-24 gap-x-6 sm:gap-x-8 md:gap-x-12 max-w-7xl mx-auto w-full px-0 sm:px-2 md:px-4">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((evt, idx) => (
              <motion.div
                key={evt.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.04 }}
                className={`w-[calc(50%-12px)] sm:w-[calc(50%-16px)] md:w-[calc(50%-24px)] lg:w-[calc(33.33%-32px)] xl:w-[calc(25%-36px)] ${idx % 2 === 1 ? 'sm:mt-16 md:mt-24' : ''}`}
              >
                <EventCard evt={evt} onClick={() => setSelectedEvent(evt)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* No Results Placeholder */}
      {false && filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 flex flex-col items-center justify-center py-20 text-stone-500"
        >
          <Search size={48} className="mb-4 opacity-20" />
          <p className="font-[Cinzel] text-xl">No events found in the scrolls...</p>
        </motion.div>
      )}

      {/* Temple Portal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEventModal}
              className="absolute inset-0 bg-[#020205]/98 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ scale: 0.8, y: 60, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, y: 60, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              style={{ perspective: 2000 }}
              className="relative z-10 w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl h-[95vh] sm:max-h-[90vh] bg-[#0B0C10] border border-[#d4af37]/30 rounded-t-3xl sm:rounded-3xl shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col md:flex-row mythic-border-gold"
            >
              <button
                onClick={closeEventModal}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:scale-110 transition-transform backdrop-blur-md border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black"
                aria-label="Close event details"
              >
                <X size={20} />
              </button>

              {/* Poster Side: The Artifact */}
              <div className="w-full md:w-5/12 relative min-h-[30vh] sm:min-h-[35vh] md:min-h-0 bg-black overflow-hidden shrink-0">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  src={selectedEvent.poster}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1A1C23] via-transparent to-black/20" />

                <div className="absolute bottom-4 sm:bottom-12 left-4 sm:left-12 right-4 sm:right-12">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-[Cinzel] font-black text-white leading-tight uppercase"
                  >
                    {selectedEvent.title}
                  </motion.h3>
                </div>
              </div>

              {/* Details Side: The Legend */}
              <div className="flex-1 p-5 sm:p-8 md:p-10 lg:p-14 overflow-y-auto italic bg-[#1A1C23]/30 backdrop-blur-sm custom-scrollbar">
                <div className="mb-6 sm:mb-10 flex flex-wrap gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-[#d4af37]/10">
                    <Clock className="text-[#d4af37] shrink-0" size={16} />
                    <span className="text-white text-xs sm:text-sm md:text-base font-data font-bold tracking-wider sm:tracking-widest uppercase">{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-[#d4af37]/10">
                    <MapPin className="text-[#d4af37] shrink-0" size={16} />
                    <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-wider sm:tracking-widest uppercase">{selectedEvent.location}</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="prose prose-invert max-w-none mb-8 sm:mb-12"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-6">
                    <div className="h-0.5 w-8 sm:w-12 bg-[#d4af37]/30" />
                    <span className="text-[#d4af37] font-[Cinzel] text-xs sm:text-sm font-black tracking-widest uppercase">About the Event</span>
                  </div>
                  <p className="text-stone-300 text-base sm:text-lg md:text-xl leading-relaxed italic font-serif">
                    {selectedEvent.details}
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  {selectedEvent.requiresBooking ? (
                    <>
                      <div className="flex items-center justify-between bg-[#1A1C23] rounded-xl px-4 sm:px-5 py-3 border border-[#d4af37]/20">
                        <span className="text-stone-400 font-[Cinzel] text-sm">Entry Fee</span>
                        <span className="text-[#d4af37] font-data font-black text-base sm:text-lg">
                          {selectedEvent.entryFee === 0 ? 'Free' : `₹${selectedEvent.entryFee}`}
                        </span>
                      </div>
                      {items.some(i => i.eventId === selectedEvent.id) ? (
                        <div className="flex items-center justify-center gap-3 bg-green-900/20 border border-green-500/30 rounded-2xl py-4 sm:py-5">
                          <CheckCircle size={18} className="text-green-400" />
                          <span className="text-green-400 font-[Cinzel] font-black uppercase tracking-wider text-sm sm:text-base">Added to Cart</span>
                        </div>
                      ) : (
                        <div className="relative group/btn">
                          <div className="absolute -inset-1 bg-[#d4af37] blur-lg opacity-20 group-hover/btn:opacity-40 transition-opacity duration-500" />
                          <button
                            onClick={() => {
                              addItem({ eventId: selectedEvent.id, eventTitle: selectedEvent.title, quantity: 1, pricePerUnit: selectedEvent.entryFee });
                            }}
                            aria-label={`Add ${selectedEvent.title} to cart`}
                            className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-4 sm:py-5 rounded-2xl hover:bg-white transition-all active:scale-95 text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase relative z-10 flex items-center justify-center gap-2 sm:gap-3"
                          >
                            <ShoppingCart size={18} />
                            {selectedEvent.entryFee === 0 ? 'Register Free' : `Add to Cart - ₹${selectedEvent.entryFee}`}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    showRsvpForm ? (
                      <div className="bg-[#1A1C23]/60 p-4 sm:p-5 rounded-2xl border border-[#d4af37]/20 mt-2">
                        {rsvpStatus === 'success' ? (
                          <div className="flex flex-col items-center justify-center py-6 text-center">
                            <CheckCircle size={48} className="text-green-400 mb-6" />
                            <h4 className="text-xl font-[Cinzel] font-black text-white mb-2">Registration Confirmed</h4>
                            <p className="text-stone-400 text-sm mb-8 italic">Your boarding pass is ready for the quest!</p>

                            {rsvpTicketId && (
                              <div ref={ticketRef} className="w-full flex justify-center mb-4">
                                <BoardingPass
                                  ticketId={rsvpTicketId}
                                  eventTitle={selectedEvent.title}
                                  attendee={rsvpForm.name}
                                  time={selectedEvent.time}
                                  venue={selectedEvent.location}
                                  poster={selectedEvent.poster || '/events/artist_reveal.webp'}
                                />
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                              <button
                                onClick={handleDownloadTicket}
                                className="px-6 sm:px-8 py-3 bg-white/10 hover:bg-[#d4af37] border border-[#d4af37]/30 text-white hover:text-black rounded-xl transition-all font-[Cinzel] font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2"
                              >
                                <Download size={16} />
                                Download Pass
                              </button>
                              <button
                                onClick={closeEventModal}
                                className="px-6 sm:px-8 py-3 bg-[#d4af37] hover:bg-white text-black rounded-xl transition-all font-[Cinzel] font-black uppercase tracking-wider text-xs sm:text-sm"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        ) : (
                          <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-3">
                            <h4 className="text-[#d4af37] font-[Cinzel] font-black text-lg mb-2 uppercase text-center">RSVP for Free Entry</h4>
                            <input
                              type="text"
                              placeholder="Full Name"
                              value={rsvpForm.name}
                              onChange={e => setRsvpForm(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                              required
                            />
                            <input
                              type="email"
                              placeholder="Email Address"
                              value={rsvpForm.email}
                              onChange={e => setRsvpForm(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                              required
                            />
                            <div className="flex gap-3">
                              <input
                                type="tel"
                                placeholder="Phone"
                                value={rsvpForm.phone}
                                onChange={e => setRsvpForm(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-1/2 bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                                required
                              />
                              <input
                                type="text"
                                placeholder="College"
                                value={rsvpForm.college}
                                onChange={e => setRsvpForm(prev => ({ ...prev, college: e.target.value }))}
                                className="w-1/2 bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                                required
                              />
                            </div>

                            {rsvpStatus === 'error' && (
                              <div className="text-red-400 text-xs text-center mt-1">{rsvpError}</div>
                            )}

                            <div className="flex gap-3 mt-2">
                              <button
                                type="button"
                                onClick={() => setShowRsvpForm(false)}
                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-[Cinzel] py-3 rounded-xl transition-colors text-sm uppercase tracking-wider"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={rsvpStatus === 'loading'}
                                className="flex-1 bg-[#d4af37] hover:bg-white text-black font-[Cinzel] font-black py-3 rounded-xl transition-colors text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                              >
                                {rsvpStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Confirm RSVP'}
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    ) : (
                      <div className="relative group/btn">
                        <div className="absolute -inset-1 bg-[#d4af37] blur-lg opacity-20 group-hover/btn:opacity-40 transition-opacity duration-500" />
                        <button
                          onClick={() => setShowRsvpForm(true)}
                          aria-label={`RSVP for ${selectedEvent.title}`}
                          className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-4 sm:py-5 rounded-2xl hover:bg-white transition-all active:scale-95 text-base sm:text-lg md:text-xl tracking-[0.2em] uppercase relative z-10"
                        >
                          RSVP For Free
                        </button>
                      </div>
                    )
                  )}

                  <div className="flex items-center justify-center gap-4 text-stone-500 text-xs font-black tracking-[0.3em] uppercase opacity-60">
                    <div className="h-px w-8 bg-current" />
                    Status: Open
                    <div className="h-px w-8 bg-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function EventCard({ evt, onClick }: { evt: typeof events[0], onClick: () => void }) {
  // Use a ref to set CSS variables directly on the DOM node - avoids the inline-style lint warning
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'];

  return (
    <motion.div
      ref={cardRef}
      layout="position"
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group cursor-pointer flex flex-col w-full h-full relative mythic-border-gold mask-relic p-3 sm:p-4 bg-[#1A1C23] event-color-${evt.id}`}
    >
      {/* Glow Follow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 relic-glow-follow pointer-events-none" />

      {/* Background Labour Number */}
      <div className="absolute top-3 left-4 sm:top-4 sm:left-6 text-5xl sm:text-7xl font-[Cinzel] font-black text-white/5 select-none pointer-events-none group-hover:text-[#d4af37]/10 transition-colors duration-500">
        {romanNumerals[evt.id - 1]}
      </div>

      {/* Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden mb-3 sm:mb-6 bg-black mask-relic">
        <img
          src={evt.poster}
          alt={evt.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
          loading="lazy"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-[#1A1C23] via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col italic px-1 sm:px-2">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          <span className="text-[#d4af37] font-data text-[9px] sm:text-[10px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Day {evt.time.split(',')[0]}
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>

        <h3 className="text-sm sm:text-lg lg:text-xl font-[Cinzel] font-black text-white mb-1 sm:mb-2 tracking-tight group-hover:text-[#d4af37] transition-all duration-300 uppercase line-clamp-2">
          {evt.title}
        </h3>

        <p className="text-stone-500 text-[10px] sm:text-xs mb-3 sm:mb-6 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {evt.desc}
        </p>

        <div className="mt-auto flex items-center justify-between py-2 sm:py-3 border-t border-[#d4af37]/10">
          <div className="flex items-center gap-1 sm:gap-1.5 text-stone-500 min-w-0">
            <MapPin size={10} className="text-[#d4af37]/70 shrink-0" />
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider truncate">{evt.location}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-1">
            <span className="text-[#d4af37] font-data font-black text-sm sm:text-base">₹{evt.entryFee}</span>
            <span className="text-white text-[9px] sm:text-[10px] font-black tracking-widest uppercase">Select</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
