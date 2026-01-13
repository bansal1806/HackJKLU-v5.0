import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';
import bgThemes from '../assets/themes/bg-themes.webp';

// Image imports
import entionLogo from '../assets/partners/ention-logo.webp';
import wsCubeLogo from '../assets/partners/ws.cubetech-logo.webp';
import devfolioLogo from '../assets/partners/devfolio-logo.webp';
import ethIndiaLogo from '../assets/partners/ethindia-logo.webp';
import balsamiqLogo from '../assets/partners/balsamiq-logo.webp';
import gfgLogo from '../assets/partners/geeksforgeeks-logo.webp';
import blockpenLogo from '../assets/partners/blockpen-logo.webp';
import fluxorLogo from '../assets/partners/fluxor-logo.webp';

const API_URL = "https://script.google.com/macros/s/AKfycbzP4Cslfhv506Nc-giwDLuyhJfcP7nkNd_txc-nAsuv6oKl2PwGEY6yCwFpxNSvoWlq3g/exec";

const partners = [
    { name: "Ention", img: entionLogo },
    { name: "WS Cube Tech", img: wsCubeLogo },
    { name: "Devfolio", img: devfolioLogo },
    { name: "ETHIndia", img: ethIndiaLogo },
    { name: "Balsamiq", img: balsamiqLogo },
    { name: "GeeksforGeeks", img: gfgLogo },
    { name: "BlockPen", img: blockpenLogo },
    { name: "Fluxor", img: fluxorLogo },
];

const contactCards = [
    { name: "Pratigya Bomb", title: "Problem Statement Core", phone: "+916264667506", email: "pratigyabomb@jklu.edu.in" },
    { name: "Shourya Bansal", title: "Tech & Support Core", phone: "+919024877439", email: "shouryabansal@jklu.edu.in" },
    { name: "Agrima Kesari", title: "Hospitality Core", phone: "+917992054194", email: "agrima@jklu.edu.in" },
];

export function CallForProblemStatements() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [submitText, setSubmitText] = useState("Submit Problem");
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    useEffect(() => {
        // Hide scrollbar
        const style = document.createElement('style');
        style.innerHTML = `
      ::-webkit-scrollbar { display: none; }
      html { -ms-overflow-style: none; scrollbar-width: none; }
    `;
        document.head.appendChild(style);

        // Scroll listener for indicator
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollIndicator(false);
            } else {
                setShowScrollIndicator(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        const target = new Date("2026-03-12T17:00:00+05:30").getTime();

        const interval = setInterval(() => {
            const diff = target - Date.now();
            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsSubmitDisabled(true);
                setSubmitText("Submissions Closed");
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff / 3600000) % 24),
                minutes: Math.floor((diff / 60000) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            });
        }, 1000);

        return () => {
            document.head.removeChild(style);
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        setIsSubmitDisabled(true);
        setSubmitText("Submitting...");

        fetch(API_URL, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        })
            .then(() => {
                form.reset();
                window.scrollTo({ top: 0, behavior: "smooth" });
                alert("✅ Problem statement submitted successfully!");
                setSubmitText("Submit Problem");
                setIsSubmitDisabled(false);
            })
            .catch(() => {
                alert("❌ Submission failed. Please try again.");
                setSubmitText("Submit Problem");
                setIsSubmitDisabled(false);
            });
    };

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied: " + text);
    };

    return (
        <div className="min-h-screen w-full relative font-sans text-[#e8dab2] bg-[#0c0a09] overflow-x-hidden selection:bg-amber-500/30">
            <SEOHead
                title="Call for Problem Statements | HackJKLU v5.0"
                description="Submit your problem statements for HackJKLU v5.0. Join us in fostering innovation by challenging students with real-world problems."
                keywords="HackJKLU, problem statements, hackathon challenges, submit problem, industry challenges"
                canonicalUrl="/problem-statements"
            />

            {/* Animated Background Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 brightness-[0.4]"
                    style={{ backgroundImage: `url(${bgThemes})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-amber-500/20 blur-[1px]"
                        style={{
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.5, 0],
                            scale: [0.5, 1.5, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Scroll Down Indicator - Responsive Positioning */}
            <AnimatePresence>
                {showScrollIndicator && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 pointer-events-none"
                    >
                        {/* Mouse Animation */}
                        <div className="w-[24px] h-[40px] sm:w-[28px] sm:h-[48px] rounded-full border-2 border-amber-400/60 bg-black/40 backdrop-blur-sm flex justify-center pt-2 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                            <motion.div
                                animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-amber-200/90 font-cinzel font-semibold drop-shadow-lg">Scroll</span>
                            <motion.div
                                animate={{ y: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                className="text-amber-500/80 text-[8px] sm:text-[10px]"
                            >
                                ▼
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-24 sm:pt-32 pb-20">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 flex flex-col justify-center pt-4 sm:pt-8">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-10 sm:mb-12"
                        >
                            <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs sm:text-sm tracking-widest uppercase font-medium backdrop-blur-sm">
                                Shape The Future
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 font-cinzel tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-500 drop-shadow-[0_2px_10px_rgba(215,175,55,0.2)] leading-[1.1] sm:leading-[1.1] pb-2">
                                Build. Innovate.<br />Compete for Glory.
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-amber-100/70 max-w-xl leading-relaxed font-light border-l-2 border-amber-500/30 pl-4 sm:pl-6">
                                A 48-hour on-campus hackathon where industry leaders and student innovators collaborate to solve real-world challenges.
                            </p>
                        </motion.div>

                        {/* Stats Strip - Responsive Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16"
                        >
                            {[
                                { label: "Prize Pool", value: "₹2,00,000" },
                                { label: "March 2026", value: "13–15" },
                                { label: "Mode", value: "Offline" },
                                { label: "Venue", value: "JKLU" },
                            ].map((stat, i) => (
                                <div key={i} className="group relative bg-black/40 backdrop-blur-md border border-amber-500/20 p-3 sm:p-5 rounded-xl text-center hover:bg-amber-900/10 hover:border-amber-500/40 transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <strong className="relative block text-lg sm:text-xl md:text-2xl text-amber-300 font-bold mb-1 font-cinzel">{stat.value}</strong>
                                    <span className="relative text-[10px] sm:text-xs uppercase tracking-widest text-amber-100/50 font-medium">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mb-12 sm:mb-16"
                        >
                            <h3 className="text-amber-200/80 font-cinzel text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-amber-500/50"></span> Event Timeline
                            </h3>
                            <div className="relative flex flex-col md:flex-row gap-6 md:gap-4 justify-between">
                                {/* Line connecting items (desktop only) */}
                                <div className="hidden md:block absolute top-[15px] left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 w-full" />
                                {/* Vertical Line (mobile only) */}
                                <div className="md:hidden absolute top-2 bottom-2 left-[15px] w-[2px] bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-amber-500/0" />

                                {[
                                    { day: "Day 1", event: "Kickoff & Ideation" },
                                    { day: "Day 2", event: "Build & Mentorship" },
                                    { day: "Day 3", event: "Demos & Evaluation" },
                                ].map((item, i) => (
                                    <div key={i} className="relative z-10 flex md:flex-col items-center md:items-start gap-4 md:gap-3 flex-1 group">
                                        <div className="w-8 h-8 rounded-full bg-[#0c0a09] border border-amber-500/40 flex items-center justify-center shrink-0 group-hover:border-amber-400 group-hover:shadow-[0_0_10px_rgba(215,175,55,0.4)] transition-all z-20">
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                                        </div>
                                        <div className="bg-white/5 md:bg-transparent p-3 md:p-0 rounded-lg w-full backdrop-blur-sm md:backdrop-blur-none border border-white/5 md:border-none">
                                            <span className="block text-amber-400 font-bold text-sm tracking-wider uppercase mb-0.5">{item.day}</span>
                                            <p className="text-amber-100/70 font-medium text-sm sm:text-base">{item.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Countdown */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <h3 className="text-amber-200/80 font-cinzel text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-amber-500/50"></span> Submission Deadline
                            </h3>
                            <div className="flex flex-wrap gap-2 sm:gap-4">
                                {Object.entries(timeLeft).map(([unit, value]) => (
                                    <div key={unit} className="bg-gradient-to-b from-zinc-900/90 to-black/90 border border-amber-500/20 px-3 py-3 sm:px-6 sm:py-5 rounded-xl sm:rounded-2xl text-center min-w-[70px] sm:min-w-[100px] flex-1 relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
                                        <strong className="block text-2xl sm:text-4xl font-bold text-amber-400 tabular-nums font-cinzel group-hover:scale-110 transition-transform duration-500">{value}</strong>
                                        <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-amber-100/40 mt-1 block">{unit}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                    {/* RIGHT COLUMN - FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="lg:col-span-5 relative mt-8 lg:mt-0"
                    >
                        <div className="sticky top-24 sm:top-28">
                            <div className="bg-[#0f0f11]/90 backdrop-blur-xl border border-amber-500/10 p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[1.8rem] shadow-2xl relative overflow-hidden">
                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t border-l border-amber-500/20 rounded-tl-[1.5rem] sm:rounded-tl-[1.8rem]" />
                                <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-t border-r border-amber-500/20 rounded-tr-[1.5rem] sm:rounded-tr-[1.8rem]" />
                                <div className="absolute bottom-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-b border-l border-amber-500/20 rounded-bl-[1.5rem] sm:rounded-bl-[1.8rem]" />
                                <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b border-r border-amber-500/20 rounded-br-[1.5rem] sm:rounded-br-[1.8rem]" />

                                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-400 text-center font-cinzel">Submit Problem Statement</h3>
                                <p className="text-center text-amber-100/50 text-xs sm:text-sm mb-6 sm:mb-8">Define the challenge. Create the future.</p>

                                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                                    <div className="space-y-3 sm:space-y-4">
                                        <input name="company" placeholder="Company Name" required className="w-full bg-black/40 border border-amber-500/10 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:border-amber-500/40 focus:bg-black/60 transition-all placeholder:text-zinc-600 text-amber-100 text-sm sm:text-base" />
                                        <input name="email" type="email" placeholder="Company Email" required className="w-full bg-black/40 border border-amber-500/10 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:border-amber-500/40 focus:bg-black/60 transition-all placeholder:text-zinc-600 text-amber-100 text-sm sm:text-base" />
                                        <input name="contact_phone" type="tel" placeholder="Contact Number" pattern="[0-9]{10}" required className="w-full bg-black/40 border border-amber-500/10 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:border-amber-500/40 focus:bg-black/60 transition-all placeholder:text-zinc-600 text-amber-100 text-sm sm:text-base" />
                                        <input name="title" placeholder="Problem Title" required className="w-full bg-black/40 border border-amber-500/10 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:border-amber-500/40 focus:bg-black/60 transition-all placeholder:text-zinc-600 text-amber-100 text-sm sm:text-base" />
                                        <input name="bounty" placeholder="Bounty Prize (optional)" className="w-full bg-black/40 border border-amber-500/10 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:border-amber-500/40 focus:bg-black/60 transition-all placeholder:text-zinc-600 text-amber-100 text-sm sm:text-base" />
                                        <textarea name="statement" placeholder="Problem Statement Description..." required rows={4} className="w-full bg-black/40 border border-amber-500/10 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:border-amber-500/40 focus:bg-black/60 transition-all placeholder:text-zinc-600 resize-y min-h-[100px] sm:min-h-[120px] text-amber-100 text-sm sm:text-base" />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitDisabled}
                                        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 font-bold py-3 sm:py-4 rounded-xl border border-amber-500/20 hover:from-amber-500 hover:to-amber-600 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(215,175,55,0.2)] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 font-cinzel tracking-wider uppercase text-sm sm:text-base"
                                    >
                                        {submitText}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Partners Section */}
                <div className="mt-20 sm:mt-32 mb-12 sm:mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-6 sm:mb-8"></div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 font-cinzel">Previous Partners</h2>
                        <p className="text-amber-100/50 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">This ecosystem backing reinforces event credibility and scale.</p>

                        <div className="relative overflow-hidden w-full mask-gradient-x p-3 sm:p-4 border-y border-white/5 bg-white/[0.02]">
                            <div className="flex gap-8 sm:gap-16 w-max animate-scroll items-center">
                                {[...partners, ...partners].map((partner, index) => (
                                    <div key={index} className="flex-shrink-0 group relative">
                                        <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <img
                                            src={partner.img}
                                            alt={partner.name}
                                            className="relative h-10 sm:h-14 w-auto object-contain filter grayscale brightness-75 contrast-125 opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-300 transform group-hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Contact Grid */}
                <div className="mb-16 sm:mb-24">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-b from-amber-100 to-amber-400 font-cinzel">Contact Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-2 sm:px-4">
                        {contactCards.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="relative bg-[#111] border border-amber-900/30 rounded-2xl p-6 sm:p-8 text-center group hover:border-amber-500/40 transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                                <h3 className="relative text-lg sm:text-xl font-bold text-amber-100 mb-2 group-hover:text-amber-300 transition-colors font-cinzel">{card.name}</h3>
                                <p className="relative text-amber-500/60 text-[10px] sm:text-xs mb-4 sm:mb-6 uppercase tracking-widest font-semibold">{card.title}</p>

                                <div className="relative space-y-3">
                                    <div
                                        onClick={() => copyText(card.phone)}
                                        className="cursor-pointer bg-black/40 border border-white/5 py-2 sm:py-2.5 px-4 rounded-lg hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-300 transition-all flex items-center justify-center gap-2 text-zinc-400 group-hover:text-zinc-300 text-sm sm:text-base"
                                    >
                                        <span className="text-base sm:text-lg">📞</span> <span className="font-mono">{card.phone.replace("+91", "+91 ")}</span>
                                    </div>
                                    <div
                                        onClick={() => copyText(card.email)}
                                        className="cursor-pointer bg-black/40 border border-white/5 py-2 sm:py-2.5 px-4 rounded-lg hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-300 transition-all flex items-center justify-center gap-2 text-zinc-400 text-xs sm:text-sm break-all group-hover:text-zinc-300"
                                    >
                                        <span className="text-base sm:text-lg">📧</span> {card.email}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Map */}
                <div className="w-full mb-12 sm:mb-20">
                    <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/10 h-[250px] sm:h-[400px] relative group">
                        <div className="absolute inset-0 pointer-events-none z-10 border-[4px] sm:border-[6px] border-[#0c0a09]/50 rounded-2xl sm:rounded-3xl" />
                        <iframe
                            src="https://www.google.com/maps?q=JK+Lakshmipat+University&output=embed"
                            width="100%"
                            height="100%"
                            className="border-0 filter grayscale invert contrast-125 opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

            </main>

            {/* Styles for marquee animation */}
            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

            <PageNavigation />
        </div>
    );
}
