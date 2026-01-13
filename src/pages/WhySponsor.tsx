import { motion } from 'framer-motion';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';
import bgThemes from '../assets/themes/bg-themes.webp'; // Reusing mystical background

const benefits = [
    {
        title: "High-Quality Talent",
        description: "Direct access to high-quality tech talent for hiring and mentoring.",
        icon: "👥",
    },
    {
        title: "Brand Visibility",
        description: "Strong brand visibility across on-ground, digital, and social media channels (100K+ reach).",
        icon: "👁️",
    },
    {
        title: "Meaningful Engagement",
        description: "Meaningful engagement, not just logos — through hack tracks, workshops, demos, and stalls.",
        icon: "🤝",
    },
    {
        title: "Product & API Exposure",
        description: "Product & API exposure to developers building real-world solutions in 48 hours.",
        icon: "🚀",
    },
    {
        title: "Credible Association",
        description: "Association with a credible, non-profit, innovation-driven platform backed by JK Lakshmipat University.",
        icon: "🏛️",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 50, damping: 20 }
    },
};

export function WhySponsor() {
    return (
        <div className="min-h-screen w-full relative font-cinzel text-[#e8dab2] bg-[#0c0a09] overflow-x-hidden">
            <SEOHead
                title="Why Sponsor Us - HackJKLU v5.0"
                description="Partner with HackJKLU v5.0 to engage with 500+ top student developers, gain high brand visibility, and hire top talent."
                keywords="sponsor hackathon, hackjklu sponsorship, tech talent hiring, developer brand engagement"
                canonicalUrl="/sponsor"
            />

            {/* Animated Background Layers */}
            <div className="fixed inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 brightness-50"
                    style={{ backgroundImage: `url(${bgThemes})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gold-400/30 blur-[1px]"
                        style={{
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col items-center">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-12 sm:mb-16 max-w-4xl"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-orange-100 via-amber-200 to-amber-500 tracking-wider drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                        WHY SPONSOR HACKJKLU v5.0?
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-base sm:text-lg md:text-xl text-amber-100/90 font-serif italic leading-relaxed max-w-3xl mx-auto"
                    >
                        HackJKLU v5.0 is a national-level hackathon & developer festival bringing together <span className="text-gold-400 font-bold">500+ top student developers</span> selected from 1500+ nationwide registrations, representing 100+ colleges across India.
                    </motion.p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-16"
                >
                    <motion.div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mb-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 tracking-widest border-b-2 border-amber-500/30 pb-2">
                            WHAT SPONSORS GET
                        </h2>
                    </motion.div>

                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, translateY: -5 }}
                            className={`relative overflow-hidden group rounded-xl border border-amber-900/40 bg-black/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] ${index >= 3 ? 'lg:col-span-1.5' : ''}`}
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-900/0 via-amber-600/10 to-amber-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                            <div className="text-4xl sm:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                                {benefit.icon}
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-amber-200 mb-3 tracking-wide group-hover:text-amber-100 transition-colors">
                                {benefit.title}
                            </h3>

                            <p className="text-sm sm:text-base font-serif text-amber-100/80 leading-relaxed group-hover:text-amber-50 transition-colors">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Closing Platform Statement */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 px-4 py-8 relative"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 max-w-4xl mx-auto leading-snug">
                        "HackJKLU v5.0 isn’t just an event — it’s a <span className="text-gold-400">talent</span>, <span className="text-gold-400">innovation</span>, and <span className="text-gold-400">brand engagement</span> platform."
                    </h3>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-amber-600/30 bg-gradient-to-b from-amber-900/20 to-black/60 p-1">
                        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10" />

                        <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 sm:p-12 text-center relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-8 uppercase tracking-widest">
                                Partner With Us
                            </h2>

                            <div className="flex flex-col items-center space-y-4">
                                <div className="mb-2">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-amber-100">Devam Gupta</h3>
                                    <p className="text-amber-300/80 font-serif italic text-lg">Core Team – Sponsorships</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-6">
                                    <a href="tel:+917340015201" className="group flex items-center gap-3 text-lg hover:text-amber-400 transition-colors">
                                        <span className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center border border-amber-600/30 group-hover:border-amber-400/60 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all">
                                            📞
                                        </span>
                                        <span className="font-mono text-amber-100 md:text-xl">+91 73400 15201</span>
                                    </a>

                                    <a href="mailto:devamgupta@jklu.edu.in" className="group flex items-center gap-3 text-lg hover:text-amber-400 transition-colors">
                                        <span className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center border border-amber-600/30 group-hover:border-amber-400/60 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all">
                                            📧
                                        </span>
                                        <span className="font-mono text-amber-100 md:text-xl">devamgupta@jklu.edu.in</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Footer Navigation */}
            <PageNavigation />
        </div>
    );
}
