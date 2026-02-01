'use client';

import { useRef } from 'react';
import { Hero } from '@/components/sections/hero-section';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { GlobalParticles } from '@/components/effects/GlobalParticles';

export function HomePageClient() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <main ref={containerRef} className="relative w-full overflow-x-hidden bg-black text-white">
            {/* Global Floating Particles */}
            <GlobalParticles />

            {/* Hero Section */}
            <div id="hero" className="relative w-full min-h-screen">
                <Hero />
            </div>

            {/* Navigation */}
            <PageNavigation />
        </main>
    );
}
