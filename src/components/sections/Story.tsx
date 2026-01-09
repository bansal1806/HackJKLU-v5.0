
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { CloudTransition } from '../ui/CloudTransition';

// Static About Content
const aboutText = {
    title: "HackJKLU v5.0",
    paragraphs: [
        "HackJKLU v5.0 is more than just a hackathon. It’s a place where ideas are turned into action. This year, the focus is majorly on creativity, teamwork, and solutions that actually matter. Participants come together to think freely, experiment boldly, and learn by actually doing the tasks.",
        "Organized at JK Lakshmipat University by the Council of Technical Affairs (JKLU), HackJKLU v5.0 brings talented students from across the country onto a single platform. With different skill sets and perspectives all teams work on real world problems that are related to technology, society, and the upcoming future.",
        "Throughout the event the participating students will be brainstorming, building, and improving their ideas through the help of mentors and experts present then and there. It’s not just about being perfect but it’s about learning, collaborating, and creating something meaningful.",
        "HackJKLU v5.0 is all about energy, innovation, and growth. Come with an idea, leave with an ultimate experience, confidence, and inspiration."
    ]
};

export function Story() {
    const location = useLocation();
    const [showTransition, setShowTransition] = useState(() => !!location.state?.transition);

    useEffect(() => {
        if (location.state?.transition) {
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Scroll animation for the text container
    // const { scrollYProgress } = useScroll();
    // const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    // const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

    return (
        <section className="relative z-10 text-white min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 py-20">
            {/* Cloud Uncover Transition */}
            {showTransition && (
                <CloudTransition
                    type="uncover"
                    onComplete={() => setShowTransition(false)}
                />
            )}

            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-12">
                {/* Text Content - Left Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="w-full lg:w-3/5"
                >
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-amber-500 mb-8 drop-shadow-md">
                        {aboutText.title}
                    </h1>

                    <div className="space-y-6 text-lg md:text-xl text-stone-300 font-subheading leading-relaxed tracking-wide text-justify">
                        {aboutText.paragraphs.map((para, index) => (
                            <p key={index} className="drop-shadow-sm">
                                {para}
                            </p>
                        ))}
                    </div>
                </motion.div>

                {/* Animated Logo - Right Side */}
                {/* Animated Logo - Right Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="w-full lg:w-2/5 flex justify-center lg:justify-end items-center lg:-mr-16" // Shifted right with negative margin
                >
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            filter: [
                                "drop-shadow(0 0 8px rgba(212, 175, 55, 0.2)) brightness(1)",
                                "drop-shadow(0 0 15px rgba(212, 175, 55, 0.4)) brightness(1.1)",
                                "drop-shadow(0 0 8px rgba(212, 175, 55, 0.2)) brightness(1)"
                            ]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative w-full max-w-[400px] aspect-square"
                    >
                        {/* Swirling Gold Particles */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        scale: Math.random() * 0.5 + 0.5,
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: [
                                            (Math.cos(i * 30 * (Math.PI / 180)) * 120),
                                            (Math.cos((i * 30 + 120) * (Math.PI / 180)) * 140),
                                            (Math.cos((i * 30 + 240) * (Math.PI / 180)) * 120),
                                            (Math.cos(i * 30 * (Math.PI / 180)) * 120)
                                        ],
                                        y: [
                                            (Math.sin(i * 30 * (Math.PI / 180)) * 40), // Elliptical orbit (flatter Y)
                                            (Math.sin((i * 30 + 120) * (Math.PI / 180)) * 60),
                                            (Math.sin((i * 30 + 240) * (Math.PI / 180)) * 40),
                                            (Math.sin(i * 30 * (Math.PI / 180)) * 40)
                                        ],
                                        opacity: [0.4, 0.8, 0.4],
                                        scale: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 8 + Math.random() * 4,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 0.2
                                    }}
                                />
                            ))}

                            {/* Counter-rotating outer ring of particles */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={`outer-${i}`}
                                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-200 rounded-full shadow-[0_0_5px_rgba(255,255,200,0.6)]"
                                    animate={{
                                        rotate: -360
                                    }}
                                    style={{
                                        translateX: '160px', // Fixed radius from center
                                        originX: '-160px',   // Rotate around center
                                        originY: '0px'
                                    }}
                                    transition={{
                                        duration: 15 + Math.random() * 5,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 1.5
                                    }}
                                >
                                    {/* Offset the particle from its own center to create variation */}
                                    <div style={{ transform: `translate(${Math.random() * 20}px, ${Math.random() * 20}px)` }} />
                                </motion.div>
                            ))}
                        </div>

                        <img
                            src="/logo2.webp"
                            alt="HackJKLU Logo"
                            className="w-full h-full object-contain drop-shadow-2xl opacity-90 relative z-10"
                        />
                        {/* Eerie Glow Behind */}
                        <div className="absolute inset-0 bg-amber-500/10 blur-[40px] rounded-full -z-10 animate-pulse" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// Removed unused StoryBlock component
