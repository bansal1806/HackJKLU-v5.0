
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { CloudTransition } from '../ui/CloudTransition';

const storyContent = [
    {
        text: "A 36-Hour National Level Hackathon...",
        img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop" // Tech/Hackathon vibe
    },
    {
        text: "Hosted by JK Lakshmipat University, Jaipur.",
        img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop" // College/Campus vibe
    },
    {
        text: "Where innovation meets code. Solve Real World Challenges.",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" // Abstract Network
    }
];

export function Story() {
    const location = useLocation();
    // Initialize state directly from location to avoid "flash" of content before effect runs
    const [showTransition, setShowTransition] = useState(() => !!location.state?.transition);

    useEffect(() => {
        if (location.state?.transition) {
            // Clear location state to prevent running on refresh/back
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <section className="relative z-10 bg-black text-white">
            {/* Cloud Uncover Transition */}
            {showTransition && (
                <CloudTransition
                    type="uncover"
                    onComplete={() => setShowTransition(false)}
                />
            )}

            {storyContent.map((item, index) => (
                <StoryBlock key={index} item={item} index={index} />
            ))}
        </section>
    );
}

function StoryBlock({ item }: { item: any, index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });


    // Parallax effect for image
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Text fade in
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

    return (
        <div ref={ref} className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y, opacity }} className="w-full h-[120%]">
                    <img
                        src={item.img}
                        alt="Story background"
                        className="w-full h-full object-cover brightness-[0.4] grayscale-[50%]"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opactiy-80" />
            </div>

            {/* Text Content */}
            <motion.div
                style={{ opacity: textOpacity }}
                className="relative z-20 max-w-2xl px-6 text-center"
            >
                <p className="text-3xl md:text-5xl lg:text-6xl font-[Cinzel] text-stone-300 leading-tight drop-shadow-xl">
                    {item.text}
                </p>
            </motion.div>
        </div>
    );
}
