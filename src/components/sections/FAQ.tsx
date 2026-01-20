import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, ChevronDown, Zap, Shield, Hammer, Sun } from 'lucide-react';

// Background Images
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
  related?: string[]; // IDs of related questions
};

type Hall = {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  colors: ThemeColors;
  questions: Question[];
  backgroundImage: string;
};

// --- Data ---
const halls: Hall[] = [
  {
    id: 'zeus',
    name: 'Hall of Zeus',
    subtitle: "The King's Throne",
    icon: Zap,
    description:
      'Seek guidance on the laws of the land, eligibility, and the divine rules that govern this realm.',
    colors: {
      primary: '#D4AF37', // Gold
      secondary: '#001F3F', // Deep Blue
      accent: '#FFFFFF',
      glow: 'rgba(212, 175, 55, 0.6)',
    },
    backgroundImage: zeusBg,
    questions: [
      {
        id: 'z1',
        q: 'Who can participate?',
        a: 'Any student with a valid ID card from a recognized institute can participate. Both undergraduate and postgraduate students are welcome into the arena.',
      },
      {
        id: 'z2',
        q: 'Do I need prior experience?',
        a: 'No! The gods favor the bold. Beginners are welcome, and we have mentors to guide you through your first odyssey.',
      },
      {
        id: 'z3',
        q: 'What are the eligibility criteria?',
        a: 'You must be a verified student. Teams can have 1-5 members. Inter-college teams are allowed.',
      },
    ],
  },
  {
    id: 'athena',
    name: 'Hall of Athena',
    subtitle: 'The Council Chamber',
    icon: Shield,
    description:
      'Consult the goddess of wisdom for logistics, team formation, and strategic planning.',
    colors: {
      primary: '#C0C0C0', // Silver
      secondary: '#708090', // Grey
      accent: '#9CAF88', // Sage Green
      glow: 'rgba(192, 192, 192, 0.6)',
    },
    backgroundImage: athenaBg,
    questions: [
      {
        id: 'a1',
        q: 'What is the team size?',
        a: 'You can form an alliance of 1 to 5 members. Choose your companions wisely.',
      },
      {
        id: 'a2',
        q: 'Will accommodation be provided?',
        a: 'Yes, for our offline champions. Food and shelter will be provided within the campus grounds during the event.',
      },
      {
        id: 'a3',
        q: 'What is the event schedule?',
        a: 'The hackathon is a 48-hour marathon. Detailed timelines will be revealed in the Hall of Apollo closer to the date.',
      },
    ],
  },
  {
    id: 'hephaestus',
    name: 'Hall of Hephaestus',
    subtitle: 'The Forge',
    icon: Hammer,
    description:
      'Enter the forge to learn about technical requirements, submission guidelines, and judging criteria.',
    colors: {
      primary: '#CD7F32', // Bronze
      secondary: '#36454F', // Dark Grey
      accent: '#FF6B35', // Orange
      glow: 'rgba(205, 127, 50, 0.6)',
    },
    backgroundImage: hephaestusBg,
    questions: [
      {
        id: 'h1',
        q: 'Do we need specific tech stacks?',
        a: 'No specific stack is mandated. You are free to forge your creation using any tools or languages you prefer.',
      },
      {
        id: 'h2',
        q: 'What are the judging criteria?',
        a: 'Innovation, Technical Complexity, Practicality, and Presentation. Impress the judges with a complete, working prototype.',
      },
      {
        id: 'h3',
        q: 'How do we submit our work?',
        a: 'Submissions will be managed via Devfolio/GitHub. Ensure your repository is public and well-documented.',
      },
    ],
  },
  {
    id: 'apollo',
    name: 'Hall of Apollo',
    subtitle: "The Oracle's Chamber",
    icon: Sun,
    description:
      'The Oracle sees all times. Here you will find dates, deadlines, and financial clarifications.',
    colors: {
      primary: '#FFD700', // Gold
      secondary: '#FFEB3B', // Yellow
      accent: '#FFFFFF',
      glow: 'rgba(255, 215, 0, 0.6)',
    },
    backgroundImage: apolloBg,
    questions: [
      {
        id: 'ap1',
        q: 'When is the registration deadline?',
        a: 'The oracle decrees that registrations close few days before the event. Act swiftly!',
      },
      {
        id: 'ap2',
        q: 'Is there a registration fee?',
        a: 'No tribute is required. HackJKLU v5.0 is completely free for all participants.',
      },
      {
        id: 'ap3',
        q: 'What is the timeline?',
        a: 'The event happens on 13 to 15 March 2026. Hacking begins at 02:00 PM and ends 48 hours later.',
      },
    ],
  },
];

// --- Components ---

const QuestionCard = ({
  question,
  hallColors,
  isOpen,
  onToggle,
}: {
  question: Question;
  hallColors: ThemeColors;
  isOpen: boolean;
  onToggle: () => void;
}) => {
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
      {/* Hall Color Accent Bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
        style={{ backgroundColor: hallColors.primary, opacity: isOpen ? 1 : 0.7 }}
      />

      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 pl-6 md:pl-8 text-left relative z-10"
      >
        <div className="flex items-center gap-4 pr-4">
          <span
            className="text-base md:text-lg font-medium transition-colors duration-300 line-clamp-2 md:line-clamp-none"
            style={{ color: isOpen ? hallColors.primary : '#E6E6E6' }}
          >
            {question.q}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown
            className={`w-5 h-5 transition-colors duration-300`}
            style={{ color: isOpen ? hallColors.primary : '#6B7280' }}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 md:px-5 pl-6 md:pl-8 pb-5 md:pb-6 relative z-10">
              {/* Divider */}
              <div
                className="h-px w-full mb-3 md:mb-4 opacity-30"
                style={{ backgroundColor: hallColors.primary }}
              />
              <p className="text-gray-200 leading-relaxed font-sans text-sm md:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {question.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function FAQ() {
  const [activeHallId, setActiveHallId] = useState<string>('zeus');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const activeHall = halls.find((h) => h.id === activeHallId) || halls[0];

  // Preload images removed for lazy loading performance

  // Filter questions based on search
  const filteredHalls = searchQuery
    ? halls
      .map((hall) => ({
        ...hall,
        questions: hall.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((h) => h.questions.length > 0)
    : [activeHall];

  const handleHallChange = (id: string) => {
    setActiveHallId(id);
    setSearchQuery('');
    setOpenQuestionId(null);
  };

  return (
    <section className="h-[100dvh] min-h-[500px] w-full bg-[#0F172A] text-white relative overflow-hidden font-cinzel flex flex-col">
      {/* Background Ambience with Hall Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hall Background Image */}
        <AnimatePresence>
          <motion.div
            key={activeHall.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={{ backgroundColor: activeHall.colors.secondary }} // Placeholder color
          >
            <img
              src={activeHall.backgroundImage}
              alt={`${activeHall.name} background`}
              className="w-full h-full object-cover transition-opacity duration-700"
              loading="lazy"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              style={{
                filter: 'brightness(0.4) contrast(1.1)',
                transform: 'scale(1.05)',
                opacity: 0, // Start invisible, fade in on load
              }}
            />
            {/* Very subtle overlay for minimal text readability */}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Colored Glow Effect */}
        <motion.div
          key={`glow-${activeHall.id}`}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] blur-[100px]"
          style={{ backgroundColor: activeHall.colors.primary }}
        />

        {/* Greek Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl flex-1 flex flex-col min-h-0 pt-20 md:pt-32 pb-4 md:pb-24">
        {/* Page Header */}
        <header className="text-center mb-4 md:mb-8 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-1 md:mb-2 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-sm">
              MOUNT OLYMPUS LIBRARY
            </h1>
            <p className="text-gray-400 font-serif italic text-sm md:text-base lg:text-lg opacity-80 decoration-slice">
              "Seek wisdom from the divine ones"
            </p>
          </motion.div>
        </header>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-full overflow-hidden">
          {/* Sidebar / Navigation */}
          <aside className="w-full lg:w-[300px] shrink-0 lg:h-full flex flex-col gap-3 md:gap-4">
            {/* Search Bar */}
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

            {/* Hall Navigation - Scrollable if needed */}
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-thin scrollbar-track-transparent pr-1 pb-1 min-h-[60px] lg:min-h-0">
              {halls.map((hall) => {
                const isActive = activeHallId === hall.id && !searchQuery;
                const Icon = hall.icon;

                return (
                  <button
                    key={hall.id}
                    onClick={() => handleHallChange(hall.id)}
                    className={`relative group shrink-0 lg:w-full text-left p-3 md:p-4 rounded-lg border transition-all duration-300 overflow-hidden backdrop-blur-sm ${isActive ? 'bg-black/40 border-white/20 shadow-lg' : 'bg-black/20 border-white/10 hover:bg-black/30'}`}
                  >
                    {/* Hover Glow Background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundColor: hall.colors.primary }}
                    />

                    {/* Active Indicator */}
                    {isActive && (
                      <div
                        className="absolute left-0 bottom-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:right-auto lg:w-1 lg:h-auto"
                        style={{ backgroundColor: hall.colors.primary }}
                      />
                    )}

                    <div className="flex items-center justify-between relative z-10 w-full min-w-[140px] lg:min-w-0">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div
                          className={`p-1.5 md:p-2 rounded-md transition-colors duration-300 backdrop-blur-sm ${isActive ? 'bg-black/50' : 'bg-black/50'}`}
                        >
                          <Icon
                            className="w-4 h-4 md:w-5 md:h-5"
                            style={{ color: isActive ? hall.colors.primary : '#9CA3AF' }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3
                            className={`font-bold text-xs tracking-wide whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}
                          >
                            {hall.name.replace('Hall of ', '')}
                          </h3>
                          <p className="hidden md:block text-[10px] text-gray-500 uppercase tracking-widest font-sans">
                            {hall.questions.length} Questions
                          </p>
                        </div>
                      </div>

                      {isActive && (
                        <motion.div layoutId="active-dot" className="hidden lg:block">
                          <ChevronRight className="w-4 h-4 text-white opacity-50" />
                        </motion.div>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 rounded-2xl p-4 md:p-6 lg:p-8 relative overflow-hidden flex flex-col min-h-0 bg-black/10 border border-white/5 backdrop-blur-sm">
            {/* Scrollable Inner Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
              {/* SEARCH RESULTS VIEW */}
              {searchQuery ? (
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-lg md:text-xl font-bold text-gray-400 mb-4 md:mb-6 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Results for "{searchQuery}"
                  </h2>
                  {filteredHalls.map((hall) => (
                    <div key={hall.id} className="mb-6 md:mb-8">
                      <h3
                        className="text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 font-bold flex items-center gap-2"
                        style={{ color: hall.colors.primary }}
                      >
                        <hall.icon className="w-4 h-4" />
                        {hall.name}
                      </h3>
                      <div className="space-y-3 md:space-y-4">
                        {hall.questions.map((q) => (
                          <QuestionCard
                            key={q.id}
                            question={q}
                            hallColors={hall.colors}
                            isOpen={openQuestionId === q.id}
                            onToggle={() =>
                              setOpenQuestionId(openQuestionId === q.id ? null : q.id)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  {filteredHalls.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                      <p className="text-base md:text-lg italic">
                        "The scrolls contain no wisdom matching your query..."
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* HALL VIEW */
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHall.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col"
                  >
                    {/* Hall Header */}
                    <div className="mb-6 md:mb-8 text-center md:text-left border-b border-white/20 pb-4 md:pb-6 relative shrink-0">
                      <div
                        className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-15 blur-3xl rounded-full pointer-events-none"
                        style={{ backgroundColor: activeHall.colors.primary }}
                      />

                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-3 md:mb-4">
                        <div className="p-2 md:p-3 rounded-xl bg-black/40 backdrop-blur-md shadow-xl border border-white/20">
                          <activeHall.icon
                            className="w-6 h-6 md:w-10 md:h-10"
                            style={{
                              color: activeHall.colors.primary,
                              filter: `drop-shadow(0 0 10px ${activeHall.colors.glow})`,
                            }}
                          />
                        </div>
                        <div>
                          <h2
                            className="text-xl md:text-3xl font-bold tracking-wider mb-1 md:mb-2"
                            style={{ color: activeHall.colors.primary }}
                          >
                            {activeHall.name}
                          </h2>
                          <h3 className="text-base md:text-lg text-gray-300 font-serif italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {activeHall.subtitle}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-200 font-sans leading-relaxed max-w-2xl mx-auto md:mx-0 text-xs md:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {activeHall.description}
                      </p>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-3 md:space-y-4">
                      {activeHall.questions.map((q, i) => (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <QuestionCard
                            question={q}
                            hallColors={activeHall.colors}
                            isOpen={openQuestionId === q.id}
                            onToggle={() =>
                              setOpenQuestionId(openQuestionId === q.id ? null : q.id)
                            }
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
