import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Prize {
  deity: 'zeus' | 'poseidon' | 'hades';
  title: string;
  prize: string;
  description: string;
}

const prizes: Prize[] = [
  {
    deity: 'zeus',
    title: 'Zeus\' Thunder',
    prize: '$1,000',
    description: 'First Place - The Power of Olympus'
  },
  {
    deity: 'poseidon',
    title: 'Poseidon\'s Trident',
    prize: 'Gaming Chair',
    description: 'Second Place - Ruler of the Seas'
  },
  {
    deity: 'hades',
    title: 'Hades\' Helm',
    prize: 'Swag Kit',
    description: 'Third Place - Lord of the Underworld'
  }
];


export function PrizeRace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const zeusOrbRef = useRef<HTMLDivElement>(null);
  const poseidonOrbRef = useRef<HTMLDivElement>(null);
  const hadesOrbRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const [raceComplete, setRaceComplete] = useState(false);
  const [podium, setPodium] = useState<{ first: Prize; second: Prize; third: Prize } | null>(null);

  const startRace = () => {
    if (!containerRef.current || !svgPathRef.current) return;

    // Reset state
    setRaceComplete(false);
    setPodium(null);

    // Hide cards
    if (cardsRef.current) {
      gsap.set(cardsRef.current.children, { opacity: 0, scale: 0 });
    }

    // Show orbs
    const orbs = [zeusOrbRef.current, poseidonOrbRef.current, hadesOrbRef.current].filter(Boolean) as HTMLDivElement[];
    gsap.set(orbs, { opacity: 1, scale: 1, x: 0, y: 0 });

    // Randomly determine winner before animation
    const deities: Array<'zeus' | 'poseidon' | 'hades'> = ['zeus', 'poseidon', 'hades'];
    const randomWinner = deities[Math.floor(Math.random() * deities.length)];

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide orbs
        gsap.to(orbs, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          onComplete: () => {
            revealCards(randomWinner);
          }
        });
      }
    });

    // Animate each orb with different speeds
    const baseDuration = 2.5;
    const speedVariation = 0.3;

    deities.forEach((deity, index) => {
      const orbRef = deity === 'zeus' ? zeusOrbRef.current : 
                     deity === 'poseidon' ? poseidonOrbRef.current : 
                     hadesOrbRef.current;
      
      if (!orbRef) return;

      // Winner arrives slightly faster, others have random delays
      let duration = baseDuration;
      if (deity === randomWinner) {
        duration = baseDuration - speedVariation; // Winner is faster
      } else {
        duration = baseDuration + (Math.random() * speedVariation); // Others are slower
      }

      // Add slight delay to create overtaking effect
      const delay = index * 0.1;

      // Get path points for animation
      const path = svgPathRef.current;
      if (path) {
        const pathLength = path.getTotalLength();
        
        // Create animation object that updates position along path
        const obj = { progress: 0 };
        
        tl.to(obj, {
          progress: 1,
          duration,
          delay,
          ease: "power2.out",
          onUpdate: () => {
            const point = path.getPointAtLength(pathLength * obj.progress);
            gsap.set(orbRef, { x: point.x, y: point.y });
          }
        }, 0);
      }
    });
  };

  const revealCards = (winnerDeity: 'zeus' | 'poseidon' | 'hades') => {
    // Assign podium positions based on winner
    const winnerPrize = prizes.find(p => p.deity === winnerDeity)!;
    const others = prizes.filter(p => p.deity !== winnerDeity);
    
    setPodium({
      first: winnerPrize,
      second: others[0],
      third: others[1]
    });

    setRaceComplete(true);

    // Animate cards appearing
    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.children) as HTMLElement[];
      
      // 1st place (center)
      gsap.fromTo(cards[0], 
        { opacity: 0, scale: 0, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 }
      );

      // 2nd place (left)
      gsap.fromTo(cards[1],
        { opacity: 0, scale: 0, x: -100, y: 50 },
        { opacity: 0.9, scale: 0.9, x: -220, y: 40, duration: 0.8, ease: "back.out(1.7)", delay: 0.4 }
      );

      // 3rd place (right)
      gsap.fromTo(cards[2],
        { opacity: 0, scale: 0, x: 100, y: 50 },
        { opacity: 0.7, scale: 0.8, x: 220, y: 80, duration: 0.8, ease: "back.out(1.7)", delay: 0.6 }
      );
    }
  };

  useEffect(() => {
    // Auto-start race on mount
    const timer = setTimeout(() => {
      startRace();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getCardStyle = (deity: 'zeus' | 'poseidon' | 'hades', position: 'first' | 'second' | 'third') => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      width: '320px',
      height: '400px',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
    };

    if (position === 'first') {
      baseStyle.left = '50%';
      baseStyle.top = '50%';
      baseStyle.transform = 'translate(-50%, -50%)';
      baseStyle.scale = '1';
      baseStyle.zIndex = 30;
      baseStyle.filter = 'brightness(1)';
    } else if (position === 'second') {
      baseStyle.left = '50%';
      baseStyle.top = '50%';
      baseStyle.transform = 'translate(calc(-50% - 220px), calc(-50% + 40px))';
      baseStyle.scale = '0.9';
      baseStyle.zIndex = 20;
      baseStyle.filter = 'brightness(0.9)';
    } else {
      baseStyle.left = '50%';
      baseStyle.top = '50%';
      baseStyle.transform = 'translate(calc(-50% + 220px), calc(-50% + 80px))';
      baseStyle.scale = '0.8';
      baseStyle.zIndex = 10;
      baseStyle.filter = 'brightness(0.7)';
    }

    // Deity-specific styling
    if (deity === 'zeus') {
      baseStyle.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)';
      baseStyle.border = position === 'first' ? '2px solid #FFD700' : position === 'second' ? '2px solid #C0C0C0' : '2px solid #CD7F32';
      baseStyle.boxShadow = position === 'first' 
        ? '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 60px rgba(255, 255, 255, 0.1)'
        : '0 0 20px rgba(255, 215, 0, 0.3)';
    } else if (deity === 'poseidon') {
      baseStyle.background = 'linear-gradient(135deg, rgba(0, 100, 200, 0.2) 0%, rgba(0, 191, 255, 0.1) 100%)';
      baseStyle.border = position === 'first' ? '2px solid #00BFFF' : position === 'second' ? '2px solid #C0C0C0' : '2px solid #CD7F32';
      baseStyle.boxShadow = position === 'first'
        ? '0 0 30px rgba(0, 191, 255, 0.6), inset 0 0 60px rgba(64, 224, 208, 0.1)'
        : '0 0 20px rgba(0, 191, 255, 0.3)';
    } else {
      baseStyle.background = 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(139, 0, 0, 0.3) 100%)';
      baseStyle.border = position === 'first' ? '2px solid #8B0000' : position === 'second' ? '2px solid #C0C0C0' : '2px solid #CD7F32';
      baseStyle.boxShadow = position === 'first'
        ? '0 0 30px rgba(255, 0, 0, 0.6), inset 0 0 60px rgba(139, 0, 0, 0.2)'
        : '0 0 20px rgba(255, 0, 0, 0.3)';
    }

    return baseStyle;
  };

  const renderCard = (prize: Prize, position: 'first' | 'second' | 'third') => {
    const isZeus = prize.deity === 'zeus';
    const isPoseidon = prize.deity === 'poseidon';
    const isHades = prize.deity === 'hades';

    return (
      <div key={`${prize.deity}-${position}`} style={getCardStyle(prize.deity, position)}>
        {/* Decorative elements */}
        {isZeus && (
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)`,
            borderRadius: '16px',
          }} />
        )}
        {isPoseidon && (
          <div className="absolute inset-0 opacity-30 overflow-hidden" style={{ borderRadius: '16px' }}>
            <svg className="absolute bottom-0 w-full" viewBox="0 0 320 100" preserveAspectRatio="none">
              <path d="M0,100 Q80,60 160,70 T320,60 L320,100 Z" fill="rgba(0, 191, 255, 0.2)" />
            </svg>
          </div>
        )}
        {isHades && (
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 0, 0, 0.1) 10px, rgba(139, 0, 0, 0.1) 20px)`,
            borderRadius: '16px',
          }} />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div>
            <h3 className={`text-2xl font-[Cinzel] font-bold mb-2 ${
              isZeus ? 'text-gold-shimmer' : isPoseidon ? 'text-cyan-400' : 'text-red-500'
            }`}>
              {prize.title}
            </h3>
            <p className="text-stone-gray text-sm mb-4">{prize.description}</p>
          </div>

          <div className="mt-auto">
            <div className={`text-5xl font-[Cinzel] font-bold mb-2 ${
              isZeus ? 'text-gold-shimmer' : isPoseidon ? 'text-cyan-300' : 'text-red-400'
            }`}>
              {prize.prize}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-stone-gray">
                {position === 'first' ? '🥇 1st Place' : position === 'second' ? '🥈 2nd Place' : '🥉 3rd Place'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-void-black overflow-hidden"
      style={{ backgroundColor: 'var(--void-black)' }}
    >
      {/* Hidden SVG Path for the race - Squiggly path from top-left to center */}
      <svg className="absolute opacity-0 pointer-events-none" width="100%" height="100%" style={{ zIndex: 1 }}>
        <path
          ref={svgPathRef}
          d="M 0 0 
             Q 100 50 150 100
             T 200 150
             Q 250 200 300 250
             T 400 300
             Q 450 350 500 400
             T 50% 50%"
          fill="none"
          stroke="transparent"
          strokeWidth="2"
        />
      </svg>

      {/* Racing Orbs */}
      <div className="absolute top-0 left-0" style={{ zIndex: 50 }}>
        <div
          ref={zeusOrbRef}
          className="w-6 h-6 rounded-full absolute"
          style={{
            background: 'radial-gradient(circle, #FFD700 0%, rgba(255, 215, 0, 0.8) 100%)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)',
            filter: 'blur(1px)',
          }}
        />
      </div>
      <div className="absolute top-0 left-0" style={{ zIndex: 50 }}>
        <div
          ref={poseidonOrbRef}
          className="w-6 h-6 rounded-full absolute"
          style={{
            background: 'radial-gradient(circle, #00BFFF 0%, rgba(0, 191, 255, 0.8) 100%)',
            boxShadow: '0 0 20px rgba(0, 191, 255, 0.8), 0 0 40px rgba(64, 224, 208, 0.6)',
            filter: 'blur(1px)',
          }}
        />
      </div>
      <div className="absolute top-0 left-0" style={{ zIndex: 50 }}>
        <div
          ref={hadesOrbRef}
          className="w-6 h-6 rounded-full absolute"
          style={{
            background: 'radial-gradient(circle, #8B0000 0%, rgba(139, 0, 0, 0.8) 100%)',
            boxShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(139, 0, 0, 0.6)',
            filter: 'blur(1px)',
          }}
        />
      </div>

      {/* Prize Cards Container */}
      {raceComplete && podium && (
        <div 
          ref={cardsRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 40 }}
        >
          {renderCard(podium.first, 'first')}
          {renderCard(podium.second, 'second')}
          {renderCard(podium.third, 'third')}
        </div>
      )}

      {/* Replay Button */}
      {raceComplete && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={startRace}
            className="px-8 py-3 bg-golden-amber hover:bg-gold-shimmer text-void-black font-[Cinzel] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{
              backgroundColor: 'var(--golden-amber)',
              color: 'var(--void-black)',
            }}
          >
            Replay Race
          </button>
        </div>
      )}
    </div>
  );
}

