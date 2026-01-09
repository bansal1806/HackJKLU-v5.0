
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Real assets
import outerRingImg from '../../assets/partners/outer-ring.webp';
import innerRingsImg from '../../assets/partners/inner-rings.webp';
import entionLogoImg from '../../assets/partners/ention-logo.webp';
import bgMistImg from '../../assets/partners/bg-mist.webp';

// Social Icons (with double extension as found in directory)
import xIcon from '../../assets/partners/social-x.svg';
import instaIcon from '../../assets/partners/social-insta.svg';
import linkedInIcon from '../../assets/partners/social-linkedin.svg';
import webIcon from '../../assets/partners/social-web.svg';

export function PartnerCard() {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0c0a09] py-20 px-4 relative overflow-hidden">
            {/* Main Background with Mist Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen pointer-events-none"
                style={{ backgroundImage: `url(${bgMistImg})` }}
            />


            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
                {/* Headers */}
                <motion.div
                    animate={{
                        opacity: 1,
                        y: 0,
                        x: (isHovered && !isMobile) ? -280 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="text-center mb-16 hidden md:block"
                >
                    <h2 className="text-5xl md:text-6xl font-heading text-ivory-cream mb-6 tracking-[0.4em] font-bold drop-shadow-[0_0_20px_rgba(255,236,209,0.3)]">
                        PAST PARTNERS
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-heading text-stone-400 tracking-[0.3em] mb-4 uppercase">
                        GOLD PARTNER
                    </h3>
                    <h4 className="text-xl md:text-2xl font-heading text-stone-500 tracking-[0.3em] uppercase">
                        ENTION
                    </h4>
                </motion.div>

                {/* Mobile Headers */}
                <div className="text-center mb-12 md:hidden">
                    <h2 className="text-3xl font-heading text-ivory-cream mb-2 tracking-[0.2em] font-bold">
                        PAST PARTNERS
                    </h2>
                    <h3 className="text-lg font-heading text-stone-400 tracking-[0.1em] mb-1 uppercase">
                        GOLD PARTNER
                    </h3>
                    <h4 className="text-sm font-heading text-stone-500 tracking-[0.1em] uppercase">
                        ENTION
                    </h4>
                </div>

                {/* Main Content Area */}
                <div
                    className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 w-full min-h-[500px]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Ring System */}
                    <motion.div
                        layout
                        animate={{
                            x: (isHovered && !isMobile) ? -240 : 0,
                            scale: isHovered ? 1.1 : 1
                        }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="relative w-72 h-72 md:w-[500px] md:h-[500px] flex items-center justify-center flex-shrink-0"
                    >
                        {/* Outer rotating ring (the meander webp) */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 flex items-center justify-center p-0"
                        >
                            <img src={outerRingImg} alt="Outer Ring" className="w-full h-full object-contain opacity-95 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                        </motion.div>

                        {/* Middle & Inner Stationary Rings (one webp) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-0">
                            <img src={innerRingsImg} alt="Inner Rings" className="w-[88%] h-[88%] object-contain opacity-95 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                        </div>

                        {/* Partner Logo */}
                        <div className="relative z-10 w-44 h-44 md:w-80 md:h-80 flex items-center justify-center p-0">
                            <img
                                src={entionLogoImg}
                                alt="Ention Logo"
                                className="w-[65%] h-[65%] object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    {/* Partner Details (Visible on Hover / Always visible on Mobile) */}
                    <AnimatePresence>
                        {(isHovered || isMobile) && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="max-w-xl flex flex-col gap-6 text-left p-6 md:p-0"
                            >
                                <div className="space-y-6">
                                    <h4 className="text-3xl font-heading text-ivory-cream uppercase md:block hidden tracking-widest border-b border-gold-500/20 pb-2">ENTION</h4>
                                    <h4 className="text-2xl font-heading text-ivory-cream uppercase md:hidden tracking-wider text-center">ENTION</h4>
                                    <p className="text-stone-300 font-subheading leading-relaxed text-sm md:text-lg text-justify opacity-90">
                                        Ention is a leading innovator in digital solutions, empowering businesses with cutting-edge technology and advanced automation tools to optimize operations and drive growth. It was incorporated on 28th Jan, 2022 in India to provide innovative laptop products, helping users stay connected with the latest technology trends. Focused on delivering customer-centric computing solutions, Ention stands apart with a strong emphasis on service and support.
                                    </p>
                                    <p className="text-stone-300 font-subheading leading-relaxed text-sm md:text-lg text-justify opacity-90">
                                        Ention is revolutionizing the laptop experience with high-performance devices designed for creators, gamers, and professionals. Featuring Intel and AMD processors, Ention laptops combine speed, power, and reliability to fuel your ambitions.
                                    </p>
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-gold-500/50 via-gold-500/20 to-transparent my-2" />

                                {/* Social Links */}
                                <div className="flex items-center justify-center md:justify-end gap-10 mt-2">
                                    <SocialIcon icon={xIcon} />
                                    <SocialIcon icon={instaIcon} />
                                    <SocialIcon icon={linkedInIcon} />
                                    <SocialIcon icon={webIcon} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom line */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        </section>
    );
}

function SocialIcon({ icon }: { icon: string }) {
    return (
        <motion.a
            href="#"
            whileHover={{ scale: 1.25, filter: 'brightness(1.5)', y: -5 }}
            className="w-8 h-8 md:w-12 md:h-12 transition-all cursor-pointer opacity-90 hover:opacity-100"
        >
            <img src={icon} alt="Social" className="w-full h-full object-contain brightness-125 saturate-150" />
        </motion.a>
    );
}
