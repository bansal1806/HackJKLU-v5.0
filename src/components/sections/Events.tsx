'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import {
  Gamepad2,
  Music,
  Map,
  Mic,
  Cpu,
  Zap,
  Star,
  Camera,
  Code2,
  X,
  Clock,
  Search,
  SlidersHorizontal,
  Sparkles,
  Flame,
  MapPin,
  Bot,
  Palette,
  Glasses,
} from 'lucide-react';

// ⚠️ UPDATE entryFee values before going live - 0 means free / no booking needed
const events = [
  {
    id: 1, title: 'Space Observation',
    desc: 'Enjoy a stargazing session from the Tech Block Terrace under the open night sky.',
    time: 'Day 1, 10:00 PM - 12:00 AM', location: 'Tech Block Terrace',
    icon: Star, color: '#eebefa', poster: '/events/poster_template.png',
    isEpic: true, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'View the stars and planets from the Tech Block Terrace. Take a break from coding and enjoy a relaxing stargazing session under the night sky.',
  },
  {
    id: 2, title: 'Coding Competition',
    desc: 'Compete against others to solve algorithmic programming challenges within a time limit.',
    time: 'Day 2, 10:00 - 11:30 AM', location: 'IET Amphi',
    icon: Code2, color: '#4dabf7', poster: '/events/tech.png',
    isEpic: false, isMythic: true,
    entryFee: 50, requiresBooking: true,
    details: 'Test your programming skills by solving complex algorithmic challenges under strict time pressure. Only the most efficient coders will win.',
  },
  {
    id: 3, title: 'Open Mic Night',
    desc: 'Share your talents in singing, speaking, or performing during our midnight open mic session.',
    time: 'Day 2, 12:00 - 2:00 AM', location: 'Tech Lawn',
    icon: Mic, color: '#4ecdc4', poster: '/events/music.png',
    isEpic: true, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'The stage is yours! Share your voice, stories, or art during our late-night open mic session on the Tech Lawn.',
  },
  {
    id: 4, title: 'BGMI Tournament',
    desc: 'Form a squad and compete in a Battlegrounds Mobile India (BGMI) tournament.',
    time: 'Day 2, 10:00 AM - 4:00 PM', location: 'Gaming Zone',
    icon: Gamepad2, color: '#ff6b6b', poster: '/events/gaming.png',
    isEpic: true, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'Form a squad, drop into the map, and compete against other teams in our BGMI battle royale tournament to be the last squad standing.',
  },
  {
    id: 13, title: 'Free Fire Tournament',
    desc: 'Join our Free Fire battle royale tournament and compete to be the last player standing.',
    time: 'Day 2, 10:00 AM - 4:00 PM', location: 'Gaming Zone',
    icon: Gamepad2, color: '#ff922b', poster: '/events/gaming.png',
    isEpic: true, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'Fifty players drop onto one island in this fast-paced Free Fire battle royale tournament. Compete against others and survive to the end.',
  },
  {
    id: 5, title: 'Fun Quiz',
    desc: 'Participate in a fun, fast-paced trivia quiz covering topics like technology and pop culture.',
    time: 'Day 2, 11:30 AM - 12:30 PM', location: 'IM Amphi',
    icon: Zap, color: '#fcc419', poster: '/events/poster_template.png',
    isEpic: false, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'Answer rapid-fire trivia questions covering technology, science, pop culture, and more. Test your general knowledge in this fun competition.',
  },
  {
    id: 6, title: 'RoboSoccer',
    desc: 'Watch custom-built autonomous robots play soccer against each other on the field.',
    time: 'Day 2, 12:30 - 3:00 PM', location: 'IET Building',
    icon: Bot, color: '#51cf66', poster: '/events/tech.png',
    isEpic: false, isMythic: true,
    entryFee: 50, requiresBooking: true,
    details: 'Watch an exciting game where autonomous custom-built robots clash in a soccer match testing engineering, programming, and strategy.',
  },
  {
    id: 7, title: 'Drama Club Skit',
    desc: 'Enjoy a live theatrical performance and story presented by the college Drama Club.',
    time: 'Day 2, 4:30 - 5:00 PM', location: 'LRC Stairs',
    icon: Camera, color: '#9775fa', poster: '/events/poster_template.png',
    isEpic: true, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'Take a break and watch a live theatrical performance and storytelling spectacle presented by the talented college Drama Club on the LRC Stairs.',
  },
  {
    id: 8, title: 'Line Follower',
    desc: 'Program your robot to accurately follow a complex track as fast as possible.',
    time: 'Day 2, 2:30 - 4:00 PM', location: 'Competition Floor',
    icon: Cpu, color: '#4dabf7', poster: '/events/tech.png',
    isEpic: false, isMythic: true,
    entryFee: 50, requiresBooking: true,
    details: 'A test of robotics and precision. Program your robot to quickly and accurately navigate a complex labyrinthine line track without going off course.',
  },
  {
    id: 9, title: 'Block Printing',
    desc: 'Learn the traditional art of block printing and create your own custom designs on fabric.',
    time: 'Day 2, 1:00 - 4:00 PM', location: 'IET Building',
    icon: Palette, color: '#ff922b', poster: '/events/poster_template.png',
    isEpic: false, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'Step away from the screen to learn the traditional craft of block printing. Create and stamp your own custom artistic designs onto fabric.',
  },
  {
    id: 10, title: 'Jamming Night',
    desc: 'Bring your instruments or just your voice for a relaxed night of live music and open jamming.',
    time: 'Day 2, 11:30 PM - 2:00 AM', location: 'Tech Lawn',
    icon: Music, color: '#ff8787', poster: '/events/music.png',
    isEpic: true, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'Bring your instruments or just sing along for a relaxed night of live music and open jamming on the Tech Lawn under the stars.',
  },
  {
    id: 11, title: 'Space Object Hunt',
    desc: 'Explore the campus at night in this fun scavenger hunt to find hidden space-themed objects.',
    time: 'Day 2, 9:00 PM - 12:00 AM', location: 'Tech Block Terrace',
    icon: Map, color: '#ffd43b', poster: '/events/poster_template.png',
    isEpic: false, isMythic: true,
    entryFee: 50, requiresBooking: true,
    details: 'Join an exciting night-time scavenger hunt. Follow the clues and map to find hidden space-themed objects scattered across the entire campus.',
  },
  {
    id: 12, title: 'Dance Battle',
    desc: 'Watch or compete as dance crews face off in an energetic dance battle on the LRC Stairs.',
    time: 'Day 2, 5:00 - 8:00 PM', location: 'LRC Stairs',
    icon: Flame, color: '#ff6b6b', poster: '/events/poster_template.png',
    isEpic: true, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'Watch or compete as talented dance crews face off against each other in a high-energy dance battle competition on the LRC Stairs.',
  },
  {
    id: 14, title: 'AR-VR Zone',
    desc: 'Try out immersive experiences and games in our dedicated Augmented and Virtual Reality zone.',
    time: 'Day 2, 10:00 AM - 5:00 PM', location: 'Experience Zone',
    icon: Glasses, color: '#74c0fc', poster: '/events/tech.png',
    isEpic: false, isMythic: false,
    entryFee: 50, requiresBooking: true,
    details: 'Put on a headset and try out fully immersive virtual reality games, simulators, and augmented reality experiences in our dedicated AR-VR Experience Zone.',
  },
];

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
  `.ember-particle { position: absolute; width: 4px; height: 4px; background: #d4af37; border-radius: 50%; filter: blur(1px); }`,
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
      className="relative min-h-screen bg-[#020205] flex flex-col items-center pt-28 md:pt-40 pb-20 px-4 overflow-hidden"
    >
      {/* 4-Layer Deep Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Base Etching - CSS class handles filter to avoid inline style warning */}
        <div className="absolute inset-x-0 top-0 h-full opacity-20 bg-[url('/events/bg.png')] bg-fixed bg-cover bg-etch" />

        {/* Layer 2: Floating Sigils (Slow) */}
        <div className="absolute inset-0 flex items-center justify-around opacity-10 blur-sm overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="text-[20rem] font-serif select-none"
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
        className="relative z-10 w-full flex flex-col items-center mb-24"
      >
        <div className="relative">
          <h2 className="text-7xl md:text-[12rem] font-[Cinzel] font-black tracking-[-0.05em] text-transparent stroke-1 stroke-[#d4af37]/30 absolute inset-0 select-none">
            EVENTS
          </h2>
          <motion.h2
            animate={{
              textShadow: ["0 0 20px rgba(212,175,55,0.2)", "0 0 40px rgba(212,175,55,0.4)", "0 0 20px rgba(212,175,55,0.2)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-7xl md:text-[12rem] font-[Cinzel] font-black tracking-[-0.05em] bg-linear-to-b from-[#fff8e7] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent relative z-10"
          >
            EVENTS
          </motion.h2>
        </div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "300px" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent mt-4"
        />
        <p className="mt-6 text-[#d4af37] font-[Cinzel] italic text-xl tracking-[0.4em] uppercase text-center opacity-80">
          - The XII Labours -
        </p>
      </motion.div>

      {/* Oracle Sigils: Search & Filter */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 mb-24 px-4 italic">
        {/* Divine Search */}
        <div className="relative flex-1 group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1C23]/40 border border-[#d4af37]/20 rounded-2xl py-5 pl-14 pr-6 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] transition-all backdrop-blur-xl relative z-10 text-lg font-[Cinzel]"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-[#d4af37] transition-colors z-20" size={24} />
        </div>

        {/* Oracle Sigils */}
        <div className="flex gap-4 justify-center md:justify-end">
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
                className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl border transition-all duration-500 group ${isActive ? 'bg-[#d4af37] border-[#d4af37] text-black scale-110 shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'bg-white/5 border-white/10 text-white hover:border-[#d4af37]/50'
                  }`}
              >
                <Icon size={24} className={`mb-1 transition-transform duration-300 ${!isActive && 'group-hover:scale-125'}`} />
                <span className="text-[10px] font-black uppercase tracking-tighter">{type.label}</span>
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

      {/* Staggered Temple Pillar Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 flex flex-wrap justify-center gap-y-24 gap-x-12 max-w-7xl mx-auto w-full px-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((evt, idx) => (
            <div
              key={evt.id}
              className={`w-full sm:w-[calc(50%-24px)] lg:w-[calc(33.33%-32px)] xl:w-[calc(25%-36px)] ${idx % 2 === 1 ? 'md:mt-24' : ''
                }`}
            >
              <EventCard evt={evt} onClick={() => setSelectedEvent(evt)} />
            </div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results Placeholder */}
      {filteredEvents.length === 0 && (
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
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-[#020205]/98 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ scale: 0.8, y: 100, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, y: 100, opacity: 0, rotateX: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-[#0B0C10] border border-[#d4af37]/30 rounded-4xl shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col md:flex-row mythic-border-gold mask-relic"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-30 w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:scale-110 transition-transform backdrop-blur-md border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black"
                aria-label="Close event details"
              >
                <X size={24} />
              </button>

              {/* Poster Side: The Artifact */}
              <div className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-0 bg-black overflow-hidden group">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  src={selectedEvent.poster}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover transition-transform duration-10000 linear"
                />

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0B0C10] via-transparent to-black/30" />
                <div className="absolute top-10 left-10 p-6 border-l-2 border-t-2 border-[#d4af37]/50 w-24 h-24 pointer-events-none" />
                <div className="absolute bottom-10 right-10 p-6 border-r-2 border-b-2 border-[#d4af37]/50 w-24 h-24 pointer-events-none" />

                <div className="absolute bottom-12 left-12 right-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-[#1A1C23] border border-[#d4af37]/30 shadow-[0_0_30px_rgba(var(--evt-rgb),0.3)] event-color-${selectedEvent.id}`}
                  >
                    <selectedEvent.icon className="w-10 h-10 text-(--evt-color)" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-7xl font-[Cinzel] font-black text-white leading-none uppercase"
                  >
                    {selectedEvent.title}
                  </motion.h3>
                </div>
              </div>

              {/* Details Side: The Legend */}
              <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto italic bg-[#1A1C23]/30 backdrop-blur-sm custom-scrollbar">
                <div className="mb-12 flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-xl border border-[#d4af37]/10">
                    <Clock className="text-[#d4af37]" size={20} />
                    <span className="text-white text-base font-bold tracking-widest uppercase">{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-xl border border-[#d4af37]/10">
                    <MapPin className="text-[#d4af37]" size={20} />
                    <span className="text-white text-base font-bold tracking-widest uppercase">{selectedEvent.location}</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="prose prose-invert max-w-none mb-16"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-0.5 w-12 bg-[#d4af37]/30" />
                    <span className="text-[#d4af37] font-[Cinzel] text-sm font-black tracking-widest uppercase">About the Event</span>
                  </div>
                  <p className="text-stone-300 text-xl leading-relaxed italic font-serif">
                    {selectedEvent.details}
                  </p>
                </motion.div>

                <div className="flex flex-col gap-4">
                  {selectedEvent.requiresBooking ? (
                    <>
                      <div className="flex items-center justify-between bg-[#1A1C23] rounded-xl px-5 py-3 border border-[#d4af37]/20">
                        <span className="text-stone-400 font-[Cinzel] text-sm">Entry Fee</span>
                        <span className="text-[#d4af37] font-[Cinzel] font-black text-lg">
                          {selectedEvent.entryFee === 0 ? 'Free' : `₹${selectedEvent.entryFee}`}
                        </span>
                      </div>
                      {items.some(i => i.eventId === selectedEvent.id) ? (
                        <div className="flex items-center justify-center gap-3 bg-green-900/20 border border-green-500/30 rounded-2xl py-5">
                          <CheckCircle size={20} className="text-green-400" />
                          <span className="text-green-400 font-[Cinzel] font-black uppercase tracking-wider">Added to Cart</span>
                        </div>
                      ) : (
                        <div className="relative group/btn">
                          <div className="absolute -inset-1 bg-[#d4af37] blur-lg opacity-20 group-hover/btn:opacity-40 transition-opacity duration-500" />
                          <button
                            onClick={() => {
                              addItem({ eventId: selectedEvent.id, eventTitle: selectedEvent.title, quantity: 1, pricePerUnit: selectedEvent.entryFee });
                            }}
                            aria-label={`Add ${selectedEvent.title} to cart`}
                            className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-5 rounded-2xl hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95 text-lg tracking-[0.2em] uppercase relative z-10 flex items-center justify-center gap-3"
                          >
                            <ShoppingCart size={20} />
                            {selectedEvent.entryFee === 0 ? 'Register Free' : `Add to Cart - ₹${selectedEvent.entryFee}`}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="relative group/btn">
                      <div className="absolute -inset-1 bg-[#d4af37] blur-lg opacity-20 group-hover/btn:opacity-40 transition-opacity duration-500" />
                      <button
                        onClick={() => setSelectedEvent(null)}
                        aria-label={`Join ${selectedEvent.title}`}
                        className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-6 rounded-2xl hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95 text-xl tracking-[0.2em] uppercase relative z-10"
                      >
                        Join Event
                      </button>
                    </div>
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
      layout
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group cursor-pointer flex flex-col w-full h-full relative mythic-border-gold mask-relic p-4 bg-[#1A1C23] event-color-${evt.id}`}
    >
      {/* Glow Follow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 relic-glow-follow pointer-events-none" />

      {/* Background Labour Number */}
      <div className="absolute top-4 left-6 text-7xl font-[Cinzel] font-black text-white/5 select-none pointer-events-none group-hover:text-[#d4af37]/10 transition-colors duration-500">
        {romanNumerals[evt.id - 1]}
      </div>

      {/* Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden mb-6 bg-black mask-relic">
        <img
          src={evt.poster}
          alt={evt.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-[#1A1C23] via-transparent to-black/20" />

        {/* Divine Category Icon */}
        <div className="absolute bottom-4 right-4 p-3 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/30 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <evt.icon className="w-5 h-5 text-(--evt-color)" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col italic px-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          <span className="text-[#d4af37] font-[Cinzel] text-[10px] font-black tracking-[0.2em] uppercase">
            Day {evt.time.split(',')[0]}
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>

        <h3 className="text-2xl font-[Cinzel] font-black text-white mb-2 tracking-tight group-hover:text-[#d4af37] transition-all duration-300 uppercase line-clamp-1">
          {evt.title}
        </h3>

        <p className="text-stone-500 text-xs mb-6 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {evt.desc}
        </p>

        <div className="mt-auto flex items-center justify-between py-3 border-t border-[#d4af37]/10">
          <div className="flex items-center gap-1.5 text-stone-500">
            <MapPin size={12} className="text-[#d4af37]/70" />
            <span className="text-[10px] uppercase font-bold tracking-wider">{evt.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#d4af37] font-black">₹{evt.entryFee}</span>
            <span className="text-white text-[10px] font-black tracking-widest uppercase ml-1">Select</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
