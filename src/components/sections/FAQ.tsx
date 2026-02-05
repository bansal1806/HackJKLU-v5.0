'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, ChevronDown, Zap, Shield, Hammer, Sun, ScrollText, Trophy, Flame, Coins, Scale, Gavel } from 'lucide-react';
import NextImage, { StaticImageData } from 'next/image';

// Background Images for FAQ Halls
import zeusBg from '../../assets/faq/zeus.webp';
import athenaBg from '../../assets/faq/athena.webp';
import hephaestusBg from '../../assets/faq/hephaestus.webp';
import apolloBg from '../../assets/faq/apollo.webp';

// --- Types ---
type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
};

type Question = {
  id: string;
  q: string;
  a: string;
  related?: string[];
};

type Hall = {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  colors: ThemeColors;
  questions: Question[];
  backgroundImage: StaticImageData;
};

// --- Data: Oracle Questions (FAQ) ---
const halls: Hall[] = [
  {
    id: 'zeus',
    name: 'Hall of Zeus',
    subtitle: "The King's Throne",
    icon: Zap,
    description: 'Seek guidance on the laws of the land, eligibility, and the divine rules that govern this realm.',
    colors: { primary: '#D4AF37', secondary: '#001F3F', accent: '#FFFFFF', glow: 'rgba(212, 175, 55, 0.6)' },
    backgroundImage: zeusBg,
    questions: [
      { id: 'z1', q: 'Who can participate?', a: 'Any student with a valid ID card from a recognized institute can participate. Undergraduate students are welcome into the arena.' },
      { id: 'z2', q: 'Do I need prior experience?', a: 'No! The gods favor the bold. Beginners are welcome, and we have mentors to guide you through your first odyssey.' },
      { id: 'z3', q: 'What are the eligibility criteria?', a: 'You must be a verified student. Teams can have 2-5 members. Inter-college teams are allowed.' },
    ],
  },
  {
    id: 'athena',
    name: 'Hall of Athena',
    subtitle: 'The Council Chamber',
    icon: Shield,
    description: 'Consult the goddess of wisdom for logistics, team formation, and strategic planning.',
    colors: { primary: '#C0C0C0', secondary: '#708090', accent: '#9CAF88', glow: 'rgba(192, 192, 192, 0.6)' },
    backgroundImage: athenaBg,
    questions: [
      { id: 'a1', q: 'What is the team size?', a: 'You can form an alliance of 2 to 5 members. Choose your companions wisely.' },
      { id: 'a2', q: 'Will accommodation be provided?', a: 'Yes, for our offline champions. Shelter will be available within the campus grounds during the event.' },
      { id: 'a3', q: 'What is the event schedule?', a: 'The hackathon is a 48-hour marathon. Detailed timelines will be revealed in the Hall of Apollo closer to the date.' },
    ],
  },
  {
    id: 'hephaestus',
    name: 'Hall of Hephaestus',
    subtitle: 'The Forge',
    icon: Hammer,
    description: 'Enter the forge to learn about technical requirements, submission guidelines, and judging criteria.',
    colors: { primary: '#CD7F32', secondary: '#36454F', accent: '#FF6B35', glow: 'rgba(205, 127, 50, 0.6)' },
    backgroundImage: hephaestusBg,
    questions: [
      { id: 'h1', q: 'Do we need specific tech stacks?', a: 'No specific stack is mandated. You are free to forge your creation using any tools or languages you prefer.' },
      { id: 'h2', q: 'What are the judging criteria?', a: 'Innovation, Technical Complexity, Practicality, and Presentation. Impress the judges with a complete, working prototype.' },
      { id: 'h3', q: 'How do we submit our work?', a: 'Submissions will be managed via Devfolio/GitHub. Ensure your repository is public and well-documented.' },
    ],
  },
  {
    id: 'apollo',
    name: 'Hall of Apollo',
    subtitle: "The Oracle's Chamber",
    icon: Sun,
    description: 'The Oracle sees all times. Here you will find dates, deadlines, and financial clarifications.',
    colors: { primary: '#FFD700', secondary: '#1A1510', accent: '#FFFFFF', glow: 'rgba(255, 215, 0, 0.6)' },
    backgroundImage: apolloBg,
    questions: [
      { id: 'ap1', q: 'When is the registration deadline?', a: 'The oracle decrees that registrations close few days before the event. Act swiftly!' },
      { id: 'ap2', q: 'Is there a registration fee?', a: 'No tribute is required. HackJKLU v5.0 is completely free for all participants.' },
      { id: 'ap3', q: 'What is the timeline?', a: 'The event happens on 13 to 15 March 2026. Hacking begins at 01:00 PM and ends 48 hours later.' },
    ],
  },
];

// --- Data: Laws of Olympus (Rules) ---
const laws = [
  {
    id: 'general',
    title: 'General Rules',
    subtitle: 'Zeus Decree',
    icon: Zap,
    content: [
      'HackJKLU v5.0 is open to students currently enrolled in any recognized educational institution.',
      'Each team must consist of 2 to 5 members. Teams not meeting this requirement may be disqualified.',
      'Team members may belong to different colleges or universities.',
      'A participant may be part of only one team throughout the hackathon.',
      'Participants must follow all instructions provided by the organizing team.',
      'The organizing committee reserves the right to modify rules or event structure at any time.'
    ],
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    id: 'equipment',
    title: 'Equipment Rules',
    subtitle: 'Hephaestus Forge',
    icon: Hammer,
    content: [
      'Participants must bring their own laptops, chargers, and any required accessories.',
      'All projects must be developed entirely during the hackathon duration. Pre-built projects are not allowed.',
      'Teams may use open-source libraries, APIs, and frameworks, but proper attribution must be provided.',
      'Each team is allowed to submit only one project.'
    ],
    color: 'from-red-400 to-orange-600',
  },
  {
    id: 'judging',
    title: 'Judging Rules',
    subtitle: 'Athena Wisdom',
    icon: Gavel,
    content: [
      'Projects will be judged based on: Innovation, Technical Implementation, Problem Relevance, Usability, and Impact.',
      'A panel of experienced industry professionals, mentors, and faculty members will evaluate the projects.',
      'The decision of the judges will be final and binding.',
      'Incomplete or late submissions may not be considered for evaluation.'
    ],
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'scoring',
    title: 'Scoring & Winning Criteria',
    subtitle: 'Nike Blessing',
    icon: Trophy,
    content: [
      'All projects must be submitted before the official submission deadline.',
      'Final submission must include: Project description, Source code repository link, and Demo video/live prototype.',
      'Certificates will be awarded to all participants who successfully complete the hackathon.',
      'Awards granted only to those who uphold the laws.'
    ],
    color: 'from-green-400 to-emerald-600',
  },
  {
    id: 'safety',
    title: 'Safety & Conduct',
    subtitle: 'Code of Honor',
    icon: Shield,
    content: [
      'All participants must behave respectfully towards fellow participants, mentors, judges, volunteers, and organizers.',
      'Any attempt to gain unfair advantage, disrupt the event, or misuse resources will result in disqualification.',
      'Harassment of any kind will not be tolerated and may lead to immediate removal from the event.'
    ],
    color: 'from-indigo-400 to-violet-600',
  },
  {
    id: 'disqualification',
    title: 'Disqualification',
    subtitle: 'Hades Warning',
    icon: Flame,
    content: [
      'Any form of plagiarism or unauthorized copying of code, ideas, or assets will lead to immediate disqualification.',
      'Failure to comply with any rules may result in disqualification at the discretion of the organizers.',
      'Any form of misconduct or unfair practices may lead to immediate disqualification.',
      'False registration details will lead to immediate removal.'
    ],
    color: 'from-purple-500 to-rose-800',
  },
];

// --- Components ---

const QuestionCard = ({ question, hallColors, isOpen, onToggle }: { question: Question; hallColors: ThemeColors; isOpen: boolean; onToggle: () => void; }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative overflow-hidden rounded-lg border transition-all duration-300 backdrop-blur-sm ${isOpen ? 'bg-black/40' : 'bg-black/20 hover:bg-black/30'}`}
      style={{
        borderColor: isOpen ? hallColors.primary : 'rgba(255,255,255,0.2)',
        boxShadow: isOpen ? `0 0 20px ${hallColors.glow}` : 'none',
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300" style={{ backgroundColor: hallColors.primary, opacity: isOpen ? 1 : 0.7 }} />
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 md:p-5 pl-6 md:pl-8 text-left relative z-10">
        <div className="flex items-center gap-4 pr-4">
          <span className="text-base md:text-lg font-medium transition-colors duration-300 line-clamp-2 md:line-clamp-none" style={{ color: isOpen ? hallColors.primary : '#E6E6E6' }}>{question.q}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown className={`w-5 h-5 transition-colors duration-300`} style={{ color: isOpen ? hallColors.primary : '#6B7280' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-4 md:px-5 pl-6 md:pl-8 pb-5 md:pb-6 relative z-10">
              <div className="h-px w-full mb-3 md:mb-4 opacity-30" style={{ backgroundColor: hallColors.primary }} />
              <p className="text-gray-200 leading-relaxed font-sans text-sm md:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{question.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LawCard = ({ rule, isOpen, onToggle, index }: { rule: typeof laws[0]; isOpen: boolean; onToggle: () => void; index: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative overflow-hidden rounded-2xl border-2 cursor-pointer
        transition-all duration-500 transform perspective-1000
        ${isOpen
          ? 'border-amber-500/60 shadow-[0_0_50px_rgba(245,158,11,0.25)] scale-[1.02]'
          : 'border-stone-700/40 hover:border-amber-600/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]'
        }
      `}
      style={{
        background: isOpen
          ? 'linear-gradient(135deg, rgba(30,25,20,0.98) 0%, rgba(15,10,5,0.98) 100%)'
          : 'linear-gradient(135deg, rgba(25,20,18,0.95) 0%, rgba(10,8,6,0.95) 100%)',
      }}
      onClick={onToggle}
      whileHover={{ y: -4 }}
    >
      {/* Mouse spotlight effect */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none z-0"
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          style={{
            width: 300,
            height: 300,
            background: `radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)`,
            borderRadius: '50%',
          }}
        />
      )}

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, rgba(245,158,11,0.1) 0%, transparent 50%, rgba(245,158,11,0.1) 100%)`,
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${isOpen ? 'rgba(245,158,11,0.8)' : 'rgba(245,158,11,0.3)'}, transparent)`,
        }}
        animate={{ opacity: isOpen ? 1 : 0.5 }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{
          background: `linear-gradient(to bottom, ${rule.color.includes('yellow') ? '#F59E0B' : rule.color.includes('red') ? '#EF4444' : rule.color.includes('blue') ? '#3B82F6' : rule.color.includes('green') ? '#10B981' : rule.color.includes('indigo') ? '#6366F1' : '#9333EA'}, transparent)`,
        }}
        animate={{ opacity: isOpen ? 1 : 0.6 }}
      />

      <div className="relative z-10 p-6 md:p-8 flex items-start gap-5 md:gap-6">
        {/* Icon container with glow */}
        <motion.div
          className={`relative p-4 rounded-xl bg-gradient-to-br ${rule.color} shadow-2xl shrink-0`}
          animate={{
            rotate: isHovered ? [0, -5, 5, 0] : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <rule.icon className="w-7 md:w-8 h-7 md:h-8 text-white drop-shadow-lg" />

          {/* Icon glow ring */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{
              boxShadow: isOpen
                ? ['0 0 20px rgba(245,158,11,0.4)', '0 0 40px rgba(245,158,11,0.6)', '0 0 20px rgba(245,158,11,0.4)']
                : '0 0 0px transparent'
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Burst effect on open */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 2.5 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 rounded-xl bg-white/30 blur-md"
            />
          )}
        </motion.div>

        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <motion.h3
                className="text-xl md:text-2xl font-bold tracking-wide font-serif transition-colors duration-300"
                style={{ color: isOpen ? '#F59E0B' : '#FDE68A' }}
                animate={{ textShadow: isOpen ? '0 0 20px rgba(245,158,11,0.5)' : 'none' }}
              >
                {rule.title}
              </motion.h3>
              <p className="text-stone-500 text-xs font-sans uppercase tracking-[0.25em] mt-1 font-medium">
                {rule.subtitle}
              </p>
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="shrink-0"
            >
              <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-amber-400' : 'text-stone-600'}`} />
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-5 border-t border-amber-500/20">
                  <ul className="space-y-4">
                    {rule.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.15 + idx * 0.08, type: "spring" }}
                        className="flex items-start gap-4 group/item"
                      >
                        <motion.span
                          className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 shrink-0"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                        />
                        <span className="text-stone-300 font-sans text-sm md:text-base leading-relaxed group-hover/item:text-stone-200 transition-colors">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Footer ornament */}
                <motion.div
                  className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-stone-800/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500/50" />
                  <span className="text-amber-500/60 text-lg">⚖</span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500/50" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom shine effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(245,158,11,0.03), transparent)',
        }}
        animate={{ opacity: isOpen ? 1 : 0 }}
      />
    </motion.div>
  );
};


export function FAQ() {
  const [activeTab, setActiveTab] = useState<'oracle' | 'laws'>('oracle');
  const [activeHallId, setActiveHallId] = useState<string>('zeus');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(null);
  const lawsScrollRef = useRef<HTMLDivElement>(null);

  // Forward wheel events to laws scroll container when Laws tab is active
  useEffect(() => {
    if (activeTab !== 'laws') return;

    const handleWheel = (e: WheelEvent) => {
      if (lawsScrollRef.current) {
        lawsScrollRef.current.scrollTop += e.deltaY;
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: true });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [activeTab]);

  const activeHall = halls.find((h) => h.id === activeHallId) || halls[0];

  const filteredHalls = searchQuery
    ? halls.map((hall) => ({
      ...hall,
      questions: hall.questions.filter(
        (q) => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    })).filter((h) => h.questions.length > 0)
    : [activeHall];

  const handleHallChange = (id: string) => {
    setActiveHallId(id);
    setSearchQuery('');
    setOpenQuestionId(null);
  };

  return (
    <section className="h-[100dvh] min-h-[500px] w-full bg-[#0F172A] text-white relative overflow-hidden font-cinzel flex flex-col">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
        <AnimatePresence mode="wait">
          {activeTab === 'oracle' ? (
            <motion.div
              key={`bg-${activeHall.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
              style={{ backgroundColor: activeHall.colors.secondary }}
            >
              <NextImage src={activeHall.backgroundImage} alt="Background" fill className="object-cover opacity-60 filter brightness-50 contrast-125 scale-105" placeholder="blur" priority />
              {/* Glow */}
              <motion.div initial={{ opacity: 0.1 }} animate={{ opacity: 0.15 }} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] blur-[100px]" style={{ backgroundColor: activeHall.colors.primary }} />
            </motion.div>
          ) : (
            <motion.div
              key="bg-laws"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-950"
            >
              {/* Fallback gradient background for Laws tab */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-stone-900/80 to-stone-950" />

              {/* Readability Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-stone-900/50 to-stone-950/90 mix-blend-multiply" />
              <div className="absolute inset-0 bg-black/20" />

              {/* Fog & Dust for Laws */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="absolute bg-amber-100/20 rounded-full blur-[2px] animate-pulse" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`, animationDuration: `${Math.random() * 5 + 3}s` }} />
                ))}
              </div>
              <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-950/90 via-stone-900/50 to-transparent pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl flex-1 flex flex-col min-h-0 pt-20 md:pt-32 pb-4 md:pb-8">
        {/* Page Header */}
        <header className="text-center mb-6 shrink-0">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-1 md:mb-2 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-sm">
              MOUNT OLYMPUS LIBRARY
            </h1>
            <p className="text-gray-400 font-serif italic text-sm md:text-base lg:text-lg opacity-80 decoration-slice">
              &quot;Hall of Wisdom&quot;
            </p>
          </motion.div>
        </header>

        {/* --- TABS --- */}
        <div className="flex justify-center gap-4 mb-6 md:mb-8 shrink-0">
          {['oracle', 'laws'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'oracle' | 'laws')}
              className={`
                        relative px-6 py-2 md:px-10 md:py-3 rounded-full border-2 transition-all duration-300 overflow-hidden group
                        ${activeTab === tab
                  ? 'border-yellow-500 bg-black/60 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                  : 'border-white/20 bg-black/30 hover:bg-black/40 hover:border-yellow-500/50'}
                    `}
            >
              {/* Active Glow */}
              {activeTab === tab && (
                <motion.div layoutId="tab-glow" className="absolute inset-0 bg-yellow-500/10 blur-sm" />
              )}
              <div className="relative z-10 flex items-center gap-2">
                {tab === 'oracle' ? <Coins className={`w-4 h-4 ${activeTab === tab ? 'text-yellow-400' : 'text-gray-400'}`} /> : <Scale className={`w-4 h-4 ${activeTab === tab ? 'text-yellow-400' : 'text-gray-400'}`} />}
                <span className={`font-serif font-bold tracking-wider text-sm md:text-lg ${activeTab === tab ? 'text-yellow-100' : 'text-gray-400'}`}>
                  {tab === 'oracle' ? 'Oracle Questions' : 'Laws of Olympus'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'oracle' ? (
              /* ORACLE QUESTIONS TAB */
              <motion.div
                key="oracle-content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full h-full overflow-hidden"
              >
                {/* Sidebar */}
                <aside className="w-full lg:w-[300px] shrink-0 lg:h-full flex flex-col gap-3 md:gap-4">
                  <div className="relative group shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                    <input
                      type="text"
                      placeholder="Search wisdom..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg py-2 md:py-3 pl-9 md:pl-10 pr-4 text-sm font-sans focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-500"
                    />
                  </div>
                  <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-thin scrollbar-track-transparent pr-1 pb-1 min-h-[60px] lg:min-h-0">
                    {halls.map((hall) => {
                      const isActive = activeHallId === hall.id && !searchQuery;
                      const Icon = hall.icon;
                      return (
                        <button key={hall.id} onClick={() => handleHallChange(hall.id)} className={`relative group shrink-0 lg:w-full text-left p-3 md:p-4 rounded-lg border transition-all duration-300 overflow-hidden backdrop-blur-sm ${isActive ? 'bg-black/40 border-white/20 shadow-lg' : 'bg-black/20 border-white/10 hover:bg-black/30'}`}>
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: hall.colors.primary }} />
                          {isActive && <div className="absolute left-0 bottom-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:right-auto lg:w-1 lg:h-auto" style={{ backgroundColor: hall.colors.primary }} />}
                          <div className="flex items-center justify-between relative z-10 w-full min-w-[140px] lg:min-w-0">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className={`p-1.5 md:p-2 rounded-md transition-colors duration-300 backdrop-blur-sm bg-black/50`}><Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: isActive ? hall.colors.primary : '#9CA3AF' }} /></div>
                              <div className="flex flex-col"><h3 className={`font-bold text-xs tracking-wide whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{hall.name.replace('Hall of ', '')}</h3><p className="hidden md:block text-[10px] text-gray-500 uppercase tracking-widest font-sans">{hall.questions.length} Questions</p></div>
                            </div>
                            {isActive && <motion.div layoutId="active-dot" className="hidden lg:block"><ChevronRight className="w-4 h-4 text-white opacity-50" /></motion.div>}
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </aside>

                {/* Main Questions Area */}
                <main className="flex-1 rounded-2xl p-4 md:p-6 lg:p-8 relative overflow-hidden flex flex-col min-h-0 bg-black/10 border border-white/5 backdrop-blur-sm">
                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
                    {searchQuery ? (
                      <div className="space-y-6 md:space-y-8">
                        <h2 className="text-lg md:text-xl font-bold text-gray-400 mb-4 md:mb-6 flex items-center gap-2"><Search className="w-5 h-5" /> Search Results for &quot;{searchQuery}&quot;</h2>
                        {filteredHalls.map((hall) => (
                          <div key={hall.id} className="mb-6 md:mb-8">
                            <h3 className="text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 font-bold flex items-center gap-2" style={{ color: hall.colors.primary }}><hall.icon className="w-4 h-4" />{hall.name}</h3>
                            <div className="space-y-3 md:space-y-4">{hall.questions.map((q) => <QuestionCard key={q.id} question={q} hallColors={hall.colors} isOpen={openQuestionId === q.id} onToggle={() => setOpenQuestionId(openQuestionId === q.id ? null : q.id)} />)}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.div key={activeHall.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="flex flex-col">
                          <div className="mb-6 md:mb-8 text-center md:text-left border-b border-white/20 pb-4 md:pb-6 relative shrink-0">
                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-15 blur-3xl rounded-full pointer-events-none" style={{ backgroundColor: activeHall.colors.primary }} />
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-3 md:mb-4">
                              <div className="p-2 md:p-3 rounded-xl bg-black/40 backdrop-blur-md shadow-xl border border-white/20"><activeHall.icon className="w-6 h-6 md:w-10 md:h-10" style={{ color: activeHall.colors.primary, filter: `drop-shadow(0 0 10px ${activeHall.colors.glow})` }} /></div>
                              <div><h2 className="text-xl md:text-3xl font-bold tracking-wider mb-1 md:mb-2" style={{ color: activeHall.colors.primary }}>{activeHall.name}</h2><h3 className="text-base md:text-lg text-gray-300 font-serif italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{activeHall.subtitle}</h3></div>
                            </div>
                            <p className="text-gray-200 font-sans leading-relaxed max-w-2xl mx-auto md:mx-0 text-xs md:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{activeHall.description}</p>
                          </div>
                          <div className="space-y-3 md:space-y-4">{activeHall.questions.map((q, i) => <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><QuestionCard question={q} hallColors={activeHall.colors} isOpen={openQuestionId === q.id} onToggle={() => setOpenQuestionId(openQuestionId === q.id ? null : q.id)} /></motion.div>)}</div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </main>
              </motion.div>
            ) : (
              /* LAWS OF OLYMPUS TAB */
              <motion.div
                ref={lawsScrollRef}
                key="laws-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full h-full overflow-y-auto flex justify-center scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="w-full max-w-4xl px-4 pb-20">
                  {/* Enhanced Header Intro */}
                  <motion.div
                    className="text-center mb-14 mt-6 relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Background glow effects */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500/15 blur-[60px] rounded-full pointer-events-none"
                      animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Top decorative line */}
                    <motion.div
                      className="flex items-center justify-center gap-4 mb-6"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-amber-500/60" />
                      <motion.span
                        className="text-amber-500 text-2xl"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        ⚖
                      </motion.span>
                      <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-amber-500/60" />
                    </motion.div>

                    <motion.h2
                      className="text-4xl md:text-6xl font-bold uppercase tracking-[0.2em] mb-4 font-[Cinzel] relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-amber-600 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                        The Sacred Code
                      </span>
                    </motion.h2>

                    <motion.p
                      className="text-amber-200/80 font-serif italic text-base md:text-lg max-w-lg mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      &quot;By participating, you swear upon the River Styx to honor these laws.&quot;
                    </motion.p>

                    {/* Decorative symbols */}
                    <motion.div
                      className="flex items-center justify-center gap-6 mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {['Ω', '⚔', 'Δ'].map((symbol, i) => (
                        <motion.span
                          key={i}
                          className="text-amber-500/40 text-lg font-serif"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          {symbol}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Laws Grid */}
                  <div className="space-y-5">
                    {laws.map((rule, index) => (
                      <LawCard
                        key={rule.id}
                        rule={rule}
                        isOpen={expandedRuleId === rule.id}
                        onToggle={() => setExpandedRuleId(expandedRuleId === rule.id ? null : rule.id)}
                        index={index}
                      />
                    ))}
                  </div>

                  {/* Enhanced Footer */}
                  <motion.div
                    className="mt-20 text-center relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/40" />
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <ScrollText className="w-8 h-8 text-amber-500/70" />
                      </motion.div>
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/40" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.35em] text-amber-300/50 font-[Cinzel]">
                      Decreed by the Gods of HackJKLU
                    </span>
                    <motion.div
                      className="mt-4 flex justify-center gap-2"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {['⚡', '🏛️', '⚡'].map((emoji, i) => (
                        <span key={i} className="text-sm">{emoji}</span>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
