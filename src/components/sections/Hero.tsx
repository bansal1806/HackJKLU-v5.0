import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudTransition } from '../ui/CloudTransition';
import { CountdownTimer } from '../ui/CountdownTimer';
import { HeroStaticLayers } from './HeroStaticLayers';

export function Hero() {
    // Transition State
    const navigate = useNavigate();
    const [isZooming, setIsZooming] = useState(false);
    const [isCovering, setIsCovering] = useState(false);

    const handleTransition = () => {
        if (isZooming) return; // Prevent double clicks

        // 1. Start Zoom
        setIsZooming(true);

        // 2. Start Cloud Cover (Immediately)
        setIsCovering(true);

        // 3. Navigate after zoom/cover is mostly done
        setTimeout(() => {
            navigate('/about', { state: { transition: true } });
        }, 2800); // Wait for the slow cloud cover
    };

    return (
        <section
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-void-black"
            onClick={handleTransition}
            style={{
                background: 'radial-gradient(circle at 50% 30%, #1a202c 0%, #000000 70%)'
            }}
        >
            {/* Transition Overlay */}
            {isCovering && <CloudTransition type="cover" />}

            {/* Zoom Wrapper - Everything else scales inside here */}
            <div
                className="absolute inset-0 w-full h-full transition-transform duration-[2000ms] ease-in-out font-sans"
                style={{
                    transform: isZooming ? 'scale(5) translateY(10%)' : 'scale(1) translateY(0)',
                    transformOrigin: 'center 60%', // Aim at the lightning bolt
                    willChange: 'transform' // GPU Hint
                }}
            >
                {/* 1. Static Background Layers (Memoized) */}
                {/* OPTIMIZATION: Fade out heavy layers immediately on zoom to save GPU scale costs */}
                <div
                    className="absolute inset-0 transition-opacity duration-500 will-change-opacity"
                    style={{ opacity: isZooming ? 0 : 1 }}
                >
                    <HeroStaticLayers />
                </div>

                {/* 2. Interactive/Foreground Elements */}
                {/* OPTIMIZATION: Fade out text/timer immediately */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 will-change-opacity"
                    style={{ opacity: isZooming ? 0 : 1 }}
                >

                    {/* Title Image */}
                    <img
                        src="/Title.webp"
                        alt="HACKJKLU 5.0"
                        className="absolute object-contain"
                        style={{
                            top: '5%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            height: 'clamp(120px, 20vh, 300px)',
                            width: 'auto',
                            maxWidth: '90vw',
                            zIndex: 14,
                            filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.6)) drop-shadow(0 5px 10px rgba(0,0,0,0.8))',
                            opacity: 0.95,
                        }}
                    />

                    {/* Date Subtitle */}
                    <div
                        className="absolute w-full flex justify-center"
                        style={{
                            top: 'clamp(140px, 25vh, 240px)',
                            zIndex: 15,
                        }}
                    >
                        <p
                            className="font-cinzel text-center px-4"
                            style={{
                                fontSize: 'clamp(16px, 2.5vw, 24px)',
                                color: '#d4af37',
                                letterSpacing: 'clamp(3px, 0.5vw, 6px)',
                                marginBottom: '16px',
                                textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                                opacity: 0.9,
                            }}
                        >
                            13 MARCH - 15 MARCH 2026
                        </p>
                    </div>

                    {/* 3. Countdown Timer (Isolated State) */}
                    <CountdownTimer />

                    {/* Bottom Quote */}
                    <div className="absolute w-full flex justify-center" style={{ bottom: '4%', zIndex: 15 }}>
                        <p
                            className="font-cinzel text-center px-4"
                            style={{
                                fontSize: 'clamp(10px, 1.2vw, 13px)',
                                fontStyle: 'italic',
                                color: '#d4af37',
                                letterSpacing: 'clamp(1px, 0.3vw, 3px)',
                                textTransform: 'uppercase',
                                textShadow: '0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
                            }}
                        >
                            — Where Innovation Meets Code —
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS Animations (Global styles for reused animations) */}
            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.4); box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700; }
                    100% { opacity: 0; transform: scale(0.5); }
                }

                @keyframes cloudFlash {
                    0%, 90% { opacity: 0; }
                    92% { opacity: 0.9; }
                    93% { opacity: 0.4; }
                    94% { opacity: 1; }
                    96% { opacity: 0; }
                    100% { opacity: 0; }
                }

                @keyframes particleFloat {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translateY(-15px) translateX(8px);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-5px) translateX(-5px);
                        opacity: 0.4;
                    }
                    75% {
                        transform: translateY(-20px) translateX(3px);
                        opacity: 0.55;
                    }
                }
            `}</style>
        </section>
    );
}
