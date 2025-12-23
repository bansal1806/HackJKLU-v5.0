
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const storyContent = [
    {
        text: "In a time before history...",
        img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2069&auto=format&fit=crop"
    },
    {
        text: "When legends were born...",
        img: "https://images.unsplash.com/photo-1599709949607-b003c200632a?q=80&w=2070&auto=format&fit=crop" // Ancient ruins/forest
    },
    {
        text: "A King will rise.",
        img: "https://images.unsplash.com/photo-1535581652167-3d6b98c9f596?q=80&w=2070&auto=format&fit=crop" // Moody dark landscape
    }
];

export function Story() {
    return (
        <section className="relative z-10 bg-black text-white">
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
