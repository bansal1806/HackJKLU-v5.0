
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudTransition } from '../ui/CloudTransition';

export function Hero() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Generate static random particles on mount to avoid re-renders causing "jumping"
    const [particles] = useState(() => Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        size: Math.random() * 4 + 1 + 'px', // 1px to 5px (slightly larger)
        delay: Math.random() * 5 + 's',
        duration: Math.random() * 4 + 3 + 's', // Slower, smoother fade (3s to 7s)
    })));

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

    // Timer countdown logic
    useEffect(() => {
        // Set target date (you can modify this to your desired countdown target)
        // Set target date (you can modify this to your desired countdown target)
        const targetDate = new Date('2026-03-13T00:00:00');
        // targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            onClick={handleTransition}
            style={{
                background: 'radial-gradient(circle at 50% 30%, #1a202c 0%, #000000 70%)' // Deep Storm Gradient
            }}
        >
            {/* Transition Overlay */}
            {isCovering && <CloudTransition type="cover" />}

            {/* Zoom Wrapper - Everything else scales inside here */}
            <div
                className="absolute inset-0 w-full h-full transition-transform duration-[2000ms] ease-in-out"
                style={{
                    transform: isZooming ? 'scale(5) translateY(10%)' : 'scale(1) translateY(0)',
                    transformOrigin: 'center 60%', // Aim at the lightning bolt
                }}
            >
                {/* Transparent/No background - let content show through */}

                {/* Static Cloud Layers with Lightning Flashes */}
                <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">

                    {/* Random Gold Particles Layer */}
                    {particles.map((p) => (
                        <div
                            key={p.id}
                            className="absolute rounded-full"
                            style={{
                                top: p.top,
                                left: p.left,
                                width: p.size,
                                height: p.size,
                                background: '#ffd700',
                                boxShadow: '0 0 4px #ffd700',
                                opacity: 0,
                                animation: `twinkle ${p.duration} ease-in-out infinite`,
                                animationDelay: p.delay,
                            }}
                        />
                    ))}

                    {/* --- BACKGROUND LAYER --- */}
                    {/* Top Left Cloud (Original) */}
                    <img
                        src="/Cloud1.webp"
                        alt="Cloud Top Left"
                        className="absolute top-[-10%] left-[-10%] w-[50%] h-auto opacity-80 object-contain"
                        style={{ filter: 'brightness(0.7) contrast(1.2)' }}
                    />
                    {/* Top Right Cloud (Original) */}
                    <img
                        src="/Cloud2.webp"
                        alt="Cloud Top Right"
                        className="absolute top-[-5%] right-[-10%] w-[55%] h-auto opacity-80 object-contain"
                        style={{ filter: 'brightness(0.8) contrast(1.1)' }}
                    />

                    {/* Flash Layer 1 (Deep) */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent 60%)',
                        animation: 'cloudFlash 7s infinite',
                        animationDelay: '1s',
                        opacity: 0,
                        mixBlendMode: 'overlay'
                    }} />


                    {/* --- MID LAYER --- */}
                    {/* Mid-Left Flipped (Reuse Cloud 2) */}
                    <img
                        src="/Cloud2.webp"
                        alt="Cloud Mid Left"
                        className="absolute top-[20%] left-[-20%] w-[40%] h-auto opacity-40 object-contain"
                        style={{
                            filter: 'brightness(0.6)',
                            transform: 'scaleX(-1) rotate(10deg)'
                        }}
                    />
                    {/* Mid-Right Flipped (Reuse Cloud 1) */}
                    <img
                        src="/Cloud1.webp"
                        alt="Cloud Mid Right"
                        className="absolute top-[30%] right-[-15%] w-[45%] h-auto opacity-40 object-contain"
                        style={{
                            filter: 'brightness(0.6)',
                            transform: 'scaleX(-1) rotate(-5deg)'
                        }}
                    />

                    {/* Flash Layer 2 (Mid) */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(circle at 70% 40%, rgba(200, 220, 255, 0.2), transparent 50%)',
                        animation: 'cloudFlash 5s infinite',
                        animationDelay: '3.5s',
                        opacity: 0,
                        mixBlendMode: 'screen'
                    }} />


                    {/* --- FOREGROUND LAYER --- */}
                    {/* Top Center Background (Reuse Cloud 4) */}
                    <img
                        src="/Cloud4.webp"
                        alt="Cloud Top Center"
                        className="absolute top-[-25%] left-[25%] w-[60%] h-auto opacity-20 object-contain"
                        style={{
                            filter: 'brightness(0.4)',
                            transform: 'rotate(180deg)' // Upside down for variety
                        }}
                    />
                    {/* Bottom Left Cloud - Foggy effect (Original) */}
                    <img
                        src="/Cloud3.webp"
                        alt="Cloud Bottom Left"
                        className="absolute bottom-[-15%] left-[-5%] w-[60%] h-auto opacity-60 object-contain"
                        style={{ filter: 'brightness(0.6)' }}
                    />
                    {/* Bottom Right Cloud (Original) */}
                    <img
                        src="/Cloud4.webp"
                        alt="Cloud Bottom Right"
                        className="absolute bottom-[-10%] right-[-15%] w-[65%] h-auto opacity-70 object-contain"
                        style={{ filter: 'brightness(0.7)' }}
                    />
                    {/* Bottom Center Foreground (Reuse Cloud 3) */}
                    <img
                        src="/Cloud3.webp"
                        alt="Cloud Bottom Center"
                        className="absolute bottom-[-20%] left-[20%] w-[70%] h-auto opacity-30 object-contain"
                        style={{
                            filter: 'blur(3px) brightness(0.5)',
                            transform: 'scale(1.2)'
                        }}
                    />

                    {/* Flash Layer 3 (Front/Global) */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(255, 230, 150, 0.1), transparent 70%)',
                        animation: 'cloudFlash 11s infinite', // Long interval random feel
                        animationDelay: '0s',
                        opacity: 0,
                        mixBlendMode: 'soft-light'
                    }} />
                </div>


                {/* Gold Particle Effect - Floating embers */}
                <div className="absolute inset-0 z-[6] overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: `${55 + Math.random() * 40}%`,
                                width: `${2 + Math.random() * 2}px`,
                                height: `${2 + Math.random() * 2}px`,
                                background: 'radial-gradient(circle, #ffd700 0%, rgba(255, 180, 50, 0.8) 40%, transparent 70%)',
                                boxShadow: '0 0 8px rgba(255, 200, 100, 0.8), 0 0 15px rgba(255, 180, 50, 0.4)',
                                animation: `particleFloat ${12 + Math.random() * 10}s infinite ease-in-out`,
                                animationDelay: `${Math.random() * 8}s`,
                                opacity: 0.7
                            }}
                        />
                    ))}
                </div>

                {/* Lightning Bolt Overlay with Rotating Rings */}
                <div className="absolute inset-0 z-10">
                    {/* Title and Subtitle */}
                    <div
                        className="absolute"
                        style={{
                            top: '30px', // Moved up to avoid ring overlap
                            left: '50%',
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                            zIndex: 15,
                        }}
                    >
                        {/* Main Title */}
                        <h1
                            className="font-cursive"
                            style={{
                                fontSize: '96px',
                                fontWeight: 'bold',
                                background: `
                                repeating-linear-gradient(45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
                                repeating-linear-gradient(-45deg, transparent 0px, transparent 20px, rgba(40,20,0,0.9) 20px, rgba(40,20,0,0.9) 21px),
                                linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
                            `,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(2px 2px 0px #3d2b00) drop-shadow(4px 4px 0px #2a1a00) drop-shadow(6px 6px 4px rgba(0,0,0,0.8))',
                                letterSpacing: '8px',
                                marginBottom: '0px',
                                // Simulating "cracks" with a textured heavy font and gradient
                            }}
                        >
                            HACKJKLU V
                        </h1>

                        {/* Subtitle - New */}
                        <p
                            className="font-cinzel"
                            style={{
                                fontSize: '24px',
                                color: '#d4af37',
                                letterSpacing: '6px',
                                marginBottom: '16px',
                                textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                                opacity: 0.9,
                            }}
                        >
                            CODE OF THE GODS
                        </p>

                        {/* Date - Silver/Stone Color */}
                        <p
                            className="font-cinzel"
                            style={{
                                fontSize: '18px',
                                fontStyle: 'italic',
                                color: '#d6d3d1', // Stone-300 / Silver
                                textShadow: '0 0 10px rgba(214, 211, 209, 0.3)',
                                letterSpacing: '2px',
                            }}
                        >
                            13 March - 15 March 2026
                        </p>
                    </div>

                    {/* Rings hover container - sized to match outer ring */}
                    <div
                        className="absolute rings-container"
                        style={{
                            top: '50%',
                            left: '50%',
                            width: '1800px',
                            height: '1200px',
                            pointerEvents: 'auto',
                            transform: 'translate(calc(-50% + 33px), calc(-50% + 33px))', // Align with Lightning Peak (approx coords 993, 573)
                        }}
                    >
                        {/* Outer Runic Ring - Outermost, rotates anticlockwise */}
                        <div
                            className="absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: 'translate(-50%, -50%)', // Centered using transform
                            }}
                        >
                            <img
                                src="/outer_runic_ring.png"
                                alt="Outer Runic Ring"
                                className="ring-glow-outer animate-spin-reverse"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    opacity: 0.8,
                                    animationDuration: '60s',
                                }}
                            />
                        </div>

                        {/* Middle Ring - Middle, rotates clockwise */}
                        <div
                            className="absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                width: '81.67%',
                                height: '81.63%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: 'translate(-50%, calc(-50% + 3px))', // Moved down 3px to fix bottom gap
                            }}
                        >
                            <img
                                src="/middle_ring.png"
                                alt="Middle Ring"
                                className="ring-glow-middle animate-spin"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    opacity: 0.85,
                                    animationDuration: '45s',
                                }}
                            />
                        </div>

                        {/* Inner Ring - Innermost, rotates anticlockwise */}
                        <div
                            className="absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                width: '40.83%',
                                height: '40.88%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: 'translate(-50%, calc(-50% - 4px))', // Moved further up (to -4px) as requested
                            }}
                        >
                            <img
                                src="/inner_ring.png"
                                alt="Inner Ring"
                                className="ring-glow-inner animate-spin-reverse"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    opacity: 0.9,
                                    animationDuration: '30s',
                                }}
                            />
                        </div>
                    </div>

                    {/* Lightning Bolt - On top of all rings */}
                    <img
                        src="/lightning-bolt.png"
                        alt="Lightning Bolt"
                        className="absolute"
                        style={{
                            bottom: '0%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '70%',
                            height: '85%',
                            objectFit: 'contain',
                            objectPosition: 'bottom center',
                            opacity: 1,
                            zIndex: 10,
                        }}
                    />

                    {/* Ancient Greek Timer */}
                    <div
                        className="absolute font-medieval"
                        style={{
                            bottom: '8%', // Moved down near footer (above quote)
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 15,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '32px',
                                padding: '20px 48px',
                                // Removed background and glow for "ancient artifact" look
                                // border: '2px solid rgba(212, 175, 55, 0.5)', // REMOVED BORDER as requested
                                // borderRadius: '4px', // Sharper corners
                            }}
                        >
                            {/* Days */}
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    className="font-cursive"
                                    style={{
                                        fontSize: '56px',
                                        fontWeight: 'bold',
                                        // Deep 3D Stone Cracks Effect in Gold
                                        background: `
                                        repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(40,20,0,0.9) 10px, rgba(40,20,0,0.9) 11px),
                                        repeating-linear-gradient(-45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
                                        linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
                                    `,
                                        backgroundSize: '100% 100%',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        // Heavy 3D Block Shadow for "Stone" look
                                        filter: 'drop-shadow(2px 2px 0px #3d2b00) drop-shadow(4px 4px 0px #2a1a00) drop-shadow(6px 6px 4px rgba(0,0,0,0.8))',
                                        minWidth: '80px',
                                    }}
                                >
                                    {String(timeLeft.days).padStart(2, '0')}
                                </div>
                                <div
                                    className="font-cinzel"
                                    style={{
                                        fontSize: '14px',
                                        color: '#d4af37',
                                        letterSpacing: '3px',
                                        textTransform: 'uppercase',
                                        marginTop: '8px',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    }}
                                >
                                    ΗΜΕΡΕΣ
                                </div>
                            </div>

                            <div className="font-cursive" style={{
                                fontSize: '48px',
                                background: `
                                repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(40,20,0,0.9) 10px, rgba(40,20,0,0.9) 11px),
                                repeating-linear-gradient(-45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
                                linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
                            `,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(2px 2px 0px #3d2b00) drop-shadow(4px 4px 0px #2a1a00) drop-shadow(6px 6px 4px rgba(0,0,0,0.8))',
                                fontWeight: 'bold',
                                marginTop: '-20px'
                            }}>:</div>

                            {/* Hours */}
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    className="font-cursive"
                                    style={{
                                        fontSize: '56px',
                                        fontWeight: 'bold',
                                        background: `
                                        repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(40,20,0,0.9) 10px, rgba(40,20,0,0.9) 11px),
                                        repeating-linear-gradient(-45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
                                        linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
                                    `,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        filter: 'drop-shadow(2px 2px 0px #3d2b00) drop-shadow(4px 4px 0px #2a1a00) drop-shadow(6px 6px 4px rgba(0,0,0,0.8))',
                                        minWidth: '80px',
                                    }}
                                >
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </div>
                                <div
                                    className="font-cinzel"
                                    style={{
                                        fontSize: '14px',
                                        color: '#d4af37',
                                        letterSpacing: '3px',
                                        textTransform: 'uppercase',
                                        marginTop: '8px',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    }}
                                >
                                    ΩΡΕΣ
                                </div>
                            </div>

                            <div className="font-cursive" style={{
                                fontSize: '48px',
                                background: `
                                repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(40,20,0,0.9) 10px, rgba(40,20,0,0.9) 11px),
                                repeating-linear-gradient(-45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
                                linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
                            `,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(2px 2px 0px #3d2b00) drop-shadow(4px 4px 0px #2a1a00) drop-shadow(6px 6px 4px rgba(0,0,0,0.8))',
                                fontWeight: 'bold',
                                marginTop: '-20px'
                            }}>:</div>

                            {/* Minutes */}
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    className="font-cursive"
                                    style={{
                                        fontSize: '56px',
                                        fontWeight: 'bold',
                                        background: `
                                        repeating-linear-gradient(60deg, transparent 0px, transparent 14px, rgba(40,20,0,0.9) 14px, rgba(40,20,0,0.9) 15px),
                                        repeating-linear-gradient(-60deg, transparent 0px, transparent 18px, rgba(40,20,0,0.9) 18px, rgba(40,20,0,0.9) 19px),
                                        linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
                                    `,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        filter: 'drop-shadow(2px 2px 0px #3d2b00) drop-shadow(4px 4px 0px #2a1a00) drop-shadow(6px 6px 4px rgba(0,0,0,0.8))',
                                        minWidth: '80px',
                                    }}
                                >
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </div>
                                <div
                                    className="font-cinzel"
                                    style={{
                                        fontSize: '14px',
                                        color: '#d4af37',
                                        letterSpacing: '3px',
                                        textTransform: 'uppercase',
                                        marginTop: '8px',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    }}
                                >
                                    ΛΕΠΤΑ
                                </div>
                            </div>

                            <div className="font-cursive" style={{
                                fontSize: '48px',
                                background: `
                                repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(40,20,0,0.9) 10px, rgba(40,20,0,0.9) 11px),
                                repeating-linear-gradient(-45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
                                linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
                            `,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(2px 2px 0px #3d2b00) drop-shadow(4px 4px 0px #2a1a00) drop-shadow(6px 6px 4px rgba(0,0,0,0.8))',
                                fontWeight: 'bold',
                                marginTop: '-20px'
                            }}>:</div>

                            {/* Seconds */}
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    className="font-cursive"
                                    style={{
                                        fontSize: '56px',
                                        fontWeight: 'bold',
                                        // Deep 3D Stone Cracks Effect in Gold
                                        background: `
                                        repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(40,20,0,0.9) 10px, rgba(40,20,0,0.9) 11px),
                                        repeating-linear-gradient(-45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
                                        linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
                                    `,
                                        backgroundSize: '100% 100%',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        // Heavy 3D Block Shadow for "Stone" look
                                        filter: 'drop-shadow(2px 2px 0px #3d2b00) drop-shadow(4px 4px 0px #2a1a00) drop-shadow(6px 6px 4px rgba(0,0,0,0.8))',
                                        minWidth: '80px',
                                    }}
                                >
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                                <div
                                    className="font-cinzel"
                                    style={{
                                        fontSize: '14px',
                                        color: '#d4af37',
                                        letterSpacing: '3px',
                                        textTransform: 'uppercase',
                                        marginTop: '8px',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    }}
                                >
                                    ΔΕΥΤ
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quote text - inscription style */}
                    <p
                        className="absolute font-cinzel"
                        style={{
                            bottom: '2%', // Anchored near footer
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '13px',
                            fontStyle: 'italic',
                            color: '#d4af37',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            textShadow: '0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
                            zIndex: 15,
                        }}
                    >
                        — Where Innovation Meets Code —
                    </p>
                </div>
            </div> {/* End Zoom Wrapper */}

            {/* CSS Animations */}
            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.4); box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700; } /* Intense Glow at peak */
                    100% { opacity: 0; transform: scale(0.5); }
                }

                @keyframes cloudFlash {
                    0%, 90% { opacity: 0; }
                    92% { opacity: 0.6; }
                    93% { opacity: 0.2; }
                    94% { opacity: 0.7; }
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
