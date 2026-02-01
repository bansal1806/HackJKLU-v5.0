'use client';

import { motion } from 'framer-motion';

const events = [
  { title: 'Gaming Night', desc: 'Valorant & FIFA Tournament', time: 'Day 1, 10 PM' },
  { title: 'Midnight Jam', desc: 'Live Music & Bonfire', time: 'Day 2, 12 AM' },
  { title: 'Treasure Hunt', desc: 'Campus-wide quest', time: 'Day 2, 4 PM' },
];

export function Events() {
  return (
    <section
      id="events"
      className="min-h-screen bg-black flex flex-col items-center pt-28 md:pt-32 pb-20 px-4"
    >
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-[Cinzel] text-white tracking-[0.2em] mb-20 text-center">
        Side Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map((evt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-stone-900/50 border border-stone-800 p-10 text-center hover:border-gold-500 transition-colors"
          >
            <h3 className="text-2xl font-[Cinzel] text-gold-400 mb-4">{evt.title}</h3>
            <p className="text-stone-300 font-serif text-lg mb-4">{evt.desc}</p>
            <span className="inline-block py-1 px-3 bg-white/10 text-xs tracking-widest uppercase rounded-full">
              {evt.time}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
