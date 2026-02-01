'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FastForward } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Hardcoded itinerary data
const itineraryData = {
  day1: [
    { time: '10:00 AM', title: 'Check-in Start', type: 'mandatory' },
    { time: '11:30 AM', title: 'Check-in End', type: 'mandatory' },
    { time: '01:00 PM', title: 'MyFM Start', type: 'fun' },
    { time: '03:15 PM', title: 'Inauguration Ceremony', type: 'mandatory' },
    { time: '04:15 PM', title: 'Hackathon Starts', type: 'mandatory' },
    { time: '06:30 PM', title: 'Session by Ankur Warikoo', type: 'session' },
    { time: '09:00 PM', title: 'Mentoring Round 1', type: 'mentoring' },
  ],
  day2: [
    { time: '06:00 AM', title: 'Yoga', type: 'fun' },
    { time: '09:00 AM', title: 'Session by Jaskaran Singh', type: 'session' },
    { time: '10:30 AM', title: 'Judging Round 1', type: 'mandatory' },
    { time: '04:00 PM', title: 'Session by Bhagirath Sir', type: 'session' },
    { time: '05:00 PM', title: 'GFG Coding Challenge', type: 'competition' },
    { time: '07:00 PM', title: 'Judging Round 2', type: 'mandatory' },
    { time: '11:00 PM', title: 'Jamming', type: 'fun' },
  ],
  day3: [
    { time: '04:00 AM', title: 'Submission Time', type: 'mandatory' },
    { time: '06:30 AM', title: 'Meditation', type: 'fun' },
    { time: '09:00 AM', title: 'Judging Round 3', type: 'mandatory' },
    { time: '10:30 AM', title: 'Top 5 Announcement', type: 'mandatory' },
    { time: '11:00 AM', title: 'Jury Presentation', type: 'mandatory' },
    { time: '01:00 PM', title: 'Session by Sandeep Jain', type: 'session' },
    { time: '02:00 PM', title: 'Valedictory Ceremony', type: 'mandatory' },
  ],
};

// Type colors mapping
const typeColors: Record<string, { glow: string; star: string }> = {
  mandatory: { glow: '#ff6b6b', star: '#ff8c8c' }, // Red/Orange
  fun: { glow: '#4ecdc4', star: '#6ee5dd' }, // Teal/Green
  session: { glow: '#4dabf7', star: '#74c0fc' }, // Blue
  mentoring: { glow: '#9775fa', star: '#b197fc' }, // Purple
  competition: { glow: '#ffd43b', star: '#ffec8c' }, // Gold
};

// Fixed coordinate patterns
// Coordinates are in pixels relative to the 300vw x 400vh container
function getCoordinates(
  day: 'day1' | 'day2' | 'day3',
  index: number,
  total: number,
  viewportWidth: number,
  viewportHeight: number,
): { x: number; y: number } {
  // Container dimensions (300vw x 400vh)
  const containerWidth = viewportWidth * 3; // 300vw
  const containerHeight = viewportHeight * 4; // 400vh

  if (day === 'day1') {
    // Day 1: "The Cluster" - zigzag near center (40% to 60% of container)
    const centerX = containerWidth * 0.5;
    const centerY = containerHeight * 0.5;
    const offsetX = (index % 2 === 0 ? 1 : -1) * (containerWidth * 0.05);
    const offsetY = (index - total / 2) * (containerHeight * 0.08);
    return {
      x: centerX + offsetX,
      y: centerY + offsetY,
    };
  } else if (day === 'day2') {
    // Day 2: "The Scatter" - full width, wide pans
    const positions = [
      { x: containerWidth * 0.1, y: containerHeight * 0.2 }, // Far left
      { x: containerWidth * 0.9, y: containerHeight * 0.3 }, // Far right
      { x: containerWidth * 0.5, y: containerHeight * 0.5 }, // Center-mid
      { x: containerWidth * 0.2, y: containerHeight * 0.4 }, // Left-mid
      { x: containerWidth * 0.8, y: containerHeight * 0.6 }, // Right-mid
      { x: containerWidth * 0.4, y: containerHeight * 0.7 }, // Left-low
      { x: containerWidth * 0.6, y: containerHeight * 0.1 }, // Center-high
    ];
    return positions[index] || { x: containerWidth * 0.5, y: containerHeight * 0.5 };
  } else {
    // Day 3: "The Descent" - vertical snake/waterfall
    const startX = containerWidth * 0.5;
    const startY = containerHeight * 0.15;
    const spacing = containerHeight * 0.1;
    const zigzag = (index % 2 === 0 ? 1 : -1) * (containerWidth * 0.1);
    return {
      x: startX + zigzag,
      y: startY + index * spacing,
    };
  }
}

interface StarProps {
  event: (typeof itineraryData.day1)[0];
  position: { x: number; y: number };
  isActive: boolean;
  isSkipped: boolean;
}

function Star({ event, position, isActive, isSkipped }: StarProps) {
  const starRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const color = typeColors[event.type] || typeColors.mandatory;

  useEffect(() => {
    if (!starRef.current || !cardRef.current) return;

    if (isSkipped) {
      gsap.set(starRef.current, { opacity: 1, scale: 1 });
      gsap.set(cardRef.current, { opacity: isActive ? 1 : 0.3 });
      return;
    }

    if (isActive) {
      gsap.to(starRef.current, {
        scale: 1.5,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(starRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cardRef.current, {
        opacity: 0.3,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isActive, isSkipped]);

  return (
    <div
      ref={starRef}
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 20 : 10,
      }}
    >
      {/* Star */}
      <div
        className="w-4 h-4 rounded-full relative"
        style={{
          backgroundColor: color.star,
          boxShadow: `0 0 15px ${color.glow}, 0 0 30px ${color.glow}`,
          filter: isActive ? 'brightness(1.5)' : 'brightness(1)',
        }}
      >
        {/* Pulsing glow effect */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: color.glow,
              opacity: 0.3,
            }}
          />
        )}
      </div>

      {/* Glassmorphism Card */}
      <div
        ref={cardRef}
        className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap backdrop-blur-md bg-white/10 rounded-lg px-4 py-3 border border-white/20 transition-all duration-300"
        style={{
          opacity: isActive ? 1 : 0.3,
          transform: isActive ? 'scale(1)' : 'scale(0.9)',
        }}
      >
        <div className="text-xs font-[Cinzel] text-white/80 mb-1">{event.time}</div>
        <div className="text-sm font-[Cinzel] text-white font-semibold">{event.title}</div>
      </div>
    </div>
  );
}

export function CosmicItinerary() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2' | 'day3'>('day1');
  const [isSkipped, setIsSkipped] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const currentEvents = itineraryData[activeDay];
  const starPositions = currentEvents.map((_, i) =>
    getCoordinates(activeDay, i, currentEvents.length, dimensions.width, dimensions.height),
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate comet transition between day buttons
  const animateComet = (fromIndex: number, toIndex: number) => {
    if (!cometRef.current || !navRef.current) return;

    const buttons = navRef.current.querySelectorAll('button');
    const fromButton = buttons[fromIndex];
    const toButton = buttons[toIndex];

    if (!fromButton || !toButton) return;

    const fromRect = fromButton.getBoundingClientRect();
    const toRect = toButton.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();

    const startX = fromRect.left + fromRect.width / 2 - navRect.left;
    const endX = toRect.left + toRect.width / 2 - navRect.left;
    const y = fromRect.top + fromRect.height / 2 - navRect.top;

    gsap.set(cometRef.current, {
      x: startX,
      y: y,
      opacity: 1,
      scale: 1,
    });

    gsap.to(cometRef.current, {
      x: endX,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(cometRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
        });
      },
    });
  };

  // Handle day change
  const handleDayChange = (newDay: 'day1' | 'day2' | 'day3') => {
    if (newDay === activeDay) return;

    const dayIndexMap = { day1: 0, day2: 1, day3: 2 };
    const fromIndex = dayIndexMap[activeDay];
    const toIndex = dayIndexMap[newDay];

    // Animate comet
    animateComet(fromIndex, toIndex);

    // Fade out current stars
    const currentStars = containerRef.current?.querySelectorAll('[data-star]');
    if (currentStars) {
      gsap.to(currentStars, {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setActiveDay(newDay);
          setActiveIndex(0);

          // Fade in new stars
          setTimeout(() => {
            const newStars = containerRef.current?.querySelectorAll('[data-star]');
            if (newStars) {
              gsap.fromTo(
                newStars,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
              );
            }
          }, 50);
        },
      });
    } else {
      setActiveDay(newDay);
      setActiveIndex(0);
    }
  };

  // Setup ScrollTrigger camera follow
  useEffect(() => {
    if (!scrollContainerRef.current || !containerRef.current || isSkipped) return;

    const container = containerRef.current;
    const totalHeight = window.innerHeight * 4; // 400vh equivalent

    // Single ScrollTrigger for smooth camera movement
    const scrollTrigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: 'top top',
      end: `+=${totalHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentStarIndex = Math.min(
          Math.floor(progress * currentEvents.length),
          currentEvents.length - 1,
        );

        setActiveIndex(currentStarIndex);

        if (currentStarIndex < starPositions.length && starPositions[currentStarIndex]) {
          const targetPos = starPositions[currentStarIndex];
          const viewportCenterX = window.innerWidth / 2;
          const viewportCenterY = window.innerHeight / 2;

          const translateX = viewportCenterX - targetPos.x;
          const translateY = viewportCenterY - targetPos.y;

          gsap.to(container, {
            x: translateX,
            y: translateY,
            duration: 0.3,
            ease: 'power1.out',
            overwrite: true,
          });
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [activeDay, isSkipped, currentEvents.length, starPositions]);

  // Draw SVG path between stars
  useEffect(() => {
    if (!pathRef.current || starPositions.length < 2 || isSkipped) return;

    const path = pathRef.current;
    const pathData = starPositions
      .map((pos, i) => {
        return `${i === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`;
      })
      .join(' ');

    path.setAttribute('d', pathData);

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;

    // Animate path drawing based on active index
    const drawProgress = Math.min((activeIndex + 1) / currentEvents.length, 1);
    gsap.to(path, {
      strokeDashoffset: pathLength * (1 - drawProgress),
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    });
  }, [activeDay, activeIndex, starPositions, currentEvents.length, isSkipped]);

  // Handle skip button
  const handleSkip = () => {
    setIsSkipped(true);

    if (containerRef.current && scrollContainerRef.current) {
      // Reset transforms
      gsap.set(containerRef.current, { x: 0, y: 0 });

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Show all stars
      const stars = containerRef.current.querySelectorAll('[data-star]');
      gsap.to(stars, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Reset container to standard timeline layout
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.height = 'auto';
        scrollContainerRef.current.style.overflow = 'visible';
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0B0C10] overflow-hidden pt-28 md:pt-32">
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm font-[Cinzel] hover:bg-white/20 transition-all"
        style={{ display: isSkipped ? 'none' : 'flex' }}
      >
        <FastForward className="w-4 h-4" />
        Skip Animation
      </button>

      {/* Page Title */}
      <div className="relative z-40 text-center mb-4 md:mb-8 pointer-events-none">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-[0.2em] text-white uppercase drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]"
          style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.4)' }}
        >
          ITINERARY
        </h1>
      </div>

      {/* Shooting Star Navbar */}
      <nav
        ref={navRef}
        className="relative z-40 flex items-center justify-center gap-8 py-6 border-b border-white/10"
      >
        {/* Comet */}
        <div
          ref={cometRef}
          className="absolute w-3 h-3 rounded-full bg-white"
          style={{
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)',
            filter: 'blur(1px)',
          }}
        >
          {/* Comet tail */}
          <div
            className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent to-white opacity-60"
            style={{
              transform: 'translateX(-100%)',
            }}
          />
        </div>

        {(['day1', 'day2', 'day3'] as const).map((day) => (
          <button
            key={day}
            onClick={() => handleDayChange(day)}
            className={`relative px-6 py-2 font-[Cinzel] text-sm tracking-wider transition-all ${activeDay === day
              ? 'text-white border-b-2 border-white'
              : 'text-white/50 hover:text-white/80'
              }`}
          >
            {day === 'day1' ? 'Day 1' : day === 'day2' ? 'Day 2' : 'Day 3'}
          </button>
        ))}
      </nav>

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="relative w-full"
        style={{
          height: isSkipped ? 'auto' : '400vh',
          overflow: isSkipped ? 'visible' : 'hidden',
        }}
      >
        {/* Cosmic Canvas Container */}
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: isSkipped ? '100%' : '300vw',
            height: isSkipped ? 'auto' : '400vh',
            transform: isSkipped ? 'none' : 'translate(0, 0)',
          }}
        >
          {/* SVG Path Connector */}
          {!isSkipped && starPositions.length > 1 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 5 }}
            >
              <path
                ref={pathRef}
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          )}

          {/* Stars */}
          {currentEvents.map((event, index) => {
            const position = starPositions[index];
            return (
              <div key={`${activeDay}-${index}`} data-star>
                <Star
                  event={event}
                  position={position}
                  isActive={activeIndex === index && !isSkipped}
                  isSkipped={isSkipped}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Skip Mode: Vertical Timeline */}
      {isSkipped && (
        <div className="max-w-4xl mx-auto py-20 px-4 space-y-8">
          <h2 className="text-3xl font-[Cinzel] text-white text-center mb-12 tracking-wider">
            {activeDay === 'day1' ? 'Day 1' : activeDay === 'day2' ? 'Day 2' : 'Day 3'} Schedule
          </h2>
          {currentEvents.map((event, index) => {
            const color = typeColors[event.type] || typeColors.mandatory;
            return (
              <div
                key={`${activeDay}-${index}-timeline`}
                className="flex items-center gap-6 backdrop-blur-md bg-white/10 rounded-lg px-6 py-4 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: color.star,
                    boxShadow: `0 0 15px ${color.glow}`,
                  }}
                />
                <div className="flex-1">
                  <div className="text-xs font-[Cinzel] text-white/80 mb-1">{event.time}</div>
                  <div className="text-lg font-[Cinzel] text-white font-semibold">
                    {event.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
