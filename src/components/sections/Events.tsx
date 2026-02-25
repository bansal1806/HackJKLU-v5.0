'use client';

import { motion } from 'framer-motion';
import {
  Gamepad2,
  Music,
  Map,
  Pizza,
  Coffee,
  Mic,
  Laptop,
  Cpu,
  Zap,
  Star,
  Camera
} from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Gaming Night',
    desc: 'Valorant & FIFA Tournament with exciting prizes.',
    time: 'Day 1, 10:00 PM',
    icon: Gamepad2,
    color: '#ff6b6b' // Red
  },
  {
    id: 2,
    title: 'Midnight Jam',
    desc: 'Live Music, Bonfire & Open Mic session.',
    time: 'Day 2, 12:00 AM',
    icon: Music,
    color: '#4ecdc4' // Teal
  },
  {
    id: 3,
    title: 'Treasure Hunt',
    desc: 'Campus-wide mystical quest with hidden clues.',
    time: 'Day 2, 4:00 PM',
    icon: Map,
    color: '#ffd43b' // Gold
  },
  {
    id: 4,
    title: 'Midnight Pizza',
    desc: 'Fuel up with free pizza slices for all hackers.',
    time: 'Day 1, 11:30 PM',
    icon: Pizza,
    color: '#ff922b' // Orange
  },
  {
    id: 5,
    title: 'Coffee Brewing',
    desc: 'Learn to brew the perfect cup to stay awake.',
    time: 'Day 2, 2:00 AM',
    icon: Coffee,
    color: '#c92a2a' // Dark red
  },
  {
    id: 6,
    title: 'Karaoke Battle',
    desc: 'Sing your heart out and win fun goodies.',
    time: 'Day 2, 8:00 PM',
    icon: Mic,
    color: '#9775fa' // Purple
  },
  {
    id: 7,
    title: 'Speed Typing',
    desc: 'Show off your WPM and win mechanical keyboards.',
    time: 'Day 2, 10:00 AM',
    icon: Laptop,
    color: '#4dabf7' // Blue
  },
  {
    id: 8,
    title: 'Hardware Hack',
    desc: 'Tinker with Arduinos and Raspberry Pis.',
    time: 'Day 2, 1:00 PM',
    icon: Cpu,
    color: '#51cf66' // Green
  },
  {
    id: 9,
    title: 'Flash Pitch',
    desc: 'Pitch a random idea in 60 seconds.',
    time: 'Day 3, 11:00 AM',
    icon: Zap,
    color: '#fcc419' // Yellow
  },
  {
    id: 10,
    title: 'Stargazing',
    desc: 'Relax and observe the cosmic wonders.',
    time: 'Day 2, 2:00 AM',
    icon: Star,
    color: '#eebefa' // Light Pink
  },
  {
    id: 11,
    title: 'Photo Booth',
    desc: 'Capture the memories with fun glowing props.',
    time: 'Day 1-3, All Day',
    icon: Camera,
    color: '#ff8787' // Light Red
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Events() {
  return (
    <section
      id="events"
      className="relative min-h-screen bg-[#0B0C10] flex flex-col items-center pt-28 md:pt-32 pb-20 px-4 overflow-hidden"
    >
      {/* Background elements to match cosmic theme */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full flex flex-col items-center mb-16"
      >
        <h2
          className="text-4xl md:text-5xl lg:text-7xl font-[Cinzel] text-white tracking-[0.2em] text-center font-bold"
          style={{
            background: 'linear-gradient(to bottom, #fff8e7 0%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)',
            filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))'
          }}
        >
          EVENTS
        </h2>
        <p className="mt-4 text-stone-400 font-serif italic text-lg text-center max-w-2xl px-4">
          Experience a constellation of activities that go beyond just coding.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto w-full px-4"
      >
        {events.map((evt) => {
          const Icon = evt.icon;
          return (
            <motion.div
              key={evt.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                borderColor: evt.color,
                boxShadow: `0 0 20px ${evt.color}40`,
              }}
              className="group relative bg-[#1A1C23]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 overflow-hidden"
            >
              {/* Subtle gradient glow in background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${evt.color} 0%, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${evt.color}15`,
                    boxShadow: `0 0 10px ${evt.color}30`,
                    border: `1px solid ${evt.color}50`
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: evt.color }} />
                </div>
                <h3 className="text-xl font-[Cinzel] font-bold text-white mb-2 tracking-wide group-hover:text-gold-400 transition-colors">
                  {evt.title}
                </h3>
                <p className="text-stone-400 font-serif text-sm leading-relaxed mb-6 line-clamp-3">
                  {evt.desc}
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <span
                  className="inline-flex py-1.5 px-3 rounded-full text-xs font-bold tracking-widest uppercase border transition-colors"
                  style={{
                    backgroundColor: `${evt.color}10`,
                    color: evt.color,
                    borderColor: `${evt.color}30`
                  }}
                >
                  {evt.time}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
